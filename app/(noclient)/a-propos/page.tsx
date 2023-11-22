import Link from "next/link"

export default function Propos () {

    return(
        <>
            <h2>A propos de moi </h2>

            <div className="container mx-auto text-center">
                <section className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
                <h1 className="text-white text-4xl">Capturer des moments qui durent éternellement</h1>
                </section>
                <section className="py-8">
                <h2 className="text-2xl">À propos de moi</h2>
                <p>Je suis un photographe professionnel spécialisé dans les mariages, les portraits et les événements. Avec plus de 10 ans d expérience, je capture l essence de chaque instant.</p>
                <Link href="/portfolio">
                    <a className="bg-black text-white py-2 px-4 inline-block mt-4">Voir le Portfolio</a>
                </Link>
                </section>
                <section className="py-8">
                <h2 className="text-2xl">Services</h2>
                <p>Découvrez la gamme de services que je propose, des séances photo individuelles aux grands événements.</p>
                <Link href="/services">
                    <a className="bg-black text-white py-2 px-4 inline-block mt-4">En savoir plus</a>
                </Link>
                </section>
            </div>
        </>
    )
}