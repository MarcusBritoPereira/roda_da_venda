import React from "react";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  score: number;
  max?: number;
  label?: string;
  className?: string;
  color?: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  score,
  max = 10,
  label,
  className,
  color = "var(--color-vulp-lilac)",
}) => {
  const percentage = (score / max) * 100;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || score) && (
        <div className="flex justify-between items-center px-1">
          {label && <span className="text-xs text-vulp-white font-medium">{label}</span>}
          <span className="text-xs font-bold text-vulp-white">{score.toFixed(1)}</span>
        </div>
      )}
      <div className="h-2 w-full bg-ui-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}88`,
          }}
        />
      </div>
    </div>
  );
};
