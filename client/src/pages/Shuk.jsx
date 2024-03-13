import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Shuk() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sort, setSort] = useState('newest');


  useEffect(() => {
    fetchListing();
    setListings(sortedFilteredListings);
  }, []);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/`);
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setListings(data);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
   
      setSort(e.target.value);
    
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchTerm) ||
    listing.description.toLowerCase().includes(searchTerm) ||
    listing.address.toLowerCase().includes(searchTerm) ||
    listing.company.toLowerCase().includes(searchTerm) ||
    listing.category.toLowerCase().includes(searchTerm) ||
    listing.condition.toLowerCase().includes(searchTerm)
  );
  
  const sortListings = (a, b) => {
    if (sort === 'lowest') {
      return a.regularPrice - b.regularPrice;
    } else if (sort === 'highest') {
      return b.regularPrice - a.regularPrice;
    } else if (sort === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sort === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  };

  const sortedFilteredListings = filteredListings.sort(sortListings);

  return (
    <div className=' shadow-inner'>
      {loading && <p className="text-center my-7 text-2xl">...טוען...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">משהו השתבש!</p>
      )}
      <div className='flex flex-wrap flex-row gap-4 p-3 '>
      <div className='flex flex-wrap flex-row gap-4 p-3 justify-end'>
        <div>
      <select  className=" text-black p-3 rounded-lg uppercase text-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]" id='sort' onChange={ handleChange}>
        
        <option value="lowest">מהנמוך לגבוה </option>
        <option value="highest"> מהגבוה לנמוך </option>
        
      </select>
        </div>
        <div>
      <select  className=" text-black p-3 rounded-lg uppercase text-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]" id='howOld' onChange={ handleChange}>
        
        <option value="newest">החדש ביותר</option>
        <option value="oldest">הוותיק ביותר</option>
      </select>
        </div>
        <input
        type="text"
        className=" text-black p-3 rounded-lg uppercase text-center hover:opacity-95 flex justify-end shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
        placeholder="חיפוש מודעה"
        onChange={handleSearch}
        value={searchTerm}
      />
      </div>
      
      
    </div>
      
      {filteredListings.length > 0 ? (
        
        <div className='flex flex-wrap gap-4'>
              {filteredListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
        
      ) : (
        <p className="bg-red-600 w-full p-3 text-white text-center  rounded-md">וואלה לא מצאנו, תנסה לשנות את המילות מפתח או שפה </p>
      )}
    </div>
  );
}
