import React from "react";
import HeroImage from "../../../public/images/heroBg.png";
import image1 from "../../../public/images/image1.png";

const HeroAbout = () => {
  return (
    <header className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[60vh] overflow-hidden">
      
      {/* Background Image */}
      <img
        src={HeroImage}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div
        className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 lg:px-10
                   flex flex-col md:flex-row
                   justify-center md:justify-around
                   items-center gap-6 sm:gap-8 md:gap-12 lg:gap-8 xl:gap-24
                   text-white"
      >
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left max-w-xl">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-medium text-[#f3ff44]">
            About our classes
          </p>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       leading-tight font-[var(--font-space)]"
          >
            We providing the <br className="hidden sm:block" /> best courses.
          </h1>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-auto flex justify-center md:justify-end h-1/2 sm:h-3/5 md:h-full overflow-hidden">
          <img
            src={image1}
            alt="Class"
            className="
              h-full md:h-[45vh] lg:h-[55vh] xl:h-[60vh]
              w-auto object-cover
              drop-shadow-xl
            "
          />
        </div>
      </div>
    </header>
  );
};

export default HeroAbout;