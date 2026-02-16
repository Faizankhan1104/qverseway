import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api/axios";

const Student = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // ===============================
  // FETCH COURSES
  // ===============================
  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/mycourse", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(data.courses || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCourses();
  }, [token]);

  // ===============================
  // PASSWORD VALIDATION
  // ===============================
  const validatePassword = (name, value) => {
    let error = "";

    switch (name) {
      case "currentPassword":
        if (!value) error = "Current password is required";
        break;

      case "newPassword":
        if (!value) {
          error = "New password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!/(?=.*[a-z])/.test(value)) {
          error = "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(value)) {
          error = "Password must contain at least one number";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== passwordForm.newPassword) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validatePassword(name, value);
    setPasswordErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Re-validate confirmPassword if newPassword changes
    if (name === "newPassword" && passwordForm.confirmPassword) {
      const confirmError = value !== passwordForm.confirmPassword ? "Passwords do not match" : "";
      setPasswordErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  // ===============================
  // CHANGE PASSWORD
  // ===============================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(passwordForm).forEach(key => {
      const error = validatePassword(key, passwordForm[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setPasswordErrors(newErrors);
      return;
    }

    try {
      const { data } = await api.post("/user/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(data.message || "Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setPasswordErrors({});
    } catch (err) {
      setPasswordErrors({ 
        submit: err.response?.data?.message || "Failed to change password" 
      });
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-20 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              My Learning Dashboard
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base">
              Welcome back, <span className="font-semibold text-yellow-300">{user?.name}</span>!
            </p>
          </div>
          
          <button
            onClick={() => setShowPasswordModal(true)}
            className="group bg-white hover:bg-yellow-400 text-emerald-700 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span className="text-xl">🔒</span>
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPasswordModal(false);
              setPasswordErrors({});
            }
          }}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span>🔐</span> Change Password
              </h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordErrors({});
                }}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            {/* Submit Error */}
            {passwordErrors.submit && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <p className="text-red-700 text-sm">{passwordErrors.submit}</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password *
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordFormChange}
                  className={`w-full border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  placeholder="Enter current password"
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  className={`w-full border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  placeholder="Enter new password (min 6 characters)"
                />
                
                {/* Password Strength */}
                {passwordForm.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-semibold ${
                        passwordStrength.label === "Weak" ? "text-red-500" :
                        passwordStrength.label === "Medium" ? "text-yellow-500" :
                        "text-green-500"
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}

                {passwordErrors.newPassword && (
                  <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {passwordErrors.newPassword}
                  </p>
                )}

                {/* Password Requirements */}
                {passwordForm.newPassword && (
                  <div className="mt-3 space-y-1">
                    <p className={`text-xs flex items-center gap-2 ${
                      passwordForm.newPassword.length >= 6 ? "text-green-500" : "text-gray-400"
                    }`}>
                      {passwordForm.newPassword.length >= 6 ? "✓" : "○"} At least 6 characters
                    </p>
                    <p className={`text-xs flex items-center gap-2 ${
                      /(?=.*[a-z])/.test(passwordForm.newPassword) ? "text-green-500" : "text-gray-400"
                    }`}>
                      {/(?=.*[a-z])/.test(passwordForm.newPassword) ? "✓" : "○"} One lowercase letter
                    </p>
                    <p className={`text-xs flex items-center gap-2 ${
                      /(?=.*[A-Z])/.test(passwordForm.newPassword) ? "text-green-500" : "text-gray-400"
                    }`}>
                      {/(?=.*[A-Z])/.test(passwordForm.newPassword) ? "✓" : "○"} One uppercase letter
                    </p>
                    <p className={`text-xs flex items-center gap-2 ${
                      /(?=.*\d)/.test(passwordForm.newPassword) ? "text-green-500" : "text-gray-400"
                    }`}>
                      {/(?=.*\d)/.test(passwordForm.newPassword) ? "✓" : "○"} One number
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  className={`w-full border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                  placeholder="Confirm new password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {passwordErrors.confirmPassword}
                  </p>
                )}
                {passwordForm.confirmPassword && !passwordErrors.confirmPassword && (
                  <p className="mt-1 text-green-500 text-xs flex items-center gap-1">
                    <span>✓</span> Passwords match
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordErrors({});
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={Object.keys(passwordErrors).some(key => key !== 'submit' && passwordErrors[key])}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed shadow-lg"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            My Enrolled Courses
          </h2>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your courses...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                {/* Course Image */}
                {course.image && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                    {course.description}
                  </p>

                  <div className="h-0.5 w-full bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-full mb-4"></div>

                  <button
                    onClick={() => navigate(`/course-study/${course._id}`)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Continue Learning</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your learning journey by enrolling in our comprehensive Quranic courses
            </p>
            <button
              onClick={() => navigate('/course')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;