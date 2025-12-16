'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout | undefined;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const scrollSpeed = 0.8; // Réduire cette valeur pour un scroll plus lent (0.5 = moitié de la vitesse normale)
            const scrollAmount = e.deltaY * scrollSpeed;

            clearTimeout(scrollTimeout);

            const currentScroll = window.scrollY;
            const targetScroll = currentScroll + scrollAmount;

            window.scrollTo({
                top: targetScroll,
                behavior: 'auto' // On utilise 'auto' car on gère nous-mêmes la fluidité
            });
        };

        // Ajouter l'écouteur avec passive: false pour pouvoir preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return null;
}
