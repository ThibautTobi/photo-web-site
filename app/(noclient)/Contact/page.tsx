import Head from "next/head";
import FormulaireContact from "@/components/Formulaire/FormContact";

export default function Contact () {

    return(
        <>
            <Head>
                <script src="https://www.google.com/recaptcha/api.js" async defer ></script>
            </Head>
            <h2>Contact</h2>
            <FormulaireContact />
            
        </>
    )
}