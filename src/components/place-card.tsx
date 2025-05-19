import { Place } from "@/lib/api/place";
import Image from "next/image";

export default function PlaceCard({ placeId, name, city, country, weather, terminal, photo, cost, discount }: Place) {

    return (
                  <div
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={`data:image/png;base64,${photo}`}
                        alt={name}
                        fill
                        className="object-cover"
                      
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">
                            {name},{" "}
                            <span className="text-[#605DEC]">{city}</span>
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {country}
                          </p>
                        </div>
                        <span className="text-lg font-medium">{cost}</span>
                      </div>
                    </div>
                  </div>
    );

}