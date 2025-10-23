// src/pages/Contact.tsx
import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import {
  motion,
  AnimatePresence,
  PanInfo,
  useMotionValue,
  useTransform,
  useInView, // 👈 New import for visibility detection
} from "framer-motion";

/**
 * Cinematic Contact Page — Full scale interactive
 * - TypeScript
 * - Tailwind CSS + Framer Motion
 * - Drop into src/pages/Contact.tsx
 *
 * Dependencies: framer-motion, tailwindcss
 *
 * Email: sheenleen02@gmail.com
 * WhatsApp: +2347016969298  (wa.me/2347016969298)
 */

/* ----------------------------- Utilities ------------------------------ */

const copyWithFallback = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      document.body.removeChild(ta);
      return false;
    }
  }
};

/* -------------------------- Parallax Background ------------------------ */

const ParallaxBlobs: React.FC = () => {
  // subtle animated gradient blobs using motion
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        animate={{ x: [-80, 0, -80], y: [0, -40, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-52 -top-40 w-[520px] h-[520px] rounded-full bg-black blur-3xl opacity-60"
      />
      <motion.div
        animate={{ x: [100, 40, 100], y: [10, -20, 10], rotate: [0, -8, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 top-60 w-[420px] h-[420px] rounded-full bg-black blur-3xl opacity-60"
      />
    </div>
  );
};

/* ---------------------------- Floating Cursor -------------------------- */

const FloatingCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const x = e.clientX - 12;
      const y = e.clientY - 12;
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        ref={dotRef}
        className="w-6 h-6 rounded-full bg-black mix-blend-screen shadow-[0_8px_30px_-8px_rgba(16,185,129,0.4)] transition-transform"
      />
    </div>
  );
};

/* ------------------------------- Form --------------------------------- */

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [form, setForm] = useState<ContactFormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Partial<ContactFormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async submission (replace with real API)
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onSuccess();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col text-sm">
          <span className="text-slate-300">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="mt-1 rounded border border-slate-700/40 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Your name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="text-xs text-rose-400 mt-1">{errors.name}</span>}
        </label>

        <label className="flex flex-col text-sm">
          <span className="text-slate-300">Email</span>
          <input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="mt-1 rounded border border-slate-700/40 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="text-xs text-rose-400 mt-1">{errors.email}</span>}
        </label>
      </div>

      <label className="flex flex-col text-sm">
        <span className="text-slate-300">Message</span>
        <textarea
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="mt-1 min-h-[110px] rounded border border-slate-700/40 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Tell me about your project, budget, timeline..."
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="text-xs text-rose-400 mt-1">{errors.message}</span>}
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:brightness-95 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        <button
          type="button"
          onClick={() => {
            // quick preset message to WhatsApp
            window.open(
              `https://wa.me/2347016969298?text=${encodeURIComponent("Hey Emmanuel 👋 I want to discuss a project.")}`,
              "_blank"
            );
          }}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
        >
          💬 Quick WhatsApp
        </button>
      </div>
    </form>
  );
};

/* --------------------------- Draggable Card ---------------------------- */

const DraggableContactCard: React.FC = () => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-9, 9]);
  return (
    <motion.div
      drag
      dragConstraints={{ left: -40, right: 40, top: -10, bottom: 10 }}
      style={{ x, rotate }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-black to-black p-4 shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-900 font-bold">
          EM
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold">Emmanuel — Full-stack & Motion</div>
              <div className="text-xs text-slate-400">TypeScript · Framer Motion · Vite</div>
            </div>

            <div className="text-xs text-slate-400">Available</div>
          </div>

          <div className="mt-3 text-xs text-slate-300">Drag me — feel the physics. Click to reveal more actions below.</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------- Capsule Reveal --------------------------- */

const DraggableCapsule: React.FC<{ onReveal: () => void; revealed: boolean }> = ({ onReveal, revealed }) => {
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 110 || info.velocity.x > 300) {
      onReveal();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 140 }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-3 shadow-lg cursor-grab"
      role="button"
      aria-pressed={revealed}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-500/20 px-2 py-1 text-sm">📲</div>
          <div className="text-sm font-medium">Contact Capsule</div>
        </div>

        <div className="text-xs text-slate-400">{revealed ? "Revealed" : "Drag →"}</div>
      </div>
    </motion.div>
  );
};

