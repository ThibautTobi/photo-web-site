'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation";

/****************************************** page recupération de profil de connection Oauth avec*/

export default function Profile() {
  const { data: session,status } = useSession()

    if (status === 'loading') {
    return <p>Chargement...</p>;
    }
    if (!session){
      console.log(session)
      redirect('/')
    }

    // if (!session) {
    //     console.log("Non connecté");
    //     redirect("/") 
    // } else if(session.user.role !== 'user'){
    // console.log("Connecté en tant que", session.user, session.expires);
    // console.log('user role :', session.user.role);
    // console.log('pas égale a user')
    // redirect("/")
    // }else {
    //     console.log('égale a user')
    // }
  return (
    <>
        <h1>Votre Profil</h1>
        <p>Nom : {session.user.name}</p>

        <p>Role : {session.user.role}</p>
        
        <p>Email : {session.user.email}</p>
        <Image src={session.user.image} alt={session.user.name} />
        <button onClick={() => signOut()}>Déconnexion</button>
    </>
  )
}
