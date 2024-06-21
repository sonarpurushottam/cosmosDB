import express from "express";
import { getTasksForEmployee, createTask } from "./controllers/taskController";
import {
  getEmployeeById,
  createEmployee,
} from "./controllers/employeeController";

const router = express.Router();

router.get("/employees/:employeeId/tasks", getTasksForEmployee);
router.post("/tasks", createTask);

router.get("/employees/:employeeId", getEmployeeById);
router.post("/employees", createEmployee);

export default router;
