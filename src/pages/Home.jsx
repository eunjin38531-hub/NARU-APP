import { useApp, MOODS, getMood } from '../context/AppContext';
import MoodBubble from '../components/MoodBubble';

const AFF = {
  great: '좋은 기운이 가득한 하루네요. 그 마음, 천천히 누려도 괜찮아요.',
  good:  '잔잔하게 좋은 하루예요. 이 평온함을 가만히 느껴보세요.',
  ok:    '그저 그런 날도 소중해요. 무리하지 않아도 괜찮아요.',
  down:  '조금 힘든 하루였군요. 그 마음, 흘려보내도 괜찮아요.',
  bad:   '많이 지친 하루네요. 오늘은 나에게 가장 다정해도 좋아요.',
};

function CareCard({ icon, title, sub }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 14, minWidth: 148, flexShrink: 0 }}>
      <span style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--breeze50)', display: 'grid', placeItems: 'center', color: 'var(--breezeDeep)', marginBottom: 12, fontSize: 20 }}>{icon}</span>
      <div style={{ font: '500 14px/22px var(--font)' }}>{title}</div>
      <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', marginTop: 3 }}>{sub}</div>
    </div>
  );
}

function RecentItem({ moodK, text, time }) {
  const m = getMood(moodK);
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
      <MoodBubble mood={m} size={40} active />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '500 14px/22px var(--font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>
        <div style={{ font: '400 12px/18px var(--font)', color: 'var(--faint)', marginTop: 4 }}>{time}</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  );
}

export default function Home() {
  const { state, set, go } = useApp();
  const { name, mood, checked } = state;
  const m = getMood(mood);
  const hr = new Date().getHours();
  const greet = hr < 12 ? '좋은 아침이에요' : hr < 18 ? '좋은 오후예요' : '편안한 저녁이에요';

  return (
    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Wave header */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg,var(--breeze) 0%,var(--mist) 58%,var(--breeze50) 120%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .5, background: 'radial-gradient(120% 90% at 12% -10%,rgba(255,255,255,.55),transparent 60%),radial-gradient(120% 80% at 95% 0%,rgba(255,142,115,.26),transparent 55%)' }} />
        <svg viewBox="0 0 390 200" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -1, width: '100%', height: 96, opacity: .4 }}>
          <path d="M0,150 C70,110 160,180 250,140 C320,108 360,150 390,128 L390,200 L0,200 Z" fill="rgba(255,255,255,.4)" />
        </svg>
        <div style={{ position: 'relative', padding: '47px 20px 76px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ font: '500 14px/22px var(--font)', color: 'rgba(255,255,255,.9)', marginBottom: 8 }}>{greet}</div>
            <div style={{ font: '700 28px/36px var(--font)', letterSpacing: '-.02em', color: '#fff' }}>{name}님,<br />오늘도 곁에 있을게요</div>
          </div>
          <button onClick={() => go('profile')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.22)', border: 'none', display: 'grid', placeItems: 'center', color: '#fff', cursor: 'pointer', position: 'relative' }}>
            🔔
            <span style={{ position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', border: '2px solid var(--breeze)' }} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 16px 24px', marginTop: -56, position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Mood check-in */}
        {checked ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <MoodBubble mood={m} size={56} active />
              <div style={{ flex: 1 }}>
                <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', marginBottom: 4 }}>오늘의 마음</div>
                <div style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em' }}>{m.label}</div>
              </div>
              <button onClick={() => set({ checked: false })} style={{ border: 'none', background: 'none', color: 'var(--text3)', cursor: 'pointer', font: '500 12px/18px var(--font)', padding: '6px 4px', flexShrink: 0 }}>다시 고르기</button>
            </div>
            <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text2)', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--borderSoft)' }}>{AFF[mood]}</div>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16 }}>
            <div style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em', marginBottom: 4 }}>오늘 마음은 어떤가요?</div>
            <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text3)', marginBottom: 18 }}>지금 이 순간에 가장 가까운 얼굴을 골라주세요.</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {MOODS.map(x => (
                <button key={x.k} onClick={() => set({ mood: x.k, checked: true })}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: 'none', background: 'none', cursor: 'pointer' }}>
                  <MoodBubble mood={x} size={52} active={mood === x.k} />
                  <span style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)' }}>
                    {x.label.replace(/요$/, '').slice(0, 4)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Care cards */}
        <div>
          <div style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em', padding: '0 4px 12px' }}>오늘의 작은 돌봄</div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 4px 4px' }}>
            <CareCard icon="💨" title="깊은 호흡" sub="천천히 들이쉬고 내쉬기" />
            <CareCard icon="☕" title="따뜻한 차 한 잔" sub="잠시 손을 데우며 쉬기" />
            <CareCard icon="🌿" title="짧은 산책" sub="바깥 공기 마시기" />
          </div>
        </div>

        {/* AI prompt */}
        <button onClick={() => go('chat')} style={{ padding: 0, overflow: 'hidden', borderRadius: 16, border: '1px solid var(--borderSoft)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', boxShadow: 'var(--shadowSoft)' }}>
          <div style={{ padding: 16, background: 'linear-gradient(135deg,var(--breeze50),var(--mist100))', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadowSoft)', flexShrink: 0, fontSize: 22 }}>💬</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '500 12px/18px var(--font)', color: 'var(--breezeDeep)', marginBottom: 4 }}>나루의 오늘 질문</div>
              <div style={{ font: '600 16px/24px var(--font)' }}>요즘 잠은 잘 주무세요? 어젯밤은 어땠는지 들려주실래요?</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--breezeDeep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </button>

        {/* Recent */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 4px 12px' }}>
            <span style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em' }}>최근 기록</span>
            <button onClick={() => go('record')} style={{ border: 'none', background: 'none', color: 'var(--text3)', cursor: 'pointer', font: '500 14px/22px var(--font)' }}>전체보기</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RecentItem moodK="good" text="발표를 무사히 끝냈다. 생각보다 떨지 않아서…" time="오늘 · 오후 2:14" />
            <RecentItem moodK="down" text="사람들 사이에서 괜히 작아지는 기분이 들었다…" time="어제 · 밤 11:02" />
          </div>
        </div>
      </div>
    </div>
  );
}
