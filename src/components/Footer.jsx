import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            padding: '2rem 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>

                {/* Brand */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>ResumeAI</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        Building careers with modern, ATS-friendly resumes.
                    </p>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                    <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
                    <Link to="/templates" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Templates</Link>
                    <Link to="/builder" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Builder</Link>
                </div>

                {/* Socials & Copyright */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <a href="#" style={{ color: 'var(--color-text)', opacity: 0.7 }}><Github size={20} /></a>
                        <a href="#" style={{ color: 'var(--color-text)', opacity: 0.7 }}><Twitter size={20} /></a>
                    </div>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Made with <Heart size={14} fill="var(--color-primary)" color="var(--color-primary)" /> by Antigravity © {currentYear}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
