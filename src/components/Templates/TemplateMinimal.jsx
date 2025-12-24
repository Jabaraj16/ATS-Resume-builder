import React from 'react';

const TemplateMinimal = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: 'white',
            padding: '50px',
            boxSizing: 'border-box',
            color: '#333',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 300, letterSpacing: '-1px', marginBottom: '10px' }}>
                    {personalInfo.fullName}
                </h1>
                <div style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>{personalInfo.jobTitle}</div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#888' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: '35px' }}>
                    <p style={{ lineHeight: 1.6, color: '#444' }}>{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '35px' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Experience</h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '25px', display: 'flex' }}>
                            <div style={{ width: '120px', flexShrink: 0, fontSize: '0.85rem', color: '#888', paddingTop: '4px' }}>
                                {exp.startDate} – <br /> {exp.endDate}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#222' }}>{exp.position}</h4>
                                <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>{exp.company}</div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#444' }}>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '35px' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Education</h3>
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '15px', display: 'flex' }}>
                            <div style={{ width: '120px', flexShrink: 0, fontSize: '0.85rem', color: '#888' }}>
                                {edu.startDate} – {edu.endDate}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{edu.school}</h4>
                                <div style={{ fontSize: '0.95rem' }}>{edu.degree}</div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section style={{ marginBottom: '35px' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {skills.map((skill, i) => (
                            <span key={i} style={{ fontSize: '0.9rem', color: '#555', border: '1px solid #eee', padding: '4px 8px', borderRadius: '4px' }}>{skill}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* Custom Sections */}
            {customSections?.map((section) => (
                <section key={section.id} style={{ marginBottom: '35px' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>{section.title}</h3>
                    {section.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.title}</h4>
                                <span style={{ fontSize: '0.85rem', color: '#888' }}>{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{item.subtitle}</div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#444' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateMinimal;
