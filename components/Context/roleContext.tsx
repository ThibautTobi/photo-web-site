// 'use client'
// import { createContext, useContext, useState, useEffect } from 'react';
// import { IRoleOnly } from '@/types/types';
// import { RoleContextType } from '@/types/types';
// import { RoleProviderProps } from '@/types/types';
// import { NextRequest } from 'next/server';

/************************** gestion d'accés role par récupération dans le cookie de connexion */

// const RoleContext = createContext<RoleContextType | undefined>(undefined);

// export function RoleProvider({ children }: RoleProviderProps) {
//     const [user, setUser] = useState< IRoleOnly | null>(null);

//     function getRoleFromCookie(): IRoleOnly | null {
//       const value = "; " + document.cookie;
//       const parts = value.split("; userRole=");
//       if (parts.length === 2) {
//           const role = parts.pop()?.split(";").shift();
//           return role ? { role: role as IRoleOnly['role'] } : null;
//       }
//       return null;
//   }

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const userRole = getRoleFromCookie();
//             if (userRole) {
//                 setUser(userRole);
//             }
//         }
//     }, []);

//     return (
//         <RoleContext.Provider value={{ user, setUser }}>
//             {children}
//         </RoleContext.Provider>
//     );
// }

// export function useRole() {
//     const context = useContext(RoleContext);
//     if (!context) {
//         throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
//     }
//     return context;
// }
