import { Link } from "react-router-dom";
import img1 from "../../../public/images/FooterBg.png";

const Footer = () => {
  return (
    <footer
      className="
        relative w-full text-white
        bg-center bg-cover bg-no-repeat
        bottom-0 
      "
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dc8yb35h0/image/upload/v1770973083/Untitled_design_6_dluvpw.png')",
      }}
    >
      {/* Overlay (LIGHTER so image is visible) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-10
            text-center sm:text-left
          "
        >
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold mb-4">QVerseWay</h1>
            <p className="text-sm sm:text-base text-[#cfd7d4] leading-relaxed">
              We provide high-quality online courses to help you grow your
              skills and build your career.
            </p>

            <div className="mt-5 flex justify-center sm:justify-start gap-4 text-lg font-semibold">
              <Link to="https://www.instagram.com/qverseway?igsh=MW00NHR3eDZocmFoaA==" className="cursor-pointer hover:text-white">Fb</Link>
              <Link to="https://www.instagram.com/qverseway?igsh=MW00NHR3eDZocmFoaA==" className="cursor-pointer hover:text-white">Ig</Link>
              <Link to="https://youtube.com/@qverseway?si=wEMG2VRbm_nOw5kM" className="cursor-pointer hover:text-white">Yt</Link>
              <Link className="cursor-pointer hover:text-white">Be</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm sm:text-base text-[#cfd7d4]">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link to="/student" className="hover:text-white">My Dashboard</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Legal</h2>
            <ul className="space-y-2 text-sm sm:text-base text-[#cfd7d4]">
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="text-sm">Call us:</p>
            <p className="text-[#cfd7d4] mb-3">+91 6396426161</p>

            <p className="text-sm">Email:</p>
            <p className="text-[#cfd7d4]">support@qverseway.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10"></div>

        {/* Bottom */}
        <div className="text-center text-xs sm:text-sm mt-6 text-[#cfd7d4]">
          © {new Date().getFullYear()} QVerseWay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
