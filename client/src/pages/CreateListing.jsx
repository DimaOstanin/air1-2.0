import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import goodsConfig from '../config/goods-config.json'


export default function CreateListing() {
  const {goodsCategory, goodsCondition} = goodsConfig;
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    company:'',
    condition: '',
    category: '',
    regularPrice: 50,
    
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 2) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('העלאת התמונה נכשלה (מקסימום 2 מגה לתמונה)');
          setUploading(false);
        });
    } else {
      setImageUploadError('אפשר להעלות רק תמונה אחת למודעה');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'condition' || e.target.id === 'category') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    
    

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea' 
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          userPhone: currentUser.phone,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>
      ליצור מוצר
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-end sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='שם המוצר'
            className='border p-3 rounded-lg direction-rtl text-right  flex items-center '
            id='name'
            maxLength='62'
            minLength='3'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='תיאור'
            className='border p-3 rounded-lg direction-rtl text-right'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder=' עיר'
            className='border p-3 rounded-lg direction-rtl text-right'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type='text'
            placeholder=' חברה'
            className='border p-3 rounded-lg direction-rtl text-right'
            id='company'
            required
            onChange={handleChange}
            value={formData.company}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-row gap-2'>
            
            <select className='border p-3 rounded-lg' id='condition' onChange={handleChange}>
            
              {goodsCondition.map((condition)=>
                <option className='direction-rtl text-right' value={condition} key={condition}>{condition}</option>
              )}
                
            </select>
              <label className='direction-rtl text-right  flex items-center '>יש לבחור מצב</label>
            </div>
            <div className='flex flex-row direction-rtl gap-2 justify-end'>
            
            <select className='border p-3 rounded-lg direction-rtl item-right '  id='category' onChange={handleChange}>
            
              {goodsCategory.map((condition)=>
                <option className='direction-rtl text-right' value={condition} key={condition}>{condition}</option>
              )}
                
            </select>
              <label className='direction-rtl text-right  flex items-center '>יש לבחור קטגוריה</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='20'
                max='10001'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <label className='direction-rtl text-right  flex items-center '>מחיר</label>
                
              </div>
            </div>
            
            
            
          </div>
        
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='flex flex-row justify-center'>
          
          <p className='font-semibold flex flex-row justify-end'>
          תמונה
          </p>
          </div>
        
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? '...מעלה' : 'להעלות'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'ייצור...' : 'להקים מוצר'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
