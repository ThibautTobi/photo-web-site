'use client'

/************************************************************page site portfolio photos cliquer  recupérétion par id   */
// import { useRouter } from 'next/router';
// import Image from 'next/image';
//  import { useEffect, useState } from 'react';
// import { Iphotos } from '@/types/types';

// import Image from "next/image";

// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const PhotoPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
// console.log(id)

//   const { data: photo, error } = useSWR(id ? `/api/photos/${id}` : null, fetcher);

//   if (error) return <div>Erreur lors du chargement</div>;
//   if (!photo) return <div>Chargement...</div>;

//   return <Image src={photo.imageUrl} alt={photo.title} />;
// };

// export default PhotoPage;


//  export default function PhotoDetail({ params }: { params: { id: String } }) {
//     console.log(params)
//    console.log(params.id)
//   const [photo, setPhoto] = useState<Iphotos | null>(null);
// console.log(photo)
//   useEffect(() => {
//     async function fetchPhoto() {
//       try {
//         const response = await fetch(`/api/photos/${params.id}`);
//         if (!response.ok) {
//           throw new Error('Photo not found');
//         }
//         const data = await response.json();
//         setPhoto(data);
//       } catch (error) {
//         console.error('Error fetching photo:', error);
//       }
//     }

//     fetchPhoto();
//   }, [params.id]);

//   if (!photo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {params.id}
//       {/* <h1>{photo.title}</h1>
//       <Image src={photo.imagePath} alt={photo.title} /> */}
//     </div>
//   );
// }










import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connectToDB } from '@/utils/database';
import Image from 'next/image';
import Photo from '@/models/photos';
import { Iphotos } from '@/types/types';
import { string } from 'yup';

export default function PhotoPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);

console.log(photo)

  useEffect(() => {
    async function fetchPhoto() {
      if (!router.isReady) return;
      
    //   const id = router.query.id[0];
    const id = router.query.id;
      await connectToDB();
      const photoData = await Photo.findOne({ _id: id });

      setPhoto(photoData);
    }

    fetchPhoto();
  }, [router.isReady, router.query.id]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>{photo}</h1>
        {/* <Image src={photo.imageUrl} alt={photo.title} />
        <p>{photo.description}</p> */}
        {/* autres détails de la photo */}
  </div>
  );
}






// /****************** gestion donnés sans requette fetch base de donnée static *********************/
// import { dataImages } from '@/data/data-images';
// //import Image from 'next/image';

// //génére la data de l'id 1, 2 et 3 a la construction le pre rendu
// export async function generateStaticParams() {

//   return [{ id: '1' }, { id: '2' },{ id: '3' }];
// }

// // récupération dans les props des paramettres dynamique de l'url exemple ici le "2" .../photos/2
// export default function Page({ params }: { params: { id: string } }) {

//   console.log(params.id)
//   const currentData = dataImages.find(item => item.id === Number(params.id));

//   // gestion si l'Id n'est pas dans les dataImages
//   if (!currentData) {
//     // Si les données pour l'ID donné ne sont pas trouvées, retournez un message d'erreur.
//     return <p>Données non trouvées pour cette ID {params.id}</p>;
//   }

//   // console.log(currentData.image)
//   return (
//     <div className="grid grid-cols-6 gap-x-6 gap-y-3">
//       <div className="col-span-full space-y-3 lg:col-span-4">
//         <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
//           {currentData.name}
//         </h1>
//         <p className="line-clamp-3 font-medium text-gray-500">{currentData.description}</p>
//       </div>
//       <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
//         <Image 
//           src={currentData.image}
//           alt={currentData.name}
//           width={200}
//           height={200}
//         />
//       </div>
//     </div>
//   );
// }
