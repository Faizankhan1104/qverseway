import React from "react";

const Achivements = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-16 md:py-20 gap-12 md:gap-16">

      {/* Heading */}
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl text-[#3b4c48] font-semibold">
          Great achievements
        </h1>
      </div>

      {/* Achievement Cards */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">

        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="border text-[#3b4c48] border-gray-300 flex flex-col"
          >
            <div className="flex justify-end">
              <h4 className="p-3 text-sm md:text-base">2017</h4>
            </div>

            <div className="flex flex-col py-10 md:py-14 justify-center items-center text-center">
              <h1 className="text-5xl sm:text-6xl md:text-8xl">G</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl">
                Best teaching of <br /> the year
              </h2>
            </div>
          </div>
        ))}

      </div>

      {/* Bottom Links */}
      <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center px-4 text-center md:text-left">

        <h2 className="text-base sm:text-lg md:text-xl text-[#3b4c48]">
          Looking for help?{" "}
          <span className="border-b-2 font-semibold cursor-pointer">
            <a href="">Contact us today</a>
          </span>
        </h2>

        <h2 className="text-base sm:text-lg md:text-xl text-[#3b4c48]">
          Keep in Touch.{" "}
          <span className="border-b-2 font-semibold cursor-pointer">
            <a href="">Like us on Facebook</a>
          </span>
        </h2>

      </div>

    </section>
  );
};

export default Achivements;
