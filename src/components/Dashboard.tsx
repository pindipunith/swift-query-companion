import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Plus, 
  Search, 
  CheckCircle, 
  Circle, 
  Trash2, 
  Edit,
  User,
  LayoutDashboard,
  ListTodo
} from "lucide-react";
import { TaskDialog } from "./TaskDialog";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Demo tasks for better UX
      const demoTasks: Task[] = [
        {
          id: "1",
          title: "Complete Frontend Assignment",
          description: "Build a scalable web app with authentication and dashboard",
          completed: false,
          priority: "high",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Setup Authentication System",
          description: "Implement login, register, and logout functionality",
          completed: true,
          priority: "high",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          title: "Design Dashboard UI",
          description: "Create a modern, responsive dashboard interface",
          completed: true,
          priority: "medium",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
      setTasks(demoTasks);
      localStorage.setItem("tasks", JSON.stringify(demoTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task Created",
      description: "Your task has been created successfully",
    });
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;
    
    setTasks(prev => 
      prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      )
    );
    setEditingTask(null);
    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully",
    });
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Your task has been deleted successfully",
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "completed" && task.completed) ||
                         (statusFilter === "pending" && !task.completed);
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === "high").length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Task Dashboard
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="hover:scale-105 transition-bounce"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive rounded-full" />
                <div>
                  <p className="text-2xl font-bold">{stats.high}</p>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="gradient-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsTaskDialogOpen(true)}
                className="gradient-primary hover:scale-105 transition-bounce shadow-glow"
              >
                <Plus size={16} />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <Card className="gradient-card">
              <CardContent className="p-12 text-center">
                <ListTodo className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || priorityFilter !== "all" || statusFilter !== "all" 
                    ? "Try adjusting your filters or search query"
                    : "Create your first task to get started"
                  }
                </p>
                {!searchQuery && priorityFilter === "all" && statusFilter === "all" && (
                  <Button 
                    onClick={() => setIsTaskDialogOpen(true)}
                    className="gradient-primary"
                  >
                    <Plus size={16} className="mr-2" />
                    Create Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="gradient-card hover:shadow-glow transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="mt-1 text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className={`text-sm mb-3 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {task.description}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingTask(task);
                          setIsTaskDialogOpen(true);
                        }}
                        className="hover:scale-105 transition-bounce"
                      >
                        <Edit size={14} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                        className="hover:scale-105 transition-bounce text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Task Dialog */}
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        onClose={() => {
          setIsTaskDialogOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}