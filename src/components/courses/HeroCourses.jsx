import React from 'react'
import HeroImage from "../../../public/images/heroBg.png";
import image1 from "../../../public/images/image1.png";

const HeroCourses = () => {
    return (
        <header className='relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[50vh] overflow-hidden'>

            {/* Background Image */}
            <img
                src={HeroImage}
                className='w-full h-full object-cover'
                alt=""
            />

            {/* Overlay Content */}
            <div className='absolute top-0 left-0 pt-6 sm:pt-8 md:pt-10 w-full h-full flex flex-col md:flex-row justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-24 items-center text-white px-4 sm:px-6 md:px-8'>

                <div className='text-center md:text-left'>
                    <p className='my-3 sm:my-4 md:my-6 text-base sm:text-lg md:text-xl font-medium text-[#f3ff44]'>
                        Our Online Courses
                    </p>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-space)] leading-tight'>
                        Best Learning <br /> training classes.
                    </h1>
                </div>

                {/* Right Image Wrapper */}
                <div className='h-1/2 sm:h-3/5 md:h-full overflow-hidden'>
                    <img
                        className='h-full md:h-[50vh] lg:h-[70vh] object-cover'
                        src={image1}
                        alt=""
                    />
                </div>

            </div>
        </header>
    )
}

export default HeroCourses