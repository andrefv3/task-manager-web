interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress = ({ percentage, size = 120, strokeWidth = 10 }: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white/20"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{percentage}%</span>
    </div>
  );
};