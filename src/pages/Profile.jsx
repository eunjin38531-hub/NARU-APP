import { useApp } from '../context/AppContext';

function RowItem({ icon, label, sub, danger }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
      <span style={{ width: 36, height: 36, borderRadius: 12, background: danger ? 'var(--coralSoft)' : 'var(--bgSub)', display: 'grid', placeItems: 'center', color: danger ? 'var(--coralDeep)' : 'var(--text2)', flexShrink: 0, fontSize: 18 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ font: `${danger ? '500' : '400'} 16px/24px var(--font)`, color: danger ? 'var(--coralDeep)' : 'var(--text)' }}>{label}</div>
      </div>
      {sub && <span style={{ font: '400 14px/22px var(--font)', color: 'var(--faint)' }}>{sub}</span>}
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} style={{ width: 50, height: 30, borderRadius: 999, background: on ? 'var(--breeze)' : 'var(--border)', position: 'relative', border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'background .2s' }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 24, height: 24, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,.2)', transition: 'left .22s cubic-bezier(.22,1,.36,1)' }} />
    </button>
  );
}

export default function Profile() {
  const { state, set, go } = useApp();

  return (
    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bgSoft)' }}>
      {/* Header wave */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg,var(--breeze) 0%,var(--mist) 58%,var(--breeze50) 120%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .5, background: 'radial-gradient(120% 90% at 12% -10%,rgba(255,255,255,.55),transparent 60%)' }} />
        <div style={{ position: 'relative', padding: '47px 20px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 8px 20px -8px rgba(0,0,0,.25)', font: '700 24px/32px var(--font)', color: 'var(--breezeDeep)' }}>{state.name[0]}</span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 20px/28px var(--font)', letterSpacing: '-.015em', color: '#fff' }}>{state.name}님</div>
            <div style={{ font: '500 14px/22px var(--font)', color: 'rgba(255,255,255,.9)', marginTop: 4 }}>나루와 함께 마음을 들여다보고 있어요</div>
          </div>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 18, cursor: 'pointer' }}>✏️</span>
        </div>
      </div>

      <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Activity */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--breeze50)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--breezeDeep)', fontSize: 22 }}>✨</span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 16px/24px var(--font)' }}>이번 주, 네 번 곁에 머물렀어요</div>
            <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', marginTop: 3 }}>잠시 들렀다 가도, 오래 머물러도 괜찮아요</div>
          </div>
        </div>

        {/* Mood management */}
        <div>
          <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', padding: '0 6px 8px' }}>마음 관리</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', overflow: 'hidden' }}>
            <RowItem icon="🔔" label="알림 설정" sub="매일 저녁 9시" />
            <div style={{ height: 1, background: 'var(--borderSoft)', margin: '0 16px' }} />
            <RowItem icon="🎯" label="나의 마음 목표" sub="주 5회 기록" />
          </div>
        </div>

        {/* App settings */}
        <div>
          <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', padding: '0 6px 8px' }}>앱 설정</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
              <span style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--bgSub)', display: 'grid', placeItems: 'center', color: 'var(--text2)', flexShrink: 0, fontSize: 18 }}>🌙</span>
              <div style={{ flex: 1, font: '400 16px/24px var(--font)' }}>다크 모드</div>
              <Toggle on={state.dark} onToggle={() => set({ dark: !state.dark })} />
            </div>
            <div style={{ height: 1, background: 'var(--borderSoft)', margin: '0 16px' }} />
            <RowItem icon="🔒" label="잠금 & 개인정보" />
          </div>
        </div>

        {/* Support */}
        <div>
          <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', padding: '0 6px 8px' }}>지원</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', overflow: 'hidden' }}>
            <RowItem icon="🛟" label="도움이 필요할 때" sub="긴급 상담 연결" danger />
          </div>
        </div>

        <button
          onClick={() => set({ onboarded: false, checked: false, mood: null, msgs: [] })}
          style={{ border: 'none', background: 'none', color: 'var(--faint)', cursor: 'pointer', padding: '8px 0', font: '500 14px/22px var(--font)', fontFamily: 'var(--font)' }}
        >
          온보딩 다시 보기
        </button>
        <div style={{ font: '400 12px/18px var(--font)', textAlign: 'center', color: 'var(--faint)' }}>마음이 흐르는 곳, 나루 · v1.0.0</div>
      </div>
    </div>
  );
}
