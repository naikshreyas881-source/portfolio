import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications: React.FC = () => {
  const { data } = usePortfolio();
  const { certifications } = data;

  // Crucial requirement: If empty, hide completely. Never show fake/empty credentials.
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verified Credentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Certifications &amp; Licenses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-emerald-500 transition-colors"
                      title="Verify Certificate"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {cert.name}
                </h3>
                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                  {cert.organization}
                </div>

                {cert.credentialId && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued: {cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
