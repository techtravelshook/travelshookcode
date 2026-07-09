"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Layers, CheckCircle2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const canvasRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      o: Math.random() * 0.35 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0070A1] flex items-center justify-center p-4 sm:p-6 ">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2 relative pt-20">

        {/* ── Left: Branding panel ── */}
        <div className="relative bg-gradient-to-br from-[#0070A1] via-[#005A7F] to-[#003D5C] p-10 md:p-14 flex flex-col justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="relative z-10">
            {/* Logo pill */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-10">
              <div className="w-7 h-7 bg-[#F6931F] rounded-lg flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium tracking-wide">TravelHooks Admin</span>
            </div>

            <h1 className="text-4xl md:text-[42px] font-bold text-white leading-[1.15] mb-5">
              Manage your<br />
              travel empire<br />
              with{" "}
              <span className="text-[#F6931F]">ease.</span>
            </h1>

            <p className="text-white/70 text-[15px] leading-relaxed max-w-sm mb-10">
              One powerful portal for Umrah packages, holiday deals, flights,
              and bookings — all in one place.
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {["✈ Umrah Packages", "🏖 Holiday Deals", "🛫 Flights", "📊 Dashboard"].map((t) => (
                <span
                  key={t}
                  className="px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/85 text-xs font-medium tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "24/7", l: "Always available" },
                { n: "100%", l: "Secure access" },
              ].map(({ n, l }) => (
                <div
                  key={n}
                  className="bg-white/8 border border-white/12 rounded-xl px-5 py-4"
                >
                  <div className="text-2xl font-bold text-white">{n}</div>
                  <div className="text-white/55 text-[11px] uppercase tracking-widest mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Login form ── */}
        <div className="bg-white flex flex-col">
          {/* Animated accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-[#F6931F] via-[#0070A1] to-[#F6931F] bg-[length:200%] animate-[slideBar_3s_linear_infinite]" />

          <div className="flex-1 flex flex-col justify-center px-10 md:px-6 py-6 ">
            {/* Form header */}
            <div className="mb-9">
              <div className="w-11 h-11 bg-[#F6931F] rounded-xl flex items-center justify-center mb-5">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[28px] font-bold text-gray-900 mb-1.5">Welcome back</h2>
              <p className="text-gray-400 text-sm">Sign in to access your admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[13px] font-medium text-gray-600 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="admin@travelshook.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-[15px] bg-gray-50 placeholder:text-gray-300 focus:outline-none focus:border-[#0070A1] focus:ring-4 focus:ring-[#0070A1]/10 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-medium text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-[15px] bg-gray-50 placeholder:text-gray-300 focus:outline-none focus:border-[#0070A1] focus:ring-4 focus:ring-[#0070A1]/10 focus:bg-white transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0070A1] transition-colors"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-500 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

             

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0070A1] hover:bg-[#005f8a] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl text-[15px] transition-all duration-150 flex items-center justify-center gap-2.5 mt-2 disabled:opacity-65"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in to dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

           
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideBar {
          0%   { background-position: 0% }
          100% { background-position: 200% }
        }
        .animate-\\[slideBar_3s_linear_infinite\\] {
          animation: slideBar 3s linear infinite;
          background-size: 200%;
        }
      `}</style>
    </div>
  );
}