import Login from "@/models/login";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth"

//import Providers from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"
//import EmailProvider from "next-auth/providers/email"
import bcrypt from 'bcrypt';
import { login } from "@/types/types";
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GitHubProvider from "next-auth/providers/github"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"



interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface JWTToken {
  role?: string;
  sub?: string; // Subject (ID de l'utilisateur)
  // Ajoutez d'autres propriétés JWT si nécessaire
}

interface Session {
  user: User;
}



// Type pour les informations de l'utilisateur
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Type pour le Token JWT
interface JWTToken {
  role?: string;
  sub?: string; // Subject (ID de l'utilisateur)
  // Ajoutez d'autres propriétés JWT si nécessaire
}

export const authOptions : any = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifiant: { label: "name or email", type: "text", placeholder: "name or email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials, req) {
        await connectToDB();

        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const user = await Login.findOne({
          $or: [
            { name: credentials.identifiant },
            { email: credentials.identifiant }
          ]
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],

  session: {
    strategy: 'jwt', // Assurez-vous que la stratégie est 'jwt' ou 'database'
    maxAge: 1 * 24 * 60 * 60, // 1 Day
  },
  // ou 
  // session: {
  //   strategy: 'database',
  //   maxAge: 1 * 24 * 60 * 60, // 1 jour
  // },
  
  // callbacks: {
    // async jwt({ token, user }: { token: JWTToken, user?: User }) {
    //   if (user) {
    //     token.role = user.role;
    //   }
    //   return token;
    // },
    // // async session({ session, token }: { session: { user: User }, token: JWTToken }) {
    // //   if (session.user) {
    // //     session.user.role = token.role;
    // //   }
    // //   return session;
    // // }

    // callbacks: {
    //   async jwt({ token, user }: { token: JWTToken, user?: User }) {
    //     if (user && user.role) { // Vérifiez que user et user.role ne sont pas undefined
    //       token.role = user.role;
    //     }
    //     return token;
    //   },
    //   async session({ session, token }: { session: Session, token: JWTToken }) {
    //     if (session.user && token.role) { // Vérifiez que session.user et token.role ne sont pas undefined
    //       session.user.role = token.role;
    //     }
    //     return session;
    //   }
    // }
    // callbacks: {
    //   async jwt({ token, user }: { token: JWTToken, user?: User }) {
    //     if (user) {
    //       token.role = user.role;
    //     }
    //     return token;
    //   },
    //   async session({ session, token }: { session: Session, token: JWTToken }) {
    //     if (token.role) {
    //       session.user.role = token.role;
    //     }
    //     return session;
    //   }
    // },
      
    
//},
  
  // if (!process.env.NEXTAUTH_SECRET) {
  //   throw new Error('NEXTAUTH_SECRET is not set');
  // }
  
  // a modifier pour le production
 // secret: process.env.NEXTAUTH_SECRET || 'default-secret',
//   secret: process.env.NEXTAUTH_SECRET,
  

// };


callbacks: {
  async jwt({ token, user }: { token: JWTToken, user?: User }) {
    if (user && user.role) { // Vérifiez que user et user.role ne sont pas undefined
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }: { session: Session, token: JWTToken }) {
    if (session.user && token.role) { // Vérifiez que session.user et token.role ne sont pas undefined
      session.user.role = token.role;
    }
    return session;
  }
},

secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





// export const authOptions = {

//   // Spécifiez des fournisseurs d'authentification
//   providers: [
//     // EmailProvider({
//     //   server: process.env.EMAIL_SERVER,
//     //   from: process.env.EMAIL_FROM,
//     //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
//     // }),
//     // email: {
//     //   server: process.env.EMAIL_SERVER,
//     //   from: process.env.EMAIL_FROM,
//     //   // Vous pouvez également personnaliser les templates d'email ici
//     // }

//       CredentialsProvider({
//         name: 'Credentials', 
//         credentials: {
//           identifier: { label: "Username or Email", type: "text", placeholder: "username or email" },
//           password: { label: "Password", type: "password", placeholder: "Password" }
//         },
//         async authorize(credentials, req) {
//           await connectToDB();
    
//           if (!credentials) {
//             throw new Error('No credentials provided');
//           }
    
//           // Recherche de l'utilisateur par nom d'utilisateur ou email
//           const user = await Login.findOne({
//             $or: [
//               { username: credentials.identifier },
//               { email: credentials.identifier }
//             ]
//           });
    
//           if (!user) {
//             throw new Error('Pas trouver de non correspondant !');
//           }
    
//           const isValid = await bcrypt.compare(credentials.password, user.password);
//           if (!isValid) {
//             throw new Error('Email ou Mot de passe Invalid');
//           }
    
//           return { id: user.id, name: user.name, email: user.email, role: user.role };
//         }
//       })
//     ],
    

//     // // Adapter pour MongoDB
//     // adapter: MongoDBAdapter(clientPromise),

//   // Configurez les callbacks de session ici
//   session: {
//     strategy: 'jwt',
//     maxAge: 1 * 24 * 60 * 60, // 1 Jours
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Ajoutez des informations personnalisées, comme un rôle
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role; // Ajoutez le rôle à la session
//       }
//       return session;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET,

// }
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }



// const handler = NextAuth({

  // Spécifiez des fournisseurs d'authentification
  // providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    // email: {
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   // Vous pouvez également personnaliser les templates d'email ici
    // }
    
    // Connexion par Identifiants
    // CredentialsProvider({
    //   name: 'Credentials', 
    //   credentials: {
    //     identifier: { label: "Username or Email", type: "text", placeholder: "username or email" },
    //     password: { label: "Password", type: "password", placeholder: "Password" }
    //   },
    //   async authorize(credentials, req) {
        // Ici, implémentez la logique pour vérifier les identifiants

        /******************************exemple doc  */
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
  
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // // Return null if user data could not be retrieved
        // return null


        /******************************* */
        // await connectToDB();

        // if (!credentials) {
        //   throw new Error('No credentials provided');
        // }

        // throw new Error('Email ou Mot de passe Invalid');

          // Recherche de l'utilisateur par nom d'utilisateur ou email
        // const user = await Login.findOne({
        //   $or: [
        //     { username: credentials.identifier },
        //     { email: credentials.identifier }
        //   ]
        // });

        // if (!user) {
        //   throw new Error('Pas trouver de non correspondant !');
        // }

        // if (user) {
        //   const isValid = await bcrypt.compare(credentials.password, user.password);
        //   if (isValid) {
        //     return { id: user.id, name: user.name, email: user.email, role: user.role };
        //   }
        // }

        // const isValid = await bcrypt.compare(credentials.password, user.password);

        // if (!isValid) {
        //   throw new Error('Mot de passe incorrect');
        // }

        // return { id: user.id, name: user.name, password: user.password };
  //       throw new Error('Email ou Mot de passe Invalid');
  //     }
  //   })
  // ],
  // // Fournisseurs OAuth
  // GoogleProvider({
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // }),
  // FacebookProvider({
  //   clientId: process.env.FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  // }),
  // GitHubProvider({
  //   clientId: process.env.GITHUB_CLIENT_ID,
  //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
  // }),

    // // Adapter pour MongoDB
    // adapter: MongoDBAdapter(clientPromise),

  // Configurez les callbacks de session ici
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 1 * 24 * 60 * 60, // 1 Jours
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = user.role; // Ajoutez des informations personnalisées, comme un rôle
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.role = token.role; // Ajoutez le rôle à la session
  //     }
  //     return session;
  //   }
  // },


  // ou
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = user.role;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },

