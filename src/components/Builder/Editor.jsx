import React, { useState, useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Reorder } from 'framer-motion';
import SortableSection from './SortableSection';
import FormSection from './FormSection';
import Modal from '../Modal';
import { Upload, Zap, FileText, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { parseResume } from '../../utils/resumeParser';
import { uploadPhotoAPI } from '../../services/allAPI';

const Editor = () => {
    const {
        resumeData, updatePersonalInfo, addItem, updateItem, removeItem, updateSection,
        selectedTemplate, setSelectedTemplate, importResumeData,
        addCustomSection, removeCustomSection, addCustomItem, removeCustomItem, updateCustomItem,
        sectionOrder, reorderSections
    } = useResume();

    // ... hooks ...
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState('');

    // ... handlers ...
    const handleAddCustomSection = (e) => {
        e.preventDefault();
        if (newSectionTitle.trim()) {
            addCustomSection(newSectionTitle.trim());
            setNewSectionTitle('');
            setIsModalOpen(false);
        }
    };
    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const loadingToast = toast.loading('Parsing resume...');

        try {
            const parsedData = await parseResume(file);
            importResumeData(parsedData);
            toast.dismiss(loadingToast);
            toast.success('Resume imported successfully!');
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            toast.error('Failed to parse resume.');
        }
    };

    // Helper to render sections dynamically
    const renderSectionContent = (id) => {
        // Custom Sections
        const customSection = resumeData.customSections?.find(s => s.id === id);
        if (customSection) {
            return (
                <FormSection key={id} title={customSection.title}>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => removeCustomSection(customSection.id)} style={{ color: 'red', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}>Delete Section</button>
                    </div>
                    {customSection.items.map(item => (
                        <div key={item.id} className="form-item" style={{ border: '1px solid var(--color-border)', padding: '15px', borderRadius: 'var(--radius)', marginBottom: '15px' }}>
                            <input type="text" placeholder="Title" value={item.title} onChange={(e) => updateCustomItem(customSection.id, item.id, 'title', e.target.value)} className="input" style={{ width: '100%', marginBottom: '10px' }} />
                            <input type="text" placeholder="Subtitle" value={item.subtitle} onChange={(e) => updateCustomItem(customSection.id, item.id, 'subtitle', e.target.value)} className="input" style={{ width: '100%', marginBottom: '10px' }} />
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <input type="text" placeholder="Start Date" value={item.startDate} onChange={(e) => updateCustomItem(customSection.id, item.id, 'startDate', e.target.value)} className="input" style={{ flex: 1 }} />
                                <input type="text" placeholder="End Date" value={item.endDate} onChange={(e) => updateCustomItem(customSection.id, item.id, 'endDate', e.target.value)} className="input" style={{ flex: 1 }} />
                            </div>
                            <textarea placeholder="Description" value={item.description} onChange={(e) => updateCustomItem(customSection.id, item.id, 'description', e.target.value)} className="input" style={{ width: '100%', minHeight: '80px', marginBottom: '10px' }} />
                            <button className="btn btn-outline-danger" onClick={() => removeCustomItem(customSection.id, item.id)} style={{ padding: '0.5rem', fontSize: '0.9rem' }}>Remove Item</button>
                        </div>
                    ))}
                    <button className="btn btn-outline w-full" onClick={() => addCustomItem(customSection.id, { id: Date.now(), title: '', subtitle: '', startDate: '', endDate: '', description: '' })}>+ Add Item</button>
                </FormSection>
            );
        }

        switch (id) {
            case 'summary':
                return (
                    <FormSection key={id} title="Professional Summary">
                        <textarea name="summary" value={resumeData.summary} onChange={(e) => updateSection('summary', e.target.value)} className="input" style={{ minHeight: '100px' }} placeholder="Write a brief summary of your career..." />
                    </FormSection>
                );
            case 'experience':
                return (
                    <FormSection key={id} title="Experience">
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px' }}>
                                <input className="input mb-2" placeholder="Company" value={exp.company} onChange={(e) => updateItem('experience', index, { ...exp, company: e.target.value })} />
                                <input className="input mb-2" placeholder="Position" value={exp.position} onChange={(e) => updateItem('experience', index, { ...exp, position: e.target.value })} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <input className="input mb-2" placeholder="Start Date" value={exp.startDate} onChange={(e) => updateItem('experience', index, { ...exp, startDate: e.target.value })} />
                                    <input className="input mb-2" placeholder="End Date" value={exp.endDate} onChange={(e) => updateItem('experience', index, { ...exp, endDate: e.target.value })} />
                                </div>
                                <textarea className="input mb-2" placeholder="Description" value={exp.description} onChange={(e) => updateItem('experience', index, { ...exp, description: e.target.value })} />
                                <button onClick={() => removeItem('experience', index)} style={{ color: 'red', fontSize: '0.8rem' }}>Remove</button>
                            </div>
                        ))}
                        <button className="btn btn-outline w-full" onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })}>+ Add Experience</button>
                    </FormSection>
                );
            case 'education':
                return (
                    <FormSection key={id} title="Education">
                        {resumeData.education.map((edu, index) => (
                            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px' }}>
                                <input className="input mb-2" placeholder="School" value={edu.school} onChange={(e) => updateItem('education', index, { ...edu, school: e.target.value })} />
                                <input className="input mb-2" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', index, { ...edu, degree: e.target.value })} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <input className="input mb-2" placeholder="Start Date" value={edu.startDate} onChange={(e) => updateItem('education', index, { ...edu, startDate: e.target.value })} />
                                    <input className="input mb-2" placeholder="End Date" value={edu.endDate} onChange={(e) => updateItem('education', index, { ...edu, endDate: e.target.value })} />
                                </div>
                                <button onClick={() => removeItem('education', index)} style={{ color: 'red', fontSize: '0.8rem' }}>Remove</button>
                            </div>
                        ))}
                        <button className="btn btn-outline w-full" onClick={() => addItem('education', { school: '', degree: '', startDate: '', endDate: '' })}>+ Add Education</button>
                    </FormSection>
                );
            case 'skills':
                return (
                    <FormSection key={id} title="Skills">
                        <textarea
                            className="input"
                            placeholder="Comma separated skills (e.g. React, Node.js, Python)"
                            value={resumeData.skills.join(', ')}
                            onChange={(e) => {
                                updateSection('skills', e.target.value.split(','));
                            }}
                        />
                    </FormSection>
                );
            // Add projects/certifications if they exist in standard schema but weren't in previous editor
            case 'projects':
                // Optional: Implement if needed, or leave for future.
                return null;
            case 'certifications':
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="editor-container" style={{ height: '100%', overflowY: 'auto', paddingRight: '1rem' }}>

            {/* Top Actions */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                {/* ... Keep File Import & Template Select ... */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-outline"
                    style={{ width: '100%', marginBottom: '1rem', display: 'flex', gap: '8px', justifyContent: 'center' }}
                >
                    <Upload size={16} /> Import from PDF/TXT
                </button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.txt" onChange={handleFileUpload} />

                <label className="label">Select Template</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <TemplateBtn name="Modern" id="modern" current={selectedTemplate} select={setSelectedTemplate} icon={<Zap size={16} />} />
                    <TemplateBtn name="Classic" id="classic" current={selectedTemplate} select={setSelectedTemplate} icon={<FileText size={16} />} />
                    <TemplateBtn name="Creative" id="creative" current={selectedTemplate} select={setSelectedTemplate} icon={<Zap size={16} />} />
                    <TemplateBtn name="Professional" id="professional" current={selectedTemplate} select={setSelectedTemplate} icon={<FileText size={16} />} />
                </div>
            </div>

            {/* Personal Info - Fixed */}
            <FormSection title="Personal Information" isOpen={true}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {['modern', 'creative'].includes(selectedTemplate) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                            {resumeData.personalInfo.profilePicture && (
                                <img
                                    src={resumeData.personalInfo.profilePicture}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                                />
                            )}
                            <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                                Upload Photo
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        const formData = new FormData();
                                        formData.append('profilePicture', file);

                                        const toastId = toast.loading('Uploading photo...');
                                        try {
                                            const res = await uploadPhotoAPI(formData, {});

                                            // Axios returns data in res.data
                                            if (res.status === 200 && res.data.imageUrl) {
                                                updatePersonalInfo({ profilePicture: res.data.imageUrl });
                                                toast.success('Photo uploaded', { id: toastId });
                                            } else {
                                                throw new Error('Upload failed');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            toast.error('Failed to upload photo', { id: toastId });
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    )}

                    <div>
                        <label className="label">Full Name</label>
                        <input type="text" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalChange} className="input" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="label">Job Title</label>
                        <input type="text" name="jobTitle" value={resumeData.personalInfo.jobTitle || ''} onChange={handlePersonalChange} className="input" placeholder="Software Engineer" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div><label className="label">Email</label><input type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalChange} className="input" /></div>
                        <div><label className="label">Phone</label><input type="tel" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalChange} className="input" /></div>
                    </div>
                    <div><label className="label">Address</label><input type="text" name="address" value={resumeData.personalInfo.address} onChange={handlePersonalChange} className="input" /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div><label className="label">LinkedIn</label><input type="text" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalChange} className="input" /></div>
                        <div><label className="label">Website</label><input type="text" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalChange} className="input" /></div>
                    </div>
                </div>
            </FormSection>

            {/* Draggable Sections */}
            <Reorder.Group axis="y" values={sectionOrder} onReorder={reorderSections}>
                {sectionOrder.map(id => (
                    <SortableSection key={id} item={id}>
                        {renderSectionContent(id)}
                    </SortableSection>
                ))}
            </Reorder.Group>

            <button
                className="btn btn-outline"
                style={{ width: '100%', borderStyle: 'dashed', padding: '1rem' }}
                onClick={() => setIsModalOpen(true)}
            >
                <Plus size={18} style={{ marginRight: '8px' }} /> Add Custom Section
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Section"
            >
                <form onSubmit={handleAddCustomSection}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Section Title</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Certifications, Languages, Awards"
                            value={newSectionTitle}
                            onChange={(e) => setNewSectionTitle(e.target.value)}
                            autoFocus
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Section</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const TemplateBtn = ({ name, id, current, select, icon }) => (
    <button
        onClick={() => select(id)}
        style={{
            padding: '10px',
            borderRadius: '8px',
            border: current === id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
            background: current === id ? 'var(--color-primary-light)' : 'var(--color-surface)',
            color: 'var(--color-text)',
            pointerEvents: 'auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s'
        }}
    >
        {icon}
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{name}</div>
    </button>
);

export default Editor;
