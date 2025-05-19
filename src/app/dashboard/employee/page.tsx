import Image from "next/image"
import Link from "next/link"
import EmployeeTable from "@/components/ui/employee-table"
import CreateEmployeeModal from "@/components/ui/create-employee-modal"

export default function EmployeesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold text-[#605DEC] mb-8">Gestión de Empleados</h1>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Buscar"
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#605DEC] focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <CreateEmployeeModal />
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <EmployeeTable />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-[#605DEC] mb-4">Tripma</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">© 2025 Odisea incorporated</div>
        </div>
      </footer>
    </div>
  )
}
