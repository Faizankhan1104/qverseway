import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
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
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });

    // Re-validate confirmPassword if password changes
    if (name === "password" && formData.confirmPassword) {
      const confirmError = value !== formData.confirmPassword ? "Passwords do not match" : "";
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/user/register", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (response.status === 201 || response.status === 200) {
        const { activationToken } = response.data;
        navigate("/verify-email", { 
          state: { 
            email: formData.email.trim().toLowerCase(), 
            activationToken 
          } 
        });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrors({ submit: err.response.data.message });
      } else {
        setErrors({ submit: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
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
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Start your learning journey today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 bg-red-500/20 border border-red-500 rounded-xl p-4 flex items-start gap-3">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-red-200 text-sm">{errors.submit}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-white/20"
                } text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-white/20"
                } text-white placeholder-gray-400 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border ${
                    errors.password ? "border-red-500" : "border-white/20"
                  } text-white placeholder-gray-400 p-3 sm:p-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.label === "Weak" ? "text-red-400" :
                      passwordStrength.label === "Medium" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {errors.password}
                </p>
              )}
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-1">
                  <p className={`text-xs flex items-center gap-2 ${
                    formData.password.length >= 6 ? "text-green-400" : "text-gray-400"
                  }`}>
                    {formData.password.length >= 6 ? "✓" : "○"} At least 6 characters
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*[a-z])/.test(formData.password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*[a-z])/.test(formData.password) ? "✓" : "○"} One lowercase letter
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*[A-Z])/.test(formData.password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*[A-Z])/.test(formData.password) ? "✓" : "○"} One uppercase letter
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*\d)/.test(formData.password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*\d)/.test(formData.password) ? "✓" : "○"} One number
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border ${
                    errors.confirmPassword ? "border-red-500" : "border-white/20"
                  } text-white placeholder-gray-400 p-3 sm:p-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword && !errors.confirmPassword && (
                <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                  <span>✓</span> Passwords match
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;