'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { getCertificates } from '@/lib/content/certificates';

export default function Certificates() {
  const { language, dictionary } = useLanguage();
  const certificates = useMemo(() => getCertificates(language), [language]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="certificates" className="relative py-12">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
            {dictionary.certificatesSection.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            {dictionary.certificatesSection.subheading}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-6 grid-cols-1"
        >
          {certificates.map((cert, index) => {
            const imageAlt = language === 'en' ? `${cert.name} certificate` : `${cert.name} sertifikası`;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, rotateY: 4 }}
                className="group relative"
                style={{ perspective: '1000px' }}
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-600">
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-br ${cert.gradient}`}
                  />

                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-700/50">
                    <Image
                      src={cert.image}
                      alt={imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Award size={64} className="text-white/80" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-white transition-all group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">
                      {cert.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <p className="text-slate-400">{cert.issuer}</p>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition-colors hover:bg-blue-500/20"
                        aria-label={dictionary.certificatesSection.detailsAria}
                        type="button"
                      >
                        <ExternalLink size={18} />
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-blue-500/50"
                    initial={false}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
