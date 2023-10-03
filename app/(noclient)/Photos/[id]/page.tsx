// interface PhotoPageProps {
//     params: {
//       params: {
//         id: string | number; // Utilisez string si l'id est une chaîne, sinon utilisez number
//       };
//     };
//   }
  
  export default function PhotoPage({ params: {params: {id : string} }  }) {

    return (
    <>
        <p>My Id Photo {params.id}</p>
    </>
    )
  }
  
// ou 

// import { useRouter } from 'next/router';

// export default function PhotoPage() {
//   const router = useRouter();
//   const { id } = router.query; // id sera de type string | string[] | undefined

//   if (typeof id === 'undefined' || Array.isArray(id)) return null; // Retourne null si id n'est pas disponible ou si c'est un tableau

//   // ajouter une redirection ou message si non trouvé

//   return (
//     <div>My Id Photo {id}</div>
//   )
// }

// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Link from 'next/link';
// import montagneNeige from 'public/montagne-neige.jpg';
// import montagneLune from 'public/montagne-lune-1.jpg';
// import montagneSoleil from 'public/montagne-soleil.jpg';

// // Vous pouvez déplacer dataImages dans un fichier séparé pour le réutiliser dans les deux pages.
// const dataImages = [
//   {
//       id:1,
//       name: "montagne-neige",
//       image:montagneNeige,
//       description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//        Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//         eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//        sint quia molestiae magni quam incidunt animi.`
//   },
//   {
//       id:2,
//       name: "montagne-lune",
//       image:montagneLune,
//       description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//        Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//         eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//        sint quia molestiae magni quam incidunt animi.`
//   },
//   {
//       id:3,
//       name: "montagne-soleil",
//       image:montagneSoleil,
//       description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//        Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
//         eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
//        sint quia molestiae magni quam incidunt animi.`
//   },
// ];

// export default function PhotoDetail() {
//     const router = useRouter();
//     const { id } = router.query;

//     // Trouver l'image correspondante à l'ID
//     const photo = dataImages.find(img => img.id === Number(id));

//     if (!photo) {
//         return <p>Photo non trouvée</p>;
//     }

//     return (
//         <div>
//             <h2>{photo.name}</h2>
//             <Image
//                 src={photo.image}
//                 alt={photo.name}
//                 width={500}
//                 height={500}
//             />
//             <p>{photo.description}</p>
//             <Link href="/photos">Retour à la liste des photos</Link>
//         </div>
//     );
// }
