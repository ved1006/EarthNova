import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Earth() {
    const earthRef = useRef<THREE.Mesh>(null!);

    useFrame((_state, delta) => {
        earthRef.current.rotation.y += delta / 5;
    });

    return (
        <group>
            <Sphere ref={earthRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#0a1a3a"
                    emissive="#004488"
                    emissiveIntensity={0.5}
                    roughness={0.7}
                    metalness={0.3}
                    wireframe
                />
            </Sphere>

            {/* Orbiting Satellites represented by points */}
            {[...Array(12)].map((_, i) => (
                <SatelliteIcon key={i} index={i} />
            ))}
        </group>
    );
}

function SatelliteIcon({ index }: { index: number }) {
    const ref = useRef<THREE.Group>(null!);
    const orbitRadius = 1.3 + Math.random() * 0.4;
    const speed = 0.5 + Math.random() * 0.5;
    const offset = index * (Math.PI / 6);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + offset;
        ref.current.position.set(
            Math.cos(t) * orbitRadius,
            Math.sin(t * 0.5) * 0.8,
            Math.sin(t) * orbitRadius
        );
    });

    return (
        <group ref={ref}>
            <mesh>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#00f2fe" />
            </mesh>
            <pointLight color="#00f2fe" intensity={0.5} distance={0.5} />
        </group>
    );
}

const satelliteinfo = [
    { title: 'Agriculture Monitoring', desc: 'Precision crop analysis using spectral imaging.' },
    { title: 'Climate Analysis', desc: 'Tracking global temperature and ice cap melt rates.' },
    { title: 'Disaster Prediction', desc: 'Real-time early warning for floods and wildfires.' }
];

export default function SatelliteSection() {
    return (
        <section>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ height: '500px', cursor: 'grab' }}>
                    <Canvas camera={{ position: [0, 0, 3] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Earth />
                    </Canvas>
                </div>

                <div>
                    <h2 className="glow-text" style={{ marginBottom: '2rem' }}>Earth Impact Intelligence</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                        Satellite constellations provide crucial data that helps us understand and protect our home planet.
                        From environmental monitoring to life-saving disaster response.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {satelliteinfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-panel"
                                style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}
                            >
                                <div style={{ width: '8px', height: '40px', background: 'var(--accent-cyan)', borderRadius: '4px' }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{info.title}</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{info.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
