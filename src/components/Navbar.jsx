


// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';

// const Navbar = ({ user }) => {
//   const handleLogout = async () => {
//     await signOut(auth); // Firebase sign-out
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white shadow-md">
//       <div className="text-2xl font-bold">
//         <Link to="/" className="hover:text-indigo-200 transition-colors duration-300">
//           BookScape
//         </Link>
//       </div>
//       <div className="space-x-6 text-lg">
//         <Link to="/home" className="hover:text-indigo-200 transition-colors duration-300">🏠 Home</Link>
//         <Link to="/profile" className="hover:text-indigo-200 transition-colors duration-300">👤 Profile</Link>
//         <Link to="/StatsPage" className="hover:text-indigo-200 transition-colors duration-300">📝 Stats</Link>
//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="hover:text-indigo-200 transition-colors duration-300 text-lg"
//           >
//             🔓 Logout
//           </button>
//         ) : (
//           <Link to="/login" className="hover:text-indigo-200 transition-colors duration-300">🔓 Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { LogOut, LogIn, Home, User, BarChart2 } from 'lucide-react';

// const Navbar = ({ user }) => {
//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg px-6 py-4 flex items-center justify-between">
//       {/* Logo */}
//       <div className="text-2xl font-extrabold tracking-tight">
//         <Link to="/" className="hover:opacity-90 transition duration-300">
//           BookScape
//         </Link>
//       </div>

//       {/* Nav Links */}
//       <div className="flex gap-6 text-base items-center font-medium">
//         <Link
//           to="/home"
//           className="flex items-center gap-1 hover:text-yellow-100 transition"
//         >
//           <Home size={18} /> Home
//         </Link>
//         <Link
//           to="/profile"
//           className="flex items-center gap-1 hover:text-yellow-100 transition"
//         >
//           <User size={18} /> Profile
//         </Link>
//         <Link
//           to="/StatsPage"
//           className="flex items-center gap-1 hover:text-yellow-100 transition"
//         >
//           <BarChart2 size={18} /> Stats
//         </Link>

//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1 hover:text-red-200 text-red-100 transition"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="flex items-center gap-1 hover:text-green-100 text-green-200 transition"
//           >
//             <LogIn size={18} /> Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
 

import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut, LogIn, Home, User, BarChart2 } from 'lucide-react';

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-tight">
        <Link to="/" className="hover:opacity-90 transition duration-300">
          BookScape
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 text-base items-center font-medium">
        <Link
          to="/home"
          className="flex items-center gap-1 hover:text-blue-200 transition"
        >
          <Home size={18} /> Home
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-1 hover:text-blue-200 transition"
        >
          <User size={18} /> Profile
        </Link>
        <Link
          to="/StatsPage"
          className="flex items-center gap-1 hover:text-blue-200 transition"
        >
          <BarChart2 size={18} /> Stats
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-100 hover:text-red-300 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 text-green-100 hover:text-green-300 transition"
          >
            <LogIn size={18} /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
