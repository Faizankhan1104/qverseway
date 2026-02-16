import React, { useState, useEffect } from "react";
import image from "../../../public/images/heroBg5.png";

const testimonials = [
  {
    name: "Mohd Aaqib",
    role: "12-Year-Old",
    message:
      "My son used to avoid Quran reading, but after joining QVerse Way, he now waits for his class every day. The teacher is so kind and patient with kids. I can clearly see improvement in his Tajweed and confidence. QVerse Way has truly brought Noor into our home.",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771164534/WhatsApp_Image_2026-02-15_at_7.01.23_PM_1_atkm1w.jpg",
  },
  {
    name: "Mohd Amzad",
    role: "27-Year-Old",
    message:
      "I started with zero confidence in reading the Quran. I was afraid of making mistakes. But the instructors at QVerse Way explained everything step by step, without judgment. Today, I can read smoothly and understand better. This course changed my connection with the Quran.",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771165983/Screenshot_20260215-200121.Instagram_r55plv.png",
  },
  {
    name: "Mohd Shahvez",
    role: "29-Year-Old",
    message:
      "Both of my children study at QVerse Way, and I am amazed by their progress. The teachers are friendly, professional, and very supportive. Classes are interactive, not boring, and my kids enjoy learning. I highly recommend QVerse Way to every Muslim family.",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771165980/WhatsApp_Image_2026-02-15_at_8.02.31_PM_qfcw6d.jpg",
  },
  {
    name: "Aas Mohammad",
    role: "33-Year-Old",
    message:
      "As a busy professional, I never thought I could manage Quran learning. QVerse Way fits perfectly into my schedule. The lessons are clear, flexible, and spiritually uplifting. It feels like I am finally giving time to my Deen.",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771166839/WhatsApp_Image_2026-02-15_at_8.12.23_PM_k0ikru.jpg",
  },
  {
    name: "Mohd Rahbar",
    role: "37-Year-Old",
    message:
      "At my age, I thought learning Qur’an would be difficult, but QVerse Way proved me wrong. The teachers are calm and repeat until I understand. I am very thankful to be part of this beautiful learning journey",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771166399/Screenshot_20260215-200546.Instagram_htrjaz.png",
  },
  {
    name: "Faiq Sayyed",
    role: "19-Year-Old",
    message:
      "I always wanted to learn Qur’an but felt shy because I was starting late. QVerse Way made me feel comfortable. The teachers explain everything from zero and never rush. This platform is perfect for adults who want to learn with respect and patience.",
    image: "https://res.cloudinary.com/dc8yb35h0/image/upload/v1771166529/Screenshot_20260215-200934.Instagram_sqazuh.png",
  },
];

const Feedback = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen md:min-h-[75vh]">
      {/* Background */}
      <img
        src={image}
        alt="Feedback background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6
                   py-12 md:py-20
                   flex flex-col lg:flex-row
                   items-center gap-10 text-white"
      >
        {/* Left Section */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h3 className="text-amber-400 font-semibold mb-2">
            Students Feedback
          </h3>

          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
            Trusted by <br className="hidden sm:block" />
            genius people.
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-amber-400">
              99%
            </h2>

            <div className="h-10 w-0.5 bg-gray-400 hidden sm:block"></div>

            <p className="text-gray-300 text-sm sm:text-base">
              Student's complete <br /> course successfully.
            </p>
          </div>
        </div>

        {/* Right Carousel */}
        <div className="w-full lg:w-3/4 bg-white text-black rounded-2xl p-6 sm:p-8 shadow-xl">
          <img
            src={testimonials[current].image}
            alt={testimonials[current].name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4"
          />

          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            “{testimonials[current].message}”
          </p>

          <h3 className="font-bold text-base sm:text-lg">
            {testimonials[current].name}
          </h3>
          <p className="text-sm text-gray-500">
            {testimonials[current].role}
          </p>

          {/* Dots */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  current === index ? "bg-amber-400" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() =>
                setCurrent(
                  current === 0 ? testimonials.length - 1 : current - 1
                )
              }
              className="px-4 py-2 text-sm sm:text-base
                         bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Prev
            </button>

            <button
              onClick={() =>
                setCurrent((current + 1) % testimonials.length)
              }
              className="px-4 py-2 text-sm sm:text-base
                         bg-amber-400 text-white rounded
                         hover:bg-amber-500 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
