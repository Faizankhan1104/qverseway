import { Link } from "react-router-dom";
import image1 from "../../../public/images/image1.png";

const HeroSection = () => {
  return (
    <header className="relative w-full min-h-screen overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/dc8yb35h0/image/upload/f_auto,q_auto/v1770636189/heroBg_ddnhff.png')" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28">
        
        {/* Quran Ayat Section */}
        <div className="w-full text-center px-4 py-6 sm:py-8 md:py-10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 text-white font-arabic leading-relaxed">
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed px-4">
              The Prophet (ﷺ) said, "The best among you (Muslims) are those who learn the Qur'an and teach it."
            </p>
            <div className="mt-3 sm:mt-4">
              <span className="inline-block bg-yellow-400/20 text-yellow-300 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border border-yellow-400/30">
                Sahih al-Bukhari 5027
              </span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-16 xl:gap-20">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
                <span className="text-lg sm:text-xl">🎓</span>
                <span className="text-white text-xs sm:text-sm font-semibold">
                  Join 17M+ Learners Worldwide
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-space)] font-bold leading-tight text-white mb-4 sm:mb-6">
                Best online <br />
                <span className="text-yellow-400">platform</span> for <br />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  education
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0">
                Online courses from the world's leading experts.
                Learn Quran with proper Tajweed and understanding.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <Link 
                  to="/course" 
                  className="group relative w-full sm:w-auto text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 px-8 sm:px-10 py-3 sm:py-4 text-gray-900 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started Free
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>

                <a 
                  href="#how-it-works" 
                  className="group w-full sm:w-auto text-base sm:text-lg font-semibold text-white hover:text-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="relative">
                    How it Works
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                  <span className="text-xl group-hover:rotate-90 transition-transform">▶</span>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">17M+</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Active Students</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">50+</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Expert Teachers</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">100+</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Courses</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 py-2">
                  <span className="text-yellow-400 text-lg sm:text-xl">⭐</span>
                  <span className="text-white text-xs sm:text-sm">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 py-2">
                  <span className="text-green-400 text-lg sm:text-xl">✓</span>
                  <span className="text-white text-xs sm:text-sm">Certified Teachers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 py-2">
                  <span className="text-blue-400 text-lg sm:text-xl">🔒</span>
                  <span className="text-white text-xs sm:text-sm">100% Secure</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center items-center relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              
              {/* Main Image with Glow Effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-blue-400/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
                <img
                  src={image1}
                  alt="Online Quran Learning"
                  className="relative z-10 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[500px] xl:w-[600px] drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white text-sm">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;