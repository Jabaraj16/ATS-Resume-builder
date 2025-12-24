import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const TemplateCreative = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;
    const { sectionOrder } = useResume();

    const order = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

    const renderSection = (id) => {
        const customSection = customSections?.find(s => s.id === id);
        if (customSection) {
            return (
                <section key={id} style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>{customSection.title}</h3>
                    {customSection.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h4>
                            <div style={{ color: '#64748b' }}>{item.subtitle}</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</div>
                            <p style={{ fontSize: '0.95rem', color: '#475569', marginTop: '5px' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            );
        }

        switch (id) {
            case 'summary':
                return summary ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '15px' }}>Profile</h3>
                        <p style={{ lineHeight: 1.6, color: '#555' }}>{summary}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience && experience.length > 0 ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>Experience</h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '20px', borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', position: 'relative' }}>
                                <div style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', position: 'absolute', left: '-6px', top: '5px' }}></div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{exp.position}</h4>
                                <div style={{ color: '#3b82f6', fontWeight: 500, marginBottom: '5px' }}>{exp.company}</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>{exp.startDate} - {exp.endDate}</div>
                                <p style={{ fontSize: '0.95rem', color: '#475569' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>Education</h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '15px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{edu.school}</h4>
                                <div style={{ color: '#64748b' }}>{edu.degree}</div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key={id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {skills.map((skill, i) => (
                                <span key={i} style={{ background: '#f1f5f9', color: '#334155', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>{skill}</span>
                            ))}
                        </div>
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
            display: 'flex',
            boxShadow: 'var(--shadow-md)',
            fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Left Sidebar (Dark) */}
            <aside style={{ width: '35%', background: '#1e293b', color: 'white', padding: '40px 30px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '100px', height: '100px', background: '#3b82f6', borderRadius: '50%',
                        margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', fontWeight: 700, overflow: 'hidden'
                    }}>
                        {personalInfo.profilePicture ? (
                            <img
                                src={personalInfo.profilePicture}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            personalInfo.fullName ? personalInfo.fullName[0] : 'U'
                        )}
                    </div>
                    <h1 style={{ fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '10px' }}>{personalInfo.fullName}</h1>
                    <p style={{ opacity: 0.8, fontSize: '1rem' }}>{personalInfo.jobTitle}</p>
                </div>

                <div style={{ marginBottom: '40px', fontSize: '0.9rem', opacity: 0.9, lineHeight: 2 }}>
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.address}</div>
                    <div>{personalInfo.linkedin}</div>
                    <div>{personalInfo.website}</div>
                </div>
            </aside>

            {/* Right Content */}
            <main style={{ flex: 1, padding: '40px', color: '#333' }}>
                {order.map(id => renderSection(id))}
            </main>
        </div>
    );
};

export default TemplateCreative;
