import React from 'react'
import HeroAbout from '../../components/about/HeroAbout'
import AboutClasses from '../../components/about/AboutClasses'
import CourseBrief from '../../components/about/CourseBrief'
import Achivements from '../../components/about/Achivements'

const About = () => {
  return (
    <>
      <HeroAbout />
      <AboutClasses />
      <CourseBrief />
      {/* <Achivements /> */}
    </>
  )
}

export default About