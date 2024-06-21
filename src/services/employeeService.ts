// employeeService.ts
import { Container } from "@azure/cosmos";
import { client } from "./cosmosService";
import { Employee } from "../models/employeeModel";

const databaseId = process.env.COSMOSDB_DATABASE || "";
const containerId = process.env.COSMOSDB_CONTAINER || "";

export class EmployeeService {
  private container: Container;

  constructor() {
    const database = client.database(databaseId);
    this.container = database.container(containerId);
  }

  async getEmployeeById(employeeId: string): Promise<Employee | undefined> {
    try {
      const querySpec = {
        query: `SELECT * FROM c WHERE c.id = @id AND c.type = "employee"`,
        parameters: [{ name: "@id", value: employeeId }],
      };

      const { resources } = await this.container.items
        .query<Employee>(querySpec)
        .fetchAll();
      return resources.length > 0 ? resources[0] : undefined;
    } catch (error) {
      console.error("Error retrieving employee:", error);
      return undefined;
    }
  }

  async createEmployee(employee: Employee): Promise<Employee | undefined> {
    if (!employee.id || typeof employee.id !== "string") {
      throw new Error("Invalid or missing ID for employee.");
    }
    try {
      employee.type = "employee";
      const { resource } = await this.container.items.create(employee);
      return resource;
    } catch (error) {
      console.error("Error creating employee:", error);
      return undefined;
    }
  }
}
