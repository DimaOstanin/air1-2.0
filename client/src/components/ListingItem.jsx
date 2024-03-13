import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className=" w-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[250px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <div className="flex flex-row justify-between gap-2 w-full">
            <p className="text-slate-500 mt-2 font-semibold  direction-rtl text-right">
               {listing.regularPrice.toLocaleString("en-US")}₪
            </p>
            <p className="truncate text-lg font-semibold text-slate-700">
              {listing.name}
            </p>
          </div>
          <div className="flex flex-row justify-between gap-2 w-full">
            <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.condition}
          </p>
          </div>
          
        </div>
      </Link>
    </div>
  );
}
