import { useState, useRef } from 'react';
import { Send, Mail, MapPin, Heart, Cat, Snowflake, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ... (existing About component code) ... 



export default function About() {
    const [section, setSection] = useState('intro');
    const [contactForm, setContactForm] = useState({ subject: '', message: '' });

    const handleSend = () => {
        const subject = encodeURIComponent(contactForm.subject || "Hello from Portfolio");
        const body = encodeURIComponent(contactForm.message);
        window.location.href = `mailto:mabel.gamedev@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
            {/* Intro Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '3rem', marginBottom: '3rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', overflow: 'hidden' }}>
                        {/* Placeholder for profile pic */}
                        <img src="/profile.jpg" alt="Derryk" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', transform: 'scale(1.5)' }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="text-gradient">About Me</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Developer • Cat Lover • Polyglot in Training</p>
                    </div>
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px' }}>
                    Hi! I'm Derryk. A little about me: I am a software engineer at General Dynamics. I grew up in Oklahoma City, finished high school and my two bachelors, Computer Science and Mathematics, at the University of South Florida.
                    Now I live in Silver Spring, Maryland with a friend. I have two kitties names Mabel and Mila. And most of my time is learning french and ice skating!
                    I'm passionate about lifelong learning and and am always looking for new opportunities to grow.
                </p>
            </motion.div>

            {/* Places Lived */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                className="glass-panel"
                style={{ padding: '2rem', marginBottom: '3rem' }}
            >
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin color="var(--accent-secondary)" /> Where I've Lived
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {/* Real locations */}
                    <LocationCard city="Oklahoma City" country="OK" description="Where I grew up." />
                    <LocationCard city="Tampa" country="FL" description="My university experience." />
                    <LocationCard city="Silver Spring" country="MD" description="Software engineer exploring the east coast." />
                </div>
            </motion.div>

            {/* My Cats Scroller - Card Stack Logic */}
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', paddingLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Cat color="var(--accent-primary)" /> My Furry Friends
                </h3>
                <p style={{ paddingLeft: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    Scroll down to see them all!
                </p>

                <CatStack />
            </div>

            {/* Passions: French & Ice Skating */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '5rem' }}>
                <FrenchSection />
                <IceSkatingSection />
            </div>

            {/* Contact Footer */}
            <div className="glass-panel" style={{ padding: '3rem' }}>
                {/* ... (keep contact footer logic) ... */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Mail size={32} color="var(--accent-primary)" />
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>Contact Me</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Have a question? Drop me an email below!
                </p>

                <input
                    type="text"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(30, 41, 59, 0.6)', // Darker background
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />

                <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Write your message here..."
                    style={{
                        width: '100%',
                        minHeight: '150px',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(30, 41, 59, 0.6)', // Darker background
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                        fontSize: '1rem',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        outline: 'none'
                    }}
                />

                <button
                    className="btn-primary"
                    onClick={handleSend}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Send size={18} /> Send Email
                </button>
            </div>
        </div>
    );
}

function CatStack() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress using a spring
    // stiffness: 100, damping: 30, restDelta: 0.001 are generally good for smooth scroll-follow
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    // Images in reverse order so first one in array is at bottom of stack (conceptually)
    // Actually, HTML order: last is on top. We want to peel off the TOP one.
    // So let's render cat5 first (bottom), cat1 last (top).
    // Or just Map indices to peel off range.

    // Let's have a stack of 5 photos.
    // Order from Bottom to Top: 5, 4, 3, 2, 1
    // We scroll, 1 flies away, revealing 2. 2 flies away, revealing 3...

    const photos = [
        "/cats/cat9.jpg", // Mixed (Cuddle) - Bottom
        "/cats/cat5.jpg", // Brown
        "/cats/cat8.jpg", // Black
        "/cats/cat4.jpg", // Brown
        "/cats/cat7.jpg", // Black
        "/cats/cat3.jpg", // Brown
        "/cats/cat6.jpg", // Black
        "/cats/cat2.jpg", // Brown
        "/cats/cat1.jpg", // Black - Top
    ];

    return (
        <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
            <div style={{
                position: 'sticky',
                top: '120px',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {photos.map((src, index) => {
                    // Normalize the scroll range so all photos peel off within 0 to 1.
                    // We have photos.length cards. The bottom one (index 0) stays.
                    // So we animate photos.length - 1 cards.
                    const totalCardsToAnimate = photos.length - 1;
                    const step = 1 / totalCardsToAnimate;

                    const isTop = index === photos.length - 1;
                    // Calculate start: Top card (last index) starts at 0.
                    // Card at index i starts when the cards above it have peeled off.
                    // The number of cards above index i is: (photos.length - 1) - index.
                    const cardsAbove = (photos.length - 1) - index;
                    const rangeStart = cardsAbove * step;
                    const rangeEnd = rangeStart + step;

                    return (
                        <StackedCard
                            key={index}
                            src={src}
                            progress={smoothProgress} // Passing smoothProgress instead of raw scrollYProgress
                            range={[rangeStart, rangeEnd]}
                            index={index}
                            total={photos.length}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function StackedCard({ src, progress, range, index, total }) {
    // Random rotation based on index to be deterministic
    const randomRotate = (index % 2 === 0 ? 1 : -1) * ((index * 7) % 10 + 2);

    const opacity = useTransform(progress, [range[0], range[0] + 0.1], [1, 1]); // Stays visible until moved
    // const x = useTransform(progress, range, [0, 500]); // Fly right
    // const rotate = useTransform(progress, range, [randomRotate, randomRotate + 45]);

    // We only want to animate if it's NOT the last one (index 0).
    const isBottom = index === 0;

    // Transform logic:
    // If we are scrolling in range:
    // Move x/y, rotate, fade.

    const x = useTransform(progress, range, [0, isBottom ? 0 : (index % 2 === 0 ? 800 : -800)]);
    const y = useTransform(progress, range, [0, isBottom ? 0 : -200]);
    const rotate = useTransform(progress, range, [randomRotate, isBottom ? randomRotate : randomRotate + 90]);
    const scale = useTransform(progress, range, [1, isBottom ? 1 : 0.8]);
    const currentOpacity = useTransform(progress, [range[1] - 0.1, range[1]], [1, isBottom ? 1 : 0]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                width: 'auto',
                height: 'auto',
                maxWidth: '90%',
                maxHeight: '600px',
                x,
                y,
                rotate,
                scale,
                opacity: currentOpacity,
                zIndex: index,
                padding: '1rem',
                background: 'white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                borderRadius: '1rem',
                border: '1px solid rgba(0,0,0,0.1)'
            }}
        >
            <img
                src={src}
                alt="Cat"
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '550px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '0.5rem',
                    pointerEvents: 'none'
                }}
            />
        </motion.div>
    );
}

function LocationCard({ city, country, description }) {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{city}, {country}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{description}</p>
        </div>
    );
}

function FrenchSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="glass-panel"
            style={{
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(59, 130, 246, 0.1))', // Deep Blue transparency
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
        >
            {/* Background Texture: Subtle French Verbs */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.1,
                pointerEvents: 'none',
                fontFamily: 'serif',
                fontStyle: 'italic',
                fontSize: '2rem',
                lineHeight: '1.5',
                overflow: 'hidden',
                zIndex: 0,
                color: 'var(--text-secondary)'
            }}>
                être avoir faire dire aller voir savoir pouvoir vouloir venir
                aimer manger boire dormir courir lire écrire écouter parler
                comprendre apprendre voyager rêver penser croire espérer
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <BookOpen size={40} color="#3b82f6" />
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                            Passion pour le Français
                        </h3>
                    </div>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        J'ai voyagé en Corée du Sud quand j'étais à l'université. C'était une expérience incroyable et m'a permis de découvrir une autre culture. Mais, ce n'était pas pour moi.
                        Je ne sais pas pourquoi, mais j'ai tombé amoureuse de découvrir des cultures étrangères.
                        Maintenant, la France m’intéresse avec la culture riche, la nourriture, le paysage, l’histoire, etc. Je suis en train d'étudier le Français et j’éspère déménager en France en 2027 en Master.
                    </p>
                    <p style={{ fontStyle: 'italic', color: 'var(--accent-secondary)' }}>
                        "Petit à petit l'oiseau fait son nid."
                    </p>
                </div>
                {/* Visual Element: Aesthetic Card or Image */}
                <div style={{
                    flex: '0 0 200px',
                    height: '200px',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', // Deep Blue gradient
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
                }}>
                    <BookOpen size={80} color="rgba(255,255,255,0.9)" />
                </div>
            </div>
        </motion.div>
    );
}

function IceSkatingSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            style={{
                position: 'relative',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
                minHeight: '400px',
                background: '#0c4a6e' // Dark Sky Blue base
            }}
        >
            {/* Ice Rink Background */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, #0c4a6e 0%, #075985 100%)', // Dark Gradient
                zIndex: 0
            }}>
                {/* Ice Scratches / Marks */}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
                    <path d="M50,50 Q100,10 150,50 T250,50" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
                    <path d="M-50,200 Q100,250 250,200 T550,230" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="4" />
                    <path d="M300,100 Q400,50 500,100" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                    {/* Circle markings */}
                    <circle cx="80%" cy="50%" r="80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="5" />
                    <circle cx="80%" cy="50%" r="2" fill="#ef4444" />
                    <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="2" />
                </svg>

                {/* Reflections/Gloss */}
                <div style={{
                    position: 'absolute',
                    top: '-50%', left: '-50%', width: '200%', height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
                    transform: 'rotate(-10deg)',
                    pointerEvents: 'none'
                }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', padding: '2rem', borderRadius: '1rem', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Snowflake size={40} color="#38bdf8" />
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e0f2fe' }}>
                            Ice Skating
                        </h3>
                    </div>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                        When I graduated from univeristy, I began my job as a software engineer but I was also in an online Master's program in Computer Science. That said, I was sittin at a desk at work and home. This didn't take long to get old, so I stopped my Master's and found adult ice skating group lessons January 2024. It is so fun, I have been skating since and haven't looked back.
                    </p>
                </div>
            </div>

            {/* Decorative Skate Icon overlay */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '50px',
                    opacity: 0.1,
                    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))'
                }}
            >
                <Snowflake size={300} color="white" />
            </motion.div>
        </motion.div>
    );
}
