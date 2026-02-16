import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(null);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/login");
    }
  }, [countdown, navigate]);

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
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
        } else if (value !== password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    const error = validateField("password", value);
    setErrors(prev => ({
      ...prev,
      password: error,
    }));

    // Re-validate confirmPassword
    if (confirmPassword) {
      const confirmError = value !== confirmPassword ? "Passwords do not match" : "";
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    const error = validateField("confirmPassword", value);
    setErrors(prev => ({
      ...prev,
      confirmPassword: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const passwordError = validateField("password", password);
    const confirmError = validateField("confirmPassword", confirmPassword);

    if (passwordError || confirmError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmError,
      });
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const { data } = await api.post(`/user/reset/${token}`, { password });

      setMessage(data.message || "Password reset successful!");
      setPassword("");
      setConfirmPassword("");
      setCountdown(3); // Start 3 second countdown

    } catch (err) {
      setErrors({ 
        submit: err.response?.data?.message || "Invalid or expired reset link" 
      });
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

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Create a new secure password for your account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Success Message with Countdown */}
          {message && (
            <div className="mb-6 bg-green-500/20 border border-green-500 rounded-xl p-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                <div className="flex-1">
                  <p className="text-green-200 text-sm font-medium mb-2">{message}</p>
                  {countdown !== null && (
                    <div className="bg-green-600/30 rounded-lg p-3">
                      <p className="text-green-300 text-xs text-center">
                        Redirecting to login in {countdown} seconds...
                      </p>
                      <div className="mt-2 w-full bg-green-900/30 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-green-400 h-full transition-all duration-1000"
                          style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 bg-red-500/20 border border-red-500 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-red-200 text-sm font-medium">{errors.submit}</p>
                <p className="text-red-300 text-xs mt-1">
                  Please request a new password reset link
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* New Password Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
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
              {password && (
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
              {password && (
                <div className="mt-3 space-y-1">
                  <p className={`text-xs flex items-center gap-2 ${
                    password.length >= 6 ? "text-green-400" : "text-gray-400"
                  }`}>
                    {password.length >= 6 ? "✓" : "○"} At least 6 characters
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*[a-z])/.test(password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*[a-z])/.test(password) ? "✓" : "○"} One lowercase letter
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*[A-Z])/.test(password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*[A-Z])/.test(password) ? "✓" : "○"} One uppercase letter
                  </p>
                  <p className={`text-xs flex items-center gap-2 ${
                    /(?=.*\d)/.test(password) ? "text-green-400" : "text-gray-400"
                  }`}>
                    {/(?=.*\d)/.test(password) ? "✓" : "○"} One number
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
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
              {confirmPassword && !errors.confirmPassword && (
                <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                  <span>✓</span> Passwords match
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || errors.password || errors.confirmPassword || !password || !confirmPassword || countdown !== null}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  Updating Password...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🔒</span> Update Password
                </span>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-400">
                  Remember your password?
                </span>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors text-sm"
              >
                <span>←</span> Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <span>🔒</span> Your new password is securely encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;