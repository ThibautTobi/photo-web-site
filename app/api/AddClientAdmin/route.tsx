import Login from '@/models/login';
import { connectToDB } from '@/utils/database';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { JwtPayload } from '@/types/types';
import { adminAuth } from '@/middleware/AdminAuth';
import { getSession } from 'next-auth/react';

/***************************************************************************************************** ****************/
/*************************************** revue 1 : probleme deuxiéme verification role avec next auth ****************/
/**************************************************************************************************** ***************/

////////////// Fonction pour vérifier l'autorisation avec le useContext et les role dans les cookies
// async function verifyAuthorization(req) {
//     // Logique d'autorisation ici
//     // Retournez true si autorisé, sinon false
// }


/***** analyse securiter a optimiser 
//////////Utilisation JWT pour les authentifications et veillez à ce qu'ils soient stockés de manière sécurisée côté client.
//(par exemple dans un cookie HttpOnly).
//Les tokens JWT non sécurisés peuvent être vulnérables aux interceptions ou aux attaques CSRF.

//  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//      res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

/////////Configurez vos cookies avec des attributs de sécurité. 
//Les cookies non sécurisés peuvent être exploités pour des attaques XSS ou de session hijacking.
// res.cookie('sessionId', 'sessionId', { httpOnly: true, secure: true, sameSite: 'Strict' });

////////////////////Protection contre les Attaques XSS :

//Échappez et nettoyez toutes les entrées utilisateur avant de les afficher. 
//Utilisez des bibliothèques comme DOMPurify côté client.

//const clean = DOMPurify.sanitize(dirty);

//Les attaques XSS se produisent lorsque des scripts malveillants sont injectés dans des pages affichées à d'autres utilisateurs.

//////////////Protection CSRF (Cross-Site Request Forgery) :

//Utilisez des jetons CSRF dans vos formulaires.

//const csrfToken = req.csrfToken();
//res.render('send', { csrfToken });
//Les attaques CSRF trompent un utilisateur connecté pour qu'il soumette une demande indésirable.

//////////////// Audit et Monitoring de Sécurité :

//Mettez en place des logs pour surveiller les activités suspectes.

//app.use((req, res, next) => {
//  console.log(`Request made to ${req.url}`);
//  next();


});

*/

/**************************************** Post Création d'un Client avec Role 'User' Ajout de L'administrateur dans sont espace *******************************/
// export async function POST (req: NextRequest) {
// console.log(req.body)
//     try {


//         // Vérification de l'autorisation
//         // if (!await verifyAuthorization(req)) {
//         //     return new NextResponse(JSON.stringify({ error: "Accès refusé" }), { status: 403 });
//         // }


//         await connectToDB();

// //////////////////////////////// probleme autorisation a debug
// //         const authResponse = await adminAuth(req);
// //   if (authResponse.status === 403) {
// //     //return res.status(403).json(authResponse.body);
// //     return NextResponse.json({ message: `Vous n'avais pas l'accés` }, { status: 403 });
// //   }
// ///////////////////////////////
//     //   // Récupération et vérification du cookie authToken
//     //   const token = req.cookies.get('authToken');
        
//     //     if (!token) {
//     //             return new NextResponse(JSON.stringify({ error: "Accès refusé: Token manquant" }), { status: 403 });
//     //         }

//     //   // Décodage du token
//     //   let decoded : JwtPayload;
        
//     //     try {
//     //             decoded = jwt.verify(token.value as any, process.env.JWT_SECRET as string) as JwtPayload;
//     //         } catch (error) {
//     //             return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
//     //         }

//     //   // Vérification de l'existence de l'utilisateur dans la base de données
//     //   const user = await Login.findOne({ _id: decoded.userId });

//     //     if (!user) {
//     //         return new NextResponse(JSON.stringify({ error: "Utilisateur non trouvé" }), { status: 403 });
//     //     }

