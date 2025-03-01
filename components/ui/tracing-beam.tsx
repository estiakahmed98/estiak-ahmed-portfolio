"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface TracingBeamProps {
  children: React.ReactNode
}

export function TracingBeam({ children }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight - 50]), {
    stiffness: 500,
    damping: 90,
  })

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className="relative w-full max-w-4xl mx-auto h-full">
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 255, 170, 0.5) 0px 0px 0px 2px",
            backgroundColor: scrollYProgress.get() > 0 ? "#00ffaa" : "transparent",
          }}
          className="ml-[9px] h-4 w-4 rounded-full border border-[#00ffaa]"
        />

        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#00ffaa"
            strokeOpacity="0.2"
            className="motion-safe:animate-pulse"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <motion.path
            d={`M 1 ${y1} L 1 ${y2}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-safe:animate-pulse"
          />

          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#ff00aa" stopOpacity="0" />
              <stop stopColor="#ff00aa" />
              <stop offset="0.5" stopColor="#00ffaa" />
              <stop offset="1" stopColor="#00ffaa" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="pt-4 ml-4">
        {children}
      </div>
    </motion.div>
  )
}

