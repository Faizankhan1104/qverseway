import React, { useState } from "react";
import api from "../../api/axios"; // Adjust path as needed

const ContactDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email";
        }
        break;

      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));

    // Clear success message when typing
    if (successMessage) setSuccessMessage("");
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
      setErrors({});

      // Send to backend
      const response = await api.post("/contact", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      });

      setSuccessMessage(
        response.data.message || "Thank you! Your message has been sent successfully."
      );
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white text-[#313E3B]">

      {/* Contact Section */}
      <div className="w-full flex justify-center py-12 sm:py-16 md:py-20 px-4">
        <div
          className="
            w-full max-w-7xl
            grid grid-cols-1 md:grid-cols-2
            gap-10 md:gap-16 lg:gap-20
          "
        >
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#3b4c48] mb-4 sm:mb-6">
              Get in Touch
            </h2>

            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-600">
              Feel free to reach out to us for any queries, course details or
              collaborations.
            </p>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-1">Address</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Unique Plaza Market<br />
                    Muzaffarnagar, UP
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-1">Phone</h4>
                  <a 
                    href="tel:+916396426161"
                    className="text-gray-600 hover:text-[#3b4c48] text-sm sm:text-base transition-colors"
                  >
                    +91 6396426161
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-1">Email</h4>
                  <a 
                    href="mailto:support@qverseway.com"
                    className="text-gray-600 hover:text-[#3b4c48] text-sm sm:text-base transition-colors"
                  >
                    support@qverseway.com
                  </a>
                </div>
              </div>

              {/* Social Links (Optional) */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-lg sm:text-xl mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#3b4c48] hover:text-white transition-all"
                  >
                    📘
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#3b4c48] hover:text-white transition-all"
                  >
                    📷
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#3b4c48] hover:text-white transition-all"
                  >
                    🐦
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#3b4c48] mb-6">
              Send Message
            </h2>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
                <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className={`
                    w-full border-b ${errors.name ? 'border-red-500' : 'border-gray-300'}
                    px-2 py-3 sm:py-4
                    bg-transparent
                    focus:outline-none focus:border-[#3b4c48]
                    transition-colors
                  `}
                />
                {errors.name && (
                  <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  className={`
                    w-full border-b ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    px-2 py-3 sm:py-4
                    bg-transparent
                    focus:outline-none focus:border-[#3b4c48]
                    transition-colors
                  `}
                />
                {errors.email && (
                  <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message *"
                  className={`
                    w-full border-b ${errors.message ? 'border-red-500' : 'border-gray-300'}
                    px-2 py-3 sm:py-4
                    bg-transparent resize-none
                    focus:outline-none focus:border-[#3b4c48]
                    transition-colors
                  `}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
                    <span>❌</span> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || Object.keys(errors).length > 0}
                className="
                  w-full bg-[#3b4c48] hover:bg-[#2f3f3a]
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                  text-white font-semibold
                  py-3 sm:py-4
                  rounded-lg
                  transition-all duration-300
                  shadow-md hover:shadow-lg
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500 text-center">
              * All fields are required
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[35vh] sm:h-[40vh] md:h-[45vh]">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83920521343!2d77.06889964491853!3d28.52758200556621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b8d0f6f6a9%3A0x8f28c69f8c5f7b7f!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactDetails;