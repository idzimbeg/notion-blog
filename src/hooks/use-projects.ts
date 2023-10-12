import { useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { CardProps } from '@/components/Card';
import { categoriesState } from '@/states/categories';
import { pageState } from '@/states/page';
import { queryState } from '@/states/query';
import { search, toUniqueArray } from '@/utils';

const POST_PER_PAGE = 12;

export default function useProjects(allProjects: CardProps[]) {
  const page = useRecoilValue(pageState);
  const query = useRecoilValue(queryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const allProjectsFiltered = useMemo(
    () =>
      allProjects &&
      allProjects.filter((projects) => {
        if (!projects.published) {
          return false;
        }

        if (query && projects.title && !search(projects.title, query)) {
          return false;
        }

        if (categories.selected.length) {
          const isCategoryMatch = categories.selected.every((cat) =>
            projects.categories?.includes(cat)
          );
          if (!isCategoryMatch) {
            return false;
          }
        }

        return true;
      }),
    [allProjects, categories.selected, query]
  );
  allProjectsFiltered &&
    allProjectsFiltered.sort((postA, postB) =>
      postA.date && postB.date && postA.date > postB.date ? -1 : 1
    );

  const totalPages = Math.ceil(
    allProjectsFiltered && allProjectsFiltered.length / POST_PER_PAGE
  );
  const offset = (page ? +page - 1 : 0) * POST_PER_PAGE;
  const projectsForCurrentPage =
    allProjectsFiltered &&
    allProjectsFiltered.slice(offset, offset + POST_PER_PAGE);

  useEffect(() => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      active: toUniqueArray(
        allProjectsFiltered &&
          allProjectsFiltered.map((project) => project.categories).flat()
      ),
    }));
  }, [allProjectsFiltered, setCategories]);

  return {
    projects: projectsForCurrentPage,
    totalPages,
  };
}
