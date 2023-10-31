'use client'
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useRole } from "./roleContext";
import { useRouter } from 'next/navigation'

export default function Navbar () {
    const pathname = usePathname()
    const { user } = useRole();
    const router = useRouter();

async function onLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    await fetch('/api/logout', { method: 'POST' })
        .then(response => response.ok)
        .then(res => {
            if (res) {
                router.push('/')
                window.location.reload();
                console.log('succes suppresion cookies')
            } else {
                console.error('Erreur lors de la déconnexion.');
            }
        });
    }

    return(
        <>
            <h2>Navigation</h2>
            <nav className="">
            <Link href="/" className={`p-2 ${pathname === '/' ? 'border-solid border-b-3' : ''}`}>Accueil</Link>
            <Link href="/a-propos" className={`p-2 ${pathname === '/a-propos' ? 'border-solid border-b-3' : ''}`}>À Propos</Link>
            <Link href="/Photos" className={`p-2 ${pathname === '/Photos' ? 'border-solid border-b-3' : ''}`}>photos</Link>
            <Link href="/Service" className={`p-2 ${pathname === '/Service' ? 'border-solid border-b-3' : ''}`}>Service</Link>
            <Link href="/Contact" className={`p-2 ${pathname === '/Contact' ? 'border-solid border-b-3' : ''}`}>Contact</Link>
            <Link href="/TestConnect" className={`p-2 ${pathname === '/TestConnect' ? 'border-solid border-b-3' : ''}`}>TestConnect</Link>
            {/* <Link href="/Connexion" className={`p-2 ${pathname === '/Connexion' ? 'border-solid border-b-3' : ''}`}>connexion</Link> */}

            { (user?.role === 'user' || user?.role === 'admin') 
                ? <a href='#' onClick={onLogout} className={`p-2 ${pathname === '/Logout' ? 'border-solid border-b-3' : ''}`}>Logout</a>
                : <Link href="/Login" className={`p-2 ${pathname === '/Login' ? 'border-solid border-b-3' : ''}`}>Login</Link>
            }

            {user?.role === 'user' && <Link href="/Choix" className={`p-2 ${pathname === '/Choix' ? 'border-solid border-b-3' : ''}`}>Test user</Link>}
            {user?.role === 'admin' && <Link href="/Admin" className={`p-2 ${pathname === '/Admin' ? 'border-solid border-b-3' : ''}`}>Test admin</Link>}
            </nav>
        </>
    )
}