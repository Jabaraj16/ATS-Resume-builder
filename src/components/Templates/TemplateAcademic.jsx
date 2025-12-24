import React from 'react';

const TemplateAcademic = ({ data }) => {
    const { personalInfo, summary, education, experience, skills, customSections } = data;

    return (
        <div id="resume-document" style={{
            width: '100%',
            minHeight: '297mm',
            background: 'white',
            padding: '50px',
            boxSizing: 'border-box',
            color: '#000',
            fontFamily: "'Times New Roman', Times, serif"
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24pt', fontWeight: 'bold' }}>{personalInfo.fullName}</h1>
                <div style={{ fontSize: '11pt', marginTop: '5px' }}>
                    {personalInfo.address} • {personalInfo.phone} • {personalInfo.email}
                </div>
                {personalInfo.website && <div style={{ fontSize: '11pt' }}>{personalInfo.website}</div>}
            </div>

            {summary && (
                <section style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '11pt', lineHeight: 1.5, textAlign: 'justify' }}>{summary}</p>
                </section>
            )}

            {education.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Education</h3>
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{edu.school}</div>
                                <div style={{ fontSize: '11pt', fontStyle: 'italic' }}>{edu.degree}</div>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '11pt' }}>
                                {edu.startDate} – {edu.endDate}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {experience.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Professional Experience</h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{exp.company}</div>
                                <div style={{ fontSize: '11pt' }}>{exp.startDate} – {exp.endDate}</div>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '11pt', marginBottom: '5px' }}>{exp.position}</div>
                            <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                                {exp.description.split('\n').map((line, idx) => (
                                    <li key={idx} style={{ fontSize: '11pt', lineHeight: 1.4 }}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {skills.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Skills</h3>
                    <p style={{ fontSize: '11pt', lineHeight: 1.5 }}>{skills.join(', ')}</p>
                </section>
            )}

            {customSections?.map((section) => (
                <section key={section.id} style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>{section.title}</h3>
                    {section.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{item.title}</div>
                                <div style={{ fontSize: '11pt' }}>{item.startDate} {item.startDate && item.endDate && '–'} {item.endDate}</div>
                            </div>
                            {item.subtitle && <div style={{ fontStyle: 'italic', fontSize: '11pt' }}>{item.subtitle}</div>}
                            <p style={{ fontSize: '11pt', margin: '5px 0' }}>{item.description}</p>
                        </div>
                    ))}
                </section>
            ))}

        </div>
    );
};

export default TemplateAcademic;
