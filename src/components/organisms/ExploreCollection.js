"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCategory } from "src/services/reducers/generalReducer";
import { CATEGORY_LIST } from "src/constants/categories";
import { motion } from "framer-motion";

export default function ExploreCollection() {
  const dispatch = useDispatch();
  
  return (
    <section className="py-20 bg-surface-base/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-display uppercase tracking-widest text-sm font-semibold">Curated for you</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium mt-4">Explore Collections</h2>
          </div>
          <Link href="/shop" className="text-primary font-medium hover:underline underline-offset-4 decoration-primary/30">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_LIST.map((c, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={c.name}
            >
              <Link
                href="/shop"
                onClick={() => dispatch(setCategory(c.name))}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${c.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-2xl sm:text-3xl font-serif font-medium mb-2">
                    {c.name}
                  </h3>
                  <span className="text-white/80 font-display text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-wider">
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
