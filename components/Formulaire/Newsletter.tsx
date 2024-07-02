'use client'
import { useState,FormEvent } from "react";
import RgpdModal from "@/components/RGPD/rgpd";

/*

Consentement des Utilisateurs : Vous devez obtenir un consentement explicite des utilisateurs pour leur envoyer des newsletters.
Cela peut être fait via une case à cocher dans le formulaire d'inscription qui indique clairement 
qu'ils acceptent de recevoir des e-mails de votre part.

Conformité RGPD : Si vous opérez ou envoyez des e-mails à des personnes dans l'Union européenne, vous devez
 vous conformer au Règlement Général sur la Protection des Données (RGPD). Cela signifie, entre autres,
  que vous devez être transparent sur la façon dont vous utilisez
 les données des utilisateurs et leur permettre d'accéder à leurs données ou de les supprimer sur demande.

*/
// export default function NewsletterSignup() {
//     const [email, setEmail] = useState('');
  
//    async function handleSubmit (event: FormEvent) {
//       event.preventDefault();
//       // Ici, vous pouvez appeler une API pour enregistrer l'email
//       await fetch('/api/AddNewsLetter', { method: 'POST', body: JSON.stringify({ email }) });
//       console.log('Inscription à la newsletter:', email);
//       // Reset email field
//       setEmail('');
//     };
  
//     return (
//       <form onSubmit={handleSubmit} className="m-4 p-4 bg-red-400 rounded-xl text-slate-700">
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Entrez votre email"
//           className="rounded-xl p-2 text-slate-700"//focus:border-red-400
//           required
//         />
//         <button type="submit" className="m-3 p-2 text-white bg-red-200 rounded-md shadow-md">Sinscrire</button>
//       </form>
//     );
//   }
  


/************************************* ajoute de message erreur et reussite */

// export default function NewsletterSignup() {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [isError, setIsError] = useState(false);
//     const [isRgpdChecked, setIsRgpdChecked] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     async function handleSubmit(event: FormEvent) {
//         event.preventDefault();
//         setMessage('');
//         setIsError(false);

//         try {
//             const response = await fetch('/api/AddNewsLetter', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.ok) {
//                 setMessage('Inscription réussie. Merci de vous être abonné à notre newsletter !');
//                 setEmail('');
//             } else {
//                 throw new Error('Une erreur est survenue lors de l\'inscription.');
//             }
//         } catch (error) {
//             setIsError(true);
//             setMessage('Erreur lors de l\'inscription à la newsletter.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="m-4 p-6 bg-red-400 rounded-xl text-slate-700 flex flex-col items-center">
//             <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Entrez votre email"
//                 className="rounded-xl p-2 text-slate-700"
//                 required
//             />
//             <div className="flex items-center">
//                 <input
//                     type="checkbox"
//                     checked={isRgpdChecked}
//                     className="m-4"
//                     onChange={(e) => setIsRgpdChecked(e.target.checked)}
//                 />
//                 <span className="text-white">
//                     J accepte les <button type="button" className="text-black text-lg" onClick={() => setShowModal(true)}> conditions RGPD</button>.
//                 </span>
//             </div>
//             <button type="submit" className="m-3 p-2 text-white bg-red-200 rounded-md shadow-md">inscription</button>
//             {message && (
//               <div className={`mt-3 text-sm m-3 p-2 bg-red-200 rounded-md shadow-md ${isError ? 'text-red-600' : 'text-green-600'}`}>
//                     {message}
//               </div>
//             )}
//             <RgpdModal open={showModal} handleClose={() => setShowModal(false)} />
//         </form>
//     );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// ajouter validateur input (voir pour créé un middleware et inserer avec yup )

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRgpdChecked, setIsRgpdChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Gère la soumission du formulaire
  async function handleSubmit(event: FormEvent) {
      event.preventDefault();
      setMessage('');
      setIsError(false);

      try {
          // Envoi de la requête à l'API
          const response = await fetch('/api/AddNewsLetter', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
          });

          // Gestion de la réponse
          if (response.ok) {
              setMessage('Inscription réussie. Merci de vous être abonné à notre newsletter !');
              setEmail('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue lors de l\'inscription.');
            }
      } catch (error) {
          setIsError(true);
          setMessage('Erreur lors de l\'inscription à la newsletter.');
      }
      
  };

  return (
      <form onSubmit={handleSubmit} className="m-4 p-6 bg-red-400 rounded-xl text-slate-700 flex flex-col items-center">
          <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              className="rounded-xl p-2 text-slate-700"
              required
          />
          <div className="flex items-center">
              <input
                  type="checkbox"
                  checked={isRgpdChecked}
                  className="m-4"
                  onChange={(e) => setIsRgpdChecked(e.target.checked)}
              />
              <span className="text-white">
                  J accepte les <button type="button" className="text-black text-lg" onClick={() => setShowModal(true)}>conditions RGPD</button>.
              </span>
          </div>
          {/* Bouton désactivé si l'email est vide ou si la case RGPD n'est pas cochée */}
          <button type="submit" disabled={!email || !isRgpdChecked} className="m-3 p-2 text-white bg-red-600 rounded-md shadow-md">Inscription</button>
          {message && (
              <div className={`mt-3 text-sm m-3 p-2 bg-red-200 rounded-md shadow-md ${isError ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
              </div>
          )}
          <RgpdModal open={showModal} handleClose={() => setShowModal(false)} />
      </form>
  );
}
