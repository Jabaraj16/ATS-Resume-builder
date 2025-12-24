import React from 'react';
import Editor from '../components/Builder/Editor';
import ResumePreview from '../components/Builder/ResumePreview';
import { Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { downloadPDF } from '../utils/pdfGenerator';
import { useResume } from '../contexts/ResumeContext';

import toast from 'react-hot-toast';

const Builder = () => {
    const { user } = useAuth();
    const { resumeData } = useResume();
    const navigate = useNavigate();

    const [showPreview, setShowPreview] = React.useState(false);

    const handleDownload = () => {
        if (!user) {
            toast.error('Login required to download PDF', { icon: '🔒' });
            // Optional: Redirect to login or just let them know
            setTimeout(() => navigate('/login', { state: { from: '/builder' } }), 1500);
            return;
        }

        const fileName = `${resumeData.personalInfo.fullName || 'resume'}.pdf`;
        toast.promise(
            downloadPDF('resume-document', fileName),
            {
                loading: 'Generating PDF...',
                success: 'PDF downloaded!',
                error: 'Error generating PDF',
            }
        );
    };

    return (
        <div className="builder-layout">
            {/* Left Sidebar: Editor */}
            <div className="builder-sidebar">
                <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Editor</h2>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setShowPreview(true)}
                            className="btn btn-outline"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                        >
                            Preview
                        </button>
                        <button onClick={handleDownload} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', gap: '8px' }}>
                            <Download size={16} /> Export PDF
                        </button>
                    </div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden', padding: '1rem' }}>
                    <Editor />
                </div>
            </div>

            {/* Right Content: Preview */}
            <div className="builder-preview">
                <ResumePreview />
            </div>

            {/* Full Screen Preview Modal */}
            {showPreview && (
                <div className="preview-modal">
                    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 210 }}>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="btn btn-primary"
                        >
                            Close
                        </button>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden', // Let ResumePreview handle scroll
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ResumePreview />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Builder;
