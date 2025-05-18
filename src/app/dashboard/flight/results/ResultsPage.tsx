"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StepperUI from "@/components/ui/stepper-ui";
import DateSelector from "@/components/ui/date-selector";

export default function ResultsPage() {
    const flights = [
        {
            id: 1,
            airline: "Delta Airlines",
            logo: "/placeholder.svg?height=80&width=80",
            from: "NYC",
            to: "CHS",
            departureTime: "22:30",
            arrivalTime: "23:45",
            duration: "1H - 15M",
            type: "Non-Stop",
            price: "$300",
        },
        {
            id: 2,
            airline: "Spirit Airlines",
            logo: "/placeholder.svg?height=80&width=80",
            from: "NYC",
            to: "CHS",
            departureTime: "22:30",
            arrivalTime: "23:45",
            duration: "1H - 15M",
            type: "Non-Stop",
            price: "$300",
        },
        {
            id: 3,
            airline: "American Airlines",
            logo: "/placeholder.svg?height=80&width=80",
            from: "NYC",
            to: "CHS",
            departureTime: "18:15",
            arrivalTime: "20:45",
            duration: "2H - 30M",
            type: "1 Escala (MIA)",
            price: "$320",
        },
        {
            id: 4,
            airline: "United Airlines",
            logo: "/placeholder.svg?height=80&width=80",
            from: "NYC",
            to: "CHS",
            departureTime: "16:00",
            arrivalTime: "19:15",
            duration: "3H - 15M",
            type: "1 Escala (ATL)",
            price: "$290",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

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
                            <span className="font-medium">NYC</span> →{" "}
                            <span className="font-medium">CHS</span> · 24 mayo · 1 adulto
                        </div>
                    </div>
                </div>
            </div>

            {/* Stepper UI */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-6">
                    <StepperUI currentStep={1} totalSteps={3} />
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar with filters */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-medium text-lg mb-4">Filtros</h2>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Precio</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    defaultValue="300"
                                    className="w-full accent-[#605DEC]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>$1000</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Aerolíneas</h3>
                                {["Delta Airlines", "Spirit Airlines", "American Airlines", "United Airlines"].map((airline, idx) => (
                                    <label key={idx} className="flex items-center mb-1 text-sm">
                                        <input type="checkbox" className="mr-2 accent-[#605DEC]" defaultChecked={idx < 2} />
                                        {airline}
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Escalas</h3>
                                {["Directo", "1 escala", "2+ escalas"].map((scale, idx) => (
                                    <label key={idx} className="flex items-center mb-1 text-sm">
                                        <input type="checkbox" className="mr-2 accent-[#605DEC]" defaultChecked={idx === 0} />
                                        {scale}
                                    </label>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Duración</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="24"
                                    defaultValue="2"
                                    className="w-full accent-[#605DEC]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0h</span>
                                    <span>24h</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main content with date picker and results */}
                    <section className="lg:w-3/4">
                        <DateSelector />
                        <div className="mt-6 space-y-4">
                            <h2 className="text-2xl font-bold mb-2">4 Results</h2>
                            {flights.map((flight) => (
                                <div key={flight.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={flight.logo}
                                            alt={flight.airline}
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                        <div className="text-center md:text-left">
                                            <div className="text-lg font-semibold">{flight.from}</div>
                                            <div className="text-blue-500">{flight.departureTime}</div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-medium">{flight.airline}</div>
                                        <div className="text-sm text-gray-600">{flight.duration}</div>
                                        <div className="text-sm text-gray-500">{flight.type}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{flight.to}</div>
                                        <div className="text-blue-500">{flight.arrivalTime}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{flight.price}</div>
                                        <button className="bg-[#003B80] text-white px-4 py-2 rounded-full mt-2 hover:bg-[#002f6c] transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
