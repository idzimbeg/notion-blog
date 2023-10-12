'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import { utils } from '@/assets';
import CategoryList from '@/components/category-list';
import { fadeIn } from '@/utils';

interface optionProps {
  max: number;
  scale: number;
  speed: number;
}

interface CustomDivProps {
  options: optionProps;
  children: ReactNode;
  className?: string;
}
const CustomDiv = ({ options, children, ...rest }: CustomDivProps) => (
  <div {...rest}>{children}</div>
);

export interface CardProps {
  id: string;
  index: number;
  title?: string;
  date?: string;
  slug: string;
  description?: string;
  categories: string[];
  source_code_link?: string;
  options?: optionProps;
  cover: string;
  published?: boolean;
  lastEditedAt?: number;
}
interface optionProps {
  max: number;
  scale: number;
  speed: number;
}

interface CustomDivProps {
  options: optionProps;
  children: ReactNode;
  className?: string;
}

export default function Card({
  id,
  slug,
  title,
  date,
  categories,
  index,
  description,
  cover,
  source_code_link,
}: CardProps) {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <CustomDiv
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
      >
        <Tilt className="w-full rounded-2xl bg-secondary-base/30 p-5 shadow-card backdrop-blur-sm sm:w-[360px]">
          <Link
            href={source_code_link ? `/projects/${slug}` : `/blog/${slug}`}
            className="group mx-auto flex max-w-[25rem] flex-col rounded-xl dark:shadow-black"
          >
            <div className="relative h-60 w-full overflow-hidden transition-all duration-300 group-hover:scale-[1.09]">
              <Image
                src={cover}
                alt={`${title} image`}
                fill
                className="h-full w-full rounded-2xl object-cover"
              />
              {source_code_link && (
                <div className="card-img_hover absolute inset-0 z-20 m-3 flex justify-end">
                  <div
                    onClick={() => window.open(source_code_link, '_blank')}
                    className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                  >
                    <Image
                      src={utils.github}
                      alt="github"
                      height={30}
                      width={30}
                      className="h-1/2 w-1/2 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-48 flex-col p-4">
              <h3 className="h-16 text-2xl font-bold text-secondary-base dark:text-primary-light">
                {title}
              </h3>
              {!description ? (
                <time className="mb-4 mt-2 pl-2 text-sm text-secondary-base dark:text-secondary-light">
                  {date}
                </time>
              ) : (
                <p className="mb-4 mt-2 pl-2 text-sm text-secondary-base dark:text-secondary-light">
                  {description}
                </p>
              )}
              <CategoryList categories={categories} />
            </div>
          </Link>
        </Tilt>
      </CustomDiv>
    </motion.div>
  );
}
