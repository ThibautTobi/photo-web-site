'use client'

import Image from 'next/image';
// import { useState, ChangeEvent, FormEvent, useRef, useMemo, useEffect } from 'react';


// // const DefaultIcon = React.memo(() => {
// //     // Votre code d'icône ici
// //     return <div>Icon</div>;
// // });

// // Si vous n'avez pas de composant d'icône par défaut, vous pouvez simplement utiliser une div ou une image.
// const DefaultIcon = () => {
//     return <div>Icone par défaut</div>; // Remplacez ceci par votre icône ou image par défaut.
// };

// export function AddPhoto() {
//     const [title, setTitle] = useState<string>('');
//     const [description, setDescription] = useState<string>('');
//     const [file, setFile] = useState<File | null>(null);
//     const [error, setError] = useState<string>('');
//     const [successMessage, setSuccessMessage] = useState<string>('');
//     //const [previewURL, setPreviewURL] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);


//     const previewURL = useMemo(() => {
//         if (file) {
//             return URL.createObjectURL(file);
//         }
//         return undefined; // Retournez undefined au lieu de null pour typescript
//     }, [file]);
    

//     useEffect(() => {
//         return () => {
//             if (previewURL) {
//                 URL.revokeObjectURL(previewURL);
//             }
//         };
//     }, [previewURL]);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         setError('');
//         setSuccessMessage('');

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         if (file) {
//             formData.append('image', file);
//         }

//         try {
//             const response = await fetch('/api/new', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`Erreur lors de l'envoi de la photo.`);
//             }

//             setTitle('');
//             setDescription('');
//             setFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = '';
//             }
//             setSuccessMessage('Ajout réussi');
//         } catch (err) {
//             setError(`Erreur lors de l'ajout de la photo.`);
//             console.log(err);
//         }
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             setFile(files[0]);
//         }
//     };

//     return (
//         <div className='m-auto flex flex-col bg-red-400 text-white w-2/3 h-2/3 items-center'>
//             <h2>Ajout de Photo</h2>
//             <div className="m-4">
//                 {previewURL ? <Image src={previewURL} alt="Aperçu de l'image" width={300} height={300} /> : <DefaultIcon />}
//             </div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//             <form onSubmit={handleSubmit} className='flex flex-col m-3 text-gray-700' encType="multipart/form-data">
//                 <input
//                     name='titre'
//                     type="text"
//                     placeholder="Titre"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <textarea
//                     name='description'
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <input
//                     ref={fileInputRef}
//                     name='file'
//                     type="file"
//                     onChange={handleFileChange}
//                 />
//                 <button type="submit" className='text-white'>Ajouter</button>
//             </form>
//         </div>
//     );
// }

// import { useState, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';

// // Si vous n'avez pas de composant d'icône par défaut, vous pouvez simplement utiliser une div ou une image.
// const DefaultIcon = () => {
//     return <p>Icone par défaut</p>;
// };

/************* Formulaire Ajout d'une Photos avec accés Admin pour images exposer sur le site dans l'onglet Photos ********************/

// export function AddPhoto() {
//     const [title, setTitle] = useState<string>('');
//     const [description, setDescription] = useState<string>('');
//     const [file, setFile] = useState<File | null>(null);
//     const [error, setError] = useState<string>('');
//     const [successMessage, setSuccessMessage] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const previewURL = useMemo(() => {
//         if (file) {
//             return URL.createObjectURL(file);
//         }
//         return undefined; // Retournez undefined au lieu de null
//     }, [file]);

//     useEffect(() => {
//         return () => {
//             if (previewURL) {
//                 URL.revokeObjectURL(previewURL); // Nettoie l'URL pour éviter les fuites de mémoire
//             }
//         };
//     }, [previewURL]);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         setError('');
//         setSuccessMessage('');
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         if (file) {
//             formData.append('image', file);
//         }

//         try {
//             const response = await fetch('/api/new', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`Erreur lors de l'envoi de la photo.`);
//             }

//             setTitle('');
//             setDescription('');
//             setFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = ''; // Réinitialise l'input de l'image
//             }
//             setSuccessMessage('Ajout réussi');
//         } catch (err) {
//             setError(`Erreur lors de l'ajout de la photo.`);
//             console.log(err);
//         } finally {
//             setLoading(false); // Définir l'indicateur de chargement sur false
//         }
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             setFile(files[0]);
//         }
//     };

//     return (
//         <div className='m-auto flex flex-col bg-red-400 text-white w-2/3 h-2/3 items-center justify-around'>
//             <h2>Ajout de Photo</h2>
//             <div className="m-4">
//                 {previewURL ? <Image src={previewURL} alt="Aperçu de l'image" width={300} height={300} /> : <DefaultIcon />}
//             </div>
//             {/* ajouter du border radius et effet */}
//             {error && <p className='m-2 bg-red-600 p-4 text-white font-bold text-lg'>{error}</p>}
//             {successMessage && <p className='m-2 bg-lime-500 p-4 text-white font-bold text-lg'>{successMessage}</p>}
//             {loading && <p className='m-2 bg-slate-400 p-4 font-bold text-white'>Chargement...</p>}
//             <form onSubmit={handleSubmit} className='flex flex-col m-3 text-gray-700' encType="multipart/form-data">
//                 <input
//                     name='titre'
//                     type="text"
//                     placeholder="Titre"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     name='description'
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 />
//                 <input
//                     ref={fileInputRef}
//                     name='file'
//                     type="file"
//                     onChange={handleFileChange}
//                     required
//                 />
//                 <button type="submit" className='text-white' disabled={loading}>Ajouter</button>
//             </form>
//         </div>
//     );
// }




// import * as yup from 'yup';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback, useMemo } from 'react';
// import { Button, TextField, CircularProgress, Input } from '@mui/material';
// //import Image from 'next/image';

// // Composant pour afficher une icône par défaut si aucune image n'est sélectionnée
// const DefaultIcon = () => 
//     <div>
//         {/* <Image
//         src={iconePhotoDefaut}
//         alt='icone photo'
//         width={30}
//         height={30}
//         /> */}
//     Icone par défaut
//     </div>;

// export function AddPhoto() {
    
//     //const [title, setTitle] = useState<string>('');
//     //const [description, setDescription] = useState<string>('');
//     const [file, setFile] = useState<File | null>(null);
//     const [error, setError] = useState<string>('');
//     const [successMessage, setSuccessMessage] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

// // avec utilisation de "controller" de react hook form
//     const { control, handleSubmit, reset, formState: { errors } } = useForm({
//         resolver: yupResolver(yup.object({
//             title: yup.string().required('Le titre est requis'),
//             description: yup.string().required('La description est requise'),
//             // file: yup.mixed().required('Une photo est requise')
//             //     .test('fileSize', 'Le fichier est trop volumineux', value => value && value.size <= 1048576)
//             //     .test('fileType', 'Type de fichier non supporté', value => value && ['image/jpeg', 'image/png'].includes(value.type))
       
//             }))
//     });


//     // Schéma de validation Yup pour le formulaire
//     // const formSchema = yup.object({
//     //     title: yup.string().required('Le titre est requis'),
//     //     description: yup.string().required('La description est requise'),
//     //     file: yup.mixed().required('Une photo est requise')
//     //         .test('fileSize', 'Le fichier est trop volumineux', value => value && value.size <= 1048576) // Limite à 1MB
//     //         .test('fileType', 'Type de fichier non supporté', value => value && ['image/jpeg', 'image/png'].includes(value.type))
//     // });


//     // Création d'une URL d'aperçu pour l'image sélectionnée
//     const previewURL = useMemo(() => {
//         if (file) {
//             return URL.createObjectURL(file);
//         }
//         return null;
//     }, [file]);
//     /******** ou version courte */
//     //const previewURL = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

//     // Nettoyage de l'URL d'aperçu pour éviter les fuites de mémoire
//     useEffect(() => {
//         return () => {
//             if (previewURL) {
//                 URL.revokeObjectURL(previewURL);
//             }
//         };
//     }, [previewURL]);


//     //console.log(file , title ,description ,loading)

//     // Gestion de la soumission du formulaire
//     const onSubmit = useCallback(async (data : any) => {
//         setError('');
//         setSuccessMessage('');
//         setLoading(true);
    
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('description', data.description);
//         if (file) {
//             formData.append('image', file);
//         }
    
//         try {
//             const response = await fetch('/api/NewPhoto', {
//                 method: 'POST',
//                 body: formData,
//             });
    
//             if (!response.ok) {
//                 throw new Error(`Erreur du serveur : ${response.status} ${response.statusText}`);
//             }
    
//             reset(); // Réinitialiser les champs du formulaire
//             setFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = ''; // Réinitialiser l'input de fichier
//             }
//             setSuccessMessage('Ajout réussi');
//         } catch (err) {
//             setError('Erreur lors de l\'ajout de la photo.');
//         } finally {
//             setLoading(false);
//         }
//     }, [file, reset, fileInputRef]);
    

//     // Gestion du changement de fichier
// //     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// //         const files = e.target.files;
// //         if (files && files[0]) {
// //             setFile(files[0]);
// //         }
// // console.log('l image',file)
// //         // Vérifier la taille du fichier (par exemple, moins de 5MB)
// //         if (file.size > 5242880) {
// //             setError("Le fichier est trop volumineux (max 5MB).");
// //             return;
// //         }

// //         // Vérifier le type de fichier
// //         if (!['image/jpeg', 'image/png'].includes(file.type)) {
// //             setError("Type de fichier non supporté (uniquement JPEG ou PNG).");


// //         setFile(file); // Ici, on est sûr que 'file' n'est pas 'null'
// //         setError(''); // Effacer les erreurs précédentes
// //         } else {
// //             // Gérer le cas où aucun fichier n'est sélectionné
// //             setFile(null);
// //             setError('Aucun fichier sélectionné.');
// //         }
// //     };

//     // Gestion du changement de fichier
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files && files[0]) {
//             const selectedFile = files[0];

//             // Vérifier la taille du fichier (par exemple, moins de 5MB)
//             if (selectedFile.size > 5242880) {
//                 setError("Le fichier est trop volumineux (max 5MB).");
//                 return;
//             }

//             // Vérifier le type de fichier
//             if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
//                 setError("Type de fichier non supporté (uniquement JPEG ou PNG).");
//                 return;
//             }

//             setFile(selectedFile); // Définir le fichier seulement s'il passe les vérifications
//             setError(''); // Effacer les erreurs précédentes
//         } else {
//             // Gérer le cas où aucun fichier n'est sélectionné
//             setFile(null);
//             setError('Aucun fichier sélectionné.');
//         }
//     };


//     return (
//         <div className=' flex flex-col text-whitew-2/3 h-2/3 items-center justify-around'>
//             <h2>Ajout de Photo</h2>
//             <div className='m-4'>
//                 {previewURL ? <Image src={previewURL} alt="Aperçu de l'image" width={400} height={400} /> : 
//                 <DefaultIcon />// attente de l'import icone svg
//                 //<div className='m-4 bg-slate-300 w-40 h-40'>
//         //                 {/* <Image
//         // src={iconePhotoDefaut}
//         // alt='icone photo'
//         // width={30}
//         // height={30}
//         // /> */}
//         // </div>
//                 }
//             </div>
//             {error && <p className='bg-white text-red-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold'>{error}</p>}
//             {successMessage && <p className='bg-white text-green-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold'>{successMessage}</p>}
//             {loading && <CircularProgress />}
//             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-3 text-gray-700' encType="multipart/form-data">
//                 {/* <TextField
//                     label="Titre"
//                     variant="outlined"
//                     className='m-2'
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <TextField 
//                     label="Description" 
//                     variant="outlined" 
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)} 
//                     multiline 
//                     rows={4} 
//                     fullWidth 
//                     margin="normal"
//                     required
//                 /> */}
//                 <Controller
//                     name="title"
//                     control={control}
//                     render={({ field }) => (
//                         <TextField {...field} 
//                         label="Titre"
//                         className='m-4' 
//                         // onChange={(e) => setTitle(e.target.value)}
//                         error={!!errors.title} 
//                         helperText={errors.title?.message}
//                         required
//                     />
//                     )}
//                 />
//                 <Controller
//                     name="description"
//                     control={control}
//                     render={({ field }) => (
//                         <TextField {...field} 
//                         label="Description"
//                         className='m-4' 
//                         multiline rows={4} 
//                         //onChange={(e) => setDescription(e.target.value)}
//                         error={!!errors.description} 
//                         helperText={errors.description?.message} 
//                         required
//                         />
//                     )}
//                 />
//                 <p className='m-4 font-bold text-center'>Accepte uniquement les formats JPEG et PNG et une taille maximal de 5 mb.</p>
//                 <Input
//                     inputProps={{
//                         ref: fileInputRef,
//                         type: 'file',
//                         accept: 'image/jpeg, image/png', // Accepter uniquement JPEG et PNG
//                         required: true,
//                         onChange: handleFileChange
//                     }}
//                     type="file"
//                     className='m-4'
//                     // required
//                 />
//                 <Button type="submit" variant="contained" color="primary" disabled={loading || !formState.isValid || !file}>
//                     Ajouter
//                 </Button>
//             </form>
//         </div>
//     );
// };


