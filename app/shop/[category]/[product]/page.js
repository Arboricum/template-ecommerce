
import Link from "next/link"
import CardDetails from "@/components/CardDetails";
//import { adminContext } from "@/context/adminContext";
import { getEventById } from "@/lib/actions/event.action";
import Avviso from "@/components/Avviso";
import '../../Shop.css'

export const metadata = {
    title: "Ecommerce | Shop",
    description: "Un sito ecommerce",
  };

export default async function Product({params}) {
    const eventSingle = await getEventById(params.product)
    return (
        <>
        <div className={'shop-bkg'}></div>
        <main className="shopSubDet-main">
            <Avviso></Avviso>
            <div className="shopSubDet-path">
                <Link href="/shop">Shop&nbsp;&gt;&gt;</Link>
                <Link href={`/shop/${eventSingle.category}`}>&nbsp;{eventSingle.category}&nbsp;&gt;&gt;</Link>
                <span>&nbsp;{eventSingle.title}</span>
            </div>
            <CardDetails eventSingle={eventSingle} parent={params.category? 'category' : null}/>
        </main>
        </>
    )
}