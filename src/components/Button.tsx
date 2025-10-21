import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <>
      <button
        className={`w-full h-12  bg-blue-500 text-white rounded-[12px] py-2 hover:bg-blue-600 transition hover:cursor-pointer disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
