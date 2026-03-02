import { motion } from 'framer-motion';
import { Sparkles, Radio, Sunrise, Orbit } from 'lucide-react';

const events = [
    {
        title: 'Geminid Meteor Shower',
        date: 'Dec 13-14',
        icon: Sparkles,
        color: 'var(--accent-blue)',
        description: 'One of the best and most reliable annual meteor showers.'
    },
    {
        title: 'ISS Pass Visibility',
        date: 'Tonight 8:42 PM',
        icon: Radio,
        color: 'var(--accent-cyan)',
        description: 'The International Space Station will be visible for 4 minutes.'
    },
    {
        title: 'Geomagnetic Aurora',
        date: 'Active Now',
        icon: Sunrise,
        color: 'var(--accent-purple)',
        description: 'High solar activity increasing aurora visibility in northern latitudes.'
    },
    {
        title: 'Planetary Alignment',
        date: 'Mar 28',
        icon: Orbit,
        color: '#ff00ff',
        description: 'Mars, Venus and Jupiter will align in the morning sky.'
    }
];

export default function SkyEvents() {
    return (
        <section>
            <h2 className="glow-text" style={{ marginBottom: '3rem', textAlign: 'center' }}>Sky Events Dashboard</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.03,
                            borderColor: event.color,
                            boxShadow: `0 0 30px ${event.color}44`
                        }}
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: `${event.color}22`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: event.color,
                            marginBottom: '0.5rem'
                        }}>
                            <event.icon size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.2rem' }}>{event.title}</h3>
                        <p style={{ color: event.color, fontWeight: 'bold', fontSize: '0.9rem' }}>{event.date}</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{event.description}</p>

                        <div style={{
                            marginTop: 'auto',
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--glass-border)',
                            fontSize: '0.8rem',
                            color: 'var(--accent-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span>Click to Expand Details</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
