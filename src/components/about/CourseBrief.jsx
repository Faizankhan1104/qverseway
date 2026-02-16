import React, { useState } from "react";
import image1 from "../../../public/images/image2.png";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 sm:p-5
                   font-medium text-left text-[#313E3B]
                   hover:bg-green-100 transition-all"
      >
        <span className="text-sm sm:text-base">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 p-4 sm:p-5" : "max-h-0 p-0"}
          overflow-hidden`}
      >
        <p className="text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
};

const CourseBrief = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionData = [
    {
      title: "What is Qverseway?",
      content:
        "Qverseway is an online platform dedicated to teaching the Qur’an through structured courses such as Tajweed, Hifz (memorization), and basic Islamic studies. Our goal is to make Quran learning accessible to students worldwide.",
    },
    {
      title: "Who can join Qverseway courses?",
      content:
        "Anyone can join — children, adults, beginners, and advanced learners. Our courses are designed for all age groups and learning levels.f",
    },
    {
      title: "Do I need prior knowledge of Arabic to start?",
      content:
        "No. Beginners can start from the Arabic alphabet (Qaida). Our teachers guide students step-by-step until they become confident in reading the Qur’an.",
    },
    {
      title: "Are classes live or recorded?",
      content:
        "We offer live one-to-one or small group online classes so students receive personal attention from qualified teachers.",
    },
    {
      title: "How are classes conducted?",
      content:
        "Classes are conducted online via video meeting tools (such as Zoom or similar platforms). Students can learn comfortably from home.",
    },
  ];

  return (
    <section className="w-full text-[#313E3B] py-16 sm:py-20">
      <div
        className="max-w-7xl mx-auto
                   flex flex-col lg:flex-row
                   items-center lg:items-start
                   gap-12 lg:gap-24
                   px-6 sm:px-10"
      >
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="w-full sm:w-4/5 lg:w-full rounded-xl object-cover"
            src={image1}
            alt="Course"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2">
          <h2
            className="flex items-center gap-4 text-base sm:text-lg font-semibold
                       text-[#3b4c48] mb-4"
          >
            <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D5D52C]" />
            Why you choose us?
          </h2>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       font-bold mb-6 leading-tight"
          >
            Teaching makes <br className="hidden sm:block" /> you productive.
          </h1>

          {/* Accordion */}
          <div className="bg-green-50 p-4 sm:p-6 rounded-xl w-full sm:w-11/12 lg:w-3/4">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isOpen={activeIndex === index}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseBrief;
