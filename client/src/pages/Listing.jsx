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
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function Listing() {
  const shareUrl = window.location.href;
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const [userListings, setUserListings] = useState([]);
  console.log(userListings);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchListing();
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
  const handleShowListings = async () => {
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
      {error && <p className="text-center my-7 text-2xl">משהו השתבש!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] left-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
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
              הקישור הועתק!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-semibold  ">{listing.name}</p>
              <p className="text-2xl font-semibold  ">
                 ₪ {listing.regularPrice.toLocaleString("en-US")}
              </p>
            </div>
            <hr></hr>
            <div className="flex flex-row justify-between">
              <p className="flex font-semibold text-black">
                חברה - {listing.company}
              </p>
              <p className="flex  items-right mt-1 gap-2 text-slate-600  text-sm ">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
            </div>
            <hr></hr>
            <p className="flex text-slate-800 ">
              <span className="flex font-semibold text-black "> תיאור - </span>
              {" " + listing.description}
            </p>
            <hr></hr>
            <div className="flex gap-4 ">
              <p className="bg-slate-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.condition}
              </p>
              <p className="bg-slate-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.category}
              </p>
            </div>
            <hr></hr>
            {currentUser && listing.userRef !== currentUser._id && (
              <div className=" flex flex-row  space-x-20">
                <hr></hr>
                <h1 className="text-center  text-2xl font-semibold">
                  צור קשר עם המוכר
                </h1>
                <a
                  href={`https://wa.me/${listing.userPhone}?text=${
                    window.location.href + " " + listing.name + " "
                  }שלום+זה+בקשר+למודעה`}
                  className="whatsapp_float"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon borderRadius="25" />
                </a>
                
              </div>
            )}
            <hr></hr>
          </div>
        </div>
      )}

      <div className="flex  space-x-20 ">
        
        <h1 className="text-center  text-2xl font-semibold">שיתוף מודעה</h1>
        
        <WhatsappShareButton url={shareUrl} title={"  תראה מצאתי את"}>
          <WhatsappIcon borderRadius="25" />
        </WhatsappShareButton>
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon borderRadius="25" />
        </TelegramShareButton>
      </div>

      <button
        onClick={handleShowListings}
        className="text-black w-full mt-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-3 rounded-lg uppercase text-center hover:opacity-95"
      >
        הצג מודעות של מוכר
      </button>
      <div>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              מודעות של מוכר{" "}
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
                    {listing.regularPrice.toLocaleString("en-US")+"₪"}
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
