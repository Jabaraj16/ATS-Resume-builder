import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Zap, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: 'var(--wrapper-bg)' }}></div>
      <motion.div style={{
        position: 'absolute', top: '-10%', right: '-10%', width: '40vmax', height: '40vmax',
        background: 'radial-gradient(circle, rgba(var(--primary-hue), var(--primary-sat), 70%, 0.2) 0%, transparent 70%)',
        borderRadius: '50%', y: y1
      }} />
      <motion.div style={{
        position: 'absolute', bottom: '10%', left: '-10%', width: '30vmax', height: '30vmax',
        background: 'radial-gradient(circle, rgba(330, 80%, 55%, 0.15) 0%, transparent 70%)',
        borderRadius: '50%', y: y2
      }} />

      <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{
            display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px',
            background: 'rgba(var(--primary-hue), var(--primary-sat), 50%, 0.1)',
            color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem'
          }}>
            ✨ The Ultimate AI Resume Builder
          </div>
          <h1 style={{ marginBottom: '1.5rem', lineHeight: 1.1, background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Craft Your Perfect <br /> Career Story
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Build professional, ATS-friendly resumes in minutes with our advanced builder.
            Smart parsing, premium templates, and instant PDF export.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '5rem', flexWrap: 'wrap' }}>
            <Link to="/templates" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', textDecoration: 'none' }}>
              <Zap size={20} /> Build Resume Now
            </Link>
            <Link to="/ats-check" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)', textDecoration: 'none' }}>
              <CheckCircle size={20} /> Check ATS Score
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          <FeatureCard
            icon={<Zap color="var(--color-primary)" size={32} />}
            title="Smart Parsing"
            desc="Upload your existing PDF and let our AI extract your details instantly."
            delay={0.2}
          />
          <FeatureCard
            icon={<FileText color="var(--color-accent)" size={32} />}
            title="Premium Templates"
            desc="Choose from a collection of modern, professional, and creative designs."
            delay={0.4}
          />
          <Link to="/ats-check" style={{ textDecoration: 'none' }}>
            <FeatureCard
              icon={<CheckCircle color="#3b82f6" size={32} />}
              title="ATS Score Checker"
              desc="Upload your current resume and get an instant compatibility score."
              delay={0.6}
            />
          </Link>
          <FeatureCard
            icon={<Download color="#10b981" size={32} />}
            title="Instant Export"
            desc="Download high-quality A4 PDFs ready for job applications."
            delay={0.6}
          />
        </div>
      </div >
    </div >
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-panel"
    style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}
  >
    <div style={{ marginBottom: '1rem' }}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{title}</h3>
    <p style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
  </motion.div>
);

export default Home;
