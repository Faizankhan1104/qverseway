import HeroSection from "../../components/home/HeroSection";
import FeatureSection from "../../components/home/FeatureSection";
import CourseSection from "../../components/home/CourseSection";
import CTASection from "../../components/home/CTASection";
import Feedback from "../../components/home/Feedback";
import ExploreRange from "../../components/exploreRange/ExploreRange";
import CoursesSection from "../../components/courses/CoursesSection";
import AboutClasses from "../../components/about/AboutClasses";
import FeaturesSection from "../../components/exploreRange/FeaturesSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CourseSection />
      <AboutClasses />
      <CoursesSection />
      <FeaturesSection />
      <ExploreRange />
      <CTASection />
      <Feedback />
    </>       
  );
};

export default Home;
