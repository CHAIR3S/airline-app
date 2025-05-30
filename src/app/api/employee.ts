import { Employee } from "@/types/employee";

export const EmployeeAPI = {
  async getAll(): Promise<Employee[]> {
    const res = await fetch("http://localhost:4000/employee", { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener empleados");
    return res.json();
  },

  async create(data: {
    userId: number;
    positionId: number;
    salary: number;
    airlineId?: number;
  }) {
    const res = await fetch("http://localhost:4000/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al crear empleado");
    return res.json();
  },
};
