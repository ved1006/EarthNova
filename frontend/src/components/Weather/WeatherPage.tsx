import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Zap, ShieldAlert, RefreshCcw } from 'lucide-react';
import api from '../../api/api';
import { ChartSkeleton } from '../Common/Skeletons';
import { Highlight } from '../Common/Highlight';
import { useSpace } from '../../context/SpaceContext';

interface WeatherData {
    solar_index: number;
    radiation_level: number;
    aurora_probability: number;
    recorded_at: string;
}

function AnimatedCounter({ value, label }: { value: number, label: string }) {
    const count = useSpring(0, { stiffness: 40, damping: 20 });
    const displayCount = useTransform(count, (latest) => Math.floor(latest));

    useEffect(() => {
        count.set(value);
    }, [value, count]);

    return (
        <div style={{ textAlign: 'center' }}>
            <motion.div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                <motion.span>{displayCount}</motion.span>
                <span style={{ fontSize: '1rem', marginLeft: '2px', color: 'var(--accent-blue)' }}>%</span>
            </motion.div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
        </div>
    );
}

export default function WeatherPage() {
    const { searchQuery } = useSpace();
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        try {
            const response = await api.get('/weather');
            setData(response.data);
            setLastRefresh(new Date().toLocaleTimeString());
        } catch (err) {
            console.error('Weather sync failed:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s auto-refresh
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}><ChartSkeleton /></div>;

    const auroraProb = data?.aurora_probability || 0;
    const radiationLevel = data?.radiation_level || 0;
    const solarIndex = data?.solar_index || 0;

    // Example static alert messages
    const alertTitle = "Automated Space Alert System";
    const alertMessage = "Current radiation levels are within nominal operating parameters for LEO satellites. Aurora visibility enhanced at high latitudes for the next 12 hours.";

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 className="glow-text gradient-text">Cosmic Weather</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Real-time Deep Space Environment Monitoring</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <RefreshCcw size={14} className={refreshing ? 'spin-animation' : ''} />
                        Last Sync: {lastRefresh}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {/* Solar Index Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                    style={{ padding: '2rem' }}
                >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                        <Zap color="var(--accent-cyan)" size={32} />
                        <div>
                            <h3 style={{ fontSize: '1rem' }}>Solar Storm Index</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Proton Flux Intensity</p>
                        </div>
                    </div>

                    <div style={{ position: 'relative', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(solarIndex / 10) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
                                boxShadow: '0 0 10px var(--accent-blue)'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Level: G1</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{solarIndex}/10</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Level: G5</span>
                    </div>
                </motion.div>

                {/* Aurora Probability */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="var(--accent-cyan)"
                                strokeWidth="8"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * auroraProb) / 100 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <AnimatedCounter value={auroraProb} label="Aurora Prob" />
                        </div>
                    </div>
                </motion.div>

                {/* Radiation Gauge */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                    style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="var(--accent-purple)"
                                strokeWidth="8"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * radiationLevel) / 100 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <AnimatedCounter value={radiationLevel} label="Rad Load" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-blue)' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <ShieldAlert size={40} color="var(--accent-blue)" />
                    <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>
                            <Highlight text={alertTitle} query={searchQuery} />
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <Highlight text={alertMessage} query={searchQuery} />
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .spin-animation {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
