// import {
//   FaAd,
//   FaBook,
//   FaCalendar,
//   FaEnvelope,
//   FaHome,
//   FaList,
//   FaPaypal,
//   FaSearch,
//   FaShoppingCart,
//   FaUsers,
//   FaUtensils,
//   FaWallet,
// } from "react-icons/fa";
// import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

// const Dashboard = () => {
//   const [cart, refetch, isLoading, error] = useCart();

//   // TODO: get isAdmin value from the database
//   const [isAdmin] = useAdmin();
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="flex">
//       {/* dashboard side bar */}
//       <div className="w-64 min-h-screen bg-blue-500">
//         <ul className="menu p-4">
//           {isAdmin ? (
//             <>
//               <li>
//                 <NavLink to="/dashboard/adminHome">
//                   <FaHome></FaHome>
//                   Admin Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/addItems">
//                   <FaUtensils></FaUtensils>
//                   Add Items
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/manageItems">
//                   <FaList></FaList>
//                   Manage Items
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/bookings">
//                   <FaBook></FaBook>
//                   Manage Bookings
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/users">
//                   <FaUsers></FaUsers>
//                   All Users
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/dashboard/userHome">
//                   <FaHome></FaHome>
//                   User Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/">
//                   <FaCalendar></FaCalendar>
//                   My Assignment
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/cart">
//                   <FaShoppingCart></FaShoppingCart>
//                   My Submission ({cart.length})
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/payment">
//                   <FaPaypal />
//                   Payment
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/dashboard/paymentHistory">
//                   <FaList></FaList>
//                   Real Payment History
//                 </NavLink>
//               </li>
//             </>
//           )}
//           {/* shared nav links */}
//           <div className="divider"></div>
//           <li>
//             <NavLink to="/">
//               <FaHome></FaHome>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/order/salad">
//               <FaSearch></FaSearch>
//               Menu
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/order/contact">
//               <FaEnvelope></FaEnvelope>
//               Contact
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       {/* dashboard content */}
//       <div className="flex-1 p-8">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
