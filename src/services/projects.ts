import { CardProps } from '@/components/Card';
import { getRecordMap, mapImageUrl } from '@/libs/notion';

export async function getAllProjectsFromNotion() {
  const allProjects: CardProps[] = [];
  const recordMap = await getRecordMap(
    process.env.NOTION_PROJECTS_DATABASE_ID!
  );
  const { block, collection } = recordMap;
  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  Object.keys(block).forEach((pageId) => {
    if (
      block[pageId].value.type === 'page' &&
      block[pageId].value.properties[propertyMap['Slug']]
    ) {
      const { properties, last_edited_time } = block[pageId].value;

      const contents = block[pageId].value.content || [];
      const dates = contents.map((content) => {
        return block[content]?.value?.last_edited_time;
      });
      dates.push(last_edited_time);
      dates.sort((a, b) => b - a);
      const lastEditedAt = dates[0];

      const id = pageId;
      const slug = properties[propertyMap['Slug']][0][0];
      const title = properties[propertyMap['Page']][0][0];
      const categories = properties[propertyMap['Category']][0][0].split(',');
      const cover = properties[propertyMap['Cover']][0][1][0][1];
      const date = properties[propertyMap['Date']][0][1][0][1]['start_date'];
      const published = properties[propertyMap['Published']][0][0] === 'Yes';
      const description = properties[propertyMap['Description']][0][0];
      const source_code_link =
        properties[propertyMap['source_code_link']][0][0];

      allProjects.push({
        id,
        title,
        slug,
        categories,
        cover: mapImageUrl(cover, block[pageId].value) || '',
        date,
        published,
        lastEditedAt,
        source_code_link,
        description,
        index: 0,
      });
    }
  });
  return allProjects;
}
