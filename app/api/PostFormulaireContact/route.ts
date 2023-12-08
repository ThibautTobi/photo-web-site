//import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as yup from 'yup';
/******************* envoie du formulaire sur adresse Gmail avec compte google sans utiliser NodeMailer //En Test//

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUR_CLIENT_ID,
      process.env.YOUR_CLIENT_SECRET,
      process.env.YOUR_REDIRECT_URI
    );
                  // manipulation pour recupérer le token de rafraichissement
                  // Échanger le code contre un jeton
                  // const code = process.env.YOUR_CODE;

                  // if (!code) {
                  //   return NextResponse.json({ error: 'Code d\'autorisation manquant' }, { status: 400 });
                  // }

                  // oauth2Client.getToken(code)
                  //   .then(({ tokens }) => {
                  //     console.log("Jeton de rafraîchissement:", tokens);
                  //   })
                  //   .catch(error => {
                  //     console.error("Erreur lors de l'échange du code:", error);
                  //   });

    // Assurez-vous que le code est défini
    // const code = process.env.YOUR_CODE;
    // if (!code) {
    //   return NextResponse.json({ error: 'Code d\'autorisation manquant' }, { status: 400 });
    // }

    // Récupération du jeton de rafraîchissement
    // const { tokens } = await oauth2Client.getToken(code);
    // console.log("Jeton de rafraîchissement:", tokens.refresh_token);

    // Assurez-vous que le jeton de rafraîchissement est défini
    if (!process.env.YOUR_REFRESH_TOKEN) {
      return NextResponse.json({ error: 'Jeton de rafraîchissement manquant' }, { status: 400 });
    }

    oauth2Client.setCredentials({ refresh_token: process.env.YOUR_REFRESH_TOKEN });

    
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const body = await req.json();
    const { prenom, nom, email, objet, message } = body;

    const emailContent = `
      Nouveau message de formulaire de contact :
      Prénom : ${prenom}
      Nom : ${nom}
      Email : ${email}
      Objet : ${objet}
      Message : ${message}
    `;

    try {
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: Buffer.from(`To: ${process.env.YOUR_EMAIL_RECEPTION}\nSubject: Nouveau message de formulaire\n\n${emailContent}`).toString('base64')
        }
      });
      return NextResponse.json({ message: 'Email envoyé avec succès' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
  }
}

*/

/*
*/

// Schéma de validation
const FormSchema = yup.object({
  prenom: yup.string().required('Le prénom est requis'),
  nom: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  objet: yup.string().required('L\'objet est requis'),
  message: yup.string().required('Le message est requis')
}).required();

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      // Valider les données
      const validatedData = await FormSchema.validate(body);

console.log(body)

      if (!body.recaptchaToken) {
        throw new Error('Token reCAPTCHA manquant');
      }
      
      // Vérification du token reCAPTCHA
      const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${body.recaptchaToken}`, {
        method: 'POST',
      });
      const recaptchaData = await recaptchaResponse.json();
console.log(recaptchaData)

      if (!recaptchaData.success) {
        throw new Error('Échec de la vérification RECAPTCHA');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: validatedData.email,
        to: process.env.YOUR_EMAIL_RECEPTION,
        subject: `Nouveau message de ${validatedData.prenom} ${validatedData.nom}`,
        text: `Email: ${validatedData.email}\nObjet: ${validatedData.objet}\nMessage: ${validatedData.message}`
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: 'Email envoyé avec succès'}, { status: 400 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: 'Méthode non autorisée'}, { status: 500 });
  }
}


/*
*/