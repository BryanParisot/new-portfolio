'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const phrase = [
    { text: 'VOTRE SITE', image: '/images/site.jpg' },
    { text: "N'EST PAS", image: '/images/not.jpg' },
    { text: 'TERMINÉ.', image: '/images/incomplete.jpg' },
    { text: 'IL EST JUSTE', image: '/images/just.jpg' },
    { text: 'EN LIGNE.', image: '/images/online.jpg' },
];

export default function ArgumentSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const words = sectionRef.current?.querySelectorAll('.keyword-text');
            if (words) {
                words.forEach((word) => {
                    // Entrance animation (fade in & move up)
                    gsap.fromTo(word,
                        {
                            opacity: 0,
                            y: 100
                        },
                        {
                            opacity: 1,
                            color: "#f1f1f1",
                            y: 0,
                            duration: 1,
                            scrollTrigger: {
                                trigger: word,
                                start: "top 85%", // Start animation when word enters 85% of viewport
                                end: "top 60%",
                                scrub: 1, // Smooth scrubbing linking animation to scroll
                            }
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (image: string) => {
        setHoveredImage(image);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[150vh] flex flex-col items-center justify-center px-4 sm:px-10 lg:px-10 py-30 overflow-hidden"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background pointer-events-none" />

            {/* Keywords container */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-7xl">
                {phrase.map((item, index) => (
                    <div
                        key={index}
                        className="keyword group cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(item.image)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <h2
                            className="keyword-text text-7xl md:text-8xl lg:text-9xl font-body font-black tracking-tight text-center
                                       group-hover:scale-105 transition-transform duration-300 ease-out"
                            style={{
                                background: `linear-gradient(to top, #FF3737 0%, #FF3737 var(--fill-percentage, 0%), #ff373793 var(--fill-percentage, 0%), #ff373793 100%)`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                // CSS variable initial value
                                // @ts-ignore
                                "--fill-percentage": "0%"
                            }}
                        >
                            {item.text}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Hover Image */}
            {hoveredImage && (
                <div
                    className="fixed pointer-events-none z-50"
                    style={{
                        left: `${mousePosition.x + 20}px`,
                        top: `${mousePosition.y + 20}px`,
                        transform: 'translate(0, 0)',
                        transition: 'opacity 0.3s ease-out',
                        opacity: hoveredImage ? 1 : 0,
                    }}
                >
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src={hoveredImage}
                            alt="Hover preview"
                            className="w-full h-full object-cover"
                            style={{
                                filter: 'brightness(0.9) contrast(1.1)',
                            }}
                        />
                        <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
                    </div>
                </div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </section>
    );
}