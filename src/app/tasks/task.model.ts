export interface Task {
  id: number;
  name: string;
  dueDate: Date;
  assignedPeople: string[];
  skills: string[];
}
