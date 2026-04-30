import React from 'react';

interface Props {
  timeLeft: number;
  totalTime: number;
  accentColor: string;
}

const Timer: React.FC<Props> = ({ timeLeft, totalTime, accentColor }) => {
  const pct = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isCritical = timeLeft <= 5;
  const isLow = timeLeft <= 10;

  const barColor = isCritical ? '#ff0040' : isLow ? '#ffd700' : accentColor;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-cyber-dim tracking-widest">TEMPO</span>
        <span
          className={`font-orbitron text-xl ${isCritical ? 'timer-critical' : ''}`}
          style={{ color: barColor, textShadow: `0 0 8px ${barColor}` }}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full h-2 rounded" style={{ background: '#1a1a3a' }}>
        <div
          className="h-full rounded"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: `0 0 8px ${barColor}`,
            transition: 'width 1s linear, background 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
