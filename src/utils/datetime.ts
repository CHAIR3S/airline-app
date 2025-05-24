
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
