import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FormSection = ({ title, children, isOpen: defaultIsOpen = false, dragHandle }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    return (
        <div style={{ border: '1px solid #eee', borderRadius: 'var(--radius-md)', marginBottom: '1rem', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1rem' }}>
                {dragHandle && <div style={{ paddingLeft: '1rem', cursor: 'grab', display: 'flex', alignItems: 'center' }}>{dragHandle}</div>}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        paddingLeft: dragHandle ? '0.5rem' : '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: 'var(--color-text)'
                    }}
                >
                    <span>{title}</span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {isOpen && (
                <div style={{ padding: '1rem', borderTop: '1px solid #eee' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default FormSection;
