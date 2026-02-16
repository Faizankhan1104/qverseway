import React from "react";
import logo from "../../../public/images/logo1.png";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Beginner\nLearning",
    img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1770822359/4097101_tpsrrw.jpg",
  },
  {
    title: "Home Learning\nfor Children",
    img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1770822230/4807_nxdlxo.jpg",
  },
  {
    title: "Improving\nProficiency",
    img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1770822205/33995_lkm30e.jpg",
  },
  {
    title: "Empower\nWomen at Home",
    img: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1770822191/704_ybapim.jpg",
  },
];

const ExploreRange = () => {
  return (
    <section className="w-full bg-[#eef6fb] py-16 px-4">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-14">
        Explore Our Range, Crafted to Fit Your Needs
      </h2>

      {/* Main Grid */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full mb-20">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-full w-64 h-64 mx-auto flex flex-col items-center justify-center shadow-md"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-center font-medium text-gray-800 whitespace-pre-line">
                {card.title}
              </p>
            </div>
          ))}
        </div>

        {/* Center Logo Card */}
        <div className="relative flex flex-col items-center">
          <div className="bg-[#111827] w-72 h-40 md:w-96 md:h-48 rounded-t-full flex items-center justify-center shadow-xl">
            <h3 className="text-yellow-400 text-2xl md:text-3xl font-bold">
              <img src={logo} alt="" />
            </h3>
          </div>

          {/* Button */}
          <Link to="/course" className="mt-[-20px] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 py-3 rounded-md transition">
            Enrolled Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreRange;
