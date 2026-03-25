"use client";
import Image from "next/image";
import {
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";

import ImageWithFallback from "./ImageWithFallback";
import { CURRENCY } from "src/constants";

export default function CartRow({ item, onInc, onDec, onRemove }) {
  const subTotal = (Number(item.price) * Number(item.qty)).toFixed(2);
  const unitPrice = Number(item.price).toFixed(2);
  const primaryImage =
    (Array.isArray(item.images) && item.images[0]) ||
    item.image;

  return (
    <div className="flex items-center justify-between gap-4 sm:gap-6  border-b border-border pb-4">
      {/* Image */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface">
          <ImageWithFallback
            src={primaryImage}
            alt={item.name}
            fill
            className="object-contain! bg-surface-base"
            sizes="96px"
          />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="font-medium text-base truncate">{item.name}</p>
          {(item.color || item.size) && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1">
              {item.color && (
                <p className="text-xs text-muted font-medium">
                  Color: <span className="text-base-content">{item.color}</span>
                </p>
              )}
              {item.size && (
                <p className="text-xs text-muted font-medium">
                  Size: <span className="text-base-content">{item.size}</span>
                </p>
              )}
            </div>
          )}
          {item.category && (
            <p className="text-muted text-sm">{item.category}</p>
          )}

          <div className="mt-2 flex items-center gap-3">
            {/* Qty controls */}
            <div className="inline-flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={onDec}
                className="h-9 w-9 grid place-items-center hover:bg-surface-base"
                aria-label="Decrease"
              >
                <RiSubtractLine />
              </button>
              <span className="px-3 text-sm font-semibold select-none">
                {item.qty}
              </span>
              <button
                onClick={onInc}
                className="h-9 w-9 grid place-items-center hover:bg-surface-base"
                aria-label="Increase"
              >
                <RiAddLine />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary hover:bg-surface-base p-2 rounded-lg"
            >
              <RiDeleteBin6Line className="text-base" />
              Remove
            </button>
          </div>
        </div>
      </div>
      {/* Line total */}
      <div className="text-right">
        <p className="font-semibold text-base">
          {subTotal} {CURRENCY}
        </p>
        <p className="text-xs text-muted">
          Unit: {unitPrice} {CURRENCY}
        </p>
        {item.soldOut && (
          <span className="mt-1 inline-block text-xs bg-secondary text-white rounded-md p-2">
            SOLD OUT
          </span>
        )}
      </div>
    </div>
  );
}
