import { useId } from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-10 h-10" }: LogoProps) {
  const gradientId = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="10" fill={`url(#${gradientId})`} />
      <path
        d="M12 32V16L18 22L24 16L30 22L36 16V32"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="22" r="1.5" fill="white"/>
      <circle cx="24" cy="16" r="1.5" fill="white"/>
      <circle cx="30" cy="22" r="1.5" fill="white"/>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981"/>
          <stop offset="1" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
