import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 6) {
            toast.error('Password too short (min 6 chars)');
            setLoading(false);
            return;
        }

        const res = await register(name, email, password);
        if (res.success) {
            toast.success('Account created! Welcome aboard.');
            navigate('/templates');
        } else {
            if (res.error === 'User already exists') {
                toast.error('User already registered. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(res.error);
            }
        }
        setLoading(false);
    };

    return (
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: 'var(--wrapper-bg)' }}></div>
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{ padding: '2rem', width: '100%', maxWidth: '480px', borderRadius: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(var(--primary-hue), var(--primary-sat), 50%, 0.1)', borderRadius: '50%', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                        <UserPlus size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Start building your professional resume</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label className="label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input"
                                placeholder="John Doe"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                    </div>
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
                        <label className="label">Password</label>
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
                                Creating Account...
                            </>
                        ) : (
                            <>Sign Up <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
