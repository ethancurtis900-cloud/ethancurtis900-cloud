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
    ? 'group inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-black/20 hover:shadow-black/30 hover:scale-105'
    : 'inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-2xl shadow-black/20';

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
