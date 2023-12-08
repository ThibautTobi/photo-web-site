'use client'
// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { TextField, Button, CircularProgress } from '@mui/material';
// import { yupResolver } from '@hookform/resolvers/yup';

// export default function FormInscription() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Schéma de validation avec Yup
//   const validationSchema = yup.object({
//     identifiant: yup.string().required('Le nom ou l\'email est requis'),
//     password: yup.string()
//       .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
//       .max(26, 'Le mot de passe doit avoir au plus 26 caractères')
//       .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
//       .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
//       .required('Le mot de passe est requis'),
//   });

//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema)
//   });

//   const onSubmit = async (data: { identifiant: string; password: string }) => {
//     setLoading(true);
//     setError(null);

//   console.log(data)

//     try {
//       // Envoi des données du formulaire à l'API
//       const response = await fetch('/api/auth/AddUserAuth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       const responseData = await response.json();

//   console.log(responseData)

//       if (!response.ok) {
//         // Gestion des erreurs provenant de l'API
//         setError(responseData.message || 'Une erreur est survenue lors de l\'envoi des données.');
//       } else {
//         // Traitement en cas de succès
//         console.log('Inscription réussie:', responseData);
//         // Réinitialisation du formulaire ou redirection, selon le besoin
//       }
//     } catch (error) {
//       // Gestion des erreurs de requête
//       setError('Une erreur est survenue. Veuillez réessayer.');
//     }
  
//     setLoading(false);
//   };

//   return (
//     <div className='bg-red-400 text-center w-80 h-auto'>
//       <h2 className='font-bold mt-4'>Inscription Client Test next Auth</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center m-10 justify-around'>
//         <Controller
//           name="identifiant"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <TextField {...field} label="Nom ou Email" variant="outlined" error={!!errors.identifiant} helperText={errors.identifiant?.message} />}
//         />
//         <Controller
//           name="password"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <TextField {...field} label="Mot de passe" type="password" variant="outlined" error={!!errors.password} helperText={errors.password?.message} />}
//         />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : 'Inscription'}
//         </Button>
//       </form>
//     </div>
//   );
// }

/************************************************************************************ version soit name ou email avec confirmation mot de passe */

import { useState } from 'react';
import { useForm, Controller, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormData {
  name?: string;
  email?: string;
  password: string;
  confirmPassword: string;
}
type FieldName = 'name' | 'email' | 'password' | 'confirmPassword';

// Schéma de validation avec Yup
const validationSchema = yup.object({
  name: yup.string()
    // .when('email', (email: string, schema: yup.StringSchema) => 
    //   !email || email.length === 0 ? schema.required('Le nom est requis') : schema
    // ),
    ,
  email: yup.string()
    .email('Email invalide')
    // .when('name', (name: string, schema: yup.StringSchema) => 
    //   !name || name.length === 0 ? schema.required('L\'email est requis') : schema
    // ),
    ,
  password: yup.string()
    .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
    .max(26, 'Le mot de passe doit avoir au plus 26 caractères')
    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
    .required('Le mot de passe est requis'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
    .required('Confirmation requise')
});



export default function FormInscription () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors, isValid, isDirty, touchedFields }, getValues } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const showValidationIcon = (fieldName: FieldName) => {
    const fieldValue = getValues(fieldName);
    return touchedFields[fieldName] && !errors[fieldName] && fieldValue && fieldValue.length > 0;
  };
  
  // Gestion de l'envoi du formulaire
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);

    let payload = {};

    // Déterminer si 'name' ou 'email' est utilisé
    if (data.email) {
      payload = { email: data.email, password: data.password };
    } else if (data.name) {
      payload = { name: data.name, password: data.password };
    }

console.log('le payload :',payload)
    // Vérifiez si ni le nom ni l'email ne sont fournis
    if (!data.name && !data.email) {
      setError('Veuillez fournir un nom ou un email');
      setLoading(false);
      return;
     }
console.log("le payload aprés  la verification si non ou email :", payload, "ou :", {payload})
    try {
      // Envoi des données du formulaire à l'API
      const response = await fetch('/api/auth/AddUserAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
console.log('response : ',response)
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message || 'Erreur lors de l\'inscription.');
      } else {
        console.log('Inscription réussie:', responseData);
        // Redirection ou autres actions après succès
          // Réinitialisation du formulaire
        // reset();
        // Redirection ou affichage d'un message de succès
        // Par exemple: navigate('/success'); ou setShowSuccessMessage(true)
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }

    setLoading(false);
  };
