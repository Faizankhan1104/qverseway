import React from "react";
import image1 from "../../../public/images/image1.png";
import HeroImage from "../../../public/images/heroBg.png";

const HeroContact = () => {
  return (
    <header
      className="
        relative w-full
        min-h-[60vh] sm:min-h-[55vh] md:min-h-[50vh]
        bg-center bg-cover bg-no-repeat
        flex items-center
      "
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div
        className="
          relative z-10
          w-full
          flex flex-col md:flex-row
          items-center justify-center
          gap-10 md:gap-24
          px-6 sm:px-10 lg:px-20
          pt-16 md:pt-10
          text-white
        "
      >
        {/* Text */}
        <div className="text-center md:text-left max-w-xl">
          <p className="mb-4 text-base sm:text-lg md:text-xl font-medium text-[#f3ff44]">
            Contact Us
          </p>

          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-bold font-[var(--font-space)]
              leading-tight
            "
          >
            We'd love to hear <br className="hidden sm:block" /> from your side.
          </h1>
        </div>

        {/* Right Image (VISIBLE ON ALL SCREENS) */}
        <div className="flex justify-center w-full md:w-auto">
          <img
            src={image1}
            alt="Contact Illustration"
            className="
              w-56 sm:w-72 md:w-80 lg:w-auto
              h-auto
              max-h-[45vh] sm:max-h-[50vh] lg:max-h-[70vh]
              object-contain
            "
          />
        </div>
      </div>
    </header>
  );
};

export default HeroContact;
