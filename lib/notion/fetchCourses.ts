import notionClient from './client';
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

async function findCoursesPage(): Promise<PageObjectResponse | undefined> {
  // Search for the "Courses" page in Notion.
  const res = await notionClient.search({
    query: 'Courses',
    filter: { property: 'object', value: 'page' },
  });

  // Find the page with the exact title "Courses" from the search results.
  const coursesPage = res.results.find((page) => {
    const pageResponse = page as PageObjectResponse;
    const titleProperty = pageResponse.properties.title;
    if (titleProperty.type === 'title') {
      return titleProperty.title[0]?.plain_text === 'Courses';
    }
    return false;
  }) as PageObjectResponse | undefined;

  return coursesPage;
}

export async function fetchCourses() {
  // 1. Find the "Courses" page.
  const coursesPage = await findCoursesPage();

  // 2. If the "Courses" page isn't found, return an empty array.
  if (!coursesPage) {
    return [];
  }

  // 3. Fetch all child blocks (pages, etc.) under the "Courses" page.
  const blocksResponse = await notionClient.blocks.children.list({
    block_id: coursesPage.id,
  });

  // 4. Map over the child blocks to extract the id and title from any child pages.
  const courses = blocksResponse.results.map((block) => {
    const pageBlock = block as BlockObjectResponse;
    // We only care about child pages, so we filter for them here.
    if (pageBlock.type === 'child_page') {
      return {
        id: pageBlock.id,
        title: pageBlock.child_page.title,
      };
    }
  });

  const availableCourses = courses.filter(Boolean);

  // 5. Filter out any undefined entries from the map (i.e., blocks that weren't child pages).
  return availableCourses;
}
