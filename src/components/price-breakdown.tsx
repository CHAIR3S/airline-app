export default function PriceBreakdown() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Departing Flight</span>
        <span className="font-medium">$251.50</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Arriving Flight</span>
        <span className="font-medium">$251.50</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Baggage fees</span>
        <span className="font-medium">$0</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Seat upgrade (business)</span>
        <span className="font-medium">$199</span>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">$702</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Taxes (9.4%)</span>
        <span className="font-medium">$66</span>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="font-medium">Amount paid</span>
        <span className="font-bold text-lg">$768</span>
      </div>
    </div>
  )
}
