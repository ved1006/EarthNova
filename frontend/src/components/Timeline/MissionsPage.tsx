import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Filter, ArrowUpDown, ChevronRight, ChevronDown } from 'lucide-react';
import api from '../../api/api';
import { useSpace } from '../../context/SpaceContext';
import { CardSkeleton } from '../Common/Skeletons';
import { Highlight } from '../Common/Highlight';

interface Mission {
    id: string;
    name: string;
    description: string;
    status: 'Past' | 'Active' | 'Upcoming';
    launch_date: string;
}

export default function MissionsPage() {
    const { searchQuery } = useSpace();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedMission, setExpandedMission] = useState<string | null>(null);

    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get('/missions');
                setMissions(response.data);
            } catch (err) {
                console.error('Mission sync failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMissions();
    }, []);

    const filteredMissions = missions
        .filter(m =>
            (statusFilter === 'All' || m.status === statusFilter) &&
            (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = new Date(a.launch_date).getTime();
            const dateB = new Date(b.launch_date).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    return (
        <section>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="glow-text gradient-text">Mission Logistics</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Global space exploration timeline and active operations.</p>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <Filter size={16} /> Status:
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['All', 'Active', 'Upcoming', 'Past'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                style={{
                                    background: statusFilter === status ? 'var(--accent-blue)' : 'var(--bg-panel)',
                                    border: '1px solid var(--glass-border)',
                                    color: statusFilter === status ? 'white' : 'var(--text-primary)',
                                    padding: '6px 14px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        style={{
                            background: 'var(--bg-panel)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        <ArrowUpDown size={14} />
                        Launch: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i}><CardSkeleton /></div>)
                ) : filteredMissions.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No records found in the mission archive.
                    </div>
                ) : (
                    filteredMissions.map((mission) => (
                        <motion.div
                            key={mission.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                cursor: 'pointer',
                                borderLeft: `4px solid ${mission.status === 'Active' ? '#00f2fe' :
                                    mission.status === 'Upcoming' ? '#9d50bb' : '#a0a0c0'
                                    }`
                            }}
                            onClick={() => setExpandedMission(expandedMission === mission.id ? null : mission.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.05)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Rocket size={20} color="var(--accent-cyan)" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem' }}><Highlight text={mission.name} query={searchQuery} /></h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.2rem' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {new Date(mission.launch_date).toLocaleDateString()}
                                            </span>
                                            <span style={{
                                                fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px',
                                                background: mission.status === 'Active' ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255,255,255,0.05)',
                                                color: mission.status === 'Active' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                                border: mission.status === 'Active' ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)'
                                            }}>{mission.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {expandedMission === mission.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedMission === mission.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                                <Highlight text={mission.description} query={searchQuery} />
                                            </p>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                                <button style={{ padding: '8px 16px', background: 'var(--accent-blue)', border: 'none', borderRadius: '6px', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>View Telemetry</button>
                                                <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.85rem', cursor: 'pointer' }}>Mission Manifest</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}
