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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Hakkımda
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Mail className="text-blue-400" size={24} />
                </div>
                Kişisel Bilgiler
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-sm mb-1">İsim</p>
                  <p className="text-white text-lg font-medium">Alperen Manas</p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm mb-1">E-posta</p>
                  <motion.a
                    href="mailto:manasalperen@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="text-blue-400 text-lg font-medium hover:text-blue-300 transition-colors inline-block"
                  >
                    manasalperen@gmail.com
                  </motion.a>
                </div>

                <div>
                  <p className="text-slate-500 text-sm mb-1">Eğitim</p>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <p className="text-white text-lg">
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
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              <p className="text-slate-300 leading-relaxed">
                15 yaşından beri bilgisayar ve özellikle Android ekosistemindeki özelleştirmelerle ilgileniyorum. Son
                yıllarda odağımı, gerçek hayat problemlerini çözeceğine inandığım projeleri hızla hayata geçirmek için
                yapay zeka araçlarını kullanmaya kaydırdım. Balina yatırımcıların blockchain hareketlerini izleyen
                finansal otomasyonlar ve üretkenlik araçları geliştirirken, düşük bütçeyle maksimum etkiyi hedefliyorum.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Programlama Dilleri</h3>

              <div className="space-y-6">
                {skills.programming.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
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
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600/50"
                    >
                      <domain.icon size={18} className="text-blue-400" />
                      <span className="text-white text-sm">{domain.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
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
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30"
                    >
                      <interest.icon size={18} className="text-cyan-400" />
                      <span className="text-white text-sm">{interest.name}</span>
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