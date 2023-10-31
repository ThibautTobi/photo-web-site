// middleware/auth.js
// export const authenticate = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token || token !== process.env.SECRET_TOKEN) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     next();
// };

//exemples utilisation 

// import { authenticate } from './middleware/auth';

// export default async (req, res) => {
//     if (req.method === 'POST') {
//         authenticate(req, res, async () => {
//             // ... le reste de votre code
//         });
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// };
