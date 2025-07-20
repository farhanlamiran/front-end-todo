import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority'>>) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editPriority, setEditPriority] = useState(todo.priority);

    const handleSave = () => {
        if (editText.trim()) {
            onUpdate(todo.id, { text: editText.trim(), priority: editPriority });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditPriority(todo.priority);
        setIsEditing(false);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-todo-priority-high text-white';
            case 'medium': return 'bg-todo-priority-medium text-primary';
            case 'low': return 'bg-todo-priority-low text-white';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <div className={cn(
            "group flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
            "hover:shadow-[var(--shadow-hover)] hover:border-accent/20",
            todo.completed
                ? "bg-muted/30 border-muted"
                : "bg-card border-border shadow-[var(--shadow-notion)]"
        )}>
            <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />

            {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 h-8 text-sm border-none shadow-none focus:ring-1 focus:ring-accent"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                        autoFocus
                    />
                    <Select value={editPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditPriority(value)}>
                        <SelectTrigger className="w-20 h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Med</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button size="sm" variant="ghost" onClick={handleSave} className="h-8 w-8 p-0">
                        <Check className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0">
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <>
                    <div className="flex-1 flex items-center gap-2">
                        <span className={cn(
                            "text-sm transition-all",
                            todo.completed
                                ? "text-todo-completed line-through"
                                : "text-foreground"
                        )}>
                            {todo.text}
                        </span>
                        <Badge variant="outline" className={cn("text-xs px-2 py-0", getPriorityColor(todo.priority))}>
                            {todo.priority}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditing(true)}
                            className="h-8 w-8 p-0 hover:bg-accent/10"
                        >
                            <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDelete(todo.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;