'use client'
import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';
import { Button, TextField, Input, Box, Typography,InputLabel } from '@mui/material';

import axios from 'axios';

export function AddShooting() {
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Générer les aperçus des images
    const generatePreviews = (files: File[]) => {
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    // Gestionnaire pour le changement de fichier
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);
        generatePreviews(selectedFiles);
        setTotalImages(selectedFiles.length);
        setImagesLoaded(0); 
    };

    // Gestionnaire pour la soumission du formulaire
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        files.forEach(file => formData.append('files', file));

        try {
            const response = await fetch('/api/newShooting', {
                method: 'POST',
                body: formData,
                
                // // Ajouter un écouteur d'événements pour suivre la progression du chargement
                // //probleme de compatibilité avec fetch voir avec axios 
                // onUploadProgress: (progressEvent) => {
                //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     setUploadProgress(percentCompleted);
                // }
            });
            console.log(response)


            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi des images.');
            }

            // Réinitialiser le formulaire
            setTitle('');
            setFiles([]);
            setPreviews([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            //setImagesLoaded(totalImages); // Mettre à jour le nombre d'images chargées
            setTotalImages(0)
            setImagesLoaded(0)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box>
            <Typography variant="h4" className='m-2'>Ajouter un Shooting</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Titre de l'album"
                    variant="outlined"
                    className='m-4'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                {/* <Input
                    inputRef={fileInputRef}
                    type="file"
                    className='m-4'
                    onChange={handleFileChange}
                    multiple
                    required
                    fullWidth
                    margin="none"
                /> */}
                <Input
                    inputRef={fileInputRef}
                    type="file"
                    className='m-4'
                    onChange={handleFileChange}
                    inputProps={{ multiple: true }} // Ajouter ici
                    required
                    fullWidth
                    margin="dense"
                />
                <Button type="submit" variant="contained" color="primary" className='m-4'>Envoyer</Button>
            </form>
                        {/* a tester et ameliorer */}
            {/* {totalImages > 0 && (
                <div>
                     <div>Chargement : {uploadProgress}%</div>
                     <div>
                         Images chargées : {imagesLoaded} / {totalImages}
                     </div>
                 </div>
             )} */}
            <Box>
                {previews.map((preview, index) => (
                    <Image key={index} src={preview} alt={`Aperçu ${index}`} width={200} height={200} className='m-4'/>
                ))}
            </Box>
        </Box>
    );
}

/***************************************** a finir  */

////////////////////////////////// utilisation de Axios a la place de fetch pour géré des fonction avancés (chargement des images)


// export function AddShooting() {
//     const [title, setTitle] = useState('');
//     const [files, setFiles] = useState<File[]>([]);
//     const [previews, setPreviews] = useState<string[]>([]);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [totalImages, setTotalImages] = useState(0);
//     const [imagesLoaded, setImagesLoaded] = useState(0);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // Générer les aperçus des images
//     const generatePreviews = (files: File[]) => {
//         const newPreviews = files.map(file => URL.createObjectURL(file));
//         setPreviews(newPreviews);
//     };

//     // Gestionnaire pour le changement de fichier
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const selectedFiles = Array.from(e.target.files || []);
//         setFiles(selectedFiles);
//         generatePreviews(selectedFiles);
//         setTotalImages(selectedFiles.length);
//         setImagesLoaded(0); 
//     };

//     // Gestionnaire pour la soumission du formulaire
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('title', title);
//         files.forEach(file => formData.append('files', file));

//         try {
//             const response = await axios.post('/api/newShooting', formData, {
//                 onUploadProgress: (progressEvent) => {
//                   // Vérifiez si `total` est défini
//                   if (progressEvent.total) {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percentCompleted);
//                   } 
//                   //else {
//                     // Gérer le cas où `total` n'est pas disponible
//                     // Par exemple, vous pouvez choisir de définir `uploadProgress` sur une valeur par défaut ou de l'ignorer
//                   //}
//                 }
//               });

//             if (response.status === 200) {
//                 // Réinitialisation du formulaire après un téléversement réussi
//                 setTitle('');
//                 setFiles([]);
//                 setPreviews([]);
//                 //fileInputRef.current.value = null;
//                 if (fileInputRef.current) {
//                     fileInputRef.current.value = '';
//                     }
//                 setUploadProgress(0);
//             } else {
//                 throw new Error('Erreur lors de l\'envoi des images.');
//             }
//         } catch (err) {
//             console.error('Erreur lors du téléversement:', err);
//             // Gérer les erreurs ici
//         }

//         //     if (!response.ok) {
//         //         throw new Error('Erreur lors de l\'envoi des images.');
//         //     }

//         //     // Réinitialiser le formulaire
//         //     setTitle('');
//         //     setFiles([]);
//         //     setPreviews([]);
//         //     if (fileInputRef.current) {
//         //         fileInputRef.current.value = '';
//         //     }
//         //     //setImagesLoaded(totalImages); // Mettre à jour le nombre d'images chargées
//         //     setTotalImages(0)
//         //     setImagesLoaded(0)
//         // } catch (err) {
//         //     console.error(err);
//         // }
//     };

//     return (
//         <Box>
//             <Typography variant="h4">Ajouter un Shooting</Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Titre de l'album"
//                     variant="outlined"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     fullWidth
//                     margin="normal"
//                 />
//                 <InputLabel htmlFor="file-input">Upload File</InputLabel>
//                 <Input
//                     id="file-input"
//                     inputProps={{
//                         ref: fileInputRef,
//                         type: 'file',
//                         multiple: true,
//                         onChange: handleFileChange
//                     }}
//                 />
//                 <Button type="submit" variant="contained" color="primary">Envoyer</Button>
//             </form>
//             <Box>
//                 {previews.map((preview, index) => (
//                     <Image key={index} src={preview} alt={`Aperçu ${index}`} width={100} height={100} />
//                 ))}
//             </Box>
//         </Box>
//     );
// }

