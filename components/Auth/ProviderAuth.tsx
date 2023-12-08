// import { auth } from "auth"

import { Session } from "next-auth"
import { SessionProvider, useSession } from "next-auth/react"
// import { Children } from "react"

// import { getSession } from "next-auth/react"
// import { useRouter } from "next/router"
//import { useEffect } from "react"

// export default async function ProviderAuth({children} : {children : React.ReactNode}) {
//   //const session = await auth()
//   // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
//   // filter out sensitive data before passing to client.

// const session = await getSession();

// //   const[session,setSession] = usestate();

//   console.log('Data session',session)
// //   if (session?.user) {
// //     session.user = {
// //       name: session.user.name,
// //       email: session.user.email,
// //       image: session.user.image,
// //     }
// //   }
// if(session){
//     console.log('il y a une session ')
// }else{
//     console.log(`il n'y a pas de session`)
// }

//   return (
//     <SessionProvider session={session}>
//             {children}
//     </SessionProvider>
//   )
// }



export default async function ProviderAuth({children,session} : {children : React.ReactNode ,session :Session }) {

    // const { data: session } = useSession();


  return (
    <SessionProvider session={session}>
            {children}
    </SessionProvider>
  )
}