// 'use client'
//import { useSession}  from "next-auth/react";

import SelectShooting from "@/components/Formulaire/SelectShooting";
import { redirect } from "next/navigation";

/*******************************page client pour récupérer les image de shooting et selectionner les images a retoucher avant de pouvoir télécharger les version final  */

// export default function ChoixPhoto ({props.session}){

//     // const { data: session, status } = useSession();
// console.log(props)
//     console.log('Data session',session)
//     console.log('Data status',status)
  
//   if(session){
//       console.log('il y a une session ')
//   }else{
//       console.log(`il n'y a pas de session`)
  
//   }
//     return(
//         <>
//             {/* <ProviderAuth> */}
//                 <h2>Choix Photo</h2>
//                 <SelectShooting />
//             {/* </ProviderAuth> */}
//         </>
//     )
// }

// export async function getServerSideProps(context : GetServerSidePropsContext) {
//     const session = await getSession(context);
  
//     return {
//       props: { session },
//     };
//   }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function ChoixPhoto (){

   const session : any = await getServerSession(authOptions);

    //const { data: session, status } = useSession();

    // if (status === 'loading') {
    // return <p>Chargement...</p>;
    // }

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

                <h2>Choix Photo</h2>
                <SelectShooting />

        </>
    )
}