import { getSession } from 'next-auth/react';

export async function verifyLoggedIn(req, res, next) {
  const session = await getSession({ req });
  if (session) {
    next(); // Continuer si l'utilisateur est connecté
  } else {
    res.status(401).json({ message: 'Veuillez vous connecter' });
  }
}
