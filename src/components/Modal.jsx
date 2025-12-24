import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                perspective: '1000px'
            }}>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(4px)',
                        zIndex: -1
                    }}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="glass-panel"
                    style={{
                        width: '90%',
                        maxWidth: '500px',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--color-border)',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--color-border)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{title}</h3>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-muted)',
                                padding: '4px',
                                borderRadius: '4px',
                                display: 'flex'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-border)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div style={{ padding: '2rem' }}>
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
