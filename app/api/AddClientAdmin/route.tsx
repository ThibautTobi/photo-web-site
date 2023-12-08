import Login from '@/models/login';
import { connectToDB } from '@/utils/database';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { JwtPayload } from '@/types/types';
import { adminAuth } from '@/middleware/AdminAuth';

/**************************************** Post Création d'un Client avec Role 'User' Ajout de L'administrateur dans sont espace *******************************/
export const POST = async(req: NextRequest) => {

    try {
        await connectToDB();

        const authResponse = await adminAuth(req);
  if (authResponse.status === 403) {
    //return res.status(403).json(authResponse.body);
    return NextResponse.json({ message: `Vous n'avais pas l'accés` }, { status: 403 });
  }
    //   // Récupération et vérification du cookie authToken
    //   const token = req.cookies.get('authToken');
        
    //     if (!token) {
    //             return new NextResponse(JSON.stringify({ error: "Accès refusé: Token manquant" }), { status: 403 });
    //         }

    //   // Décodage du token
    //   let decoded : JwtPayload;
        
    //     try {
    //             decoded = jwt.verify(token.value as any, process.env.JWT_SECRET as string) as JwtPayload;
    //         } catch (error) {
    //             return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
    //         }

    //   // Vérification de l'existence de l'utilisateur dans la base de données
    //   const user = await Login.findOne({ _id: decoded.userId });

    //     if (!user) {
    //         return new NextResponse(JSON.stringify({ error: "Utilisateur non trouvé" }), { status: 403 });
    //     }

    //     // Récupération du cookie userRole
    //     const userRoleCookie = req.cookies.get('userRole');
    //     const ValueRole = userRoleCookie?.value;

    //     // Vérification que userRoleCookie n'est pas undefined et est une chaîne de caractères
    //         if (typeof ValueRole !== 'string' || ValueRole !== 'admin') {
    //             return new NextResponse(JSON.stringify({ error: "Accès refusé: Vous n'avez pas le rôle d'administrateur" }), { status: 403 });
    //         }

        const { name, password } = await req.json();

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
        await validationSchema.validate({ name, password });


        // Vérification de l'unicité du nom d'utilisateur
        const existingUser = await Login.findOne({ name: name });
        // seul l'administrateur voi la reponse donc réponse moin generique !
            if (existingUser) {
                return NextResponse.json({ message: `Le nom d'utilisateur est déjà pris.` }, { status: 400 });
            }
        
        // Validation des entrées
            if (!name || typeof name !== 'string' || !password || typeof password !== 'string') {
                return NextResponse.json("Nom d'utilisateur ou mot de passe invalide", { status: 400 });
            }

        // Hashage des mots de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newLogin = new Login({ name, password: hashedPassword });
            await newLogin.save();
            /******
             * modification du schema //////////////////////////////////////////////////////////
             *     const newUser = new Login({
                        username,
                        email,
                        password: hashedPassword,
                        role: "user"
                        });

                        await newUser.save();
             */

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