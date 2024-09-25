import React from 'react'
import styles from "./chisono.module.css";
import Image from 'next/image';

export const metadata = {
  title: "Ecommerce | Chi sono",
  description: "Un sito ecommerce",
};

export default function ChiSono() {
  return (
    <>
    <div className={styles['chisono-bkg']}>
    
    </div>
    <main>
        <h1  className='main-h1'>Chi sono</h1>  
        <section className={styles['chisono-section']}>
          <div>
            <Image 
              src={'/img/crafter/crafter1.jpg'}
              alt='crafter'
              width={300} height={200} 
              style={{width: '100%', height: 'auto'}}
              loading="eager"
            />
          </div>
          <article>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus, ipsum non sodales posuere, felis elit varius diam, eu finibus leo nunc non magna. Maecenas vitae tortor aliquam, finibus diam eget, suscipit orci. Integer aliquam elit ut libero ultricies bibendum. Maecenas ultricies massa eleifend mattis venenatis.</p>
            <br/>
            <p>Cras eu arcu a justo vehicula euismod eget eget augue. Maecenas fringilla, tortor ut malesuada pretium, mi ipsum tempor nisl, eget congue ex augue vitae arcu. In elit tellus, tincidunt id odio quis, gravida rhoncus sapien. Nam aliquam mattis finibus. Donec quis consequat elit. Nullam arcu leo, accumsan non luctus quis, suscipit ut nulla. Aenean ut malesuada nulla. Quisque tempor mi quis elit luctus ullamcorper.</p>
          </article>
        </section>
        <hr />
        <section className={styles['chisono-section']}>
          <div>
            <Image 
              src={'/img/crafter/crafter2.jpg'}
              alt='crafter'
              width={300} height={200} 
              style={{width: '100%', height: 'auto', display: 'block'}}
              loading="eager"
            />
          </div>
          <article>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus, ipsum non sodales posuere, felis elit varius diam, eu finibus leo nunc non magna. Maecenas vitae tortor aliquam, finibus diam eget, suscipit orci. Integer aliquam elit ut libero ultricies bibendum. Maecenas ultricies massa eleifend mattis venenatis.</p>
            <br/>
            <p>Cras eu arcu a justo vehicula euismod eget eget augue. Maecenas fringilla, tortor ut malesuada pretium, mi ipsum tempor nisl, eget congue ex augue vitae arcu. In elit tellus, tincidunt id odio quis, gravida rhoncus sapien. Nam aliquam mattis finibus. Donec quis consequat elit. Nullam arcu leo, accumsan non luctus quis, suscipit ut nulla. Aenean ut malesuada nulla. Quisque tempor mi quis elit luctus ullamcorper.</p>
            <br/>
            <p>Quisque id nisi in magna congue lobortis in sed nulla. Quisque id condimentum libero, vitae luctus neque. Phasellus eu justo elit. Nam sodales non ex id porttitor. Nunc ultricies varius tellus, sit amet placerat ipsum bibendum eget. In tristique pellentesque orci at lobortis. Ut vel congue turpis. Suspendisse potenti. Nullam rhoncus sem vel ligula lacinia auctor. Nullam faucibus porttitor nibh eget pulvinar. Quisque ut urna in libero aliquam tempor. Nulla vestibulum augue ac libero hendrerit, nec iaculis lectus semper. Donec tempor enim eu ex tincidunt dignissim. Phasellus in nisl a ligula condimentum ultricies ac fringilla ex. Donec eget egestas nisl.</p>
          </article>
        </section>
        <hr />
        <section className={styles['chisono-section']}>
          <div>
            <Image 
              src={'/img/crafter/crafter3.jpg'}
              alt='crafter'
              width={300} height={200} 
              style={{width: '100%', height: 'auto', display: 'block'}}
              loading="eager"
            />
          </div>
          <article>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus, ipsum non sodales posuere, felis elit varius diam, eu finibus leo nunc non magna. Maecenas vitae tortor aliquam, finibus diam eget, suscipit orci. Integer aliquam elit ut libero ultricies bibendum. Maecenas ultricies massa eleifend mattis venenatis.</p>
          </article>
        </section>
        <hr />
    </main>
    </>
  )
}
