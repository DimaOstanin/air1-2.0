import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Shuk() {
  const [listings, setListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(listings);


  useEffect(() => {
    fetchListings();
  }, []);
  const fetchListings = async () => {
    try {
      const res = await fetch('/api/listing/get');
      const data = await res.json();
      setListings(data)
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="p-3 ">
      
      <div className="flex flex-wrap gap-4">
        {listings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  );
}
