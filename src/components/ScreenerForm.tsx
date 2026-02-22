import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';

type Step = 'intro' | 'activity' | 'series' | 'age' | 'gender' | 'tech' | 'email' | 'success' | 'reject' | 'already_completed' | 'error';

const BOOK_SERIES = [
    { id: 'sternenschweif', label: 'Sternenschweif' },
    { id: 'haferhorde', label: 'Die Haferhorde' },
    { id: 'schule_magische_tiere', label: 'Die Schule der magischen Tiere' },
    { id: 'wieso_weshalb_warum', label: 'Wieso? Weshalb? Warum?' },
    { id: 'die_drei_ausrufezeichen', label: 'Die drei !!!' },
    { id: 'die_drei_fragezeichen', label: 'Die drei ???' },
    { id: 'tierpolizei', label: 'Die Tierpolizei' },
    { id: 'conni', label: 'Meine Freundin Conni' },
    { id: 'magisches_baumhaus', label: 'Das magische Baumhaus' },
    { id: 'petronella', label: 'Petronella Apfelmus' },
    { id: 'little_people', label: 'Little People, Big Dreams' },
    { id: 'pferde_im_internat', label: 'Pferde im Internat' },
    { id: 'keine', label: 'Keine davon kenne ich' }
];

export default function ScreenerForm() {
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [hasTech, setHasTech] = useState<boolean | null>(null);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Anti-Replay Logic
    useEffect(() => {
        const completed = localStorage.getItem('screener_completed');
        if (completed === 'true') {
            setCurrentStep('already_completed');
        }
    }, []);

    const markAsCompleted = () => {
        localStorage.setItem('screener_completed', 'true');
    };

    const handleActivitySelect = (act: string) => {
        setSelectedActivities(prev => {
            if (prev.includes(act)) return prev.filter(a => a !== act);
            if (prev.length >= 3) return prev; // Max 3
            return [...prev, act];
        });
    };

    const handleSeriesSelect = (seriesId: string) => {
        if (seriesId === 'keine') {
            setSelectedSeries(['keine']);
            return;
        }
        setSelectedSeries(prev => {
            const withoutKeine = prev.filter(s => s !== 'keine');
            return withoutKeine.includes(seriesId)
                ? withoutKeine.filter(s => s !== seriesId)
                : [...withoutKeine, seriesId];
        });
    };

    const handleAgeSelect = (age: string) => {
        setSelectedAges(prev =>
            prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
        );
    };

    const handleGenderSelect = (gender: string) => {
        setSelectedGenders(prev =>
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    const nextFromActivity = () => {
        if (selectedActivities.length === 0) return;

        // CONDITIONAL ROUTING: If they selected 'lesen' (Vorlesen/Bücher), ask about series.
        if (selectedActivities.includes('lesen')) {
            setCurrentStep('series');
        } else {
            setCurrentStep('age');
        }
    };

    const nextFromSeries = () => {
        if (selectedSeries.length === 0) return;
        setCurrentStep('age');
    };

    const nextFromAge = () => {
        if (selectedAges.length === 0) return;
        setCurrentStep('gender');
    };

    const nextFromGender = () => {
        if (selectedGenders.length === 0) return;
        setCurrentStep('tech');
    };

    const nextFromTech = () => {
        if (hasTech === null) return;

        // --- BLIND STUDY LOGIC ---
        // Target: (Age 3-5 OR 6-9) AND (Girl) AND (Laptop/Tablet = Yes)
        const hasTargetAge = selectedAges.includes('3-5') || selectedAges.includes('6-9');
        const hasTargetGender = selectedGenders.includes('maedchen');

        if (hasTargetAge && hasTargetGender && hasTech === true) {
            setCurrentStep('email');
        } else {
            markAsCompleted(); // Mark as done even if rejected so they can't game it
            setCurrentStep('reject');
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !consent) return;

        setIsSubmitting(true);
        setErrorMessage('');

        // Prepare payload for Supabase/Database
        const payload = {
            email,
            activities: selectedActivities,
            book_series: selectedSeries,
            ages: selectedAges,
            genders: selectedGenders,
            has_tech: hasTech,
            created_at: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/submit-screener', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({ error: 'Unknown server error' }));
                console.error("API returned error:", response.status, errData);
                setErrorMessage(errData.error || `Server error (${response.status})`);
                setCurrentStep('error');
                return;
            }

            markAsCompleted();
            setCurrentStep('success');
        } catch (error) {
            console.error("Network error submitting form:", error);
            setErrorMessage('Netzwerkfehler – bitte prüfe deine Internetverbindung und versuche es erneut.');
            setCurrentStep('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate progress (excluding intro, success, reject, already_completed)
    // We dynamically adjust steps based on whether 'series' is included
    const baseSteps = ['activity', 'age', 'gender', 'tech', 'email'];
    const formSteps = selectedActivities.includes('lesen')
        ? ['activity', 'series', 'age', 'gender', 'tech', 'email']
        : baseSteps;

    const currentProgressIndex = formSteps.indexOf(currentStep);
    const showProgress = currentProgressIndex !== -1;
    const totalSteps = formSteps.length;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-sand/30">
            {/* Progress indicator */}
            {showProgress && (
                <div className="bg-brand-blush/30 px-8 py-4 flex items-center justify-between border-b border-brand-sand/20">
                    <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                        Frage {currentProgressIndex + 1} von {totalSteps - 1 /* -1 to not count email step as a question */}
                    </span>
                    <div className="flex gap-1">
                        {formSteps.slice(0, totalSteps - 1).map((step, i) => (
                            <div key={step} className={`h-1.5 w-6 rounded-full transition-colors ${i <= currentProgressIndex ? 'bg-brand-coral' : 'bg-brand-coral/20'}`} />
                        ))}
                    </div>
                </div>
            )}

            <div className="p-8 md:p-12">

                {currentStep === 'already_completed' && (
                    <div className="text-center animate-in fade-in duration-500">
                        <div className="w-16 h-16 bg-brand-blush rounded-full flex items-center justify-center mx-auto mb-6">
                            <RefreshCcw className="w-8 h-8 text-brand-coral" />
                        </div>
                        <h3 className="font-heading font-extrabold text-2xl text-brand-navy mb-4">Du hast bereits teilgenommen</h3>
                        <p className="text-brand-navy/70 mb-8">
                            Vielen Dank für dein großes Interesse! Du hast den Kurz-Check bereits ausgefüllt. Wir versuchen, möglichst vielen verschiedenen Müttern die Chance auf ein Interview zu geben.
                        </p>
                    </div>
                )}

                {currentStep === 'intro' && (
                    <div className="text-center animate-in fade-in py-4 duration-500">
                        <h3 className="font-heading font-extrabold text-3xl text-brand-navy mb-4">Lass uns kurz checken, ob es passt.</h3>
                        <p className="text-brand-navy/70 mb-8">
                            Da wir eine sehr bunte Mischung verschiedener Familien-Konstellationen suchen, prüfen wir mit 4 extrem kurzen Fragen (Dauer: 1 Min), ob dein exaktes Profil aktuell noch in der Studie fehlt.
                        </p>
                        <button
                            onClick={() => setCurrentStep('activity')}
                            className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            Starten <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* DECOY QUESTION */}
                {currentStep === 'activity' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">Welche dieser Aktivitäten macht ihr im Alltag am liebsten gemeinsam?</h3>
                        <p className="text-brand-navy/60 text-sm mb-6">Wähle bis zu 3 aus.</p>

                        <div className="space-y-3 mb-8">
                            {[
                                { id: 'rausgehen', label: 'Rausgehen & Spielplatz' },
                                { id: 'basteln', label: 'Basteln & Malen' },
                                { id: 'lesen', label: 'Vorlesen / Bücher anschauen' },
                                { id: 'filme', label: 'Filme / Serien schauen' },
                                { id: 'spiele', label: 'Brettspiele spielen' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleActivitySelect(opt.id)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${selectedActivities.includes(opt.id) ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-medium shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={nextFromActivity}
                            disabled={selectedActivities.length === 0}
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Weiter
                        </button>
                    </div>
                )}

                {currentStep === 'series' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">Welche dieser Buchreihen kennst du (vom Sehen oder Lesen)?</h3>
                        <p className="text-brand-navy/60 text-sm mb-6">Bitte wähle alle aus, die dir spontan ein Begriff sind.</p>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-h-[40vh] overflow-y-auto p-1">
                            {BOOK_SERIES.map(series => (
                                <button
                                    key={series.id}
                                    onClick={() => handleSeriesSelect(series.id)}
                                    className={`text-left p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center gap-2 ${selectedSeries.includes(series.id) ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'} ${series.id === 'keine' ? 'col-span-2 lg:col-span-3 mt-2' : ''}`}
                                >
                                    {/* Placeholder for actual logos later */}
                                    {series.id !== 'keine' && (
                                        <div className="w-12 h-12 bg-white rounded shadow-sm border border-gray-100 flex items-center justify-center mb-1">
                                            <span className="text-xs text-brand-navy/30">Logo</span>
                                        </div>
                                    )}
                                    <span className="text-xs leading-tight">{series.label}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={nextFromSeries}
                            disabled={selectedSeries.length === 0}
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Weiter
                        </button>
                    </div>
                )}

                {currentStep === 'age' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">In welchem Alter sind deine Kinder?</h3>
                        <p className="text-brand-navy/60 text-sm mb-6">Bitte wähle alle zutreffenden aus.</p>

                        <div className="space-y-3 mb-8">
                            {[
                                { id: '0-2', label: '0 - 2 Jahre' },
                                { id: '3-5', label: '3 - 5 Jahre' },
                                { id: '6-9', label: '6 - 9 Jahre' },
                                { id: '10-13', label: '10 - 13 Jahre' },
                                { id: '14+', label: '14 Jahre oder älter' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAgeSelect(opt.id)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${selectedAges.includes(opt.id) ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-medium shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={nextFromAge}
                            disabled={selectedAges.length === 0}
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Weiter
                        </button>
                    </div>
                )}

                {currentStep === 'gender' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">Welches Geschlecht haben deine Kinder?</h3>
                        <p className="text-brand-navy/60 text-sm mb-6">Bitte wähle alle zutreffenden aus.</p>

                        <div className="space-y-3 mb-8">
                            {[
                                { id: 'junge', label: 'Junge' },
                                { id: 'maedchen', label: 'Mädchen' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleGenderSelect(opt.id)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${selectedGenders.includes(opt.id) ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-medium shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={nextFromGender}
                            disabled={selectedGenders.length === 0}
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Weiter
                        </button>
                    </div>
                )}

                {currentStep === 'tech' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">Technik-Check</h3>
                        <p className="text-brand-navy/60 text-sm mb-6">Hast du die Möglichkeit, über einen Laptop, PC oder ein größeres Tablet am Call teilzunehmen (kein kleines Smartphone)?</p>

                        <div className="space-y-3 mb-8">
                            <button
                                onClick={() => setHasTech(true)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${hasTech === true ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-medium shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'}`}
                            >
                                Ja, das klappt
                            </button>
                            <button
                                onClick={() => setHasTech(false)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${hasTech === false ? 'border-brand-coral bg-brand-coral/5 text-brand-navy font-medium shadow-sm' : 'border-gray-200 text-gray-600 hover:border-brand-sand'}`}
                            >
                                Nein, leider nicht
                            </button>
                        </div>
                        <button
                            onClick={nextFromTech}
                            disabled={hasTech === null}
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                        >
                            Prüfen <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {currentStep === 'reject' && (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-4">Vielen Dank für deine Zeit!</h3>
                        <p className="text-brand-navy/70 mb-8 leading-relaxed">
                            Leider haben wir für deine spezifische Familien-Konstellation (Alter/Geschlecht der Kinder) aktuell schon ausreichend Teilnehmerinnen gefunden, um unsere Quoten zu erfüllen.
                            <br /><br />
                            Deine Angaben werden nicht gespeichert und sofort gelöscht. Alles Liebe für dich und deine Familie!
                        </p>
                    </div>
                )}

                {currentStep === 'email' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="mb-6 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Es passt perfekt!
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">Fast geschafft!</h3>
                        <p className="text-brand-navy/70 mb-6">
                            Hinterlasse uns ganz kurz deine E-Mail-Adresse. Du erhältst dann im nächsten Schritt direkt den Link zur Terminbuchung.
                        </p>

                        <form onSubmit={submitForm} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-brand-navy mb-2">Deine E-Mail-Adresse</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mama@beispiel.de"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-coral focus:ring-0 outline-none transition-all"
                                />
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-brand-coral focus:ring-brand-coral"
                                    />
                                </div>
                                <span className="text-sm text-brand-navy/70 leading-snug group-hover:text-brand-navy">
                                    Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank" className="underline hover:text-brand-coral">Datenschutzerklärung</a> zu und bin damit einverstanden, für diese Studie kontaktiert zu werden.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={!email || !consent || isSubmitting}
                                className="w-full bg-brand-coral hover:bg-brand-coral/90 disabled:bg-brand-coral/50 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Wird gespeichert...' : 'Zum Termin-Kalender'}
                                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>
                )}

                {currentStep === 'success' && (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-heading font-bold text-3xl text-brand-navy mb-4">Wunderbar!</h3>
                        <p className="text-brand-navy/70 mb-8">
                            Deine Daten wurden sicher gespeichert. Klicke jetzt auf den Button unten, um dir deinen 30-Minuten Wunschtermin in meinem Kalender auszusuchen.
                        </p>

                        {/* Cal.com Link */}
                        <a
                            href="https://cal.com/marcel-debruyker/30-minuten-online-interview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full justify-center items-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-4 rounded-xl shadow-md transition-all"
                        >
                            📅 Jetzt Termin aussuchen
                        </a>
                        <p className="text-xs text-brand-navy/50 mt-4">Wir haben dir den Link zur Sicherheit auch per E-Mail geschickt.</p>
                    </div>
                )}

                {currentStep === 'error' && (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-brand-navy mb-4">Ups, da ist etwas schiefgelaufen</h3>
                        <p className="text-brand-navy/70 mb-4">
                            Deine Antworten konnten leider nicht gespeichert werden.
                        </p>
                        {errorMessage && (
                            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg mb-6">
                                {errorMessage}
                            </p>
                        )}
                        <button
                            onClick={() => setCurrentStep('email')}
                            className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-bold py-4 rounded-xl shadow-md transition-all"
                        >
                            Nochmal versuchen
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
