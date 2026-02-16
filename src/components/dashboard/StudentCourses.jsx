import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentCourses = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const { data } = await api.get("/mycourse");
      setCourses(data.courses || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">My Courses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses enrolled</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-white rounded shadow">
              <img
                src={course.image}
                className="h-48 w-full object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>

                <button
                  onClick={() => navigate(`/lectures/${course._id}`)}
                  className="mt-4 w-full bg-[#01211e] text-white py-2 rounded"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentCourses;
