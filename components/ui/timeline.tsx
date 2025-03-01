"use client"

import { motion } from "framer-motion"

interface TimelineItem {
  title: string
  company: string
  period: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff00aa] to-[#00ffaa]"></div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative pl-12 pb-12"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#0a0a1f] border-2 border-[#00ffaa] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#ff00aa]"></div>
          </div>

          <div className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-6">
            <div className="text-[#00ffaa] text-sm mb-2">{item.period}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/70 mb-4">{item.company}</p>
            <p className="text-white/60 text-sm">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

