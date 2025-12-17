'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const processSteps = [
    {
        id: "01",
        title: "IMMERSION",
        subtitle: "Audit & Compréhension",
        description: "Nous plongeons dans votre univers pour comprendre vos enjeux, votre marché et vos utilisateurs. Une phase essentielle pour poser des bases solides.",
        tags: ["Audit", "Benchmark", "User Research"]
    },
    {
        id: "02",
        title: "STRATÉGIE",
        subtitle: "Architecture & Design",
        description: "Nous définissons l'expérience utilisateur (UX) et l'identité visuelle (UI) pour créer une interface unique, intuitive et mémorable.",
        tags: ["Wireframing", "UI Design", "Direction Artistique"]
    },
    {
        id: "03",
        title: "CONSTRUCTION",
        subtitle: "Développement Sur-mesure",
        description: "Nos développeurs donnent vie au design avec un code propre, performant et optimisé pour le référencement naturel (SEO).",
        tags: ["Frontend", "Backend", "Performance", "SEO"]
    },
    {
        id: "04",
        title: "ÉLÉVATION",
        subtitle: "Lancement & Croissance",
        description: "Mise en ligne, tests rigoureux et accompagnement pour assurer la performance et l'évolution continue de votre plateforme.",
        tags: ["QA Testing", "Analytics", "Maintenance"]
    }
];

export default function HorizontalScrollSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container || !sectionRef.current) return;

            // Horizontal Scroll Animation
            // Calculation: Move left by (total width - viewport width)
            // But for a better feel, we often create "panels" or "sections" width based movement
            const totalWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;
            const xMovement = -(totalWidth - viewportWidth);

            gsap.to(container, {
                x: xMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    // Use a function for end to make it responsive effectively
                    // Scroll distance = amount moved horizontally
                    end: () => `+=${Math.abs(xMovement)}`,
                    invalidateOnRefresh: true,
                }
            });

            // Optional: Card animations (parallax or scale inside)
            const cards = gsap.utils.toArray('.process-card');
            cards.forEach((card: any) => {
                gsap.fromTo(card.querySelector('.card-content'),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation:  // Important for horizontal scroll context? 
                                // Actually for simple horizontal scrub, we might not need complex individual triggers if we just want them to exist. 
                                // But usually for horizontal scroll, trigger needs to be containerAnimation-aware or just simple CSS.
                                // Let's keep it simple for now: static cards that slide.
                                null,
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-background overflow-hidden"
        >
            <div className="h-full w-full flex items-center">
                <div
                    ref={containerRef}
                    className="flex gap-10 md:gap-20 px-10 md:px-20 h-[70vh] items-center will-change-transform"
                >
                    {/* Intro Text */}
                    <div className="shrink-0 w-[80vw] md:w-[30vw] flex flex-col justify-center">
                        <h2 className="text-4xl md:text-7xl font-black font-heading leading-none mb-6">
                            NOTRE<br />
                            <span className="text-accent">PROCESS</span><br />
                            CRÉATIF
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-sm mt-4">
                            Une méthodologie éprouvée pour transformer vos ambitions en réalité digitale.
                        </p>
                    </div>

                    {/* Process Steps */}
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className="process-card shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] h-full relative group"
                        >
                            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/10 group-hover:border-accent/30">
                                <div>
                                    <span className="text-6xl md:text-8xl font-black text-white/5 group-hover:text-accent/20 transition-colors duration-500">
                                        {step.id}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold mt-4 mb-2 text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-accent font-mono text-sm tracking-wider uppercase mb-6">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-8">
                                    {step.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-500 bg-black/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="shrink-0 w-[10vw]" />
                </div>
            </div>

            {/* Background Texture or Element */}
            <div className="absolute -bottom-1/2 -right-1/2 w-[100vw] h-[100vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
