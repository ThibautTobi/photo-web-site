// import { NextRequest, NextResponse } from 'next/server';
// import { createRateLimiter } from 'some-rate-limiter-library';

// const limiter = createRateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limite chaque IP à 100 requêtes par fenêtre
//   message: "Trop de requêtes, veuillez réessayer plus tard.",
//   headers: true, // Envoie des en-têtes avec des informations sur le taux limite
//   keyGenerator: function(req) {
//     // Utilisez l'adresse IP comme clé par défaut
//     return req.ip;
//   },
//   skip: function(req, res) {
//     // Vous pouvez définir une logique pour ignorer certaines requêtes
//     return false;
//   },
//   handler: function(req, res) {
//     res.status(429).send("Trop de requêtes");
//   },
//   onLimitReached: function(req, res) {
//     console.warn("Limite atteinte pour ", req.ip);
//   }
// });

// export default function rateLimiter(req: NextRequest) {
//   if (limiter.check(req)) {
//     return NextResponse.next();
//   }
//   return NextResponse.error("Trop de requêtes", 429);
// }


////////////////////////////////////////////// voir le probleme de telechargement
//npm install next-rate-limiter

// import { NextRequest, NextResponse } from 'next/server';
// import { createRateLimiter } from 'next-rate-limiter';

// // Création de l'instance de limitation de débit
// const limiter = createRateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limite chaque IP à 100 requêtes par fenêtre
// });

// export default async function rateLimiter(req: NextRequest) {
//   // Vérifiez si la requête dépasse le taux limite
//   const { remaining } = await limiter.check(req);

//   // Si le nombre de requêtes restantes est supérieur à 0, continuez
//   if (remaining > 0) {
//     return NextResponse.next();
//   }

//   // Sinon, renvoyez une erreur
//   return NextResponse.error("Trop de requêtes", 429);
// }


// version plus

/*

import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter } from 'next-rate-limiter';

// Création de l'instance de limitation de débit
const limiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  redis: {
    host: 'localhost', // Adresse de l'hôte Redis
    port: 6379, // Port Redis
    password: 'your-redis-password', // Mot de passe Redis (si nécessaire)
    db: 0, // Base de données Redis à utiliser
  },
  keyGenerator: (req: NextRequest) => {
    // Génère une clé unique pour chaque utilisateur (par défaut, utilise l'adresse IP)
    return req.headers['x-forwarded-for'] || req.ip;
  },
  skip: (req: NextRequest) => {
    // Vous pouvez définir une logique pour ignorer certaines requêtes
    // Par exemple, ignorer les requêtes provenant de l'administrateur
    return req.headers['x-admin'] === 'true';
  },
  onLimitReached: (req: NextRequest) => {
    // Fonction appelée lorsque la limite est atteinte pour une clé donnée
    console.warn("Limite atteinte pour ", req.ip);
  }
});

export default async function rateLimiter(req: NextRequest) {
  // Vérifiez si la requête dépasse le taux limite
  const { remaining } = await limiter.check(req);

  // Si le nombre de requêtes restantes est supérieur à 0, continuez
  if (remaining > 0) {
    return NextResponse.next();
  }

  // Sinon, renvoyez une erreur
  return NextResponse.error("Trop de requêtes", 429);
}

Redis est un système de stockage de données en mémoire, souvent qualifié de "structure de données en mémoire". Il est open-source et est principalement utilisé comme base de données, cache et courtier de messages. Voici quelques points clés à propos de Redis :

Rapide : Étant donné que toutes les données sont stockées en mémoire, Redis est extrêmement rapide et est souvent utilisé comme système de mise en cache pour réduire le temps d'accès aux données.

Structures de données riches : Contrairement à d'autres systèmes de mise en cache qui permettent de stocker uniquement des paires clé-valeur, Redis prend en charge une variété de structures de données, telles que les chaînes, les listes, les ensembles, les ensembles triés, les hachages, les bitmaps, les hyperloglogs et les flux.

Persistance : Bien que Redis soit un système de stockage en mémoire, il offre des mécanismes pour écrire des données sur le disque sans sacrifier beaucoup de performances. Cela permet de récupérer les données même après un redémarrage du système.

Réplication : Redis prend en charge la réplication maître-esclave, permettant la duplication des données sur plusieurs machines pour une tolérance aux pannes.

Partitionnement : Il prend en charge le partitionnement horizontal des données pour augmenter la capacité de stockage et la performance.

Atomicité : Toutes les opérations Redis sont atomiques, ce qui garantit que si deux clients envoient simultanément des commandes, elles seront exécutées dans l'ordre reçu.

Extensible : Redis peut être étendu avec des modules pour ajouter de nouvelles commandes ou pour changer le comportement des commandes existantes.

Communauté : Redis bénéficie d'une grande communauté et est utilisé par de nombreuses entreprises dans le monde entier.

En résumé, Redis est un système de stockage en mémoire extrêmement rapide et flexible, souvent utilisé pour la mise en cache, mais aussi capable de servir de base de données principale pour certaines applications.

MongoDB et Redis sont deux systèmes de gestion de bases de données qui ont des cas d'utilisation et des caractéristiques distincts, mais ils peuvent être utilisés ensemble de manière complémentaire. Voici quelques points à considérer :

Compatibilité :

MongoDB est une base de données orientée documents qui stocke des données sous forme de documents BSON (similaires au format JSON). Elle est conçue pour stocker de grandes quantités de données de manière distribuée.
Redis est une base de données en mémoire qui est principalement utilisée comme cache ou pour stocker des structures de données temporaires.
Vous pouvez utiliser MongoDB comme base de données principale pour stocker des données persistantes et Redis comme cache pour accélérer l'accès aux données fréquemment utilisées.
Besoin de Redis avec MongoDB :

Bien que MongoDB soit performant, l'accès aux données en mémoire avec Redis est généralement plus rapide. Si votre application nécessite des temps de réponse extrêmement rapides pour certaines opérations, l'utilisation de Redis comme cache peut être bénéfique.
Redis peut également être utilisé pour gérer les sessions, les files d'attente, les publications/souscriptions en temps réel et d'autres cas d'utilisation qui nécessitent des opérations à faible latence.
Quand utiliser Redis avec MongoDB :

Si votre application effectue de nombreuses lectures et que vous souhaitez réduire la charge sur MongoDB, vous pouvez mettre en cache les résultats des requêtes dans Redis.
Si vous avez des opérations qui nécessitent des accès rapides et fréquents à de petites quantités de données (par exemple, des compteurs, des sessions).
MongoDB seul :

Pour de nombreuses applications, MongoDB seul peut être suffisant, surtout si les temps de réponse sont acceptables et que vous n'avez pas de scénarios nécessitant des accès ultra-rapides à des données spécifiques.
MongoDB a également introduit des fonctionnalités comme les "WiredTiger Storage Engine" qui offrent des capacités de mise en cache intégrées.
En conclusion, bien que MongoDB et Redis puissent être utilisés indépendamment, ils peuvent également être combinés pour tirer parti des forces de chacun. L'utilisation de Redis avec MongoDB dépend des besoins spécifiques de votre application en matière de performance et de structure des données.
*/