import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { CheckCircle } from 'lucide-react';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4 flex items-center">
          <CheckCircle className="text-white mr-3" size={24} />
          <h1 className="text-2xl font-bold text-white">TaskMaster</h1>
        </div>
        
        <div className="p-6">
          <TodoForm addTodo={addTodo} />
          
          <div className="mt-2 mb-4 flex justify-between text-sm text-gray-500">
            <span>{totalCount} tasks</span>
            <span>{completedCount} completed</span>
          </div>
          
          {todos.length > 0 ? (
            <TodoList 
              todos={todos} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Your tasks are saved locally in your browser
      </p>
    </div>
  );
}

export default App;
