import { fetchCourses } from '@/lib/notion/fetchCourses';

export default async function NotionPage() {
  const data = await fetchCourses();

  return (
    <>
      <h1 className="text-hero text-primary">Notion</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
