import { fetchCourses } from '@/lib/notion/fetchCourses';

export default async function NotionPage() {
  const notionPages = await fetchCourses();

  return (
    <section className="py-l mt-l center flex-col text-center">
      <h1 className="text-center text-hero text-primary">Courses</h1>
      <ul className="m-l">
        {notionPages.map((page) => {
          return (
            <li className="card mb-m" key={page?.id}>
              <div>
                <h2 className="text-medium">{page?.title}</h2>
                <button className="button button--primary button--small mt-auto">
                  Generate quiz
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
