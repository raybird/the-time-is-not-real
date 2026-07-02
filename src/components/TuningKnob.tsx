import React, { useState, useRef, useEffect } from 'react';

interface TuningKnobProps {
  frequency: number; // 0 to 100
  onChange: (freq: number) => void;
  colorClass?: string;
}

export const TuningKnob: React.FC<TuningKnobProps> = ({
  frequency,
  onChange,
  colorClass = 'var(--color-blue)'
}) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(-135); // Initial angle corresponding to 0% (-135 to 135 deg)

  // Map frequency (0-100) to Angle (-135 to 135)
  useEffect(() => {
    if (!isDragging) {
      const newAngle = (frequency / 100) * 270 - 135;
      setAngle(newAngle);
    }
  }, [frequency, isDragging]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !knobRef.current) return;

      const rect = knobRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      // Calculate angle in degrees
      let rad = Math.atan2(dy, dx);
      let deg = rad * (180 / Math.PI);

      // Rotate 90 degrees to align 12 o'clock to 0 deg
      deg = deg + 90;
      if (deg < 0) deg += 360;

      // Map rotation to knob range:
      // Minimum: 225 deg (representing -135 deg from top)
      // Maximum: 135 deg (representing +135 deg from top)
      // Standard range is from 225 deg (clockwise through 0) to 135 deg.
      
      // Adjust angle range for easier mapping
      // Shift deg so min (225) is 0 and max (135) is 270
      let shifted = deg - 225;
      if (shifted < 0) shifted += 360;

      if (shifted <= 270) {
        // Within active range
        const progress = shifted / 270;
        const newFreq = Math.round(progress * 100);
        onChange(newFreq);
        setAngle(shifted - 135);
      } else if (shifted > 270 && shifted < 315) {
        // Snap to maximum
        onChange(100);
        setAngle(135);
      } else {
        // Snap to minimum
        onChange(0);
        setAngle(-135);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, onChange]);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div 
        ref={knobRef}
        className="knob-container flex items-center justify-center"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{
          width: '130px',
          height: '130px',
        }}
      >
        {/* Outer Ring glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid hsla(225, 20%, 40%, 0.2)',
            background: 'radial-gradient(circle, transparent 50%, hsla(225, 20%, 10%, 0.6) 100%)',
          }}
        />
        
        {/* Tick Marks */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(11)].map((_, i) => {
            const tickAngle = i * 27 - 135;
            const isActive = (i / 10) * 100 <= frequency;
            return (
              <div
                key={i}
                className="absolute w-1 h-3 rounded-full origin-bottom"
                style={{
                  bottom: '50%',
                  left: 'calc(50% - 2px)',
                  transform: `rotate(${tickAngle}deg) translateY(-54px)`,
                  backgroundColor: isActive ? colorClass : 'hsla(225, 10%, 40%, 0.3)',
                  boxShadow: isActive ? `0 0 8px ${colorClass}` : 'none',
                  transition: 'background-color 0.2s, box-shadow 0.2s',
                  width: '4px',
                  height: '8px'
                }}
              />
            );
          })}
        </div>

        {/* Knob Body */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, hsl(230, 25%, 18%) 0%, hsl(230, 30%, 10%) 100%)',
            border: `2px solid ${isDragging ? colorClass : 'hsla(225, 20%, 50%, 0.3)'}`,
            boxShadow: isDragging 
              ? `0 0 25px ${colorClass}40, inset 0 2px 10px hsla(0,0%,100%,0.1)`
              : 'inset 0 2px 10px hsla(0,0%,100%,0.05), 0 10px 20px rgba(0,0,0,0.4)',
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s'
          }}
        >
          {/* Finger Indent / Pointer Dot */}
          <div 
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: '12px',
              backgroundColor: colorClass,
              boxShadow: `0 0 10px ${colorClass}`,
            }}
          />

          {/* Inner Cap */}
          <div 
            className="w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(230, 25%, 15%) 0%, hsl(230, 35%, 6%) 100%)',
              border: '1px solid hsla(0, 0%, 0%, 0.5)'
            }}
          />
        </div>
      </div>
      
      {/* Readout */}
      <div className="mt-3 font-mono text-sm tracking-widest flex flex-col items-center">
        <span className="text-xs uppercase text-muted tracking-wider mb-1">意識定錨頻率</span>
        <span 
          className="text-2xl font-bold tracking-wider"
          style={{ 
            color: colorClass,
            textShadow: `0 0 10px ${colorClass}50`
          }}
        >
          {frequency.toFixed(1)} <span className="text-xs">Hz</span>
        </span>
      </div>
    </div>
  );
};
