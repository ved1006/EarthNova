import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    timestamp: number;
}

interface SpaceContextType {
    theme: Theme;
    toggleTheme: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    notifications: Notification[];
    addNotification: (title: string, message: string) => void;
    markAsRead: (id: string) => void;
    clearAllNotifications: () => void;
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>(() => {
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [
            { id: '1', title: 'Solar Storm Alert', message: 'Heightened solar activity detected. G3 parameters active.', read: false, timestamp: Date.now() },
            { id: '2', title: 'Upcoming Mission', message: 'Artemis III pre-launch sequence starting soon.', read: false, timestamp: Date.now() - 3600000 }
        ];
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const addNotification = (title: string, message: string) => {
        const newNotif = { id: Date.now().toString(), title, message, read: false, timestamp: Date.now() };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAllNotifications = () => setNotifications([]);

    return (
        <SpaceContext.Provider value={{
            theme, toggleTheme, searchQuery, setSearchQuery,
            notifications, addNotification, markAsRead, clearAllNotifications
        }}>
            {children}
        </SpaceContext.Provider>
    );
};

export const useSpace = () => {
    const context = useContext(SpaceContext);
    if (!context) throw new Error('useSpace must be used within a SpaceProvider');
    return context;
};
