import Login from '@/models/login';
// import { connectToDB } from '@/utils/database';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/types';

export async function adminAuth(req : NextRequest) {
  // Récupération et vérification du cookie authToken
  const token = req.cookies.get('authToken');
        
    try{ if (!token) {
                return new NextResponse(JSON.stringify({ error: "Accès refusé: Token manquant" }), { status: 403 });
            }

        // Décodage du token
        let decoded : JwtPayload;
        
        try {
                decoded = jwt.verify(token.value as any, process.env.JWT_SECRET as string) as JwtPayload;
            } catch (error) {
                return new NextResponse(JSON.stringify({ error: "Token invalide" }), { status: 403 });
            }

        // Vérification de l'existence de l'utilisateur dans la base de données
        const user = await Login.findOne({ _id: decoded.userId });

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "Utilisateur non trouvé" }), { status: 403 });
        }

        // Récupération du cookie userRole
        const userRoleCookie = req.cookies.get('userRole');
        const ValueRole = userRoleCookie?.value;

        // Vérification que userRoleCookie n'est pas undefined et est une chaîne de caractères
            if (typeof ValueRole !== 'string' || ValueRole !== 'admin') {
                return new NextResponse(JSON.stringify({ error: "Accès refusé: Vous n'avez pas le rôle d'administrateur" }), { status: 403 });
            }
        // Si l'authentification réussit, renvoyer un objet avec status 200 et un message de succès
        //   return {
        //     status: 200,
        //     body: { message: "Authentification réussie" }
        //   };
        return NextResponse.json({ message: `Authentification réussie` }, { status: 200 });
        }
    catch{
            // return {
            //     status: 403,
            //     body: { error: "Accès refusé" }
            //   };
            return NextResponse.json({ error: `Accès refusé` }, { status: 403 });
        }
};