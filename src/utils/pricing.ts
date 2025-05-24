

// calcular precio segun distancia, fecha y descuento de viajero frecuente
export function calcularPrecioVuelo(
  lat1: string,
  lon1: string,
  lat2: string,
  lon2: string,
  departureDate: string, // formato ISO
  discount?: string | number // de 0 al 100 %
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((Number(lat2) - Number(lat1)) * Math.PI) / 180;
  const dLon = ((Number(lon2) - Number(lon1)) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((Number(lat1) * Math.PI) / 180) *
      Math.cos((Number(lat2) * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  const precioPorKm = 5; // base
  let basePrice = distanceKm * precioPorKm;

  // Modificador de precio según la fecha
  const daysUntilFlight = Math.max(
    1,
    Math.floor(
      (new Date(departureDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  // Suponiendo que cuanto más cerca, más caro: (esto es opcional)
  const fechaFactor = 1 + (30 - Math.min(30, daysUntilFlight)) * 0.01;
  basePrice *= fechaFactor;

  // Descuento (ej: 10% -> 0.9)
  const parsedDiscount = typeof discount === "string" ? parseFloat(discount) : discount;
  const finalPrice =
    basePrice * (1 - (parsedDiscount && !isNaN(parsedDiscount) ? parsedDiscount / 100 : 0));

  return Math.round(finalPrice);
}

