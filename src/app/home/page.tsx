'use client'

import Image from "next/image"
import Link from "next/link"
import HotDeal from "./HotDeal"
import { useEffect, useState } from "react"
import { Place, PlaceAPI } from "@/app/api/place"
import PlaceCard from "@/components/place-card"
import { useRouter } from "next/navigation"

export default function Home() {
  const [originId, setOriginId] = useState<number>(0)
  const [destinationId, setDestinationId] = useState<string>("")
  const [places, setPlaces] = useState<Place[]>([])
  const [filtered, setFiltered] = useState<Place[]>([])
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (!originId || !destinationId) {
      console.log("selecciona todo")
      return
    }

    const query = new URLSearchParams({
      origin: originId.toString(),
    })

    router.push(`/reservation/date/${destinationId}?${query.toString()}`)
  }

  useEffect(() => {
    PlaceAPI.getAll()
      .then((res) => {
        setPlaces(res)
        setFiltered(res)
      })
      .catch((err) => alert(err.message))
  }, [])

  useEffect(() => {
    const q = query.toLowerCase()
    const results = places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.city?.toLowerCase().includes(q) ?? false) ||
        (p.country?.toLowerCase().includes(q) ?? false)
    )
    setFiltered(results)
  }, [query, places])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/external/map-blue.webp')" }}
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative z-10">
        <section className="relative py-16 md:pb-[25vh] pt-[17vh]">
          <div className="absolute inset-0 -z-10 bg-[url('/placeholdser.svg?height=800&width=1600')] bg-cover bg-center opacity-10" />
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-9xl md:text-6xl font-bold mb-12 text-gradient pb-2.5">
              Es más que un solo viaje
            </h1>

            {/* Input único de búsqueda */}
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca un lugar (nombre, ciudad, país...)"
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-300 outline-none text-gray-700 bg-white"
              />
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
            {filtered.map((place) => (
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
                  {/* Redes */}
                  {["twitter", "instagram", "facebook"].map((icon) => (
                    <a key={icon} href="#" className="text-gray-500 hover:text-[#605DEC]">
                      <i className={`feather feather-${icon}`} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">About</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-[#605DEC]">About Tripma</a></li>
                  <li><a href="#" className="hover:text-[#605DEC]">How it works</a></li>
                  <li><a href="#" className="hover:text-[#605DEC]">Press</a></li>
                  <li><a href="#" className="hover:text-[#605DEC]">Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-[#605DEC]">Help Center</a></li>
                  <li><a href="#" className="hover:text-[#605DEC]">Contact us</a></li>
                  <li><a href="#" className="hover:text-[#605DEC]">Terms of service</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm">
              © 2025 Odisea incorporated
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
