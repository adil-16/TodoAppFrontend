import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask, updateTaskDetails } from '../../api/taskApi';
import { Task } from '../../types/Task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ status, sortBy }: { status?: string; sortBy?: string } = {}) => {
    const tasks = await fetchTasks(status, sortBy);
    return tasks;
  }
);

export const addTaskAsync = createAsyncThunk('tasks/addTask', async (task: Task) => {
  const newTask = await addTask(task);
  return newTask;
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async ({ id }: { id: string }) => {
  const updatedTask = await updateTask(id);
  return updatedTask;
});

export const updateTaskDetailsAsync = createAsyncThunk(
  'tasks/updateTaskDetails',
  async ({ id, updateData }: { id: string; updateData: Partial<Task> }) => {
    const updatedTask = await updateTaskDetails(id, updateData);
    return updatedTask;
  }
);


export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await deleteTask(id);
  return id; 
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
        .addCase(addTaskAsync.pending, (state) => {
        state.loading = true; 
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.loading = false; 
        state.tasks.push(action.payload);
      })
            .addCase(addTaskAsync.rejected, (state) => {
        state.loading = false; 
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
       .addCase(updateTaskDetailsAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });;
  },
});

export default tasksSlice.reducer;
