import React from 'react';

const TemplateCompact = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: 'white',
            padding: '30px',
            boxSizing: 'border-box',
            color: '#333',
            fontFamily: "'Roboto', sans-serif"
        }}>
            <header style={{ borderBottom: '3px solid #14b8a6', paddingBottom: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', color: '#14b8a6', margin: 0 }}>{personalInfo.fullName}</h1>
                    <div style={{ fontSize: '1rem', fontWeight: 500 }}>{personalInfo.jobTitle}</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', marginTop: '10px', color: '#666' }}>
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.address}</span>
                    <span>{personalInfo.website}</span>
                </div>
            </header>

            <div style={{ columnCount: 2, columnGap: '30px' }}>
                {summary && (
                    <section style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '8px', color: '#14b8a6' }}>PROFILE</h3>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>{summary}</p>
                    </section>
                )}

                {skills.length > 0 && (
                    <section style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '8px', color: '#14b8a6' }}>SKILLS</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {skills.map((skill, i) => (
                                <span key={i} style={{ fontSize: '0.8rem', background: '#f0fdfa', color: '#0f766e', padding: '2px 6px', borderRadius: '3px' }}>{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '8px', color: '#14b8a6' }}>EDUCATION</h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '10px', fontSize: '0.85rem' }}>
                                <div style={{ fontWeight: 700 }}>{edu.school}</div>
                                <div>{edu.degree}</div>
                                <div style={{ color: '#888', fontSize: '0.75rem' }}>{edu.startDate} – {edu.endDate}</div>
                            </div>
                        ))}
                    </section>
                )}

                {experience.length > 0 && (
                    <section style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '8px', color: '#14b8a6' }}>EXPERIENCE</h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '15px', fontSize: '0.85rem' }}>
                                <div style={{ fontWeight: 700 }}>{exp.position}</div>
                                <div style={{ color: '#555', fontStyle: 'italic', marginBottom: '2px' }}>{exp.company} <span style={{ float: 'right', fontSize: '0.75rem', normal: 'normal' }}>{exp.startDate} - {exp.endDate}</span></div>
                                <p style={{ marginTop: '5px' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {customSections?.map((section) => (
                    <section key={section.id} style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '3px', marginBottom: '8px', color: '#14b8a6' }}>{section.title.toUpperCase()}</h3>
                        {section.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: '10px', fontSize: '0.85rem' }}>
                                <div style={{ fontWeight: 700 }}>{item.title}</div>
                                <div style={{ color: '#555', fontSize: '0.8rem' }}>{item.subtitle}</div>
                                <div style={{ color: '#888', fontSize: '0.75rem' }}>{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</div>
                                <p style={{ marginTop: '2px' }}>{item.description}</p>
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default TemplateCompact;
