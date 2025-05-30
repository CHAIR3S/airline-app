import { Airline, Place } from "./flight";

export type Filters = {
  airlineName?: string;
  originName?: string;
  destinationName?: string;
  status?: string;
};


export type FlightData = {
  flightId: number | undefined;
  origin: Place | undefined;
  destination: Place | undefined;
  departureDate: string | undefined;
  arrivalDate: string | undefined;
  airline: Airline | undefined;
  weather: string | undefined;
};


export type TopDestination = {
  city: string;
  total_reservations: number;
};

export type OccupancyRate = {
  destination: string;
  occupancyRate: number | string;
};


export type AverageBaggage = {
  flight_id: number
  avg_weight: number
}

export type BaggageData = {
  flight_id: number;
  avg_weight: number | string;
};

export type SalesSummary = {
  reservations: number;
  clients: number;
  flights: number;
  revenue: number;
  avgTicketPrice: number;
  occupancyRate: number;
};






export type DateItem = {
  day: string;
  date: string;
  month: string;
  year: string;
  monthNumber: number;
  isSelected?: boolean;
};

export type DateSelectorProps = {
  data: DateItem[];
  originId: number;
  destinationId: number;
  setFlights: any;
};


