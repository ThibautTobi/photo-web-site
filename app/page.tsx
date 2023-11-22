// 'use client'

//import { useSession } from 'next-auth/react';


// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";

export default async function Home() {
  //récupération cotés server de la session
  // const session = await getServerSession(authOptions);
  //       console.log(session)

  return (
    <>

        <div>LoL ceci est ma page acceuil</div>
        <p className='m-10 bg-slate-400'> test </p>

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