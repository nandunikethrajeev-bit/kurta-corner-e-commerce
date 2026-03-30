import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const NewCollectionBanner = () => (
  <section className="container py-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Link
        to="/products"
        className="block relative overflow-hidden rounded-3xl p-8 md:p-14 glass-card glow-border group"
      >
        {/* Animated shimmer */}
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">New Collection</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Spring/Summer 2026
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Lightweight fabrics meet timeless silhouettes. The new collection is here — limited pieces, infinite style.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-sm rounded-full glow-button group-hover:scale-105 transition-all duration-300">
            Explore Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  </section>
);

export default NewCollectionBanner;
