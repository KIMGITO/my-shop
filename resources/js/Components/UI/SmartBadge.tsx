import { cn } from "@/lib/utils";
import React, { useId, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeType = "ribbon" | "flag" | "seal" | "sticker" | "burst";
export type BadgeVariant = "red" | "purple" | "green" | "amber" | "blue" | "pink";
export type BadgeSize = "sm" | "md" | "lg";

export interface SmartBadgeProps {
  /** The text to display on the badge. Use "\n" to split into two lines (flag, seal, burst). */
  text: string;
  /** Visual shape of the badge. */
  type: BadgeType;
  /** Color theme. Defaults to "red". */
  variant?: BadgeVariant;
  /** Size variant. Defaults to "md". */
  size?: BadgeSize;
  /** Extra className on the root SVG element. */
  className?: string;
  /** onClick handler. */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** onKeyDown handler for accessibility. */
  onKeyDown?: React.KeyboardEventHandler<HTMLSpanElement>;
  /** Custom aria-label. Defaults to badge text. */
  ariaLabel?: string;
  /** Disable interactions and animations. */
  disabled?: boolean;
}

// ─── Size Scale ──────────────────────────────────────────────────────────────

const SIZE_SCALE: Record<BadgeSize, number> = {
  sm: 0.65,
  md: 0.8,
  lg: 9.0,
};

// ─── Theme Palette (Brighter colors) ─────────────────────────────────────────

interface Theme {
  p: string;      // primary color (brighter)
  d: string;      // dark shade
  l: string;      // light shade
  m: string;      // mid accent
  shine: string;  // highlight gloss
  shadow: string; // drop shadow color
  fold: string;   // fold / crease color
}

const THEMES: Record<BadgeVariant, Theme> = {
  red:    { 
    p: "#FF6B6B", d: "#E53E3E", l: "#FFF5F5", 
    m: "#FEB2B2", shine: "rgba(255,255,255,0.5)", 
    shadow: "rgba(220,50,50,0.3)", fold: "#C53030" 
  },
  purple: { 
    p: "#B66FFF", d: "#805AD5", l: "#F8F4FF", 
    m: "#D6BCFA", shine: "rgba(255,255,255,0.45)", 
    shadow: "rgba(130,50,220,0.3)", fold: "#6B46C1" 
  },
  green:  { 
    p: "#68D391", d: "#38A169", l: "#F0FFF4", 
    m: "#9AE6B4", shine: "rgba(255,255,255,0.45)", 
    shadow: "rgba(30,150,70,0.3)", fold: "#2F855A" 
  },
  amber:  { 
    p: "#F6E05E", d: "#D69E2E", l: "#FFFFF0", 
    m: "#FAF089", shine: "rgba(255,255,255,0.5)", 
    shadow: "rgba(180,130,20,0.3)", fold: "#B7791F" 
  },
  blue:   { 
    p: "#63B3ED", d: "#3182CE", l: "#EBF8FF", 
    m: "#90CDF4", shine: "rgba(255,255,255,0.45)", 
    shadow: "rgba(40,80,200,0.3)", fold: "#2B6CB0" 
  },
  pink:   { 
    p: "#F687B3", d: "#D53F8C", l: "#FFF5F7", 
    m: "#FBB6CE", shine: "rgba(255,255,255,0.45)", 
    shadow: "rgba(200,40,120,0.3)", fold: "#B83280" 
  },
};

// ─── Utility: Generate burst points ──────────────────────────────────────────

function generateStarburstPoints(
  cx: number, cy: number, 
  spikes: number, 
  rOuter: number, 
  rInner: number
): string {
  return Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (i * Math.PI / spikes) - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

// Pre-computed burst points
const SEAL_POINTS = generateStarburstPoints(40, 40, 16, 37, 31);
const BURST_POINTS = generateStarburstPoints(40, 40, 12, 37, 29);

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Wave-shaped flat ribbon banner without folds where text follows the curve */
const Ribbon: React.FC<{ 
  text: string; 
  theme: Theme; 
  uid: string;
  scale: number;
  disabled: boolean;
}> = React.memo(({ text, theme: t, uid, scale, disabled }) => {
  // Adjusted dimensions to accommodate the vertical wave and tail
  const w = 120 * scale;
  const h = 48 * scale; // Increased height slightly for the wave pattern
  
  return (
    <svg
      width={w} height={h}
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Flat gloss gradient, slightly curved to match wave shape implicitly */}
        <linearGradient id={`${uid}_gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white"   stopOpacity={disabled ? 0.05 : 0.15} />
          <stop offset="100%" stopColor="black"   stopOpacity={disabled ? 0.01 : 0.03} />
        </linearGradient>
        {/* Main ribbon body gradient (dark-to-primary for flat 3D feel) */}
        <linearGradient id={`${uid}_body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={disabled ? t.d : t.p} />
          <stop offset="100%" stopColor={t.d} />
        </linearGradient>
        {/* Standard shadow */}
        <filter id={`${uid}_shadow`} x="-10%" y="-20%" width="120%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor={t.shadow} floodOpacity={disabled ? 0.2 : 0.6} />
        </filter>

        {/* 
          Text Path Definition: This defines the invisible curve the text will follow.
          It's based on the central horizontal line of the ribbon body's wave.
          Main Body starts around x=10 and ends around x=110, y-center is 24.
          Wave path logic: starts low, arcs high (40, 12), then goes low again (70, 24).
        */}
        <path 
            id={`${uid}_text_path`}
            d="M10 24 Q40 12, 70 24 T110 24" 
        />
      </defs>

      {/* Main ribbon body (wave shape) */}
      <g filter={`url(#${uid}_shadow)`}>
        {/* Path starts top-left (10,12) with a smooth wave, curves to the right,
            forms the chevron tail, and waves back along the bottom to (10,36) Z. */}
        <path d="M10 12 Q40 0, 70 12 T110 12 V36 Q80 48, 50 36 T10 36 Z" fill={`url(#${uid}_body)`} />
      </g>

      {/* Wave-shaped flat chevron tail at the end */}
      <g filter={`url(#${uid}_shadow)`} opacity={disabled ? 0.6 : 1}>
          <path d="M105 12 L116 24 L105 36 V12 Z" fill={t.d} />
          {/* Subtle line to show the main ribbon ending before the tail */}
          <path d="M105 12 V36" stroke="white" strokeOpacity={0.05} strokeWidth={0.5}/>
      </g>

      {/* Flat gloss highlight matching the wave shape */}
      <path d="M10 12 Q40 0, 70 12 T110 12 L110 16 Q80 28, 50 16 T10 16 Z" fill={`url(#${uid}_gloss)`} />

      {/* Wave-shaped Edge lines (top and bottom) */}
      <path d="M11 13 Q41 1, 71 13 T109 13" stroke="white" strokeOpacity={disabled ? 0.1 : 0.3} strokeWidth={0.6} />
      <path d="M11 35 Q81 47, 51 35 T109 35" stroke="black" strokeOpacity={disabled ? 0.03 : 0.08} strokeWidth={0.6} />

      {/* Tilted, Wave-Following Text Label using textPath */}
      <g 
        opacity={disabled ? 0.6 : 1}
      >
          <text
            dy="1" // Subtle vertical adjustment for better centering on path
            fill="white"
            fontSize={9.5}
            fontWeight={900}
            fontStyle="italic"
            style={{ 
                fontFamily: "system-ui, sans-serif", 
                letterSpacing: "0.12em", 
                textShadow: "0 1px 1px rgba(0,0,0,.2)" 
            }}
          >
            <textPath 
                xlinkHref={`#${uid}_text_path`} 
                startOffset="50%" // Center text along the defined path
                textAnchor="middle"
            >
                {text.toUpperCase()}
            </textPath>
          </text>
      </g>
    </svg>
  );
});

Ribbon.displayName = 'Ribbon';
/** Hanging price-tag with upward arrow top AND inverted arrow (v-shape) base */
const Flag: React.FC<{ 
  text: string; 
  theme: Theme; 
  uid: string;
  scale: number;
  disabled: boolean;
}> = React.memo(({ text, theme: t, uid, scale, disabled }) => {
  const lines = text.split("\n");
  const w = 56 * scale;
  const h = 100 * scale;
  
  return (
    <svg
      width={w} height={h}
      viewBox="0 0 56 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}_body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={t.d} />
          <stop offset="35%"  stopColor={disabled ? t.d : t.p} />
          <stop offset="100%" stopColor={t.d} />
        </linearGradient>
        <linearGradient id={`${uid}_fold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={t.fold} />
          <stop offset="100%" stopColor={t.d} />
        </linearGradient>
        <filter id={`${uid}_shadow`}>
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor={t.shadow} floodOpacity={disabled ? 0.3 : 1} />
        </filter>
      </defs>

      {/* Braided string */}
      <line x1={28} y1={0} x2={28} y2={12} stroke="#d4d4d4" strokeWidth={1} strokeDasharray="1.5 3" strokeLinecap="round" opacity={disabled ? 0.5 : 1} />
      <line x1={31} y1={0} x2={31} y2={12} stroke="#a3a3a3" strokeWidth={0.8} strokeDasharray="3 1.5" strokeLinecap="round" strokeDashoffset={2} opacity={disabled ? 0.5 : 1} />

      {/* Body: Pointed Top (L28 12) and Inverted V Base (L28 64) */}
      <g filter={`url(#${uid}_shadow)`}>
        <path 
          d="M5 24 L28 12 L51 24 V76 L28 64 L5 76 Z" 
          fill={`url(#${uid}_body)`} 
        />
      </g>

      {/* Eyelet */}
      <circle cx={28} cy={18} r={3.5} fill="white" stroke="#d4d4d4" strokeWidth={0.8} opacity={disabled ? 0.6 : 1} />
      <circle cx={28} cy={18} r={1.5} fill="#e5e5e5" opacity={disabled ? 0.6 : 1} />

      {/* Left fold crease - adjusted for inverted base */}
      <path d="M5 24 L11 21 V67 L5 76 Z" fill={`url(#${uid}_fold)`} fillOpacity={0.5} />

      {/* Decorative border following the double-arrow shape */}
      <path 
        d="M9 28 L28 18 L47 28 V70 L28 60 L9 70 Z" 
        stroke="white" 
        strokeOpacity={disabled ? 0.1 : 0.2} 
        strokeWidth={0.8} 
        fill="none" 
        strokeDasharray="2 2" 
      />

      {/* Tilted Text - Raised higher to clear the base notch */}
      <g 
        opacity={disabled ? 0.6 : 1} 
        transform="rotate(-15, 28, 42)"
      >
        {lines.length === 1 ? (
          <text x={28} y={42} fill="white" fontSize={9} fontWeight={800} textAnchor="middle" dominantBaseline="central"
            style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.04em", textShadow: "0 1px 2px rgba(0,0,0,.3)" }}>
            {lines[0]}
          </text>
        ) : (
          <>
            <text x={28} y={36} fill="white" fontSize={9} fontWeight={800} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.04em", textShadow: "0 1px 2px rgba(0,0,0,.3)" }}>
              {lines[0]}
            </text>
            <text x={28} y={49} fill="white" fontSize={9} fontWeight={800} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.04em", textShadow: "0 1px 2px rgba(0,0,0,.3)" }}>
              {lines[1]}
            </text>
          </>
        )}
      </g>
    </svg>
  );
});

Flag.displayName = 'Flag';

/** 16-point starburst seal */
const Seal: React.FC<{ 
  text: string; 
  theme: Theme; 
  uid: string;
  scale: number;
  disabled: boolean;
}> = React.memo(({ text, theme: t, uid, scale, disabled }) => {
  const lines = text.split("\n");
  const fontSize = text.replace("\n", "").length > 5 ? 8 : 10;
  const w = 80 * scale;
  const h = 80 * scale;

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}_gloss`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="white" stopOpacity={disabled ? 0.15 : 0.35} />
          <stop offset="100%" stopColor="black" stopOpacity={disabled ? 0.05 : 0.1} />
        </radialGradient>
        <linearGradient id={`${uid}_body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={disabled ? t.d : t.p} />
          <stop offset="100%" stopColor={t.d} />
        </linearGradient>
        <filter id={`${uid}_drop`}>
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={t.shadow} floodOpacity={disabled ? 0.3 : 1} />
        </filter>
      </defs>

      {/* Starburst */}
      <g filter={`url(#${uid}_drop)`}>
        <polygon points={SEAL_POINTS} fill={`url(#${uid}_body)`} />
      </g>
      <polygon points={SEAL_POINTS} fill={`url(#${uid}_gloss)`} />

      {/* Inner dashed ring */}
      <circle cx={40} cy={40} r={24} stroke="white" strokeOpacity={disabled ? 0.15 : 0.3} strokeWidth={1.2} fill="none" strokeDasharray="2 1.5" />

      {/* Peel-curl */}
      <path d="M61 61 Q65 56 62 51 Q67 58 64 65 Z" fill="black" fillOpacity={disabled ? 0.05 : 0.15} />

      {/* Text */}
      <g opacity={disabled ? 0.6 : 1}>
        {lines.length === 1 ? (
          <text x={40} y={42} fill="white" fontSize={fontSize} fontWeight={800} textAnchor="middle" dominantBaseline="central"
            style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.03em", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
            {lines[0]}
          </text>
        ) : (
          <>
            <text x={40} y={36} fill="white" fontSize={9} fontWeight={800} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.03em", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
              {lines[0]}
            </text>
            <text x={40} y={47} fill="white" fontSize={9} fontWeight={800} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "system-ui, sans-serif", letterSpacing: "0.03em", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
              {lines[1]}
            </text>
          </>
        )}
      </g>
    </svg>
  );
});

Seal.displayName = 'Seal';

/** Die-cut circular sticker with realistic top-right peel effect */
const Sticker: React.FC<{ 
  text: string; 
  theme: Theme; 
  uid: string;
  scale: number;
  disabled: boolean;
}> = React.memo(({ text, theme: t, uid, scale, disabled }) => {
  // Split text by space and limit to 3 lines
  const lines = text.split(" ").slice(0, 3);
  const w = 72 * scale;
  const h = 72 * scale;

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Main sticker body gradient */}
        <radialGradient id={`${uid}_g`} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={disabled ? t.d : t.p} />
          <stop offset="100%" stopColor={t.d} />
        </radialGradient>
        
        {/* Gloss bubble gradient */}
        <radialGradient id={`${uid}_gloss`} cx="30%" cy="25%" r="60%">
          <stop offset="0%"  stopColor="white" stopOpacity={disabled ? 0.25 : 0.5} />
          <stop offset="60%" stopColor="white" stopOpacity={disabled ? 0.04 : 0.08} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>

        {/* Gradient for the back of the peeling paper */}
        <linearGradient id={`${uid}_peel_g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f3f3" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>

        {/* Main drop shadow filter */}
        <filter id={`${uid}_sh`}>
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor={t.shadow} floodOpacity={disabled ? 0.3 : 0.8} />
        </filter>
        
        {/* Mask to clip the main circle where the peel happens */}
        <mask id={`${uid}_peel_mask`}>
          <rect x="0" y="0" width="72" height="72" fill="white" />
          {/* This path defines the area that is "cut out" from the main circle */}
          <path d="M52 10 C 60 12, 66 26, 55 30 L 52 10 Z" fill="black" />
        </mask>
      </defs>

      {/* Main Sticker Body with clipping mask applied */}
      <g filter={`url(#${uid}_sh)`} mask={`url(#${uid}_peel_mask)`}>
        <circle cx={36} cy={36} r={30} fill={`url(#${uid}_g)`} />
        <circle cx={36} cy={36} r={30} stroke="white" strokeWidth={2} fill="none" strokeOpacity={disabled ? 0.5 : 0.9} />
      </g>

      {/* --- Realistic Peel Group --- */}
      <g opacity={disabled ? 0.7 : 1}>
        {/* 1. Diffused contact shadow *under* the fold */}
        <path 
          d="M55 30 C 50 25, 46 18, 52 10 L 49 13 C 44 21, 49 29, 55 30 Z" 
          fill="black" 
          fillOpacity="0.15" 
          filter="blur(1px)"
        />
        
        {/* 2. The physical fold (back of the paper) */}
        <path 
          d="M52 10 C 58 10, 68 22, 55 30 C 52 22, 48 15, 52 10 Z" 
          fill={`url(#${uid}_peel_g)`}
          stroke="#ccc" 
          strokeWidth="0.5"
        />
      </g>

      {/* Gloss bubble */}
      <ellipse cx={27} cy={24} rx={11} ry={6.5} fill={`url(#${uid}_gloss)`} transform="rotate(-20, 27, 24)" />

      {/* Text: Raised and centered */}
      <g opacity={disabled ? 0.6 : 1}>
        {lines.map((line, i) => {
          const totalLines = lines.length;
          //startY ensures text sits slightly raised above true center
          const startY = totalLines === 3 ? 28 : totalLines === 2 ? 31 : 36;
          const lineGap = 9;
          
          return (
            <text
              key={i}
              x={36}
              y={startY + (i * lineGap)}
              fill="white"
              fontSize={totalLines > 2 ? 8 : 10}
              fontWeight={900}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ 
                fontFamily: "system-ui, sans-serif", 
                textShadow: "0 1px 2px rgba(0,0,0,.4)", 
                letterSpacing: "0.02em",
                textTransform: "uppercase"
              }}
            >
              {line}
            </text>
          );
        })}
      </g>
    </svg>
  );
});

