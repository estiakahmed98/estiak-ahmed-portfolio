"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { InfinityBrand } from "@/components/ui/infinity-brand"

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const skills = [
    { name: "Figma", level: "Expert" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "MySQL", level: "Advanced" },
    { name: "MongoDB", level: "Advanced" },
    { name: "PostgreSQL", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "Next.js", level: "Intermediate" },
  ]

  const skillIcons = [
    { name: "TypeScript", icon: "/placeholder.svg?height=48&width=48" },
    { name: "React", icon: "/placeholder.svg?height=48&width=48" },
    { name: "Next.js", icon: "/placeholder.svg?height=48&width=48" },
    { name: "Tailwind", icon: "/placeholder.svg?height=48&width=48" },
    { name: "MongoDB", icon: "/placeholder.svg?height=48&width=48" },
    { name: "MySQL", icon: "/placeholder.svg?height=48&width=48" },
    { name: "PostgreSQL", icon: "/placeholder.svg?height=48&width=48" },
  ]

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <InfinityBrand icons={skillIcons} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
            <div className="w-full h-2 bg-[#ffffff10] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                initial={{ width: 0 }}
                animate={{
                  width: skill.level === "Expert" ? "100%" : skill.level === "Advanced" ? "80%" : "60%",
                }}
                transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
              />
            </div>
            <p className="text-sm text-[#00ffaa] mt-2">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

