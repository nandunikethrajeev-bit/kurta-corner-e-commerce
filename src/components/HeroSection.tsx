import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* 3D Model */
function KurtaModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
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

        <mesh
          position={[-1.1, 0.6, 0]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <cylinderGeometry args={[0.25, 0.35, 1.2, 6]} />
          <meshStandardMaterial color="#c49030" />
        </mesh>

        <mesh
          position={[1.1, 0.6, 0]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <cylinderGeometry args={[0.25, 0.35, 1.2, 6]} />
          <meshStandardMaterial color="#c49030" />
        </mesh>
      </group>
    </Float>
  );
}

/* Lights */
function SceneLights() {
  return (
    <>
      <Stars radius={50} depth={60} count={1500} factor={3} fade />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#f0c060"
      />
      <pointLight
        position={[0, 2, 3]}
        intensity={1}
        color="#d4a03c"
      />
    </>
  );
}

/* Hero Section */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <SceneLights />
            <KurtaModel />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />

      {/* Content */}
      <div className="relative container min-h-screen flex items-center">
        <div className="max-w-2xl py-24">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-6"
          >
            ✦ Handcrafted in Bengaluru
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-yellow-400 drop-shadow-lg">
              Redefine
            </span>
            <br />
            <span className="text-white">Tradition</span>
            <br />
            <span className="text-white/70">with Style</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-300 text-base md:text-lg mb-10 max-w-md"
          >
            Where centuries-old craftsmanship meets futuristic
            design. Every stitch tells a story of elegance.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {/* Shop Now */}
            <Link
              to="/products"
              className="relative inline-flex items-center px-10 py-4 rounded-full font-bold text-sm text-black overflow-hidden bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 shadow-[0_0_25px_rgba(255,180,0,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(255,180,0,0.9)] transition-all duration-300"
            >
              <span className="relative z-10">
                Shop Now
              </span>
              <span className="absolute inset-0 bg-white/20 blur-xl animate-pulse"></span>
            </Link>

            {/* Women Collection */}
            <Link
              to="/products?category=women"
              className="relative inline-flex items-center px-10 py-4 rounded-full font-semibold text-sm text-white overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-yellow-400/30 shadow-[0_0_20px_rgba(255,200,0,0.2)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,200,0,0.6)] transition-all duration-300"
            >
              <span className="relative z-10">
                Women's Collection
              </span>
              <span className="absolute inset-0 bg-yellow-400/10 blur-xl animate-pulse"></span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-yellow-400 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;