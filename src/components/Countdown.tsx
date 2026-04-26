import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/i18n/LangProvider';

const TARGET = new Date('2026-10-30T08:00:00Z').getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
}

export const Countdown: React.FC = () => {
  const t = useT();
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const segments = [
    { value: time.days, label: t('countdown_days') },
    { value: time.hrs, label: t('countdown_hrs') },
    { value: time.min, label: t('countdown_min') },
    { value: time.sec, label: t('countdown_sec') },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 px-6 bg-gradient-to-b from-joj-dark via-[#0c1410] to-joj-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,107,26,0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-joj-orange/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-joj-orange uppercase tracking-[0.3em] text-xs mb-4 font-semibold">
            {t('countdown_tag')}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3 leading-tight">
            {t('countdown_title')}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-12">{t('countdown_dates')}</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto">
          {segments.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative bg-white/5 border border-white/10 rounded-xl py-6 md:py-8 backdrop-blur-sm hover:border-joj-orange/40 transition-colors"
            >
              <div className="font-display text-4xl md:text-6xl font-bold tabular-nums text-white">
                {String(s.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/50 mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
