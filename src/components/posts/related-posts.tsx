'use client';

import { useState } from 'react';

import { Button } from '../Button/Button';
import { CardProps } from '../Card';
import Card from '../Card/Card';
import usePosts from '@/hooks/use-posts';

const INITIAL_NUM_POSTS = 6;
const ADDITIONAL_NUM_POSTS = 6;

export default function RelatedPosts({ allPosts }: { allPosts: CardProps[] }) {
  const [numPosts, setNumPosts] = useState(INITIAL_NUM_POSTS);
  const { posts } = usePosts(allPosts);

  const handleLoadMore = () => {
    setNumPosts((prevNumPosts) => prevNumPosts + ADDITIONAL_NUM_POSTS);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-3xl font-bold">Related Posts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(0, numPosts).map((post) => (
          <div
            key={post.slug}
            className="scale-[0.8] transition-all duration-300 hover:scale-[0.85]"
          >
            <li key={post.slug}>
              <Card
                id={post.id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                cover={post.cover}
                source_code_link={post.source_code_link}
                categories={post.categories}
                index={0}
              />
            </li>
          </div>
        ))}
      </ul>
      {numPosts < posts.length && (
        <Button onClick={handleLoadMore} variant="load">
          Load More
        </Button>
      )}
    </section>
  );
}
