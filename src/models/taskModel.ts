// taskModel.ts
export interface Task {
    type: string;
    id: string;
    title: string;
    description: string;
    employeeIds: string[]; // Assuming many-to-many relationship with employees
  }