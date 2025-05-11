export default function DateSelector() {
  // Simulated dates for the week
  const dates = [
    { day: "Lun", date: "22", price: "$310", isSelected: false },
    { day: "Mar", date: "23", price: "$280", isSelected: false },
    { day: "Mié", date: "24", price: "$300", isSelected: true },
    { day: "Jue", date: "25", price: "$340", isSelected: false },
    { day: "Vie", date: "26", price: "$380", isSelected: false },
    { day: "Sáb", date: "27", price: "$420", isSelected: false },
    { day: "Dom", date: "28", price: "$390", isSelected: false },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Precios por fecha</h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-[#605DEC]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="text-gray-800 hover:text-[#605DEC]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-3 rounded-lg cursor-pointer ${
              date.isSelected ? "bg-[#605DEC] text-white" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-xs font-medium">{date.day}</span>
            <span className="text-lg font-bold my-1">{date.date}</span>
            <span className={`text-xs ${date.isSelected ? "text-white" : "text-gray-500"}`}>{date.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
