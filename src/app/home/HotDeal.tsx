import Image from "next/image"
import { Flame } from "lucide-react"

export default function HotDeal() {
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--pink-200)] to-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-10">
          <Flame className="text-red-500 mr-2" size={24} />
          <h2 className="text-3xl font-bold text-gray-800">Ofertas Para Ti</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold z-10">
                -40%
              </div>
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Paris" fill className="object-cover" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">
                    Paris, <span className="text-[#605DEC]">Francia</span>
                  </h3>
                  <p className="text-gray-500 text-sm">Vuelo directo + 5 noches de hotel</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm">$1,200</span>
                  <span className="text-lg font-bold text-red-500 block">$720</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Solo quedan 3 lugares
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">Salida: 15 Jun</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold z-10">
                -35%
              </div>
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Cancún" fill className="object-cover" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">
                    Cancún, <span className="text-[#605DEC]">México</span>
                  </h3>
                  <p className="text-gray-500 text-sm">Todo incluido + 7 noches</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm">$1,850</span>
                  <span className="text-lg font-bold text-red-500 block">$1,202</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Oferta flash</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">Salida: 10 Jul</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold z-10">
                -50%
              </div>
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="New York" fill className="object-cover" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">
                    New York, <span className="text-[#605DEC]">USA</span>
                  </h3>
                  <p className="text-gray-500 text-sm">Vuelo + 4 noches en Manhattan</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm">$1,600</span>
                  <span className="text-lg font-bold text-red-500 block">$800</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Último minuto</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">Salida: 5 Jun</span>
              </div>
            </div>
          </div>
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
