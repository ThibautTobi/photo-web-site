'use client'
// import { redirect } from "next/navigation";
// import { useState } from "react"

// export default function DispatchConnexion (){
//     const [connect, setConnect ] = useState(false);

//     return(
//         <div>
//             <div>
//                 {/* {connect ? '' 
//                 :
//                 redirect('/Connexion/login')
//                 // <div>
//                 //     <h2>connexion</h2>
//                 // </div>
//                 } */}

//                 <form>

//                 </form>
//             </div>
//         </div>
//     )
// }


// pages/login.js
// import { useState } from 'react';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   //////
//   const [loading, setLoading] = useState(false);


//   const handleConnect = async() =>{
//     setLoading(true)
//     try{
//         const response = await fetch('api/login'){
//             method : 'POST',
//             body: JSON.stringify({
//                 login : formData
//             })
//             if(response.ok){
//                 setFormData('')
//             }
//             else{
//                 console.log('error')
//             }
//         }

//     }
//     catch(error){
//         console.log(error)
//     }
//   }

//   //////
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const response = await fetch('/api/login', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(formData),
// //     });

// //     const data = await response.json();

// //     if (data.success) {
// //       // Redirect to dashboard or home page
// //     } else {
// //       // Show error message
// //     }
// //   };

//   return (
//     <form onSubmit={}>
//       <input
//         type="text"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }








import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleConnect = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ username: '', password: '' });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleConnect}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
