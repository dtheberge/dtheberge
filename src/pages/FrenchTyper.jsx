import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Zap, BookOpen, Smile, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FrenchTyper() {
    // Enable global scroll snap on mount
    useEffect(() => {
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.style.scrollPaddingTop = '100px';

        return () => {
            document.documentElement.style.scrollSnapType = '';
            document.documentElement.style.scrollBehavior = '';
            document.documentElement.style.scrollPaddingTop = '';
        };
    }, []);

    // Theme Colors
    const colors = {
        background: '#fdf6ed', // Creamy
        text: '#4d4d59', // Soft Slate
        cardBg: '#ffffff',
        accentPurple: '#b399e6',
        accentBlue: '#99ccff',
        accentPink: '#ffd9dd',
        accentGreen: '#4ade80', // Darker Green for better visibility
        sectionBg: '#fffdf9'
    };

    return (
        <div style={{
            background: colors.background,
            minHeight: '100vh',
            marginTop: '-80px', // Counteract main padding
            paddingTop: '80px', // Restore spacing for content
            color: colors.text,
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header / Hero */}
            <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', scrollSnapAlign: 'start' }}>
                <Link to="/projects" style={{
                    position: 'absolute', top: '2rem', left: '2rem', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: colors.text, textDecoration: 'none', fontWeight: 'bold'
                }}>
                    <ArrowLeft size={20} /> Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    style={{ marginTop: '3rem' }}
                >
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <img src="/captain_cat.png" alt="Captain Cat" style={{ width: '100px', height: '100px', borderRadius: '50%', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                    </div>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '900',
                        background: `linear-gradient(45deg, ${colors.accentPurple}, ${colors.accentBlue})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem'
                    }}>
                        French Typer
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.8 }}>
                        Master French conjugations in a whimsical, fast-paced arcade adventure!
                    </p>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="container" style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto', scrollSnapAlign: 'start' }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem'
                }}>
                    <FeatureCard
                        icon={<Zap color="#ffbf00" />}
                        title="Arcade Mode"
                        text="Race against the clock! Type conjugations before the energy runs out."
                        color={colors.accentPink}
                    />
                    <FeatureCard
                        icon={<BookOpen color="#3b82f6" />}
                        title="Verb Journeys"
                        text="Progress through levels of increasing difficulty. Unlock new tenses."
                        color={colors.accentBlue}
                    />
                    <FeatureCard
                        icon={<Smile color="#10b981" />}
                        title="Adjective Fun"
                        text="A dedicated mode for mastering French adjective agreements."
                        color={colors.accentGreen}
                    />
                </div>
            </div>

            {/* --- STACKING SECTIONS --- */}
            {/* Flattened structure for Scroll Snap + Sticky */}

            <StackingSection
                index={0}
                title="Start Your Verb Journey"
                description="Meet Captain Cat and embark on an adventure! Choose from Verb Journeys or test your skills in the Adjective Arcade."
                screenshots={[
                    { src: "/screenshots/loading.png", caption: "Welcome!" },
                    { src: "/screenshots/menu.png", caption: "Choose your path" }
                ]}
                themeColor={colors.accentPurple}
                reverse={false}
            />

            <StackingSection
                index={1}
                title="Fast-Paced Action"
                description="Pop bubbles by typing the correct conjugation! Act fast before they float away. Earn energy and unlock new levels."
                screenshots={[
                    { src: "/screenshots/gameplay.png", caption: "Type fast!" },
                    { src: "/screenshots/vocab.png", caption: "Learn new words" }
                ]}
                themeColor={colors.accentBlue}
                reverse={true}
            />

            {/* --- Guidance Section as Card 3 --- */}
            <StackingSection
                index={2}
                title="Captain Cat Guides You"
                description="Don't worry if you're new to French. Captain Cat is always there to give you helpful tips, explain grammar rules, and cheer you on!"
                screenshots={[
                    { src: "/screenshots/tutorial.png", caption: "Tutorial" }
                ]}
                themeColor={colors.accentGreen} // Using Green to match the 3rd feature card
                reverse={false}
            />


            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '4rem 2rem', opacity: 0.6, scrollSnapAlign: 'end' }}>
                <p>Designed & Built by Derryk Theberge using SwiftUI.</p>
            </div>
        </div>
    );
}

function StackingSection({ index, title, description, screenshots, themeColor, reverse }) {
    const topOffset = 100 + (index * 20); // Dynamic sticky top

    return (
        <div style={{
            position: 'sticky',
            top: `${topOffset}px`,
            maxWidth: '1200px',
            width: '90%',
            width: '90%',
            margin: '0 auto 4rem auto', // Centered
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always', // Force stop at this element
            display: 'flex',
            flexDirection: reverse ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: '3rem',
            padding: '4rem',
            background: 'white',
            borderRadius: '2rem',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.05)',
            flexWrap: 'wrap-reverse',
            borderTop: `6px solid ${themeColor}`,
            minHeight: '60vh',
            zIndex: 10 + index
        }}>
            {/* Text Side */}
            <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: themeColor, textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>{title}</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#6b7280' }}>{description}</p>
            </div>

            {/* Screenshots Side */}
            <div style={{ flex: 1, display: 'flex', gap: '1rem', justifyContent: 'center', minWidth: '300px' }}>
                {screenshots.map((shot, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            width: '200px',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                            border: '4px solid #4d4d59',
                            background: '#f3f4f6',
                            // Anti-aliasing fixes
                            outline: '1px solid transparent',
                            backfaceVisibility: 'hidden',
                            WebkitFontSmoothing: 'subpixel-antialiased'
                        }}
                    >
                        <img src={shot.src} alt={shot.caption} style={{ width: '100%', display: 'block' }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, text, color }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                borderTop: `6px solid ${color}`
            }}
        >
            <div style={{
                background: color,
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                opacity: 0.8
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{text}</p>
        </motion.div>
    );
}