//     //     // Récupération du cookie userRole
//     //     const userRoleCookie = req.cookies.get('userRole');
//     //     const ValueRole = userRoleCookie?.value;

//     //     // Vérification que userRoleCookie n'est pas undefined et est une chaîne de caractères
//     //         if (typeof ValueRole !== 'string' || ValueRole !== 'admin') {
//     //             return new NextResponse(JSON.stringify({ error: "Accès refusé: Vous n'avez pas le rôle d'administrateur" }), { status: 403 });
//     //         }

//         const { name, password } = await req.json();

//         console.log(name,password)
//         // Votre schéma de validation
//         const validationSchema = yup.object({
//             name: yup.string().required('Le nom est requis'),
//             password: yup.string()
//                 .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
//                 .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
//                 .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
//                 .required('Le mot de passe est requis'),
//             });

//         // Vérification des données avec Yup
//         await validationSchema.validate({ name, password });


//         // Vérification de l'unicité du nom d'utilisateur
//         const existingUser = await Login.findOne({ name: name });
//         // seul l'administrateur voi la reponse donc réponse moin generique !
//             if (existingUser) {
//                 return NextResponse.json({ error : `Le nom d'utilisateur est déjà pris.` }, { status: 400 });
//             }
        
//         // Validation des entrées
//             if (!name || typeof name !== 'string' || !password || typeof password !== 'string') {
//                 return NextResponse.json("Nom d'utilisateur ou mot de passe invalide", { status: 400 });
//             }

//         // Hashage des mots de passe
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newLogin = new Login({ name, password: hashedPassword });
//             await newLogin.save();
//             /******
//              * modification du schema //////////////////////////////////////////////////////////
//              *     const newUser = new Login({
//                         username,
//                         email,
//                         password: hashedPassword,
//                         role: "user"
//                         });

//                         await newUser.save();
//              */

//         return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });

//     } catch (error) {
//         if (error instanceof jwt.JsonWebTokenError) {
//             return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
//         }
//         // Journalisation
//         console.error("Erreur lors de la création de l'utilisateur:", error);

//         return NextResponse.json("Une erreur est survenue lors de la création de l'utilisateur.", { status: 500 });
//     }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////

// export async function POST (req: NextRequest) {
    
//     //console.log('body de la requete :',req.body)
//     //vérification si la methode de requete est la bonne.
//     if (req.method !== 'POST') {
//         return new NextResponse('Mauvaise méthode', { status: 500 });
//     }
// /************************** deuxiéme verification cotés serveur du role admin / probléme compatibiliter */
//     // Récupération de la session de l'utilisateur
//      //const session = await getSession({req});

//         //console.log('session :', session)
//     // Vérifier si l'utilisateur est connecté et a le rôle 'admin'
//         // if (!session || session.user.role !== 'admin') {
//         //     return new NextResponse('Accès refusé', { status: 403 });
//         // }


//         try {
    
//             await connectToDB();
    
//             const { name, password } = await req.json();
    
//             //console.log(name,password)

//             // Votre schéma de validation
//             const validationSchema = yup.object({
//                 name: yup.string().required('Le nom est requis'),
//                 password: yup.string()
//                     .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
//                     .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
//                     .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
//                     .required('Le mot de passe est requis'),
//                 });
    
//             // Vérification des données avec Yup
//             // Protections contres Les injections SQL et XSS 
//             await validationSchema.validate({ name, password });
    
    
//             // Vérification de l'unicité du nom d'utilisateur
//             const existingUser = await Login.findOne({ name: name });
//             // seul l'administrateur voi la reponse donc réponse moin generique !
//                 if (existingUser) {
//                     return NextResponse.json({ error : `Le nom d'utilisateur est déjà pris.` }, { status: 400 });
//                 }
            
//             // Validation des entrées
//                 if (!name || typeof name !== 'string' || !password || typeof password !== 'string') {
//                     return NextResponse.json("Nom d'utilisateur ou mot de passe invalide", { status: 400 });
//                 }
    
