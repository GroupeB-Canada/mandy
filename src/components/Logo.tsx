export default function Logo({ size = 40 }: { size?: number }) {
  const s = size
  const cx = s / 2, cy = s * 0.45
  const hx = s * 0.5, hy = s * 0.82
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#CC1418"/>
          <stop offset="100%" stopColor="#6E0608"/>
        </linearGradient>
      </defs>
      <path fill="url(#hg)" d={`M${cx},${hy} C${cx*0.75},${hy*0.88} ${s*0.1},${hy*0.7} ${s*0.1},${cy} C${s*0.1},${cy*0.62} ${s*0.27},${cy*0.44} ${cx*0.75},${cy*0.44} C${cx*0.94},${cy*0.44} ${cx},${cy*0.58} ${cx},${cy*0.75} C${cx},${cy*0.58} ${s*0.56},${cy*0.44} ${s*0.75},${cy*0.44} C${s*0.9},${cy*0.44} ${s*0.9},${cy*0.62} ${s*0.9},${cy} C${s*0.9},${hy*0.7} ${cx*1.25},${hy*0.88} ${cx},${hy} Z`}/>
      <text x={cx} y={cy*1.3} textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="-apple-system,sans-serif" fontWeight="700" fontSize={s*0.38}>M</text>
    </svg>
  )
}
