"use client";

//* Signin using next-auth

// import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// export default function SigninButton() {
//   const { data: session } = useSession();

//   if (session && session.user) {
//     return (
//       <a href="/routes/account" className="flex flex-row py-2">
//         <div className=" relative h-full aspect-square">
//           {session.user.image && (
//             <Image
//               src={session.user.image}
//               fill={true}
//               alt="User Profile Pic"
//               className="rounded-3xl"
//             />
//           )}
//         </div>
//         <p className="bg-orange-400 text-white rounded-xl px-4 ml-4">
//           Trip List
//         </p>
//       </a>
//     );
//   }

//   return (
//     <button
//       onClick={() => signIn()}
//       className="bg-blue-400 rounded-xl px-4 ml-4"
//     >
//       Sign in
//     </button>
//   );
// }
