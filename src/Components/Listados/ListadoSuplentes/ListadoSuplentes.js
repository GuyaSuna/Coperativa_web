// "use client";

// import React, { useState, useEffect } from "react";
// import { getAllSocios } from "../../../Api/api";

// const ListadoSuplentes = ({}) => {
//   const [suplentes, setSuplentes] = useState([]);

//   useEffect(() => {
//     fetchAllSocios();
//   }, []);

//   const fetchAllSocios = async () => {
//     try {
//       const response = await getAllSocios(cooperativa.idCooperativa);
//       const suplentes = response.filter((socio) => socio.suplente !== null);
//       setSuplentes(suplentes);
//     } catch (error) {
//       console.error("Error al obtener los socios:", error);
//     }
//   };
//   return (
//     <div className="sm:p-7 p-4">
//       <div className="flex w-full items-center mb-7">
//         <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
//           Filter by
//           <svg
//             viewBox="0 0 24 24"
//             className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
//             stroke="currentColor"
//             strokeWidth={2}
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="6 9 12 15 18 9" />
//           </svg>
//         </button>
//       </div>
//       <table className="w-full text-left">
//         <thead>
//           <tr className="text-gray-400">
//             <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
//               NroSocio
//             </th>
//             <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
//               Nombre Suplente
//             </th>
//             <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
//               Apellido Suplente
//             </th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 dark:text-gray-100">
//           {suplentes.map((socio) => (
//             <tr key={socio.nroSocio}>
//               <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center ml-4">{socio.nroSocio}</div>
//               </td>
//               <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center">{socio.suplente.nombre}</div>
//               </td>
//               <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center">
//                   {socio.suplente.apellido}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListadoSuplentes;
