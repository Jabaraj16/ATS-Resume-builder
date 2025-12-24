import React from 'react';

const TemplateExecutive = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: 'white',
            padding: '40px',
            boxSizing: 'border-box',
            color: '#1a202c',
            fontFamily: "'Merriweather', serif"
        }}>
            {/* Header */}
            <header style={{ borderBottom: '2px solid #eab308', paddingBottom: '25px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a202c', lineHeight: 1 }}>{personalInfo.fullName}</h1>
                    <div style={{ fontSize: '1.2rem', color: '#eab308', marginTop: '10px' }}>{personalInfo.jobTitle}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#4a5568', lineHeight: 1.6 }}>
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.address}</div>
                    {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: '30px', background: '#f7fafc', padding: '20px', borderLeft: '4px solid #eab308' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px', color: '#2d3748' }}>Executive Summary</h3>
                    <p style={{ lineHeight: 1.7, color: '#4a5568' }}>{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Professional Experience</h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '25px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2d3748' }}>{exp.position}</h4>
                                <span style={{ fontWeight: 600, color: '#eab308' }}>{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <div style={{ fontSize: '1rem', fontStyle: 'italic', color: '#718096', marginBottom: '10px' }}>{exp.company}</div>
                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Education</h3>
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{edu.school}</h4>
                                <span style={{ color: '#718096' }}>{edu.startDate} – {edu.endDate}</span>
                            </div>
                            <div style={{ color: '#4a5568' }}>{edu.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Core Competencies</h3>
                    <ul style={{ columnCount: 2, columnGap: '40px', paddingLeft: '20px' }}>
                        {skills.map((skill, i) => (
                            <li key={i} style={{ marginBottom: '5px', color: '#4a5568' }}>{skill}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Custom Sections */}
            {customSections?.map((section) => (
                <section key={section.id} style={{ marginTop: '30px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>{section.title}</h3>
                    {section.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.title}</h4>
                                <span style={{ color: '#718096' }}>{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#718096' }}>{item.subtitle}</div>
                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            ))}

        </div>
    );
};

export default TemplateExecutive;
