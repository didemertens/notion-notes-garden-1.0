import notionClient from './client';

export async function fetchCourses() {
  return notionClient.search({
    query: 'Courses',
    filter: { property: 'object', value: 'page' },
  });
}
