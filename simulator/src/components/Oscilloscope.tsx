import React, { useRef, useEffect } from 'react';

interface OscilloscopeProps {
  frequency: number; // 0 to 100
  state: 'physical' | 'information' | 'consciousness';
  color: string;
}

export const Oscilloscope: React.FC<OscilloscopeProps> = ({
  frequency,
  state,
  color
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || 300) * window.devicePixelRatio;
      canvas.height = (rect?.height || 100) * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Background Grid
      ctx.strokeStyle = 'hsla(225, 20%, 40%, 0.08)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let i = 1; i < 4; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Vertical lines
      for (let i = 1; i < 8; i++) {
        const x = (width / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw baseline
      ctx.beginPath();
      ctx.strokeStyle = 'hsla(225, 20%, 40%, 0.15)';
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw wave
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;

      const baseFreq = (frequency / 100) * 0.15 + 0.01;
      phaseRef.current += 0.05 + (frequency / 100) * 0.05;

      for (let x = 0; x < width; x++) {
        let y = height / 2;

        if (state === 'physical') {
          // Pure sine wave
          const amplitude = height * 0.3;
          y += Math.sin(x * baseFreq + phaseRef.current) * amplitude;
        } else if (state === 'information') {
          // Sine wave with digital noise / step effect
          const amplitude = height * 0.25;
          const sine = Math.sin(x * baseFreq + phaseRef.current);
          // Quantize the sine wave to make it look "digital/binary"
          const steps = 6;
          const quantized = Math.round(sine * steps) / steps;
          // Add small high frequency quantum jitter
          const noise = (Math.random() - 0.5) * 4;
          y += quantized * amplitude + noise;
        } else {
          // Consciousness: multiple interfering harmonics
          const amp1 = height * 0.2;
          const amp2 = height * 0.1;
          const amp3 = height * 0.08;
          
          const wave1 = Math.sin(x * baseFreq + phaseRef.current);
          const wave2 = Math.sin(x * (baseFreq * 2.5) - phaseRef.current * 0.7);
          const wave3 = Math.cos(x * (baseFreq * 0.5) + phaseRef.current * 0.3);
          
          y += (wave1 * amp1) + (wave2 * amp2) + (wave3 * amp3);
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw mini frequency tag in corner
      ctx.fillStyle = 'hsla(225, 15%, 75%, 0.4)';
      ctx.font = '9px monospace';
      ctx.fillText(`STATUS: LOCKED | STATE: ${state.toUpperCase()}`, 10, 16);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [frequency, state, color]);

  return (
    <div className="w-full h-24 rounded-lg overflow-hidden border border-[hsla(225,30%,60%,0.1)] bg-[hsla(230,35%,4%,0.8)] shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
