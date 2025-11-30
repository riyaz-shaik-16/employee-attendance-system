// src/seed/seedUsers.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  // Remove all employees (keep manager)
  await User.deleteMany({ role: "employee" });

  // Create / update manager
  const hashedManagerPass = await bcrypt.hash("admin123", 10);

  await User.findOneAndUpdate(
    { email: "manager@test.com" },
    {
      name: "Admin Manager",
      email: "manager@test.com",
      password: hashedManagerPass,
      role: "manager",
      department: "Management",
      employeeId: null,   // manager doesn't need employeeId
    },
    { upsert: true, new: true }
  );

  console.log("Manager created ✔");

  // Create 20 dummy employees
  const departments = ["IT", "HR", "Finance", "Sales", "Support"];
  const employees = [];

  for (let i = 1; i <= 20; i++) {
    const email = `employee${i}@test.com`;
    const hashed = await bcrypt.hash("123456", 10);

    employees.push({
      name: `Employee ${i}`,
      email,
      password: hashed,
      role: "employee",
      employeeId: email, // employeeId = email
      department: departments[Math.floor(Math.random() * departments.length)],
    });
  }

  await User.insertMany(employees);

  console.log("20 Dummy employees created ✔");
};
