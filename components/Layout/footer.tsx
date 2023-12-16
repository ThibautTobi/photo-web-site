import NewsletterSignup from "../Formulaire/Newsletter";

export default function Footer () {

    return (
        <footer className="w-100% h-auto bg-rose-300 text-white flex flex-col justify-around font-bold text-lg p-6">
            <h2 className="m-4">pied de page ...</h2>
            <NewsletterSignup /> 
            <p>© 2023 Agence de Photographie. Tous droits réservés.</p>
        </footer>
    )
}