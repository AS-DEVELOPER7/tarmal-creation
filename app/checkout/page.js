"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  setAddress,
  setPayment,
  clearCart,
} from "src/services/reducers/cartReducer";
import { useToast } from "src/components/ui/ToastProvider";
import { money } from "src/utils/money";

import Stepper from "src/components/molecules/Stepper";
import CheckoutSummary from "src/components/organisms/CheckoutSummary";
import ShippingDetailsForm from "src/components/organisms/ShippingDetailsForm";
import PaymentOptions from "src/components/organisms/PaymentOptions";
import ReviewOrderDetails from "src/components/organisms/ReviewOrderDetails";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { show } = useToast();

  const items = useSelector((s) => s.cart?.items ?? []);
  const savedAddress = useSelector((s) => s.cart?.address ?? {});
  const savedPayment = useSelector((s) => s.cart?.payment ?? "");

  const [step, setStep] = useState(1);
  const [shippingCharge, setShippingCharge] = useState(500); // 5 INR by default
  const [payMethod, setPayMethod] = useState(savedPayment.method || "whatsapp");

  const [addr, setAddr] = useState({
    name: savedAddress.name || "",
    street: savedAddress.street || "",
    city: savedAddress.city || "",
    state: savedAddress.state || "",
    zip: savedAddress.zip || "",
    email: savedAddress.email || "",
    phone: savedAddress.phone || "",
    country: savedAddress.country || "",
  });
  const [errors, setErrors] = useState({}); // { field: "message" }

  const isCartEmpty = items.length === 0;
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );
  const isFreeShipping = subtotal >= 200;
  const effectiveShipping = isFreeShipping ? 0 : shippingCharge / 100;
  const total = (subtotal + effectiveShipping).toFixed(2);

  /* ---------- validations ---------- */
  const requiredFields = ["name", "street", "city", "zip", "email"];
  const validateShipping = () => {
    const next = {};
    for (const f of requiredFields) {
      if (!String(addr[f] || "").trim()) next[f] = "Required";
    }
    if (addr.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) {
      next.email = "Invalid email";
    }
    if (
      addr.phone &&
      addr.phone.replace(/\D/g, "").length > 0 &&
      addr.phone.replace(/\D/g, "").length < 7
    ) {
      next.phone = "Phone seems too short";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    if (!["whatsapp", "card", "paypal"].includes(payMethod)) {
      show({ type: "error", title: "Select a payment method" });
      return false;
    }
    return true;
  };

  const invalid = (name) =>
    errors[name]
      ? "border-rose-400 focus:ring-rose-400"
      : "border-border focus:ring-primary";

  /* ---------- step handlers ---------- */
  const goNextFromShipping = () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      show({ type: "error", title: "Please fix the highlighted fields" });
      return;
    }
    dispatch(setAddress(addr));
    setStep(2);
    show({ type: "success", title: "Address saved" });
  };

  const goNextFromPayment = () => {
    if (!validatePayment()) return;
    dispatch(setPayment({ method: payMethod }));
    setStep(3);
  };

  const placeOrder = () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      setStep(1);
      show({ type: "error", title: "Shipping info incomplete" });
      return;
    }
    if (!validatePayment()) {
      setStep(2);
      return;
    }
    // success

    // Generate WhatsApp text
    const itemsList = items.map(it => {
      let desc = `- ${it.qty}x ${it.name}`;
      if (it.color || it.size) {
        desc += ` (${[it.color, it.size].filter(Boolean).join(" / ")})`;
      }
      desc += ` [${money(it.price)}]`;
      return desc;
    }).join("\n");
    const addressStr = `${addr.name}\n${addr.street}\n${addr.city}, ${addr.state} ${addr.zip}\n${addr.phone}\n${addr.email}`;
    const text = `*New Order!*\n*Shipping Address:*\n${addressStr}\n\n*Items:*\n${itemsList}\n\n*Summary:*\nSubtotal: ${money(subtotal)}\nShipping: ${isFreeShipping ? "Free" : money(effectiveShipping)}\nTotal: ${money(total)}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/15551234567?text=${encodedText}`, '_blank');

    dispatch(clearCart());
    show({
      type: "success",
      title: "Order placed!",
      description: `Total ${money(total)}`,
    });
    setTimeout(() => router.push("/"), 900);
  };

  /* ---------- UI ---------- */
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Stepper step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 lg:gap-14">
        {/* LEFT SIDE */}
        <section className="space-y-8">
          {step === 1 && (
            <ShippingDetailsForm
              invalid={invalid}
              addr={addr}
              setAddr={setAddr}
              errors={errors}
              setShippingCharge={setShippingCharge}
              shippingCharge={shippingCharge}
              goNextFromShipping={goNextFromShipping}
              isFreeShipping={isFreeShipping}
            />
          )}

          {step === 2 && (
            <PaymentOptions
              setPayMethod={setPayMethod}
              payMethod={payMethod}
              setStep={setStep}
              goNextFromPayment={goNextFromPayment}
            />
          )}

          {step === 3 && (
            <ReviewOrderDetails
              setStep={setStep}
              addr={addr}
              payMethod={payMethod}
              items={items}
              placeOrder={placeOrder}
            />
          )}
        </section>

        {/* RIGHT SIDE */}
        <CheckoutSummary items={items} shippingCharge={shippingCharge} />
      </div>
    </main>
  );
}
