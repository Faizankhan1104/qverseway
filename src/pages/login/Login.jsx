import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
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
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const error = validateField("email", value);
    setErrors(prev => ({
      ...prev,
      email: error,
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    const error = validateField("password", value);
    setErrors(prev => ({
      ...prev,
      password: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await api.post("/user/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.status === 200) {
        // Save user + token in Redux
        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.token,
          })
        );

        // Redirect logic
        const redirect = localStorage.getItem("redirectAfterLogin");

        if (redirect) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirect);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setErrors({ 
        submit: err.response?.data?.message || "Login failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Login to continue your learning journey
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
            
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
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
              {email && !errors.email && (
                <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                  <span>✓</span> Valid email
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
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full bg-white/10 border ${
                    errors.password ? "border-red-500" : "border-white/20"
                  } text-white placeholder-gray-400 p-3 sm:p-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || errors.email || errors.password}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-400">
                  New to our platform?
                </span>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-300 mt-4">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <span>🔒</span> Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;