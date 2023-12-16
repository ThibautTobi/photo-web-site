// 'use client'

import CircleSVG from "@/components/Layout/lame_spirale/circle";
import ModifiedCircleSVG from "@/components/Layout/lame_spirale/circleModif";
import ModifiedSVG from "@/components/Layout/lame_spirale/modifier_test";
import Obturateur from "@/components/Layout/lame_spirale/obturateur";
import OriginalSVG from "@/components/Layout/lame_spirale/original_test";
import SquareSVG from "@/components/Layout/lame_spirale/square";
import ModifiedSquareSVG from "@/components/Layout/lame_spirale/squareModif";


// import Parallax from "@/components/Layout/ParallaxEffect";

//import { useSession } from 'next-auth/react';


// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";

export default async function Home() {
  //récupération cotés server de la session
  // const session = await getServerSession(authOptions);
  //       console.log(session)

  // import tableau d'images static pour l'effect paralax
  // const images = [
    
  // ];

  return (
    <>
        <h1>Bienvenue à Notre Agence de Photographie</h1>
        <p>Découvrez notre monde à travers nos photos</p>
       
        {/* <Parallax images={images} /> */}
        {/* <div>LoL ceci est ma page acceuil</div>
        <p className='m-10 bg-slate-400'> test </p> */}
        
        {/* <p>test madification lame</p> */}

        {/* <h2>Obturateur</h2>
        <Obturateur />
        <h2>Square SVG</h2>
        <SquareSVG />
        <h2>Circle SVG</h2>
        <CircleSVG />
        <h2>Modified Square SVG</h2>
        <ModifiedSquareSVG />
        <h2>Modified Circle SVG</h2>
        <ModifiedCircleSVG />
        <h2>Original SVG</h2>
        <OriginalSVG />
        <h2>Modified SVG</h2>
        <ModifiedSVG /> */}
    </>
  )
}



/*


import { useSignIn } from "next-auth/react";

function SignInButton() {
  const signIn = useSignIn();
  
  return <button onClick={() => signIn('credentials')}>Se connecter avec credentials</button>;
}


import { useSignOut } from "next-auth/react";

function SignOutButton() {
  const signOut = useSignOut();
  
  return <button onClick={() => signOut()}>Se déconnecter</button>;
}


import { useProviders } from "next-auth/react";

function MyComponent() {
  const providers = useProviders();
  if (!providers) return null;

  return (
    <div>
      {Object.values(providers).map(provider => (
        <button key={provider.name} onClick={() => signIn(provider.id)}>
          Se connecter avec {provider.name}
        </button>
      ))}
    </div>
  );
}




*/