interface SectionDividerProps {
  flip?: boolean;
  className?: string;
  fillColor?: string;
  bgColor?: string;
}

export default function SectionDivider({
  flip = false,
  className = '',
  fillColor = '#F7F5F2',
  bgColor = 'transparent',
}: SectionDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 80L1440 0V80H0Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
