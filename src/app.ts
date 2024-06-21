import express, { json } from "express";
import { addTask, getTasks } from "./controllers/taskController";
import {
  addEmployee,
  assignTask,
  deleteTask,
} from "./controllers/employeeController";

const app = express();
const port = 3000;

app.use(json());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.post("/addTask", addTask);
app.post("/addEmployees", addEmployee);
app.post("/assignTask", assignTask);
app.get("/:id", getTasks);
app.delete("/:Name", deleteTask);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
