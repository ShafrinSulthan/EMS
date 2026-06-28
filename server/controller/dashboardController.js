

//Get dashbord for employee and admin

import { DEPARTMENTS } from "../constant/Department.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Payslip.js";
//GET /api/dashbord
export const getDashboard = async (req, res) => {
  try {
    const session = req.session;

    if (session.role === "ADMIN") {
      const [totalEmployees, todayAttendance, pendingLeaves] = await Promise.all([
        Employee.countDocuments({
          isDeleted: { $ne: true }
        }),

        Attendance.countDocuments({
          date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        }),

        LeaveApplication.countDocuments({
          status: "PENDING",
        }),
      ]);

      return res.json({
        role: "ADMIN",
        totalEmployees,
        totalDepartments: DEPARTMENTS.length,
        todayAttendance,
        pendingLeaves
    });
    
    }
    else{
        const employee = await Employee.findOne({
        userId: session.userId,
        }).lean();

        if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
        }

        const today = new Date();

        const [currentMounthAttendance, pendingLeaves] = await Promise.all([
        Attendance.countDocuments({
            employeeId: employee._id,
            date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth()+1 , 1),

            },
        }),
        LeaveApplication.countDocuments({employeeId: employee._id}).sort({createAt: -1}).lean(),
        ]);
    }

    return res.json({
        role: "EMPLOYEE",
        employee: {...employee,id: employee._id.toString(),},
        currentMonthAttendance,
        pendingLeaves,
        latestPayslip: latestPayslip ? { ...latestPayslip, id: latestPayslip._id.toString(), } : null,});
  } catch (error) {
    console.error("Dashbord error:", error)
  }
};