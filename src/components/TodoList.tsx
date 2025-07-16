import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoItem {
  id: number;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  done: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: 'Umitech Mechanics I', priority: 'High', done: true },
    { id: 2, task: 'Umitech Particles II', priority: 'High', done: true },
    { id: 3, task: 'Physics Paper 1 2018', priority: 'Medium', done: true },
    { id: 4, task: 'Math Pure Paper 1', priority: 'Low', done: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Todo List</h2>
      
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-600">
        <div className="col-span-6">Task</div>
        <div className="col-span-3">Priority</div>
        <div className="col-span-3">Done</div>
      </div>

      {/* Todo items */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="grid grid-cols-12 gap-4 items-center py-2">
            <div className="col-span-6">
              <span className={`text-sm ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.task}
              </span>
            </div>
            <div className="col-span-3">
              <span className={`text-sm ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            </div>
            <div className="col-span-3">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  todo.done 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                {todo.done && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <button className="flex items-center space-x-2 mt-6 text-sm text-gray-600 hover:text-gray-800">
        <Plus className="w-4 h-4" />
        <span>Add A Task</span>
      </button>
    </div>
  );
};

export default TodoList;