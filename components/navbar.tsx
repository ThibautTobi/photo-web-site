'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar () {
    const pathname = usePathname()

    return(
        <>
            <h2>Navigation</h2>
            <nav className="">
            <Link href="/" className={`p-2 ${pathname === '/' ? 'border-solid border-b-3' : ''}`}>Accueil</Link>
            <Link href="/a-propos" className={`p-2 ${pathname === '/a-propos' ? 'border-solid border-b-3' : ''}`}>À Propos</Link>
            <Link href="/Photos" className={`p-2 ${pathname === '/Photos' ? 'border-solid border-b-3' : ''}`}>photos</Link>
            <Link href="/Service" className={`p-2 ${pathname === '/Service' ? 'border-solid border-b-3' : ''}`}>Service</Link>
            <Link href="/Contact" className={`p-2 ${pathname === '/Contact' ? 'border-solid border-b-3' : ''}`}>Contact</Link>
            <Link href="/Connexion" className={`p-2 ${pathname === '/Connexion' ? 'border-solid border-b-3' : ''}`}>connexion</Link>
            </nav>
        </>
    )
}