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
            const section = card.closest('[data-scroll-section]') as HTMLElement | null;
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const start = sectionTop;
            const end = sectionTop + sectionHeight - windowHeight;

            let scrollProgress: number;

            if (scrollY <= start) {
                scrollProgress = 0;
            } else if (scrollY >= end) {
                scrollProgress = 1;
            } else {
                scrollProgress = (scrollY - start) / (end - start);
            }

            // 🎯 Ici on ZOOM au lieu de réduire

            const maxZ = 600; // la valeur “vers l’écran”
            const moveZ = maxZ * scrollProgress;

            const minScale = 0.9;   // taille au début
            const maxScale = 1.6;   // taille en bas de la section
            const scale = minScale + (maxScale - minScale) * scrollProgress;

            const opacity = 1 - scrollProgress * 0.2; // tu peux ajuster ou supprimer

            gsap.to(card, {
                z: moveZ,
                scale,
                opacity,
                rotation: rotationDegrees,
                transformOrigin: "50% 50%",
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
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const line2Ref = useRef<HTMLHeadingElement>(null);
    const bgImageRef = useRef<HTMLDivElement | null>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        if (!section || !title) return;

        const handleScroll = () => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const start = sectionTop;
            const end = sectionTop + sectionHeight - windowHeight;

            let progress: number;

            if (scrollY <= start) {
                progress = 0;
            } else if (scrollY >= end) {
                progress = 1;
            } else {
                progress = (scrollY - start) / (end - start);
            }

            // 📌 Zoom vers le texte
            const scale = 1.3 + progress * 0.3; // 1 → 1.3
            const y = -40 * progress;         // il remonte légèrement

            gsap.to(title, {
                scale,
                y,
                transformOrigin: "center center",
                duration: 0.3,
                ease: "power2.out",
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('[data-scroll-section]') as HTMLElement | null;
            if (!section || !textRef.current) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const start = sectionTop;
            const end = sectionTop + sectionHeight - windowHeight;

            let progress = 0;

            if (scrollY <= start) progress = 0;
            else if (scrollY >= end) progress = 1;
            else progress = (scrollY - start) / (end - start);

            gsap.to(line2Ref.current, {
                fontWeight: 200 + progress * 300,       // bold
                scale: 1 + progress * 0.25, // zoom très propre
                duration: 0.3,
                ease: "power2.out",
            });

            // 🔥 Animation du texte (fade + zoom out)
            gsap.to(textRef.current, {
                opacity: 1 - progress,             // fade out progressif
                scale: 1 - progress * 0.3,         // léger zoom out synchronisé
                y: -progress * 50,                 // le texte remonte légèrement
                ease: "power2.out",
                duration: 0.3,
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const section = sectionRef.current;
        const bg = bgRef.current;
        if (!section || !bg) return;

        const handleScroll = () => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const start = sectionTop;
            const end = sectionTop + sectionHeight - windowHeight;

            let progress = 0;
            if (scrollY <= start) progress = 0;
            else if (scrollY >= end) progress = 1;
            else progress = (scrollY - start) / (end - start);

            // 🎯 L’image apparaît progressivement
            const scale = 0.1 + progress * 0.3; // 0.2 → 1.5
            const opacity = progress; // fade in

            gsap.to(bg, {
                scale,
                opacity,
                duration: 0.3,
                backgroundSize: `${50 + progress * 60}%`,
                ease: "power2.out",
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        <section
            ref={sectionRef}
            className="relative h-[200vh] bg-gray-100"
            data-scroll-section
        >
            <div
                className="sticky top-0 h-screen w-full flex items-center sm:px-6 lg:px-8 overflow-hidden"
                style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
            >
                <div
                    ref={bgRef}
                    className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/ton-image.jpg')",
                        backgroundSize: "50%", // point de départ
                        transform: "scale(0.5)",
                    }}
                >
                    <img
                        src="/bryan-maquette.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 " style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
                    {backgroundImages.map((image, index) => (
                        <ImageCard key={index} image={image} index={index} />
                    ))}
                </div>

                <div ref={titleRef} className="relative z-10 max-w-4xl m-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight mb-6">
                        <span ref={textRef} className='block'>Créer du sens</span>
                        <span ref={line2Ref} className='block'>Propulser des projets</span>
                    </h2>
                </div>
            </div>
        </section>

    );
}
