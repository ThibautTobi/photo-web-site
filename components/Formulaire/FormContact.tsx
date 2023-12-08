'use client'

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl,RadioGroup, Radio } from '@mui/material';
import ReCaptchaComponent from '@/components/ReCaptcha';

interface FormData {
  civilite: string;
  prenom: string;
  nom: string;
  email: string;
  objet: string;
  message: string;
}



// Schéma de validation
const Formschema = yup.object({
  civilite: yup.string().required('Veuillez sélectionner une civilité'),
  prenom: yup.string().required('Le prénom est requis'),
  nom: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required(`L'email est requis`),
  objet: yup.string().required('L\'objet est requis'),
  message: yup.string().required('Le message ne peut pas être vide'),
}).required();

export default function FormulaireContact (){
  const [recaptchaToken, setRecaptchaToken] = useState('');
console.log('recaptcha :', recaptchaToken)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Formschema)
  });

async function onSubmit (data : FormData) {
    console.log(data);
    // Ajoutez le token reCAPTCHA aux données du formulaire
    const formDataWithCaptcha = { ...data, recaptchaToken };
    console.log("Form Data with reCAPTCHA Token:", formDataWithCaptcha);
    // Gestion de l'envoi des données connecter a l'api 
    try {
      // Envoi des données du formulaire à l'API
      const response = await fetch('/api/PostFormulaireContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithCaptcha),
      });
  
      // Traitement de la réponse
      if (response.ok) {
        // La requête a réussi
        const responseData = await response.json();
        console.log('Réponse :', responseData);
        // Vous pouvez ici gérer les actions après le succès, par exemple :
        // Afficher un message de succès, réinitialiser le formulaire, etc.
      } else {
        // La requête a échoué
        console.error('Erreur lors de l\'envoi du formulaire:', response.status);
        // Gérer l'affichage d'une erreur à l'utilisateur
      }
    } catch (error) {
      // Erreur lors de l'envoi de la requête
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      // Gérer l'affichage d'une erreur à l'utilisateur
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    console.log("Token received in Form:", token);
    setRecaptchaToken(token ?? ''); // Utilisez une chaîne vide si le token est null
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: '500px', margin: 'auto' }}>
      {/* <FormControlLabel
        control={<Controller name="civilite" control={control} render={({ field }) => <Checkbox {...field} />} />}
        label="Mme."
      />
      <FormControlLabel
        control={<Controller name="civilite" control={control} render={({ field }) => <Checkbox {...field} />} />}
        label="Mr."
      /> */}

      <Controller
        name="civilite"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel value="Mme." control={<Radio />} label="Mme." />
            <FormControlLabel value="Mlle." control={<Radio />} label="Mlle." />
            <FormControlLabel value="Mr." control={<Radio />} label="Mr." />
          </RadioGroup>
            )}
      />
      <Controller
        name="prenom"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Prénom" variant="outlined" error={!!errors.prenom} helperText={errors.prenom?.message} fullWidth margin="normal" />
        )}
      />

      <Controller
        name="nom"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Nom" variant="outlined" error={!!errors.nom} helperText={errors.nom?.message} fullWidth margin="normal" />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Email" variant="outlined" error={!!errors.email} helperText={errors.email?.message} fullWidth margin="normal" />
        )}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="objet-label">Objet</InputLabel>
        <Controller
          name="objet"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} labelId="objet-label" label="Objet">
              <MenuItem value="proposition1">Proposition 1</MenuItem>
              <MenuItem value="proposition2">Proposition 2</MenuItem>
              <MenuItem value="proposition3">Proposition 3</MenuItem>
              <MenuItem value="proposition4">Proposition 4</MenuItem>
              <MenuItem value="proposition5">Proposition 5</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Message" variant="outlined" error={!!errors.message} helperText={errors.message?.message} multiline rows={4} fullWidth margin="normal" />
        )}
      />
      <ReCaptchaComponent onChange={handleRecaptchaChange} />
      {/* base recaptcha v3 */}
      {/* <div className="g-recaptcha" data-sitekey={process.env.RECAPTCHA_KEY} data-action="LOGIN"></div> */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Envoyer
      </Button>
    </form>
  );
};