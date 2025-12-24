import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const TemplateSimple = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;
    const { sectionOrder } = useResume();

    const order = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

    const renderSection = (id) => {
        const customSection = customSections?.find(s => s.id === id);
        if (customSection) {
            return (
                <section key={id} style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px' }}>{customSection.title}</h3>
                    {customSection.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
                                <span>{item.title} {item.subtitle && `- ${item.subtitle}`}</span>
                                <span>{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</span>
                            </div>
                            <p style={{ fontSize: '10pt', whiteSpace: 'pre-line' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            );
        }

        switch (id) {
            case 'summary':
                return summary ? (
                    <section key="summary" style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px' }}>Summary</h3>
                        <p style={{ fontSize: '10pt' }}>{summary}</p>
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section key="skills" style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px' }}>Skills</h3>
                        <p style={{ fontSize: '10pt' }}>{skills.join(' • ')}</p>
                    </section>
                ) : null;

            case 'experience':
                return experience && experience.length > 0 ? (
                    <section key="experience" style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px' }}>Experience</h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
                                    <span>{exp.company} - {exp.position}</span>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p style={{ fontSize: '10pt', whiteSpace: 'pre-line' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section key="education" style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', borderBottom: '1px solid black', marginBottom: '5px' }}>Education</h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
                                    <span>{edu.school}, {edu.degree}</span>
                                    <span>{edu.startDate} - {edu.endDate}</span>
                                </div>
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
            minHeight: '297mm',
            background: 'white',
            padding: '50px',
            boxSizing: 'border-box',
            color: '#000',
            fontFamily: 'serif',
            boxShadow: 'var(--shadow-md)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid black', paddingBottom: '10px' }}>
                <h1 style={{ fontSize: '24pt', marginBottom: '5px', textTransform: 'uppercase' }}>{personalInfo.fullName}</h1>
                <div style={{ fontSize: '10pt' }}>
                    {personalInfo.email} | {personalInfo.phone} | {personalInfo.address}
                </div>
                {personalInfo.linkedin && <div style={{ fontSize: '10pt' }}>{personalInfo.linkedin}</div>}
            </div>

            {order.map(id => renderSection(id))}
        </div>
    );
};

export default TemplateSimple;
