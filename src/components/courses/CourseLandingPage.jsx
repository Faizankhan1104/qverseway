// pages/basic/Basic.jsx - COMPLETE FILE

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import Feedback from "../home/Feedback";

const CourseLandingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Use Redux for user data
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const isAdmin = user?.role === "admin";

  console.log("=== COURSE LANDING DEBUG ===");
  console.log("User:", user);
  console.log("Is Admin:", isAdmin);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("==========================");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/course/${id}`);
        setCourse(data.course);

        // ✅ Check if user has purchased
        if (isAuthenticated && !isAdmin) {
          const res = await api.get("/mycourse");
          const purchasedIds = res.data.courses.map(c => c._id);
          const purchased = purchasedIds.includes(data.course._id);
          setHasPurchased(purchased);

          console.log("Has purchased:", purchased);
          console.log("User subscriptions:", purchasedIds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, isAuthenticated, isAdmin]);

  const handlePayNow = async () => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", `/course/${course._id}`);
      navigate("/login");
      return;
    }

    try {
      setPaying(true);

      const { data } = await api.post(`/course/checkout/${course._id}`);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment";

      for (let key in data) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const handleStartLearning = () => {
    console.log("Navigating to lectures:", `/lectures/${course._id}`);
    navigate(`/lectures/${course._id}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading Course...
      </div>
    );
  }

  if (!course) {
    return <div className="text-center py-20">Course not found</div>;
  }

  return (
    <div className="w-full">

      <section className="bg-[#12574B] py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

          {/* Video Section - Shows first on mobile, second on desktop */}
          <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow order-1 md:order-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Introduction to Course
            </h3>

            <iframe
              className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] rounded-xl"
              src="https://www.youtube.com/embed/kQKrmDLvijo"
              allowFullScreen
            />
          </div>

          {/* Course Details Section - Shows second on mobile, first on desktop */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4 order-2 md:order-1">

            <h4 className="font-semibold text-base sm:text-lg">{course.title}</h4>

            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li className="text-base sm:text-lg md:text-xl p-3 sm:p-4 border-b">▶ Introduction to Course</li>
              <li className="text-base sm:text-lg md:text-xl p-3 sm:p-4 border-b">📝 Quiz</li>
              <li className="text-base sm:text-lg md:text-xl p-3 sm:p-4 border-b">🎥 Live Classes</li>
              <li className="text-base sm:text-lg md:text-xl p-3 sm:p-4 border-b mb-6 sm:mb-10">💬 Ask Teacher</li>
            </ul>

            {isAdmin ? (
              <button
                onClick={() => navigate(`/admin/course/${course._id}`)}
                className="w-full bg-[#064E3B] hover:bg-[#044332] py-2.5 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base"
              >
                Manage Course
              </button>
            ) : hasPurchased ? (
              <button
                onClick={handleStartLearning}
                className="w-full bg-[#3b4c48] py-2.5 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base"
              >
                Start Learning
              </button>
            ) : (
              <>
                <span className="inline-block bg-green-900 text-white rounded px-2 py-1 text-xs sm:text-sm mb-2">
                  One Time
                </span>
                <button
                  onClick={handlePayNow}
                  disabled={paying}
                  className="w-full bg-yellow-400 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
                >
                  Buy This Course ₹{course.price}
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl space-y-4 shadow">
            <p>✔ Course Validity: 6 Months</p>
            <p>✔ Course Duration: {course.duration} Hours</p>
            <p>✔ Video Lectures</p>
            <p>✔ Quizzes & Homework</p>
            <p>✔ Live Teacher Support</p>
            <p>✔ Certification</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Course Details</h3>
            <p className="text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          {isAdmin ? (
            <button
              onClick={handleStartLearning}
              className="w-full bg-[#064E3B] text-white py-4 rounded-xl text-xl font-semibold hover:bg-[#044332] transition"
            >
              Manage Course (Admin)
            </button>
          ) : hasPurchased ? (
            <button
              onClick={handleStartLearning}
              className="w-full bg-[#3b4c48] text-white py-4 rounded-xl text-xl font-semibold hover:bg-green-800 transition"
            >
              Continue Learning →
            </button>
          ) : (
            <>
              <span className="bg-green-900 text-white rounded px-4 ">One Time</span>
              <button
                onClick={handlePayNow}
                disabled={paying}
                className="w-full bg-green-700 text-white py-4 rounded-xl text-xl font-semibold hover:bg-green-800 transition disabled:bg-gray-400"
              >
                {paying ? "Redirecting to Payment..." : `BUY NOW ₹${course.price}`}
              </button>
            </>
          )}
        </div>
      </section>

      <section className="bg-[#eef6fb]">
        <Feedback />
      </section>
    </div>
  );
};

export default CourseLandingPage;
