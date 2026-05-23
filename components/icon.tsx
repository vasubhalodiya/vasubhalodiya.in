import Image from "next/image";

interface IconProps {
  icon: string;
  size?: number;
  className?: string;
}

export function Icon({ icon, size = 20, className = "" }: IconProps) {
  // Append .svg extension if not already present
  const iconName = icon.endsWith(".svg") ? icon : `${icon}.svg`;
  const src = `/assets/icons/${iconName}`;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${icon} icon`}
        width={size}
        height={size}
        className="size-full object-contain"
      />
    </div>
  );
}
