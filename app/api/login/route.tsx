import Login from '@/models/login';
import { connectToDB } from '@/utils/database';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import * as yup from 'yup';

export const POST = async(req: NextRequest) => {
    try {
        await connectToDB();

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

        return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });

    } catch (error) {
        // Journalisation
        console.error("Erreur lors de la création de l'utilisateur:", error);

        return NextResponse.json("Une erreur est survenue lors de la création de l'utilisateur.", { status: 500 });
    }
}