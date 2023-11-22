import './globals.css';
//import { GetServerSidePropsContext } from 'next';
import type { Metadata } from 'next';
import Header from '@/components/Layout/header';
import Footer from '@/components/Layout/footer';
//import { RoleProvider } from '@/components/Context/roleContext';
// import { Session } from 'next-auth';
// import {  getSession,SessionProvider } from "next-auth/react"

//import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvier";

export const metadata: Metadata = {
  title: 'site-photo',
  description: `site d'un professionnele de la photoqraphie`,
}

export default async function RootLayout({ children }
  //  , session}
   : { children: React.ReactNode 
    //  ,session : Session
  }) {
    //const session = await getServerSession();
  return (
    <html lang="fr">
      <body>
        {/* <SessionProvider session={session}> */}
        <SessionProvider >
          {/* <RoleProvider> */}
            <Header />
              <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
              </main>
            <Footer />
          {/* </RoleProvider> */}
        </SessionProvider>
      </body>
    </html>
  )
};

// Dans getServerSideProps plus adapter pour donnée actualisé que getStaticProps
// export async function getServerSideProps(context :GetServerSidePropsContext) {
//   const session: Session | null = await getSession({ req: context.req });

//   return {
//     props: {
//       session,
//     },
//   };
// }
