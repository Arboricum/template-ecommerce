"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewSlider from '../components/Slider';
import ClipLoader from "react-spinners/ClipLoader"; // Assicurati di aver installato react-spinners
import { getAllGalleryImages } from '@/lib/actions/gallery.action';
import './GalleryList.css'

export default function GalleryList() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [images, setImages] = useState([]); // Cambiato a array vuoto
    const [loading, setLoading] = useState(false);

    const handleClick = (index) => {
        setCurrentSlide(index);
        setIsSliderOpen(true);
    };

    const handleSlider = () => {
        setIsSliderOpen(false);
    };

    useEffect(() => {
        const fetchEvents = async () => {
          setLoading(true);
          try {
            const galleryImages = await getAllGalleryImages();
            const images = galleryImages ? galleryImages.images.map(img => img.trim()) : [];
            console.log("Loaded images:", images); // Aggiungi questo per vedere gli URL delle immagini
            setImages(images);
          } catch (error) {
            console.error("Error fetching events:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEvents();
    }, []);
    

    if (loading) {
        return <ClipLoader color="#36d7b7" />; // Mostra uno spinner durante il caricamento
    }

    return (
        <>
            {!isSliderOpen && (
                <section className="portfolio-container">
                    <div className="portfolio">
                        {images.map((img, index) => {
                            return (
                                <figure 
                                    key={index} 
                                    className="portfolio-images-container"
                                    onClick={() => handleClick(index)}
                                >
                                    <Image 
                                        src={img}  
                                        className="portfolio-images" 
                                        alt={`Image ${index}`} // Dovresti fornire un alt descrittivo
                                        width={300} // Puoi regolare la larghezza e altezza in base alle tue esigenze
                                        height={200}
                                        loading="lazy"
                                        style={{height:'auto'}}
                                    />
                                    <figcaption>Didascalia</figcaption>
                                </figure>
                            );
                        })} 
                    </div>
                </section>
            )}
            {isSliderOpen && (
                <NewSlider
                    currentSlide={currentSlide}
                    handleSlider={handleSlider}
                    images={images}
                />
            )}
        </>
    );
}
