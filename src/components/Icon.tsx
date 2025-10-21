import { SVGProps } from "react";
import { iconPaths } from "./Icon.path";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  name: keyof typeof iconPaths;
}

export default function Icon({
  size = 24,
  color,
  name,
  className,
  ...props
}: IconProps) {
  if (!(name in iconPaths)) {
    console.warn(`${name}은 존재하지 않는 아이콘입니다.`);
    return null;
  }

  const path = iconPaths[name];

  return (
    <svg
      width={size}
      color={color}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`aspect-square ${className}`}
      {...props}
    >
      {path}
    </svg>
  );
}
