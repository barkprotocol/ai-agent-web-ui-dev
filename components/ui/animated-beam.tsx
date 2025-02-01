"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement>
  fromRef: React.RefObject<HTMLDivElement>
  toRef: React.RefObject<HTMLDivElement>
  curvature?: number
  reverse?: boolean
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const container = containerRef.current
    const from = fromRef.current
    const to = toRef.current

    if (!canvas || !ctx || !container || !from || !to) return

    const animate = () => {
      if (!canvas || !ctx || !container || !from || !to) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      const fromRect = from.getBoundingClientRect()
      const toRect = to.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const startX = fromRect.left + fromRect.width / 2 - containerRect.left
      const startY = fromRect.top + fromRect.height / 2 - containerRect.top
      const endX = toRect.left + toRect.width / 2 - containerRect.left
      const endY = toRect.top + toRect.height / 2 - containerRect.top

      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2 - curvature

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(midX, midY, endX, endY)

      ctx.strokeStyle = "rgba(219, 207, 199, 0.1)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Animated particle
      const time = Date.now() * 0.001
      const t = reverse ? Math.abs(Math.sin(time)) : 1 - Math.abs(Math.sin(time))

      const particleX = startX + (endX - startX) * t
      const particleY = startY + (endY - startY) * t - Math.sin(Math.PI * t) * curvature

      ctx.beginPath()
      ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#dbcfc7"
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(() => {
      if (canvas && container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef, fromRef, toRef, curvature, reverse])

  return (
    <canvas ref={canvasRef} className="pointer-events-none absolute left-0 top-0 h-full w-full" style={{ zIndex: 1 }} />
  )
}

