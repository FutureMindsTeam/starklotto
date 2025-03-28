"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"

export interface ToastProps {
  title: string
  message: string
  type: "success" | "error"
  onClose: () => void
}

export const Toast = ({ title, message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-xs w-full z-50 
      ${type === "success" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-white">
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast 