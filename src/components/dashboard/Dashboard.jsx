import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    image: "",
  });

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    video: "",
  });

  // ================= FETCH =================

  const fetchCourses = async () => {
    try {
      const url = user?.role === "admin" ? "/course/all" : "/mycourse";
      const { data } = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAdminData = async () => {
    try {
      const statsRes = await api.get("/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersRes = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCourses();
      if (user?.role === "admin") await fetchAdminData();
      setLoading(false);
    };
    loadData();
  }, [user]);

  // ================= ACTIONS =================

  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: newCourse.title,
        description: newCourse.description,
        category: newCourse.category,
        duration: Number(newCourse.duration),
        price: Number(newCourse.price),
        image: newCourse.image,
        createdBy: user._id,
      };

      await api.post("/course/new", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Course Created Successfully!");
      setNewCourse({
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        image: "",
      });
      setShowCreateForm(false);
      fetchCourses();
      if (user?.role === "admin") fetchAdminData();
    } catch (error) {
      alert("❌ Error creating course");
      console.error(error);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully");
      fetchCourses();
      if (user?.role === "admin") fetchAdminData();
    } catch (error) {
      alert("Error deleting course");
      console.error(error);
    }
  };

  const addLecture = async (courseId) => {
    if (!lectureData.title || !lectureData.video) {
      alert("Please fill in all lecture fields");
      return;
    }

    try {
      await api.post(`/course/${courseId}`, lectureData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Lecture Added Successfully!");
      setLectureData({ title: "", description: "", video: "" });
      setSelectedCourse(null);
      fetchCourses();
      if (user?.role === "admin") fetchAdminData();
    } catch (error) {
      alert("❌ Error adding lecture");
      console.error(error);
    }
  };

  const changeRole = async (id) => {
    if (!window.confirm("Change user role?")) return;
    try {
      await api.put(`/user/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UI =================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d3d34] to-[#1B5047] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {user?.role === "admin" ? "🎓 Admin Dashboard" : "📚 My Courses"}
                </h1>
                <p className="text-gray-300 text-base sm:text-lg">
                  Welcome back, <span className="text-yellow-400 font-semibold">{user?.name}</span>!
                </p>
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  {showCreateForm ? "Cancel" : "Create Course"}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Admin Stats */}
        {user?.role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <StatCard 
              label="Total Courses" 
              value={stats.totalCourses || 0} 
              icon="📚" 
              color="from-blue-500 to-blue-600"
            />
            <StatCard 
              label="Total Lectures" 
              value={stats.totalLectures || 0} 
              icon="🎥" 
              color="from-purple-500 to-purple-600"
            />
            <StatCard 
              label="Total Users" 
              value={stats.totalUsers || 0} 
              icon="👥" 
              color="from-green-500 to-green-600"
            />
          </div>
        )}

        {/* Create Course Form */}
        {user?.role === "admin" && showCreateForm && (
          <section className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl mb-8 sm:mb-12 animate-fadeIn">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>✨</span> Create New Course
            </h2>
            <form onSubmit={createCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <input
                  required
                  type="text"
                  placeholder="Category"
                  value={newCourse.category}
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                />
                <input
                  required
                  type="number"
                  placeholder="Duration (hours)"
                  value={newCourse.duration}
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                />
                <input
                  required
                  type="number"
                  placeholder="Price (₹)"
                  value={newCourse.price}
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                />
              </div>
              <textarea
                required
                placeholder="Course Description"
                value={newCourse.description}
                rows="3"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none"
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
              <input
                required
                type="url"
                placeholder="Thumbnail Image URL"
                value={newCourse.image}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
              >
                🚀 Create Course
              </button>
            </form>
          </section>
        )}

        {/* Courses Grid */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📖</span> 
            {user?.role === "admin" ? "All Courses" : "My Enrolled Courses"}
          </h2>
          
          {courses.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center">
              <p className="text-gray-300 text-lg mb-4">No courses available</p>
              {user?.role === "admin" && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Create Your First Course
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course) => (
                <div 
                  key={course._id} 
                  className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:scale-105"
                >
                  {/* Course Image */}
                  {course.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        ₹{course.price}
                      </div>
                    </div>
                  )}

                  {/* Course Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-lg sm:text-xl text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        ⏱️ {course.duration}h
                      </span>
                      <span className="flex items-center gap-1">
                        📂 {course.category}
                      </span>
                    </div>

                    {/* Student Actions */}
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => navigate(`/course-study/${course._id}`)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                      >
                        Continue Learning →
                      </button>
                    )}

                    {/* Admin Actions */}
                    {user?.role === "admin" && (
                      <div className="space-y-3">
                        {selectedCourse === course._id ? (
                          <div className="space-y-2 animate-fadeIn">
                            <input
                              placeholder="Lecture Title"
                              value={lectureData.title}
                              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              onChange={(e) => setLectureData({ ...lectureData, title: e.target.value })}
                            />
                            <input
                              placeholder="Description"
                              value={lectureData.description}
                              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              onChange={(e) => setLectureData({ ...lectureData, description: e.target.value })}
                            />
                            <input
                              placeholder="Video URL"
                              value={lectureData.video}
                              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              onChange={(e) => setLectureData({ ...lectureData, video: e.target.value })}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => addLecture(course._id)}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold transition-all"
                              >
                                ✓ Add
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCourse(null);
                                  setLectureData({ title: "", description: "", video: "" });
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-semibold transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedCourse(course._id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all"
                          >
                            + Add Lecture
                          </button>
                        )}
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/lectures/${course._id}`)}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2.5 rounded-lg font-semibold text-sm transition-all"
                          >
                            ⚙️ Manage
                          </button>
                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Manage Users - Admin Only */}
        {user?.role === "admin" && users.length > 0 && (
          <section className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>👥</span> Manage Users
            </h2>
            <div className="space-y-3">
              {users.map((u) => (
                <div 
                  key={u._id} 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base sm:text-lg">{u.name}</p>
                      <p className="text-sm text-gray-400">{u.email}</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin" 
                          ? "bg-red-500/20 text-red-300" 
                          : "bg-blue-500/20 text-blue-300"
                      }`}>
                        {u.role}
                      </span>
                    </div>
                  </div>
                  {user?.mainrole === "superadmin" && (
                    <button
                      onClick={() => changeRole(u._id)}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg"
                    >
                      Change Role
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({ label, value, icon, color }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${color} rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl sm:text-5xl">{icon}</span>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">📊</span>
        </div>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">{value}</h2>
      <p className="text-white/80 text-sm sm:text-base font-semibold">{label}</p>
    </div>
  </div>
);

export default Dashboard;