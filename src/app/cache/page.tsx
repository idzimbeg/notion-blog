import { useMemo } from 'react';

import { getAllPostsFromNotion } from '@/services/posts';
import { getAllProjectsFromNotion } from '@/services/projects';

export default async function CachePage() {
  const allPosts = await getAllPostsFromNotion();
  const allProjects = await getAllProjectsFromNotion();
  const isProject = useMemo(
    () => allProjects.every((project) => project.description),
    [allProjects]
  );
  return isProject ? (
    <div id="projects" data-posts={JSON.stringify(allProjects)} />
  ) : (
    <div id="posts" data-posts={JSON.stringify(allPosts)} />
  );
}
