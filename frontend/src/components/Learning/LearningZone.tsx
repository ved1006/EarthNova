import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';

const quizQuestions = [
    {
        id: 1,
        question: "What is the primary component of Saturn's rings?",
        options: ["Rock", "Water Ice", "Gaseous Nitrogen", "Liquid Hydrogen"],
        correct: 1
    },
    {
        id: 2,
        question: "Which mission was the first to land a human on the Moon?",
        options: ["Gemini 4", "Apollo 11", "Vostok 1", "Artemis I"],
        correct: 1
    },
    {
        id: 3,
        question: "What is the name of the largest volcano in our solar system?",
        options: ["Mount Everest", "Mauna Kea", "Olympus Mons", "Etna"],
        correct: 2
    },
    {
        id: 4,
        question: "How long does light take to travel from the Sun to Earth?",
        options: ["8 seconds", "8 minutes", "1 hour", "24 hours"],
        correct: 1
    },
    {
        id: 5,
        question: "What is the most common type of star found in our galaxy?",
        options: ["Blue Giant", "Red Dwarf", "Yellow Dwarf", "Neutron Star"],
        correct: 1
    }
];

export default function LearningZone() {
    const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('quizHighScore')) || 0);

    const handleOptionSelect = (index: number) => {
        if (isLocked) return;
        setSelectedOption(index);
        setIsLocked(true);

        const isCorrect = index === quizQuestions[currentQuestion].correct;
        if (isCorrect) setScore(prev => prev + 1);

        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
                setIsLocked(false);
            } else {
                setCurrentStep('results');
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setIsLocked(false);
        setCurrentStep('intro');
    };

    useEffect(() => {
        if (currentStep === 'results' && score > highScore) {
            setHighScore(score);
            localStorage.setItem('quizHighScore', score.toString());
        }
    }, [currentStep, score, highScore]);

    return (
        <section id="learning" style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    {currentStep === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <BookOpen size={64} color="var(--accent-cyan)" style={{ marginBottom: '1.5rem' }} />
                            <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Learning Hub Quiz</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Test your interstellar knowledge and climb the intelligence rankings.</p>
                            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HIGH SCORE</p>
                                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{highScore}/{quizQuestions.length}</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--accent-cyan)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentStep('quiz')}
                                style={{
                                    padding: '1rem 2.5rem', background: 'var(--accent-cyan)', border: 'none',
                                    borderRadius: '50px', color: '#050816', fontWeight: 'bold', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto'
                                }}
                            >
                                START INITIALIZATION <ChevronRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}

                    {currentStep === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            style={{ width: '100%' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>QUESTION {currentQuestion + 1} OF {quizQuestions.length}</span>
                                <div style={{ height: '6px', width: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                        style={{ height: '100%', background: 'var(--accent-cyan)' }}
                                    />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.4' }}>{quizQuestions[currentQuestion].question}</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                {quizQuestions[currentQuestion].options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    const isCorrect = quizQuestions[currentQuestion].correct === index;

                                    let borderColor = 'var(--glass-border)';
                                    let background = 'rgba(255,255,255,0.02)';

                                    if (isLocked) {
                                        if (isCorrect) {
                                            borderColor = '#00f2fe';
                                            background = 'rgba(0, 242, 254, 0.1)';
                                        } else if (isSelected) {
                                            borderColor = '#ff4444';
                                            background = 'rgba(255, 68, 68, 0.1)';
                                        }
                                    } else if (isSelected) {
                                        borderColor = 'var(--accent-cyan)';
                                        background = 'rgba(0, 242, 254, 0.05)';
                                    }

                                    return (
                                        <motion.button
                                            key={index}
                                            disabled={isLocked}
                                            onClick={() => handleOptionSelect(index)}
                                            whileHover={!isLocked ? { x: 10, background: 'rgba(255,255,255,0.05)' } : {}}
                                            style={{
                                                padding: '1.2rem 2rem', border: `1px solid ${borderColor}`, background,
                                                borderRadius: '12px', color: 'var(--text-primary)', textAlign: 'left',
                                                fontSize: '1rem', cursor: isLocked ? 'default' : 'pointer',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                            }}
                                        >
                                            {option}
                                            {isLocked && isCorrect && <CheckCircle2 size={20} color="#00f2fe" />}
                                            {isLocked && isSelected && !isCorrect && <XCircle size={20} color="#ff4444" />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Trophy size={64} color="var(--accent-purple)" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Assignment Complete</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Space intelligence level assessed at {Math.round((score / quizQuestions.length) * 100)}%.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>YOUR SCORE</p>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{score}</p>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HIGH SCORE</p>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{highScore}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={restartQuiz}
                                    style={{
                                        padding: '1rem 2rem', background: 'transparent', border: '1px solid var(--accent-cyan)',
                                        borderRadius: '50px', color: 'var(--accent-cyan)', fontWeight: 'bold', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <RotateCcw size={18} /> RESTART SESSION
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export function FinalCTA() {
    return (
        <section style={{ padding: '10rem 2rem', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="glow-text gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>The Universe is Waiting.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Join the global network of space explorers and stay ahead of every cosmic event.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-cyan)' }}
                    style={{
                        padding: '1.2rem 3rem', background: 'var(--accent-cyan)',
                        border: 'none', borderRadius: '50px', color: '#050816',
                        fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'
                    }}
                >
                    Initialize Personal Dashboard
                </motion.button>
            </motion.div>
        </section>
    );
}
