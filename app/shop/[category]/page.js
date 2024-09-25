import Link from "next/link";

import Avviso from "@/components/Avviso";
import CategoryProdList from "@/components/CategoryProdList";
import '../Shop.css'

export const metadata = {
  title: "Ecommerce | Shop",
  description: "Un sito ecommerce",
};

export default function Category({ params }) {
  return (
    <>
    <div className={'shop-bkg'}></div>
    <main className="shopSubDet-main">
      <Avviso></Avviso>
      <div className="shopSubDet-path">
        <Link href="/shop">Shop&nbsp;&gt;&gt;</Link>
        <span>&nbsp;{params.category}</span>
      </div>
      <h1 className="shopSubDet-category-title">{params.category}</h1>
      <CategoryProdList category={params.category}/>      
    </main>
    </>
  );
}
