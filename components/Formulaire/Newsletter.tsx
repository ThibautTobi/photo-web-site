'use client'
import { useState,FormEvent } from "react";

/*

Consentement des Utilisateurs : Vous devez obtenir un consentement explicite des utilisateurs pour leur envoyer des newsletters.
Cela peut être fait via une case à cocher dans le formulaire d'inscription qui indique clairement 
qu'ils acceptent de recevoir des e-mails de votre part.

Conformité RGPD : Si vous opérez ou envoyez des e-mails à des personnes dans l'Union européenne, vous devez
 vous conformer au Règlement Général sur la Protection des Données (RGPD). Cela signifie, entre autres,
  que vous devez être transparent sur la façon dont vous utilisez
 les données des utilisateurs et leur permettre d'accéder à leurs données ou de les supprimer sur demande.

*/
export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
  
   async function handleSubmit (event: FormEvent) {
      event.preventDefault();
      // Ici, vous pouvez appeler une API pour enregistrer l'email
      await fetch('/api/AddNewsLetter', { method: 'POST', body: JSON.stringify({ email }) });
      console.log('Inscription à la newsletter:', email);
      // Reset email field
      setEmail('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="m-4 p-4 bg-slate-400">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
        <button type="submit" className="m-3 text-white bg-red-400">Sinscrire</button>
      </form>
    );
  }
  