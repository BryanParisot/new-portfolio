import Image from "next/image";
import Header from "./compoents/header";
import Recommendations from "./compoents/recommendations";
import ArgumentSection from "./compoents/argumentSection";
import HorizontalScrollSection from "./compoents/HorizontalScrollSection";
import TextRevealSection from "./compoents/TextRevealSection";

export default function Home() {
  return (
    <>
      <Header />
      <Recommendations />
      {/* Contenu temporaire pour créer l'espace de scroll */}
      <ArgumentSection />
      <HorizontalScrollSection />
      <TextRevealSection />
      <div className="h-[50vh] bg-white flex items-center justify-center">
        <p className="text-gray-400">Footer ou Contact...</p>
      </div>
    </>
  );
}
