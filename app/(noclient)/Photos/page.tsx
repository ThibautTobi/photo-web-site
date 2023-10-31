'use client'
import Image from "next/image";
import Link from "next/link";
// import dataImages from "./data/data-images/dataImages"
import montagneNeige from 'public/montagne-neige.jpg';
import montagneLune from 'public/montagne-lune-1.jpg';
import montagneSoleil from 'public/montagne-soleil.jpg';
//import { error } from "console";
import { Suspense } from "react";

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


/* */

import { useState } from 'react';
import useSWR from 'swr';
import { Iphotos } from "@/types/types";

// Fonction de récupération pour SWR
const recuperer = (url: string) => fetch(url).then((res) => res.json());

export default function Photos() {
    const [page, setPage] = useState(1);
    const { data: Data, error } = useSWR<Iphotos[]>('/api/photos', recuperer);
console.log(Data)
console.log(error)
console.log(page)
    if (error) return <div>Échec du chargement des photos</div>;
    if (!Data) return <div>Chargement...</div>;

    return (
        <>
            <h2>Photos</h2>
            {Data.map((data) => (
                <Suspense key={data._id} fallback={<p>chargement de la photo ...</p>}>
                    <div key={data._id}>
                        <Image
                            src={data.imagePath} // Utilisez cheminImage qui est le chemin de l'image stocké dans la base de données
                            alt={data.title}
                            width={250}
                            height={250}
                        />
                        <Link href={`/uploads/${data.imagePath}`}>{data.title}</Link>
                    </div>
                </Suspense>
            ))}
        </>
    );
}

/* */