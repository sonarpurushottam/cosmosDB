import { Request, Response } from "express";
import { createTask, getTasksByEmpId } from "../services/taskService";
import { Task } from "../interfaces/task";

export async function addTask(req: Request, res: Response) {
  const task: Task = req.body;
  try {
    const createdTask = await createTask(task);
    res.status(201).json(createdTask);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTasks(req: Request, res: Response) {
  const empId = req.params.id;
  try {
    const tasks = await getTasksByEmpId(empId);
    res.status(200).json(tasks);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
