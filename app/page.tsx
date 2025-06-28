import Link from 'next/link';

export default function Home() {
  return (
    <section className="py-l center flex-col text-center h-full">
      <h1 className="text-hero text-primary">Quiz Garden</h1>
      <p className="text-large text-primary mb-l" data-width="prose">
        Turn your Notion notes into interactive quizzes. Finally remember what
        you wrote.
      </p>
      <Link href="/notion" className="button button--primary button--large">
        Get Started
      </Link>
    </section>
  );
}
