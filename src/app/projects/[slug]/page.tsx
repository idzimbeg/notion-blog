import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CardProps } from '@/components/Card';
import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import { getRecordMap } from '@/libs/notion';
import { getAllProjectsFromNotion } from '@/services/projects';

export default async function ProjectPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const allPosts = await getAllProjectsFromNotion();

  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    return notFound();
  }

  if (!post.published) {
    return (
      <article
        data-revalidated-at={new Date().getTime()}
        className="mx-auto mt-40 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
        <Link href="/projects">
          <span className="mr-2">&larr;</span>
          <span>Go to list page</span>
        </Link>
      </article>
    );
  }

  const relatedPosts: CardProps[] = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      p.categories &&
      p.categories.some((v) => post.categories?.includes(v))
  );

  const recordMap = await getRecordMap(post.id);

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="mt-4 flex flex-col items-center md:mt-20"
      >
        <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
          <Image
            src={post.cover}
            alt="cover"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <NotionPage post={post} recordMap={recordMap} />
      </article>
      <RelatedPosts allPosts={relatedPosts} />
    </>
  );
}

export async function generateStaticParams() {
  const allProjects = await getAllProjectsFromNotion();

  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const allProjects = await getAllProjectsFromNotion();
  const project = allProjects.find((p) => p.slug === slug);

  return project
    ? {
        title: project.title,
        openGraph: {
          images: [
            {
              url: project.cover,
              width: 400,
              height: 300,
            },
          ],
        },
      }
    : {};
}
