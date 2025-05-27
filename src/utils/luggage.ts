
export type Luggage = {
  type: "cabina" | "documentada";
  width: number;
  height: number;
  depth: number;
  weight: number;
};

export function calcularCargoExtra(maleta: Luggage): number {
  const reglas = {
    cabina: { maxW: 55, maxH: 40, maxD: 20, maxP: 10, base: 0, extraKg: 20 },
    documentada: {
      maxW: 80,
      maxH: 50,
      maxD: 30,
      maxP: 23,
      base: 300,
      extraKg: 15,
    },
  };

  const r = reglas[maleta.type];

  let extra = r.base;

  const { width, height, depth, weight } = maleta;

  const sizeExceeded = width > r.maxW || height > r.maxH || depth > r.maxD;
  const pesoExtra = weight > r.maxP ? weight - r.maxP : 0;

  if (sizeExceeded) {
    extra += 100; // Penalización por tamaño excedido
  }

  if (pesoExtra > 0) {
    extra += pesoExtra * r.extraKg;
  }

  return extra;
}