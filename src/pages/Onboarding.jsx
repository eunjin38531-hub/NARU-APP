import { useState } from 'react';
import { useApp, MOODS, getMood } from '../context/AppContext';
import MoodBubble from '../components/MoodBubble';
import FaceSvg from '../components/FaceSvg';

const SLIDES = [
  { ic: '💬', t: '곁에서 조용히\n들어주는 동반자', b: '예약도, 기다림도 없이 지금 바로. 필요한 순간엔 사람 전문가로도 자연스럽게 이어드려요.', tone: ['var(--breeze100)', 'var(--breezeDeep)'] },
  { ic: '✨', t: '감정은 흐르도록,\n억지로 풀지 않아요', b: '감정을 통제하는 대신 자연스럽게 흘려보내요. 머물러도 괜찮아요.', tone: ['var(--mist100)', 'var(--breezeDeep)'] },
  { ic: '📈', t: '나만의 마음\n흐름을 발견해요', b: '기록이 쌓이면 나루가 당신만의 감정 패턴을 찾아 다정하게 알려드려요.', tone: ['var(--coralSoft)', 'var(--coralDeep)'] },
];

export function SlidesPage() {
  const { state, set } = useApp();
  const { slide } = state;
  const s = SLIDES[slide];
  const last = slide === SLIDES.length - 1;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '47px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {SLIDES.map((_, i) => (
            <span key={i} style={{ height: 7, borderRadius: 999, width: i === slide ? 22 : 7, background: i === slide ? 'var(--breeze)' : 'var(--border)', transition: 'all .26s' }} />
          ))}
        </div>
        <button onClick={() => set({ screen: 'name' })} style={{ border: 'none', background: 'none', color: 'var(--text3)', cursor: 'pointer', font: '500 14px/1 var(--font)' }}>건너뛰기</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 36px' }}>
        <div style={{ position: 'relative', width: 150, height: 150, display: 'grid', placeItems: 'center' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '42% 58% 56% 44%/50% 46% 54% 50%', background: s.tone[0] }} />
          <span style={{ position: 'relative', fontSize: 56 }}>{s.ic}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: '700 24px/32px var(--font)', letterSpacing: '-.02em', whiteSpace: 'pre-line', marginBottom: 12 }}>{s.t}</div>
          <div style={{ font: '400 16px/24px var(--font)', color: 'var(--text2)' }}>{s.b}</div>
        </div>
      </div>
      <div style={{ padding: '0 24px 44px' }}>
        <button
          onClick={() => last ? set({ screen: 'name' }) : set({ slide: slide + 1 })}
          style={{ width: '100%', height: 52, borderRadius: 12, border: 'none', background: 'var(--breeze)', color: '#fff', font: '600 16px/1 var(--font)', cursor: 'pointer' }}
        >
          {last ? '거의 다 왔어요' : '다음'}
        </button>
      </div>
    </div>
  );
}

export function NamePage() {
  const { state, set } = useApp();
  const [name, setName] = useState(state.name || '');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '47px 20px 8px' }}>
        <button onClick={() => set({ screen: 'slides' })} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text2)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>
      <div style={{ flex: 1, padding: '20px 28px' }}>
        <div style={{ font: '700 24px/32px var(--font)', letterSpacing: '-.02em', marginBottom: 12 }}>어떻게 불러드리면<br />좋을까요?</div>
        <div style={{ font: '400 16px/24px var(--font)', color: 'var(--text3)', marginBottom: 32 }}>편하게 불릴 이름이나 별명을 알려주세요.</div>
        <input
          autoFocus
          placeholder="예) 지민"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', border: 'none', borderBottom: '2px solid var(--breeze)', padding: '10px 2px', font: '700 24px/1.3 var(--font)', color: 'var(--text)', background: 'transparent', outline: 'none' }}
        />
      </div>
      <div style={{ padding: '0 24px 44px' }}>
        <button
          disabled={!name.trim()}
          onClick={() => { set({ name: name.trim(), screen: 'moodpick' }); }}
          style={{ width: '100%', height: 52, borderRadius: 12, border: 'none', background: 'var(--breeze)', color: '#fff', font: '600 16px/1 var(--font)', cursor: name.trim() ? 'pointer' : 'default', opacity: name.trim() ? 1 : .45 }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export function MoodPickPage() {
  const { state, set, go } = useApp();
  const [picked, setPicked] = useState(state.mood);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ flex: 1, padding: '56px 28px 0' }}>
        <div style={{ font: '700 24px/32px var(--font)', letterSpacing: '-.02em', marginBottom: 12 }}>{state.name}님, 반가워요.<br />지금 마음은 어떤가요?</div>
        <div style={{ font: '400 16px/24px var(--font)', color: 'var(--text3)', marginBottom: 32 }}>첫 마음을 기록하며 나루와 시작해볼까요.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOODS.map(m => {
            const on = picked === m.k;
            return (
              <button key={m.k} onClick={() => setPicked(m.k)} style={{
                display: 'flex', flexDirection: 'row', gap: 16, padding: '12px 16px',
                borderRadius: 16, border: `1px solid ${on ? m.tone : 'var(--border)'}`,
                background: on ? m.soft : 'var(--surface)', cursor: 'pointer', alignItems: 'center', width: '100%',
              }}>
                <MoodBubble mood={m} size={44} active={on} />
                <span style={{ font: '600 16px/24px var(--font)' }}>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '20px 24px 44px' }}>
        <button
          disabled={!picked}
          onClick={() => { if (picked) { set({ mood: picked, onboarded: true, checked: true }); go('home'); } }}
          style={{ width: '100%', height: 52, borderRadius: 12, border: 'none', background: 'var(--breeze)', color: '#fff', font: '600 16px/1 var(--font)', cursor: picked ? 'pointer' : 'default', opacity: picked ? 1 : .45 }}
        >
          나루 시작하기
        </button>
      </div>
    </div>
  );
}
