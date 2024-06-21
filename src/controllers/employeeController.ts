import { Request, Response } from 'express';
import { createEmployee, assignTasks, deleteTaskConst } from '../services/taskService';
import { Employee } from '../interfaces/employee';

export async function addEmployee(req: Request, res: Response) {
    const employee: Employee = req.body;
    try {
        const createdEmployee = await createEmployee(employee);
        res.status(201).json(createdEmployee);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export async function assignTask(req: Request, res: Response) {
    const taskEmployeeData = req.body;
    try {
        const assignTask = await assignTasks(taskEmployeeData);
        res.status(201).json(assignTask);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteTask(req: Request, res: Response) {
    const name = req.params.Name;
    try {
        const deleteS = await deleteTaskConst(name);
        console.log('deleted successfully');
        res.status(200).json(deleteS);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
