const PricingSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 rounded-full uppercase tracking-wider">
              Special Offer
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Invest in Your <span className="text-yellow-400">Spiritual Growth</span>
            <br className="hidden sm:block" /> At Qverse Way
          </h1>
          
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-4 sm:mb-6 px-4">
            By enrolling in our course, You enhance your spiritual journey by
            improving Quran recitation, pronunciation, and fluency.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <span className="text-xl sm:text-2xl">🎥</span>
            <p className="font-semibold text-white text-sm sm:text-base">
              Live classes available in ₹799/month plan
            </p>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-8">

          {/* BASIC PLAN */}
          <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/20">
            
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Basic Plan
                </h2>
                <p className="text-yellow-400 text-sm sm:text-base font-medium">
                  One-Time Payment • Lifetime Access
                </p>
              </div>
              <div className="text-3xl sm:text-4xl">📚</div>
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-gray-400 text-sm sm:text-base mb-4">
                Perfect for self-paced learners
              </p>
              
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Basic Quran Curriculum",
                  "200+ Video Lessons",
                  "Practice Assignments",
                  "Standard Support",
                  "Progress Tracking",
                  "Certificate of Completion"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200 text-sm sm:text-base">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button className="w-full group/btn relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>🎁</span> Gift for You – ₹899
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg">
                Support & Learn – ₹1,099
              </button>
              
            </div>
          </div>

          {/* SUBSCRIPTION PLAN - PREMIUM */}
          <div className="group relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 hover:scale-105 border-4 border-yellow-500">
            
            {/* RECOMMENDED BADGE */}
            <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-yellow-400 text-xs sm:text-sm font-black px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-xl border-2 border-yellow-400 flex items-center gap-2">
                  <span className="text-base sm:text-lg">⭐</span>
                  <span>MOST POPULAR</span>
                  <span className="text-base sm:text-lg">⭐</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 sm:mb-8 mt-4 sm:mt-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                  Premium Plan
                </h2>
                <p className="text-gray-800 text-sm sm:text-base font-bold">
                  Live Classes • Personal Mentoring
                </p>
              </div>
              <div className="text-3xl sm:text-4xl">🌟</div>
            </div>

            <div className="bg-gray-900/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="text-gray-900 font-semibold text-sm sm:text-base mb-4 text-center">
                Everything in Basic Plan, PLUS:
              </p>
              
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { icon: "🎥", text: "Live Interactive Classes", highlight: true },
                  { icon: "👨‍🏫", text: "Direct Teacher Interaction", highlight: true },
                  { icon: "💬", text: "Instant Message Support" },
                  { icon: "🎤", text: "Daily Sabaq Recordings Review" },
                  { icon: "👥", text: "Access to Forums & Groups" },
                  { icon: "📝", text: "Extra Homework & Assignments" },
                  { icon: "🏆", text: "Priority Support 24/7" }
                ].map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${feature.highlight ? 'text-gray-900 font-bold' : 'text-gray-800'} text-sm sm:text-base`}>
                    <span className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 ${feature.highlight ? 'bg-gray-900' : 'bg-emerald-600'} rounded-full flex items-center justify-center text-xs sm:text-sm mt-0.5`}>
                      {feature.icon}
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button className="w-full group/btn relative bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-yellow-400 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-gray-900/50 overflow-hidden border-2 border-gray-900">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🔥 Monthly – ₹799 <span className="text-xs sm:text-sm text-gray-400 line-through">₹999</span>
                </span>
                <div className="absolute inset-0 bg-yellow-400/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </button>
              
              <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span>Quarterly – ₹1,999</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Save 17%</span>
              </button>
              
              <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span>Half Yearly – ₹3,999</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Save 17%</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span>Yearly – ₹5,999</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Save 38%</span>
              </button>
            </div>

            {/* Shimmer effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
              <div className="absolute -inset-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </div>
          </div>

        </div>

        {/* BOTTOM GUARANTEE SECTION */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                ✓
              </div>
              <div className="text-left">
                <p className="font-bold text-base sm:text-lg">7-Day Money Back</p>
                <p className="text-xs sm:text-sm text-gray-300">100% Satisfaction Guaranteed</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                🔒
              </div>
              <div className="text-left">
                <p className="font-bold text-base sm:text-lg">Secure Payment</p>
                <p className="text-xs sm:text-sm text-gray-300">Your data is protected</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                📞
              </div>
              <div className="text-left">
                <p className="font-bold text-base sm:text-lg">24/7 Support</p>
                <p className="text-xs sm:text-sm text-gray-300">We're here to help</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add shimmer animation to tailwind config if needed */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;