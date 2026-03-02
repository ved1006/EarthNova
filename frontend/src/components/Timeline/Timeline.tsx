import { useRef } from 'react';
import { motion } from 'framer-motion';

const missions = [
    { year: '1969', title: 'Apollo 11', type: 'Legacy', status: 'Completed', details: 'First human landing on the Moon.' },
    { year: '1977', title: 'Voyager 1', type: 'Legacy', status: 'Traveling', details: 'Farthest man-made object in space.' },
    { year: '1990', title: 'Hubble', type: 'Current', status: 'Operational', details: 'Revolutionizing our view of the cosmos.' },
    { year: '2021', title: 'James Webb', type: 'Current', status: 'Operational', details: 'Deepest infrared views of the universe.' },
    { year: '2024', title: 'Europa Clipper', type: 'Upcoming', status: 'Pre-Launch', details: 'Investigating jupiter\'s icy moon.' },
    { year: '2025', title: 'Artemis III', type: 'Upcoming', status: 'Planned', details: 'Returning humans to the Lunar surface.' }
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section>
            <h2 className="glow-text" style={{ marginBottom: '3rem', textAlign: 'center' }}>Missions Timeline</h2>

            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    overflowX: 'auto',
                    paddingBottom: '2rem',
                    scrollbarWidth: 'none',
                    position: 'relative'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
                    zIndex: -1
                }} />

                {missions.map((mission, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            minWidth: '280px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'rgba(5, 8, 22, 0.8)',
                            border: '2px solid var(--accent-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: index === 3 ? 'var(--glow-blue)' : 'none',
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>{mission.year}</span>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontSize: '1rem', margin: 0 }}>{mission.title}</h4>
                                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>{mission.type}</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{mission.details}</p>
                            <div style={{
                                fontSize: '0.7rem',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                display: 'inline-block'
                            }}>
                                Status: <span style={{ color: 'white' }}>{mission.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
