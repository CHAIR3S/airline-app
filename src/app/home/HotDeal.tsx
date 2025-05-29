"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

type DiscountedPlace = {
  placeId: number
  name: string
  city?: string
  country?: string
  discount?: number
  photo: string | null
}

export default function HotDeal() {
  const [places, setPlaces] = useState<DiscountedPlace[]>([])

  useEffect(() => {
  fetch("http://localhost:4000/place/offers")
    .then(res => res.json())
    .then(data => {
      console.log("Datos recibidos:", data);
      setPlaces(data);
    })
    .catch(err => console.error("Error al cargar ofertas:", err));
}, []);


  return (
    <section className="py-16 bg-gradient-to-r from-[var(--pink-200)] to-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-10">
          <Flame className="text-red-500 mr-2" size={24} />
          <h2 className="text-3xl font-bold text-gray-800">Ofertas Para Ti</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(places) && places.map((place) => (
            
            <div
              key={place.placeId}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold z-10">
                  -{place.discount}%
                </div>
                <div className="relative h-48">
                  <Image
                    src={
                      place.photo
                        ? `data:image/jpeg;base64,${place.photo}`
                        : "/placeholder.svg?height=400&width=600"
                    }
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">
                      {place.name}, <span className="text-[#605DEC]">{place.city}</span>
                    </h3>
                    <p className="text-gray-500 text-sm">¡Aprovecha esta oferta exclusiva!</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-red-500 block">-{place.discount}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    Cliente frecuente
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-orange-600 transition-colors shadow-md">
            Ver todas las ofertas hot
          </button>
        </div>
      </div>
    </section>
  )
}
