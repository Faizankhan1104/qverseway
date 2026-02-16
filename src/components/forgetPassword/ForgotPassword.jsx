import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Email validation
  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
    setError(""); // Clear server error
    setMessage(""); // Clear success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await api.post("user/forgot", { 
        email: email.trim().toLowerCase() 
      });

      setMessage(data.message || "Password reset link sent to your email!");
      setEmail("");
      setEmailError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4">
            <span className="text-4xl">🔑</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            No worries! Enter your email and we'll send you reset instructions
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Success Message */}
          {message && (
            <div className="mb-6 bg-green-500/20 border border-green-500 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <div>
                <p className="text-green-200 text-sm font-medium">{message}</p>
                <p className="text-green-300 text-xs mt-1">
                  Check your email inbox and spam folder
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-white/10 border ${
                    emailError ? "border-red-500" : "border-white/20"
                  } text-white placeholder-gray-400 p-3 sm:p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all`}
                  placeholder="your.email@example.com"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  📧
                </span>
              </div>
              {emailError && (
                <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                  <span>❌</span> {emailError}
                </p>
              )}
              {email && !emailError && (
                <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                  <span>✓</span> Valid email
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || emailError || !email}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  Sending Link...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>📨</span> Send Reset Link
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

        {/* Help Section */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
            <span>💡</span> Need Help?
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 flex-shrink-0">•</span>
              <span>Check your spam/junk folder if you don't see the email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 flex-shrink-0">•</span>
              <span>The reset link expires in 15 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 flex-shrink-0">•</span>
              <span>Contact support if you continue to have issues</span>
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Still having trouble?{" "}
            <a 
              href="mailto:support@example.com" 
              className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;