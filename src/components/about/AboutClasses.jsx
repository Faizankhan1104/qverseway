import React from "react";

const AboutClasses = () => {
  const instructors = [
    {
      title: "Maulana Asjad Qasmi",
      desc: "Graduated From Darul Uloom Deoband.",
      qualification: "Islamic Scholar",
      experience: "10+ Years",
      img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771157096/Gemini_Generated_Image_z5ffo8z5ffo8z5ff_bvq3q1.png",
    },
    {
      title: "Qari Mohd Kaif",
      desc: "Graduated from Mazahirul Uloom Saharanpur.",
      qualification: "Quranic Recitation Expert",
      experience: "8+ Years",
      img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771157100/Gemini_Generated_Image_4h6uzi4h6uzi4h6u_nai4el.png",
    },
    {
      title: "Maulana Mohd Shahbaz",
      desc: "Graduated From Darul Uloom Deoband.",
      qualification: "Tajweed Specialist",
      experience: "12+ Years",
      img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771157096/Gemini_Generated_Image_8ne0688ne0688ne0_rvmfyu.png",
    },
    {
      title: "Dr Qari Owais Baghonwali",
      desc: "Graduated from Darul Uloom Deoband.",
      qualification: "Islamic Studies PhD",
      experience: "15+ Years",
      img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771160076/Gemini_Generated_Image_wqffehwqffehwqff_cw76ke.png",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-green-50 via-white to-green-50 py-16 sm:py-20 md:py-24 overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with Icon */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-2xl sm:text-3xl">📚</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313E3B]">
              About <span className="text-emerald-600">QVerse Way</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-full mx-auto"></div>
        </div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
          
          {/* Left Column - Heading */}
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⭐ Trusted by 1000+ Students
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313E3B] leading-tight">
              We're providing the{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                best online
              </span>{" "}
              courses.
            </h1>
            
            {/* Stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600">50+</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Expert Teachers</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-500">1000+</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Active Students</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-blue-500">4.9★</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#313E3B] mb-4 flex items-center gap-2">
              <span className="text-2xl">🌟</span> Our Mission
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                <strong className="text-[#313E3B]">Qverseway</strong> is a dedicated online platform committed to spreading authentic Islamic knowledge and helping students of all ages connect with the Qur'an in a meaningful and correct way.
              </p>
              <p>
                We believe that learning the Qur'an is not just about recitation — it is about <span className="text-emerald-600 font-semibold">understanding, reflection, and living by its teachings</span>. Our qualified and experienced instructors provide structured courses in Quran recitation (Tajweed), memorization (Hifz), and foundational Islamic studies.
              </p>
              <p>
                We combine <span className="text-yellow-600 font-semibold">traditional teaching methods with modern technology</span> to create a flexible learning experience. Whether you are a beginner or an advanced learner, Qverseway provides personalized guidance to help you progress with confidence.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span>
                  <span>Certified Instructors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span>
                  <span>Flexible Scheduling</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span>
                  <span>One-on-One Classes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">✓</span>
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructors Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313E3B] mb-3">
              Meet Our <span className="text-emerald-600">Expert Instructors</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from qualified scholars with years of experience in Quranic education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  {/* Image Container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={instructor.img}
                        alt={instructor.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                      {instructor.experience}
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="text-center mt-8">
                    <h3 className="text-lg sm:text-xl font-bold text-[#313E3B] mb-2">
                      {instructor.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-600 font-semibold mb-2">
                      {instructor.qualification}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {instructor.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="border-t border-gray-100">
                  <button className="w-full py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-700 bg-gray-50 hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <span>📚</span>
                    <span>View Profile</span>
                  </button>
                </div>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-6">
              <span className="text-white text-sm font-semibold">🌍 Learn From Anywhere</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Online learning wherever <br className="hidden sm:block" />
              and <span className="text-yellow-300">whenever.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of students learning Quran with flexibility and convenience
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white hover:bg-yellow-400 text-emerald-700 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                <span>Start Learning Now</span>
                <span>→</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                Schedule Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClasses;