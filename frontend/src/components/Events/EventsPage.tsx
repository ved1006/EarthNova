import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Filter, ArrowUpDown } from 'lucide-react';
import api from '../../api/api';
import { useSpace } from '../../context/SpaceContext';
import { CardSkeleton } from '../Common/Skeletons';
import { Highlight } from '../Common/Highlight';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    visibility: string;
}

export default function EventsPage() {
    const { searchQuery } = useSpace();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [regionFilter, setRegionFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events from intelligence grid.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events
        .filter(event =>
            (regionFilter === 'All' || event.visibility.includes(regionFilter)) &&
            (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    if (error) return (
        <section style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: '#ff4444' }}>
                <h3 style={{ color: '#ff4444' }}>Terminal Error</h3>
                <p>{error}</p>
            </div>
        </section>
    );

    return (
        <section>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glow-text gradient-text"
                >
                    Cosmic Event Registry
                </motion.h1>
                <p style={{ color: 'var(--text-secondary)' }}>Live tracking of astronomical phenomena.</p>
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
                        <Filter size={16} /> Filter:
                    </div>
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        style={{
                            background: 'var(--bg-panel)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            outline: 'none'
                        }}
                    >
                        <option value="All">All Regions</option>
                        <option value="Global">Global</option>
                        <option value="Northern">Northern Hemisphere</option>
                        <option value="Northeast">Northeast</option>
                    </select>
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
                        Date: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                    </button>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Results: <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{filteredEvents.length}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
                    ) : filteredEvents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}
                        >
                            <p>No cosmic intel matches your current filter matrix.</p>
                        </motion.div>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 210, 255, 0.3)' }}
                                className="glass-panel"
                                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Sparkles color="var(--accent-cyan)" size={24} />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 'bold' }}>CERTIFIED</span>
                                </div>
                                <h3><Highlight text={event.title} query={searchQuery} /></h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>
                                    <Highlight text={event.description} query={searchQuery} />
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                        <Calendar size={14} color="var(--accent-cyan)" />
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                        <MapPin size={14} color="var(--accent-cyan)" />
                                        <span>{event.visibility}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ background: 'var(--accent-blue)', color: 'white' }}
                                    style={{
                                        marginTop: '1rem', background: 'transparent',
                                        border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)',
                                        padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem'
                                    }}
                                >
                                    View Detailed Map
                                </motion.button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
