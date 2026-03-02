import React from 'react';

interface HighlightProps {
    text: string;
    query: string;
}

export const Highlight: React.FC<HighlightProps> = ({ text, query }) => {
    if (!query.trim()) return <>{text}</>;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <mark key={i} style={{ background: 'var(--accent-cyan)', color: '#050816', borderRadius: '2px', padding: '0 2px' }}>
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};
