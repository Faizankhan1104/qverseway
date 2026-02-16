import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ title, desc, btnColor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {desc}
      </p>
      <Link
        to="/course"
        className={`px-5 py-2 rounded-md text-sm font-semibold text-white ${
          btnColor === "orange"
            ? "bg-[#12574B] hover:bg-[#177e6d]"
            : "bg-[#12574B] hover:bg-[#177e6d]"
        } transition`}
      >
        Join Now
      </Link>
    </div>
  );
};

const CoursesSection = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-1">
        
        {/* LEFT – ADULT COURSES */}
        <div className="bg-[#ecf3cc] px-6 md:px-12 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Popular Courses
          </h2>

          <span className="inline-block mt-3 mb-8 px-4 py-1 text-sm font-semibold text-[#12574B] bg-white rounded-full shadow">
            AGE: 18+ YEARS
          </span>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-4">
            <CourseCard
              title="Qaida Course – Adults"
              desc="Start Quran learning from the very basics of Arabic letters and sounds. This course builds a strong foundation and prepares you step by step for Quran reading. By the end of this course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="orange"
            />

            <CourseCard
              title="Para Course – Adults"
              desc="For learners who can read a little and are ready to read from Paras. This course improves fluency and accuracy while strengthening Quran reading gradually. By the end of this course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="orange"
            />

            <CourseCard
              title="Quran Course – Adults"
              desc="For learners who already read the Quran but want to improve correctness and Tajweed. This course focuses on proper pronunciation and refined Quran recitation. By the end of this course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="orange"
            />
          </div>
        </div>

        {/* RIGHT – KIDS COURSES */}
        <div className="bg-[#f3fbf6] px-6 md:px-12 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Kids Courses
          </h2>

          <span className="inline-block mt-3 mb-8 px-4 py-1 text-sm font-semibold text-emerald-700 bg-white rounded-full shadow">
            AGE: 6 TO 18 YEARS
          </span>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-4">
            <CourseCard
              title="Qaida Course – Kids"
              desc="Start Quran learning from the very basics of Arabic letters and sounds. This course builds a strong foundation and prepares children step by step for Quran reading. By the end of this course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="green"
            />

            <CourseCard
              title="Para Course – Kids"
              desc="For children who can read a little and are ready to read from Paras. This course improves fluency and accuracy while strengthening Quran reading gradually. By the end of this course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="green"
            />

            <CourseCard
              title="Quran Course – Kids"
              desc="For children who already read the Quran but want to improve correctness and Tajweed. This course focuses on proper pronunciation and refined Quran recitation. By the end of this course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
              btnColor="green"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
