'use client';

import { useMemo, useRef } from 'react';

import Card, { CardProps } from '../Card/Card';
import Paginate from '@/components/paginate';
import usePosts from '@/hooks/use-posts';

export default function PostsGrid({ allPosts }: { allPosts: CardProps[] }) {
  const { posts, totalPages } = usePosts(allPosts);
  const rootRef = useRef<HTMLDivElement>(null);
  const isProject = useMemo(
    () => posts.every((post) => post.description),
    [posts]
  );

  return (
    <section
      ref={rootRef}
      className="flex scroll-mt-12 flex-col items-center space-y-16"
    >
      {posts.length ? (
        <ul
          id="grid"
          className="grid w-full grid-cols-1 gap-x-8 gap-y-32 md:grid-cols-2 xl:grid-cols-3"
        >
          {isProject
            ? posts.map(
                (post) =>
                  post && (
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
                  )
              )
            : posts.map(
                (post) =>
                  post && (
                    <li key={post.slug}>
                      <Card
                        id={post.id}
                        slug={post.slug}
                        title={post.title}
                        date={post.date}
                        cover={post.cover}
                        categories={post.categories}
                        index={0}
                      />
                    </li>
                  )
              )}
        </ul>
      ) : (
        <p className="mt-10 text-center text-lg">No matching posts found</p>
      )}
      <Paginate totalPages={totalPages} elementToScroll={rootRef.current} />
    </section>
  );
}
