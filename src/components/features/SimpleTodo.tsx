'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export function SimpleTodo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('simpleTodos');
        if (saved) setTodos(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('simpleTodos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
        setInput('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div className="flex flex-col h-full">
            <form onSubmit={addTodo} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a task..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1 max-h-48">
                {todos.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-8">
                        No tasks yet. Let's get things done!
                    </div>
                ) : (
                    todos.map(todo => (
                        <div
                            key={todo.id}
                            className={`group flex items-center justify-between p-2 rounded-lg transition-all ${todo.completed ? 'bg-white/5 opacity-50' : 'bg-white/10'}`}
                        >
                            <div
                                onClick={() => toggleTodo(todo.id)}
                                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                            >
                                {todo.completed ?
                                    <CheckCircle2 size={18} className="text-green-400 shrink-0" /> :
                                    <Circle size={18} className="text-gray-400 shrink-0" />
                                }
                                <span className={`text-sm truncate ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all px-2"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