/* ------------------------------ FAQ ----------------------------------- */

const InteractiveFAQ: React.FC = () => {
  const faqs = [
    { q: "How fast can you deliver a prototype?", a: "Typically 1–2 weeks for a rapid prototype depending on scope." },
    { q: "Do you do ongoing maintenance?", a: "Yes — retainer or hourly maintenance is available." },
    { q: "Do you work with teams?", a: "Absolutely — I integrate into existing teams or lead the frontend effort." },
  ];

  return (
    <div className="space-y-2">
      {faqs.map((f, i) => (
        <details
          key={i}
          className="group rounded-md border border-slate-700/50 bg-slate-900/30 p-3 open:bg-slate-900/20"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-2 font-medium">
            {f.q}
            <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-2 text-sm text-slate-300">{f.a}</div>
        </details>
      ))}
    </div>
  );
};

/* --------------------------- Success Modal ----------------------------- */

const SuccessModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="max-w-md w-full rounded-2xl bg-gradient-to-br from-slate-900/80 to-[#031025]/80 border border-slate-700/60 p-6 shadow-2xl backdrop-blur"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">🎉</div>
              <div>
                <h3 className="text-lg font-bold">Message sent — thanks!</h3>
                <p className="text-sm text-slate-300 mt-1">I'll respond within 24–48 hours. Meanwhile — enjoy this confetti ✨</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:brightness-95"
              >
                Close
              </button>
            </div>

            {/* Confetti (simple CSS) */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="confetti" />
            </div>
            <style>{`
              .confetti {
                position: absolute;
                inset: 0;
                overflow: hidden;
              }
              .confetti::before, .confetti::after {
                content: "";
                position: absolute;
                width: 8px;
                height: 14px;
                background: linear-gradient(45deg, #fef3c7, #fca5a5);
                top: 10%;
                left: 20%;
                transform: rotate(25deg);
                animation: fall 1.6s linear infinite;
                opacity: 0.9;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              }
              .confetti::after {
                left: 70%;
                background: linear-gradient(45deg, #bbf7d0, #93c5fd);
                animation-delay: .3s;
              }
              @keyframes fall {
                0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(90vh) rotate(200deg); opacity: 0; }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------- Main Contact Page -------------------------- */

export default function Contact(): JSX.Element {
  const [revealed, setRevealed] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const phone = "+2347016969298";
  const email = "sheenleen02@gmail.com";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        void (async () => {
          const ok = await copyWithFallback(phone);
          if (ok) {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 1800);
          }
        })();
      }
      if (e.key.toLowerCase() === "e") {
        const el = document.querySelector<HTMLInputElement>('input[placeholder="you@example.com"]');
        el?.focus();
      }
      if (e.key.toLowerCase() === "m") {
        setModalOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-100 relative overflow-hidden">
      <ParallaxBlobs />
      <FloatingCursor />

      <Container>
        <div className="mx-auto max-w-6xl py-20">
          <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact me ✨</h1>
            <p className="mt-2 text-slate-300 max-w-3xl">
              Choose how we connect — message, call, or drag the capsule. Everything here is interactive; try it.
            </p>
          </motion.header>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: big interactive card */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="rounded-3xl border border-slate-700/60 p-6 bg-black shadow-2xl"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <DraggableContactCard />

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-sm text-slate-400">Direct</div>
                        <div className="text-lg font-semibold">{phone}</div>
                      </div>

                      <div className="ml-auto flex items-center gap-2">
                        <button
                          onClick={async () => {
                            const ok = await copyWithFallback(phone);
                            if (ok) {
                              setCopiedPhone(true);
                              setTimeout(() => setCopiedPhone(false), 1600);
                            }
                          }}
                          className="rounded-md border px-3 py-2 text-sm"
                        >
                          {copiedPhone ? "Copied ✓" : "📋 Copy"}
                        </button>

                        <a
                          href={`https://wa.me/2347016969298?text=${encodeURIComponent("Hey Emmanuel 👋 I want to collaborate.")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold hover:brightness-95"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 text-slate-300">
                      <p className="leading-relaxed">
                        I drive projects from sketch to production. If you need performance, motion, or a prototype that sells — message me below or open WhatsApp for an instant chat.
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-slate-400">Exclusive Offer</h4>
                        <div className="mt-2 rounded-md border border-slate-700/40 p-3 bg-slate-900/30">
                          <div className="text-sm">2-week rapid prototype — includes UI, motion and a production-ready handoff.</div>
                          <div className="mt-2 text-xs text-slate-400">Limited slots — first come, first served.</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-slate-400">What I love building</h4>
                        <ul className="mt-2 text-sm space-y-1 text-slate-300">
                          <li>• Motion-first UI patterns</li>
                          <li>• Web apps with delightful UX</li>
                          <li>• Performance audits & fixes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* interactive form */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <ContactForm
                      onSuccess={() => {
                        setModalOpen(true);
                      }}
                    />
                  </div>

                  <div className="rounded-xl border border-slate-700/40 p-4 bg-slate-900/10">
                    <h3 className="text-sm font-semibold">Quick actions</h3>
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => {
                          void (async () => {
                            const ok = await copyWithFallback(email);
                            if (ok) {
                              setCopiedEmail(true);
                              setTimeout(() => setCopiedEmail(false), 1600);
                            }
                          })();
                        }}
                        className="w-full rounded-md border px-3 py-2 text-sm text-left"
                      >
                        {copiedEmail ? "Copied Email ✓" : `📧 Copy email — ${email}`}
                      </button>

                      <button
                        onClick={() => {
                          window.open(`mailto:${email}?subject=Hi%20Emmanuel`, "_self");
                        }}
                        className="w-full rounded-md bg-slate-100/6 px-3 py-2 text-sm"
                      >
                        ✉️ Open Email Client
                      </button>

                      <button
                        onClick={() => {
                          window.open(`https://wa.me/2347016969298`, "_blank");
                        }}
                        className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold"
                      >
                        💬 Open WhatsApp
                      </button>
                    </div>

                    <div className="mt-4 text-xs text-slate-400">
                      Tip: press <kbd className="rounded border px-2 py-0.5">C</kbd> to copy phone, <kbd className="rounded border px-2 py-0.5">E</kbd> to focus email.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ + Features */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
                <div className="rounded-2xl border border-slate-700/40 p-4 bg-black">
                  <h3 className="text-sm font-semibold mb-3">FAQ & Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InteractiveFAQ />
                    <div>
                      <h4 className="text-sm font-medium">Features you get</h4>
                      <ul className="mt-2 text-sm text-slate-300 space-y-2">
                        <li>🔹 Motion-first UI patterns</li>
                        <li>🔹 TypeScript-first codebase</li>
                        <li>🔹 Production-ready builds (Vite)</li>
                        <li>🔹 Performance & accessibility audit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column: side tools & capsule */}
            <aside className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <DraggableCapsule
                  onReveal={() => {
                    setRevealed(true);
                  }}
                  revealed={revealed}
                />
              </motion.div>

              {/* revealed actions */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="rounded-xl border border-slate-700/40 p-4 bg-slate-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">WhatsApp Quick Actions</div>
                        <div className="text-xs text-slate-400">Open chat or copy number</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/2347016969298?text=${encodeURIComponent("Hey Emmanuel 👋 I want to work together.")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold"
                        >
                          💬 Open
                        </a>

                        <button
                          onClick={async () => {
                            const ok = await copyWithFallback(phone);
                            if (ok) {
                              setCopiedPhone(true);
                              setTimeout(() => setCopiedPhone(false), 1400);
                            }
                          }}
                          className="rounded-md border px-3 py-2 text-xs"
                        >
                          {copiedPhone ? "Copied ✓" : "📋 Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-300">
                      <p>
                        Number: {phone} — Tap open or copy.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                <div className="rounded-xl border border-slate-700/40 p-4 bg-slate-900/10">
                  <h4 className="text-sm font-semibold">Quick Links</h4>
                  <div className="mt-3 flex flex-col gap-2">
                    <a className="text-sm text-slate-300 hover:underline" href="#portfolio">
                      View portfolio
                    </a>
                    <a className="text-sm text-slate-300 hover:underline" href="#services">
                      Services & pricing
                    </a>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mt-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold"
                    >
                      🎯 Book a quick call
                    </button>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </Container>

      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Small footer hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/30 border border-slate-700/40 px-4 py-2 text-xs text-slate-300">
        Try dragging the capsule, clicking quick actions, or pressing <kbd className="rounded border px-2">C</kbd>
      </div>
    </div>
  );
}
