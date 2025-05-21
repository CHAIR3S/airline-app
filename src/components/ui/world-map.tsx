"use client"

import { useEffect, useRef } from "react"

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw world map
    const drawMap = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background color
      ctx.fillStyle = "#E4E2FF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw simplified continents (just for illustration)
      ctx.fillStyle = "#C7C5FF"

      // North America
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.25, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.15, canvas.height * 0.5)
      ctx.closePath()
      ctx.fill()

      // South America
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.25, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.25, canvas.height * 0.8)
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.8)
      ctx.closePath()
      ctx.fill()

      // Europe
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.4, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.4)
      ctx.closePath()
      ctx.fill()

      // Africa
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.45, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.55, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.7)
      ctx.closePath()
      ctx.fill()

      // Asia
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.5, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.7, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.5)
      ctx.closePath()
      ctx.fill()

      // Australia
      ctx.beginPath()
      ctx.ellipse(
        canvas.width * 0.75,
        canvas.height * 0.65,
        canvas.width * 0.08,
        canvas.height * 0.1,
        0,
        0,
        Math.PI * 2,
      )
      ctx.fill()

      // Draw flight path
      ctx.strokeStyle = "#605DEC"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.2, canvas.height * 0.3) // Starting point (e.g., New York)

      // Create a curved path across the Pacific
      ctx.bezierCurveTo(
        canvas.width * 0.3,
        canvas.height * 0.2, // Control point 1
        canvas.width * 0.6,
        canvas.height * 0.2, // Control point 2
        canvas.width * 0.7,
        canvas.height * 0.3, // End point (e.g., Tokyo)
      )

      ctx.stroke()

      // Draw points for origin and destination
      ctx.setLineDash([])
      ctx.fillStyle = "#605DEC"

      // Origin point
      ctx.beginPath()
      ctx.arc(canvas.width * 0.2, canvas.height * 0.3, 5, 0, Math.PI * 2)
      ctx.fill()

      // Destination point
      ctx.beginPath()
      ctx.arc(canvas.width * 0.7, canvas.height * 0.3, 5, 0, Math.PI * 2)
      ctx.fill()
    }

    drawMap()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full bg-[#E4E2FF]" />
}
