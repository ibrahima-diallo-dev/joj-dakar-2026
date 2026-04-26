import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { sites } from "@/data/sites";
import { useLang } from "@/i18n/LangProvider";
import { MapPin } from "lucide-react";

// Fix Leaflet's default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker creator based on zone
const createCustomIcon = (zone: string) => {
  let color = "#FF6B1A"; // Dakar (orange)
  if (zone === "Diamniadio") color = "#1A9A20"; // Green
  if (zone === "Saly") color = "#1A6BFF"; // Blue

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}80;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
};

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export function VenuesMap() {
  const { t } = useLang();
  const [activeSite, setActiveSite] = useState(sites[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([14.65, -17.3]);

  const handleSiteClick = (site: (typeof sites)[0]) => {
    setActiveSite(site);
    setMapCenter([site.lat, site.lng]);
  };

  return (
    <section
      id="map"
      className="min-h-screen bg-joj-dark2 py-24 px-6 md:px-10 border-y border-joj-border"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(32px,4vw,52px)] uppercase leading-none mb-2">
            <span className="text-white">{t("map_title")}</span>
            <span className="text-joj-orange ml-2">.</span>
          </h2>
          <p className="text-sm text-joj-muted tracking-wide font-sans">
            {t("map_sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Map Container */}
          <div className="h-[500px] lg:h-[600px] rounded border border-joj-border overflow-hidden z-0 relative">
            <MapContainer
              center={[14.65, -17.3]}
              zoom={9}
              className="w-full h-full"
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <MapController center={mapCenter} />

              {sites.map((site) => {
                const siteSports = site.sports ?? [];

                return (
                  <Marker
                    key={site.id}
                    position={[site.lat, site.lng]}
                    icon={createCustomIcon(site.zone)}
                    eventHandlers={{
                      click: () => handleSiteClick(site),
                      mouseover: (event) => event.target.openPopup(),
                      mouseout: (event) => event.target.closePopup(),
                    }}
                  >
                    <Popup>
                      <div className="text-left p-2 max-w-[220px]">
                        <div className="popup-zone font-semibold text-sm mb-1">
                          {site.zone}
                        </div>
                        <div className="popup-name font-bold text-base mb-1">
                          {site.nom}
                        </div>
                        <div className="popup-addr text-xs text-joj-muted mb-3">
                          {site.adresse}
                        </div>
                        {siteSports.length > 0 ? (
                          <div className="space-y-2">
                            {siteSports.map((sport, index) => (
                              <div
                                key={index}
                                className="rounded bg-joj-dark/90 p-2"
                              >
                                <div className="font-semibold text-[11px] leading-snug">
                                  {sport}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[11px] text-joj-muted">
                            No events scheduled for this venue.
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* List Container */}
          <div className="flex flex-col gap-3 h-[500px] lg:h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-joj-orange scrollbar-track-joj-dark">
            {sites.map((site) => (
              <div
                key={site.id}
                onClick={() => handleSiteClick(site)}
                className={`bg-joj-dark border rounded p-5 cursor-pointer transition-all ${
                  activeSite.id === site.id
                    ? "border-joj-orange bg-joj-orange/5"
                    : "border-joj-border hover:border-joj-orange/50"
                }`}
              >
                <div
                  className={`text-[10px] uppercase tracking-[2px] mb-1.5 font-sans font-semibold ${
                    site.zone === "Dakar"
                      ? "text-joj-orange"
                      : site.zone === "Diamniadio"
                        ? "text-joj-green"
                        : "text-[#1A6BFF]"
                  }`}
                >
                  {site.zone}
                </div>
                <h3 className="font-display text-lg mb-1">{site.nom}</h3>
                <div className="flex items-start gap-2 text-joj-muted text-xs font-sans mt-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{site.adresse}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-joj-border flex justify-between items-center text-xs font-sans">
                  <span className="text-joj-muted">{t("site_capacity")}:</span>
                  <span className="text-white">{site.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
