import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow py-3 px-4 bg-transparent outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white p-3 transition-colors duration-200"
          disabled={!text.trim()}
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
