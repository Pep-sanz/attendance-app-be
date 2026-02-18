import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes";
import employeeRoutes from "./routes/admin/employee.routes";
import adminCompanyRoutes from "./routes/admin/company.route";
import CompanyRoutes from "./routes/superadmin/company.route";
import userRoutes from "./routes/superadmin/user.routes";
import shiftRoutes from "./routes/admin/shift.route";
import attendanceRoutes from "./routes/admin/attendance.routes";
import divisionRoutes from "./routes/admin/division.routes";
import leaveCategoriesRoutes from "./routes/admin/leave-categories.routes";
import adminLeaveRequsetRoutes from "./routes/admin/leave.routes";
import adminResignationRoutes from "./routes/admin/resignation.routes";
import employeeLeaveRoutes from "./routes/employee/leave.routes";
import employeeAttendance from "./routes/employee/attendance.routes";
import employeeResignationRoutes from "./routes/employee/resignation.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth Routes
app.use("/auth", authRoutes);

// superadmin Routes
app.use("/user", userRoutes);
app.use("/company", CompanyRoutes);

// Admin Routes
app.use("/admin/shift", shiftRoutes);
app.use("/admin/data-employee", employeeRoutes);
app.use("/admin/attendance", attendanceRoutes);
app.use("/admin/company", adminCompanyRoutes);
app.use("/admin/leave-categories", leaveCategoriesRoutes);
app.use("/admin/division", divisionRoutes);
app.use("/admin/leave-request", adminLeaveRequsetRoutes);
app.use("/admin/resignation-request", adminResignationRoutes);

// Employee Routes
app.use("/employee/attendance/", employeeAttendance);
app.use("/employee/leave/", employeeLeaveRoutes);
app.use("/employee/resignation-request/", employeeResignationRoutes);

export default app;
