// import { useState } from 'react';


// // modifier email en name 



// const RegisterPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event : Event) => {
//     event.preventDefault();
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       // Handle successful registration
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterPage;
