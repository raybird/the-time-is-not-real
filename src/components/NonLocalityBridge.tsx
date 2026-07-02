import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number; // 0 to 100
  y: number; // 0 to 100
  color: string;
}

export const NonLocalityBridge: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isFolded, setIsFolded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate particles on mount
  useEffect(() => {
    const list: Particle[] = [
      { id: 1, x: 20, y: 30, color: 'var(--color-blue)' },
      { id: 2, x: 80, y: 70, color: 'var(--color-pink)' },
      { id: 3, x: 45, y: 20, color: 'var(--color-purple)' },
      { id: 4, x: 15, y: 75, color: 'var(--color-green)' },
      { id: 5, x: 75, y: 25, color: 'var(--color-blue)' },
      { id: 6, x: 50, y: 80, color: 'var(--color-purple)' },
    ];
    setParticles(list);
  }, []);

  const handleParticleClick = (id: number) => {
    if (isAnimating || isFolded) return;
    
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace the oldest selection
        setSelectedIds([selectedIds[1], id]);
      }
    }
  };

  const handleFold = () => {
    if (selectedIds.length !== 2 || isAnimating) return;
    
    setIsAnimating(true);
    setIsFolded(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setIsFolded(false);
    setTimeout(() => {
      setSelectedIds([]);
      setIsAnimating(false);
    }, 1200);
  };

  const p1 = particles.find(p => p.id === selectedIds[0]);
  const p2 = particles.find(p => p.id === selectedIds[1]);

  // Center coordinate for folding
  const centerX = 50;
  const centerY = 50;

  return (
    <div className="flex flex-col h-full justify-between p-4">
      {/* Description */}
      <div className="text-xs text-text-secondary mb-2 leading-relaxed">
        <p className="font-semibold text-gradient-blue mb-1">ER = EPR 宇宙量子通道</p>
        <p className="text-muted">請在下方虛擬時空點選**任意兩個量子粒子**，並點擊下方「折疊空間」，觀察兩者在底層資訊維度實為「同一個點」的非定域塌縮。</p>
      </div>

      {/* SVG Canvas Area */}
      <div 
        className="relative flex-1 rounded-xl border border-[hsla(225,30%,60%,0.1)] bg-[hsla(230,35%,3%,0.6)] overflow-hidden min-h-[220px]"
        style={{
          boxShadow: isFolded ? 'inset 0 0 30px rgba(138, 43, 226, 0.15)' : 'none'
        }}
      >
        <svg className="w-full h-full absolute inset-0">
          <defs>
            {/* Wormhole Glow */}
            <radialGradient id="wormholeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.8" />
              <stop offset="30%" stopColor="var(--color-blue)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            {/* Linear Glow for Connection Line */}
            <linearGradient id="wormholeLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-blue)" />
              <stop offset="50%" stopColor="var(--color-purple)" />
              <stop offset="100%" stopColor="var(--color-pink)" />
            </linearGradient>
          </defs>

          {/* Grid Background lines */}
          <g stroke="hsla(225, 20%, 40%, 0.05)" strokeWidth="1">
            {[...Array(10)].map((_, i) => (
              <line key={`h-${i}`} x1="0%" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`v-${i}`} x1={`${i * 10}%`} y1="0%" x2={`${i * 10}%`} y2="100%" />
            ))}
          </g>

          {/* Draw Wormhole Portal at Center when folded */}
          {isFolded && (
            <circle
              cx={`${centerX}%`}
              cy={`${centerY}%`}
              r={isAnimating ? "0" : "32"}
              fill="url(#wormholeGlow)"
              className="animate-pulse"
              style={{
                transition: 'r 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                animationDuration: '2s'
              }}
            />
          )}

          {/* Draw connection line between selected particles */}
          {p1 && p2 && !isFolded && (
            <line
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="url(#wormholeLine)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-70"
            />
          )}

          {/* Draw Tunnel (ER Bridge) during folding */}
          {p1 && p2 && isFolded && (
            <>
              {/* Path 1: Selected 1 to center */}
              <line
                x1={`${isAnimating ? p1.x : centerX}%`}
                y1={`${isAnimating ? p1.y : centerY}%`}
                x2={`${centerX}%`}
                y2={`${centerY}%`}
                stroke="var(--color-blue)"
                strokeWidth={isAnimating ? "3" : "1.5"}
                className="opacity-80"
                style={{ transition: 'all 1.2s cubic-bezier(0.76, 0, 0.24, 1)' }}
              />
              {/* Path 2: Selected 2 to center */}
              <line
                x1={`${isAnimating ? p2.x : centerX}%`}
                y1={`${isAnimating ? p2.y : centerY}%`}
                x2={`${centerX}%`}
                y2={`${centerY}%`}
                stroke="var(--color-pink)"
                strokeWidth={isAnimating ? "3" : "1.5"}
                className="opacity-80"
                style={{ transition: 'all 1.2s cubic-bezier(0.76, 0, 0.24, 1)' }}
              />
            </>
          )}

          {/* Draw Particles */}
          {particles.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            
            // Calculate coordinates based on folded state
            let currentX = p.x;
            let currentY = p.y;
            
            if (isFolded && isSelected) {
              // Collapsed to the center wormhole
              currentX = centerX;
              currentY = centerY;
            }

            // Hide other particles when folded
            const opacity = isFolded && !isSelected ? 0 : 1;

            return (
              <g 
                key={p.id}
                onClick={() => handleParticleClick(p.id)}
                className="cursor-pointer"
                style={{
                  transform: `translate(${currentX}%, ${currentY}%)`,
                  transition: 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s',
                  opacity: opacity
                }}
              >
                {/* Glow ring for selection */}
                {isSelected && (
                  <circle
                    r="12"
                    fill="none"
                    stroke={p.color}
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                    style={{ animationDuration: '2s' }}
                  />
                )}
                {/* Particle Core */}
                <circle
                  r={isSelected ? "6" : "5"}
                  fill={p.color}
                  stroke={isSelected ? "#fff" : "none"}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  style={{
                    filter: `drop-shadow(0 0 6px ${p.color})`
                  }}
                />
                
                {/* ID Tag */}
                {!isFolded && (
                  <text
                    y="-10"
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="8px"
                    fontFamily="monospace"
                  >
                    Ψ-{p.id}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Button controls */}
      <div className="flex gap-2 mt-3">
        {isFolded ? (
          <button
            onClick={handleReset}
            disabled={isAnimating}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium glass glass-interactive border-neon-purple text-center tracking-wider text-text-primary disabled:opacity-50"
          >
            重設空間 (Reset)
          </button>
        ) : (
          <button
            onClick={handleFold}
            disabled={selectedIds.length !== 2 || isAnimating}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 border border-transparent disabled:opacity-40 disabled:pointer-events-none text-text-primary shadow-lg"
            style={{
              background: selectedIds.length === 2 
                ? 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-purple) 100%)' 
                : 'var(--bg-panel)',
              border: selectedIds.length === 2 ? '1px solid var(--color-blue)' : '1px solid var(--border-light)',
              cursor: selectedIds.length === 2 ? 'pointer' : 'default',
              boxShadow: selectedIds.length === 2 ? 'var(--glow-blue)' : 'none'
            }}
          >
            折疊空間 (Fold Spacetime)
          </button>
        )}
      </div>
    </div>
  );
};
