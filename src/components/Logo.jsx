import React from 'react';
import { FileText } from 'lucide-react';

const Logo = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
                background: 'var(--color-primary)',
                padding: '0.4rem',
                borderRadius: '8px',
                color: 'white',
                display: 'flex',
                boxShadow: '0 4px 6px -1px rgba(var(--primary-hue), var(--primary-sat), 50%, 0.4)'
            }}>
                <FileText size={24} strokeWidth={2.5} />
            </div>
            <div style={{ lineHeight: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px', color: 'var(--color-text)' }}>
                    Resume<span style={{ color: 'var(--color-primary)' }}>AI</span>
                </div>
            </div>
        </div>
    );
};

export default Logo;
