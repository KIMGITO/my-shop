import React from "react";

interface BadgeProps {
  text: string;
  type: "ribbon" | "flag" | "seal";
  variant?: "red" | "purple" | "green";
  scale?: string;
}

export const SmartBadge: React.FC<BadgeProps> = ({ 
  text, 
  type, 
  variant = "red", 
  scale = "scale-100" 
}) => {
  
  const themes = {
    red: { 
      primary: "#dc2626", 
      dark: "#7f1d1d", 
      light: "#fecaca",
      glow: "rgba(220, 38, 38, 0.4)"
    },
    purple: { 
      primary: "#9333ea", 
      dark: "#581c87", 
      light: "#e9d5ff",
      glow: "rgba(147, 51, 234, 0.4)"
    },
    green: { 
      primary: "#16a34a", 
      dark: "#064e3b", 
      light: "#bbf7d0",
      glow: "rgba(22, 163, 74, 0.4)"
    },
  };

  const theme = themes[variant];

  // Common Wrapper Style for the "Peel" Animation
  const wrapperClass = `absolute z-30 transition-all duration-500 ease-out transform cursor-default select-none
    hover:scale-110 hover:-rotate-3 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_${theme.glow}] ${scale}`;

  // 1. THE 3D WRAPPED RIBBON
  if (type === "ribbon") {
    return (
      <div className={`${wrapperClass} top-5 -left-3`}>
        <svg width="130" height="50" viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow-ribbon"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dx="0" dy="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* Under-fold Shadow (Behind the card) */}
          <path d="M0 8 L12 0 V8 Z" fill={theme.dark} />
          {/* Main Ribbon Body */}
          <g filter="url(#shadow-ribbon)">
            <path d="M0 8 H115 L125 22 L115 36 H0 V8 Z" fill={theme.primary} />
            <path d="M0 9 H113" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
          </g>
          <text x="55" y="26" fill="white" fontSize="11" fontWeight="900" fontStyle="italic" textAnchor="middle" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.3)' }}>
            {text.toUpperCase()}
          </text>
        </svg>
      </div>
    );
  }

  // 2. THE HANGING STRING TAG
  if (type === "flag") {
    return (
      <div className={`${wrapperClass} top-0 left-8 origin-top animate-tag-swing`}>
        <svg width="60" height="110" viewBox="0 0 60 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Braided String Effect */}
          <path d="M30 0 V30" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 3"/>
          <circle cx="30" cy="30" r="4" fill="white" stroke="#d1d5db" strokeWidth="1" />
          {/* Tag Body */}
          <path d="M5 30 H55 V95 L30 82 L5 95 V30 Z" fill={theme.primary} />
          {/* Top Texture Shadow */}
          <path d="M5 30 H55 V35 H5 V30 Z" fill="black" fillOpacity="0.15" />
          <text x="30" y="52" fill="white" fontSize="10" fontWeight="900" textAnchor="middle">
            {text.split(' ')[0]}
          </text>
          <text x="30" y="65" fill="white" fontSize="10" fontWeight="900" textAnchor="middle">
            {text.split(' ')[1] || ''}
          </text>
        </svg>
      </div>
    );
  }

  // 3. THE PEELING SEAL (Circular Sticker)
  if (type === "seal") {
    return (
      <div className={`${wrapperClass} top-4 left-4 group`}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`gloss-${variant}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="black" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          {/* Main Circle */}
          <circle cx="40" cy="40" r="36" fill={theme.primary} stroke="white" strokeWidth="3" />
          {/* Gloss/Volume Layer */}
          <circle cx="40" cy="40" r="36" fill={`url(#gloss-${variant})`} />
          {/* Inner Detail Ring */}
          <circle cx="40" cy="40" r="28" stroke="white" strokeOpacity="0.3" strokeDasharray="4 2" />
          {/* Text */}
          <text x="40" y="44" fill="white" fontSize="10" fontWeight="900" textAnchor="middle" style={{ textShadow: '0px 2px 3px rgba(0,0,0,0.4)' }}>
            {text.toUpperCase()}
          </text>
        </svg>
      </div>
    );
  }

  return null;
};