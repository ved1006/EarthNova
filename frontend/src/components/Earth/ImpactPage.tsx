import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Leaf, Zap, CloudRain, ShieldCheck } from 'lucide-react';
import api from '../../api/api';
import { useSpace } from '../../context/SpaceContext';
import { CardSkeleton } from '../Common/Skeletons';

interface Impact {
    id: string;
    category: string;
    description: string;
    metric_value: string;
}

const iconMap: Record<string, any> = {
    'Climate': CloudRain,
    'Agriculture': Leaf,
    'Disaster Response': ShieldCheck,
    'Energy': Zap,
    'Communication': Globe
};

export default function ImpactPage() {
    const { searchQuery } = useSpace();
    const [impacts, setImpacts] = useState<Impact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImpact = async () => {
            try {
                const response = await api.get('/impact');
                setImpacts(response.data);
            } catch (err) {
                console.error('Impact sync failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchImpact();
    }, []);

    const filteredImpacts = impacts.filter(impact =>
        impact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        impact.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="glow-text gradient-text">Earth Impact Intelligence</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Analyzing terrestrial benefits of orbital technology.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
                    ) : filteredImpacts.length === 0 ? (
                        <div key="empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                            No impact data found for current query.
                        </div>
                    ) : (
                        filteredImpacts.map((impact, index) => {
                            const Icon = iconMap[impact.category] || Globe;
                            return (
                                <motion.div
                                    key={impact.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="glass-panel"
                                    style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                                >
                                    <div style={{
                                        width: '60px', height: '60px', borderRadius: '15px',
                                        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)'
                                    }}>
                                        <Icon size={30} color="white" />
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>{impact.category}</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{impact.description}</p>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Efficiency Metric</p>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{impact.metric_value}</div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
