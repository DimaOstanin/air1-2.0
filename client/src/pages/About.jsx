import React from 'react';
import Contact from '../components/Contact';
import { useSelector } from "react-redux";

export default function About() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
        <div className=' py-5 px-4 max-w-6xl mx-auto'>
      <h1 className='text-green-900  text-3xl font-bold mb-4 text-center'>AIRSOFT-1</h1>
      <p className='mb-4 text-slate-700 text-center uppercase'>This website is made by players for players </p>
      <p className='mb-4 text-slate-700 text-center uppercase'>אתר זה נוצר על ידי שחקנים עבור שחקנים</p>
      <p className='mb-4 text-slate-700 text-center uppercase'>сайт создан с помощью игроков для игроков</p>
      <hr></hr>
    </div>
    <h1 className='mb-4 text-slate-700 text-center uppercase'>אם יש לך משהו מעניין להציע להוסיף תוכן לאתר או עוד משהו מוכן להקשיב תמיד</h1>
    <hr></hr>
      <Contact />
      </div>
  )
}
