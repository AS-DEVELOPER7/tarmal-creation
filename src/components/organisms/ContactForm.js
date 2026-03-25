"use client";

import { useState } from "react";

export default function ContactForm() {
  const initial = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  function validate(values) {
    const errs = {};
    if (!values.name.trim()) errs.name = "Full name is required.";
    if (!values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) errs.subject = "Subject is required.";
    if (!values.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setValues((s) => ({ ...s, [id]: value }));
    if (errors[id]) setErrors((s) => ({ ...s, [id]: undefined })); // clear field error as user types
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setSending(true);
      // If you wire an API route later, call it here:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      await new Promise((r) => setTimeout(r, 900)); // mock request
      setSent(true);
      setValues(initial);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sm:p-8">
        {sent && (
          <div className="mb-6 rounded-lg border border-success bg-success-bg text-success px-4 py-3">
            ✅ Thanks! Your message has been sent. We’ll get back to you soon.
          </div>
        )}
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={onChange}
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-danger" : "border-border"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={onChange}
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-danger" : "border-border"
                }`}
                placeholder="you@example.com"
                inputMode="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={values.subject}
              onChange={onChange}
              className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.subject ? "border-danger" : "border-border"
              }`}
              placeholder="e.g., Custom Order Inquiry"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-danger">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={values.message}
              onChange={onChange}
              rows={6}
              className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.message ? "border-danger" : "border-border"
              }`}
              placeholder="Write your message here…"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-danger">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full h-12 rounded-lg bg-primary text-white font-bold hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
