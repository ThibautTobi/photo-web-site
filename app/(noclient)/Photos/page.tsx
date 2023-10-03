import Image from "next/image";
import Link from "next/link";
// import dataImages from "./data/data-images/dataImages"
import montagneNeige from 'public/montagne-neige.jpg';
import montagneLune from 'public/montagne-lune-1.jpg';
import montagneSoleil from 'public/montagne-soleil.jpg';
import { error } from "console";
import { Suspense } from "react";

export default function Photos () {

    const dataImages = [
        {
            id:1,
            name: "montagne-neige",
            image:montagneNeige,
            description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
             Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
              eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
             sint quia molestiae magni quam incidunt animi.`
        },
        {
            id:2,
            name: "montagne-lune",
            image:montagneLune,
            description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
             Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
              eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
             sint quia molestiae magni quam incidunt animi.`
        },
        {
            id:3,
            name: "montagne-soleil",
            image:montagneSoleil,
            description : `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
             Unde natus doloremque molestias omnis officiis explicabo ratione blanditiis exercitationem itaque est perferendis ex,
              eius deserunt? A consectetur perferendis praesentium obcaecati eius nesciunt autem, officia aut suscipit asperiores earum id,
             sint quia molestiae magni quam incidunt animi.`
        },
    ];
 // voir si utiliser useRef peut étre plus pertinant que 2 fois  key item.id
    return(
        <>
            <h2>Photos</h2>
            {dataImages.map((item)=>(
                <Suspense key={item.id} fallback={<p>chargement de la photo ...</p>}>
                    <div key={item.id}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={250}
                            height={250}
                            />
                        <Link href={`/photos/${item.id}`}>{item.name}</Link>
                    </div>
                </Suspense>

            )
            )}
        </>
    )
}