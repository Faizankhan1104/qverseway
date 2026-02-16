import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Content */}
      <main className="">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
