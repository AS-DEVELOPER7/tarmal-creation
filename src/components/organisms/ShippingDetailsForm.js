"use client";
import Link from "next/link";
import { money } from "src/utils/money";

export default function ShippingDetailsForm({
  invalid,
  addr,
  setAddr,
  errors,
  setShippingCharge,
  shippingCharge,
  goNextFromShipping,
  isFreeShipping,
}) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-black">Shipping Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm text-muted">Full Name</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "name"
            )}`}
            value={addr.name}
            onChange={(e) => setAddr({ ...addr, name: e.target.value })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-muted">Address</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "street"
            )}`}
            value={addr.street}
            onChange={(e) => setAddr({ ...addr, street: e.target.value })}
            placeholder="123 Blossom Lane"
          />
          {errors.street && (
            <p className="text-xs text-rose-600 mt-1">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">City</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "city"
            )}`}
            value={addr.city}
            onChange={(e) => setAddr({ ...addr, city: e.target.value })}
            placeholder="Petalburg"
          />
          {errors.city && (
            <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">State</label>
          <input
            className="w-full rounded-lg px-3 py-2 bg-surface border border-border focus:ring-primary"
            value={addr.state}
            onChange={(e) => setAddr({ ...addr, state: e.target.value })}
            placeholder="Your state"
          />
        </div>

        <div>
          <label className="text-sm text-muted">Zip Code</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "zip"
            )}`}
            value={addr.zip}
            onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
            placeholder="12345"
          />
          {errors.zip && (
            <p className="text-xs text-rose-600 mt-1">{errors.zip}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">Contact Number</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "phone"
            )}`}
            value={addr.phone}
            onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
            placeholder="(123) 456-7890"
          />
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-muted">Email</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "email"
            )}`}
            value={addr.email}
            onChange={(e) => setAddr({ ...addr, email: e.target.value })}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Delivery Preferences */}
      <div className="mt-4 space-y-3">
        <p className="font-semibold">Delivery Preferences</p>

        <button
          onClick={() => setShippingCharge(500)}
          className={[
            "w-full text-left rounded-xl border p-4 transition",
            shippingCharge === 500
              ? "border-primary bg-primary/10"
              : "border-border hover:bg-surface",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border ${shippingCharge === 500
                    ? "bg-primary border-primary"
                    : "border-border"
                  }`}
              />
              <span>Standard Shipping</span>
            </div>
            <span className="font-semibold">{isFreeShipping ? "Free" : money(5)}</span>
          </div>
        </button>

        {/* <button
          onClick={() => setShippingCharge(1500)}
          className={[
            "w-full text-left rounded-xl border p-4 transition",
            shippingCharge === 1500
              ? "border-primary bg-primary/10"
              : "border-border hover:bg-surface",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border ${
                  shippingCharge === 1500
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              />
              <span>Express Shipping</span>
            </div>
            <span className="font-semibold">{isFreeShipping ? "Free" : money(15)}</span>
          </div>
        </button> */}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Link
          href="/cart"
          className="text-sm text-muted hover:text-primary inline-flex items-center gap-2"
        >
          ← Return to cart
        </Link>
        <button
          onClick={goNextFromShipping}
          className="h-11 px-6 rounded-xl text-white font-bold bg-primary hover:opacity-90"
        >
          Continue to Payment
        </button>
      </div>
    </>
  );
}
