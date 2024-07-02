/** @type {import('next').NextConfig}  */
const nextConfig = {}


// const nextConfig = {
//     async headers() {
//       return [
//         {
//           source: '/(.*)', // Applique ces en-têtes à toutes les routes
//           headers: [
//             {
//               key: 'X-Content-Type-Options',
//               value: 'nosniff', // Prévenir le sniffing de type MIME
//             },
//             {
//               key: 'Content-Security-Policy',
//               value: "default-src 'self'; img-src https://example.com;", // Contrôler les sources de contenu
//             },

// DENY : Aucun site (y compris le vôtre) ne peut embarquer votre page dans un cadre. Cela offre la protection la plus forte contre le clickjacking, mais peut limiter la fonctionnalité si vous avez besoin d'intégrer votre propre contenu dans des cadres.

// SAMEORIGIN : Seuls les cadres appartenant au même domaine que la page peuvent embarquer votre contenu. Cela offre une protection contre le clickjacking tout en permettant une certaine flexibilité pour l'utilisation de cadres dans votre propre site.

// En utilisant l'en-tête X-Frame-Options, vous pouvez empêcher efficacement les attaquants d'utiliser des techniques de clickjacking pour abuser de votre site web et de vos utilisateurs.

//             {
//               key: 'X-Frame-Options',
//               value: 'DENY', // Prévenir les attaques de type clickjacking
//             },
//             {
//               key: 'Strict-Transport-Security',
//               value: 'max-age=31536000; includeSubDomains; preload', // Forcer l'utilisation de HTTPS
//             },
//             {
//               key: 'Permissions-Policy',
//               value: 'camera=(); geolocation=(); microphone=();', // Contrôler l'accès aux fonctionnalités du navigateur
//             },
//             {
//               key: 'Referrer-Policy',
//               value: 'no-referrer', // Contrôler les informations envoyées dans les en-têtes HTTP Referrer
//             },
//           ],
//         },
//       ];
//     },
//   };
  
//   module.exports = nextConfig;
  

module.exports = nextConfig