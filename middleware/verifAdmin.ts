
// import { getSession } from 'next-auth/react';

// export async function verifyAdmin(req, res, next) {
//   const session = await getSession({ req });
//   if (session && session.user.role === 'admin') {
//     next(); // Continuer si l'utilisateur est admin
//   } else {
//     res.status(403).json({ message: 'Accès réservé aux administrateurs' });
//   }
// }

// import type { NextResponse } from 'next/server';


// import type { NextRequest } from 'next/server'

// import { getSession } from 'next-auth/react';

// export async function verifyAdmin(req: NextRequest, res: NextResponse, next: () => void) {
//   const session = await getSession({ req });
//   if (session && session.user.role === 'admin') {
//     next(); // Continuer si l'utilisateur est un user standard
//   } else {
//     res.status(403).json({ message: 'Accès réservé' });
//   }
// }


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