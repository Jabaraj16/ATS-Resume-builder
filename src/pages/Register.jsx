import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // OTP State
    const [step, setStep] = useState('register'); // 'register' | 'otp'
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Timer Effect
    React.useEffect(() => {
        let interval;
        if (step === 'otp' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const { register, verifyOTP, resendOTP } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/templates';

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 6) {
            toast.error('Password too short (min 6 chars)');
            setLoading(false);
            return;
        }

        const res = await register(name, email, password);
        if (res.success && res.requireOTP) {
            toast.success('OTP sent to your email!');
            setStep('otp');
            setTimer(30);
            setCanResend(false);
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

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await verifyOTP(email, otp);
        if (res.success) {
            toast.success('Successfully Registered! Please Login.');
            navigate('/login', { state: { from } });
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    const handleResendOTP = async () => {
        setLoading(true);
        const res = await resendOTP(email);
        if (res.success) {
            toast.success('OTP Resent!');
            setTimer(30);
            setCanResend(false);
        } else {
            toast.error(res.error || 'Failed to resend OTP');
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
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                        {step === 'register' ? 'Create Account' : 'Verify Email'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {step === 'register' ? 'Start building your professional resume' : `Enter the OTP sent to ${email}`}
                    </p>
                </div>

                {step === 'register' ? (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                                    Sending OTP...
                                </>
                            ) : (
                                <>Get OTP <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label className="label">Enter OTP</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^\d*$/.test(val)) {
                                            setOtp(val);
                                        }
                                    }}
                                    required
                                    className="input"
                                    placeholder="123456"
                                    style={{ paddingLeft: '2.5rem', letterSpacing: '0.5em', textAlign: 'center', fontWeight: 'bold' }}
                                    maxLength={6}
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
                                    Verifying...
                                </>
                            ) : (
                                <>Verify & Login <ArrowRight size={18} /></>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={loading || !canResend}
                            className="btn btn-ghost"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginTop: '0.5rem',
                                fontSize: '0.9rem',
                                color: canResend ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                cursor: canResend ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
                        </button>
                    </form>
                )}

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
