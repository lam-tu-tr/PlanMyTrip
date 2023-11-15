// export default function LoginFields() {
//   return (
//     <div>
//       <section className=" flex flex-col justify-around py-8 h-60 ">
//         <label htmlFor="username">Username:</label>
//         <input
//           className="h-14  rounded-md pl-5 text-black my-2"
//           type="accept"
//           minLength={4}
//           maxLength={10}
//           required
//           name="username"
//           value={formData.username}
//           onChange={handleFormChange}
//           pattern="[a-zA-Z0-9_]+"
//           title="Invalid username. Please use only alphanumeric characters and underscore."
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           className="h-14  rounded-md pl-5 text-black my-2"
//           type="password"
//           minLength={4}
//           maxLength={10}
//           required
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleFormChange}
//         />
//       </section>
//       <aside className="flex flex-col justify-center items-center h-2/6 ">
//         {createAccount ? (
//           <button
//             title="Create Account"
//             type="button"
//             className="bg-green-300 h-14 w-28 m-0 rounded-lg"
//             onClick={handleNewAccount}
//           >
//             Create Account
//           </button>
//         ) : (
//           <button
//             title="Login"
//             type="submit"
//             className="bg-orange-500 h-14 w-28  m-0 rounded-lg"
//           >
//             Log in
//           </button>
//         )}
//       </aside>
//       <p className="m-5">
//         Login using <br /> Username: Account123 <br /> Password: Pass123
//       </p>
//     </div>
//   );
// }
