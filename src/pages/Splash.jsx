import { useApp } from '../context/AppContext';

export default function Splash() {
  const { set } = useApp();
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 44,
      padding: '48px 32px',
      background: 'linear-gradient(160deg,var(--breeze),var(--mist) 72%,var(--breeze50))',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: .5,
        background: 'radial-gradient(120% 90% at 12% -10%,rgba(255,255,255,.55),transparent 60%),radial-gradient(120% 80% at 95% 0%,rgba(255,142,115,.26),transparent 55%)' }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
        <div style={{ font: '800 48px/1 var(--font)', color: '#fff', letterSpacing: '-2px' }}>나루</div>
        <div style={{ font: '500 16px/1.5 var(--font)', color: 'rgba(255,255,255,.92)' }}>마음이 흐르는 곳, 나루</div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => set({ slide: 0, screen: 'slides' })}
          style={{ width: '100%', height: 52, borderRadius: 12, border: 'none', background: '#fff', color: 'var(--breezeDeep)', font: '600 16px/1 var(--font)', cursor: 'pointer' }}
        >
          시작하기
        </button>
        <button
          onClick={() => set({ slide: 0, screen: 'slides' })}
          style={{ width: '100%', height: 52, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,.18)', color: '#fff', font: '600 16px/1 var(--font)', cursor: 'pointer' }}
        >
          이미 계정이 있어요
        </button>
      </div>
    </div>
  );
}
