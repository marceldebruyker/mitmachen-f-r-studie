import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Run only on client side
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Small delay so it slides in nicely
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
        // Here you would normally initialize your Meta Pixel
        // e.g., fbq('consent', 'grant');
        console.log("Cookies accepted, Pixel would start now.");
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
        console.log("Cookies declined.");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 animate-in slide-in-from-bottom-full duration-500">
            <div className="max-w-4xl mx-auto bg-brand-navy p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="flex-grow text-white">
                    <h4 className="font-heading font-bold text-lg mb-2">Wir nutzen Cookies & Pixel 🍪</h4>
                    <p className="text-sm text-gray-300">
                        Um unsere Seite zu optimieren und dir die passenden Stellenanzeigen/Aufrufe auf Instagram zeigen zu können, nutzen wir das Meta-Pixel. Bist du damit einverstanden?
                        Weitere Infos findest du in unserer <a href="/datenschutz" className="underline text-brand-sand hover:text-white">Datenschutzerklärung</a>.
                    </p>
                </div>
                <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 text-sm font-medium transition-colors"
                    >
                        Nur Essenzielle
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coral/90 text-white text-sm font-bold shadow-lg shadow-brand-coral/20 transition-all"
                    >
                        Alle akzeptieren
                    </button>
                </div>
            </div>
        </div>
    );
}
