export interface Task {
  id: number;
  name: string;
  dueDate: Date;
  assignedPeople: Person[];
  isCompleted: boolean;
}

export interface Person {
  name: string;
  age: number;
  skills: Skills[];
}

export interface Skills {
  skill: string;
}
