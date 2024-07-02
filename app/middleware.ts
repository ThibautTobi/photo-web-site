// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//import { getSession } from 'next-auth/react';

/*** detection du role si non connecter ou connecter et si connecter en user ou admin  */


//export async function middleware(request: NextRequest) {

  // const roleCookie : any = request.cookies.get('role') || '';
  // console.log('voici roleCookie :', roleCookie);
  

    //// const session = await getSession(request);
    //// console.log('voici session :',session)

    // if (!roleCookie) {
    //   console.log("test middleware : non connecté")
    // } else if (roleCookie === 'invite') {
    //   console.log("Connecté avec le Role: Invité");
    // } else if (roleCookie === 'user') {
    //   console.log("Connecté avec le Role: User");
    // } else if (roleCookie === 'admin') {
    //   console.log("Connecté avec le Role: Admin");
    // }
  
    // Pas de redirection, juste une détection de rôle
    //return (
      //NextResponse.json({"mon role de connection": roleCookie})
      //NextResponse.next()
      //)
  //}


/**************************** code pour verifier si admin pour requette **************************/
/***
 * 
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function verifyAdmin(req: NextRequest) {
  try {
    // Cast req en tant qu'IncomingMessage
    const session = await getSession({ req : req as any });

    if (session?.user.role === 'admin') {
      // Continuer si l'utilisateur est un admin
      return NextResponse.next();
    } else {
      return new NextResponse(JSON.stringify({ message: 'Accès réservé' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Erreur serveur' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
 * 
 */


// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 

// export const config = {
//   matcher: '/about/:path*',
// }


/************************************ autre possibiliter */


// pages/api/role.js
// import { getSession } from 'next-auth/react';

// export default async (req, res) => {
//   const session = await getSession({ req });
//   if (session) {
//     res.json({ role: session.user.role });
//   } else {
//     res.json({ role: 'non connecté' });
//   }
// };


//et 

// Dans un composant React, par exemple :
// useEffect(() => {
//   fetch('/api/role')
//     .then(res => res.json())
//     .then(data => console.log('Rôle:', data.role));
// }, []);
