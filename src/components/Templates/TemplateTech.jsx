import React from 'react';

const TemplateTech = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: '#111827',
            color: '#e5e7eb',
            padding: '40px',
            boxSizing: 'border-box',
            fontFamily: "'Fira Code', 'Courier New', monospace"
        }}>
            {/* Header */}
            <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '20px', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '5px' }}>{`> ${personalInfo.fullName}`}</h1>
                <div style={{ fontSize: '1.1rem', color: '#d1d5db' }}>{`// ${personalInfo.jobTitle}`}</div>
                <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.9rem', color: '#9ca3af' }}>
                    {personalInfo.email && <span style={{ color: '#10b981' }}>"{personalInfo.email}"</span>}
                    {personalInfo.linkedin && <span style={{ color: '#60a5fa' }}>link: {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span style={{ color: '#f59e0b' }}>web: {personalInfo.website}</span>}
                </div>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                {/* Main Column */}
                <div>
                    {summary && (
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px' }}>_summary</h3>
                            <p style={{ lineHeight: 1.6, color: '#d1d5db', fontSize: '0.95rem' }}>{summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px' }}>_experience</h3>
                            {experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '25px', borderLeft: '1px solid #374151', paddingLeft: '15px' }}>
                                    <h4 style={{ fontSize: '1.1rem', color: '#e5e7eb' }}>{exp.position} @ <span style={{ color: '#10b981' }}>{exp.company}</span></h4>
                                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '10px' }}>{exp.startDate} ={'>'} {exp.endDate}</div>
                                    <p style={{ lineHeight: 1.5, color: '#9ca3af', fontSize: '0.9rem' }}>{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {customSections?.map((section) => (
                        <section key={section.id} style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px' }}>_{section.title.toLowerCase()}</h3>
                            {section.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: '20px', borderLeft: '1px solid #374151', paddingLeft: '15px' }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.title}</h4>
                                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{item.subtitle}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '5px' }}>{item.startDate} - {item.endDate}</div>
                                    <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>{item.description}</p>
                                </div>
                            ))}
                        </section>
                    ))}
                </div>

                {/* Sidebar */}
                <div>
                    {skills.length > 0 && (
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px' }}>_skills</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {skills.map((skill, i) => (
                                    <code key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>{skill}</code>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px' }}>_education</h3>
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '15px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{edu.degree}</div>
                                    <div style={{ color: '#4b5563', fontSize: '0.8rem' }}>{edu.endDate}</div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTech;
