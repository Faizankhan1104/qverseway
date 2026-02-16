import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import logo1 from "../../../public/images/logo1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const [tabletCourseOpen, setTabletCourseOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const courses = useSelector((state) => state.course.courses || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  // ✅ Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.course-dropdown')) {
        setTabletCourseOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* ✅ ALWAYS SOLID BACKGROUND - NO TRANSPARENCY ISSUES */}
      <nav className=" top-0 p-4 left-0 w-full z-50 bg-[#01211e] shadow-lg">
        
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ================= LOGO ================= */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo1} className="h-8 md:h-10" alt="logo" />
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden lg:flex items-center gap-8 text-white font-medium">
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About
              </Link>

              {/* COURSES DROPDOWN */}
              <div className="relative group course-dropdown">
                <button className="flex items-center gap-1 hover:text-yellow-400 transition">
                  Courses <FaChevronDown size={12} />
                </button>

                <div className="absolute left-0 top-full mt-2 bg-white text-gray-700 rounded-lg shadow-xl w-64 max-h-80 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {courses.length > 0 ? (
                    courses.map((c) => (
                      <Link
                        key={c._id}
                        to={`/course/${c._id}`}
                        className="block px-4 py-3 hover:bg-[#01211e] hover:text-white transition border-b border-gray-100 last:border-0"
                      >
                        {c.title}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No courses available
                    </div>
                  )}
                </div>
              </div>

              <Link to="/pricing" className="hover:text-yellow-400 transition">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>

              {/* AUTH BUTTONS */}
              {!isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/login" 
                    className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[#01211e] transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/dashboard" 
                    className="hover:text-yellow-400 transition"
                  >
                    My Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* ================= TABLET MENU (768px - 1024px) ================= */}
            <div className="hidden md:flex lg:hidden items-center gap-6 text-white text-sm">
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About
              </Link>

              {/* COURSES DROPDOWN - TABLET */}
              <div className="relative course-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTabletCourseOpen(!tabletCourseOpen);
                  }}
                  className="flex items-center gap-1 hover:text-yellow-400 transition"
                >
                  Courses <FaChevronDown size={10} />
                </button>

                {tabletCourseOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white text-gray-700 rounded-lg shadow-xl w-56 max-h-64 overflow-y-auto">
                    {courses.map((c) => (
                      <Link
                        key={c._id}
                        to={`/course/${c._id}`}
                        onClick={() => setTabletCourseOpen(false)}
                        className="block px-4 py-2 hover:bg-[#01211e] hover:text-white transition border-b last:border-0"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/pricing" className="hover:text-yellow-400 transition">
                Pricing
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="border border-white px-3 py-1 rounded hover:bg-white hover:text-[#01211e] transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold hover:bg-yellow-500 transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="bg-white text-[#01211e] px-3 py-1 rounded font-semibold hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* ================= MOBILE HAMBURGER ================= */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white text-3xl focus:outline-none"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE MENU SIDEBAR ================= */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-[#01211e] text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <img src={logo1} className="h-8" alt="logo" />
            <button 
              onClick={() => setMenuOpen(false)}
              className="text-2xl hover:text-red-400 transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-yellow-400 transition"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-yellow-400 transition"
            >
              About
            </Link>

            {/* MOBILE COURSES ACCORDION */}
            <div className="border-t border-gray-700 pt-2">
              <button
                onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
                className="flex justify-between items-center w-full py-2 hover:text-yellow-400 transition"
              >
                <span>Courses</span>
                <span className="text-sm">{mobileCourseOpen ? "▲" : "▼"}</span>
              </button>

              {mobileCourseOpen && (
                <div className="ml-4 mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {courses.length > 0 ? (
                    courses.map((c) => (
                      <Link
                        key={c._id}
                        to={`/course/${c._id}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-sm hover:text-yellow-400 transition"
                      >
                        • {c.title}
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No courses available</p>
                  )}
                </div>
              )}
            </div>

            <Link 
              to="/pricing" 
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-yellow-400 transition border-t border-gray-700 pt-4"
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-yellow-400 transition"
            >
              Contact
            </Link>
          </nav>

          {/* AUTH SECTION */}
          <div className="border-t border-gray-700 pt-4 mt-auto">
            {!isAuthenticated ? (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  onClick={() => setMenuOpen(false)}
                  className="block text-center border border-white py-3 rounded-lg hover:bg-white hover:text-[#01211e] transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-800 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-400">Logged in as</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
                <Link 
                  to="/dashboard" 
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-white text-[#01211e] py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  My Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-center bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;