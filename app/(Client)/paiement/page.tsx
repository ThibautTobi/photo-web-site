import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function PaiementClient(){

    /********************************************************************************************* recupération du role admin si connecter dans le context sans next auth */

const session : any = await getServerSession(authOptions);

    if (!session) {
        console.log("Non connecté");
        redirect("/") 
    } else if(session.user.role !== 'user'){
    console.log("Connecté en tant que", session.user, session.expires);
    console.log('user role :', session.user.role);
    console.log('pas égale a user')
    redirect("/")
    }else {
        console.log('égale a user')
    }
    return(
        <>
            <h2> paiement du client </h2>
        </>
    )
};


/*********************************************** page client pour paiement services et possiblement produit deriver */