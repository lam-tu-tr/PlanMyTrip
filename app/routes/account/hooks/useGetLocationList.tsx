// import React, { useEffect } from "react";

// export default function useGetLocationList() {
//   useEffect(() => {
//     async function initVars() {
//       setDestItems([]);
//       try {
//         const userFromStorage =
//           isWindow && window.sessionStorage.getItem("currentUser");
//         if (userFromStorage) {
//           const res = await fetch("../../api/trip", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               dbPayload: userFromStorage,
//               type: "getAllList",
//             }),
//           });

//           if (!res.ok) throw new Error("Failed to Init Variables");

//           const { tripInfo } = await res.json();
//           setDestItems(tripInfo);

//           console.log("finished data transfer");
//         }
//       } catch (err) {
//         toastError("Couldnt transfer data to server");
//       }
//     }

//     initVars();
//   }, [isWindow, currentUser]);
//   return <div>useGetLocationList</div>;
// }
