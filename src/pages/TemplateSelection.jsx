import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { FileText, Zap, Layout, Star, Award, PenTool, BookOpen, User, Grid, Check, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleResume } from '../data/sampleResume';
import Modal from '../components/Modal';
import { parseResume } from '../utils/resumeParser';
import toast from 'react-hot-toast';

const templates = [
    { id: 'modern', name: 'Modern', icon: <Zap />, description: 'Clean & dynamic', color: '#3b82f6' },
    { id: 'classic', name: 'Classic', icon: <FileText />, description: 'ATS-Friendly & Simple', color: '#64748b' },
    { id: 'creative', name: 'Creative', icon: <PenTool />, description: 'Bold & Artistic', color: '#ec4899' },
    { id: 'professional', name: 'Professional', icon: <Award />, description: 'Corporate & Elegant', color: '#0f172a' },
    // Placeholders for upcoming templates
    { id: 'minimal', name: 'Minimal', icon: <Layout />, description: 'Less is more', color: '#94a3b8' },
    { id: 'executive', name: 'Executive', icon: <Star />, description: 'High-level Layout', color: '#eab308' },
    { id: 'compact', name: 'Compact', icon: <Grid />, description: 'Fit more content', color: '#14b8a6' },
    { id: 'tech', name: 'Tech', icon: <Zap />, description: 'For Developers', color: '#8b5cf6' },
    { id: 'designer', name: 'Designer', icon: <PenTool />, description: 'Visual focus', color: '#f43f5e' },
    { id: 'academic', name: 'Academic', icon: <BookOpen />, description: 'CV style', color: '#475569' },
];


const TemplateSelection = () => {
    const { setSelectedTemplate, setResumeData, resetResume, importResumeData } = useResume();
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState(null);
    const [confirmationId, setConfirmationId] = useState(null);
    const [hasImported, setHasImported] = useState(false);
    const fileInputRef = useRef(null);

    const handleSelect = (id, mode = 'empty') => {
        setSelectedTemplate(id);
        if (mode === 'sample') {
            setResumeData(prev => ({
                ...prev,
                ...sampleResume
            }));
        } else if (mode === 'empty') {
            resetResume();
        }
        // If mode === 'keep' (for imported), do nothing to data, just navigate
        navigate('/builder');
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        const loadingToast = toast.loading('Parsing resume...');
        try {
            const parsedData = await parseResume(file);
            importResumeData(parsedData);
            setHasImported(true);
            toast.success('Resume imported! Select a template to continue.');
        } catch (error) {
            console.error(error);
            toast.error('Failed to parse resume');
        } finally {
            toast.dismiss(loadingToast);
            // Reset input
            e.target.value = '';
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0', paddingBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Choose Your Template</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Select a design that fits your career path. ATS-friendly and fully customizable.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleImportClick}
                        className="btn btn-outline"
                        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                    >
                        <Upload size={18} /> {hasImported ? 'Import New PDF' : 'Import from PDF'}
                    </button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {templates.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-panel"
                        onHoverStart={() => setHoveredId(t.id)}
                        onHoverEnd={() => setHoveredId(null)}
                        style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderTop: `4px solid ${t.color}`,
                            overflow: 'hidden',
                            height: '320px'
                        }}
                    >
                        {/* Normal View */}
                        <div style={{
                            background: `${t.color}20`,
                            color: t.color,
                            padding: '1rem',
                            borderRadius: '50%',
                            marginBottom: '1rem'
                        }}>
                            {React.cloneElement(t.icon, { size: 32 })}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t.name}</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            {t.description}
                        </p>

                        {/* Hover Overlay */}
                        <AnimatePresence>
                            {hoveredId === t.id && (
                                <motion.div
                                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                                    animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                                    style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10,
                                        gap: '10px'
                                    }}
                                >
                                    {hasImported ? (
                                        <>
                                            <button
                                                onClick={() => handleSelect(t.id, 'imported')} // imported -> keep data
                                                className="btn btn-primary"
                                                style={{ width: '80%' }}
                                            >
                                                Use Imported Data
                                            </button>
                                            <button
                                                onClick={() => handleSelect(t.id, 'empty')}
                                                className="btn btn-outline"
                                                style={{ background: 'white', width: '80%' }}
                                            >
                                                Discard & Start Empty
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleSelect(t.id, 'sample')}
                                                className="btn btn-primary"
                                                style={{ width: '80%' }}
                                            >
                                                Use Sample Data
                                            </button>
                                            <button
                                                onClick={() => handleSelect(t.id, 'empty')}
                                                className="btn btn-outline"
                                                style={{ background: 'white', width: '80%' }}
                                            >
                                                Start Empty
                                            </button>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Fallback button for touch devices */}
                        <div style={{ marginTop: 'auto', width: '100%' }}>
                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', borderColor: t.color, color: t.color }}
                                onClick={() => setConfirmationId(t.id)}
                            >
                                Select
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile/Touch Confirmation Modal */}
            <Modal
                isOpen={!!confirmationId}
                onClose={() => setConfirmationId(null)}
                title="Select Resume Mode"
            >
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                        {hasImported
                            ? "Would you like to use the imported PDF data or start fresh?"
                            : "Would you like to start with a blank resume or pre-load it with sample data?"}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {hasImported ? (
                            <>
                                <button
                                    onClick={() => handleSelect(confirmationId, 'imported')}
                                    className="btn btn-primary"
                                >
                                    Use Imported Data
                                </button>
                                <button
                                    onClick={() => handleSelect(confirmationId, 'empty')}
                                    className="btn btn-outline"
                                >
                                    Discard & Start Empty
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleSelect(confirmationId, 'sample')}
                                    className="btn btn-primary"
                                >
                                    Use Sample Data
                                </button>
                                <button
                                    onClick={() => handleSelect(confirmationId, 'empty')}
                                    className="btn btn-outline"
                                >
                                    Start from Scratch
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TemplateSelection;
