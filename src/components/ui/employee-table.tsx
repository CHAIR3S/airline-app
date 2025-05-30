"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Employee } from "@/types/employee";
import { EmployeeAPI } from "@/app/api/employee";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    EmployeeAPI.getAll()
      .then(setEmployees)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puesto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {/* <Image
                    src="/placeholder.svg"
                    alt={`${employee.user.name} ${employee.user.lastName}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  /> */}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.user.name}</div>
                    <div className="text-sm text-gray-500">{employee.user.lastName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.salary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                <button className="text-red-600 hover:text-red-800">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
