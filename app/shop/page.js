import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './Shop.css'
import Avviso from '@/components/Avviso'
import Orecchini from '../../public/img/menu/orecchini.jpg'
import Collane from '../../public/img/menu/collane.jpg'
import Bracciali from '../../public/img/menu/bracciali.jpg'
import Anelli from '../../public/img/menu/anelli.jpg'

const shopList = [
    {
        title: "Orecchini",
        menuImg: Orecchini
    },
    {
        title: "Collane",
        menuImg: Collane
    },
    {
        title: "Bracciali",
        menuImg: Bracciali
    },
    {
        title: "Anelli",
        menuImg: Anelli
    }
]

export const metadata = {
    title: "Ecommerce | Shop",
    description: "Un sito ecommerce",
  };

export default function Shop() {
    return (
        <>
        <div className={'shop-bkg'}>
    
    </div>
        <main className='shop-main'>
            <h1 className='main-h1'>Shop</h1>
            <Avviso></Avviso>
            <section className='shop-section'>
                {shopList && (
                    shopList.map((menu, index) => {
                        return (
                        <Link 
                            href={`/shop/${menu.title}`} 
                            key={`shop${index}`} 
                            className='shop-menu'
                        >
                            <h1 className='menu-title'>{menu.title}</h1>
                            <Image
                                src={menu.menuImg} 
                                alt='menu.menuImg'
                                width={300}
                                height={200}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                loading="eager"
                            />
                        </Link>
                        )
                    })
                )}
            </section>
        </main>
        </>
      )
}
