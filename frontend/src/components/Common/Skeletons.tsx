import { motion } from 'framer-motion';

export const CardSkeleton = () => (
    <div className="glass-panel" style={{ padding: '2rem', height: '250px', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}
        />
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            style={{ width: '70%', height: '24px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}
        />
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            style={{ width: '100%', height: '80px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}
        />
    </div>
);

export const ChartSkeleton = () => (
    <div className="glass-panel" style={{ padding: '2.5rem', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '150px', height: '150px', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.1)' }}
        />
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            style={{ width: '60%', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}
        />
    </div>
);
