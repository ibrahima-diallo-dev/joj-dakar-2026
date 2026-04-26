import React, { useState } from "react";
import { useLang } from "@/i18n/LangProvider";
import { Lang } from "@/i18n/translations";
import { Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages: { id: Lang; label: string }[] = [
  { id: "fr", label: "FR Français" },
  { id: "en", label: "EN English" },
  { id: "es", label: "ES Español" },
  { id: "pt", label: "PT Português" },
  { id: "ar", label: "AR العربية" },
  { id: "wo", label: "WO Wolof" },
  { id: "zh", label: "ZH 中文" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "hero", label: t("nav_home") },
    { id: "events", label: t("nav_events") },
    { id: "map", label: t("nav_map") },
    { id: "vr", label: t("nav_vr") },
    { id: "vr-services", label: t("nav_vr_services") },
  ];

  const currentLangLabel =
    languages.find((l) => l.id === lang)?.label.split(" ")[0] || "FR";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-joj-dark/90 backdrop-blur-md border-b border-joj-border px-4 md:px-10 flex items-center justify-between">
      <button
        onClick={() => scrollTo("hero")}
        className="flex items-center gap-3 no-underline group"
      >
        <div className="flex flex-col">
          <div className="font-display text-2xl tracking-[2px] text-white group-hover:text-joj-orange transition-colors">
            <span className="text-joj-orange">J</span>OJ
          </div>
          <div className="text-[10px] text-joj-muted tracking-[3px] uppercase leading-none">
            Immersive Fan
          </div>
        </div>
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-joj-muted hover:text-joj-orange text-sm tracking-wider uppercase font-sans transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 bg-joj-border border border-joj-border text-white px-3 py-1.5 rounded-full text-xs font-sans hover:border-joj-orange hover:text-joj-orange transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLangLabel}</span>
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-40 bg-joj-dark2 border border-joj-border rounded-xl overflow-hidden shadow-2xl z-[2000]"
              >
                {languages.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLang(l.id);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-sans transition-colors hover:bg-joj-border ${
                      lang === l.id
                        ? "text-joj-orange bg-joj-border/50"
                        : "text-joj-muted"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 bg-joj-dark2 border-b border-joj-border md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-joj-muted hover:text-joj-orange text-sm tracking-wider uppercase font-sans transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
