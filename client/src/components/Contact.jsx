import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  // const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  // useEffect(() => {
  //   const fetchLandlord = async () => {
  //     try {
  //       const res = await fetch(`/api/user/${currentUser.userRef}`);
  //       const data = await res.json();
  //       setLandlord(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchLandlord();
  // }, [listing.userRef]);
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* <p className="flex justify-end space-x-10 pr-10">
          <span className="font-semibold">
            {currentUser.username + " " + " : שמך"}
          </span>{" "}
        </p>
        <p className="flex justify-end space-x-10 pr-10">
          {" "}
          <span className="font-semibold">
            {currentUser.email + " " + "- : אימייל שלך"}
          </span>
        </p> */}
        <textarea
          name="subject"
          id="subject"
          rows="2"
          value={subject}
          onChange={onChangeSubject}
          placeholder="הכנס את הנושא שלך כאן..."
          className="w-full border p-0.5 rounded-lg derection-rtl text-right space-x-10"
        ></textarea>
        <textarea
          name="message"
          id="message"
          rows="2"
          value={message}
          onChange={onChangeMessage}
          placeholder="הכנס את הודעתך כאן..."
          className="w-full border p-3 rounded-lg text-right space-x-10"
        ></textarea>

        <Link
          to={`mailto:airsoft1israel@gmail.com?subject=${
            "   " + subject
          }&body=${message}`}
          className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
        >
          שלח אימייל 
        </Link>
      </div>
    </>
  );
}
