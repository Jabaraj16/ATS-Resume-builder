import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const TemplateModern = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;
    const { sectionOrder } = useResume(); // Get order from context

    // Fallback order if context is missing (e.g. during PDF generation if context not provided, though it should be)
    // Actually, for html2pdf, it grabs the DOM. So as long as it rendered correctly on screen, it's fine.
    const order = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

    const renderSection = (id) => {
        // Custom Section
        const customSection = customSections?.find(s => s.id === id);
        if (customSection) {
            return (
                <section key={id} style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>
                        {customSection.title}
                    </h3>
                    {customSection.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>{item.title}</h4>
                                <span style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: 500 }}>
                                    {item.startDate} {(item.startDate && item.endDate) && ' - '} {item.endDate}
                                </span>
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.subtitle}</div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-line' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            );
        }

        switch (id) {
            case 'summary':
                return summary ? (
                    <section key={id} style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>
                            Professional Summary
                        </h3>
                        <p style={{ lineHeight: 1.6, fontSize: '1rem' }}>{summary}</p>
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={id} style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>
                            Skills
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: '#f3f4f6',
                                    color: '#374151',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    border: '1px solid #e5e7eb'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'experience':
                return experience && experience.length > 0 ? (
                    <section key={id} style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>
                            Experience
                        </h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>{exp.position}</h4>
                                    <span style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: 500 }}>
                                        {exp.startDate} {(exp.startDate && exp.endDate) && ' - '} {exp.endDate}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
                                    {exp.company}
                                </div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-line' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section key={id} style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>
                            Education
                        </h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>{edu.school}</h4>
                                    <span style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: 500 }}>
                                        {edu.startDate} {(edu.startDate && edu.endDate) && ' - '} {edu.endDate}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1rem', color: '#374151' }}>{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div id="resume-document" style={{
            width: '100%',
            height: '100%',
            minHeight: '297mm',
            background: 'transparent',
            padding: '40px',
            boxSizing: 'border-box',
            color: '#333',
            fontFamily: 'sans-serif',
            boxShadow: 'var(--shadow-md)'
        }}>
            {/* Header (Fixed) */}
            <header style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                {personalInfo.profilePicture && (
                    <img
                        src={personalInfo.profilePicture}
                        alt="Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                    />
                )}
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '5px' }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <h2 style={{ fontSize: '1.25rem', color: '#666', fontWeight: 400, marginBottom: '15px' }}>
                        {personalInfo.jobTitle || 'Professional Title'}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.9rem', color: '#555' }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo.address && <span>• {personalInfo.address}</span>}
                        {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                        {personalInfo.website && <span>• {personalInfo.website}</span>}
                    </div>
                </div>
            </header>

            {/* Dynamic Content */}
            <div>
                {order.map(id => renderSection(id))}
            </div>
        </div>
    );
};

export default TemplateModern;
