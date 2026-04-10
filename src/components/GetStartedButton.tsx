import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GetStartedButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

export function GetStartedButton({ variant = 'primary', className = '', children }: GetStartedButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/get-started');
  };

  const baseStyles = variant === 'primary'
    ? 'group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105'
    : 'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white px-10 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/40';

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${className}`}
    >
      {children || 'Get Started'}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
