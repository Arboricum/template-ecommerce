import React from 'react'
import ContattiForm from '@/components/ContattiForm'
import ctcBg from '../../public/img/bgs/contatti.jpg'
import './Contatti.css'
import Image from 'next/image';

export const metadata = {
  title: "Ecommerce | Contatti",
  description: "Un sito ecommerce",
};

export default function Contatti() {
    
  return (
    <>
    <div className='contatti-bkg'></div>
    <main className='main-contatti-container'>
      <h1 className='main-h1'>Contatti</h1>
      <div className='main-contatti'>
        
        <section className='section-contatti'>
          <div className='address-contatti'>
              <h1>INVIA UN MESSAGGIO</h1>
          </div>
          <ContattiForm />
        </section>
        <aside className='img-contatti-container'>
          {/* <Image src={ctcBg} alt='immagine background contatti'/> */}
        </aside>
      </div>
    </main>
    </>
  )
}
