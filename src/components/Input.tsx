"use client";

import React, { InputHTMLAttributes, useState, useId, forwardRef } from "react";
import Icon from "./Icon";

type InputType = "text" | "email" | "password";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  error?: string;
  errorClassName?: string;
  type: InputType;
  label?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    placeholder = "",
    className,
    error,
    errorClassName,
    type,
    label,
    labelClassName,
    ...props
  },
  ref
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;
  const id = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className={`text-md mb-4 text-blue-900 md:mb-5 md:text-lg lg:text-xl ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`bg-blue-200 rounded-[12px] text-black outline-black-600 h-[44px] w-full pl-4 text-lg placeholder:text-blue-400 lg:h-[64px] lg:text-xl ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
          >
            <span className="sr-only">
              {isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
            </span>
            {isPasswordVisible ? (
              <Icon name="eyeOn" className="text-gray-500" />
            ) : (
              <Icon name="eyeOff" className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && (
        <span
          className={`text-red-600 md:text-md mt-2 ml-2 text-xs lg:text-lg ${errorClassName}`}
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
