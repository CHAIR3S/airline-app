'use client'

import { use, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function PriceBreakdown() {

  const [price, setPrice] = useState<number>(0);
  const [baggage, setBaggage] = useState<any>([]);
  const [baggageCost, setBaggageCost] = useState<number>(0);
  const [isFirstClass, setIsFirstClass] = useState<boolean>(false);


 useEffect(() => {
    const localPrice = localStorage.getItem("price");
    const localBaggage = localStorage.getItem("luggageItems");
    
    
    setPrice(parseFloat((localPrice!.slice(2, -1)).replace(/,/g, "")));
    
    console.log("Price from localStorage:", parseFloat((localPrice!.slice(2, -1)).replace(/,/g, "")));
    setBaggage(JSON.parse(localBaggage || "[]"));
  }, []);

  useEffect(() => {
    if (!baggage.length) return;

    const baggageCost = baggage.reduce(
      (acc: number, item: any) => acc + (item.extraAmount || 0),
      0
    );

    setBaggageCost(baggageCost);
    console.log("Total baggage price:", baggageCost);
  }, [baggage]);

  useEffect(() => {
    const isFirstClass = localStorage.getItem('selected-seat-section') === "first-class";
    setIsFirstClass(isFirstClass);
  }, []);


  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Vuelo</span>
        <span className="font-medium">${price}</span>
      </div>

      {/* <div className="flex justify-between items-center">
        <span className="text-gray-600">Arriving Flight</span>
        <span className="font-medium">$251.50</span>
      </div> */}

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Cuota de equipaje</span>
        <span className="font-medium">${baggageCost}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Asiento ({isFirstClass ? 'Primera Clase' : 'Asiento normal'})</span>
        <span className="font-medium">{isFirstClass ? '$1000' : '$0'}</span>
      </div>

      {/* <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">${(price + Number(baggageCost) + (isFirstClass ? Number(process.env.NEXT_PUBLIC_PRECIO_PRIMERA_CLASE)! : 0))}</span>
      </div> */}

      {/* <div className="flex justify-between items-center">
        <span className="text-gray-600">Taxes (9.4%)</span>
        <span className="font-medium">$66</span>
      </div> */}

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="font-medium">Total pagado</span>
        <span className="font-bold text-lg">${(price + Number(baggageCost) + (isFirstClass ? Number(process.env.NEXT_PUBLIC_PRECIO_PRIMERA_CLASE)! : 0))}</span>
      </div>
    </div>
  )
}
