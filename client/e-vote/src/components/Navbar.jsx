import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");

  // ✅ Recheck auth state on mount or localStorage change
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
      setUserRole(localStorage.getItem("userRole") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout logic
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("voterId");
    setIsAuthenticated(false);
    setUserRole("");
    navigate("/login");
  };

  // ✅ active route styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">E-Vote</h1>
              <p className="text-xs text-gray-600">Blockchain Voting</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`font-medium transition ${
                    isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/dashboard"
                  className={`font-medium transition ${
                    isActive("/dashboard")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/vote"
                  className={`font-medium transition ${
                    isActive("/vote")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Vote
                </Link>

                <Link
                  to="/admin"
                  className={`font-medium transition ${
                    isActive("/admin")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Admin
                </Link>

                <Link
                  to="/login"
                  className={`font-medium transition ${
                    isActive("/login")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {userRole === "admin" ? (
                  <Link
                    to="/dashboard"
                    className={`font-medium transition ${
                      isActive("/dashboard")
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/vote"
                    className={`font-medium transition ${
                      isActive("/vote")
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    Vote
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {userRole === "admin" ? (
                  <Link
                    to="/dashboard"
                    className="block py-2 text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/vote"
                    className="block py-2 text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Vote
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("authToken")
//   );
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");

//   // ✅ Update auth state if storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem("authToken"));
//       setUserRole(localStorage.getItem("userRole") || "");
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   // ✅ Logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("voterId");
//     setIsAuthenticated(false);
//     setUserRole("");
//     navigate("/login");
//   };

//   // ✅ Active link
//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">E-Vote</h1>
//               <p className="text-xs text-gray-600">Blockchain Voting</p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link
//               to="/"
//               className={`font-medium transition ${
//                 isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Home
//             </Link>

//             <Link
//               to="/dashboard"
//               className={`font-medium transition ${
//                 isActive("/dashboard")
//                   ? "text-blue-600"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Dashboard
//             </Link>

//             <Link
//               to="/vote"
//               className={`font-medium transition ${
//                 isActive("/vote")
//                   ? "text-blue-600"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Vote
//             </Link>

//             <Link
//               to="/admin"
//               className={`font-medium transition ${
//                 isActive("/admin")
//                   ? "text-blue-600"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Admin
//             </Link>

//             {!isAuthenticated && (
//               <>
//                 <Link
//                   to="/login"
//                   className={`font-medium transition ${
//                     isActive("/login")
//                       ? "text-blue-600"
//                       : "text-gray-700 hover:text-blue-600"
//                   }`}
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}

//             {/* ✅ Always visible Logout */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden text-gray-700 focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {mobileMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden pb-4 space-y-2">
//             <Link
//               to="/"
//               onClick={() => setMobileMenuOpen(false)}
//               className="block text-gray-700 hover:text-blue-600 transition"
//             >
//               Home
//             </Link>
//             <Link
//               to="/dashboard"
//               onClick={() => setMobileMenuOpen(false)}
//               className="block text-gray-700 hover:text-blue-600 transition"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/vote"
//               onClick={() => setMobileMenuOpen(false)}
//               className="block text-gray-700 hover:text-blue-600 transition"
//             >
//               Vote
//             </Link>
//             <Link
//               to="/admin"
//               onClick={() => setMobileMenuOpen(false)}
//               className="block text-gray-700 hover:text-blue-600 transition"
//             >
//               Admin
//             </Link>

//             {!isAuthenticated && (
//               <>
//                 <Link
//                   to="/login"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block text-gray-700 hover:text-blue-600 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block text-gray-700 hover:text-blue-600 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}

//             {/* ✅ Always visible Logout button */}
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setMobileMenuOpen(false);
//               }}
//               className="block w-full text-left py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

