import Login from '@/models/login';
import { connectToDB } from '@/utils/database';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async(req: NextRequest) => {
    try {
        await connectToDB();

        const { name, password } = await req.json();

        const user = await Login.findOne({ name: name });
        if (!user) {
            return NextResponse.json({ message: "Nom d'utilisateur introuvable." }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Mot de passe incorrect." }, { status: 401 });
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });


        
        const response = NextResponse.json({ message: 'Connecté avec succès.', redirectTo: '/'  });


        // Cookie authToken pour l'autorisation JWT (côté serveur)
        response.cookies.set('authToken', token, {
            httpOnly: true,//lorsque cette option est définie sur true, le cookie ne peut pas être accédé via JavaScript côté client. Cela est essentiel pour les cookies de sécurité comme les JWT pour éviter les attaques de type cross-site scripting (XSS).
            // secure: process.env.NODE_ENV === 'development',// lorsque cette option est définie sur true, le cookie ne sera envoyé que sur des connexions HTTPS. C'est une bonne pratique pour garantir que le cookie (en particulier un JWT) n'est pas exposé lors de la transmission sur un réseau non sécurisé.
            sameSite: 'strict',// le cookie est envoyé au serveur uniquement lorsque la demande provient du même site
            maxAge: 3600, // 1 heure
            path: '/',// accés a tous le site 
        });

        // Cookie userRole pour la vérification des rôles (côté client)
        response.cookies.set('userRole', user.role, {
            // secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 3600, // 1 heure
            path: '/',
        });

        return response

    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return NextResponse.json("Une erreur est survenue lors de la connexion.", { status: 500 });
    }
}