import { motion } from 'framer-motion';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    BarChart, Bar
} from 'recharts';

const missionData = [
    { name: 'Past', value: 45 },
    { name: 'Active', value: 25 },
    { name: 'Upcoming', value: 30 },
];

const solarTrends = [
    { time: '00:00', intensity: 2 },
    { time: '04:00', intensity: 3 },
    { time: '08:00', intensity: 5 },
    { time: '12:00', intensity: 7 },
    { time: '16:00', intensity: 6 },
    { time: '20:00', intensity: 4 },
    { time: '00:00', intensity: 3 },
];

const regionalEvents = [
    { region: 'N. America', count: 12 },
    { region: 'Europe', count: 8 },
    { region: 'Asia', count: 15 },
    { region: 'Pacific', count: 5 },
    { region: 'Global', count: 20 },
];

const COLORS = ['#00f2fe', '#00d2ff', '#9d50bb', '#ff00ff'];

export default function DashboardPage() {
    return (
        <section>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="glow-text gradient-text">Intelligence Analytics</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Deep data visualization of cosmic and mission metrics.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Mission Status Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '2rem', height: '400px' }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Mission Status Distribution</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                data={missionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {missionData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ background: 'var(--bg-deep)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Solar Index Trends */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel"
                    style={{ padding: '2rem', height: '400px' }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Solar Activity Trends (24h)</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart data={solarTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
                            <YAxis stroke="var(--text-secondary)" fontSize={12} />
                            <Tooltip
                                contentStyle={{ background: 'var(--bg-deep)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                            />
                            <Line type="monotone" dataKey="intensity" stroke="var(--accent-cyan)" strokeWidth={3} dot={{ fill: 'var(--accent-cyan)' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Regional Event Frequency */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel"
                    style={{ padding: '2rem', height: '400px' }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Event Frequency by Region</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={regionalEvents}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="region" stroke="var(--text-secondary)" fontSize={12} />
                            <YAxis stroke="var(--text-secondary)" fontSize={12} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ background: 'var(--bg-deep)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                            />
                            <Bar dataKey="count" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Intelligence Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel"
                    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <h3 style={{ fontSize: '1rem' }}>Intelligence Overview</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            { label: 'Total Events', val: '124' },
                            { label: 'Active Missions', val: '52' },
                            { label: 'Global Alerts', val: '3' },
                            { label: 'Data Nodes', val: '802' }
                        ].map((stat, i) => (stat &&
                            <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{stat.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.val}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 'auto', padding: '1rem', background: 'linear-gradient(90deg, var(--accent-blue)22, transparent)', borderRadius: '8px', borderLeft: '3px solid var(--accent-blue)' }}>
                        <p style={{ fontSize: '0.85rem' }}>All systems nominal. Neural data sync verified at 100% integrity.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
