import { BallCanvas } from '../../components/canvas';
import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';
import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getAllPostsFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/utils';

export const metadata = {
  title: 'Blog',
  description: 'All posts are created by notion ai.',
};

// const Tech = () => {
//   return (
//     <div className="flex flex-row flex-wrap justify-center gap-10">
//       {technologies.map((tech, index) => (
//         <div key={tech.name} className="w-28 h-28">
//           <BallCanvas icon={tech.icon} />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default SectionWrapper(Tech, '')

const BlogPage = async () => {
  const allPosts = await getAllPostsFromNotion();
  console.log('allposts', allPosts);
  const allCategories = toUniqueArray(
    allPosts
      .filter((post) => post.categories)
      .map((post) => post.categories)
      .flat()
  ).sort();

  return (
    <div className="container mx-auto">
      <section className="space-y-8md:mt-20 mb-16 mt-0">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allPosts} />
    </div>
  );
};

export default BlogPage;
