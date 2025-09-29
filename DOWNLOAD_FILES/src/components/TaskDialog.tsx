import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  task?: Task | null;
  onClose: () => void;
}

export function TaskDialog({ open, onOpenChange, onSubmit, task, onClose }: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: task?.completed || false,
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md gradient-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {task ? <Save size={18} /> : <Plus size={18} />}
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>
            {task ? "Update your task details below." : "Add a new task to your dashboard."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Title *</Label>
            <Input
              id="task-title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="transition-smooth focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="transition-smooth focus:shadow-glow resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-priority">Priority</Label>
            <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
              <SelectTrigger className="transition-smooth focus:shadow-glow">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="flex-1 gradient-primary hover:scale-105 transition-bounce shadow-glow"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {task ? "Updating..." : "Creating..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {task ? <Save size={16} /> : <Plus size={16} />}
                  {task ? "Update Task" : "Create Task"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}