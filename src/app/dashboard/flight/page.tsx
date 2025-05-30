import Link from "next/link"
import Image from "next/image"
import CreateFlightForm from "@/components/ui/create-flight-form"

export default function CreateFlightPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#605DEC]">Crear Nuevo Vuelo</h1>
          <Link href="/dashboard" className="flex items-center text-[#605DEC] hover:text-[#4F4ADB] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a la lista de vuelos
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <CreateFlightForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-15 mt-4">
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
