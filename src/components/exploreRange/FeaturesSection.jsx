const FeaturesSection = () => {
  return (
    <section className="w-full bg-[#eef6fb] py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-green-700 font-semibold">
            OUR FEATURES
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mt-2">
            Why someone joins us
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* 1 */}
          <div className="bg-[#fff9ed] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              📘
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Flexible Class Timing
            </h3>
          </div>

          {/* 2 */}
          <div className="bg-[#eafff1] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              💻
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Live Classes, Home Work & Support
            </h3>
          </div>

          {/* 3 */}
          <div className="bg-[#fff9ed] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              👨‍🏫
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Expert Mentors and teachers
            </h3>
          </div>

          {/* 4 */}
          <div className="bg-[#eafff1] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              📖
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Recitation with Tajweed
            </h3>
          </div>

          {/* 5 */}
          <div className="bg-[#fff9ed] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              💰
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Affordable hadya
            </h3>
          </div>

          {/* 6 */}
          <div className="bg-[#eafff1] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              🎓
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              The easiest way of learning
            </h3>
          </div>

          {/* 7 */}
          <div className="bg-[#fff9ed] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              🔄
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Adaptive learning process
            </h3>
          </div>

          {/* 8 */}
          <div className="bg-[#eafff1] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              📱
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Doubt clearance and live technical support
            </h3>
          </div>

          {/* 9 */}
          <div className="bg-[#fff9ed] rounded-2xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              📞
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Daily SMS & Call reminders
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
