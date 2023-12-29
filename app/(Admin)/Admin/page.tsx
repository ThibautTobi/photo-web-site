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
        <div className="flex flex-col justify-around items-center">
            <h2>Administration</h2>
            <div className="p-8 bg-transparent border-8 rounded-md shadow-lg m-8">
                <AddPhoto />
            </div>
            <div className="p-8 bg-transparent border-8 rounded-md shadow-lg m-8">
                <AddShooting />
            </div>
            <div className="p-8 bg-transparent border-8 rounded-md shadow-lg m-8">
                <AddClient />
            </div>
        </div>
    )
}