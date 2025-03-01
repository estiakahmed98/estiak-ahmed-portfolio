"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
}

interface StackingCardsProps {
  projects: Project[]
}

export function StackingCards({ projects }: StackingCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }, [projects.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }, [projects.length])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [handleNext])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px]" ref={containerRef}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg overflow-hidden h-full">
            <div className="flex items-center gap-2 p-2 border-b border-[#ffffff10]">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-[#00ffaa]">{projects[currentIndex].title}</div>
            </div>

            <div className="p-6">
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={projects[currentIndex].image || "/placeholder.svg"}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] to-transparent"></div>
              </div>

              <h3 className="text-xl font-bold mb-2">{projects[currentIndex].title}</h3>
              <p className="text-white/70 mb-4">{projects[currentIndex].description}</p>

              <div className="flex flex-wrap gap-2">
                {projects[currentIndex].technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 text-xs rounded-full bg-[#0a0a1f] border border-[#ffffff20]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a1f]/80 backdrop-blur-sm border border-[#ffffff10] flex items-center justify-center z-10"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a1f]/80 backdrop-blur-sm border border-[#ffffff10] flex items-center justify-center z-10"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-[#00ffaa]" : "bg-[#ffffff30]"}`}
          />
        ))}
      </div>
    </div>
  )
}

