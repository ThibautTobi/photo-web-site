'use client'

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

/*****  gestion avec provider / sans NextAuth */
//import { useRole } from "../Context/roleContext";

export default function Navbar () {
    const pathname = usePathname()
    const { data: session } = useSession();
    const router = useRouter();

    /**** utilisation role context / sans NextAuth */
    // const { user } = useRole();

/****************************************************************************gestion deconnexion avec un Context */
// async function onLogout(e: React.MouseEvent<HTMLAnchorElement>) {
//     e.preventDefault();
//     await fetch('/api/logout', { method: 'POST' })
//         .then(response => response.ok)
//         .then(res => {
//             if (res) {
//                 router.push('/')
//                 window.location.reload();
//                 console.log('succes suppresion cookies')
//             } else {
//                 console.error('Erreur lors de la déconnexion.');
//             }
//         });
//     }

/****************************************************** utilisation de signOut de next Auth pour se deconnecter */
            const handleLogout = async (e : React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                await signOut({ redirect: false });
                router.push('/');
            };

    return(
        <>
            <nav className="">
                <Link href="/" className={`p-2 ${pathname === '/' ? 'border-solid border-b-3' : ''}`}>Accueil</Link>
                <Link href="/a-propos" className={`p-2 ${pathname === '/a-propos' ? 'border-solid border-b-3' : ''}`}>À Propos</Link>
                <Link href="/Photos" className={`p-2 ${pathname === '/Photos' ? 'border-solid border-b-3' : ''}`}>photos</Link>
                <Link href="/Service" className={`p-2 ${pathname === '/Service' ? 'border-solid border-b-3' : ''}`}>Service</Link> 
                <Link href="/Contact" className={`p-2 ${pathname === '/Contact' ? 'border-solid border-b-3' : ''}`}>Contact</Link>

                {/*  avec utilisation de Context pour changer Login en Logout et aussi géré la deconexion  / sans NextAuth*/}
                {/* { (user?.role === 'user' || user?.role === 'admin') 
                    ? <a href='#' onClick={onLogout} className={`p-2 ${pathname === '/Logout' ? 'border-solid border-b-3' : ''}`}>Logout</a>
                    : <Link href="/Login" className={`p-2 ${pathname === '/Login' ? 'border-solid border-b-3' : ''}`}>Login</Link>
                }*/}

                {/* ******************************** Bouton de connexion/déconnexion conditionnel avec next Auth *************************** */}
                {session ? (
                        <Link href="#" onClick={handleLogout} className={`p-2 ${pathname === '/Logout' ? 'border-solid border-b-3' : ''}`}>Déconnexion</Link>
                    ) : (
                        <Link href="/Login" className={`p-2 ${pathname === '/Login' ? 'border-solid border-b-3' : ''}`}>Connexion</Link>
                    )}
                
                {session?.user.role === 'user' && <Link href="/Choix" className={`p-2 ${pathname === '/Choix' ? 'border-solid border-b-3' : ''}`}>Choix</Link>}
                {session?.user.role === 'user' && <Link href="/Profil" className={`p-2 ${pathname === '/Choix' ? 'border-solid border-b-3' : ''}`}>Profil</Link>}
                {session?.user.role === 'admin' && <Link href="/Admin" className={`p-2 ${pathname === '/Admin' ? 'border-solid border-b-3' : ''}`}>Administration</Link>}
            </nav>
        </>
    )
}