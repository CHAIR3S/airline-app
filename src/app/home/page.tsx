"use client";

import Image from "next/image";
import Link from "next/link";
import HotDeal from "./HotDeal";
import { useEffect, useState } from "react";
import { Place, PlaceAPI } from "@/app/api/place";
import PlaceCard from "@/components/place-card";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Home() {

  const [originId, setOriginId] = useState<number>(0);
  const [destinationId, setDestinationId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<number>(1);
  const [places, setPlaces] = useState<Place[]>([]);
  const router = useRouter();




  useEffect(() => {
    PlaceAPI.getAll()
      .then(setPlaces)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo */}
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/external/map-blue.webp')",
          }}
        />

        {/* Capa translúcida encima para opacidad */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative z-10 ">
        <section className="relative py-16 md:pb-[25vh] pt-[17vh]">
          <div className="absolute inset-0 -z-10 bg-[url('/placeholdser.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-9xl md:text-6xl font-bold mb-12 text-gradient pb-2.5">
              It's more than just a trip
            </h1>

            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden max-w-4xl mx-auto">
              <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 basis-1/3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 mr-2"
                >
                  <path
                    d="M20.5 6.5L16.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 8.5L18.5 4.5L14.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 17.5L7.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5 15.5L5.5 19.5L9.5 19.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <select
                  className="outline-none w-full text-gray-600"
                  value={originId ?? ""}
                  onChange={(e) => setOriginId(Number(e.target.value))}
                >
                  <option value="">Origen</option>
                  {places.map((place) => (
                    <option key={place.placeId} value={place.placeId}>
                      {place.name}, {place.city}
                    </option>
                  ))}
                </select>


              </div>
              <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 basis-1/3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 mr-2"
                >
                  <path
                    d="M20.5 17.5L16.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 15.5L18.5 19.5L14.5 19.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 6.5L7.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5 8.5L5.5 4.5L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <select
                  className="outline-none w-full text-gray-600"
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                >
                  <option value="">Destino</option>
                  {places.map((place) => (
                    <option key={place.placeId} value={place.placeId}>
                      {place.name}, {place.city}
                    </option>
                  ))}
                </select>

              </div>
              <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 mr-2"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 14H8.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 14H12.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 14H16.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 18H8.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 18H12.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 18H16.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 3L7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 3L17 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex space-x-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Fehca de ida"
                    className="outline-none w-full text-gray-600"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || undefined}
                    placeholderText="Fecha de vuelta"
                    className="outline-none w-full text-gray-600"
                  />
                </div>

              </div>
              <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 mr-2"
                >
                  <path
                    d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.90625 20.2491C3.82834 18.6531 5.1542 17.3278 6.75064 16.4064C8.34708 15.485 10.1579 15 12.0011 15C13.8444 15 15.6552 15.4851 17.2516 16.4065C18.848 17.3279 20.1739 18.6533 21.0959 20.2493"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="outline-none w-full text-gray-600"
                  placeholder="1 adult"
                />

              </div>
              <button
                className="bg-[#605DEC] text-white p-4 md:px-8 hover:bg-[#4F4ADB] transition-colors font-medium"
                onClick={() => {
                  if (!originId || !destinationId || !startDate || !endDate) {
                    alert("Selecciona origen, destino y fechas.");
                    return;
                  }

                  const query = new URLSearchParams({
                    origin: originId.toString(),
                    start: startDate.toISOString().split("T")[0],
                    end: endDate.toISOString().split("T")[0],
                    passengers: passengers.toString(),
                  });

                  router.push(`/reservation/date/${destinationId}?${query.toString()}`);

                }}


              >
                Search
              </button>

            </div>
          </div>
        </section>
        {/* Hot Deals Section */}
        <HotDeal />
        {/* Destinations Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-medium text-center text-gray-700 mb-12">
            Encuentra tu próxima aventura...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {places.map((place) => (

              <PlaceCard key={place.placeId} {...place} />
            ))}
          </div>
        </section>
        {/* Footer */}
        <footer className="py-16 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-[#605DEC] mb-6">
                  Tripma
                </h2>
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
                      className="feather feather-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  About
                </h3>
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
        z
      </div>
    </div>
  );
}