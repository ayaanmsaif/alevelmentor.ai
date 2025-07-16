import React from 'react';
import Chart from './Chart';
import TodoList from './TodoList';
import Calendar from './Calendar';

const DashboardPage = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Welcome Back, Bobu</h1>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart takes up 2 columns */}
          <div className="lg:col-span-2">
            <Chart />
          </div>
          
          {/* Todo List takes up 1 column */}
          <div className="lg:col-span-1">
            <TodoList />
          </div>
        </div>
        
        {/* Calendar */}
        <Calendar />
      </div>
    </div>
  );
};

export default DashboardPage;