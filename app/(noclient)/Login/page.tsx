'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Login() {
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

      try {
        // Tentative d'envoi des données du formulaire à l'API
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        // Si la réponse est OK, réinitialisation du formulaire
        if (response.ok) {
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
    <div className='bg-red-400 text-center w-80 h-auto'>
      <h2 className='font-bold mt-4'>POST Login</h2>
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




// ancienne version :

/*

// import React, { useState } from 'react';

// export default function Login() {
//   const [data, setData] = useState({
//     name: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setData({ name: '', password: '' });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Erreur lors de la connexion.');
//       }
//     } catch (error) {
//       setError('Une erreur est survenue. Veuillez réessayer.');
//     }
//     setLoading(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className='bg-red-400 text-center w-80 h-40'>
//       <h2 className='font-bold'>POST Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleConnect} className='flex flex-col items-center m-10 justify-around'>
//         <input
//           type="text"
//           name="name"
//           value={data.name}
//           onChange={handleChange}
//           placeholder="name"
//         />
//         <input
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Loading...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }


*/