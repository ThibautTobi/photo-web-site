'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

/**** revue 1 */
/******************************* Création par l'admin d'un utilisateur avec Role USER ***************************************************************/
export default function AddClient() {
  //Etat de chargement loading
  const [loading, setLoading] = useState(false);
  // Etat des error
  const [error, setError] = useState<string | null>(null);
  //Etat du retour de la reponse de requete
  const [successMessage, setSuccessMessage] = useState('');

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
      setSuccessMessage('');

      try {
        // Tentative d'envoi des données du formulaire à l'API
        const response = await fetch('/api/AddClientAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        // Si la réponse est OK, réinitialisation du formulaire
        if (response.ok) {
          setSuccessMessage('Client ajouté avec succès!');
          formik.resetForm();
        } else {
          // Sinon, récupération et affichage du message d'erreur renvoyé par l'API
          const errorData = await response.json();
          setError(errorData.message || 'Erreur lors de la connexion.');
        }
      } catch (error) {
        // En cas d'erreur lors de la requête, affichage d'un message d'erreur générique
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      setLoading(false);
    },
  });

  return (
    <div className='text-center w-auto h-auto flex flex-col items-center m-4'>
      <h2 className='font-bold mt-4 text-white bg-red-300 p-4 rounded-lg'>Ajout de Client</h2>
      {/* Affichage du message d'erreur s'il y en a un */}
      <form onSubmit={formik.handleSubmit} className='m-10 justify-around'>
        <TextField
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="name"
          className='m-4'
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
          error={formik.touched.name && formik.errors.name ? Boolean(true) : Boolean(false)}
        />
        {/* ou Affichage de l'erreur de validation pour le champ "name" */}
        {/* {formik.touched.name && formik.errors.name ? <div className='font-bold text-red-600 bg-gray-500 m-2'>{formik.errors.name}</div> : null}  */}
        
        <TextField
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          className='m-4'
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          error={formik.touched.password && formik.errors.password ? Boolean(true) : Boolean(false)}
        />
        {/* ou Affichage de l'erreur de validation pour le champ "password" */}
        {/* {formik.touched.password && formik.errors.password ? <div className='font-bold text-red-600 bg-gray-500 m-2'>{formik.errors.password}</div> : null} */}
        
        {/* Explication des exigences pour le mot de passe */}
        <p className="text-sm text-red-400 m-2">
          Le mot de passe doit avoir au moins 8 caractères, contenir un chiffre et un caractère spécial.
        </p> 
    
        {/* Bouton de soumission du formulaire, désactivé pendant le chargement ou si le formulaire n'est pas valide ou n'a pas été modifié */}
        <Button type="submit" variant="contained" color="primary"  disabled={loading || !formik.isValid || !formik.dirty}>
          {loading ? 'Loading...' : 'Création User'} 
        </Button>
        {successMessage && <p className='bg-white text-green-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold'>{successMessage}</p>}
        {error && <p className='bg-white text-red-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold' >{error}</p>}
      </form>
    </div>
  );
}
