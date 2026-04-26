import React, { useState } from 'react';
import { useLang } from '@/i18n/LangProvider';
import { events } from '@/data/events';
import { i18n } from '@/i18n/translations';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Events() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('All');

  const filters = [
    { id: 'All', label: t('filter_all') },
    { id: 'Athlétisme', label: t('filter_athletics') },
    { id: 'Football', label: t('filter_football') },
    { id: 'Basketball', label: t('filter_basketball') },
    { id: 'Natation', label: t('filter_swimming') },
    { id: 'Judo', label: t('filter_judo') }
  ];

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.sport === filter);

  return (
    <section id="events" className="min-h-screen bg-joj-dark py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] uppercase leading-none mb-2">
              <span className="text-white">{t('events_title')}</span>
              <span className="text-joj-orange ml-2">.</span>
            </h2>
            <p className="text-sm text-joj-muted tracking-wide font-sans">{t('events_sub')}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-sm text-xs tracking-wide uppercase font-sans transition-colors border ${
                  filter === f.id 
                    ? 'bg-joj-orange border-joj-orange text-white' 
                    : 'bg-joj-border border-joj-border text-joj-muted hover:bg-joj-orange hover:border-joj-orange hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredEvents.map((evt, idx) => {
              const nameKey = `name_${lang}` as keyof typeof evt;
              const phaseKey = `phase_${lang}` as keyof typeof evt;
              
              return (
                <motion.div
                  key={`${evt.sport}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-joj-dark2 border border-joj-border rounded overflow-hidden group hover:border-joj-orange transition-colors cursor-pointer"
                >
                  <div className="h-[180px] overflow-hidden relative">
                    <img 
                      src={evt.img} 
                      alt={evt[nameKey] as string} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-joj-orange text-white text-[10px] px-2.5 py-1 tracking-[2px] uppercase font-display">
                      {evt.sport}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1.5 rounded-sm font-sans">
                      {evt.date}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display text-xl mb-3 leading-tight line-clamp-2">
                      {evt[nameKey] as string}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-[13px] text-joj-muted font-sans">
                        <Clock className="w-3.5 h-3.5 text-joj-orange shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-joj-muted font-sans">
                        <MapPin className="w-3.5 h-3.5 text-joj-orange shrink-0" />
                        <span className="truncate">{evt.venue}, {evt.city}</span>
                      </div>
                    </div>
                    
                    <div className="inline-block bg-joj-border text-joj-muted text-[10px] px-2.5 py-1 rounded-sm tracking-wide uppercase font-sans">
                      {evt[phaseKey] as string}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
