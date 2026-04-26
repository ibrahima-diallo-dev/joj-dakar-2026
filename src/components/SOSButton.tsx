import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/i18n/LangProvider';

type Contact = {
  key: string;
  number: string;
  color: string;
  iconPath: React.ReactNode;
};

const CONTACTS: Contact[] = [
  {
    key: 'sos_police',
    number: '17',
    color: '#1A6B20',
    iconPath: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
  },
  {
    key: 'sos_fire',
    number: '18',
    color: '#C0200A',
    iconPath: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    ),
  },
  {
    key: 'sos_samu',
    number: '1515',
    color: '#E8A830',
    iconPath: (
      <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </>
    ),
  },
];

export const SOSButton: React.FC = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoErr, setGeoErr] = useState<string | null>(null);
  const [geoBusy, setGeoBusy] = useState(false);

  const shareLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeoErr(t('sos_geo_unsupported'));
      return;
    }
    setGeoBusy(true);
    setGeoErr(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoBusy(false);
      },
      () => {
        setGeoErr(t('sos_geo_error'));
        setGeoBusy(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const mapUrl = coords
    ? `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=17/${coords.lat}/${coords.lng}`
    : null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('sos_open')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 left-6 z-[60] h-16 px-5 rounded-full bg-[#C0200A] text-white shadow-2xl shadow-[#C0200A]/40 flex items-center gap-2 ring-4 ring-[#C0200A]/20 hover:ring-[#C0200A]/30 transition group"
      >
        <span className="relative flex w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-white/80 animate-ping" />
          <span className="relative inline-flex rounded-full w-3 h-3 bg-white" />
        </span>
        <span className="font-display tracking-[0.18em] text-base">SOS</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl overflow-hidden bg-[#101410] border border-white/10 shadow-2xl"
            >
              <div className="bg-gradient-to-r from-[#C0200A] to-[#E8392C] px-6 py-5 text-white relative">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <div className="font-display uppercase tracking-[0.2em] text-2xl leading-none">
                  {t('sos_title')}
                </div>
                <div className="mt-1.5 text-white/90 text-sm">{t('sos_subtitle')}</div>
              </div>

              <div className="px-5 py-5 space-y-2.5">
                {CONTACTS.map((c) => (
                  <a
                    key={c.key}
                    href={`tel:${c.number}`}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: c.color }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        {c.iconPath}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium leading-tight">{t(c.key)}</div>
                      <div className="text-white/50 text-xs mt-0.5">{t(`${c.key}_desc`)}</div>
                    </div>
                    <div className="font-display text-2xl text-white tracking-wider group-hover:text-joj-orange transition">
                      {c.number}
                    </div>
                  </a>
                ))}

                <div className="pt-3 mt-3 border-t border-white/10">
                  {!coords ? (
                    <button
                      type="button"
                      onClick={shareLocation}
                      disabled={geoBusy}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-joj-orange text-white font-medium hover:bg-[#FF8A3D] transition disabled:opacity-60"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {geoBusy ? t('sos_geo_loading') : t('sos_geo_btn')}
                    </button>
                  ) : (
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="text-white/60 text-xs uppercase tracking-wider mb-2">
                        {t('sos_geo_position')}
                      </div>
                      <div className="text-white font-mono text-sm mb-3">
                        {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                      </div>
                      {mapUrl && (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-joj-orange text-sm font-medium hover:underline"
                        >
                          {t('sos_geo_view_map')}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                  {geoErr && (
                    <div className="mt-2 text-xs text-[#E8392C]">{geoErr}</div>
                  )}
                </div>

                <p className="text-white/40 text-[11px] pt-2 text-center">{t('sos_disclaimer')}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
