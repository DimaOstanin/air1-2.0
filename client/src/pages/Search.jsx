import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const [listings, setListings] = useState([])




  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListings(data);
      
    } catch (error) {
      
     
    }
  };


  return (
    <div>
      {listings.map((listing) => (
              <Link key={listing._id} to={`/listing/${listing._id}`}>
                <div className="border rounded-lg p-3 flex justify-between items-center gap-4">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                  <p>{listing.name}</p>
                  <p className="text-2xl font-semibold  direction-rtl text-right">
                    {listing.regularPrice.toLocaleString("en-US")}
                  </p>
                </div>
              </Link>
            ))}
    </div>
  );
}
