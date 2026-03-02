import { motion } from 'framer-motion';
import { Zap, ShieldAlert } from 'lucide-react';

export default function Weather() {
    return (
        <section>
            <h2 className="glow-text" style={{ marginBottom: '3rem', textAlign: 'center' }}>Real-Time Cosmic Weather</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div className="glass-panel" style={{ padding: '2.5rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                        <Zap color="var(--accent-cyan)" /> Solar Storm Index
                    </h3>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>K-Index Intensity</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>G3 (Strong)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '75%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Proton Flux</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12.4 pf</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>X-Ray Flux</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>C 4.1</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                            <motion.circle
                                cx="50" cy="50" r="45" fill="none"
                                stroke="var(--accent-purple)" strokeWidth="6"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                whileInView={{ strokeDashoffset: 283 * 0.4 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldAlert size={32} color="var(--accent-purple)" />
                            <span style={{ fontSize: '2rem', fontWeight: '800' }}>42%</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>RADIATION LOAD</span>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Current radiation levels are within safe parameters for low-earth orbit operations.
                    </p>
                </div>
            </div>
        </section>
    );
}
