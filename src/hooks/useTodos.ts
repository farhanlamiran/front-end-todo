import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Load todos from localStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('notion-todos');
        if (savedTodos) {
            const parsedTodos = JSON.parse(savedTodos);
            setTodos(parsedTodos.map((todo: any) => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
            })));
        }
    }, []);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('notion-todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string, date: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: text.trim(),
            completed: false,
            priority,
            date,
            createdAt: new Date()
        };
        setTodos(prev => [...prev, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, updates: Partial<Pick<Todo, 'text' | 'priority' | 'date'>>) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ));
    };

    const getTodosForDate = (date: string) => {
        return todos.filter(todo => todo.date === date);
    };

    const getWeekStats = (weekDates: string[]) => {
        const weekTodos = todos.filter(todo => weekDates.includes(todo.date));
        const completed = weekTodos.filter(todo => todo.completed).length;
        const total = weekTodos.length;
        return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        getTodosForDate,
        getWeekStats
    };
};