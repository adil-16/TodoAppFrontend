export interface Task {
  _id?: string; 
  description: string; 
  dueDate?: Date; 
  isCompleted: boolean;
  createdAt: Date;
}
