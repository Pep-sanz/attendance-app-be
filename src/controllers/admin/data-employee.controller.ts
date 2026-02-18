import { Response } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeDetail,
  listEmployees,
  updateEmployee,
} from "../../services/admin/data-employee.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const postEmployeeController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user;

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        message: "Anda tidak memiliki akses",
      });
    }

    const employee = await createEmployee({
      ...req.body,
      company_id: admin?.company_id as string,
    });

    return res.status(201).json({
      message: "Karyawan berhasil dibuat",
      data: employee,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      message: error.message || "Gagal membuat employee",
    });
  }
};

export const GetEmployeeController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user;

    const result = await listEmployees(admin?.company_id as string, req.query);

    res.json({
      message: "Berhasil mengambil data employee",
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
      },
      result: result.data.map((item) => ({
        id: item.id,
        employee_code: item.employee_code,
        user_id: item.user_id,
        name: item.user.name,
        photo: item.user.photo,
        email: item.user.email,
        identity_number: item.identity_number,
        position: item.position,
        shift: item.shift?.name,
        working_type: item.working_type,
        status: item.status,
      })),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeDetailController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user;

    const employee = await getEmployeeDetail(
      req.params.id as string,
      admin?.company_id as string,
    );

    res.json({
      message: "Berhasil mengambil detail employee",
      data: employee,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEmployeeController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user;

    const employee = await updateEmployee(
      req.params.id as string,
      admin?.company_id as string,
      req.body,
    );

    res.json({
      message: "Employee berhasil diperbarui",
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployeeController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user;

    const employee = await deleteEmployee(
      req.params.id as string,
      admin?.company_id as string,
    );

    res.json({
      message: "Employee berhasil dinonaktifkan",
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
