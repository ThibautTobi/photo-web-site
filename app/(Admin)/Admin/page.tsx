// pages/adminPage.js
// import jwt from 'jsonwebtoken';

// export async function getServerSideProps(context) {
//   const cookies = parse(context.req.headers.cookie || '');
//   const token = cookies.token;

//   try {
//     const decoded = jwt.verify(token, 'secretKey');
//     const userRole = decoded.role;

//     if (userRole !== 'admin') {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }

//   } catch (error) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

// Votre composant de page ici


// npm install cookie next-cookies


// import { parse } from 'cookie';

// export async function getServerSideProps(context) {
//   const cookies = parse(context.req.headers.cookie || '');
//   const token = cookies.token;

//   // Ici, vous devriez vérifier le token avec votre base de données ou votre service d'authentification
//   const user = ... // Récupérez l'utilisateur à partir du token

//   if (!user || user.role !== 'admin') {
//     return {
//       redirect: {
//         destination: '/', // Redirige vers la page d'accueil
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {}, // Vos props habituels ici
//   }
// }








export default function Administration (){





    return(
        <>
            <h2>Administration</h2>
        </>
    )
}