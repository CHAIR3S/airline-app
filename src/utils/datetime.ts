


export type DateItem = {
  day: string;
  date: string;
  month: string;
  year: string;
  monthNumber: number;
  isSelected?: boolean;
};


/**
 * Convierte un string ISO-8601 a "HH:mm" (24 h, con ceros delante).
 * Usa siempre la zona horaria de la propia fecha (UTC si termina en "Z").
 */
export const formatIsoToHHMM = (iso: string): string => {
  const d = new Date(iso)

  // getHours / getMinutes -> hora local
  // getUTCHours / getUTCMinutes -> hora UTC
  // Aquí usamos getHours() para que respete el tz del navegador/servidor.
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}` // ej. "22:30"
}

/**
 * Devuelve la diferencia entre dos ISO strings en formato "1H - 15M".
 * Si la llegada es anterior a la salida (p. ej. cruza medianoche), corrige sumando 24 h.
 */
export const flightDuration = (
  departureIso: string,
  arrivalIso: string
): string => {
  const start = new Date(departureIso).getTime()
  let end = new Date(arrivalIso).getTime()

  // Corregir si el vuelo cruza medianoche y la API no ajustó la fecha
  if (end < start) end += 24 * 60 * 60 * 1000

  const totalMinutes = Math.floor((end - start) / 60_000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}H - ${minutes}M` // ej. "1H - 15M"
}


export function convertDate(isoDate: string): DateItem {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0");
  const monthNumber = Number((date.getMonth() + 1).toString().padStart(2, "0")); // 01-12
  const year = date.getFullYear().toString();

  const formatter = new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    month: "short",
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value || "";
  const monthText = parts.find((p) => p.type === "month")?.value || "";

  const result: DateItem = {
      day: capitalize(weekday),    // Ej: "Jue"
      date: day,                   // Ej: "22"
      month: capitalize(monthText),// Ej: "May"
      monthNumber,                // Ej: "05"
      year,                       // Ej: "2025"
      isSelected: false,          // Estado inicial
    }

  return result;
}





function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



export function formatTo12Hour(datetime: string): string {
  const date = new Date(datetime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // el 0 debe ser 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
}
