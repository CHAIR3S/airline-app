"use client";

import Link from "next/link";
import StepperUI from "@/components/stepper-ui";
import PassengerForm from "@/components/passenger-form";
import FlightInfo, { FlightData } from "@/components/flight-info";
import SeatSelector from "@/components/seat-selector";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FlightApi } from "@/app/api/flight";
import { useParams, useRouter } from "next/navigation";
import { Flight } from "@/types/flight";
import { convertDate } from "@/utils/datetime";

function generarNumeroConfirmacion(): string {
  const bloque = () => Math.floor(100 + Math.random() * 900); // 3 dígitos
  return `${bloque()}-${bloque()}-${bloque()}`;
}

export default function PassengerInfoPage() {
  const { flightId } = useParams();
  const router = useRouter();

  const [flight, setFlight] = useState<Flight>();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    email: "sophia89@tripma.com",
    numeroConfirmacion: generarNumeroConfirmacion(),
  });

  const flightIdSecure = flightId ? Number(flightId) : null;

  // guardar formulario en localstorage
  useEffect(() => {
    localStorage.setItem("passenger-form", JSON.stringify(formData));

    console.log("form data en local storage", formData);
  }, [formData]);

  //detectar cambios en el formulario
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // obtener el avion (desde el parámetro flightId de la URL)
  useEffect(() => {
    if (!flightId) return;

    FlightApi.getFlightById(Number(flightId))
      .then((data: Flight) => {
        setFlight(data);
        console.log("estadata llega", data);
      })
      .catch(console.error);
  }, [flightId]);

  const properties: FlightData = {
    flightId: flight?.flightId,
    origin: flight?.origin,
    destination: flight?.destination,
    departureDate: flight?.arrivalTime,
    arrivalDate: flight?.arrivalTime,
    airline: flight?.airline,
    weather: flight?.destination.weather,
  };

  const isFormComplete = () => {
    return (
      formData.nombres.trim() !== "" &&
      formData.apellidos.trim() !== "" &&
      formData.telefono.trim() !== "" &&
      formData.fechaNacimiento.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.numeroConfirmacion.trim() !== ""
    );
  };

  // if(flight?.arrivalTime ==)
  //   const departureFormatted = convertDate(flight?.arrivalTime || "");

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Search Summary */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-[#605DEC]">
              <ArrowLeft size={16} className="mr-2" />
              Modificar búsqueda
            </Link>
            <div className="mx-4 text-gray-300">|</div>
            <div>
              <span className="font-medium">{flight?.origin.name}</span> →{" "}
              <span className="font-medium">{flight?.destination.name}</span> ·
              mayo · 1 adulto
            </div>
          </div>
        </div>
      </div>

      {/* Stepper UI */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <StepperUI currentStep={2} totalSteps={4} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Passenger Information Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 text-[#605DEC]">
              Información del pasajero
            </h1>
            <p className="text-gray-600 mb-6">
              Ingrese la información requerida, y asegúrese que coincida con la
              que está contenida en el ID del pasaporte.
            </p>

            <PassengerForm formData={formData} setFormData={setFormData} />

            {/* Seat Selector Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-[#605DEC]">
                Selector de asientos
              </h2>
              <SeatSelector seatNumber={flight?.aircraft.capacity} />
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  if (!flight?.flightId) return null;

                  localStorage.setItem('flight', JSON.stringify(flight));
                  
                  router.push(`/reservation/check-in/${flight.flightId}`);
                  
                }}
                disabled={!isFormComplete()}
                className={`cursor-pointer px-8 py-3 rounded-lg font-medium transition-colors ${
                  isFormComplete()
                    ? "bg-[#605DEC] text-white hover:bg-[#4F4ADB]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Guardar y continuar
              </button>
            </div>
          </div>

          {/* Flight Information Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-[#605DEC]">
              Información del vuelo
            </h2>
            <FlightInfo {...properties} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#605DEC] mb-6">Tripma</h2>
              <div className="flex space-x-4 mt-4">
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
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
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
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    About Tripma
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#605DEC] text-sm"
                  >
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            © 2025 Odisea incorporated
          </div>
        </div>
      </footer>
    </div>
  );
}
