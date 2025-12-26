import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isFrenchTyper = location.pathname === '/projects/french-typer';

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        color: isActive(path)
            ? (isFrenchTyper ? '#b399e6' : 'var(--accent-primary)')
            : (isFrenchTyper ? '#4d4d59' : 'var(--text-secondary)'),
        fontWeight: isActive(path) ? '700' : '400',
        transition: 'all 0.2s ease',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        background: isActive(path)
            ? (isFrenchTyper ? 'rgba(179, 153, 230, 0.1)' : 'rgba(56, 189, 248, 0.1)')
            : 'transparent', // Subtle glow for active
        border: isActive(path)
            ? (isFrenchTyper ? '1px solid rgba(179, 153, 230, 0.2)' : '1px solid rgba(56, 189, 248, 0.2)')
            : '1px solid transparent'
    });

    const mobileLinkStyle = (path) => ({
        ...linkStyle(path),
        fontSize: '1.25rem',
        padding: '1rem',
        width: '100%',
        justifyContent: 'center',
        borderBottom: isFrenchTyper ? '1px solid rgba(0,0,0,0.05)' : '1px solid var(--glass-border)',
        background: isActive(path)
            ? (isFrenchTyper ? 'rgba(179, 153, 230, 0.1)' : 'rgba(56, 189, 248, 0.1)')
            : 'transparent'
    });

    return (
        <nav style={{
            padding: '1rem 0',
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 100,
            backdropFilter: 'blur(16px)',
            borderBottom: isFrenchTyper ? 'none' : '1px solid rgba(255,255,255,0.05)',
            background: isFrenchTyper ? '#fdf6ed' : 'rgba(15, 23, 42, 0.8)' // Contextual background
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', zIndex: 101, color: isFrenchTyper ? '#4d4d59' : 'var(--text-primary)' }}>
                    Derryk<span className="text-gradient">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hide-on-mobile" style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" style={linkStyle('/')}>
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/about" style={linkStyle('/about')}>
                        <User size={18} /> About
                    </Link>
                    <Link to="/projects" style={linkStyle('/projects')}>
                        <Briefcase size={18} /> Projects
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="show-on-mobile"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ zIndex: 101, padding: '0.5rem', color: isFrenchTyper ? '#4d4d59' : 'var(--text-primary)' }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%',
                                background: isFrenchTyper ? '#fdf6ed' : 'var(--bg-secondary)', // Use theme background
                                boxShadow: 'var(--shadow-lg)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '1rem 0',
                                borderTop: isFrenchTyper ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <Link to="/" style={mobileLinkStyle('/')} onClick={() => setIsOpen(false)}>
                                <Home size={20} /> Home
                            </Link>
                            <Link to="/about" style={mobileLinkStyle('/about')} onClick={() => setIsOpen(false)}>
                                <User size={20} /> About
                            </Link>
                            <Link to="/projects" style={mobileLinkStyle('/projects')} onClick={() => setIsOpen(false)}>
                                <Briefcase size={20} /> Projects
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
