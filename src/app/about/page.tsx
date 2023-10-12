'use client';

import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import { styles } from '../../styles';
import { services } from '@/constants';
import { SectionWrapper } from '@/hoc';
import { fadeIn, textVariant } from '@/utils';

export const metadata = {
  title: 'About',
  description: 'This is about page.',
};

interface ServiceCardProps {
  index: number;
  title: string;
  icon: StaticImageData;
}

interface CustomDivProps {
  options: optionProps;
  children: ReactNode;
  className?: string;
}
interface optionProps {
  max: number;
  scale: number;
  speed: number;
}

const CustomDiv = ({ options, children, ...rest }: CustomDivProps) => (
  <div {...rest}>{children}</div>
);

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => (
  <Tilt className="w-full xs:w-[250px]">
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className="green-pink-gradient w-full rounded-[20px] p-[1px] shadow-card"
    >
      <CustomDiv
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-secondary-base px-12 py-5"
      >
        <Image
          src={icon}
          alt="web-development"
          className="h-16 w-16 object-contain"
        />

        <h3 className="text-center text-[20px] font-bold text-primary-light">
          {title}
        </h3>
      </CustomDiv>
    </motion.div>
  </Tilt>
);

const AboutPage = () => {
  return (
    <>
      <motion.div variants={textVariant(1)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('up', '', 0, 0.75)}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary-dark dark:text-secondary-light"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        inventore mollitia totam explicabo laboriosam delectus, minima a culpa
        illum corporis aperiam laborum aspernatur cum? Doloremque laudantium
        dolorum nobis ea qui.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(AboutPage, 'about');
