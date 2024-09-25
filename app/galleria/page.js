import React from 'react'

import GalleryList from '@/components/GalleryList';
import styles from "./galleria.module.css";

export const metadata = {
  title: "Ecommerce | Galleria",
  description: "Un sito ecommerce",
};

export default async function Galleria() {
  return (
    <>
    <div className={styles['galleria-bkg']}></div>
    <main className='main-galleria-container'>
      <h1 className='main-h1'>Galleria</h1>
      <GalleryList />
    </main>
    </>
  )
}