import { connectToDB } from "@/utils/database";
import Login from "@/models/login";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

/********************************************************************************** inscriptions  */

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Méthode non autorisée' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!password || (!email && !name)) {
      return NextResponse.json({ message: 'Email ou name manquant' }, { status: 400 });
    }

    await connectToDB();
    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser;
    if (email) {
      if (!validator.isEmail(email)) {
        return NextResponse.json({ message: 'Adresse email invalide' }, { status: 400 });
      }
      newUser = new Login({ email, password: hashedPassword });
    } else {
      newUser = new Login({ name, password: hashedPassword });
    }

    await newUser.save();
    return NextResponse.json({ message: 'Utilisateur créé' }, { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Une erreur est survenue' }, { status: 500 });
    }
  }
}