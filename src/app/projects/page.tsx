import Image, { StaticImageData } from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import { utils } from '@/assets';
import { CardProps } from '@/components/Card';
import Card from '@/components/Card/Card';
import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { experiences, projects } from '@/constants';
import { getAllProjectsFromNotion } from '@/services/projects';
import { fadeIn, textVariant, toUniqueArray } from '@/utils';

export const metadata = {
  title: 'Projects',
  description: 'This is projects page.',
};

// const ExperienceCard = ({ experience }: any) => {
//   return (
//     <VerticalTimelineElement
//       contentStyle={{ background: '#1d1836', color: '#925eff' }}
//       contentArrowStyle={{ borderRight: '7px solid #232632' }}
//       date={experience.date}
//       iconClassName="bg-secondary-base"
//       // iconStyle={{ background: experience.iconBg }}
//       icon={
//         <div className="flex h-full w-full items-center justify-center">
//           <Image
//             src={experience.icon}
//             alt={experience.title}
//             className="w-[60p%]e h-[60%] object-contain"
//           />
//         </div>
//       }
//     >
//       <div>
//         <h3 className="text-[24px] font-bold text-white">{experience.title}</h3>
//         <p
//           className="text-[16px] font-semibold text-secondary-light"
//           style={{ margin: 0 }}
//         >
//           {experience.company_name}
//         </p>
//       </div>
//       <ul className="ml-5 mt-5 list-disc space-y-2">
//         {experience.points.map((desc: any, index: any) => (
//           <li
//             key={index}
//             className="pl-1 text-[14px] tracking-wider text-primary-light"
//           >
//             {desc}
//           </li>
//         ))}
//       </ul>
//     </VerticalTimelineElement>
//   );
// };

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
// <Tilt className="w-full rounded-2xl bg-secondary-base p-5 sm:w-[360px]">
//   <div className="group mx-auto flex max-w-[25rem] flex-col dark:shadow-black">
//     <div className="relative h-60 w-full overflow-hidden transition-all duration-300 group-hover:scale-[1.09]">
//       <Image
//         src={image}
//         alt={name}
//         fill
//         className="h-full w-full rounded-2xl object-cover"
//       />
//       <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
//         <div
//           onClick={() => window.open(source_code_link, '_blank')}
//           className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
//         >
//           <Image
//             src={utils.github}
//             alt="github"
//             className="h-1/2 w-1/2 object-contain"
//           />
//         </div>
//       </div>
//     </div>
//     <div className="mt-1 h-48 p-4">
//       <h3 className="text-2xl font-bold text-primary-light">{name}</h3>
//       <p className="mt-2 text-sm text-secondary-light">{description}</p>
//     </div>

//     <div className="mt-4 flex flex-wrap gap-2">
//       {tags?.map((tag: { name: string; color: string }) => (
//         <p key={tag.name} className={`text-sm ${tag.color}`}></p>
//       ))}
//     </div>
//   </div>
// </Tilt>
//       </CustomDiv>
//     </motion.div>
//   );
// };

const ProjectsPage = async () => {
  const allProjects = await getAllProjectsFromNotion();
  const allCategories = toUniqueArray(
    allProjects
      .filter((project) => project.categories)
      .map((project) => project.categories)
      .flat()
  ).sort();

  return (
    <div className="container mx-auto">
      <section className="space-y-8md:mt-20 mb-16 mt-0">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allProjects} />
    </div>
  );

  // return (
  // <div>
  //   {posts && posts.length ? (
  //     <ul
  //       id="posts-grid"
  //       className="grid w-full grid-cols-1 gap-x-8 gap-y-32 md:grid-cols-2 xl:grid-cols-3"
  //     >
  //       {posts.map(
  //         (post) =>
  //           !post.slug && (
  //             <li key={post.slug}>
  //               <ProjectCard
  //                 index={0}
  //                 name={post.title}
  //                 description={post.slug}
  //                 tags={ }
  //                 image={ }
  //                 source_code_link={ }

  //               />
  //             </li>
  //           )
  //       )}
  //     </ul>
  //   ) : (
  //     <p className="mt-10 text-center text-lg">No matching posts found</p>
  //   )}
  // </div>
  //   <>
  //     <motion.div variants={textVariant(0)}>
  //       <p className={styles.sectionSubText}>Experience</p>
  //       <h2 className={styles.sectionHeadText}>Something.</h2>
  //     </motion.div>
  //     <div className="mt-20 flex flex-col">
  //       <VerticalTimeline className=" before:bg-secondary-base dark:before:bg-primary-light">
  //         {experiences.map((experience, index) => (
  //           <ExperienceCard key={index} experience={experience} />
  //         ))}
  //       </VerticalTimeline>
  //     </div>
  //     <motion.div variants={textVariant(0)}>
  //       <p className={styles.sectionSubText}>Projects</p>
  //       <h2 className={styles.sectionHeadText}>Something.</h2>
  //     </motion.div>
  //     <div className="flex w-full">
  //       <motion.p
  //         variants={fadeIn('up', '', 1, 1)}
  //         className="mt-3 max-w-3xl text-[17px] leading-[30px] text-secondary-light"
  //       >
  //         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut ipsa
  //         atque quis veniam nobis numquam, laudantium rerum inventore tempore
  //         quos similique veritatis voluptatibus ex officiis necessitatibus.
  //         Asperiores obcaecati consequuntur dolores.
  //       </motion.p>
  //     </div>
  //     <div className="mt-20 flex w-full flex-wrap gap-7 xl:justify-center">
  //       {/* {projects.map((project, index) => (
  //         <Card
  //           key={`project-${index}`}
  //           index={index}
  //           cover={project.image}
  //           {...project}
  //         />
  //       ))} */}
  //     </div>
  //   </>
  // );
};

export default ProjectsPage;
