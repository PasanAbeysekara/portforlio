import Image from 'next/image';

interface CustomLogoProps {
  size?: number;
  className?: string;
}

export default function CustomLogo({ size = 32, className = '' }: CustomLogoProps) {
  return (
    <Image
      src="/logo-pasan.png"
      alt="Logo"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}
