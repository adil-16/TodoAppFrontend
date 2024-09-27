import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTasks";
import { fetchTasksAsync } from "../redux/slices/taskSlice";
import TaskItem from "./TaskItem";
import { Task } from "../types/Task";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasksAsync({ status: undefined, sortBy: undefined }));
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {tasks.map((task: Task) => (
        <TaskItem key={task?._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
