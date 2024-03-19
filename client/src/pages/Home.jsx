import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [listings, setListings] = useState([]);
  const pistols = "אקדח";
  const bigguns = "כלי חשמלי ";
  const accessories = "(על הכלי) אביזרים";
  const spareParts = "(פנימי) חלקי חילוף";
  SwiperCore.use([Navigation]);
  console.log(listings);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/get");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div className="">
      {/* top */}
      <span className=" flex justify-end"> אתר בפיתוח v 1.1</span>

      <div className="flex flex-col gap-6 p-110 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl text-right">
          ברוכים הבאים <br />
          למקום הטוב ביותר לשחקני איירסופט
        </h1>
        <div className="text-gray-500 text-right text-xs sm:text-sm">
          בהמשך לפיתוח אתר תוכלו להנות ממגוון שירותים שהמון זמן רציתם
          <br />
          משחקים גדולים הצטרפות לקבוצה ועוד הפתעות 
          <br />
          אתם כבר יכולים להשאיר מודעות על מכירת ציוד שלכם דרך הפרופיל
          <br />
          רק אל תשכחו להתחבר ולהשלים נתונים שלכם
        </div>
      </div>
      <hr className="m-3"></hr>
      <h1 className="text-2xl font-semibold text-slate-600  mb-3 text-center">
        גלריה תמונות של מודעות
      </h1>
      {/* swiper */}
      <Swiper navigation>
        {shuffle(listings).map((listing) => (
          <SwiperSlide key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-1">
        <h2 className="text-slate-700 font-bold text-2xl lg:text-4xl text-center">
          ציוד אחרון שעלה לאתר
        </h2>
        <div className="">
          <div className="my-1">
            <h2 className="text-2xl font-semibold text-slate-600  text-right">
              כלי אקדח
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {listings
              .filter((listing) => listing.category === pistols)
              .reverse()
              .slice(0, 3)
              .map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <hr></hr>
        <div className="">
          <div className="my-1">
            <h2 className="text-2xl font-semibold text-slate-600 text-right">
              כלי ארוך
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {listings
              .filter((listing) => listing.category === bigguns)
              .reverse()
              .slice(0,3)
              .map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <hr></hr>
        <div className="">
          <div className="my-1">
            <h2 className="text-2xl font-semibold text-slate-600 text-right">
              אביזר לכלי{" "}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {listings
              .filter((listing) => listing.category === accessories)
              .reverse()
              .slice(0,3)
              .map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <hr></hr>
        <div className="">
          <div className="my-1">
            <h2 className="text-2xl font-semibold text-slate-600 text-right">
              חלקי חילוף
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {listings
              .filter((listing) => listing.category === spareParts)
              .reverse()
              .slice(0, 3)
              .map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
