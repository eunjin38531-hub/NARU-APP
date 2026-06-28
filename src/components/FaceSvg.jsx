export default function FaceSvg({ mood, size = 48, stroke = '#fff' }) {
  const s = size * 0.6;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none"
      stroke={stroke} strokeWidth="3" strokeLinecap="round">
      <circle cx="18" cy="22" r=".5" />
      <circle cx="30" cy="22" r=".5" />
      <path d={mood.mouth} />
    </svg>
  );
}
