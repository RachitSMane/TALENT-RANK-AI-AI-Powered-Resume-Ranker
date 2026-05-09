import { useRef, useEffect } from 'react';

interface TextMask {
  mask: boolean[][];
  dist: number[][];
  width: number;
  height: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(a: number[], b: number[], t: number): number[] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function generateTextMask(cellSize: number): TextMask {
  const cols = 20;
  const rows = 20;
  const canvasWidth = cellSize * cols;
  const canvasHeight = cellSize * rows;

  const offscreen = document.createElement('canvas');
  offscreen.width = canvasWidth;
  offscreen.height = canvasHeight;
  const ctx = offscreen.getContext('2d')!;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'white';
  ctx.font = `bold ${cellSize * 4}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RANK', canvasWidth / 2, canvasHeight / 2);

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const data = imageData.data;

  const mask: boolean[][] = [];
  for (let r = 0; r < rows; r++) {
    mask[r] = [];
    for (let c = 0; c < cols; c++) {
      const px = Math.floor(c * cellSize + cellSize / 2);
      const py = Math.floor(r * cellSize + cellSize / 2);
      const idx = (py * canvasWidth + px) * 4;
      mask[r][c] = data[idx] > 128;
    }
  }

  // Compute distance field
  const dist: number[][] = [];
  for (let r = 0; r < rows; r++) {
    dist[r] = [];
    for (let c = 0; c < cols; c++) {
      if (mask[r][c]) {
        dist[r][c] = 0;
      } else {
        let minD = Infinity;
        for (let rr = 0; rr < rows; rr++) {
          for (let cc = 0; cc < cols; cc++) {
            if (mask[rr][cc]) {
              const d = Math.sqrt((r - rr) * (r - rr) + (c - cc) * (c - cc));
              if (d < minD) minD = d;
            }
          }
        }
        dist[r][c] = minD === Infinity ? 20 : minD;
      }
    }
  }

  return { mask, dist, width: cols, height: rows };
}

export default function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const textMaskRef = useRef<TextMask | null>(null);
  const timeRef = useRef(0);
  const needsUpdateRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d')!;
    const GRID_SIZE = 80;
    const cycleDuration = 15000;

    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let cellSize = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cellSize = width / GRID_SIZE;
      textMaskRef.current = generateTextMask(cellSize);
      needsUpdateRef.current = true;
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function getTextDataVal(x: number, y: number): { letter: boolean; d: number } {
      const tm = textMaskRef.current;
      if (!tm) return { letter: false, d: 20 };
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      if (row < 0 || row >= tm.height || col < 0 || col >= tm.width) {
        return { letter: false, d: 20 };
      }
      return { letter: tm.mask[row][col], d: tm.dist[row][col] };
    }

    let lastTimestamp = 0;

    function render(timestamp: number) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      timeRef.current += deltaTime * 0.001;
      const time = timeRef.current;
      const cycleTime = time % cycleDuration;
      const cycleProgress = cycleTime / cycleDuration;

      // Clear
      ctx.fillStyle = '#0A0E1A';
      ctx.fillRect(0, 0, width, height);

      // Phase parameters
      let textRadius: number;
      let textOffsetX: number;
      let waveAmp: number;

      const p1 = 6 / 15; // 0.4
      const p2 = 10 / 15; // ~0.667

      if (cycleProgress < p1) {
        // Phase 1: Text formation
        const t = easeInOutCubic(cycleProgress / p1);
        textRadius = lerp(30 * cellSize, 2 * cellSize, t);
        textOffsetX = lerp(-10 * cellSize, 0, t);
        waveAmp = 0;
      } else if (cycleProgress < p2) {
        // Phase 2: Wave transition
        const t = easeInOutQuart((cycleProgress - p1) / (p2 - p1));
        textRadius = 2 * cellSize;
        textOffsetX = lerp(0, 40 * cellSize, t);
        waveAmp = lerp(0, cellSize * 8, t);
      } else {
        // Phase 3: Continuous wave
        const t = easeInOutCubic((cycleProgress - p2) / (1 - p2));
        textRadius = 2 * cellSize;
        textOffsetX = lerp(40 * cellSize, 100 * cellSize, t);
        waveAmp = cellSize * 8;
      }

      if (cycleTime < 0.1) {
        needsUpdateRef.current = true;
      }

      const dotRadius = cellSize * 0.18;
      const mouse = mouseRef.current;
      const mouseRadius = 15 * cellSize;
      const mouseStrength = cellSize * 6;

      // Batch draw all dots
      ctx.save();

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const baseX = col * cellSize;
          const baseY = row * cellSize;

          let x = baseX;
          let y = baseY;
          let radius = dotRadius;
          let t = 0;

          const ph = Math.atan2(row - 40, col - 40);

          // Text formation
          const tox = textOffsetX;
          const toy = 0;
          const { letter, d } = getTextDataVal(baseX - tox, baseY - toy);

          if (letter && d < textRadius && cycleProgress < p2) {
            const dispersion = d / textRadius;
            const tx = baseX + textRadius * Math.cos(ph);
            const ty = baseY + textRadius * Math.sin(ph) * 0.5;
            x = lerp(baseX, tx, dispersion);
            y = lerp(baseY, ty, dispersion);
            radius = lerp(dotRadius * 0.5, dotRadius * 0.2, dispersion);
            t = Math.sin(ph * 3 + time * 1.5) * (1 - dispersion);
          }

          // Wave displacement
          if (waveAmp > 0) {
            const wave1 = Math.cos(col * 0.1 + time * 1.5);
            const wave2 = Math.cos(row * 0.1 + time * 1.2);
            const wave = (wave1 + wave2) * waveAmp;
            y += wave;
            t = (wave1 + wave2) * 0.5;
          }

          // Mouse repulsion
          if (waveAmp > 0 && mouse.active) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius && dist > 0) {
              const falloff = Math.max(0, 1 - dist / mouseRadius);
              x -= (dx / dist) * falloff * mouseStrength;
              y -= (dy / dist) * falloff * mouseStrength;
              t += falloff * 0.8;
            }
          }

          // Color from t
          let color: number[];
          if (t < 0) {
            color = lerpColor([10, 20, 50], [10, 36, 99], t + 1);
          } else {
            color = lerpColor([10, 36, 99], [0, 212, 255], t);
          }
          const opacity = 0.6 + 0.4 * Math.abs(t);

          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.min(1, opacity)})`;
          ctx.fill();
        }
      }

      ctx.restore();

      // Vignette overlay
      const vignetteGrad = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.2,
        width / 2, height / 2, width * 0.7
      );
      vignetteGrad.addColorStop(0, 'rgba(10, 14, 26, 0.3)');
      vignetteGrad.addColorStop(1, 'rgba(10, 14, 26, 0.6)');
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // Mouse glow
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 20 * cellSize
        );
        glowGrad.addColorStop(0, 'rgba(0, 212, 255, 0.15)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      }

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
