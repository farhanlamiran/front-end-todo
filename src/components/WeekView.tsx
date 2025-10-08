import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import DayColumn from './DayColumn';
import { useTodos } from '@/hooks/useTodos';
import { cn } from '@/lib/utils';

const WeekView = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day; // Sunday is 0
        return new Date(today.setDate(diff));
    });

    const {
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        getTodosForDate,
        getWeekStats
    } = useTodos();

    const weekDates = useMemo(() => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    }, [currentWeekStart]);

    const weekStats = getWeekStats(weekDates);
    const today = new Date().toISOString().split('T')[0];

    const navigateWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeekStart(newDate);
    };

    const goToCurrentWeek = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day;
        setCurrentWeekStart(new Date(today.setDate(diff)));
    };

    const formatWeekRange = () => {
        const endDate = new Date(currentWeekStart);
        endDate.setDate(endDate.getDate() + 6);

        const startMonth = currentWeekStart.toLocaleDateString('en-US', { month: 'short' });
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
        const year = currentWeekStart.getFullYear();

        if (startMonth === endMonth) {
            return `${startMonth} ${currentWeekStart.getDate()}-${endDate.getDate()}, ${year}`;
        } else {
            return `${startMonth} ${currentWeekStart.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-semibold text-foreground">Weekly Todo</h1>
                            <Badge variant="outline" className="bg-card">
                                {formatWeekRange()}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            {weekStats.total > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Week Progress:</span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "bg-card",
                                            weekStats.percentage === 100 && "bg-todo-priority-low/10 text-todo-priority-low border-todo-priority-low/30"
                                        )}
                                    >
                                        {weekStats.completed}/{weekStats.total} ({weekStats.percentage}%)
                                    </Badge>
                                </div>
                            )}

                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateWeek('prev')}
                                    className="hover:bg-accent/10"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={goToCurrentWeek}
                                    className="hover:bg-accent/10"
                                >
                                    <Calendar className="h-4 w-4" />
                                    Today
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateWeek('next')}
                                    className="hover:bg-accent/10"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Week Grid */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weekDates.map((date, index) => {
                        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
                        const isToday = date === today;
                        const todos = getTodosForDate(date);

                        return (
                            <DayColumn
                                key={date}
                                date={date}
                                todos={todos}
                                isToday={isToday}
                                onAddTodo={(text, priority) => addTodo(text, date, priority)}
                                onToggleTodo={toggleTodo}
                                onDeleteTodo={deleteTodo}
                                onUpdateTodo={updateTodo}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeekView;