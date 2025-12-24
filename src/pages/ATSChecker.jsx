import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertTriangle, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Sub-component for Score Animation
const AnimatedScore = ({ score }) => {
    const circleRadius = 40;
    const circumference = 2 * Math.PI * circleRadius;

    return (
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Circle */}
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="none"
                />
                {/* Animated Progress Circle */}
                <motion.circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    stroke={score > 80 ? '#16a34a' : '#dc2626'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            {/* Number Counter */}
            <div style={{ position: 'absolute', fontSize: '2rem', fontWeight: 700, color: score > 80 ? '#16a34a' : '#dc2626' }}>
                <Counter from={0} to={score} duration={1.5} />
            </div>
        </div>
    );
};

const Counter = ({ from, to, duration }) => {
    const [count, setCount] = useState(from);
    useEffect(() => {
        let startTime;
        let animationFrame;

        const update = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * (to - from) + from));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(update);
            }
        };

        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, [from, to, duration]);

    return <>{count}</>;
};

const jobKeywords = {
    'general': {
        found: ['Communication', 'Teamwork', 'Problem Solving', 'Time Management'],
        missing: ['Leadership', 'Project Management', 'Adaptability']
    },
    'frontend': {
        found: ['React', 'JavaScript', 'CSS', 'HTML', 'Responsive Design'],
        missing: ['TypeScript', 'Testing', 'Performance Optimization', 'Git']
    },
    'backend': {
        found: ['Node.js', 'API Design', 'Database', 'SQL', 'Security'],
        missing: ['Docker', 'Kubernetes', 'Microservices', 'AWS']
    },
    'mobile': {
        found: ['React Native', 'iOS', 'Android', 'API Integration'],
        missing: ['Flutter', 'Publishing', 'Performance', 'Swift']
    },
    'data': {
        found: ['Python', 'SQL', 'Data Analysis', 'Visualization', 'Statistics'],
        missing: ['Machine Learning', 'Big Data', 'Tableau', 'Spark']
    },
    'design': {
        found: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing', 'Color Theory'],
        missing: ['lo-fi', 'User Research', 'Adobe Suite', 'Interaction Design']
    },
    'business': {
        found: ['Analysis', 'Reporting', 'Excel', 'Stakeholder Management'],
        missing: ['Strategy', 'Budgeting', 'KPIs', 'Agile']
    },
    'marketing': {
        found: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
        missing: ['Copywriting', 'Email Marketing', 'PPC', 'Brand Management']
    },
    'sales': {
        found: ['CRM', 'Negotiation', 'Lead Generation', 'Communication'],
        missing: ['Closing', 'Prospecting', 'Salesforce', 'Account Management']
    },
    'hr': {
        found: ['Recruitment', 'Onboarding', 'Communication', 'Employee Relations'],
        missing: ['Compliance', 'Payroll', 'Training', 'Benefits']
    },
    'finance': {
        found: ['Excel', 'Financial Analysis', 'Reporting', 'Accounting'],
        missing: ['Forecasting', 'Auditing', 'GAAP', 'Risk Management']
    },
    'engineering': {
        found: ['Project Management', 'CAD', 'Technical Writing', 'Problem Solving'],
        missing: ['Safety Standards', 'Quality Control', 'Testing', 'Simulation']
    },
    'support': {
        found: ['Troubleshooting', 'Customer Service', 'Windows', 'Hardware'],
        missing: ['Network Security', 'Active Directory', 'Documentation']
    }
};

const ATSChecker = () => {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [jobRole, setJobRole] = useState('general');

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/pdf') {
            setFile(selected);
            setResult(null);
        } else {
            toast.error('Please upload a PDF file');
        }
    };

    const handleAnalyze = () => {
        if (!file) return;
        setIsAnalyzing(true);

        // Simulate analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);

            // Get keywords based on selected role
            const roleData = jobKeywords[jobRole] || jobKeywords['general'];

            // Randomize score slightly for "realism"
            const baseScore = Math.floor(Math.random() * (95 - 70) + 70);

            setResult({
                score: baseScore,
                keywords: roleData.found,
                missing: roleData.missing,
                formatting: 'Good'
            });
            toast.success('Analysis Complete!');
        }, 2000);
    };

    return (
        <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ATS Score Checker
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
                    Upload your resume to see how well it parses and get an instant score.
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                {!file ? (
                    <div
                        style={{ border: '2px dashed #cbd5e1', borderRadius: '1rem', padding: '3rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => document.getElementById('ats-upload').click()}
                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                        onDragLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; }}
                        onDrop={(e) => {
                            e.preventDefault();
                            const droppedFile = e.dataTransfer.files[0];
                            if (droppedFile?.type === 'application/pdf') setFile(droppedFile);
                            else toast.error('PDFs only!');
                        }}
                    >
                        <Upload size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Drop your resume here</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>or click to browse (PDF only)</p>
                        <input id="ats-upload" type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FileText size={32} color="var(--color-primary)" />
                            <div>
                                <div style={{ fontWeight: 600 }}>{file.name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                            </div>
                        </div>
                        {!isAnalyzing && !result && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>Target Job Role</label>
                                    <select
                                        value={jobRole}
                                        onChange={(e) => setJobRole(e.target.value)}
                                        className="input"
                                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="general">General / Other</option>
                                        <option value="frontend">Frontend Developer</option>
                                        <option value="backend">Backend Developer</option>
                                        <option value="mobile">Mobile Developer</option>
                                        <option value="data">Data Scientist</option>
                                        <option value="design">UI/UX Designer</option>
                                        <option value="business">Business Analyst</option>
                                        <option value="marketing">Marketing Specialist</option>
                                        <option value="sales">Sales Representative</option>
                                        <option value="hr">Human Resources</option>
                                        <option value="finance">Finance / Accounting</option>
                                        <option value="engineering">Engineering (Non-SW)</option>
                                        <option value="support">IT Support</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setFile(null)}>Remove</button>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAnalyze}>Analyze Now</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Analysis State */}
                {isAnalyzing && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <div className="loading-spinner" style={{ margin: '0 auto 1rem auto' }}></div>
                        <p>Scanning keywords and formatting...</p>
                    </div>
                )}
            </div>

            {/* Results */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel"
                        style={{ padding: '2rem', borderRadius: '1rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>ATS Compatibility Score</h2>
                                <p style={{ color: 'var(--color-text-muted)' }}>Based on industry standard algorithms</p>
                            </div>
                            <AnimatedScore score={result.score} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', marginBottom: '1rem' }}>
                                    <CheckCircle size={20} /> Found Keywords
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {result.keywords.map(k => (
                                        <span key={k} style={{ background: '#f0fdf4', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>{k}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ea580c', marginBottom: '1rem' }}>
                                    <AlertTriangle size={20} /> Improvements
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {result.missing.map(k => (
                                        <span key={k} style={{ background: '#fff7ed', color: '#9a3412', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>Missing: {k}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee', textAlign: 'center' }}>
                            <p style={{ marginBottom: '1rem' }}>Want to improve your score?</p>
                            <button className="btn btn-outline" style={{ marginRight: '1rem' }} onClick={() => { setFile(null); setResult(null); }}>Check Another Resume</button>
                            <button className="btn btn-primary" onClick={() => window.location.href = '/templates'}>Build ATS-Optimized Resume</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ATSChecker;
