import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: "French Typer",
            description: "A fun, fast-paced iOS game to master French conjugations and vocabulary. Adjective arcade mode, verb journeys, and more!",
            tags: ["Swift", "SwiftUI", "iOS", "Game"],
            demo: "/projects/french-typer" // Internal link
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>My Projects <span className="text-gradient">.</span></h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Here are some of the things I've been working on.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {project.title === "French Typer" ? (
                                <img src="/captain_cat.png" alt="App Icon" style={{ width: '100%', height: '100%', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                            ) : (
                                <div style={{
                                    width: '100%', height: '100%', borderRadius: '12px', background: 'var(--accent-primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                }}>
                                    <Code size={24} />
                                </div>
                            )}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>{project.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>
                            {project.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.85rem',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(0,0,0,0.05)',
                                    borderRadius: '1rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            {project.github && (
                                <a href={project.github} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    <Github size={18} /> Code
                                </a>
                            )}
                            <Link to={project.demo} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--accent-primary)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}>
                                <ExternalLink size={18} /> View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
