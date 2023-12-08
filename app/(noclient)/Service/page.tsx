
export default function Service () {

    return(
        <>
            <h2>Service</h2>
            <div className="container mx-auto p-8">
                {/* <h1 className="text-3xl text-center mb-8">Tarifs</h1> */}
                <div className="flex flex-wrap justify-center">
                <div className="border border-gray-300 p-6 m-2 text-center">
                    <h2 className="text-xl mb-4">Forfait Mariage</h2>
                    <p className="text-2xl font-bold mb-4">2000€</p>
                    <p>Couverture complète de la journée, 200 photos retouchées, galerie en ligne et un album imprimé.</p>
                </div>
                <div className="border border-gray-300 p-6 m-2 text-center">
                    <h2 className="text-xl mb-4">Séance Portrait</h2>
                    <p className="text-2xl font-bold mb-4">300€</p>
                    <p>Séance d une heure, 30 photos retouchées, galerie en ligne.</p>
                </div>
                <div className="border border-gray-300 p-6 m-2 text-center">
                    <h2 className="text-xl mb-4">Couverture d Événement</h2>
                    <p className="text-2xl font-bold mb-4">500€</p>
                    <p>Couverture de l événement de 3 heures, 100 photos retouchées, galerie en ligne.</p>
                </div>
                </div>
            </div>
        </>
    )
}