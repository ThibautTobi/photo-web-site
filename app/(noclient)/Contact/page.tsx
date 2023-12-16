import Head from "next/head";
import FormulaireContact from "@/components/Formulaire/FormContact";

export default function Contact () {

    return(
        <>
            <Head>
                <script src="https://www.google.com/recaptcha/api.js" async defer ></script>
            </Head>
            <div className="p-8 bg-transparent border-8 rounded-md shadow-lg ">
                <h2>Vous pouvez Nous Contacter ici </h2>
                <FormulaireContact />
            </div>
        </>
    )
}