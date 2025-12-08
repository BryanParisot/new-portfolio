'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Configuration des images dispersées en arrière-plan
const backgroundImages = [
    { src: "/bryan-maquette.jpg", alt: "Bryan Maquette", position: "top-5 left-5", size: "w-28 h-36", rotation: "rotate-3" },
    { src: "/bryan-optic.JPG", alt: "Bryan Optic", position: "top-12 left-1/4", size: "w-44 h-28", rotation: "-rotate-2" },
    { src: "/bryan-borne.PNG", alt: "Bryan Borne", position: "top-72 right-16", size: "w-40 h-40", rotation: "rotate-6" },
    { src: "/aquathon.jpg", alt: "Aquathon", position: "top-3 right-1/4", size: "w-36 h-36", rotation: "-rotate-3" },
    { src: "/bryan-maquette-2.PNG", alt: "Bryan Maquette 2", position: "bottom-16 left-12", size: "w-32 h-44", rotation: "rotate-2" },
    { src: "/MacBook_Mockup_3.jpeg", alt: "MacBook Mockup", position: "bottom-8 right-1/4", size: "w-52 h-40", rotation: "-rotate-6" },
    { src: "/Square_Signboard_Mockup_1.jpeg", alt: "Square Signboard", position: "bottom-5 right-8", size: "w-40 h-44", rotation: "rotate-1" },
    { src: "/Billboard_Mockup_3.jpeg", alt: "Billboard Mockup", position: "top-20 left-1/3", size: "w-56 h-36", rotation: "-rotate-1" },
    { src: "/Bryan(1).jpeg", alt: "Bryan Portrait 1", position: "top-44 left-8", size: "w-32 h-40", rotation: "rotate-12" },
    { src: "/Bryan.jpeg", alt: "Bryan Portrait", position: "top-28 right-12", size: "w-36 h-44", rotation: "-rotate-6" },
    { src: "/Free_Business_Card_Mockup_4 (2).jpeg", alt: "Business Card", position: "bottom-28 left-1/4", size: "w-48 h-32", rotation: "rotate-3" },
    { src: "/teams-borne.PNG", alt: "Teams Borne", position: "bottom-36 right-1/3", size: "w-36 h-44", rotation: "rotate-6" },
    { src: "/bryan-borne-2.PNG", alt: "Bryan Borne 2", position: "top-36 left-20", size: "w-40 h-28", rotation: "-rotate-3" },
    { src: "/camera.jpeg", alt: "Camera", position: "bottom-44 left-2/3", size: "w-44 h-44", rotation: "rotate-6" },
    { src: "/profil_bryan.JPG", alt: "Profil Bryan", position: "top-16 right-1/3", size: "w-28 h-36", rotation: "-rotate-6" },
    { src: "/bryan.jpg", alt: "Bryan", position: "bottom-20 left-1/3", size: "w-40 h-40", rotation: "rotate-3" }
];

interface ImageCardProps {
    image: typeof backgroundImages[0];
    index: number;
}

function ImageCard({ image, index }: ImageCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const getRotationDegrees = (rotationClass: string): number => {
        const match = rotationClass.match(/(-?)rotate-(\d+)/);
        if (!match) return 0;
        const value = parseInt(match[2]);
        return match[1] === '-' ? -value : value;
    };

    const rotationDegrees = getRotationDegrees(image.rotation);
useEffect(() => {
  const card = cardRef.current;
  if (!card) return;

  const handleScroll = () => {
    // 🧷 On remonte jusqu'au container de scroll
    const section = card.closest('[data-scroll-section]') as HTMLElement | null;
    if (!section) return;

    const sectionTop = section.offsetTop;        // début du container (200vh)
    const sectionHeight = section.offsetHeight;  // ≈ 200vh
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 🧠 La section est "traversée" entre :
    // - start : quand le haut du container arrive en haut de l'écran
    // - end   : quand le bas du container quitte le bas (on enlève windowHeight)
    const start = sectionTop;
    const end = sectionTop + sectionHeight - windowHeight;

    let scrollProgress: number;

    if (scrollY <= start) {
      // Avant le container → état initial
      scrollProgress = 0;
    } else if (scrollY >= end) {
      // Après le container → état final
      scrollProgress = 1;
    } else {
      // Pendant qu'on traverse le container → 0 → 1
      scrollProgress = (scrollY - start) / (end - start);
    }

    // Debug si tu veux voir ce qui se passe
    // console.log({ scrollY, start, end, scrollProgress });

    const opacity = 1 - scrollProgress * 0.8;
    const scale = 1 - scrollProgress * 0.4;

    gsap.to(card, {
      opacity,
      scale: 1 + scrollProgress * 0.5,
      rotation: rotationDegrees,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [rotationDegrees]);

    return (
        <div
            ref={cardRef}
            className={`absolute ${image.position} ${image.size} overflow-hidden cursor-pointer will-change-transform`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default function Recommendations() {
  return (
    // 🔴 Container de scroll (c’est LUI qu’on utilise pour le calcul)
    <section
      className="relative h-[200vh] bg-gray-100"
      data-scroll-section
    >
      {/* 🟢 Contenu sticky à l’intérieur */}
      <div className="sticky top-0 h-screen w-full flex items-center sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {backgroundImages.map((image, index) => (
            <ImageCard key={index} image={image} index={index} />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl m-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight mb-6">
            <span className='block'>Créer du sens</span>
            <span className='block'>Propulser des projets</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
