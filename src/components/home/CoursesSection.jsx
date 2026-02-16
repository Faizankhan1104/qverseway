const CoursesSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT – Adults */}
          <div className="bg-[#fff7ee] rounded-xl p-8">
            
            <h2 className="text-3xl font-semibold text-gray-700">
              Popular Courses
            </h2>

            <span className="inline-block mt-3 px-4 py-1 bg-white rounded-full text-sm font-semibold text-orange-500 shadow">
              AGE: 18+ YEARS
            </span>

            <div className="mt-8 space-y-6">
              <CourseCard
                title="Qaida Course – Adults"
                desc="Start Quran learning from the very basics of Arabic letters and sounds. This course builds a strong foundation and prepares you step by step for Quran reading. By the end of this course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-orange-500 hover:bg-orange-600"
              />

              <CourseCard
                title="Para Course – Adults"
                desc="For learners who can read a little and are ready to read from Paras. This course improves fluency and accuracy while strengthening Quran reading gradually. By the end of the course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-orange-500 hover:bg-orange-600"
              />

              <CourseCard
                title="Quran Course – Adults"
                desc="For learners who already read the Quran but want to improve correctness and Tajweed. This course focuses on proper pronunciation and refined Quran recitation. By the end of this course, you will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-orange-500 hover:bg-orange-600"
              />
            </div>
          </div>

          {/* RIGHT – Kids */}
          <div className="bg-[#f4fbf7] rounded-xl p-8">
            
            <h2 className="text-3xl font-semibold text-gray-700">
              Kids Courses
            </h2>

            <span className="inline-block mt-3 px-4 py-1 bg-white rounded-full text-sm font-semibold text-green-600 shadow">
              AGE: 6 TO 18 YEARS
            </span>

            <div className="mt-8 space-y-6">
              <CourseCard
                title="Qaida Course – Kids"
                desc="Start Quran learning from the very basics of Arabic letters and sounds. This course builds a strong foundation and prepares children step by step for Quran reading. By the end of this course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-green-700 hover:bg-green-800"
              />

              <CourseCard
                title="Para Course – Kids"
                desc="For children who can read a little and are ready to read from Paras. This course improves fluency and accuracy while strengthening Quran reading gradually. By the end of the course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-green-700 hover:bg-green-800"
              />

              <CourseCard
                title="Quran Course – Kids"
                desc="For children who already read the Quran but want to improve correctness and Tajweed. This course focuses on proper pronunciation and refined Quran recitation. By the end of this course, your child will be able to read the Quran-e-Pak correctly with Tajweed, In Sha Allah."
                btnColor="bg-green-700 hover:bg-green-800"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
