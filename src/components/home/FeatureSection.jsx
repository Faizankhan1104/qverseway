import { Link } from "react-router-dom";
import HeroImage2 from "../../../public/images/heroBg2.png";

const FeatureSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Quran Ayat Header */}
      <div className="w-full text-center px-4 py-6 sm:py-8 md:py-10 bg-gradient-to-r from-[#2a3a37] via-[#313E3B] to-[#2a3a37] text-white border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 text-white font-arabic leading-relaxed">
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed px-4">
            Read, ˹O Prophet,˺ in the Name of your Lord Who created
          </p>
          <div className="mt-3 sm:mt-4">
            <span className="inline-block bg-yellow-400/20 text-yellow-300 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border border-yellow-400/30">
              Surah Al-Alaq (96:1)
            </span>
          </div>
        </div>
      </div>

      {/* Main Feature Section */}
      <div className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={HeroImage2}
            className="w-full h-full object-cover"
            alt="Online Quran Learning"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 lg:gap-20">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl">✓</span>
                <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Certified & Trusted Learning
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#313E3B] font-bold leading-tight mb-4 sm:mb-6">
                Learn Quran <span className="text-yellow-500">Online</span> <br />
                Anytime, <span className="text-yellow-500">Anywhere</span> <br />
                With <span className="text-emerald-600">Confidence</span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join thousands of students worldwide learning Quran with proper Tajweed,
                personalized attention, and flexible scheduling.
              </p>

              {/* CTA Button */}
              <Link
                to="/course"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8 sm:px-10 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/50"
              >
                <span>Explore Courses</span>
                <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
              </Link>

              {/* Stats */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">1000+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Students Enrolled</p>
                </div>
                <div className="w-px h-10 bg-gray-300 hidden sm:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Expert Teachers</p>
                </div>
                <div className="w-px h-10 bg-gray-300 hidden sm:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">4.9★</p>
                  <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>

            {/* RIGHT FEATURES */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

                {/* Feature 1 */}
                <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-2xl sm:text-3xl">🕐</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#313E3B] mb-2 sm:mb-3">
                    Flexible Class Timings
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Attend live Quran classes at your convenience without disturbing your daily routine.
                  </p>
                  <div className="bg-yellow-400 h-1 w-12 mt-4 sm:mt-5 rounded-full group-hover:w-full transition-all duration-300"></div>
                </div>

                {/* Feature 2 */}
                <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2 sm:mt-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-2xl sm:text-3xl">👨‍🏫</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#313E3B] mb-2 sm:mb-3">
                    Qualified Quran Teachers
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Learn from experienced and certified teachers with proper Tajweed guidance.
                  </p>
                  <div className="bg-emerald-500 h-1 w-12 mt-4 sm:mt-5 rounded-full group-hover:w-full transition-all duration-300"></div>
                </div>

                {/* Feature 3 */}
                <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2 sm:col-span-2">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl sm:text-3xl">🎯</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[#313E3B] mb-2 sm:mb-3">
                        One-to-One Attention
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Personalized learning approach to improve recitation, pronunciation and fluency with individual feedback.
                      </p>
                      <div className="bg-blue-500 h-1 w-12 mt-4 sm:mt-5 rounded-full group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Feature Highlights */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-yellow-800">✓ Free Trial Class</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800">✓ Money-Back Guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default FeatureSection;