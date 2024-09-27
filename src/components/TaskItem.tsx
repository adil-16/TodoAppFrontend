import React, { useState } from "react";
import { Task } from "../types/Task";
import { useAppDispatch, useAppSelector } from "../hooks/useTasks";
import {
  updateTaskDetailsAsync,
  updateTaskAsync,
  deleteTaskAsync,
} from "../redux/slices/taskSlice";
import { toast } from "react-toastify";

interface TaskItemProps {
  task: Task;
}

const formatDueDate = (date: Date) => {
  return date.toLocaleDateString();
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const loading = useAppSelector((state) => state.tasks.loading);
  const [dueDate, setDueDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const handleComplete = async () => {
    if (task._id) {
      try {
        await dispatch(updateTaskAsync({ id: task._id })).unwrap();
        toast.success("Task marked as completed!");
      } catch (error) {
        toast.error("Failed to complete the task.");
      }
    } else {
      console.error("Task ID is undefined. Cannot update task.");
    }
  };

  const handleDelete = async () => {
    if (task._id) {
      try {
        await dispatch(deleteTaskAsync(task._id)).unwrap();
        toast.success("Task deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the task.");
      }
    } else {
      console.error("Task ID is undefined. Cannot delete task.");
    }
  };

  const handleUpdate = async () => {
    if (task._id) {
      const updatedTask: Partial<Task> = {
        description,
        ...(dueDate ? { dueDate } : {}),
      };

      try {
        await dispatch(
          updateTaskDetailsAsync({ id: task._id, updateData: updatedTask })
        ).unwrap();
        setIsEditing(false);
        toast.success("Task updated successfully!");
      } catch (error) {
        toast.error("Failed to update the task.");
      }
    }
  };

  return (
    <div className="flex justify-between items-center border p-2 mb-2">
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 mb-1"
            disabled={loading}
          />
          <input
            type="date"
            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setDueDate(e.target.value ? new Date(e.target.value) : null)
            }
            className="border p-1 mb-1"
            disabled={loading}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            {loading ? <span className="animate-spin"></span> : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-black px-2 py-1 rounded"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div>
            <p
              className={`${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {description} {dueDate && <span>({formatDueDate(dueDate)})</span>}
            </p>
          </div>
          <div className="flex items-center">
            {!task?.isCompleted && (
              <button
                onClick={handleComplete}
                className="bg-green-500 text-white px-4 py-1 rounded"
                disabled={loading || task.isCompleted}
              >
                {loading ? <span className="animate-spin"></span> : "Complete"}
              </button>
            )}
            <button
              onClick={handleDelete}
              className="ml-2 text-red-500"
              disabled={loading}
            >
              {loading ? <span className="animate-spin"></span> : "🗑️"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 text-blue-500"
              disabled={loading}
            >
              ✏️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
