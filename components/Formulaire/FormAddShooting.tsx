'use client'
import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';

// // Composant pour l'icône par défaut
// const DefaultIcon = () => {
//     return <p>Icone par défaut</p>;
// };

// export function AddShooting() {
//     const [title, setTitle] = useState<string>(''); // Titre de la photo
//     const [description, setDescription] = useState<string>(''); // Description de la photo
//     const [files, setFiles] = useState<File[]>([]); // Tableau pour stocker les fichiers sélectionnés
//     const [error, setError] = useState<string>(''); // Message d'erreur
//     const [successMessage, setSuccessMessage] = useState<string>(''); // Message de succès
//     const [loading, setLoading] = useState<boolean>(false); // Indicateur de chargement
//     const fileInputRef = useRef<HTMLInputElement>(null); // Référence à l'input de fichier

//     // Gestionnaire pour le changement de fichier
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const selectedFiles = Array.from(e.target.files || []); // Convertir la liste de fichiers en tableau
//         setFiles(selectedFiles); // Mettre à jour l'état avec les fichiers sélectionnés
//     };

//     // Gestionnaire pour la soumission du formulaire
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         setError('');
//         setSuccessMessage('');
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         files.forEach(file => formData.append('file', file)); // Ajouter chaque fichier au formData

//         try {
//             const response = await fetch('/api/new', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`Erreur lors de l'envoi des photos.`);
//             }

//             setTitle('');
//             setDescription('');
//             setFiles([]);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = ''; // Réinitialiser l'input de fichier
//             }
//             setSuccessMessage('Ajout réussi');
//         } catch (err) {
//             setError(`Erreur lors de l'ajout des photos.`);
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='m-auto flex flex-col bg-red-400 text-white w-2/3 h-2/3 items-center justify-around'>
//             <h2>Ajout de Photo</h2>
//             {/* <div className="m-4">
//                 {files.map((file, index) => (
//                     <Image key={index} src={URL.createObjectURL(file)} alt="Aperçu de l'image" width={300} height={300} />
//                 ))}
//                 {!files.length && <DefaultIcon />}
//             </div> */}
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
//                     multiple // Permettre la sélection de plusieurs fichiers
//                     required
//                 />
//                 <button type="submit" className='text-white' disabled={loading}>Ajouter</button>
//             </form>
//         </div>
//     );
// }



export function AddShooting() {
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

// console.log('titre :',title)
// console.log('files :',files)
// console.log('previews :',previews)
// console.log('upload progress :',uploadProgress)
// console.log('total images :',totalImages)
// console.log('image load :',imagesLoaded)
// console.log('file input ref :',fileInputRef)

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
                // probleme de compatibilité avec fetch voir avec axios 
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
        <div>
            <h2>Ajouter un Shooting</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre de l'album"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    required
                />
                <button type="submit">Envoyer</button>
            </form>
            <div>
                {previews.map((preview, index) => (
                    <Image key={index} src={preview} alt={`Aperçu ${index}`} width={100} height={100} />
                ))}
            </div>
            {/* a tester et ameliorer */}
            {/* {totalImages > 0 && (
                <div>
                    <div>Chargement : {uploadProgress}%</div>
                    <div>
                        Images chargées : {imagesLoaded} / {totalImages}
                    </div>
                </div>
            )} */}
        </div>
    );
}

////////////////////////////////////////////////////// integrer pour le pogress bar

// import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

// export function AddShooting() {
//     const [title, setTitle] = useState<string>(''); // Titre de l'album
//     const [files, setFiles] = useState<File[]>([]); // Fichiers sélectionnés pour le téléchargement
//     const [progress, setProgress] = useState<number>(0); // Progression du téléchargement
//     const [isStreamSupported, setIsStreamSupported] = useState<boolean>(false); // Support de ReadableStream
//     const [uploading, setUploading] = useState<boolean>(false); // État de téléchargement

//     // Référence pour l'input de type file
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // Vérifier si ReadableStream est supporté par le navigateur
//     useEffect(() => {
//         setIsStreamSupported(!!(window.fetch && window.ReadableStream));
//     }, []);

//     // Gestionnaire d'événement pour la sélection de fichiers
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setFiles(Array.from(e.target.files));
//         }
//     };

//     // Gestionnaire d'événement pour la soumission du formulaire
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setUploading(true);
//         setProgress(0);

//         const formData = new FormData();
//         formData.append('title', title);
//         files.forEach(file => formData.append('files', file));

//         // Si ReadableStream est supporté, utilisez-le pour suivre la progression
//         if (isStreamSupported) {
//             try {
//                 const response = await fetch('/api/upload', {
//                     method: 'POST',
//                     body: formData,
//                     // Pas de 'Content-Type': 'multipart/form-data' ici, car FormData s'en occupe
//                 });

//                 if (response.body) {
//                     const reader = response.body.getReader();
//                     const contentLength = +response.headers.get('Content-Length');
//                     let receivedLength = 0;

//                     // Boucle de lecture des données
//                     while (true) {
//                         const { done, value } = await reader.read();
//                         if (done) {
//                             break;
//                         }
//                         receivedLength += value.length;
//                         setProgress((receivedLength / contentLength) * 100);
//                     }

//                     // La réponse est complètement téléchargée ici
//                     // Traitez la réponse comme nécessaire
//                 }
//             } catch (error) {
//                 console.error('Erreur lors du téléchargement:', error);
//             }
//         } else {
//             // Fallback si ReadableStream n'est pas supporté
//             // Vous pouvez choisir de ne pas gérer la progression ou d'utiliser une autre méthode
//         }

//         setUploading(false);
//     };

//     return (
//         <div>
//             <h2>Ajouter un album de shooting</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Titre de l'album"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     onChange={handleFileChange}
//                     required
//                 />
//                 <button type="submit" disabled={uploading}>Télécharger</button>
//             </form>
//             {uploading && isStreamSupported && (
//                 <div>
//                     <div>Progression du téléchargement : {progress.toFixed(2)}%</div>
//                     <progress value={progress} max="100"></progress>
//                 </div>
//             )}
//             {/* Affichage des images sélectionnées */}
//             <div>
//                 {files.map((file, index) => (
//                     <img
//                         key={index}
//                         src={URL.createObjectURL(file)}
//                         alt={`Aperçu ${index}`}
//                         width={100}
//                         height={100}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }
