import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import TemplateModern from '../Templates/TemplateModern';
import TemplateSimple from '../Templates/TemplateSimple';
import TemplateCreative from '../Templates/TemplateCreative';
import TemplateProfessional from '../Templates/TemplateProfessional';
import TemplateMinimal from '../Templates/TemplateMinimal';
import TemplateExecutive from '../Templates/TemplateExecutive';
import TemplateCompact from '../Templates/TemplateCompact';
import TemplateTech from '../Templates/TemplateTech';
import TemplateDesigner from '../Templates/TemplateDesigner';
import TemplateAcademic from '../Templates/TemplateAcademic';

import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ResumePreview = () => {
    const { resumeData, selectedTemplate } = useResume();
    const [scale, setScale] = React.useState(100);

    // Mapping string to component
    const TemplateComponent = () => {
        switch (selectedTemplate) {
            case 'modern':
                return <TemplateModern data={resumeData} />;
            case 'classic':
                return <TemplateSimple data={resumeData} />;
            case 'creative':
                return <TemplateCreative data={resumeData} />;
            case 'professional':
                return <TemplateProfessional data={resumeData} />;
            case 'minimal':
                return <TemplateMinimal data={resumeData} />;
            case 'executive':
                return <TemplateExecutive data={resumeData} />;
            case 'compact':
                return <TemplateCompact data={resumeData} />;
            case 'tech':
                return <TemplateTech data={resumeData} />;
            case 'designer':
                return <TemplateDesigner data={resumeData} />;
            case 'academic':
                return <TemplateAcademic data={resumeData} />;
            default:
                return <TemplateModern data={resumeData} />;
        }
    };

    const containerRef = React.useRef(null);
    // Touch state for pinch-to-zoom
    const [initialDistance, setInitialDistance] = React.useState(null);

    // Wheel Zoom (Desktop)
    const handleWheel = (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY * -0.01;
            setScale(prevScale => {
                const newScale = prevScale + delta * 20; // Multiplier for speed
                return Math.min(Math.max(30, newScale), 200);
            });
        }
    };

    // Touch Zoom (Mobile Pinch)
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch1.pageX - touch2.pageX,
                touch1.pageY - touch2.pageY
            );
            setInitialDistance(distance);
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2 && initialDistance !== null) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(
                touch1.pageX - touch2.pageX,
                touch1.pageY - touch2.pageY
            );

            const scaleFactor = currentDistance / initialDistance;

            // Adjust sensitivity
            if (Math.abs(1 - scaleFactor) > 0.02) {
                setScale(prevScale => {
                    const newScale = prevScale * scaleFactor;
                    return Math.min(Math.max(30, newScale), 200);
                });
                setInitialDistance(currentDistance); // Update for smooth continuous zoom
            }
        }
    };

    const handleTouchEnd = () => {
        setInitialDistance(null);
    };

    // Add/Remove non-passive wheel listener
    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className="resume-preview-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Zoom Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '0.5rem',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <button
                    onClick={() => setScale(s => Math.max(30, s - 10))}
                    className="btn btn-outline btn-sm"
                    title="Zoom Out"
                    style={{ padding: '0.4rem' }}
                >
                    <ZoomOut size={16} />
                </button>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '3.5rem', textAlign: 'center' }}>
                    {Math.round(scale)}%
                </span>
                <button
                    onClick={() => setScale(s => Math.min(200, s + 10))}
                    className="btn btn-outline btn-sm"
                    title="Zoom In"
                    style={{ padding: '0.4rem' }}
                >
                    <ZoomIn size={16} />
                </button>
                <button
                    onClick={() => setScale(100)}
                    className="btn btn-outline btn-sm"
                    title="Reset Zoom"
                    style={{ padding: '0.4rem' }}
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Scrollable Preview Area */}
            <div
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '2rem',
                    background: '#525659', // Dark background like PDF viewers
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start', // Ensure it starts from top
                    touchAction: 'pan-x pan-y' // Allow panning, handle zoom manually
                }}
            >
                <div
                    id="resume-document"
                    data-theme="light"
                    className="resume-document"
                    style={{
                        transform: `scale(${scale / 100})`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.1s ease-out', // Faster transition for pinch
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        background: 'white', // Ensure paper is white
                        minHeight: '297mm', // A4 height
                        width: '210mm',    // A4 width
                        // Force layout preservation
                        minWidth: '210mm'
                    }}
                >
                    <TemplateComponent />
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
