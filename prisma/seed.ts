import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Start seeding...");

  /* =========================
   * COMPANY
   * ========================= */
  const company = await prisma.company.create({
    data: {
      name: "PT Demo Attendance",
      phone: "081234567890",
      address: "Bandung",
      latitude: -678901,
      longitude: 107609810,
      is_active: true,
    },
  });

  /* =========================
   * USERS (ADMIN)
   * ========================= */
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      company_id: company.id,
      email: "admin@demo.com",
      password: adminPassword,
      name: "Admin Demo",
      role: "ADMIN",
      is_active: true,
    },
  });

  /* =========================
   * DIVISIONS (3)
   * ========================= */
  const divisions = await prisma.division.createMany({
    data: [
      {
        company_id: company.id,
        name: "Engineering",
        description: "Software & IT Team",
      },
      {
        company_id: company.id,
        name: "Human Resource",
        description: "HR & People Ops",
      },
      {
        company_id: company.id,
        name: "Finance",
        description: "Finance & Accounting",
      },
    ],
  });

  const divisionList = await prisma.division.findMany({
    where: { company_id: company.id },
  });

  /* =========================
   * SHIFTS (2)
   * ========================= */
  const shiftMorning = await prisma.shift.create({
    data: {
      company_id: company.id,
      name: "Shift Pagi",
      shift_type: "FIXED",
      start_time: "08:00",
      end_time: "17:00",
      break_start: "12:00",
      break_end: "13:00",
      late_tolerance: 10,
      is_active: true,
    },
  });

  const shiftEvening = await prisma.shift.create({
    data: {
      company_id: company.id,
      name: "Shift Sore",
      shift_type: "FIXED",
      start_time: "13:00",
      end_time: "21:00",
      break_start: "17:00",
      break_end: "18:00",
      late_tolerance: 10,
      is_active: true,
    },
  });

  /* =========================
   * EMPLOYEES (5)
   * ========================= */
  const employeePassword = await bcrypt.hash("employee123", 10);

  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        company_id: company.id,
        email: `employee${i}@demo.com`,
        password: employeePassword,
        name: `Employee ${i}`,
        role: "EMPLOYEE",
        is_active: true,
      },
    });

    await prisma.employee.create({
      data: {
        user_id: user.id,
        company_id: company.id,
        employee_code: `EMP00${i}`,

        phone: `0810000000${i}`,
        identity_number: `32101234567800${i}`,
        place_of_birth: "Bandung",
        date_of_birth: new Date("1998-01-01"),
        gender: i % 2 === 0 ? "FEMALE" : "MALE",
        marital_status: "SINGLE",
        address: "Bandung",

        emergency_name: "Emergency Contact",
        emergency_phone: "0899999999",

        position: "Staff",
        join_date: new Date("2024-01-01"),
        working_type: "PERMANENT",
        status: "ACTIVE",

        division_id: divisionList[i % divisionList.length].id,
        shift_id: i % 2 === 0 ? shiftMorning.id : shiftEvening.id,

        base_salary: 7000000,
        bank_name: "BCA",
        bank_account: `12345678${i}`,
        bank_holder_name: user.name,
      },
    });
  }

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
