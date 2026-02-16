import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/916396426161?text=Hello%20I%20want%20to%20know%20about%20your%20course"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed 
        bottom-4 right-4 
        sm:bottom-8 sm:right-10
        z-50
        flex items-center justify-center
        w-14 h-14 sm:w-16 sm:h-16
        bg-green-500 hover:bg-green-600
        text-white
        rounded-full
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-2xl sm:text-3xl" />
    </a>
  );
};

export default WhatsAppFloat;
