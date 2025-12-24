import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await login(email, password);
        if (res.success) {
            toast.success('Welcome back!');
            navigate('/templates');
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    return (
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: 'var(--wrapper-bg)' }}></div>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(var(--primary-hue), var(--primary-sat), 70%, 0.15) 0%, transparent 70%)', borderRadius: '50%' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{ padding: '2rem', width: '100%', maxWidth: '380px', borderRadius: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(var(--primary-hue), var(--primary-sat), 50%, 0.1)', borderRadius: '50%', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                        <LogIn size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Sign in to continue building</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label className="label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input"
                                placeholder="name@example.com"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label className="label" style={{ marginBottom: 0 }}>Password</label>
                            <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot?</a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input"
                                placeholder="••••••••"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader size={18} />
                                </motion.div>
                                Signing in...
                            </>
                        ) : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    New to ResumeAI? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
