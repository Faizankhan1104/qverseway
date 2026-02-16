import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroImage4 from "../../../public/images/heroBg4.png";
import api from "../../api/axios";

const AllCourese = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/course/all");
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(courses.map(course => course.category).filter(Boolean))];

  // Filter courses by category
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 h-64 sm:h-72 md:h-80 lg:h-96">
          <img
            src={HeroImage4}
            className="w-full h-full object-cover"
            alt="All Courses Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6">
              <span className="text-lg sm:text-xl">📚</span>
              <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                Course Library
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              All <span className="text-yellow-400">Courses</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mb-8">
              Explore our comprehensive collection of Quranic courses designed for all levels
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{courses.length}</p>
                <p className="text-xs sm:text-sm text-gray-800">Total Courses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">50+</p>
                <p className="text-xs sm:text-sm text-gray-800">Expert Teachers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">1000+</p>
                <p className="text-xs sm:text-sm text-gray-800">Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Courses Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try selecting a different category</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              View All Courses
            </button>
          </div>
        ) : (
          /* Courses Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course, index) => (
              <Link
                key={course._id}
                to={`/course/${course._id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ₹{course.price}
                </div>

                {/* Course Image */}
                <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={course.image || "/images/course1.webp"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 sm:p-7">
                  
                  {/* Category Badge */}
                  {course.category && (
                    <div className="inline-block self-start bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {course.category}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#313E3B] mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-4 flex-1">
                    {course.description}
                  </p>

                  {/* Divider */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-full mb-4"></div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📖</span>
                      <span className="font-medium">{course.lecturesCount || 0} Lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⏱️</span>
                      <span className="font-medium">{course.duration || 0}h</span>
                    </div>
                  </div>

                  {/* CTA Button (Appears on Hover) */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400 transition-colors duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
            <span className="text-3xl">🎓</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We help you find the perfect tutor. It's completely free to explore and get started with any course.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-white hover:bg-yellow-400 text-emerald-700 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-white">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2 text-white">
              <span>✓</span>
              <span className="font-semibold">Money-Back Guarantee</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2 text-white">
              <span>🔒</span>
              <span className="font-semibold">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCourese;