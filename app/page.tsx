import { Leaf } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Home() {
  return (
    <div className="full-height">
      <div className="flex-end p-m">
        <ThemeToggle />
      </div>
      <div className="center">
        <div className="text-center">
          <div className="flex-center gap-s mb-m">
            <h1 className="text-hero text-primary">Quiz Garden</h1>
            <Leaf size={48} className="text-primary" />
          </div>
          <p className="text-large text-primary mb-l" style={{ maxWidth: '40ch' }}>
            Turn your Notion notes into interactive quizzes. 
            Finally remember what you wrote.
          </p>
          <button className="button button--primary button--large" tabIndex={2}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}