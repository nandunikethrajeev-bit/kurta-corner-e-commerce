import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const PromoBanner = () => (
  <section className="container py-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass-card rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden glow-border"
    >
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-primary" />
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Limited Time</p>
        </div>
        <h2 className="text-2xl md:text-3xl font-display text-foreground font-bold mb-2">
          Festive Season Sale — Up to 40% Off
        </h2>
        <p className="text-muted-foreground text-sm">
          Use code <span className="font-bold text-primary">FESTIVE40</span> at checkout
        </p>
      </div>
      <Link
        to="/products"
        className="relative shrink-0 px-8 py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-full glow-button hover:scale-105 transition-all duration-300"
      >
        Shop the Sale
      </Link>
    </motion.div>
  </section>
);

export default PromoBanner;
