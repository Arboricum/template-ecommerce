"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import anelloImg from '../public/img/homeAnim/ring-3417372_640.png'
import braccialeImg from '../public/img/homeAnim/collana.png'
import collanaImg from '../public/img/homeAnim/collana.png'
import orecchiniImg from '../public/img/homeAnim/decor-2483152_640.png'
import styles from "../app/page.module.css";

export default function HomeAnim() {
    const anim = useRef(null);
    const animElements = [
        {src: anelloImg, className: styles.anello}, 
        {src: braccialeImg, className: styles.bracciale}, 
        {src: collanaImg, className: styles.collana}, 
        {src: orecchiniImg, className: styles.orecchini}
    ];

    const [currentElementPosition, setCurrentElementPosition] = useState(0);
    const [nextAnim, setNextAnim] = useState(false);
    const currentElement = animElements[currentElementPosition];

    // Effetto per aggiornare la posizione dell'elemento
    useEffect(() => {
        let timeout
        if (currentElementPosition < (animElements.length - 1) && nextAnim) {
            setCurrentElementPosition(prevCurrentPosition => prevCurrentPosition + 1);
            anim.current.classList.remove(styles.anim);
            timeout = setTimeout(() => {
                setNextAnim(false); // Reset del trigger di animazione
            }, 100);  
        } else if (currentElementPosition === (animElements.length - 1) && nextAnim){
            setCurrentElementPosition(0);
            anim.current.classList.remove(styles.anim);
            timeout = setTimeout(() => {
                setNextAnim(false); // Reset del trigger di animazione
            }, 100);   
        }
        return () => clearTimeout(timeout);
    }, [nextAnim]);

    // Aggiorna l'elemento corrente e gestisce la rimozione della classe anim
    useEffect(() => {
        if (!nextAnim) {
            anim.current.classList.add(styles.anim);
        }
    }, [nextAnim]);

    return (
        <div 
            className={`${styles.jewels} ${currentElement.className}`} 
            ref={anim} 
            onAnimationEnd={() => {
                setNextAnim(true)
            }}
        >
            <Image 
                src={currentElement.src}
                alt='samples'
                width={400} height={200}
                style={{ width: '100%', height:'auto' }}
            />
        </div>
    );
}
