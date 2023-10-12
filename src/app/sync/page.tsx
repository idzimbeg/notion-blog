'use client';

import { useEffect, useState } from 'react';

import { CardProps } from '@/components/Card';

export default function SyncPage() {
  const [message, setMessage] = useState('');
  const [slugs, setSlugs] = useState<string[] | undefined>([]);

  const sync = async (password: string) => {
    setMessage('Detecting changes');
    const postsRes = await fetch(`/api/posts?password=${password}`);

    if (postsRes.status === 403) {
      setMessage('Wrong password');
      return false;
    }
    if (postsRes.status === 500) {
      setMessage('Notion api error, try again later');
      return false;
    }

    const { posts }: { posts: CardProps[] } = await postsRes.json();
    const prevPostsRes = await fetch(`/api/posts/cache?password=${password}`);
    const { posts: prevPosts }: { posts: CardProps[] } =
      await prevPostsRes.json();

    const slugsToRevalidate: string[] = [];

    posts.forEach((post, index) => {
      const prevPost = prevPosts.find((p) => p.slug === post.slug);

      if (
        !prevPost ||
        (post.lastEditedAt &&
          prevPost.lastEditedAt &&
          post.lastEditedAt > prevPost.lastEditedAt)
      ) {
        slugsToRevalidate?.push(post.slug);
      }
    });

    prevPosts.forEach(({ slug }) => {
      if (!posts.map(({ slug }) => slug).includes(slug)) {
        slugsToRevalidate?.push(slug);
      }
    });

    if (slugsToRevalidate?.length === 0) {
      setMessage('No posts changed');
      return false;
    } else {
      setMessage('Revalidating...');
      setSlugs(slugsToRevalidate);

      const promises: Promise<Response>[] = [];
      promises.push(
        fetch(`/api/revalidate?path=/api/posts/cache&password=${password}`)
      );
      promises.push(
        fetch(`/api/revalidate?path=/sitemap.xml&password=${password}`)
      );
      promises.push(fetch(`/api/revalidate?path=/blog&password=${password}`));
      slugsToRevalidate?.forEach((slug) => {
        promises.push(
          fetch(`/api/revalidate?path=/blog/${slug}&password=${password}`)
        );
      });
      await Promise.all(promises);
      return true;
    }
  };

  useEffect(() => {
    let password;
    while (!password) {
      password = prompt('Enter password');
    }

    sync(password).then((revalidated) => {
      if (revalidated) {
        setMessage('Sync Finished!');
      }
    });
  }, []);

  return (
    <div className="mt-[10vh] text-center">
      <p className="text-3xl">{message}</p>
      {slugs && slugs.length > 0 && (
        <ul className="mt-4">
          {slugs.map((slug) => (
            <li key={slug}>{slug}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
