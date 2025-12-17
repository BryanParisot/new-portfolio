'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const text = "Nous ne nous contentons pas de construire des sites web. Nous créons des écosystèmes numériques qui captivent votre audience, racontent votre histoire et propulsent votre croissance.";

export default function TextRevealSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const words = sectionRef.current?.querySelectorAll('.reveal-word');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%", // Scroll distance (1.5x viewport height)
                    scrub: 1, // Smooth scrubbing
                    pin: true, // Stick the section
                }
            });

            // Animate words from gray to black
            tl.to(words, {
                color: "#18181b", // zinc-950 (nearly black)
                stagger: 0.1,
                ease: "none",
            });

            // Animate button opacity at the end
            tl.to('.reveal-button', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen bg-white flex flex-col justify-center items-center px-4 md:px-20 overflow-hidden"
        >
            <div className="max-w-4xl text-center  m-10">
                <p
                    ref={textRef}
                    className="text-4xl md:text-6xl font-black font-heading leading-tight flex flex-wrap justify-center gap-x-3 gap-y-2"
                >
                    {text.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className="reveal-word text-gray-200 transition-colors" // Start lighter (gray-200) for better contrast
                        >
                            {word}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