// Configuration de la session
// session: {
//   strategy: "jwt", // ou "database" pour stocker les sessions dans la base de données
//   maxAge: 30 * 24 * 60 * 60, // La session expire après 30 jours d'inactivité
//   updateAge: 24 * 60 * 60, // Met à jour la session toutes les 24 heures
// },

// // Configuration du JWT
// jwt: {
//   secret: process.env.JWT_SECRET,
//   encryption: true,
//   maxAge: 24 * 60 * 60, // 24 heures
// },


// events: {
//   signIn: async (message) => { /* Un utilisateur se connecte */ },
//   signOut: async (message) => { /* Un utilisateur se déconnecte */ },
//   createUser: async (message) => { /* Un nouvel utilisateur est créé */ },
//   // ... autres événements ...
// }


// cookies: {
//   sessionToken: {
//     name: `__Secure-next-auth.session-token`,
//     options: {
//       httpOnly: true,
//       sameSite: 'lax',
//       path: '/',
//       secure: true,
//     },
//   },
//   // ... autres cookies ...
// }

// internalisation
// i18n: {
//   locales: ["en", "fr", "es"],
//   defaultLocale: "en",
// }


  // Pages personnalisées
  // pages: {
  //   signIn: '/auth/signin',  // URL personnalisée pour la page de connexion
  //   signOut: '/auth/signout', // URL personnalisée pour la page de déconnexion
  //   error: '/auth/error',     // URL personnalisée pour la page d'erreur
  //   verifyRequest: '/auth/verify-request', // URL personnalisée pour la page de vérification de la demande
  //   newUser: null // Désactiver la page pour les nouveaux utilisateurs (ou spécifiez une URL)
  // },




//adapter: CustomAdapter({
  // Votre implémentation personnalisée
//})

// autorisations et regle securiter
// callbacks: {
//   signIn: async (user, account, profile) => {
//     if (user.email.endsWith("@exemple.com")) {
//       return true;
//     } else {
//       return false;
//     }
//   },
// }


// Options de sécurité supplémentaires
// secret: process.env.NEXTAUTH_SECRET,
// debug: process.env.NODE_ENV === 'development', // Activez le mode débogage en développement

// })

// export { handler as GET, handler as POST }