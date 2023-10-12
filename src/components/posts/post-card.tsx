'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import { CardProps } from '../Card';
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

export default function PostCard({
  id,
  slug,
  title,
  date,
  cover,
  categories,
  index,
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
        <Tilt className="w-full rounded-2xl bg-secondary-base p-5 sm:w-[360px]">
          <Link
            href={`/${id}/${slug}`}
            className="group mx-auto flex max-w-[25rem] flex-col rounded-xl dark:shadow-black"
          >
            <div className="relative h-60 w-full overflow-hidden transition-all  duration-300 group-hover:scale-[1.09]">
              <Image
                src={cover}
                alt="cover image"
                fill
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            <div className="flex h-48 flex-col p-4">
              <h3 className="h-16 text-2xl font-bold text-primary-light">
                {title}
              </h3>
              <time className="mb-4 mt-2 pl-2 text-sm text-secondary-light">
                {date}
              </time>
              <CategoryList categories={categories} />
            </div>
          </Link>
        </Tilt>
      </CustomDiv>
    </motion.div>
  );
}

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   tags,
//   image,
//   source_code_link,
// }: projectCardProps) => {
//   return (
//     <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
//       <CustomDiv
//         options={{
//           max: 45,
//           scale: 1,
//           speed: 450,
//         }}
//       >
//         <Tilt className="w-full rounded-2xl bg-secondary-base p-5 sm:w-[360px]">
//           <div className="mx-auto flex max-w-[25rem] flex-col overflow-hidden transition-all duration-300 hover:scale-[1.05] dark:shadow-black">
//             <div className="relative h-[230px] w-full">
//               <Image
//                 src={image}
//                 alt={name}
//                 className="h-full w-full rounded-2xl object-cover"
//               />
//               <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
//                 <div
//                   onClick={() => window.open(source_code_link, '_blank')}
//                   className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
//                 >
//                   <Image
//                     src={github}
//                     alt="github"
//                     className="h-1/2 w-1/2 object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="mt-5">
//               <h3 className="text-[24px] font-bold text-primary-light">
//                 {name}
//               </h3>
//               <p className="mt-2 text-[14px] text-secondary-light">
//                 {description}
//               </p>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {tags.map((tag: { name: string; color: string }) => (
//                 <p key={tag.name} className={`text-[14px] ${tag.color}`}></p>
//               ))}
//             </div>
//           </div>
//         </Tilt>
//       </CustomDiv>
//     </motion.div>
//   );
// };
