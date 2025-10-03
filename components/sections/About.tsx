'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, GraduationCap, Code, Brain, TrendingUp } from 'lucide-react';

const skills = {
  programming: [
    { name: 'TypeScript & React', level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Python', level: 75, color: 'from-purple-500 to-pink-500' },
    { name: 'SQL', level: 70, color: 'from-orange-500 to-red-500' },
  ],
  domains: [
    { name: 'Yazılım & Programlama', icon: Code },
    { name: 'Vibe Coding (Context & Prompt Engineering)', icon: Brain },
  ],
  interests: [
    { name: 'LLM', icon: Brain },
    { name: 'Algoritmalar', icon: Code },
    { name: 'Finansal Piyasalar', icon: TrendingUp },
  ],
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="relative py-12">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
            Hakkımda
          </h2>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-blue-400">
                <span className="rounded-lg bg-blue-500/10 p-2">
                  <Mail className="text-blue-400" size={24} />
                </span>
                Kişisel Bilgiler
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">İsim</p>
                  <p className="text-lg font-medium text-white">Alperen Manas</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">E-posta</p>
                  <motion.a
                    href="mailto:manasalperen@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="inline-block text-lg font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    manasalperen@gmail.com
                  </motion.a>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Eğitim</p>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-1 flex-shrink-0 text-blue-400" size={20} />
                    <p className="text-lg text-white">
                      Kırıkkale Üniversitesi · Bilgisayar Mühendisliği (3. sınıf)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm"
            >
              <p className="leading-relaxed text-slate-300">
                15 yaşından beri bilgisayar ve özellikle Android ekosistemindeki özelleştirmelerle ilgileniyorum. Son
                yıllarda odağımı, gerçek hayat problemlerini çözeceğine inandığım projeleri hızla hayata geçirmek için
                yapay zeka araçlarını kullanmaya kaydırdım. Balina yatırımcıların blockchain hareketlerini izleyen
                finansal otomasyonlar ve üretkenlik araçları geliştirirken, düşük bütçeyle maksimum etkiyi hedefliyorum.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold text-blue-400">Programlama Dilleri</h3>

              <div className="space-y-6">
                {skills.programming.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                        className={`relative h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      >
                        <div className="absolute inset-0 animate-pulse bg-white/20" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-400">
                  <Code size={20} />
                  Alan Bilgisi
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.domains.map((domain, index) => (
                    <motion.div
                      key={domain.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-700/50 px-4 py-2"
                    >
                      <domain.icon size={18} className="text-blue-400" />
                      <span className="text-sm text-white">{domain.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-400">
                  <Brain size={20} />
                  İlgi Alanları
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.interests.map((interest, index) => (
                    <motion.div
                      key={interest.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2"
                    >
                      <interest.icon size={18} className="text-cyan-400" />
                      <span className="text-sm text-white">{interest.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}