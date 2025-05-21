import * as React from "react"

interface SwitchProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-blue-600 transition duration-200 relative"
    />
  )
}
