import NewsletterSignup from "../Formulaire/Newsletter";

export default function Footer () {

    return (
        <footer className="w-100% h-auto bg-rose-300 text-white flex flex-row justify-around font-bold text-lg p-6">
            <h2 className="m-4">pied de page ...</h2>
            <NewsletterSignup /> 
        </footer>
    )
}