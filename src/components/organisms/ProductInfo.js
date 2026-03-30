"use client";

import { useToast } from "../ui/ToastProvider";
import Button from "../atoms/Button";
import QuantitySelector from "../molecules/QuantitySelector";
import { RiShoppingBagLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { motion } from "framer-motion";
import { CURRENCY } from "src/constants";

export default function ProductInfo({
  product,
  selectedVariant,
  onSelectVariant,
  selectedSize,
  onSelectSize,
  qty,
  setQty,
  itemInCart,
  onAdd,
  onRemove,
}) {
  const { show } = useToast();

  const handleAdd = () => {
    onAdd();
    show({
      type: "success",
      title: "Added to cart",
      description: product.title,
    });
  };
  return (
    <div className="flex flex-col py-2 w-full lg:pl-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-serif font-medium leading-tight mb-2 text-base">
          {product.title}
        </h1>
        <div className="text-2xl font-display font-medium text-primary mt-4 mb-6">
          {product.price?.toFixed(2)} {CURRENCY}
        </div>
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {product.materials?.map((m) => (
          <span
            key={m}
            className="text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full bg-surface-base text-muted border border-border"
          >
            {m}
          </span>
        ))}
      </div>
      {/* Description */}
      {product.description && (
        <p className="text-muted text-lg leading-relaxed mb-10 font-light">
          {product.description}
        </p>
      )}

      {/* Styles Selection */}
      {product.variants?.some((v) => v.style) && (
        <div className="mb-8">
          <label className="text-sm font-semibold uppercase tracking-widest text-muted mb-4 block">
            Select Style
          </label>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v, idx) => (
              <button
                key={v.style || idx}
                onClick={() => onSelectVariant({ ...v, selectedStyle: v })}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  selectedVariant?.style === v.style
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border hover:border-primary/50 text-muted bg-transparent"
                }`}
              >
                {v.style}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors Selection (Nested or Direct) */}
      {(() => {
        const colorsToShow =
          selectedVariant?.colors ||
          (!product.variants?.some((v) => v.style) ? product.variants : null);

        if (!colorsToShow?.length) return null;

        return (
          <div className="mb-8">
            <label className="text-sm font-semibold uppercase tracking-widest text-muted mb-4 block">
              Select Color
            </label>
            <div className="flex flex-wrap gap-4">
              {colorsToShow.map((c, idx) => {
                const isArrayColor = Array.isArray(c.color);
                const colorLabel = isArrayColor ? c.color.join(" / ") : c.color;

                const backgroundStyle = isArrayColor
                  ? {
                      background: `conic-gradient(${c.color
                        .map((colorName, i) => {
                          const start = (i * 360) / c.color.length;
                          const end = ((i + 1) * 360) / c.color.length;
                          return `${colorName.toLowerCase()} ${start}deg ${end}deg`;
                        })
                        .join(", ")})`,
                    }
                  : { backgroundColor: (c.color || "").toLowerCase() };

                const isSelected =
                  selectedVariant?.selectedColor?.color === c.color ||
                  (!selectedVariant?.selectedColor &&
                    selectedVariant?.color === c.color);

                return (
                  <button
                    key={colorLabel || idx}
                    onClick={() => {
                      if (selectedVariant?.style) {
                        onSelectVariant({
                          ...selectedVariant,
                          selectedColor: c,
                        });
                      } else {
                        onSelectVariant(c);
                      }
                    }}
                    className={`flex items-center gap-3 p-2 pr-4 rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-surface shadow-sm ring-1 ring-primary/20"
                        : "border-border hover:border-primary/50 bg-transparent"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                      style={backgroundStyle}
                    />
                    {colorLabel && (
                      <span className="text-sm font-medium">{colorLabel}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="mb-8">
          <label className="text-sm font-semibold uppercase tracking-widest text-muted mb-4 block">
            Select Size
          </label>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => onSelectSize(s)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  selectedSize === s
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-border hover:border-primary/50 text-muted bg-transparent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full h-px bg-border my-8" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <div className="w-full sm:w-[140px] shrink-0">
          <label className="text-sm font-semibold uppercase tracking-widest text-muted mb-3 block">
            Quantity
          </label>
          <QuantitySelector
            quantity={qty}
            onIncrement={() => setQty((q) => Math.min(99, q + 1))}
            onDecrement={() => setQty((q) => Math.max(1, q - 1))}
            className="h-14"
          />
        </div>

        <div className="flex-1 flex items-end">
          {product.sold_out ? (
            <Button
              disabled
              className="w-full h-14 bg-surface-base text-muted shadow-none"
            >
              Sold Out
            </Button>
          ) : itemInCart ? (
            <Button
              onClick={onRemove}
              variant="outline"
              className="w-full h-14 gap-2 text-danger hover:text-danger hover:border-danger hover:bg-danger/5"
            >
              <HiOutlineTrash className="text-xl" />
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              variant="primary"
              className="w-full h-14 gap-2 shadow-primary/30 text-lg"
            >
              <RiShoppingBagLine className="text-xl" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
