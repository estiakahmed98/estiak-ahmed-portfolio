"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

export const BackgroundGradientAnimation = ({
  children,
  className,
  containerClassName,
  gradientBackgroundStart = "#0a0a1f",
  gradientBackgroundEnd = "#0a0a1f",
  firstColor = "rgba(0, 255, 170, 0.2)",
  secondColor = "rgba(255, 0, 170, 0.2)",
  thirdColor = "rgba(0, 255, 255, 0.2)",
  fourthColor = "rgba(255, 0, 255, 0.2)",
  fifthColor = "rgba(0, 255, 0, 0.2)",
  pointerColor = "rgba(0, 255, 170, 0.4)",
  size = "80%",
  blendingValue = "hard-light",
  opacity = "0.5",
  interactive = true,
  containerStyle,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  opacity?: string
  interactive?: boolean
  containerStyle?: React.CSSProperties
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorMoving, setCursorMoving] = useState(false)
  const [mouseLeft, setMouseLeft] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactiveRef.current) return

    const rect = interactiveRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCursorPosition({ x, y })
    setCursorMoving(true)
    setMouseLeft(false)

    setTimeout(() => {
      setCursorMoving(false)
    }, 300)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseLeft(true)
  }, [])

  useEffect(() => {
    if (!interactive || !interactiveRef.current) return

    const element = interactiveRef.current
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [interactive, handleMouseMove, handleMouseLeave])

  return (
    <div className={`h-full w-full overflow-hidden ${containerClassName}`} style={containerStyle} ref={interactiveRef}>
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to bottom, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
          }}
        ></div>

        <div
          className="absolute left-0 top-0 z-10 h-full w-full"
          style={{
            mixBlendMode: blendingValue as any,
            opacity: opacity,
          }}
        >
          {/* First blob */}
          <motion.div
            className="absolute left-[5%] top-[5%] h-[40%] w-[40%] rounded-full bg-blend-multiply"
            style={{
              background: firstColor,
              mixBlendMode: "multiply",
              width: size,
              height: size,
              filter: "blur(80px)",
            }}
            animate={{
              x: mouseLeft ? 0 : cursorMoving ? cursorPosition.x * 0.1 : 0,
              y: mouseLeft ? 0 : cursorMoving ? cursorPosition.y * 0.1 : 0,
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
          ></motion.div>

          {/* Second blob */}
          <motion.div
            className="absolute bottom-[20%] left-[20%] h-[40%] w-[40%] rounded-full bg-blend-multiply"
            style={{
              background: secondColor,
              mixBlendMode: "multiply",
              width: size,
              height: size,
              filter: "blur(80px)",
            }}
            animate={{
              x: mouseLeft ? 0 : cursorMoving ? cursorPosition.x * 0.05 : 0,
              y: mouseLeft ? 0 : cursorMoving ? cursorPosition.y * 0.05 : 0,
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
          ></motion.div>

          {/* Third blob */}
          <motion.div
            className="absolute right-[20%] top-[20%] h-[40%] w-[40%] rounded-full bg-blend-multiply"
            style={{
              background: thirdColor,
              mixBlendMode: "multiply",
              width: size,
              height: size,
              filter: "blur(80px)",
            }}
            animate={{
              x: mouseLeft ? 0 : cursorMoving ? cursorPosition.x * -0.05 : 0,
              y: mouseLeft ? 0 : cursorMoving ? cursorPosition.y * -0.05 : 0,
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
          ></motion.div>

          {/* Fourth blob */}
          <motion.div
            className="absolute bottom-[30%] right-[30%] h-[40%] w-[40%] rounded-full bg-blend-multiply"
            style={{
              background: fourthColor,
              mixBlendMode: "multiply",
              width: size,
              height: size,
              filter: "blur(80px)",
            }}
            animate={{
              x: mouseLeft ? 0 : cursorMoving ? cursorPosition.x * -0.1 : 0,
              y: mouseLeft ? 0 : cursorMoving ? cursorPosition.y * -0.1 : 0,
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
          ></motion.div>

          {/* Fifth blob */}
          <motion.div
            className="absolute bottom-[10%] right-[10%] h-[40%] w-[40%] rounded-full bg-blend-multiply"
            style={{
              background: fifthColor,
              mixBlendMode: "multiply",
              width: size,
              height: size,
              filter: "blur(80px)",
            }}
            animate={{
              x: mouseLeft ? 0 : cursorMoving ? cursorPosition.x * -0.08 : 0,
              y: mouseLeft ? 0 : cursorMoving ? cursorPosition.y * -0.08 : 0,
            }}
            transition={{ duration: 0.5, ease: "backOut" }}
          ></motion.div>

          {/* Pointer blob */}
          {interactive && !mouseLeft && (
            <motion.div
              className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blend-multiply"
              style={{
                background: pointerColor,
                mixBlendMode: "multiply",
                left: cursorPosition.x,
                top: cursorPosition.y,
                filter: "blur(60px)",
              }}
              animate={{
                width: cursorMoving ? "120px" : "40px",
                height: cursorMoving ? "120px" : "40px",
              }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          )}
        </div>

        <div className={`relative z-20 h-full w-full ${className}`}>{children}</div>
      </div>
    </div>
  )
}

