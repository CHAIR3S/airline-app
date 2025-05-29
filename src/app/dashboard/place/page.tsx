"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MapPin } from "lucide-react";
import CreatePlaceModal, {
  CreatePlaceDto,
} from "@/components/create-place-modal";
import { PlaceAPI } from "@/app/api/place";

export default function PlacesPage() {
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [places, setPlaces] = useState<CreatePlaceDto[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<CreatePlaceDto | null>(
    null
  );

  useEffect(() => {
    PlaceAPI.getAll()
      .then((placeData: any) => {
        setPlaces(placeData);
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleSavePlace = (place: CreatePlaceDto) => {
    setPlaces((prev) => {
      const index = prev.findIndex((p) => p.name === place.name);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = place;
        return updated;
      } else {
        return [...prev, place];
      }
    });
    setSelectedPlace(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Lugares
          </h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-[#605DEC] hover:bg-[#4F4ADB]"
          >
            <PlusCircle className="mr-2 h-4 w-4 " />
            Nuevo Lugar
          </Button>
        </div>

        {/* Lista de lugares */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place, index) => (
                <div
                  onClick={() => {
                    setSelectedPlace(place);
                    setIsModalOpen(true);
                  }}
                  key={index}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  {place.photo ? (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`data:image/png;base64,${place.photo}`}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{place.name}</h3>
                    <p className="text-gray-600">
                      {place.city && place.country
                        ? `${place.city}, ${place.country}`
                        : place.city || place.country || "Sin ubicación"}
                    </p>
                    {place.terminal && (
                      <p className="text-sm text-gray-500">
                        Terminal: {place.terminal}
                      </p>
                    )}
                    {place.weather && (
                      <p className="text-sm text-gray-500">
                        Clima:{" "}
                        {place.weather.charAt(0) +
                          place.weather.slice(1).toLowerCase()}
                      </p>
                    )}
                    {place.discount &&
                      (place.discount != 0 ? (
                        <p className="text-sm font-medium text-green-600">
                          Descuento: {place.discount}%
                        </p>
                      ) : (
                        <p></p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No hay lugares
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Comienza creando un nuevo lugar.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal para crear lugar */}
        <CreatePlaceModal
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            setSelectedPlace(null);
        }}
        onSave={handleSavePlace}
        initialData={selectedPlace}
        />
    </div>
  );
}
