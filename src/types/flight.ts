// src/types/flight.ts
/** Posibles valores para el clima del lugar de origen/destino */
export type Weather =
  | 'SUNNY'
  | 'CLOUDY'
  | 'RAINY'
  | 'STORMY'
  | 'FOGGY'
  | 'SNOWY'

/** Estados operativos de una aeronave */
export type AircraftStatus = 'ACTIVE' | 'MAINTENANCE' | 'RETIRED'

/** Estados de un vuelo */
export type FlightStatus =
  | 'SCHEDULED'
  | 'DELAYED'
  | 'CANCELLED'
  | 'IN_AIR'
  | 'LANDED'

/** Buffer serializado que recibes desde tu API */
export interface BinaryPhoto {
  type: 'Buffer'
  data: number[]
}

export interface Airline {
  airlineId: number
  name: string
  country: string
  iataCode: string
  logoUrl: string
}

export interface Place {
  placeId: number
  name: string
  city: string
  country: string
  weather: Weather
  terminal: string
  photo: BinaryPhoto
  discount: string
  latitude: string // si prefieres, cámbialo a number
  longitude: string // idem
}

export interface Aircraft {
  aircraftId: number
  model: string
  capacity: number
  status: AircraftStatus
}

export interface Flight {
  flightId: number
  airline: Airline
  origin: Place
  destination: Place
  departureTime: string // ISO-8601; si lo parseas, usa Date
  arrivalTime: string
  status: FlightStatus
  aircraft: Aircraft

  /** Datos de telemetría (pueden venir nulos si aún no despega) */
  lastLatitude: number | null
  lastLongitude: number | null
  lastAltitude: number | null
  lastSpeedKmh: number | null
  lastUpdated: string | null
}

/** Respuesta completa: un arreglo de vuelos */
export type FlightsResponse = Flight[]
