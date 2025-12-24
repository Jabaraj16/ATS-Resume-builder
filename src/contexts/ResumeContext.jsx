import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext(null);

export const useResume = () => useContext(ResumeContext);

const initialResumeState = {
    personalInfo: {
        profilePicture: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        website: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: [], // Array of strings
    projects: [],
    certifications: [],
    customSections: [], // { id, title, items: [] }
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeDraft');
        return saved ? JSON.parse(saved) : initialResumeState;
    });

    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    // Default Sections
    const defaultSections = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'];

    // Ensure sectionOrder is in state, backwards compatible
    const [sectionOrder, setSectionOrder] = useState(() => {
        const saved = localStorage.getItem('resumeSectionOrder');
        // Filter out any IDs that might not exist in customSections anymore if we wanted to be strict,
        // but for now just load it.
        return saved ? JSON.parse(saved) : defaultSections;
    });

    // Auto-save section order
    useEffect(() => {
        localStorage.setItem('resumeSectionOrder', JSON.stringify(sectionOrder));
    }, [sectionOrder]);


    // Auto-save data
    useEffect(() => {
        localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
    }, [resumeData]);

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
    };

    const updateSection = (section, data) => {
        setResumeData(prev => ({ ...prev, [section]: data }));
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({ ...prev, [section]: [...prev[section], item] }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    const updateItem = (section, index, newItem) => {
        setResumeData(prev => {
            const newArray = [...prev[section]];
            newArray[index] = newItem;
            return { ...prev, [section]: newArray };
        });
    };

    const resetResume = () => {
        setResumeData(initialResumeState);
        setSectionOrder(defaultSections);
    };

    const importResumeData = (data) => {
        // Reset to initial state but merge with imported data
        // This ensures old sample data is removed
        const newState = {
            ...initialResumeState,
            ...data,
            personalInfo: {
                ...initialResumeState.personalInfo,
                ...(data.personalInfo || {})
            }
        };
        setResumeData(newState);
        setSectionOrder(defaultSections);
    };

    const addCustomSection = (title) => {
        const newId = Date.now().toString(); // Use string for consistancy
        setResumeData(prev => ({
            ...prev,
            customSections: [...(prev.customSections || []), { id: newId, title, items: [] }]
        }));
        setSectionOrder(prev => [...prev, newId]);
    };

    const removeCustomSection = (id) => {
        setResumeData(prev => ({
            ...prev,
            customSections: (prev.customSections || []).filter(s => s.id !== id)
        }));
        setSectionOrder(prev => prev.filter(item => item !== id));
    };

    const addCustomItem = (sectionId, item) => {
        setResumeData(prev => ({
            ...prev,
            customSections: (prev.customSections || []).map(s =>
                s.id === sectionId ? { ...s, items: [...s.items, item] } : s
            )
        }));
    };

    const removeCustomItem = (sectionId, itemId) => {
        setResumeData(prev => ({
            ...prev,
            customSections: (prev.customSections || []).map(s =>
                s.id === sectionId ? { ...s, items: s.items.filter((item) => item.id !== itemId) } : s
            )
        }));
    };

    const updateCustomItem = (sectionId, itemId, field, value) => {
        setResumeData(prev => ({
            ...prev,
            customSections: (prev.customSections || []).map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.map((item) => item.id === itemId ? { ...item, [field]: value } : item)
                } : s
            )
        }));
    };

    const reorderSections = (newOrder) => {
        setSectionOrder(newOrder);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            updatePersonalInfo,
            updateSection,
            addItem,
            removeItem,
            updateItem,
            selectedTemplate,
            setSelectedTemplate,
            resetResume,
            importResumeData,
            addCustomSection,
            removeCustomSection,
            addCustomItem,
            removeCustomItem,
            updateCustomItem,
            sectionOrder,
            reorderSections
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
