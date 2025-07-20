export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    date: string; // YYYY-MM-DD format
    createdAt: Date;
}

export interface WeekData {
    weekStart: Date;
    weekEnd: Date;
    days: {
        date: string;
        todos: Todo[];
    }[];
}