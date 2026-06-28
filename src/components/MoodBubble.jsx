import FaceSvg from './FaceSvg';

export default function MoodBubble({ mood, size = 48, active = false, stroke }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: active ? mood.tone : mood.soft,
        boxShadow: active ? `0 8px 20px -6px ${mood.tone}88` : undefined,
        transform: active ? 'scale(1.06)' : undefined,
        transition: 'all .2s',
        flexShrink: 0,
      }}
    >
      <FaceSvg mood={mood} size={size} stroke={stroke ?? (active ? '#fff' : mood.tone)} />
    </span>
  );
}
