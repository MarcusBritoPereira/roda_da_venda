"use client";

import React from "react";

interface RadarWheelProps {
  scores: number[];
  labels: string[];
  size?: number;
  scoresCompare?: number[];
}

export const RadarWheel: React.FC<RadarWheelProps> = ({
  scores,
  labels,
  size = 300,
  scoresCompare,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = labels.length;

  const polar = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const rings = [2, 4, 6, 8, 10].map((v) => {
    const rr = (r * v) / 10;
    const pts = Array.from({ length: n }, (_, i) =>
      polar((i * 360) / n, rr).join(",")
    ).join(" ");
    return (
      <polygon
        key={v}
        points={pts}
        fill="none"
        stroke="var(--color-ui-border)"
        strokeWidth={v === 6 ? 1.5 : 1}
      />
    );
  });

  const spokes = Array.from({ length: n }, (_, i) => {
    const [x, y] = polar((i * 360) / n, r);
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke="var(--color-ui-border)"
        strokeWidth={1}
      />
    );
  });

  const scorePts = scores
    .map((s, i) => polar((i * 360) / n, (r * s) / 10).join(","))
    .join(" ");

  const scoreDots = scores.map((s, i) => {
    const [x, y] = polar((i * 360) / n, (r * s) / 10);
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size > 150 ? 4 : 3}
        fill="var(--color-vulp-lilac)"
        className="drop-shadow-[0_0_8px_rgba(205,130,255,0.8)]"
      />
    );
  });

  const compareArea = scoresCompare ? (
    <polygon
      points={scoresCompare
        .map((s, i) => polar((i * 360) / n, (r * s) / 10).join(","))
        .join(" ")}
      fill="var(--color-status-dismiss)"
      fillOpacity={0.1}
      stroke="var(--color-status-dismiss)"
      strokeWidth={1}
      strokeDasharray="4,2"
    />
  ) : null;

  const labelEls = labels.map((label, i) => {
    const [x, y] = polar((i * 360) / n, r + 28);
    const anchor = x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle";
    return (
      <text
        key={i}
        x={x}
        y={y + 4}
        textAnchor={anchor}
        fill="var(--color-ui-muted)"
        fontSize={size > 200 ? 10 : 8}
        className="font-bold uppercase tracking-wider"
      >
        {label}
      </text>
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {rings}
      {spokes}
      {compareArea}
      <polygon
        points={scorePts}
        fill="var(--color-vulp-electric)"
        fillOpacity={0.25}
        stroke="var(--color-vulp-lilac)"
        strokeWidth={2}
        className="transition-all duration-700"
      />
      {scoreDots}
      <circle cx={cx} cy={cy} r={4} fill="var(--color-vulp-lilac)" />
      {labelEls}
    </svg>
  );
};
