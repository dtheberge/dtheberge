import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
    const text = "Hello, I'm Derryk Theberge";

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 40,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <div className="container" style={{
            height: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden' // Prevent scrollbars during animation
        }}>
            <motion.h1
                style={{
                    fontSize: 'clamp(2rem, 5vw, 5.5rem)', // Smaller min for mobile (2rem)
                    fontWeight: '900',
                    lineHeight: '1.1',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 1rem',
                    width: '100%' // Ensure full width for wrapping
                }}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {text.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', margin: '0 0.25em' }}>
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={`${wordIndex}-${charIndex}`}
                                variants={child}
                                style={{ display: "inline-block" }}
                                whileHover={{
                                    scale: 1.2,
                                    y: -10,
                                    rotate: 5,
                                    color: "var(--text-secondary)",
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}
            >
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px' }}>
                    Welcome to my personal digital space.
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/about" className="btn-primary">About Me</Link>
                    <Link to="/projects" className="btn-primary" style={{ background: '#374151' }}>My Projects 🚀</Link>
                </div>
            </motion.div>
        </div>
    );
}
