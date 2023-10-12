'use client';

import { motion } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';

import Blog from './blog/page';
import Contact from './contact/page';
import Hero from './hero/Hero';
import { ComputersCanvas, StarsCanvas } from '@/components/canvas';
import Navbar from '@/components/navbar/Navbar';
import { getAllPostsFromNotion } from '@/services/posts';
import { styles } from '@/styles';

export const metadata = {
  title: 'Welcome | Workshop',
};

const HomePage = () => {
  // const allPosts = await getAllPostsFromNotion();

  return (
    <>
      <BrowserRouter>
        <div
          className={`${styles.bgImage} relative h-full w-full p-0 after:absolute after:inset-0 after:z-0 after:h-full after:w-full after:p-0`}
        >
          <Hero />
        </div>
        {/* <Navbar /> */}
        {/* <div className="relative h-screen w-full">
          <div
            className={`${styles.bgImage} absolute inset-0 z-0 mx-0 h-full w-full`}
          >
            <Hero />
          </div>
        </div> */}
        {/* <About />
      <Experience />
      <Tech /> */}
        {/* <Projects allPosts={allPosts} /> */}
        {/* <Feedbacks /> */}
        {/* <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div> */}
      </BrowserRouter>
    </>
  );
};
export default HomePage;
