"use client"

import Link from "next/link"
import { Check, X } from 'lucide-react';
import FlightSummary from "@/components/flight-summary"
import PriceBreakdown from "@/components/price-breakdown"
import HotelSuggestion from "@/components/hotel-suggestion"
import { set } from 'react-hook-form';
import { useEffect, useState } from "react"
import { convertDate, DateItem, flightDuration, formatTo12Hour } from "@/utils/datetime"
import { Flight } from "@/types/flight"

export default function ConfirmationPage() {

  const [flight, setFlight] = useState<Flight>()
  const [departureDate, setDepartureDate] = useState<DateItem>()
  const [price, setPrice] = useState<string>("")
  const [selectedSeat, setSelectedSeat] = useState<string>("")
  
  useEffect(() => {
    const storage = localStorage.getItem('flight');
    setFlight(JSON.parse(storage? storage : '{}'));

    const pricing = localStorage.getItem('price');
    setPrice(pricing ? pricing : "$0");
    setSelectedSeat(localStorage.getItem('selected-seat') || "N/A");



    const dates = convertDate(flight?.departureTime || new Date().toISOString());
    setDepartureDate(dates);
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">


      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className=" mx-auto">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">¡Su vuelo ha sido agendado correctamente!</p>
              <p className="text-green-700 text-sm">Revise su correo para obtener el resúmen.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Flight Details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-[#605DEC] mb-6">¡Disfrute su viaje!</h1>

              <p className="text-gray-600 mb-8">
                Gracias por agendar su viaje con nosotros, debajo se encuentra un resúmen del mismo. Hemos enviado esta
                información a su correo electrónico. Puede encontrar esta misma información en el apartado{" "}
                <Link href="#" className="text-[#605DEC] hover:underline">
                  Ver mis vuelos
                </Link>
                .
              </p>

              <div className="mb-10">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Resúmen del vuelo</h2>

                {/* Departing Flight */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Departing {`${departureDate?.month} ${departureDate?.date} ${departureDate?.year}`} </p>
                  <FlightSummary
                    logo={flight?.airline.logoUrl!}
                    duration={flightDuration(flight?.departureTime || "", flight?.arrivalTime || "")}
                    airline={flight?.airline.name || ""}
                    departureTime={formatTo12Hour(flight?.departureTime || new Date().toISOString())}
                    arrivalTime={formatTo12Hour(flight?.arrivalTime || new Date().toISOString())}
                    price={price}
                  />
                  <p className="text-gray-600 mt-2 text-sm">Seat {selectedSeat} </p>
                </div>

                {/* Arriving Flight */}
                {/* <div className="mb-6">
                  <p className="text-gray-600 mb-2">Arriving March 21st, 2021</p>
                  <FlightSummary
                    duration="16h 45m"
                    airline="Hawaiian Airlines"
                    departureTime="7:00AM"
                    arrivalTime="4:15PM"
                    price={localStorage.getItem('price')!}
                  />
                  <p className="text-gray-600 mt-2 text-sm">Seat {localStorage.getItem('selected-seat')}</p>
                </div> */}

                {/* Price Breakdown */}
                <div className="mt-10">
                  <h2 className="text-xl font-medium text-gray-800 mb-4">Desglose de precios</h2>
                  <PriceBreakdown />
                </div>
              </div>
            </div>

            {/* Hotel Suggestions */}
            {/* <div className="lg:col-span-1">
              <h2 className="text-xl font-medium text-gray-800 mb-6">¿Cuál será tu próxima aventura?</h2>

              <div className="space-y-6">
                <HotelSuggestion
                  image="/placeholder.svg?height=300&width=500"
                  name="Ryokan Japan"
                  description="Enjoy views of the garden from your room"
                  price="$439"
                />

                <HotelSuggestion
                  image="/placeholder.svg?height=300&width=500"
                  name="Bessho SASA"
                  description="Japanese ryokan with private onsen bath"
                  price="$529"
                />

                <HotelSuggestion
                  image="/placeholder.svg?height=300&width=500"
                  name="HOTEL THE FLAG 大阪市"
                  description="Modern hotel in the heart of Osaka"
                  price="$139"
                />
              </div> */}
            {/* </div> */}
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
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    About Tripma
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">© 2025 Odisea incorporated</div>
        </div>
      </footer>
    </div>
  )
}
