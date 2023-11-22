'use client'
import Image from "next/image";
import Link from "next/link";
import useSWR from 'swr';
import { DataPhotos } from "@/types/types";
import { Suspense,useEffect,useState } from "react";

/************************************************************** page site portfolio photos    */
/************************************************** fonctionne gestion des images cotés back end */

// Fonction pour récupérer les données depuis l'API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Photos() {

  // Gestion de la page actuelle
  const [page, setPage] = useState<number>(1);

  // Mettre à jour l'état en fonction de l'URL, uniquement côté client
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPage(parseInt(params.get('page') || '1', 10));
  }, []); // Dépendances vides pour s'exécuter une seule fois après le premier rendu

  // Mettre à jour l'URL lorsque la page change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
  }, [page]); // Dépend de 'page' pour se déclencher à chaque changement de page

  // Utilisation de SWR pour récupérer les données
  const { data: Data, error } = useSWR<DataPhotos>(`/api/photos?page=${page}`, fetcher);

  if (error) return <div>Échec du chargement des photos</div>;
  if (!Data) return <div>Chargement...</div>;

  // Destructuration pour obtenir photos et totalPhotos depuis Data
  const { photos, totalPages, totalPhotos } = Data;

  // Gestion du changement de page
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <h2>Photos</h2>
      <p className="m-4 p-4 bg-red-400 text-white font-bold">retrouver une présentation de mon travaille avec {totalPhotos} photos </p>
      <div>
        {photos.map((photo) => (
          <Suspense key={photo._id} fallback={<p>Chargement de la photo...</p>}>
            <Link key={photo._id} href={`/photos/${photo._id}`}>
              <div className="photo-container">
                <h3>{photo.title}</h3>
                <Image src={photo.imagePath} alt={photo.title} width={250} height={250} />
              </div>
            </Link>
          </Suspense>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(Math.max(page - 1, 1))} className="m-3">Précédent</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}className="m-3">
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(Math.min(page + 1, totalPages))} className="m-3">Suivant</button>
      </div>
    </>
  );
}


/////////////////////////////////////////// avec donnés static  sans back-end

// import montagneNeige from 'public/montagne-neige.jpg';
// import montagneLune from 'public/montagne-lune-1.jpg';
// import montagneSoleil from 'public/montagne-soleil.jpg';

// import dataImages from "./data/data-images/dataImages"

// export default function Photos () {

//     const dataImages = [
//         {
//             id:1,
//             name: "montagne-neige",
//             image:montagneNeige,
//             description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//              Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//               eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//              sint quia molestiae magni quam incidunt animi.`
//         },
//         {
//             id:2,
//             name: "montagne-lune",
//             image:montagneLune,
//             description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//              Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//               eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//              sint quia molestiae magni quam incidunt animi.`
//         },
//         {
//             id:3,
//             name: "montagne-soleil",
//             image:montagneSoleil,
//             description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//              Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//               eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//              sint quia molestiae magni quam incidunt animi.`
//         },
//     ];
//  // voir si utiliser useRef peut étre plus pertinant que 2 fois  key item.id
//     return(
//         <>
//             <h2>Photos</h2>
//             {dataImages.map((item)=>(
//                 <Suspense key={item.id} fallback={<p>chargement de la photo ...</p>}>
//                     <div key={item.id}>
//                         <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={250}
//                             height={250}
//                             />
//                         <Link href={`/Photos/${item.id}`}>{item.name}</Link>
//                     </div>
//                 </Suspense>

//             )
//             )}
//         </>
//     )
// }



//////////////////////////////////////////////// sa fonctionne gestion cotés client des pages

// // Fonction pour récupérer les données depuis l'API
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function Photos() {
//   // Utilisez URLSearchParams pour gérer la page actuelle dans l'URL
//   const [page, setPage] = useState<number>(() => {
//     const params = new URLSearchParams(window.location.search);
//     return parseInt(params.get('page') || '1', 10);
//   });

//   // Mettre à jour l'URL lorsque la page change
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     params.set('page', page.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${params}`);
//   }, [page]);

//   // Utilisation de SWR pour récupérer les données
//   const { data: Data, error } = useSWR<DataPhotos>(`/api/photos?page=${page}`, fetcher);

//   if (error) return <div>Échec du chargement des photos</div>;
//   if (!Data) return <div>Chargement...</div>;

//   // Destructuration pour obtenir photos et totalPhotos depuis Data
//   const { photos, totalPhotos } = Data;

//   // Calcul du nombre total de pages
//   const itemsPerPage = 3;
//   const totalPages = Math.ceil(totalPhotos / itemsPerPage);

//   // Calcul des photos à afficher pour la page actuelle
//   const startIndex = (page - 1) * itemsPerPage;
//   const selectedPhotos = photos.slice(startIndex, startIndex + itemsPerPage);

//   // Gestion du changement de page
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   return (
//     <>
//       <h2>Photos</h2>
//       <div>
//         {selectedPhotos.map((photo) => (
//           <Suspense key={photo._id} fallback={<p>Chargement de la photo...</p>}>
//             <div className="photo-container">
//               <h3>{photo.title}</h3>
//               <Image src={photo.imagePath} alt={photo.title} width={250} height={250} />
//             </div>
//           </Suspense>
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={() => handlePageChange(Math.max(page - 1, 1))}>Précédent</button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index} onClick={() => handlePageChange(index + 1)}>
//             {index + 1}
//           </button>
//         ))}
//         <button onClick={() => handlePageChange(Math.min(page + 1, totalPages))}>Suivant</button>
//       </div>
//     </>
//   );
// }