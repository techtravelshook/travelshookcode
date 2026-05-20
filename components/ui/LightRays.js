"use client";
import { useEffect, useRef } from "react";

export default function LightRays({
  raysColor = "#ffffff",
  raysSpeed = 1,
  rayCount = 12,
  className = "",
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse tracking on the parent section
    const section = canvas.parentElement;
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    const hex = raysColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rays = Array.from({ length: rayCount }, (_, i) => ({
      baseAngle: ((i / rayCount) * Math.PI * 1.4) - Math.PI * 0.7,
      width: Math.random() * 0.045 + 0.012,
      speed: (Math.random() * 0.25 + 0.08) * raysSpeed,
      offset: Math.random() * Math.PI * 2,
      baseOpacity: Math.random() * 0.13 + 0.04,
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      // How much the mouse brightens rays (0 = no hover, 1 = full hover)
      const hoverBoost = mouse.active ? 2.8 : 1.0;
      // Mouse influence on ray angles
      const mouseOffsetX = mouse.active ? (mouse.x - 0.5) * 0.25 : 0;

      const originX = w / 2;
      const originY = 0;
      const rayLength = Math.sqrt(w * w + h * h) * 1.3;

      rays.forEach((ray) => {
        const sway = Math.sin(time * ray.speed + ray.offset) * 0.06;
        const angle = ray.baseAngle + sway + mouseOffsetX;
        const halfW = ray.width + Math.sin(time * ray.speed * 0.5) * 0.008;

        const leftAngle = angle - halfW;
        const rightAngle = angle + halfW;

        const x1 = originX + Math.cos(leftAngle) * rayLength;
        const y1 = originY + Math.sin(leftAngle) * rayLength;
        const x2 = originX + Math.cos(rightAngle) * rayLength;
        const y2 = originY + Math.sin(rightAngle) * rayLength;

        const grad = ctx.createLinearGradient(
          originX, originY,
          originX + Math.cos(angle) * rayLength,
          originY + Math.sin(angle) * rayLength
        );

        const pulse = 0.85 + Math.sin(time * ray.speed + ray.offset) * 0.15;
        const opacity = ray.baseOpacity * pulse * hoverBoost;

        grad.addColorStop(0, `rgba(${r},${g},${b},${Math.min(opacity, 1)})`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},${Math.min(opacity * 0.55, 1)})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      time += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [raysColor, raysSpeed, rayCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ display: "block" }}
    />
  );
}