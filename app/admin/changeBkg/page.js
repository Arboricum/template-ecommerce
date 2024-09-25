"use client"
import React from 'react'
import Link from 'next/link'
//import { getAllSiteImages } from '@/lib/actions/siteImages.event';
import ImagesChangerForm from '@/components/ImagesChangerForm';
import ClipLoader from "react-spinners/ClipLoader";
//import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function ChangeBkg() {
  // Recupera le immagini dal database
  const [siteImages, setSiteImages] = useState({})
  const [loading, setLoading] = useState(true);
  const [newHomeFromOld, setNewHomeFromOld] = useState('')

  /* useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
          const data = await getAllSiteImages(); 
          setSiteImages(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []) */

  // Mostra uno spinner se sta caricando
 /*  if (loading) {
    return <ClipLoader color="#36d7b7" />;
  } */

  //const siteImages = await getAllSiteImages();

  // Controlla se ci sono immagini da visualizzare
  //const currentHomeImg = siteImages && siteImages.homeImg ? siteImages.homeImg : "Nessuna immagine disponibile";
  //const router = useRouter()
  return (
    <div>
      <Link href={`/admin`}>&nbsp;Admin&nbsp;&gt;&gt;</Link>
      <span>&nbsp;Image Changer</span>
      <h2>Image Changer</h2>
      <h3>Cambia l&apos;immagine della homepage con una nuova immagine</h3>
      {/* <ImagesChangerForm siteImages={siteImages || {}} newHomeFromOld={newHomeFromOld}/> */}
      <p>oppure, se presenti, scegli una delle vecchie immagini già usate per lo stesso scopo</p>
      {(siteImages && siteImages.oldHomeImgs && siteImages.oldHomeImgs.length > 0) && (
        siteImages.oldHomeImgs.map((oldImage, index) => {
          return (
            <img 
              key={oldImage + index} 
              src={oldImage}alt="Anteprima immagine" 
              style={{ maxWidth: '300px', height: 'auto'}} 
              onClick={() => setNewHomeFromOld(oldImage)}
            />
          )
        })
      )}
    </div>
  )
}
