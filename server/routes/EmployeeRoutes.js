import { Router } from "express"
import { createEmployees, deleteeEmployees, getEmployees, updateEmployees } from "../controller/employeeController.js"
import { protect, protectAdmin } from "../middleware/auth.js"

const employeesRouter = Router()


employeesRouter.get("/",protect,protectAdmin, getEmployees)
employeesRouter.post("/",protect,protectAdmin, createEmployees)
employeesRouter.put("/:id",protect,protectAdmin, updateEmployees)
employeesRouter.delete("/:id",protect,protectAdmin, deleteeEmployees)


export default employeesRouter;