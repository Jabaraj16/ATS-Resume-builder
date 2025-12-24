import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordAPI, resetPasswordAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { KeyRound, Mail, Lock, ArrowRight, Loader, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [step, setStep] = useState('email'); // 'email' | 'reset'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Timer State
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const navigate = useNavigate();

    // Timer Effect
    React.useEffect(() => {
        let interval;
        if (step === 'reset' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await forgotPasswordAPI({ email });
            if (res.status === 200 && res.data.success) {
                toast.success('OTP sent to your email');
                setStep('reset');
                setTimer(30);
                setCanResend(false);
            } else {
                toast.error(res.response?.data?.message || 'Failed to send OTP');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    const handleResendOTP = async () => {
        setLoading(true);
        try {
            const res = await forgotPasswordAPI({ email });
            if (res.status === 200 && res.data.success) {
                toast.success('OTP Resent!');
                setTimer(30);
                setCanResend(false);
            } else {
                toast.error(res.response?.data?.message || 'Failed to resend OTP');
            }
        } catch (error) {
            toast.error('Failed to resend');
        }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await resetPasswordAPI({ email, otp, newPassword });
            if (res.status === 200 && res.data.success) {
                toast.success('Password reset successful! Please login.');
                navigate('/login');
            } else {
                toast.error(res.response?.data?.message || 'Failed to reset password');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    return (
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: 'var(--wrapper-bg)' }}></div>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{ padding: '2rem', width: '100%', maxWidth: '420px', borderRadius: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(var(--primary-hue), var(--primary-sat), 50%, 0.1)', borderRadius: '50%', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                        <KeyRound size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                        {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {step === 'email' ? 'Enter your email to verify it\'s you' : 'Enter OTP and create a new password'}
                    </p>
                </div>

                {step === 'email' ? (
                    <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                                <>Verify Email <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label className="label">Enter OTP</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^\d*$/.test(val)) setOtp(val);
                                    }}
                                    required
                                    className="input"
                                    placeholder="123456"
                                    style={{ paddingLeft: '2.5rem', letterSpacing: '0.5em', textAlign: 'center', fontWeight: 'bold' }}
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">New Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="input"
                                    placeholder="Min 6 characters"
                                    style={{ paddingLeft: '2.5rem' }}
                                    minLength={6}
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
                                    Resetting...
                                </>
                            ) : (
                                <>Set New Password <ArrowRight size={18} /></>
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
                    <Link to="/login" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={14} /> Back to Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
