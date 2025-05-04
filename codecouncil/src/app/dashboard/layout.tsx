'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Overview', path: '/dashboard' },
    { name: 'Pull Requests', path: '/dashboard/pull-requests' },
    { name: 'Commits', path: '/dashboard/commits' },
    { name: 'Team', path: '/dashboard/team' },
    { name: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen font-geist">
      {/* Fixed Sidebar */}
      <div className="dashboard-sidebar fixed top-0 left-0 w-64 h-screen overflow-y-auto z-10">
        <div className="dashboard-sidebar-header p-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-2xl font-bold text-neon-blue">CodeCouncil</h1>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 ${
                    pathname === item.path
                      ? 'nav-item-active'
                      : 'nav-item hover:bg-dark-card hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content with left margin for the sidebar */}
      <div className="dashboard-content flex-1 ml-64 overflow-auto">
        {children}
      </div>
    </div>
  );
} 