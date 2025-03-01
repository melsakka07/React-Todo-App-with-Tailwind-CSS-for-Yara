import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
      todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border ${
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-violet-500'
        } flex items-center justify-center mr-3 transition-colors duration-200`}
      >
        {todo.completed && <Check size={14} />}
      </button>
      
      <span 
        className={`flex-grow ${
          todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;
