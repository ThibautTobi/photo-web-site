// import { useState, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';

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
//             setLoading(false); // Désactiver l'indicateur de chargement
//         }
//     };

//     return (
//         <div className='m-auto flex flex-col bg-red-400 text-white w-2/3 h-2/3 items-center justify-around'>
//             <h2>Ajout de Photo</h2>
//             <div className="m-4">
//                 {files.map((file, index) => (
//                     <Image key={index} src={URL.createObjectURL(file)} alt="Aperçu de l'image" width={300} height={300} />
//                 ))}
//                 {!files.length && <DefaultIcon />}
//             </div>
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
