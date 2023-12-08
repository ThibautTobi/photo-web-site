'use client'
import { useSession}  from "next-auth/react";
import { Subscriber } from '@/types/types';
import { useState, useEffect, ChangeEvent } from 'react';
import { redirect } from "next/navigation";

/******************************************************************* gestion Admin des newsletters création / envoi et selections de la liste complete ou par selection  */
export default function DashboardNewsletter() {

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletterContent, setNewsletterContent] = useState<string>('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set());
  const [editEmail, setEditEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  
    const { data: session, status } = useSession();

    if (status === 'loading') {
    return <p>Chargement...</p>;
    }

    if (!session) {
      console.log("Non connecté");
      redirect("/") 
      return null;
    } else if (session.user.role !== 'admin') {
    console.log("Connecté en tant que", session.user, session.expires);
    console.log('user role :', session.user.role);
    console.log('pas égale a admin')
    redirect("/")
    return null;
    }
    else {
        console.log('égale a admin')
        
    };

  // useEffect(() => {
    fetch('/api/subscribers')
      .then(response => response.json())
      .then(data => setSubscribers(data.subscribers))
      .catch(error => console.error('Erreur lors de la récupération des abonnés', error));
  // }, []);

  const handleSendNewsletter = () => {

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + yourAuthToken
      },
      body: JSON.stringify({
        content: newsletterContent,
        subscribers: Array.from(selectedSubscribers),
      }),
    })
      .then(response => {
        if (response.ok) {
          alert('Newsletter envoyée !');
        } else {
          console.error(`Échec de l'envoi de la newsletter`);
        }
      })
      .catch(error => console.error(`Erreur lors de l'envoi de la newsletter`, error));
  };

  const handleSubscriberSelection = (email: string, isSelected: boolean) => {
    const newSelection = new Set(selectedSubscribers);
    if (isSelected) {
      newSelection.add(email);
    } else {
      newSelection.delete(email);
    }
    setSelectedSubscribers(newSelection);
  };

  const handleDeleteSubscriber = (email: string) => {
    // TODO: Ajouter le jeton d'authentification à la requête
    fetch(`/api/subscribers/${email}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': 'Bearer ' + yourAuthToken,
      },
    })
      .then(response => {
        if (response.ok) {
          setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
          alert('Abonné supprimé !');
        } else {
          console.error(`Échec de la suppression de l'abonné`);
        }
      })
      .catch(error => console.error(`Erreur lors de la suppression de l'abonné`, error));
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedSubscribers(new Set(subscribers.map(s => s.email)));
    } else {
      setSelectedSubscribers(new Set());
    }
  };

  const handleEditSubscriber = (email: string) => {
    setIsEditing(email);
    setEditEmail(email);
  };

  const handleUpdateSubscriber = (oldEmail: string) => {

    fetch(`/api/subscribers/${oldEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + yourAuthToken
      },
      body: JSON.stringify({ newEmail: editEmail }),
    })
      .then(response => {
        if (response.ok) {
          setSubscribers(subscribers.map(subscriber => {
            if (subscriber.email === oldEmail) {
              return { ...subscriber, email: editEmail };
            }
            return subscriber;
          }));
          setIsEditing(null);
          alert('Abonné mis à jour !');
        } else {
          console.error(`Échec de la mise à jour de l'abonné`);
        }
      })
      .catch(error => console.error(`Erreur lors de la mise à jour de l'abonné`, error));
  };

  return (
    <div>
      <h1>Tableau de bord administrateur</h1>
      <textarea
        value={newsletterContent}
        onChange={(e) => setNewsletterContent(e.target.value)}
        placeholder="Composez votre newsletter ici..."
      />
      <button onClick={handleSendNewsletter}>Envoyer la Newsletter</button>
      <div>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        Sélectionner tout
      </div>
      <ul className='border-solid border-4'>
        {subscribers.map(subscriber => (
          <li key={subscriber.email}>
            <input
              type="checkbox"
              checked={selectedSubscribers.has(subscriber.email)}
              onChange={(e) => handleSubscriberSelection(subscriber.email, e.target.checked)}
            />
            {isEditing === subscriber.email ? (
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            ) : (
              <span>{subscriber.email}</span>
            )}
            {isEditing === subscriber.email ? (
              <button onClick={() => handleUpdateSubscriber(subscriber.email)}>Mettre à jour</button>
            ) : (
              <button onClick={() => handleEditSubscriber(subscriber.email)}>Modifier</button>
            )}
            <button onClick={() => handleDeleteSubscriber(subscriber.email)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



/*
///////////////////////////////////////////// modifie mail


// pages/api/subscribers/[email].ts
import type { NextApiRequest, NextApiResponse } from 'next';
// Import your database utility functions (not shown here)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authentication and authorization checks go here

  const { email } = req.query;

  if (req.method === 'PUT') {
    try {
      const { newEmail } = req.body;
      // Replace with your database update logic
      // await updateSubscriberEmail(email, newEmail);
      res.status(200).json({ message: 'Subscriber updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update subscriber', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete logic goes here
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};



*/
/*
//////////////////////////////////////////// delete email

// pages/api/subscribers/[email].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Assuming you're using next-auth
// Import your database utility functions (not shown here)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { email } = req.query;

  if (req.method === 'DELETE') {
    try {
      // Replace with your database deletion logic
      // await deleteSubscriberByEmail(email);
      res.status(200).json({ message: 'Subscriber deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete subscriber', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

*/