'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

/************************************************* Création d'un utilisateur avec Role USER  ***************************************************************/
export default function AddClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Définition du schéma de validation avec Yup
  const validationSchema = yup.object({
    // Le champ "name" doit être une chaîne et est obligatoire
    name: yup.string().required('Le nom est requis'),
    password: yup
      .string()
      // Le mot de passe doit avoir au moins 8 caractères
      .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
      // Le mot de passe ne doit pas dépsser 26 caractéres
      .max(26, "Le mot de passe doit avoir au moins de 26 caractères")
      // Le mot de passe doit contenir au moins un chiffre
      .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
      // Le mot de passe doit contenir un caractère spécial
      .matches(/[!@#$%^&*()\-_"'{}[\]:;<>,.?~\\/+|=]/, 'Le mot de passe doit contenir au moins un caractère spécial')
      // Le champ "password" est obligatoire
      .required('Le mot de passe est requis'),
  });

  // Initialisation de Formik
  const formik = useFormik({
    // Valeurs initiales du formulaire
    initialValues: { name: '', password: '' },
    // Utilisation du schéma de validation défini précédemment
    validationSchema,
    // Fonction à exécuter lors de la soumission du formulaire
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

    //   try {
        // Tentative d'envoi des données du formulaire à l'API
        const response = await fetch('/api/auth/AddUserAuth', {
          method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
          body: JSON.stringify(values),
        })
        
        .then((res)=>res.json());
        console.log(response)

        // // Si la réponse est OK, réinitialisation du formulaire
        // if (response.ok) {
        //   formik.resetForm();
        // } else {
        //   // Sinon, récupération et affichage du message d'erreur renvoyé par l'API
        //   const errorData = await response.json();
        //   setError(errorData.message || 'Erreur lors de la connexion.');
        // }
    //   } catch (error) {
    //     // En cas d'erreur lors de la requête, affichage d'un message d'erreur générique
    //     setError('Une erreur est survenue. Veuillez réessayer.');
    //   }
    //   setLoading(false);
    // },
}});

  return (
    <div className='bg-red-400 text-center w-80 h-auto'>
      <h2 className='font-bold mt-4'>Inscription Client Test next Auth</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {/* Affichage du message d'erreur s'il y en a un */}
      <form onSubmit={formik.handleSubmit} className='flex flex-col items-center m-10 justify-around'>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="name"
        />
        {formik.touched.name && formik.errors.name ? <div className='font-bold text-red-600 bg-gray-500 m-2'>{formik.errors.name}</div> : null} 
        {/* Affichage de l'erreur de validation pour le champ "name" */}
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? <div className='font-bold text-red-600 bg-gray-500 m-2'>{formik.errors.password}</div> : null} 
         {/* Affichage de l'erreur de validation pour le champ "password" */}
        <p className="text-sm text-gray-600 m-2 bg-white">
          Le mot de passe doit avoir au moins 8 caractères, contenir un chiffre et un caractère spécial.
        </p> 
        {/* Explication des exigences pour le mot de passe */}
        <button type="submit" disabled={loading || !formik.isValid || !formik.dirty}>
          {loading ? 'Loading...' : 'Login'}
        </button>
         {/* Bouton de soumission du formulaire, désactivé pendant le chargement ou si le formulaire n'est pas valide ou n'a pas été modifié */}
      </form>
    </div>
  );
}


/************
 * 
 * 
 * //////////////////////////////////////////////////////////////////// utilisation de sessions pour verifier le role
 import { useSession } from 'next-auth/react';

const MyComponent = () => {
  const { data: session } = useSession();

  if (session && session.user.role === 'admin') {
    // Contenu visible seulement par les admins
  }

  // Contenu général
}

////////////////////////////////////////////////////////////////////// protection des routes api
export default function handler(req, res) {
  const session = await getSession({ req });
  if (session && session.user.role === 'admin') {
    // Logique pour les admins
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
}

 * 
 * 
 */