import Link from 'next/link';
import { fetchCourses } from '@/lib/notion/fetchCourses';
import { ArrowRight } from 'lucide-react';

export default async function NotionPage() {
  const notionPages = await fetchCourses();

  return (
    <section className="py-l mt-l center flex-col text-center">
      <h1 className="text-center text-hero text-primary">Courses</h1>
      <ul className="m-l">
        {notionPages.map((page) => {
          return (
            <li className="card mb-m" key={page?.id}>
              <h2 className="text-medium">{page?.title}</h2>
              <Link
                className="link mt-auto"
                href={`/notion/${page?.id}`}
                aria-label={`Go to the ${page?.title} page`}
              >
                <span>Go to page</span>
                <ArrowRight color="var(--color-link)" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
