'use client';

import { useEffect, useRef, useState } from 'react';

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
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const viewportHeight = window.innerHeight;

            const words = section.querySelectorAll('.keyword');
            words.forEach((word) => {
                const element = word as HTMLElement;
                const wordRect = element.getBoundingClientRect();
                const wordBottom = wordRect.bottom;
                const wordTop = wordRect.top;
                const wordHeight = wordRect.height;

                // Calculate fill percentage from bottom to top
                let fillPercentage = 0;
                if (wordBottom <= viewportHeight && wordBottom >= 0) {
                    const visibleFromBottom = Math.min(wordHeight, viewportHeight - wordTop);
                    fillPercentage = Math.max(0, Math.min(100, (visibleFromBottom / wordHeight) * 100));
                }

                // Simple entrance animation based on viewport position
                const distanceFromBottom = viewportHeight - wordTop;
                const entranceProgress = Math.max(0, Math.min(1, distanceFromBottom / (viewportHeight * 0.5)));

                // Apply simple animations - just translateY and opacity
                const translateY = (1 - entranceProgress) * 50;
                const opacity = entranceProgress;

                element.style.opacity = opacity.toString();
                element.style.transform = `translateY(${translateY}px)`;
                element.style.setProperty('--fill-percentage', `${fillPercentage}%`);
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
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
            className="relative w-full] flex flex-col items-center justify-center px-4 sm:px-10 lg:px-10 py-30 overflow-hidden"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background pointer-events-none" />

            {/* Keywords container */}
            <div className="relative z-10 flex flex-col items-center justify-center  w-full max-w-7xl">
                {phrase.map((item, index) => (
                    <div
                        key={index}
                        className="keyword group cursor-pointer"
                        style={{
                            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                        }}
                        onMouseEnter={() => handleMouseEnter(item.image)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <h2
                            className="text-7xl md:text-8xl lg:text-9xl font-body font-black tracking-tight text-center
                                       group-hover:scale-105"
                            style={{
                                background: `linear-gradient(to top, #FF3737 0%, #FF3737 var(--fill-percentage, 0%), #ff373793 var(--fill-percentage, 0%), #ff373793 100%)`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                transition: 'transform 0.3s ease-out',
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