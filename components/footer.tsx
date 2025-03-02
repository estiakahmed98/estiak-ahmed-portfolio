"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#ffffff10] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            © Developer Portfolio by{" "}
            <span className="text-[#00ffaa]">Estiak Ahmed</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
