import React, { useState, useEffect } from "react";
import { useLang } from "@/i18n/LangProvider";
import { events } from "@/data/events";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Radio,
  Globe,
  Ticket,
  Train,
  Palette,
  Send,
  MonitorPlay,
  Youtube,
  CheckCircle2,
  MapPin,
  Clock,
  Vote,
} from "lucide-react";

/* ─── localStorage helpers ─── */
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function setStored<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ─── Star rating sub-component ─── */
function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => setHover(0)}
          className={`transition-transform hover:scale-110 ${readOnly ? "cursor-default" : "cursor-pointer"}`}
        >
          <Star
            className={`w-6 h-6 ${s <= (hover || value) ? "fill-joj-orange text-joj-orange" : "text-joj-muted"}`}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Tab button ─── */
function TabBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-sans tracking-wide uppercase transition-all border ${
        active
          ? "bg-joj-orange border-joj-orange text-white shadow-lg shadow-joj-orange/20"
          : "bg-joj-dark2 border-joj-border text-joj-muted hover:border-joj-orange hover:text-joj-orange"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

/* ─── Main component ─── */
export function VRServices() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<
    | "experience"
    | "event"
    | "stream"
    | "ticket"
    | "transport"
    | "culture"
    | "survey"
  >("experience");

  /* Experience rating */
  const [expRating, setExpRating] = useState(() =>
    getStored<number>("joj_exp_rating", 0),
  );
  const [expCount, setExpCount] = useState(() =>
    getStored<number>("joj_exp_count", 0),
  );
  useEffect(() => {
    setStored("joj_exp_rating", expRating);
    setStored("joj_exp_count", expCount);
  }, [expRating, expCount]);

  /* Event rating */
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventRatings, setEventRatings] = useState<Record<string, number>>(() =>
    getStored<Record<string, number>>("joj_event_ratings", {}),
  );
  useEffect(() => {
    setStored("joj_event_ratings", eventRatings);
  }, [eventRatings]);

  /* Survey */
  const [surveyText, setSurveyText] = useState("");
  const [surveySent, setSurveySent] = useState(false);

  const eventName = (evt: (typeof events)[number]) =>
    (evt[`name_${lang}` as keyof typeof evt] as string) ?? evt.name_fr;

  /* Tabs config */
  const tabs = [
    { id: "experience" as const, label: t("nav_vr_experience"), icon: Star },
    { id: "event" as const, label: t("nav_vr_event"), icon: Vote },
    { id: "stream" as const, label: t("nav_vr_stream"), icon: Radio },
    { id: "ticket" as const, label: t("nav_vr_ticket"), icon: Ticket },
    { id: "transport" as const, label: t("nav_vr_transport"), icon: Train },
    { id: "culture" as const, label: t("nav_vr_culture"), icon: Palette },
    { id: "survey" as const, label: t("vr_survey_title"), icon: Send },
  ];

  return (
    <section
      id="vr-services"
      className="min-h-screen bg-joj-dark py-24 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-[clamp(28px,3vw,42px)] uppercase leading-none mb-4">
            <span className="text-white">{t("nav_vr_services")}</span>
            <span className="text-joj-orange ml-2">.</span>
          </h2>
          <p className="text-[15px] text-joj-muted font-sans max-w-2xl mx-auto">
            {t("vr_experience_desc")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((t) => (
            <TabBtn
              key={t.id}
              active={tab === t.id}
              onClick={() => setTab(t.id)}
              icon={t.icon}
              label={t.label}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── EXPERIENCE RATING ── */}
            {tab === "experience" && (
              <div className="bg-joj-dark2 border border-joj-border rounded-xl p-8 md:p-12 max-w-3xl mx-auto text-center">
                <Star className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                <h3 className="font-display text-2xl uppercase mb-2">
                  {t("vr_experience_rating")}
                </h3>
                <p className="text-joj-muted text-sm mb-8">
                  {t("vr_experience_desc")}
                </p>

                <div className="flex flex-col items-center gap-4">
                  <StarRating
                    value={expRating}
                    onChange={(v) => {
                      setExpRating(v);
                      setExpCount((c) => c + 1);
                    }}
                  />
                  <p className="text-joj-orange font-display text-lg">
                    {t("vr_rating_score").replace(
                      "{score}",
                      String(expRating || 0),
                    )}
                  </p>
                  <p className="text-joj-muted text-xs">
                    {expCount} {expCount > 1 ? "votes" : "vote"} enregistré(s)
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-joj-border">
                  <h4 className="font-display text-lg uppercase mb-3">
                    Visualisation 3D des athlètes
                  </h4>
                  <p className="text-joj-muted text-sm leading-relaxed">
                    Grâce à l'expérience 3D, visualisez les scènes et les
                    athlètes avec une impression d'être juste en face d'eux.
                    Plongez au cœur de l'action comme si vous étiez sur la ligne
                    de départ, dans les gradins ou même sur le podium.
                  </p>
                </div>
              </div>
            )}

            {/* ── EVENT RATING ── */}
            {tab === "event" && (
              <div className="bg-joj-dark2 border border-joj-border rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
                <Vote className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                <h3 className="font-display text-2xl uppercase text-center mb-2">
                  {t("vr_event_rating")}
                </h3>
                <p className="text-joj-muted text-sm text-center mb-8">
                  {t("vr_event_rating_desc")}
                </p>

                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm text-joj-muted mb-2">
                      {t("vr_event_select")}
                    </label>
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full bg-joj-dark border border-joj-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-joj-orange"
                    >
                      <option value="">-- Choisir un événement --</option>
                      {events.map((evt, i) => (
                        <option key={i} value={eventName(evt)}>
                          {eventName(evt)} — {evt.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEvent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <StarRating
                        value={eventRatings[selectedEvent] || 0}
                        onChange={(v) =>
                          setEventRatings((prev) => ({
                            ...prev,
                            [selectedEvent]: v,
                          }))
                        }
                      />
                      <p className="text-joj-orange font-display">
                        {t("vr_event_rating_score")
                          .replace("{event}", selectedEvent)
                          .replace(
                            "{score}",
                            String(eventRatings[selectedEvent] || 0),
                          )}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* ── STREAMING ── */}
            {tab === "stream" && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Radio className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                  <h3 className="font-display text-2xl uppercase mb-2">
                    {t("vr_streaming_title")}
                  </h3>
                  <p className="text-joj-muted text-sm">
                    {t("vr_streaming_desc")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "YouTube Olympics",
                      desc: "Chaîne officielle des Jeux Olympiques avec retransmissions en direct.",
                      icon: Youtube,
                      url: "https://www.youtube.com/@Olympics",
                    },
                    {
                      title: "Olympics.com Live",
                      desc: "Plateforme officielle de streaming des compétitions JOJ.",
                      icon: Globe,
                      url: "https://olympics.com",
                    },
                    {
                      title: "RTS Sénégal",
                      desc: "Radio Télévision Sénégalaise — couverture locale des JOJ.",
                      icon: MonitorPlay,
                      url: "https://www.rts.sn",
                    },
                    {
                      title: "Orange Sport",
                      desc: "Chaîne sportive d'Orange avec diffusion des événements phares.",
                      icon: Radio,
                      url: "https://orange.sn",
                    },
                  ].map((site, i) => (
                    <a
                      key={i}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-joj-dark2 border border-joj-border rounded-xl p-6 hover:border-joj-orange transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-joj-orange/10 p-3 rounded-lg">
                          <site.icon className="w-6 h-6 text-joj-orange" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg uppercase mb-1 group-hover:text-joj-orange transition-colors">
                            {site.title}
                          </h4>
                          <p className="text-joj-muted text-sm">{site.desc}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 bg-joj-dark2 border border-joj-border rounded-xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-joj-orange mx-auto mb-3" />
                  <p className="text-joj-muted text-sm">
                    Les caméras 360° sur chaque site vous permettent de choisir
                    votre angle de vue préféré en direct.
                  </p>
                </div>
              </div>
            )}

            {/* ── TICKETING ── */}
            {tab === "ticket" && (
              <div className="max-w-3xl mx-auto bg-joj-dark2 border border-joj-border rounded-xl p-8 md:p-12 text-center">
                <Ticket className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                <h3 className="font-display text-2xl uppercase mb-2">
                  {t("vr_ticket_title")}
                </h3>
                <p className="text-joj-muted text-sm mb-8">
                  {t("vr_ticket_desc")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Jour 1 – Cérémonie" },
                    { label: "Finale Football" },
                    { label: "Pack Culture" },
                  ].map((tkt, i) => (
                    <div
                      key={i}
                      className="bg-joj-dark border border-joj-border rounded-lg p-5 text-center flex flex-col justify-between"
                    >
                      <h4 className="font-display text-sm uppercase mb-4">
                        {tkt.label}
                      </h4>
                      <a
                        href="https://orange.sn/max-it"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-joj-orange hover:bg-joj-orange-hover text-white text-xs uppercase tracking-wider py-2.5 rounded transition-colors inline-block text-center"
                      >
                        Max-it
                      </a>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 text-joj-muted text-xs">
                  <CheckCircle2 className="w-4 h-4 text-joj-green" />
                  <span>
                    Paiement sécurisé via Orange Money – rapide et accessible
                    partout au Sénégal
                  </span>
                </div>
              </div>
            )}

            {/* ── TRANSPORT ── */}
            {tab === "transport" && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Train className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                  <h3 className="font-display text-2xl uppercase mb-2">
                    {t("vr_transport_title")}
                  </h3>
                  <p className="text-joj-muted text-sm">
                    {t("vr_transport_desc")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-joj-dark2 border border-joj-border rounded-xl p-6 text-center hover:border-joj-orange transition-colors">
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777125184/L_Inspection_g%C3%A9n%C3%A9rale_d_%C3%89tat_IGE_va_proc%C3%A9der_%C3%A0_un_audit_du_chantier_du_Train_express_r%C3%A9gional_TER_a_d%C3%A9clar%C3%A9_vendredi_%C3%A0_S%C3%A9bikotane_ouest_le_directeur_g%C3%A9n%C3%A9ral_de_l_Agence_nationale_charg%C3%A9e_de_la_promotion_des_xk5lrg.jpg"
                      alt="TER"
                      className="w-full h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h4 className="font-display text-lg uppercase mb-2">
                      {t("vr_transport_ter")}
                    </h4>
                    <p className="text-joj-muted text-sm">
                      {t("vr_transport_ter_desc")}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-joj-orange">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Dakar ↔ Diamniadio</span>
                    </div>
                  </div>

                  <div className="bg-joj-dark2 border border-joj-border rounded-xl p-6 text-center hover:border-joj-orange transition-colors">
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777125133/transport_bwindj.jpg"
                      alt="BRT"
                      className="w-full h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h4 className="font-display text-lg uppercase mb-2">
                      {t("vr_transport_brt")}
                    </h4>
                    <p className="text-joj-muted text-sm">
                      {t("vr_transport_brt_desc")}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-joj-orange">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Toutes les 5 min</span>
                    </div>
                  </div>

                  <div className="bg-joj-dark2 border border-joj-border rounded-xl p-6 text-center hover:border-joj-orange transition-colors">
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777125313/YANGO-TAXI2-425x283_fiw3de.jpg"
                      alt="Yango"
                      className="w-full h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h4 className="font-display text-lg uppercase mb-2">
                      {t("vr_transport_yango")}
                    </h4>
                    <p className="text-joj-muted text-sm">
                      {t("vr_transport_yango_desc")}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-joj-orange">
                      <SmartphoneIcon />
                      <span>App Yango</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── CULTURE ── */}
            {tab === "culture" && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <Palette className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                  <h3 className="font-display text-2xl uppercase mb-2">
                    {t("vr_culture_title")}
                  </h3>
                  <p className="text-joj-muted text-sm max-w-2xl mx-auto">
                    {t("vr_culture_intro")}
                  </p>
                </div>

                {/* Dakar */}
                <div className="bg-joj-dark2 border border-joj-border rounded-xl overflow-hidden mb-8 hover:border-joj-orange transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777129131/WhatsApp_Image_2026-04-25_at_14.58.06_sa8zhg.jpg"
                      alt="Dakar"
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="p-6 md:p-8">
                      <h4 className="font-display text-xl uppercase text-joj-orange mb-4">
                        Dakar
                      </h4>
                      <p
                        className="text-joj-muted text-sm leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_dakar_p1"),
                        }}
                      />
                      <p
                        className="text-joj-muted text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_dakar_p2"),
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Diamniadio */}
                <div className="bg-joj-dark2 border border-joj-border rounded-xl overflow-hidden mb-8 hover:border-joj-orange transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 md:p-8 order-2 md:order-1">
                      <h4 className="font-display text-xl uppercase text-joj-orange mb-4">
                        Diamniadio
                      </h4>
                      <p
                        className="text-joj-muted text-sm leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_diamniadio_p1"),
                        }}
                      />
                      <p
                        className="text-joj-muted text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_diamniadio_p2"),
                        }}
                      />
                    </div>
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777129552/WhatsApp_Image_2026-04-25_at_15.05.27_h5a8s2.jpg"
                      alt="Diamniadio"
                      className="w-full h-64 md:h-full object-cover order-1 md:order-2"
                    />
                  </div>
                </div>

                {/* Saly */}
                <div className="bg-joj-dark2 border border-joj-border rounded-xl overflow-hidden mb-8 hover:border-joj-orange transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <img
                      src="https://res.cloudinary.com/dfsljfgsp/image/upload/v1777132215/WhatsApp_Image_2026-04-25_at_15.07.32_wvzutw.jpg"
                      alt="Saly"
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="p-6 md:p-8">
                      <h4 className="font-display text-xl uppercase text-joj-orange mb-4">
                        Saly
                      </h4>
                      <p
                        className="text-joj-muted text-sm leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_saly_p1"),
                        }}
                      />
                      <p
                        className="text-joj-muted text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: t("vr_culture_saly_p2"),
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ── SURVEY ── */}
            {tab === "survey" && (
              <div className="max-w-3xl mx-auto bg-joj-dark2 border border-joj-border rounded-xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <Send className="w-12 h-12 text-joj-orange mx-auto mb-4" />
                  <h3 className="font-display text-2xl uppercase mb-2">
                    {t("vr_survey_title")}
                  </h3>
                  <p className="text-joj-muted text-sm">
                    {t("vr_survey_desc")}
                  </p>
                </div>

                {surveySent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-joj-green mx-auto mb-4" />
                    <p className="text-white font-display text-lg">
                      {t("vr_survey_thanks")}
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <textarea
                      value={surveyText}
                      onChange={(e) => setSurveyText(e.target.value)}
                      placeholder={t("vr_survey_placeholder")}
                      rows={5}
                      className="w-full bg-joj-dark border border-joj-border rounded-lg px-4 py-3 text-white text-sm placeholder:text-joj-muted/60 focus:outline-none focus:border-joj-orange resize-none"
                    />
                    <button
                      onClick={() => {
                        if (surveyText.trim()) {
                          setSurveySent(true);
                        }
                      }}
                      className="self-end bg-joj-orange hover:bg-joj-orange-hover text-white px-8 py-3 rounded font-display text-sm tracking-wider uppercase transition-colors"
                    >
                      {t("vr_survey_submit")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* Small inline icon component */
function SmartphoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-joj-orange"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
