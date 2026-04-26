import React from "react";
import { LangProvider } from "@/i18n/LangProvider";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Events } from "@/components/Events";
import { VenuesMap } from "@/components/VenuesMap";
import { VRTour } from "@/components/VRTour";
import { VRServices } from "@/components/VRServices";
import { Countdown } from "@/components/Countdown";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { SOSButton } from "@/components/SOSButton";

function App() {
  return (
    <LangProvider>
      <div className="w-full min-h-screen bg-joj-dark text-white font-sans selection:bg-joj-orange selection:text-white">
        <Nav />
        <main>
          <Hero />
          <Events />
          <VenuesMap />
          <VRTour />
          <VRServices />
          <Countdown />
        </main>
        <Footer />
        <SOSButton />
        <Chatbot />
      </div>
    </LangProvider>
  );
}

export default App;
