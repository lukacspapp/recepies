'use client'

export default function Shimmer({ w, h, theme }: { w: number; h: number; theme?: string }) {
  return (
    <svg className="rounded-md" width={w} height={h} version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect id="r" width={w} height={h} fill={theme === "dark" ? "#171717" : "#e2e8f0"} />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
    </svg>
  )
}