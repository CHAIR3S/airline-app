'use client'

import React from "react";

interface StepperUIProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepperUI({ currentStep, totalSteps }: StepperUIProps) {
  const steps = [
    { id: 1, name: "Seleccionar vuelo" },
    { id: 2, name: "Datos del pasajero" },
    { id: 3, name: "check-in" },
    { id: 4, name: "Pago y confirmación" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center transition-all duration-500">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center transition-all duration-500">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out
                  ${
                    step.id === currentStep
                      ? "bg-[#605DEC] text-white animate-fade-in-scale"
                      : step.id < currentStep
                      ? "bg-green-100 text-green-600 border border-green-600"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {step.id < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div
                className={`mt-2 text-sm font-medium transition-colors duration-500 ${
                  step.id === currentStep ? "text-[#605DEC]" : "text-gray-500"
                }`}
              >
                {step.name}
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                  step.id < currentStep ? "bg-[#605DEC]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
