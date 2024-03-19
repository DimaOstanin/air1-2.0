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

export default function Area() {
    const shareUrl = window.location.href;
    SwiperCore.use([Navigation]);
    const [area, setarea] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
  
    const [userareas, setUserareas] = useState([]);
    console.log(userareas);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
  
    useEffect(() => {
      fetcharea();
    }, [params.areaId]);
  
    const fetcharea = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/area/get/${params.areaId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setarea(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    const handleShowareas = async () => {
      try {
        const res = await fetch(`/api/user/areas/${area.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          return;
        }
  
        setUserareas(data);
      } catch (error) {}
    };
  
    return (
      <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">משהו השתבש!</p>}
        {area && !loading && !error && (
          <div>
            <Swiper navigation>
              {area.imageUrls.map((url) => (
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
                <p className="text-2xl font-semibold  ">{area.name}</p>
                <p className="text-2xl font-semibold  ">
                   {area.name}
                </p>
              </div>
              <hr></hr>
              <div className="flex flex-row justify-between">
                
                <p className="flex  items-right mt-1 gap-2 text-slate-600  text-sm ">
                  
                  {area.firPlayers}
                </p>
              </div>
              <hr></hr>
              <p className="flex text-slate-800 ">
                <span className="flex font-semibold text-black "> תיאור - </span>
                {" " + area.description}
              </p>
              
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
  
       
        <div>
         
          <div className="border border-lg border-black">
        <iframe
          src={area.googleEmbed}
          width="900"
          height="600"
          style={{ border: "99" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <a href={area.googleLocation}> place</a>
      </div>
        </div>
      </main>
    );
  }
  
