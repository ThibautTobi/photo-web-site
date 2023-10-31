// import { dataImages } from '@/data/data-images';

// interface id{
//   id:number;
// }

// interface imageData {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
// }

// export async function PhotoPage({ params } : {params: { id: number} }) {
//         // recupére bien le chiffre dans l'url
//     console.log(params)

//     // interface id{
//     //   id:number;
//     // }

//     // interface imageData {
//     //   imageData : string;
//     // }

//     // interface imageData {
//     //   id: string;
//     //   name: string;
//     //   image: string;
//     //   description: string;
//     // }

//     const id  = params.id;

//     // if(!Id){
//     //   return <p>Pas trouver </p>
//     // }

//     const imageData = dataImages.find(data => data.id = id);

//     console.log(imageData);
//   //   if (!image) {
//   //     return <p>Photo non trouvée</p>;
//   // }

//     // const imageId = await fetch();

//     return (
//     <>
//         {/* <p>My Id Photo {imageData.name}</p> */}
//         {/* <p>name {imageData.name}</p> */}
//         {/* <Image 
//             src={}
//             alt={}
            
            
//             /> */}
//         {/* <p>description {}</p> */}
//     </>
//     )
//   }
  







  // import { GetServerSideProps } from 'next';

  // interface Props {
  //   data: string;
  // }
  
  // export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  //   const { id } = context.query;
  //   const res = await fetch(`https://example.com/data/${id}`);
  //   const json = await res.json();
  
  //   return {
  //     props: {
  //       data: json,
  //     },
  //   };
  // };
  
  // export default function MyPage({ data }: Props) {
  //   return <div>{data}</div>;
  // }
  










// ou 

// import { useRouter ,useSearchParams } from 'next/navigation';
// import { dataImages } from '@/data/data-images';
// import Image from 'next/image';

// type ImageType = {
//     id: number;
//     name: string;
//     image: string;
//     description: string;
// };

// export default function PhotoDetail() {
//     const router = useRouter();
//     const { id } = useSearchParams();

//     const image: ImageType | undefined = dataImages.find(img => img.id === parseInt(id as string));

//     if (!image) {
//         return <p>Photo non trouvée</p>;
//     }

//     return (
//         <>
//             <h2>{image.name}</h2>
//             <Image 
//               src={image.image} 
//               alt={image.name} 
//               width={250}
//               height={250}
//             />
//             <p>{image.description}</p>
//         </>
//     );
// }

// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { dataImages } from '@/data/data-images';

// interface ImageData {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
// }

// export default function PhotoPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   if (!id) {
//     return null;
//   }

//   const imageId = parseInt(id as string);
//   const imageData = dataImages.find((data: ImageData) => data.id === imageId);

//   if (!imageData) {
//     return <p>Photo non trouvée</p>;
//   }

//   return (
//     <>
//       <h2>{imageData.name}</h2>
//       <Image 
//         src={imageData.image} 
//         alt={imageData.name} 
//         width={250}
//         height={250}
//       />
//       <p>{imageData.description}</p>
//     </>
//   );
// }



//ou


/****************** gestion donnés sans requette fetch base de donnée *********************/
import { dataImages } from '@/data/data-images';
import Image from 'next/image';

// génére la data de l'id 1, 2 et 3 a la construction le pre rendu
export async function generateStaticParams() {

  return [{ id: '1' }, { id: '2' },{ id: '3' }];
}

// récupération dans les props des paramettres dynamique de l'url exemple ici le "2" .../photos/2
export default function Page({ params }: { params: { id: string } }) {
  const currentData = dataImages.find(item => item.id === Number(params.id));

  // gestion si l'Id n'est pas dans les dataImages
  if (!currentData) {
    // Si les données pour l'ID donné ne sont pas trouvées, retournez un message d'erreur.
    return <p>Données non trouvées pour cette ID {params.id}</p>;
  }

  // console.log(currentData.image)
  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {currentData.name}
        </h1>
        <p className="line-clamp-3 font-medium text-gray-500">{currentData.description}</p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <Image 
          src={currentData.image}
          alt={currentData.name}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}