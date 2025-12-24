import React from 'react';

const TemplateDesigner = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: '#fff0f5', // Lavender blush
            padding: '0',
            boxSizing: 'border-box',
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            flexDirection: 'column'
        }}>

            <div style={{ background: '#f43f5e', padding: '60px 40px', color: 'white', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '10px' }}>{personalInfo.fullName}</h1>
                <p style={{ fontSize: '1.5rem', fontWeight: 200, letterSpacing: '2px', opacity: 0.9 }}>{personalInfo.jobTitle}</p>
            </div>

            <div style={{ padding: '40px', display: 'flex', gap: '40px', flex: 1 }}>

                {/* Left Col */}
                <div style={{ width: '35%' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#f43f5e', fontWeight: 700, marginBottom: '15px', textTransform: 'uppercase' }}>Contact</h3>
                        <div style={{ fontSize: '0.9rem', color: '#444', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span>✉️</span> {personalInfo.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span>📱</span> {personalInfo.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span>📍</span> {personalInfo.address}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span>🌐</span> {personalInfo.website}</div>
                        </div>
                    </div>

                    {skills.length > 0 && (
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#f43f5e', fontWeight: 700, marginBottom: '15px', textTransform: 'uppercase' }}>Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {skills.map((skill, i) => (
                                    <span key={i} style={{ background: 'white', padding: '5px 10px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: '0.85rem' }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#f43f5e', fontWeight: 700, marginBottom: '15px', textTransform: 'uppercase' }}>Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '20px' }}>
                                    <div style={{ fontWeight: 700 }}>{edu.school}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Col */}
                <div style={{ flex: 1 }}>
                    {summary && (
                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#333' }}>{summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '1.5rem', color: '#f43f5e', fontWeight: 900, marginBottom: '25px' }}>Experience</h3>
                            {experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '30px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-24px', top: '5px', width: '12px', height: '12px', background: '#f43f5e', borderRadius: '50%' }}></div>
                                    <div style={{ borderLeft: '2px solid #ddd', paddingLeft: '20px', marginLeft: '-19px', paddingBottom: '10px' }}>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{exp.position}</h4>
                                        <div style={{ color: '#f43f5e', fontWeight: 500, marginBottom: '5px' }}>{exp.company}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>{exp.startDate} - {exp.endDate}</div>
                                        <p style={{ lineHeight: 1.6, color: '#555' }}>{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {customSections?.map((section) => (
                        <div key={section.id} style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.5rem', color: '#f43f5e', fontWeight: 900, marginBottom: '25px' }}>{section.title}</h3>
                            {section.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h4>
                                    <div style={{ color: '#666' }}>{item.subtitle}</div>
                                    <p style={{ marginTop: '5px' }}>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default TemplateDesigner;
