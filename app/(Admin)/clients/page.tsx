import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function ListeClient(){

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
        <>
            <h2> liste des clients </h2>
        </>
    )
};

/*************************************** gestions des clients enregistrer  tableaux  pour modifier / supprimer / et autres */