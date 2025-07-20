import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddTodoProps {
    onAdd: (text: string, priority: 'low' | 'medium' | 'high') => void;
    placeholder?: string;
}

const AddTodo = ({ onAdd, placeholder = "Add a new task..." }: AddTodoProps) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim(), priority);
            setText('');
            setPriority('medium');
            setIsExpanded(false);
        }
    };

    const handleInputFocus = () => {
        setIsExpanded(true);
    };

    const handleCancel = () => {
        setText('');
        setIsExpanded(false);
    };

    return (
        <div className="space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={handleInputFocus}
                        placeholder={placeholder}
                        className="pl-10 bg-card border-dashed border-muted-foreground/30 focus:border-accent focus:bg-background transition-all"
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {isExpanded && (
                    <div className="flex items-center gap-2 p-3 bg-card rounded-lg border shadow-[var(--shadow-notion)]">
                        <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                            <SelectTrigger className="w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2 ml-auto">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={!text.trim()}
                                className="bg-accent hover:bg-accent/90"
                            >
                                Add Task
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddTodo;