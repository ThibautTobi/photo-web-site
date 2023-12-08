// 'use client'
// import { useSession } from "next-auth/react";

import AddClient from "@/components/Formulaire/FormAddClient";
import { AddPhoto } from "@/components/Formulaire/FormAddPhoto";
import { AddShooting } from "@/components/Formulaire/FormAddShooting";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Administration (){

/********************************************************************************************* recupération du role admin si connecter dans le context sans next auth */

const session : any = await getServerSession(authOptions);

// const { data: session, status } = useSession();

//     if (status === 'loading') {
//     return <p>Chargement...</p>;
//     }

    if (!session) {
        console.log("Non connecté");
        redirect("/") 
    } else {
    console.log("Connecté en tant que", session.user, session.expires);

    if (session.user.role !== 'admin') {
        console.log('user role :', session.user.role);
        console.log('pas égale a admin')
        redirect("/")
    }else{
        console.log('égale a admin')
    }
    }

    return(
        <>
            <h2>Administration</h2>
            <p className="m-6"> Ajout de photo dans la partie photos du site</p>
            <AddPhoto />
            <p className="m-6"> Ajout des photos d un shootings dans l espace du client</p>
            <AddShooting />
            <p className="m-6"> Ajout de nouveaux client cotés administration avec verification admin si la route </p>
            <AddClient />
        </>
    )
}