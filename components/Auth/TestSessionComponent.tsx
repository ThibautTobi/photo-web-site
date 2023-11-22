
// 'use client'
//import { useEffect, useState } from 'react';
//import { useSession } from 'next-auth/react';

// export default function SessionComponent() {
//   const [session, setSession] = useState(null);
//   //const { data: session } = useSession();

//   useEffect(() => {
//     async function fetchSession() {
//       const response = await fetch('/api/auth/session');
//       if (response.ok) {
//         const sessionData = await response.json();
//          setSession(sessionData);
//       }
//     }

//     console.log(session)

//     fetchSession();
//   }, [session]);

//   if (!session) {
//     return <div>Chargement de la session...</div>;
//   }

//   return (
//     <div>
//       <p>Connecté en tant que: {session}</p>
//     </div>
//   );
// }



import { getServerSession } from "next-auth/next";
//import { useSession} from 'next-auth/react';

export default async function MonComposant() {
      // get the session
  const session = await getServerSession();

  console.log(session)

 // const { data: session,status } = useSession();

//   console.log(status,': et :',session)

//   if (status === 'loading') {
//     return <div>Chargement...</div>;
// }

if (session) {
    return <div>Connecté en tant que {session.user}</div>;
} else {
    return <div>sesion auth Non connecté</div>;
}

//   return (
//     <div>
//       {session ? (
//         <div>
//           <h1>Bienvenue {session.user}!</h1>
//           <p>Vous êtes connecté en tant que {session.user.email}</p>
//           <button >Se déconnecter</button>
//         </div>
//       ) : (
//         <div>
//           <h1>Non connecté</h1>
//           <button >Se connecter</button>
//         </div>
//       )}
//     </div>
//   );
}
