import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="hero-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <h1 className="glow-text" style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                    Explore the Universe <br />
                    <span className="gradient-text">In Real Time</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Space events, missions, cosmic weather & satellite insights — <br />
                    all in one interactive platform.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                        onClick={() => navigate('/events')}
                    >
                        Explore Events
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        View Live Dashboard
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ position: 'absolute', bottom: '2rem' }}
            >
                <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--accent-blue), transparent)' }} />
            </motion.div>
        </section>
    );
}
