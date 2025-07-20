import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DayColumnProps {
    date: string;
    todos: Todo[];
    isToday: boolean;
    onAddTodo: (text: string, priority: 'low' | 'medium' | 'high') => void;
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
    onUpdateTodo: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority'>>) => void;
}

const DayColumn = ({
    date,
    todos,
    isToday,
    onAddTodo,
    onToggleTodo,
    onDeleteTodo,
    onUpdateTodo
}: DayColumnProps) => {
    const dayDate = new Date(date);
    const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = dayDate.getDate();

    const completedTodos = todos.filter(todo => todo.completed).length;
    const totalTodos = todos.length;
    const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return (
        <div className={cn(
            "bg-card rounded-xl border p-4 shadow-[var(--shadow-notion)] transition-all duration-200",
            "hover:shadow-[var(--shadow-hover)] hover:border-accent/20",
            isToday && "ring-2 ring-accent/50 border-accent/30"
        )}>
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex flex-col items-center",
                        isToday && "text-accent font-semibold"
                    )}>
                        <span className="text-xs uppercase text-muted-foreground">{dayName}</span>
                        <span className="text-lg font-semibold">{dayNumber}</span>
                    </div>
                    {isToday && (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs">
                            Today
                        </Badge>
                    )}
                </div>

                {totalTodos > 0 && (
                    <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                            {completedTodos}/{totalTodos}
                        </div>
                        <div className={cn(
                            "text-xs font-medium",
                            completionPercentage === 100 ? "text-todo-priority-low" : "text-muted-foreground"
                        )}>
                            {completionPercentage}%
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {totalTodos > 0 && (
                <div className="mb-4">
                    <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                completionPercentage === 100 ? "bg-todo-priority-low" : "bg-accent"
                            )}
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Add Todo */}
            <div className="mb-4">
                <AddTodo
                    onAdd={onAddTodo}
                    placeholder={`Add task for ${dayName}...`}
                />
            </div>

            {/* Todos List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggleTodo}
                        onDelete={onDeleteTodo}
                        onUpdate={onUpdateTodo}
                    />
                ))}

                {todos.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                        No tasks yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayColumn;