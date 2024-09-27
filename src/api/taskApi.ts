import axios from 'axios';
import { Task } from '../types/Task';

export const fetchTasks = async (status?: string, sortBy?: string): Promise<Task[]> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL, {
      params: { status, sortBy }, 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

export const addTask = async (task: Task): Promise<Task> => {
  try {
    console.log(task);
    
    const response = await axios.post(import.meta.env.VITE_BASE_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw new Error('Failed to add task'); 
  }
};

export const updateTask = async (id: string): Promise<Task> => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task'); 
  }
};

export const updateTaskDetails = async (id: string, updateData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task'); 
  }
};

export const deleteTask = async (id: string): Promise<Task> => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task'); 
  }
};
