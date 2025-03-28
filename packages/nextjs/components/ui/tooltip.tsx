"use client"

import { useState, useRef } from "react"
import type React from "react"

export interface TooltipProps {
  content: string
  children: React.ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="inline-flex">
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm 
            -translate-x-1/2 left-1/2 bottom-full mb-2 min-w-max"
        >
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  )
}

export default Tooltip 