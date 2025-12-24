import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const TemplateProfessional = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;
    const { sectionOrder } = useResume();

    const order = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

    const renderSection = (id) => {
        const customSection = customSections?.find(s => s.id === id);
        if (customSection) {
            return (
                <section key={id} style={{ marginBottom: '30px' }}>
                    <h3 style={{ background: '#f1f5f9', padding: '5px 10px', fontSize: '1.1rem', fontWeight: 'bold', borderLeft: '4px solid #0f172a', marginBottom: '15px', textTransform: 'uppercase' }}>{customSection.title}</h3>
                    {customSection.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.title}</h4>
                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{item.startDate} {item.startDate && item.endDate && '–'} {item.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', marginBottom: '8px' }}>{item.subtitle}</div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            );
        }

        switch (id) {
            case 'summary':
                return summary ? (
                    <section key={id} style={{ marginBottom: '25px' }}>
                        <p style={{ lineHeight: 1.6, fontSize: '1rem', textAlign: 'justify' }}>{summary}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience && experience.length > 0 ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ background: '#f1f5f9', padding: '5px 10px', fontSize: '1.1rem', fontWeight: 'bold', borderLeft: '4px solid #0f172a', marginBottom: '15px' }}>PROFESSIONAL EXPERIENCE</h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{exp.company}</h4>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div style={{ fontStyle: 'italic', marginBottom: '8px' }}>{exp.position}</div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ background: '#f1f5f9', padding: '5px 10px', fontSize: '1.1rem', fontWeight: 'bold', borderLeft: '4px solid #0f172a', marginBottom: '15px' }}>EDUCATION</h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                                    <div>{edu.startDate} – {edu.endDate}</div>
                                </div>
                                <div>{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={id}>
                        <h3 style={{ background: '#f1f5f9', padding: '5px 10px', fontSize: '1.1rem', fontWeight: 'bold', borderLeft: '4px solid #0f172a', marginBottom: '15px' }}>SKILLS</h3>
                        <p style={{ lineHeight: 1.6 }}>{skills.join(', ')}</p>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: 'white',
            padding: '40px',
            boxSizing: 'border-box',
            fontFamily: "Georgia, serif",
            color: '#333'
        }}>
            <header style={{ borderBottom: '4px solid #0f172a', paddingBottom: '20px', marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.8rem', color: '#0f172a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{personalInfo.fullName}</h1>
                <div style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '15px', fontStyle: 'italic' }}>{personalInfo.jobTitle}</div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.9rem', color: '#333', flexWrap: 'wrap' }}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.linkedin, personalInfo.website].filter(Boolean).join('  |  ')}
                </div>
            </header>

            {order.map(id => renderSection(id))}
        </div>
    );
};

export default TemplateProfessional;
