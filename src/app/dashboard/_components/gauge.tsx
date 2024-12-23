import { formatCurrency } from "@/helpers";
import React from "react";

interface GaugeProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  textColor: string;
  classNames?: string;
}

const Gauge = ({
  value,
  maxValue = 1000000,
  strokeWidth = 60,
  primaryColor = "#ff5c00",
  secondaryColor = "#e0e0e0",
  textColor = "#222",
  classNames = "",
}: GaugeProps) => {
  const calculateDimensions = (size: number) => {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    return { radius, center, circumference };
  };

  const defaultSize = 600;
  const { radius, center, circumference } = calculateDimensions(defaultSize);
  // Calculate the arc length based on the value
  const percentage = Math.min(Math.max(value / maxValue, 0), 1);
  const arcLength = circumference * percentage;

  //   Calculate the dash offset to show only half circle
  const dashOffset = circumference * 0.75;
  return (
    <div
      className={`w-full h-[5rem] sm:h-[10rem] md:h-[12.5rem] max-w-5xl mx-auto ${classNames}`}
    >
      <div className="w-full aspect-[2/1]">
        <svg
          viewBox={`0 0 ${defaultSize} ${defaultSize}`}
          className="w-full h-full transform -rotate-90 border-red-600"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            className="transition-all duration-300 ease-in-out"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset + (circumference - arcLength) / 2}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
          <g className="transform rotate-90">
            <text
              x={150}
              y={-250}
              textAnchor="center"
              dominantBaseline="middle"
              stroke="none"
              fill={textColor}
              className="text-5xl font-semibold"
            >
              {formatCurrency(value)}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Gauge;