/***************************************** sans grosse modification de style */
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow flex flex-col items-center">
  //     <h2 className="text-xl font-bold mb-4 text-center">Inscription</h2>
  //     {error && <p className="text-red-500 text-center">{error}</p>}

  //     <div className="flex items-center mb-4">
  //       <Controller
  //         name="name"
  //         control={control}
  //         defaultValue=""
  //         render={({ field }) => (
  //           <TextField {...field} type="text" label="Nom" className={`form-input ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
  //         )}
  //       />
  //       {/* {!errors.name && <CheckCircleIcon className="text-green-500 ml-2" />} */}
  //       {showValidationIcon("name") && <CheckCircleIcon className="text-green-500 ml-2" />}
  //     </div>

  //     <div className="flex items-center mb-4">
  //       <Controller
  //         name="email"
  //         control={control}
  //         defaultValue=""
  //         render={({ field }) => (
  //           <TextField {...field} type="email" label="Email" className={`form-input ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
  //         )}
  //       />
  //       {/* {!errors.email && <CheckCircleIcon className="text-green-500 ml-2" />} */}
  //       {showValidationIcon("email") && <CheckCircleIcon className="text-green-500 ml-2" />}
  //     </div>

  //     <div className="flex items-center mb-4">
  //       <Controller
  //         name="password"
  //         control={control}
  //         defaultValue=""
  //         render={({ field }) => (
  //           <TextField {...field} type="password" label="Mot de passe" autoComplete="off" error={!!errors.password} helperText={errors.password?.message} />
  //         )}
  //       />
  //       {/* {!errors.password && <CheckCircleIcon className="text-green-500 ml-2" />} */}
  //       {showValidationIcon("password") && <CheckCircleIcon className="text-green-500 ml-2" />}
  //     </div>

  //     <div className="flex items-center mb-6">
  //       <Controller
  //         name="confirmPassword"
  //         control={control}
  //         defaultValue=""
  //         render={({ field }) => (
  //           <TextField {...field} type="password" label="Confirmer le mot de passe" autoComplete="off" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
  //         )}
  //       />
  //       {/* {!errors.confirmPassword && <CheckCircleIcon className="text-green-500 ml-2" />} */}
  //       {showValidationIcon("confirmPassword") && <CheckCircleIcon className="text-green-500 ml-2" />}
  //     </div>


  //     <Button type="submit" variant='outlined' className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={!isValid || loading}>
  //       {loading ? <CircularProgress size={24} /> : 'Inscription'}
  //     </Button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-slate-100 p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Inscription</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Nom" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          {showValidationIcon("name") && <CheckCircleIcon className="text-green-500" />}
        </Grid>
  
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth type="email" label="Email" error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
          {showValidationIcon("email") && <CheckCircleIcon className="text-green-500" />}
        </Grid>
  
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth type="password" label="Mot de passe" autoComplete="off" error={!!errors.password} helperText={errors.password?.message} />
            )}
          />
          {showValidationIcon("password") && <CheckCircleIcon className="text-green-500" />}
        </Grid>
  
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth type="password" label="Confirmer le mot de passe" autoComplete="off" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
            )}
          />
          {showValidationIcon("confirmPassword") && <CheckCircleIcon className="text-green-500" />}
        </Grid>
  
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isValid || loading}>
            {loading ? <CircularProgress size={24} /> : 'Inscription'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}


/************************************************************* amelioration a developper */
/*



Pour améliorer la validation des adresses e-mail et s'assurer qu'elles sont non seulement valides mais également accessibles par l'utilisateur, vous pouvez combiner une expression régulière plus robuste avec un processus de vérification par e-mail. Voici un exemple de mise en œuvre de cette approche :

1. Utiliser une Expression Régulière Plus Robuste
Vous pouvez remplacer l'expression régulière actuelle par une version plus complexe qui valide mieux les formats d'e-mail. Voici un exemple :

javascript
Copy code
function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
2. Envoyer un E-mail de Confirmation
Après avoir validé le format de l'adresse e-mail, l'étape suivante consiste à envoyer un e-mail de confirmation. Cela nécessite une interaction avec un serveur de messagerie.

Exemple d'implémentation côté serveur (Node.js avec Nodemailer) :

Installation de Nodemailer :

Copy code
npm install nodemailer
Fonction d'envoi d'e-mail :

javascript
Copy code
const nodemailer = require('nodemailer');

async function sendVerificationEmail(userEmail, verificationToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utiliser le service de votre choix
    auth: {
      user: process.env.EMAIL_USERNAME, // Votre adresse e-mail
      pass: process.env.EMAIL_PASSWORD, // Votre mot de passe d'e-mail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Vérification de l\'adresse e-mail',
    html: `<p>Veuillez cliquer sur le lien suivant pour vérifier votre adresse e-mail: <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}">Vérifier mon e-mail</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
Générer un Token de Vérification :

Générez un token unique pour chaque utilisateur lors de l'inscription et stockez-le dans votre base de données.

Route d'API pour l'Inscription :

Lorsqu'un utilisateur s'inscrit, utilisez la fonction sendVerificationEmail pour envoyer un e-mail de confirmation.

Route de Vérification :

Créez une route d'API pour gérer la vérification du token. Si le token correspond et est valide, mettez à jour le statut de l'utilisateur dans votre base de données.

Page de Vérification côté Frontend :

Une page simple sur votre application frontend pour gérer le lien de vérification. Elle doit appeler la route de vérification de votre API avec le token.

Sécurité et Pratiques Recommandées
Sécurité des E-mails : Utilisez des services de messagerie sécurisés et des comptes avec une authentification forte.
Environnement Variables : Stockez les informations sensibles comme les identifiants de messagerie dans des variables d'environnement.
Expiration du Token : Assurez-vous que les tokens de vérification expirent après un certain temps pour des raisons de sécurité.
Gestion des Erreurs : Mettez en place une gestion robuste des erreurs pour les cas où l'e-mail ne peut pas être envoyé.
Avec cette approche, vous renforcez non seulement la validation de l'adresse e-mail, mais vous vous assurez également que l'utilisateur a accès à l'adresse e-mail fournie.











*/