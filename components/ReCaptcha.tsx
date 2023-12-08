import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/********************************** utilisation de reCAPTCHA v3 sans interaction de l'utilisateur */
type ReCaptchaComponentProps = {
  onChange: (token: string | null) => void;
};

export default function ReCaptchaComponent({ onChange }: ReCaptchaComponentProps) {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const siteKey = process.env.RECAPTCHA_KEY ?? 'default-site-key';


  useEffect(() => {
    const executeCaptcha = async () => {
      if (reCaptchaRef.current) {
        const token = await reCaptchaRef.current.executeAsync();
        onChange(token);
      }
    };
  
    executeCaptcha();
  }, [onChange]);
  

  // Vérifier si la clé de site est définie
  if (!process.env.RECAPTCHA_KEY) {
    return <div>Clé de site reCAPTCHA manquante</div>;
  }

  return (
    <ReCAPTCHA
      ref={reCaptchaRef}
      size="invisible"
      sitekey={siteKey}
      onChange={onChange}
    />
  );
};


/*

Ajouter la surveillance et générer des jetons (frontend)
L'exemple ci-dessous affiche automatiquement le widget reCAPTCHA Enterprise sur un élément HTML. En savoir plus sur l'affichage explicite des widgets 

Chargez l'API JavaScript dans l'élément head de votre page Web.
Sur l'élément où le widget s'affiche :
Ajoutez la classe g-recaptcha.
Ajoutez l'attribut data-sitekey et définissez-le sur votre clé reCAPTCHA.
Ajoutez l'attribut data-action et attribuez-lui un nom d'action. En savoir plus sur les actions 

<html>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
    <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
  </head>
  <body>
    <form action="" method="POST">
      <div class="g-recaptcha" data-sitekey="6LdRvSUpAAAAAGS1ssghAsl8IahU2g4HlQaLLwL-" data-action="LOGIN"></div>
      <br/>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>


const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');


  * Créez une évaluation pour analyser le risque d'une action dans l'interface utilisateur.
  *
  * projectID: L'ID de votre projet Google Cloud.
  * recaptchaSiteKey: La clé reCAPTCHA associée au site ou à l'application
  * token: Jeton généré auprès du client.
  * recaptchaAction: Nom d'action correspondant au jeton.
  
async function createAssessment({
  // À FAIRE : remplacer le jeton et les variables d'action reCAPTCHA avant d'exécuter l'exemple.
  projectID = "agence-photograp-1701701072447",
  recaptchaKey = "6LdRvSUpAAAAAGS1ssghAsl8IahU2g4HlQaLLwL-",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  // Créez le client reCAPTCHA.
  // À FAIRE : mettre en cache le code de génération du client (recommandé) ou appeler client.close() avant de quitter la méthode.
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Créez la demande d'évaluation.
  const request = ({
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  });

  const [ response ] = await client.createAssessment(request);

  // Vérifiez si le jeton est valide.
  if (!response.tokenProperties.valid) {
    console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  // Vérifiez si l'action attendue a été exécutée.
  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // Obtenez le score de risques et le ou les motifs.
    // Pour savoir comment interpréter l'évaluation, consultez les pages suivantes :
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });

    return response.riskAnalysis.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}

*/