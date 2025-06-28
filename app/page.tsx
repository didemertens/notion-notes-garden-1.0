import ThemeToggle from '../components/atoms/ThemeToggle';

export default function Home() {
  return (
    <div className="full-height">
      <div className="p-m flex-end">
        <ThemeToggle />
      </div>
      <main className="center grow flex-col text-center">
        <h1 className="text-hero text-primary">Quiz Garden</h1>
        <p className="text-large text-primary mb-l" style={{ maxWidth: '35ch' }}>
          Turn your Notion notes into interactive quizzes. 
          Finally remember what you wrote.
        </p>
        <button className="button button--primary button--large">
          Get Started
        </button>
      </main>
    </div>
  );
}