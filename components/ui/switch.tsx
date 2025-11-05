"use client";

import { cn } from "@/lib/utils/utils"; 

interface TailwindSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const TailwindSwitch = ({ checked, onChange, disabled = false }: TailwindSwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer focus:outline-none",
        disabled
          ? "bg-gray-200 cursor-not-allowed opacity-60"
          : checked
          ? "bg-violet-500 hover:bg-violet-600"
          : "bg-gray-300 hover:bg-gray-400"
      )}
    >
      <span
       className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1",
          disabled && "bg-gray-100"
        )}
      />
    </button>
  );
};

export default TailwindSwitch;
