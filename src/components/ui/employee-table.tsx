import Image from "next/image"

interface Employee {
  id: number
  name: string
  lastName: string
  email: string
  phone: string
  employeeId: string
  position: string
  salary: number
  imageUrl: string
}

export default function EmployeeTable() {
  // Datos de ejemplo para empleados
  const employees: Employee[] = [
    {
      id: 1,
      name: "Tomás",
      lastName: "Villalobos Pérez",
      email: "tomas.vp@example.org",
      phone: "+34 612 345 678",
      employeeId: "EMP-001",
      position: "Piloto",
      salary: 85000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Isabella",
      lastName: "Moretti Rossi",
      email: "isabella.mr@example.it",
      phone: "+39 334 567 8901",
      employeeId: "EMP-002",
      position: "Azafata",
      salary: 42000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Diego",
      lastName: "Hernández Luján",
      email: "diego.hl@example.mx",
      phone: "+52 33 8765 4321",
      employeeId: "EMP-003",
      position: "Técnico de Mantenimiento",
      salary: 48000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Mei",
      lastName: "Lin Zhang",
      email: "mei.zhang@example.cn",
      phone: "+86 139 8765 4321",
      employeeId: "EMP-004",
      position: "Gerente de Operaciones",
      salary: 65000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      name: "Lucas",
      lastName: "Pereira da Silva",
      email: "lucas.pds@example.br",
      phone: "+55 21 99876 5432",
      employeeId: "EMP-005",
      position: "Controlador Aéreo",
      salary: 72000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 6,
      name: "Emma",
      lastName: "Dubois Lefevre",
      email: "emma.dubois@example.fr",
      phone: "+33 6 78 90 12 34",
      employeeId: "EMP-006",
      position: "Agente de Reservas",
      salary: 38000,
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Correo Electrónico
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID Empleado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Puesto
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salario
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={employee.imageUrl || "/placeholder.svg"}
                      alt={`${employee.name} ${employee.lastName}`}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.lastName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.employeeId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.position}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${employee.salary.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-[#605DEC] hover:text-[#4F4ADB] mr-3">Editar</button>
                <button className="text-red-600 hover:text-red-800">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
