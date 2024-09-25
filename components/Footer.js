import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <ul>
            <li>Privacy policy</li>
            <li>Cockie Policy</li>
            <li>Condizioni d’Uso</li>
            <li>Sitemap</li>
            <li><Link href='/contatti'>Contatti</Link></li>
        </ul>
    </footer>
  )
}