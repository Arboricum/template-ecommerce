import styles from "./page.module.css";
import HomeAnim from "@/components/HomeAnim";
//import { getAllSiteImages } from "@/lib/actions/siteImages.event";


// Metadata per la pagina
export const metadata = {
  title: "Ecommerce | Home",
  description: "Un sito di ecommerce",
};

export default async function Home() {
  // Recupera l'immagine dal database
  //const siteImages = await getAllSiteImages();

  // Verifica se l'immagine esiste
  //const backgroundImage = siteImages?.homeImg ? `url(${siteImages.homeImg})` : "";
  const backgroundImage = `url(/img/bgs/bg1.jpg)`

  return (
    <>
    <div className={styles.homeContainer} style={{ backgroundImage }}>
      
      {/* <LavoriSub />
      <Footer /> */}
    </div>
    <main className={styles.homeFreeSpace}>
      <section className={styles.homeTitle}>
        <h1 className={styles.h1HomeMain}>Cose</h1>
        <h1 className={styles.h1HomeMain}>Preziose</h1>
      </section>
      <HomeAnim />
    </main>
    </>
  );
}

