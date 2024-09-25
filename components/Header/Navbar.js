"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
//import LavoriLink from '../LavoriLink';
import { useContext } from 'react';
import { CartContext } from '@/context/StateContext';
import './Navbar.css'
import { CgShoppingCart } from "react-icons/cg";
import Image from 'next/image';
import hamburger from '../../public/img/hamburger.png'

export default function Navbar() {
  const {totalQuantities} = useContext(CartContext)
  const [isHambOpen, setIsHambOpen] = useState(false)
  useEffect(() => {
    console.log(isHambOpen)
  }, [isHambOpen])
  return (
    <nav className='navbar'>
      <ul className='classic-menu'>
        <li onClick={() => setIsHambOpen(false)}><Link href='/'>HOME</Link></li>
        <li onClick={() => setIsHambOpen(false)}><Link href='/chisono'>CHI SONO</Link></li>
        {/* <li><Link href='/lavori'>LAVORI</Link></li> */}
        {/* <li><Link href=''><LavoriLink /></Link></li> */}
        {/* <li><Link>SERVIZI</Link></li> */}
        <li onClick={() => setIsHambOpen(false)}><Link href='/galleria'>GALLERIA</Link></li> 
        <li onClick={() => setIsHambOpen(false)}><Link href='/shop'>NEGOZIO</Link></li>
        <li onClick={() => setIsHambOpen(false)}><Link href='/cart'><CgShoppingCart style={{color: 'black'}}/>({totalQuantities})</Link></li>
        {/* al posto di (0) poi passiamo la prop {itemsInCart} */}
      </ul>
      <span 
        onClick={() => setIsHambOpen(false)}
        className='hamb-cart'
      >
        <Link href='/cart'>
          <CgShoppingCart style={{color: 'black'}}/>({totalQuantities})
        </Link>
      </span>
      <div className='hamb-menu-ico' onClick={() => setIsHambOpen(!isHambOpen)}>
        <Image 
          src={hamburger}
          width={80}
          height={80}
          alt={'menu'}
          style={{height: 'auto'}}
        />
      </div>
      {isHambOpen && (
        <div className='hamb-menu-container'>
          <ul className='hamb-menu'>
            <li onClick={() => setIsHambOpen(false)}><Link href='/'>HOME</Link></li>
            <li onClick={() => setIsHambOpen(false)}><Link href='/chisono'>CHI SONO</Link></li>
            {/* <li><Link href='/lavori'>LAVORI</Link></li> */}
            {/* <li><Link href=''><LavoriLink /></Link></li> */}
            {/* <li><Link>SERVIZI</Link></li> */}
            <li onClick={() => setIsHambOpen(false)}><Link href='/galleria'>GALLERIA</Link></li> 
            <li onClick={() => setIsHambOpen(false)}><Link href='/shop'>NEGOZIO</Link></li>
            
            {/* al posto di (0) poi passiamo la prop {itemsInCart} */}
          </ul>
        </div>
      )}
    </nav>
  )
}