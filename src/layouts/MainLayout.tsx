import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold">React Basics</h1>
      </header>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <footer className="bg-gray-100 dark:bg-slate-800 p-4 text-center border-t border-gray-200 dark:border-slate-700 mt-auto">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; 2025 React Basics App
        </p>
      </footer>
    </div>
  );
};