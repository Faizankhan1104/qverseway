import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../api/axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data received from Register page
  const { email, activationToken } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Countdown timer for redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/login");
    }
  }, [countdown, navigate]);

  // Safety check
  if (!email || !activationToken) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Invalid Link</h2>
          <p className="text-gray-300 mb-6">
            This verification link is invalid or has expired. Please register again.
          </p>
          <Link
            to="/register"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-full transition-all"
          >
            Back to Register
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    
    if (pastedData.every(char => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      
      // Focus last filled input
      const lastIndex = Math.min(pastedData.length, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      return setError("Please enter complete 6-digit OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/user/verify", {
        otp: Number(otpString),
        activationToken,
      });

      if (res.status === 200) {
        setSuccess(true);
        setCountdown(3); // Start 3 second countdown
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      setError("");

      // Call your resend OTP endpoint
      await api.post("/user/resend-otp", { email });
      
      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      alert("OTP resent successfully! Check your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3d34] via-[#1B5047] to-[#0a2e27] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4">
            <span className="text-4xl">✉️</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            We've sent a 6-digit code to
          </p>
          <p className="text-yellow-400 font-semibold text-base sm:text-lg mt-1">
            {email}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Success Message with Countdown */}
          {success && countdown !== null && (
            <div className="mb-6 bg-green-500/20 border border-green-500 rounded-xl p-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                <div className="flex-1">
                  <p className="text-green-200 text-sm font-medium mb-2">
                    Email verified successfully!
                  </p>
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
                </div>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* OTP Input Boxes */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-white text-center">
                Enter 6-Digit Code
              </label>
              <div className="flex gap-2 sm:gap-3 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-white/10 border-2 border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success || otp.some(digit => !digit)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  Verifying...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <span>✓</span> Verified!
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors text-sm"
            >
              <span>←</span> Back to Login
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-2">
            💡 <strong className="text-gray-300">Tip:</strong> Check your spam folder if you don't see the email
          </p>
          <p className="text-xs text-gray-400">
            The OTP is valid for 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;