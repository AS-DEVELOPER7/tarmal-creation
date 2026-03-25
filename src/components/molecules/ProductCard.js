// src/components/molecules/ProductCard.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "src/services/reducers/cartReducer";
import { RiShoppingBagLine } from "react-icons/ri";
import { useToast } from "../ui/ToastProvider";
import { CURRENCY } from "src/constants";
import ImageWithFallback from "./ImageWithFallback";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { show } = useToast();

  if (!product) return null;

  const { id, title: name, price, sold_out: soldOut, images, sizes, variants } = product;
  const image = images?.[0] || product.image;

  const handleAdd = (e) => {
    e.preventDefault();
    if (soldOut) return;

    // Use default variations (first color/size)
    const defaultColor = variants?.[0]?.color || null;
    const defaultSize = sizes?.[0] || null;

    dispatch(
      addToCart({
        id,
        name,
        color: defaultColor,
        size: defaultSize,
        image: image,
        price,
        soldOut,
        qty: 1,
      })
    );

    show({
      type: "success",
      title: "Added to cart",
      description: `${name}${defaultColor ? ` - ${defaultColor}` : ""}${defaultSize ? ` (${defaultSize})` : ""}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group w-full flex flex-col"
    >
      {/* Image Container */}
      <Link
        href={`/product/${id}`}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-base mb-4 block"
      >
        <ImageWithFallback
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${soldOut ? "opacity-60 grayscale" : ""
            }`}
        />
        {soldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-display tracking-widest uppercase text-xs text-white font-semibold backdrop-blur-sm">
            Sold Out
          </div>
        )}

        {/* Hover overlay + Add to cart button */}
        {!soldOut && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 px-4">
            <button
              onClick={handleAdd}
              className="w-full bg-white/95 backdrop-blur-sm text-base font-semibold py-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
            >
              <RiShoppingBagLine className="text-lg" /> Quick Add
            </button>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col text-center px-2">
        <Link href={`/product/${id}`}>
          <h3 className="font-serif text-lg leading-tight mb-2 hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-muted font-display font-medium">
          {price?.toFixed(2)} {CURRENCY}
        </p>
      </div>
    </motion.div>
  );
}
