import React from 'react'
import logo from '../../public/img/logo/ninnoli.png'
import Image from 'next/image'
import Navbar from './Navbar'
import './Header.css'
import HeaderAdmin from './HeaderAdmin'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='header'>
      {/* <img src={logo} alt='logo' className='logo-header'/> */}
      <Link href='/'>
      <Image 
        src={logo} 
        width={200} 
        alt="logo" 
        priority={true} 
        style={{borderRadius: '10px', cursor: 'pointer'}}/>
      </Link>
      <Navbar />
      <HeaderAdmin />
    </header>
  )
}