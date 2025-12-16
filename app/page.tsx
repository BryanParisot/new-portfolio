import Image from "next/image";
import Header from "./compoents/header";
import Recommendations from "./compoents/recommendations";
import ArgumentSection from "./compoents/argumentSection";

export default function Home() {
  return (
    <>
      <Header />
      <Recommendations />
      {/* Contenu temporaire pour créer l'espace de scroll */}
      <ArgumentSection />
      <div className="h-[200vh] bg-white flex items-center justify-center">
        <p className="text-2xl text-gray-600">Contenu suivant...</p>
      </div>
    </>
  );
}
