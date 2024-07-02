import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function verifyUser(req: NextRequest) {
  try {
    // Cast req en tant qu'IncomingMessage
    const session = await getSession({ req : req as any });

    if (session?.user.role === 'user') {
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


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server'
// import { getSession } from 'next-auth/react';

// export async function verifyUser(request: NextRequest) {
//   const session = await getSession({ request });
//   if (session && session.user.role === 'user') {
//     NextResponse.next(); // Continuer si l'utilisateur est un user standard
//   } else {
//     NextResponse.json({ message: 'Accès réservé aux utilisateurs standard'},{status :403});
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';

// export async function verifyUser(req: NextApiRequest, res: NextApiResponse, next: () => void) {
//   const session = await getSession({ req });
//   if (session && session.user.role === 'user') {
//     next(); // Continuer si l'utilisateur est un user standard
//   } else {
//     res.status(403).json({ message: 'Accès réservé aux utilisateurs standard' });
//   }
// }


// Middleware de Rate Limiting :

// Utilisation : Limite le nombre de requêtes qu'un utilisateur peut faire dans un certain temps pour prévenir les attaques par force brute.
// Exemple de Code :
// javascript
// Copy code
// // middleware/rateLimiter.js
// import rateLimit from 'express-rate-limit';

// export const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limite chaque IP à 100 requêtes par fenêtre
// });
// Middleware de Validation des Données :

// Utilisation : Assure que les données entrantes, comme les données de formulaire, respectent certains critères.
// Exemple de Code :
// javascript
// Copy code
// // middleware/validate.js
// export function validateMiddleware(validator) {
//   return (req, res, next) => {
//     const { error } = validator(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     next();
//   };
// }
// Middleware de Contrôle CORS (Cross-Origin Resource Sharing) :

// Utilisation : Contrôle comment les ressources peuvent être partagées entre différentes origines.
// Exemple de Code :
// javascript
// Copy code
// // middleware/cors.js
// import cors from 'cors';

// const corsOptions = {
//   origin: 'https://yourdomain.com',
//   optionsSuccessStatus: 200
// };

// export const corsMiddleware = cors(corsOptions);
// Middleware de Sécurité des En-têtes HTTP :

// Utilisation : Ajoute des en-têtes HTTP pour renforcer la sécurité, comme X-Content-Type-Options ou Content-Security-Policy.
// Exemple de Code :
// javascript
// Copy code
// // middleware/securityHeaders.js
// export function securityHeadersMiddleware(req, res, next) {
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.setHeader('Content-Security-Policy', "default-src 'self'");
//   next();
// }
// Middleware de Sanitisation des Données :

// Utilisation : Nettoie les données entrantes pour prévenir les attaques XSS.
// Exemple de Code :
// javascript
// Copy code
// // middleware/sanitize.js
// import sanitize from 'some-sanitize-library';

// export function sanitizeMiddleware(req, res, next) {
//   req.body = sanitize(req.body);
//   next();
// }
// Chacun de ces middlewares joue un rôle clé dans la sécurisation de votre application web. Ils peuvent être utilisés individuellement ou ensemble pour créer une couche de sécurité robuste. N'oubliez pas de tester chaque middleware dans votre environnement de développement pour vous assurer qu'il fonctionne comme prévu et qu'il ne bloque pas les fonctionnalités légitimes de votre application.

// User
// recherche sur le web si tu trouve d'autres middleware pour renforcer ma securiter web et autres 
// ChatGPT
// J'ai effectué une recherche rapide et voici ce que j'ai découvert.

// Pour renforcer la sécurité de vos applications web, il existe plusieurs middlewares utiles en plus de ceux mentionnés précédemment. Voici quelques-uns des middlewares supplémentaires recommandés, avec une brève description de leur utilisation et de leur fonctionnement :

// Morgan : Il s'agit d'un middleware de journalisation des requêtes HTTP pour Node.js. Il génère des journaux pour chaque requête API, ce qui peut être utile pour surveiller l'activité et identifier les comportements suspects.

// javascript
// Copy code
// const morgan = require('morgan');
// app.use(morgan('common'));
// Helmet : Helmet aide à protéger votre application contre certaines vulnérabilités web bien connues en configurant correctement divers en-têtes HTTP. Il est en fait une collection de plusieurs petits middlewares qui configurent ces en-têtes.

// javascript
// Copy code
// const helmet = require('helmet');
// app.use(helmet());
// CORS (Cross-Origin Resource Sharing) : Ce middleware est utilisé pour configurer et activer le partage de ressources entre origines (CORS) dans les applications Express.js. Il est essentiel pour permettre ou restreindre les requêtes entre différents domaines.

// javascript
// Copy code
// const cors = require('cors');
// app.use(cors());
// Express Rate Limit : Ce middleware basique limite les requêtes API répétées de la même adresse IP, ce qui est utile pour prévenir les attaques par force brute.

// javascript
// Copy code
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limite chaque IP à 100 requêtes par fenêtre
// });
// app.use(limiter);
// Ces middlewares sont essentiels pour renforcer la sécurité en loguant les activités, en protégeant contre les vulnérabilités communes, en gérant les politiques CORS, et en limitant le taux de requêtes. Il est recommandé de les intégrer dans vos applications Express.js pour améliorer la sécurité globale.

// Pour plus d'informations détaillées et d'autres middlewares utiles, vous pouvez consulter les ressources de LogRocket ici, de Wanago ici, et d'Express.js ici.