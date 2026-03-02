import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Clock, Check } from 'lucide-react';
import { useSpace } from '../../context/SpaceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { theme, toggleTheme, searchQuery, setSearchQuery, notifications, markAsRead, clearAllNotifications } = useSpace();
    const location = useLocation();
    const [utcTime, setUtcTime] = useState(new Date().toUTCString());
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const timer = setInterval(() => {
            setUtcTime(new Date().toUTCString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            padding: '0.8rem 2rem',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-panel)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                        SPACE<span style={{ color: 'var(--accent-cyan)' }}>SCOPE</span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <NavLink to="/events" current={location.pathname === '/events'}>Events</NavLink>
                    <NavLink to="/weather" current={location.pathname === '/weather'}>Weather</NavLink>
                    <NavLink to="/missions" current={location.pathname === '/missions'}>Missions</NavLink>
                    <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>Dashboard</NavLink>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', width: '250px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search intel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px 8px 34px',
                            borderRadius: '8px',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            fontSize: '0.85rem',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* UTC Clock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    <Clock size={14} />
                    <span>{utcTime.split(' ').slice(4, 5)} UTC</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', position: 'relative' }}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span style={{ position: 'absolute', top: '-5px', right: '-5px', width: '16px', height: '16px', background: 'var(--accent-purple)', borderRadius: '50%', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                    position: 'absolute', top: '40px', right: 0, width: '320px',
                                    background: 'var(--bg-deep)', border: '1px solid var(--glass-border)',
                                    borderRadius: '12px', padding: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Intelligence Alerts</span>
                                    <button onClick={clearAllNotifications} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', cursor: 'pointer' }}>Clear All</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.length === 0 ? (
                                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No active alerts.</p>
                                    ) : (
                                        notifications.map(n => (
                                            <div key={n.id} style={{ padding: '0.8rem', borderRadius: '8px', background: n.read ? 'transparent' : 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', position: 'relative' }}>
                                                <h4 style={{ fontSize: '0.85rem', marginBottom: '0.2rem', color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{n.title}</h4>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{n.message}</p>
                                                {!n.read && (
                                                    <button onClick={() => markAsRead(n.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, children, current }: { to: string, children: React.ReactNode, current: boolean }) {
    return (
        <Link
            to={to}
            style={{
                color: current ? 'var(--accent-cyan)' : 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative'
            }}
        >
            {children}
            {current && (
                <motion.div
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', background: 'var(--accent-cyan)' }}
                />
            )}
        </Link>
    );
}
