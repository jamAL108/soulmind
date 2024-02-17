import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import './MusicPreloader.css';

const MusicPreloader = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [nodisplay, setnodisplay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  setTimeout(() => {
    setnodisplay(true);
  }, 2200);

  return (
    <>
      <div className={`${nodisplay ? 'noDisp' : ''} preloader-popup ${showPopup ? 'show' : 'hide'}`}>
        <h2>
          <FontAwesomeIcon className='headph' icon={faHeadphones} /> <br/>Headphones <br/> Recommended
        </h2>
      </div>
      {/* Rest of your page content */}
    </>
  );
};

export default MusicPreloader;
