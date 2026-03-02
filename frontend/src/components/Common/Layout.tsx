import { type ReactNode } from 'react';
import Background from '../Background/Background';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="app-container">
            <Background />
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 200px)' }}>
                {children}
            </main>

            <footer style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid var(--glass-border)',
                marginTop: '4rem',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                position: 'relative',
                zIndex: 10
            }}>
                <p>&copy; 2026 SpaceScope Intelligence Platform. Advanced Global Data Integration Active.</p>
            </footer>
        </div>
    );
}
