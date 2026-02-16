import { Link } from "react-router-dom";
import image1 from "../../../public/images/image2.png";

const CTASection = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-16 text-[#313E3B]">

      {/* TOP CONTENT */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* IMAGE */}
        <div className="w-full lg:w-1/2">
          <img
            src={image1}
            alt="Learning"
            className="w-full rounded-xl"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="w-full lg:w-1/2">
          <h4 className="text-lg md:text-xl font-medium">
            Premium learning experience
          </h4>

          <h1 className="text-3xl md:text-5xl lg:text-6xl py-4 font-bold leading-tight">
            Providing amazing <br className="hidden md:block" />
            online courses.
          </h1>

          <div className="bg-green-50 w-full md:w-3/4 rounded-l-lg">
            <div className="p-6 md:p-7">
              <h1 className="text-lg md:text-xl py-4">
                Master the skills that matter to you
              </h1>

              <h2 className="text-base md:text-lg py-2">
                Web-based training you can consume at your own pace.
              </h2>

              <h1 className="text-base md:text-lg py-1 font-semibold">
                Connect with effective methods
              </h1>

              <h1 className="text-base md:text-lg py-1 mb-10 font-semibold">
                Increase your learning skills
              </h1>
              <Link to="/course" className="py-3 px-6 mt-20 rounded-full text-white  bg-[#2b3835] hover:opacity-90 transition">
                Explore Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="w-full flex justify-center items-center mt-20">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center font-semibold">
          Online learning wherever and whenever.
        </h2>
      </div>

      {/* YOUTUBE VIDEO - LAST */}
      <div className="w-full flex justify-center mt-16">
        <div className="w-full md:w-4/5 lg:w-3/4 aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Course Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

    </section>
  );
};

export default CTASection;
