'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TypingAnimation from '../animations/TypingAnimation';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative inline-block"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl shadow-blue-500/50">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl font-bold text-white">
                AM
              </div>
            </div>
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Alperen Manas
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-2xl text-slate-300 font-light mb-8 h-8"
            >
              <TypingAnimation text="Yazılım Geliştirici & AI Mühendisi" className="text-slate-300" delay={80} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            15 yaşından beri Android işletim sistemi geliştirmeleriyle uğraşıyorum. Son yıllarda odağımı gerçek hayat
            problemlerini çözen yapay zeka projelerine kaydırdım. Düşük bütçeyle maksimum etki yaratacak çözümler
            üretmek ve balina yatırımcıların hamlelerinden finansal içgörüler çıkaran sistemler geliştirmek benim için
            bir tutku.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/30 transition-all"
            >
              Projeleri İncele
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-blue-500 rounded-lg text-blue-400 font-semibold hover:bg-blue-500/10 transition-all"
            >
              Hakkımda
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 3, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}