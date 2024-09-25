import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "slick-carousel/slick/slick.css";  // Import degli stili di slick-carousel
import "slick-carousel/slick/slick-theme.css";  // Import del tema di slick-carousel
import styles from "./Slider.module.css";  // Usare CSS Module per Next.js
import Image from 'next/image';  // Usare Image di Next.js

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#00B894" }}
      onClick={onClick}
    />
  );
}

export default function NewSlider({ 
  currentSlide, 
  handleSlider, 
  images
}) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        sliderRef.current.slickNext();
      } else if (e.key === 'ArrowLeft') {
        sliderRef.current.slickPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    lazyLoad: true,
    adaptiveHeight: false,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

  return (
    <div className={styles['slider-container']}>
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <FontAwesomeIcon 
              icon={faCircleXmark} 
              onClick={handleSlider} 
              className={styles['close-icon']} // Usare CSS Module
            />
            <figcaption className={styles['caption']}></figcaption>
            <Image
              src={img}
              alt={"img.alt"}
              className={styles['slide-img']}
              width={800} // Definisci la larghezza dell'immagine
              height={600} // Definisci l'altezza dell'immagine
              style={
                {
                  height: '80vh', 
                  width: 'auto',
                  maxWidth: '99%',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
              }
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
