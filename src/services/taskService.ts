import { client, databaseId } from "./cosmosService";
import { Task } from "../interfaces/task";
import { Employee } from "../interfaces/employee";

export async function createTask(task: Task) {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists({ id: "Task" });
  const { resource: createdTask } = await container.items.create(task);
  return createdTask;
}

export async function createEmployee(employee: Employee) {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists({ id: "Employee" });
  const { resource: createdEmployee } = await container.items.create(employee);
  return createdEmployee;
}

export async function assignTasks(employeeHaveTasks: {
  empId: string;
  taskId: string;
}) {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists({ id: "EmployeeHaveTasks" });
  const { resource: assignTasks } = await container.items.create(
    employeeHaveTasks
  );
  return assignTasks;
}

export async function getTasksByEmpId(empId: string) {
  const database = client.database(databaseId);

  const employeeTasksContainer = database.container("EmployeeHaveTasks");
  const querySpec1 = {
    query: "SELECT c.taskId FROM c WHERE c.empId = @empId",
    parameters: [
      {
        name: "@empId",
        value: empId,
      },
    ],
  };
  const { resources: employeeTasks } = await employeeTasksContainer.items
    .query(querySpec1)
    .fetchAll();

  const taskIds = employeeTasks.map((task) => task.taskId);

  const taskContainer = database.container("Task");
  const querySpec2 = {
    query: "SELECT * FROM c WHERE ARRAY_CONTAINS(@taskIds, c.id)",
    parameters: [
      {
        name: "@taskIds",
        value: taskIds,
      },
    ],
  };
  const { resources: taskDetails } = await taskContainer.items
    .query(querySpec2)
    .fetchAll();
  return taskDetails;
}

export async function deleteTaskConst(containerName: string) {
  const database = client.database(containerName);
  const container = database.container("Task");
  const { resource } = await container.delete();
  return resource;
}
