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

import { useState, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';

// Si vous n'avez pas de composant d'icône par défaut, vous pouvez simplement utiliser une div ou une image.
const DefaultIcon = () => {
    return <p>Icone par défaut</p>;
};

export function AddPhoto() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const previewURL = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return undefined; // Retournez undefined au lieu de null
    }, [file]);

    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL); // Nettoie l'URL pour éviter les fuites de mémoire
            }
        };
    }, [previewURL]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await fetch('/api/new', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de l'envoi de la photo.`);
            }

            setTitle('');
            setDescription('');
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Réinitialise l'input de l'image
            }
            setSuccessMessage('Ajout réussi');
        } catch (err) {
            setError(`Erreur lors de l'ajout de la photo.`);
            console.log(err);
        } finally {
            setLoading(false); // Définir l'indicateur de chargement sur false
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    return (
        <div className='m-auto flex flex-col bg-red-400 text-white w-2/3 h-2/3 items-center justify-around'>
            <h2>Ajout de Photo</h2>
            <div className="m-4">
                {previewURL ? <Image src={previewURL} alt="Aperçu de l'image" width={300} height={300} /> : <DefaultIcon />}
            </div>
            {/* ajouter du border radius et effet */}
            {error && <p className='m-2 bg-red-600 p-4 text-white font-bold text-lg'>{error}</p>}
            {successMessage && <p className='m-2 bg-lime-500 p-4 text-white font-bold text-lg'>{successMessage}</p>}
            {loading && <p className='m-2 bg-slate-400 p-4 font-bold text-white'>Chargement...</p>}
            <form onSubmit={handleSubmit} className='flex flex-col m-3 text-gray-700' encType="multipart/form-data">
                <input
                    name='titre'
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    name='description'
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    ref={fileInputRef}
                    name='file'
                    type="file"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" className='text-white' disabled={loading}>Ajouter</button>
            </form>
        </div>
    );
}