//             // Hashage des mots de passe
//             const hashedPassword = await bcrypt.hash(password, 10);
    
//             //création Client dans la DB
//             const newLogin = new Login({ name, password: hashedPassword });
//                 await newLogin.save();
    
//             return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
    
//         } catch (error) {
//             if (error instanceof jwt.JsonWebTokenError) {
//                 return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
//             }
//             // Journalisation
//             console.error("Erreur lors de la création de l'utilisateur:", error);
    
//             return NextResponse.json("Une erreur est survenue lors de la création de l'utilisateur.", { status: 500 });
//         }
//     }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/******************************************************************* */
/**************************** test compatibiliter req et next auth  */
/***************************************************************** */

// export async function POST(req, res) {

//     console.log('requette :' req)
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Méthode non autorisée' });
//     }

//     // Récupération de la session de l'utilisateur
//     const session = await getSession({ req });

//     console.log('session next auth :',session)
//     if (!session || session.user.role !== 'admin') {
//         return res.status(403).json({ message: 'Accès refusé' });
//     }

//     try {
//         await connectToDB();
//         const { name, password } = req.body; // Utilisez req.body pour accéder au corps de la requête

//         // Schéma de validation Yup
//         const validationSchema = yup.object({
//             name: yup.string().required('Le nom est requis'),
//             password: yup.string()
//                 .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
//                 .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
//                 .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
//                 .required('Le mot de passe est requis'),
//         });

//         await validationSchema.validate({ name, password });

//         const existingUser = await Login.findOne({ name: name });
//         if (existingUser) {
//             return res.status(400).json({ error: `Le nom d'utilisateur est déjà pris.` });
//         }

//         if (!name || typeof name !== 'string' || !password || typeof password !== 'string') {
//             return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe invalide" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newLogin = new Login({ name, password: hashedPassword });
//         await newLogin.save();

//         return res.status(201).json({ message: 'Utilisateur créé avec succès' });
//     } catch (error) {
//         console.error("Erreur lors de la création de l'utilisateur:", error);
//         return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdmin } from '@/middleware/verifAdmin';

export async function POST (req: NextApiRequest, res: NextApiResponse) {
    
    //console.log('body de la requete :',req.body)
    //vérification si la methode de requete est la bonne.
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Mauvaise méthode' });
        return;
      }

         const isAdmin = await verifyAdmin(req, res);
         if (!isAdmin) return;


        try {
    
            await connectToDB();
    
            const { name, password } = await req.json();
    
            //console.log(name,password)

            // Votre schéma de validation
            const validationSchema = yup.object({
                name: yup.string().required('Le nom est requis'),
                password: yup.string()
                    .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
                    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
                    .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
                    .required('Le mot de passe est requis'),
                });
    
            // Vérification des données avec Yup
            // Protections contres Les injections SQL et XSS 
            await validationSchema.validate({ name, password });
    
    
            // Vérification de l'unicité du nom d'utilisateur
            const existingUser = await Login.findOne({ name: name });
            // seul l'administrateur voi la reponse donc réponse moin generique !
                if (existingUser) {
                    return NextResponse.json({ error : `Le nom d'utilisateur est déjà pris.` }, { status: 400 });
                }
            
            // Validation des entrées
                if (!name || typeof name !== 'string' || !password || typeof password !== 'string') {
                    return NextResponse.json("Nom d'utilisateur ou mot de passe invalide", { status: 400 });
                }
    
            // Hashage des mots de passe
            const hashedPassword = await bcrypt.hash(password, 10);
    
            //création Client dans la DB
            const newLogin = new Login({ name, password: hashedPassword });
                await newLogin.save();
    
            return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
    
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
            }
            // Journalisation
            console.error("Erreur lors de la création de l'utilisateur:", error);
    
            return NextResponse.json("Une erreur est survenue lors de la création de l'utilisateur.", { status: 500 });
        }
    }