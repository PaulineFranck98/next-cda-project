"use client";

import { cn } from "@/lib/utils/utils"; 

interface TailwindSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TailwindSwitch = ({ checked, onChange }: TailwindSwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer",
        checked ? "bg-violet-500" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

export default TailwindSwitch;
