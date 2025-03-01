"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        CONTACT WITH ME
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-6"
        >
          <p className="text-white/80 mb-6">
            If you have any questions or concerns, please don't hesitate to
            contact me. I am open to any work opportunities that align with my
            skills and interests.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name:
              </label>
              <div className="relative">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => setIsFocused({ ...isFocused, name: false })}
                  className={`bg-[#0a0a1f]/50 border-[#ffffff20] focus:border-[#00ffaa] transition-all ${
                    isFocused.name
                      ? "shadow-[0_0_10px_rgba(0,255,170,0.3)]"
                      : ""
                  }`}
                />
                {isFocused.name && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email:
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  className={`bg-[#0a0a1f]/50 border-[#ffffff20] focus:border-[#00ffaa] transition-all ${
                    isFocused.email
                      ? "shadow-[0_0_10px_rgba(0,255,170,0.3)]"
                      : ""
                  }`}
                />
                {isFocused.email && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Your Message:
              </label>
              <div className="relative">
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, message: true })}
                  onBlur={() => setIsFocused({ ...isFocused, message: false })}
                  className={`bg-[#0a0a1f]/50 border-[#ffffff20] focus:border-[#00ffaa] transition-all min-h-[120px] ${
                    isFocused.message
                      ? "shadow-[0_0_10px_rgba(0,255,170,0.3)]"
                      : ""
                  }`}
                />
                {isFocused.message && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                  />
                )}
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-[#ff00aa] to-[#00ffaa] hover:opacity-90">
              SEND MESSAGE
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] flex items-center justify-center">
              <Mail className="text-[#00ffaa]" />
            </div>
            <div>
              <p className="text-white/50 text-sm">Email</p>
              <p>estiakahmed898@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] flex items-center justify-center">
              <Phone className="text-[#00ffaa]" />
            </div>
            <div>
              <p className="text-white/50 text-sm">Phone</p>
              <p>+8801720151612</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] flex items-center justify-center">
              <MapPin className="text-[#00ffaa]" />
            </div>
            <div>
              <p className="text-white/50 text-sm">Location</p>
              <p>ECB Chattar, Dhaka Cantornment, Dhaka</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="https://github.com/estiakahmed98"
              className="text-[#ff00aa] hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/estiak-ahmed/"
              className="text-[#ff00aa] hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.facebook.com/estiakahmed.tusher/"
              className="text-[#ff00aa] hover:text-white transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://x.com/EstiakA74501023"
              className="text-[#ff00aa] hover:text-white transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
