import React from 'react';
import { useLang } from '@/i18n/LangProvider';
import { MascotImage } from './MascotImage';
import { motion } from 'framer-motion';

export function Hero() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden bg-joj-dark">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(26,107,32,0.25)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(255,107,26,0.15)_0%,transparent_50%)]" />
      <div className="hero-bg-lines" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-0 items-center py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-start"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="w-8 h-[2px] bg-joj-orange hidden lg:block" />
            <h2 className="text-joj-orange text-xs tracking-[5px] uppercase font-sans font-semibold">
              {t('hero_tag')}
            </h2>
            <div className="w-8 h-[2px] bg-joj-orange hidden lg:block" />
          </div>

          <h1 className="font-display text-[clamp(52px,7vw,96px)] leading-[0.95] font-bold mb-3 uppercase tracking-tight">
            <span>JOJ</span>
            <span className="text-joj-orange block">IMMERSIVE</span>
            <span>FAN</span>
          </h1>

          <p className="font-display text-[clamp(18px,2.5vw,28px)] text-joj-orange-hover mb-6 font-normal tracking-wide">
            {t('hero_phrase')}
          </p>

          <p className="text-joj-muted text-base leading-relaxed max-w-[460px] mx-auto lg:mx-0 mb-10 font-sans">
            {t('hero_sub')}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => scrollTo('events')}
              className="bg-joj-orange hover:bg-joj-orange-hover text-white px-9 py-4 rounded font-display text-[15px] tracking-[2px] uppercase transition-all hover:-translate-y-0.5"
            >
              {t('hero_btn1')}
            </button>
            <button 
              onClick={() => scrollTo('map')}
              className="bg-transparent border border-joj-border hover:border-joj-orange hover:text-joj-orange text-white px-9 py-4 rounded font-display text-[15px] tracking-[2px] uppercase transition-all"
            >
              {t('hero_btn2')}
            </button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
            {[
              { num: '35', label: t('stat1') },
              { num: '193', label: t('stat2') },
              { num: '2700+', label: t('stat3') },
              { num: '8', label: t('stat4') }
            ].map((stat, i) => (
              <div key={i} className="border-s-2 border-joj-orange ps-4">
                <div className="font-display text-3xl text-white leading-none">{stat.num}</div>
                <div className="text-[11px] text-joj-muted uppercase tracking-[2px] mt-1 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-end"
        >
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.18)_0%,transparent_70%)] bottom-0 left-1/2 -translate-x-1/2" />
          <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-joj-orange/15 bottom-4 left-1/2 -translate-x-1/2" />
          <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-joj-green/20 bottom-12 left-1/2 -translate-x-1/2" />
          <MascotImage className="w-[300px] md:w-[400px] h-auto filter drop-shadow-[0_30px_60px_rgba(255,107,26,0.35)] relative z-10" />
        </motion.div>
      </div>
    </section>
  );
}
