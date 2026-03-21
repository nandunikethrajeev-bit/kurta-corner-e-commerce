import { Link } from "react-router-dom";

const PromoBanner = () => (
  <section className="container py-8">
    <div className="bg-primary rounded-lg p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 animate-reveal-up">
      <div>
        <p className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-widest mb-2">Limited Time</p>
        <h2 className="text-2xl md:text-3xl font-display text-primary-foreground font-bold mb-2">Festive Season Sale — Up to 40% Off</h2>
        <p className="text-primary-foreground/70 text-sm">Use code <span className="font-bold text-primary-foreground">FESTIVE40</span> at checkout</p>
      </div>
      <Link
        to="/products"
        className="shrink-0 px-8 py-3 bg-primary-foreground text-foreground font-semibold text-sm rounded-sm hover:bg-primary-foreground/90 transition-colors active:scale-[0.97]"
      >
        Shop the Sale
      </Link>
    </div>
  </section>
);

export default PromoBanner;
