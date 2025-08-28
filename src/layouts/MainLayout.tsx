import { ReactNode } from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <header className="main-header">
        <h1>React Basics</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="main-footer">
        <p>&copy; 2025 React Basics App</p>
      </footer>
    </div>
  );
};