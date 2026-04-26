import React from 'react';
import { useLang } from '@/i18n/LangProvider';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-joj-dark2 border-t border-joj-border py-16 px-6 md:px-10 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          
          <div className="flex flex-col">
            <div className="font-display text-3xl tracking-[2px] text-white mb-4">
              <span className="text-joj-orange">J</span>OJ DAKAR 2026
            </div>
            <p className="text-joj-muted text-sm leading-relaxed max-w-[280px]">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[2px] uppercase text-joj-orange mb-6">
              {t('footer_nav')}
            </h4>
            <ul className="flex flex-col gap-3">
              {['nav_home', 'nav_events', 'nav_map', 'nav_vr'].map(k => (
                <li key={k}>
                  <a href="#" className="text-sm text-joj-muted hover:text-joj-orange transition-colors">
                    {t(k as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[2px] uppercase text-joj-orange mb-6">
              {t('footer_sports')}
            </h4>
            <ul className="flex flex-col gap-3">
              {['filter_athletics', 'filter_football', 'filter_basketball', 'filter_swimming', 'filter_judo'].map(k => (
                <li key={k}>
                  <a href="#" className="text-sm text-joj-muted hover:text-joj-orange transition-colors">
                    {t(k as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[2px] uppercase text-joj-orange mb-6">
              {t('footer_info')}
            </h4>
            <ul className="flex flex-col gap-3">
              {['footer_about', 'footer_press', 'footer_accessibility', 'footer_privacy'].map(k => (
                <li key={k}>
                  <a href="#" className="text-sm text-joj-muted hover:text-joj-orange transition-colors">
                    {t(k as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-joj-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-joj-muted">
            &copy; 2026 JOJ Dakar — {t('footer_rights')}
          </p>
          
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-[#0085C7]"></div>
            <div className="w-3 h-3 rounded-full border-2 border-[#F4C300] -ml-2.5 mt-2"></div>
            <div className="w-3 h-3 rounded-full border-2 border-[#000000] -ml-2.5"></div>
            <div className="w-3 h-3 rounded-full border-2 border-[#009F3D] -ml-2.5 mt-2"></div>
            <div className="w-3 h-3 rounded-full border-2 border-[#DF0024] -ml-2.5"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
