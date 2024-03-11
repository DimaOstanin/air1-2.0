import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import {
  TelegramShareButton,TelegramIcon,
  WhatsappShareButton,WhatsappIcon,
} from "react-share";

import Contact from "../components/Contact";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  const shareUrl = "https://www.npmjs.com/package/react-share"; // window.location.href
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [userListings, setUserListings] = useState([]);
  console.log(userListings)
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    
    fetchListing();
    UserListings();
  }, [params.listingId]);

  
  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  const UserListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${listing.userRef}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      setUserListings(data);
    } catch (error) {}
  };
  
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something  went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold  direction-rtl text-right">
              {listing.name} -  ₪ {listing.regularPrice.toLocaleString("en-US")}
            </p>
            <p className="flex justify-end items-right mt-1 gap-2 text-slate-600  text-sm ">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 justify-end">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.company}
              </p>
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.category}
              </p>
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.condition}
              </p>
            </div>
            <p className="flex text-slate-800 justify-end">
              {listing.description}
              <span className="flex font-semibold text-black justify-end">
                {" "}
                - תיאור{" "}
              </span>
            </p>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
      <div className="flex justify-around ">
      <TelegramShareButton url={shareUrl}>
          <TelegramIcon />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon />
        </WhatsappShareButton>
        <h1 className="text-center mt-7 text-2xl font-semibold">שיתוף</h1>

      </div>
      <div>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              מוצרים של המוכר{" "}
            </h1>
            {userListings.map((listing) => (
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
        )}
      </div>
    </main>
  );
}
