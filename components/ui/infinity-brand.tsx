"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface InfinityBrandProps {
  icons: { name: string; icon: string }[]
}

export function InfinityBrand({ icons }: InfinityBrandProps) {
  const [duplicatedIcons, setDuplicatedIcons] = useState<{ name: string; icon: string }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Duplicate icons to create infinite effect
    setDuplicatedIcons([...icons, ...icons, ...icons])
  }, [icons])

  return (
    <div className="w-full overflow-hidden py-10" ref={containerRef}>
      <motion.div
        className="flex gap-8"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {duplicatedIcons.map((icon, index) => (
          <div key={`${icon.name}-${index}`} className="flex flex-col items-center justify-center gap-2 min-w-[100px]">
            <div className="relative w-16 h-16 bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-2 flex items-center justify-center">
              <Image
                src={icon.icon || "/placeholder.svg"}
                alt={icon.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff00aa]/5 to-[#00ffaa]/5 rounded-lg"></div>
            </div>
            <p className="text-sm text-white/70">{icon.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

