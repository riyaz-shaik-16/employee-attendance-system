// src/seed/seedUsers.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  // Remove only employees (keep manager if exists)
  await User.deleteMany({ role: "employee" });

  // Create one manager
  const hashedManagerPass = await bcrypt.hash("admin123", 10);

  await User.findOneAndUpdate(
    { email: "manager@test.com" },
    {
      name: "Admin Manager",
      email: "manager@test.com",
      password: hashedManagerPass,
      role: "manager",
      department: "Management"
    },
    { upsert: true, new: true }
  );

  console.log("Manager created ✔");

  // Create 20 employees
  const departments = ["IT", "HR", "Finance", "Sales", "Support"];
  const employees = [];

  for (let i = 1; i <= 20; i++) {
    const hashed = await bcrypt.hash("123456", 10);

    employees.push({
      name: `Employee ${i}`,
      email: `employee${i}@test.com`,
      password: hashed,
      role: "employee",
      employeeId: `EMP${String(i).padStart(3, "0")}`,
      department: departments[Math.floor(Math.random() * departments.length)]
    });
  }

  await User.insertMany(employees);

  console.log("20 Dummy employees created ✔");
};
