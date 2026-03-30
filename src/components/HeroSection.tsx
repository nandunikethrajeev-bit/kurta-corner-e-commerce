import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* Rotating geometric kurta silhouette — abstract 3D centerpiece */
function KurtaModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 1.2, 2.8, 6]} />
          <meshStandardMaterial
            color="#d4a03c"
            metalness={0.6}
            roughness={0.25}
            emissive="#d4a03c"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Collar ring */}
        <mesh position={[0, 1.5, 0]}>
          <torusGeometry args={[0.5, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#f0c060"
            metalness={0.8}
            roughness={0.2}
            emissive="#f0c060"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Left sleeve */}
        <mesh position={[-1.1, 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.25, 0.35, 1.2, 6]} />
          <meshStandardMaterial color="#c49030" metalness={0.5} roughness={0.3} emissive="#c49030" emissiveIntensity={0.1} />
        </mesh>
        {/* Right sleeve */}
        <mesh position={[1.1, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.25, 0.35, 1.2, 6]} />
          <meshStandardMaterial color="#c49030" metalness={0.5} roughness={0.3} emissive="#c49030" emissiveIntensity={0.1} />
        </mesh>
        {/* Decorative orbs */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, -0.5 + i * 0.5, 0.85]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#f0c060" emissive="#f0c060" emissiveIntensity={0.8} metalness={1} roughness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ParticleField() {
  return (
    <>
      <Stars radius={50} depth={60} count={1500} factor={3} saturation={0.3} fade speed={1} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0c060" />
      <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#8080ff" />
      <pointLight position={[0, 2, 3]} intensity={1} color="#d4a03c" distance={10} />
    </>
  );
}

const HeroSection = () => (
  <section className="relative min-h-screen overflow-hidden bg-background">
    {/* 3D Canvas background */}
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ParticleField />
          <KurtaModel />
        </Suspense>
      </Canvas>
    </div>

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />

    {/* Content */}
    <div className="relative container min-h-screen flex items-center">
      <div className="max-w-2xl py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-body font-medium tracking-[0.3em] uppercase text-primary mb-6"
        >
          ✦ Handcrafted in Bengaluru
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.02] mb-6"
        >
          <span className="gradient-text glow-text">Redefine</span>
          <br />
          <span className="text-foreground">Tradition</span>
          <br />
          <span className="text-foreground/60">with Style</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-muted-foreground font-body text-base md:text-lg mb-10 max-w-md leading-relaxed"
        >
          Where centuries-old craftsmanship meets futuristic design. Every stitch tells a story of elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/products"
            className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-bold text-sm rounded-full glow-button hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            Shop Now
          </Link>
          <Link
            to="/products?category=women"
            className="inline-flex items-center px-10 py-4 glass text-foreground font-semibold text-sm rounded-full hover:scale-105 transition-all duration-300 glow-border"
          >
            Women's Collection
          </Link>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
    </motion.div>
  </section>
);

export default HeroSection;
