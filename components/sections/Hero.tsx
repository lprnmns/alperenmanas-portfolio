'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TypingAnimation from '../animations/TypingAnimation';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
            <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl shadow-blue-500/50">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-5xl font-bold text-white">
                AM
              </div>
            </div>
            <motion.div
              className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4 text-5xl font-bold md:text-7xl"
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                Alperen Manas
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-8 h-8 text-xl font-light text-slate-300 md:text-2xl"
            >
              <TypingAnimation text="Yazılım Geliştirici & AI Mühendisi" className="text-slate-300" delay={80} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            15 yaşından beri Android işletim sistemi geliştirmeleriyle ilgileniyorum. Son yıllarda odağımı gerçek hayat
            problemlerini çözen yapay zeka projelerine kaydırdım. Düşük bütçeyle maksimum etki yaratacak çözümler üretmek
            ve balina yatırımcıların hamlelerinden finansal içgörüler çıkaran sistemler geliştirmek benim için bir tutku.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all"
            >
              Projeleri İncele
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border-2 border-blue-500 px-8 py-3 font-semibold text-blue-400 transition-all hover:bg-blue-500/10"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-slate-400 transition-colors hover:text-white"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}