/**************************** revu 1  */

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, CircularProgress, Input } from '@mui/material';

// Schéma de validation pour le formulaire
const schema = yup.object({
  title: yup.string().required('Le titre est requis'),
  description: yup.string().required('La description est requise'),
  // Ajoutez ici la validation pour le fichier si nécessaire
});

// Composant pour afficher une icône par défaut si aucune image n'est sélectionnée
const DefaultIcon = () => (
  <div>
    {/* Remplacez par un composant d'image si nécessaire */}
    Icone par défaut
  </div>
);

export function AddPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    defaultValues: {
        title: '',
        description: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange', // Valider le formulaire à chaque changement
  });

  // Création d'une URL d'aperçu pour l'image sélectionnée
  const previewURL = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

  // Nettoyage de l'URL d'aperçu pour éviter les fuites de mémoire
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  // Gestion de la soumission du formulaire
  const onSubmit = useCallback(async (data : any) => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await fetch('/api/NewPhoto', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur du serveur : ${response.status} ${response.statusText}`);
      }

      //reset(); // Réinitialiser les champs du formulaire
              // Réinitialisation complète du formulaire, y compris les champs de titre et de description
              reset({
                title: '',  // Valeur par défaut pour le titre
                description: '',  // Valeur par défaut pour la description
            });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Réinitialiser l'input de fichier
      }
      setSuccessMessage('Ajout réussi');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la photo.');
    } finally {
      setLoading(false);
    }
  }, [file, reset, fileInputRef]);

  // Gestion du changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];

      if (selectedFile.size > 5242880) {
        setError("Le fichier est trop volumineux (max 5MB).");
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setError("Type de fichier non supporté (uniquement JPEG ou PNG).");
        return;
      }

      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Aucun fichier sélectionné.');
    }
  };

  return (
    <div className='flex flex-col w-2/3 h-2/3  items-center justify-around'>
      <h2>Ajout de Photo</h2>
      <div>
        {previewURL ? <Image src={previewURL} alt="Aperçu de l'image" width={400} height={400} /> : <DefaultIcon />}
      </div>
      {error && <p className='bg-white text-red-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold'>{error}</p>}
      {successMessage && <p className='bg-white text-green-600 rounded-md p-4 border-2 border-pink-500 mt-4 font-bold'>{successMessage}</p>}
      {loading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-3 text-gray-700' encType="multipart/form-data">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Titre" className='m-4' error={!!errors.title} helperText={errors.title?.message} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Description" className='m-4' multiline rows={4} error={!!errors.description} helperText={errors.description?.message} />
          )}
        />
        <p className='m-4 font-bold text-center'>Accepte uniquement les formats JPEG et PNG et une taille maximale de 5 MB.</p>
        <Input
          inputProps={{
            ref: fileInputRef,
            type: 'file',
            accept: 'image/jpeg, image/png',
            onChange: handleFileChange
          }}
          type="file"
          className='m-4'
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading || !isDirty || !isValid || !file}>
          Ajouter
        </Button>
      </form>
    </div>
  );
}