const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export class FlightApi {

  static async getFlightById(flightId: number) {
    const res = await fetch(`${API_BASE}/flight/${flightId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener el vuelo.");
    }

    return res.json(); 
  }


  static async getAllFlightsActive() {
    const res = await fetch(`${API_BASE}/flight-active`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudo obtener los vuelos.");
    }

    return res.json(); 
  }


  static async getFlightsByDate(date: string, originId: number, destinationId: number) {
    const res = await fetch(`${API_BASE}/flight/by-date-origin-destination/${date}/${originId}/${destinationId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudieron obtener los vuelos para esa fecha.");
    }

    return res.json(); 
  }

  static async getScheduledDates(originId: number, destinationId: number): Promise<string[]> {
    const res = await fetch(`${API_BASE}/flight/dates/${originId}/${destinationId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudieron obtener las fechas de vuelo.");
    }

    return res.json(); 
  }


}



