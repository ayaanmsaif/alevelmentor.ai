import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import PastPapersPage from './components/PastPapersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'pastpapers':
        return <PastPapersPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden overscroll-none">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;