Sticker.displayName = 'Sticker';
/** 
 * Reduced-size Comic Burst 
 * Features: 30 shallow edges, "Spinning Coin" animation (3D scale/rotate)
 */

 /** 
 * Reduced-size Comic Burst 
 * Features: Auto-line-break (max 2 lines), 30 ridges, Spinning animation
 */
const Burst: React.FC<{ 
  text: string; 
  theme: Theme; 
  uid: string;
  scale: number;
  disabled: boolean;
}> = React.memo(({ text, theme: t, uid, scale, disabled }) => {
  // Split by space, then take only the first 2 words/lines
  const lines = text.split(" ").slice(0, 2);
  
  const w = 60 * scale;
  const h = 60 * scale;

  const generateBurstPath = (center: number, points: number, outerR: number, innerR: number) => {
    let path = "";
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerR : innerR;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      path += `${i === 0 ? "M" : "L"} ${x.toFixed(2)},${y.toFixed(2)} `;
    }
    return path + "Z";
  };

  const burstPath = generateBurstPath(30, 30, 27, 24);

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <style>
        {`
          @keyframes spinCoin {
            0% { transform: scale(0) rotateY(90deg); opacity: 0; }
            10%, 20% { transform: scale(1.1) rotateY(0deg); opacity: 1; }
            25%, 75% { transform: scale(1) rotateY(0deg); opacity: 1; }
            85%, 100% { transform: scale(0) rotateY(-90deg); opacity: 0; }
          }
          .coin-wrapper-${uid} {
            transform-origin: center;
            animation: spinCoin 5s infinite ease-in-out;
            perspective: 1000px;
          }
        `}
      </style>
      
      <defs>
        <radialGradient id={`${uid}_g`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor={disabled ? t.d : t.p} />
          <stop offset="100%" stopColor={t.d} />
        </radialGradient>
        <filter id={`${uid}_sh`}>
          <feDropShadow dx="0" dy={1.5} stdDeviation={2} floodColor={t.shadow} floodOpacity={disabled ? 0.3 : 0.8} />
        </filter>
      </defs>

      <g className={`coin-wrapper-${uid}`}>
        <g filter={`url(#${uid}_sh)`}>
          <path d={burstPath} fill={`url(#${uid}_g)`} />
        </g>

        <circle cx={30} cy={30} r={18} stroke="white" strokeOpacity={0.2} strokeWidth={0.8} fill="none" strokeDasharray="1 2" />

        <g opacity={disabled ? 0.6 : 1}>
          {lines.length === 1 ? (
            <text x={30} y={26} fill="white" fontSize={10} fontWeight={900} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "system-ui, sans-serif", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
              {lines[0]}
            </text>
          ) : (
            <>
              {/* Line 1 (Higher) */}
              <text x={30} y={22} fill="white" fontSize={9} fontWeight={900} textAnchor="middle" dominantBaseline="central"
                style={{ fontFamily: "system-ui, sans-serif", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
                {lines[0]}
              </text>
              {/* Line 2 (Lower) */}
              <text x={30} y={32} fill="white" fontSize={9} fontWeight={900} textAnchor="middle" dominantBaseline="central"
                style={{ fontFamily: "system-ui, sans-serif", textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
                {lines[1]}
              </text>
            </>
          )}
        </g>
      </g>
    </svg>
  );
});

Burst.displayName = 'Burst';

// ─── Animation CSS ────────────────────────────────────────────────────────────

const BADGE_STYLES = `
  .sb-ribbon {
    animation: sb-peel 3s ease-in-out infinite;
    transform-origin: left center;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .sb-ribbon:hover {
    animation: none;
    transform: rotate(-3deg) scale(1.06);
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.25));
  }
  .sb-ribbon.sb-disabled {
    animation: none;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
  .sb-ribbon.sb-disabled:hover {
    transform: none;
    filter: grayscale(0.5);
  }
  
  .sb-flag {
    animation: sb-swing 2.8s ease-in-out infinite;
    transform-origin: top center;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .sb-flag:hover {
    animation: none;
    transform: rotate(4deg) scale(1.05);
    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.2));
  }
  .sb-flag.sb-disabled {
    animation: none;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
  .sb-flag.sb-disabled:hover {
    transform: none;
    filter: grayscale(0.5);
  }
  
  .sb-seal {
    animation: sb-pulse 3s ease-in-out infinite;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .sb-seal:hover {
    animation: none;
    transform: scale(1.08) rotate(-5deg);
    filter: drop-shadow(0 6px 16px rgba(0,0,0,0.3));
  }
  .sb-seal.sb-disabled {
    animation: none;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
  .sb-seal.sb-disabled:hover {
    transform: none;
    filter: grayscale(0.5);
  }
  
  .sb-sticker {
    cursor: pointer;
    transition: transform 0.25s, filter 0.25s;
  }
  .sb-sticker:hover {
    transform: rotate(6deg) scale(1.08);
    filter: drop-shadow(0 6px 14px rgba(0,0,0,0.25));
  }
  .sb-sticker.sb-disabled {
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
  .sb-sticker.sb-disabled:hover {
    transform: none;
    filter: grayscale(0.5);
  }
  
  .sb-burst {
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .sb-burst:hover {
    transform: rotate(15deg) scale(1.1);
    filter: drop-shadow(0 5px 12px rgba(0,0,0,0.25));
  }
  .sb-burst.sb-disabled {
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
  .sb-burst.sb-disabled:hover {
    transform: none;
    filter: grayscale(0.5);
  }

  @keyframes sb-peel {
    0%, 100% { transform: rotate(0deg)  scale(1);    filter: drop-shadow(0 2px 3px rgba(0,0,0,.12)); }
    50%       { transform: rotate(-2deg) scale(1.03); filter: drop-shadow(0 6px 12px rgba(0,0,0,.2)); }
  }
  @keyframes sb-swing {
    0%, 100% { transform: rotate(-2deg); }
    50%       { transform: rotate(2deg); }
  }
  @keyframes sb-pulse {
    0%, 100% { filter: drop-shadow(0 2px 4px rgba(0,0,0,.15)); }
    50%       { filter: drop-shadow(0 3px 10px rgba(0,0,0,.25)); }
  }

  @media (prefers-reduced-motion: reduce) {
    .sb-ribbon, .sb-flag, .sb-seal { animation: none; }
  }
`;

// ─── Style Injection ─────────────────────────────────────────────────────────

let _stylesInjected = false;

function injectStyles() {
  if (typeof document !== "undefined" && !_stylesInjected) {
    const style = document.createElement("style");
    style.id = "smart-badge-styles";
    style.textContent = BADGE_STYLES;
    document.head.appendChild(style);
    _stylesInjected = true;
  }
}

// ─── SmartBadge Component ─────────────────────────────────────────────────────

/**
 * SmartBadge — renders one of five product badge types with realistic SVG effects.
 * Responsive sizing via `size` prop (sm, md, lg).
 */
export const SmartBadge: React.FC<SmartBadgeProps> = React.memo(({
  text,
  type,
  variant = "red",
  size = "md",
  className = "",
  onClick,
  onKeyDown,
  ariaLabel,
  disabled = false,
}) => {
  // Inject styles once
  React.useEffect(() => {
    injectStyles();
  }, []);

  // Unique ID for gradients/filters
  const reactId = useId();
  const uid = `sb_${type}_${variant}_${reactId}`;
  const scale = SIZE_SCALE[size];
  const theme = THEMES[variant];

  // Build class names
  const typeClass = `sb-${type}`;
  const disabledClass = disabled ? "sb-disabled" : "";
  const cls = cn(typeClass, disabledClass, className);

  // Accessibility
  const isInteractive = !!onClick && !disabled;
  const label = ariaLabel || text.replace("\n", " ");

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    } else if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
    }
  };

  const renderBadge = () => {
    const props = { text, theme, uid, scale, disabled };
    switch (type) {
      case "ribbon":  return <Ribbon  {...props} />;
      case "flag":    return <Flag    {...props} />;
      case "seal":    return <Seal    {...props} />;
      case "sticker": return <Sticker {...props} />;
      case "burst":   return <Burst   {...props} />;
      default:        return null;
    }
  };

  return (
    <span
      className={cn('absolute',cls)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : "img"}
      aria-label={label}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {renderBadge()}
    </span>
  );
});

SmartBadge.displayName = "SmartBadge";

export default SmartBadge;