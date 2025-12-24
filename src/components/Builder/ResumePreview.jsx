import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import TemplateModern from '../Templates/TemplateModern';
import TemplateSimple from '../Templates/TemplateSimple';
import TemplateCreative from '../Templates/TemplateCreative';
import TemplateProfessional from '../Templates/TemplateProfessional';
import TemplateMinimal from '../Templates/TemplateMinimal';
import TemplateExecutive from '../Templates/TemplateExecutive';
import TemplateCompact from '../Templates/TemplateCompact';
import TemplateTech from '../Templates/TemplateTech';
import TemplateDesigner from '../Templates/TemplateDesigner';
import TemplateAcademic from '../Templates/TemplateAcademic';

const ResumePreview = () => {
    const { resumeData, selectedTemplate } = useResume();

    // Mapping string to component
    const TemplateComponent = () => {
        switch (selectedTemplate) {
            case 'modern':
                return <TemplateModern data={resumeData} />;
            case 'classic':
                return <TemplateSimple data={resumeData} />;
            case 'creative':
                return <TemplateCreative data={resumeData} />;
            case 'professional':
                return <TemplateProfessional data={resumeData} />;
            case 'minimal':
                return <TemplateMinimal data={resumeData} />;
            case 'executive':
                return <TemplateExecutive data={resumeData} />;
            case 'compact':
                return <TemplateCompact data={resumeData} />;
            case 'tech':
                return <TemplateTech data={resumeData} />;
            case 'designer':
                return <TemplateDesigner data={resumeData} />;
            case 'academic':
                return <TemplateAcademic data={resumeData} />;
            default:
                return <TemplateModern data={resumeData} />;
        }
    };

    return (
        <div className="resume-preview-container">
            <div
                id="resume-document"
                data-theme="light" // Force light theme for the resume content
                className="resume-document"
            >
                <TemplateComponent />
            </div>
        </div>
    );
};

export default ResumePreview;
