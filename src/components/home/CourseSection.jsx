import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroImage4 from "../../../public/images/heroBg4.png";

const CourseSection = () => {
  const courses = useSelector((state) => state.course.courses || []);

  // Show only first 6 courses
  const displayCourses = courses.slice(0, 6);

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={HeroImage4}
          alt="Courses Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32">
        
        {/* Header Section */}
        <div className="text-center px-4 mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6">
            <span className="text-lg sm:text-xl">📚</span>
            <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Our Courses
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313E3B] mb-4">
            Popular <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Courses</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Start your Quranic journey with our comprehensive courses designed for all levels
          </p>
        </div>

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading State */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg sm:text-xl text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayCourses.map((course, index) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ₹{course.price}
                  </div>

                  {/* Course Image */}
                  <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-7">
                    
                    {/* Category Badge */}
                    <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {course.category || "Quran Studies"}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#313E3B] mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-4">
                      {course.description}
                    </p>

                    {/* Divider */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-full mb-4"></div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📖</span>
                        <span className="font-medium">{course.duration || 0} Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⏱️</span>
                        <span className="font-medium">{course.duration || 0}h</span>
                      </div>
                    </div>

                    {/* CTA Button (Appears on Hover) */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                        <span>View Course</span>
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
        <div className="max-w-4xl mx-auto text-center mt-16 sm:mt-20 px-4">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 sm:p-10 md:p-12 shadow-xl">
            
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-6">
              <span className="text-3xl">🎓</span>
            </div>

            {/* Text */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#313E3B] mb-4">
              Ready to Start Your Journey?
            </h3>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              We help you find the perfect tutor. It's completely free to explore our courses and get started.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/course"
                className="group w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Explore All Courses</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                <span className="font-semibold">1000+ Happy Students</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-blue-500">🔒</span>
                <span className="font-semibold">100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;