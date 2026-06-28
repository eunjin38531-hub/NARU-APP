import { useState } from 'react';
import { useApp, MOODS, getMood } from '../context/AppContext';
import MoodBubble from '../components/MoodBubble';
import FaceSvg from '../components/FaceSvg';

function ComposeSheet({ onClose, onSave }) {
  const [moodK, setMoodK] = useState('ok');
  const [text, setText] = useState('');
  const m = getMood(moodK);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'absolute', inset: 0, background: 'rgba(15,23,42,.4)',
      backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'flex-end', zIndex: 40,
    }}>
      <div style={{ width: '100%', background: 'var(--surface)', borderRadius: '24px 24px 0 0', padding: '12px 20px 28px' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--border)', margin: '0 auto 18px' }} />
        <div style={{ font: '600 20px/28px var(--font)', letterSpacing: '-.015em', marginBottom: 4 }}>지금 마음을 남겨볼까요?</div>
        <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text3)', marginBottom: 16 }}>가장 가까운 감정을 먼저 골라주세요.</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          {MOODS.map(x => (
            <button key={x.k} onClick={() => setMoodK(x.k)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <MoodBubble mood={x} size={48} active={moodK === x.k} />
            </button>
          ))}
        </div>
        <textarea
          rows="3"
          placeholder="오늘 어떤 일이 있었나요? 떠오르는 대로 적어도 괜찮아요."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 12, padding: 14, font: '400 16px/1.5 var(--font)', color: 'var(--text)', background: 'var(--bgSoft)', outline: 'none', resize: 'none', marginBottom: 16, boxSizing: 'border-box', fontFamily: 'var(--font)' }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flexShrink: 0, height: 44, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', font: '600 15px/1 var(--font)', cursor: 'pointer', padding: '0 16px', color: 'var(--text)', fontFamily: 'var(--font)' }}>취소</button>
          <button onClick={() => onSave(moodK, text)} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: 'var(--breeze)', color: '#fff', font: '600 15px/1 var(--font)', cursor: 'pointer', fontFamily: 'var(--font)' }}>✓ 기록 저장하기</button>
        </div>
      </div>
    </div>
  );
}

function DayCell({ day, moodK, num, today }) {
  const m = getMood(moodK);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '10px 0', borderRadius: 16, background: today ? 'var(--breeze100)' : undefined }}>
      <span style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)' }}>{day}</span>
      <MoodBubble mood={m} size={26} active />
      <span style={{ font: `${today ? 700 : 500} 14px/22px var(--font)`, color: today ? 'var(--breezeDeep)' : 'var(--text2)' }}>{num}</span>
    </div>
  );
}

function Entry({ moodK, label, time, text, tags }) {
  const m = getMood(moodK);
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <MoodBubble mood={m} size={36} active />
        <div style={{ flex: 1 }}><div style={{ font: '500 14px/22px var(--font)' }}>{label}</div></div>
        <span style={{ font: '400 12px/18px var(--font)', color: 'var(--faint)' }}>{time}</span>
      </div>
      <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text2)', marginBottom: 12 }}>{text}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', font: '600 12px/1 var(--font)', padding: '6px 10px', borderRadius: 999, background: 'var(--oatSoft)', color: 'var(--text2)' }}>#{t}</span>
        ))}
      </div>
    </div>
  );
}

function LogTab({ entries, onAdd }) {
  return (
    <>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 8px' }}>
        <DayCell day="월" moodK="good" num={22} />
        <DayCell day="화" moodK="ok" num={23} />
        <DayCell day="수" moodK="down" num={24} />
        <DayCell day="목" moodK="ok" num={25} />
        <DayCell day="금" moodK="great" num={26} />
        <DayCell day="토" moodK="good" num={27} />
        <DayCell day="일" moodK="good" num={28} today />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '8px 16px 4px', overflow: 'hidden' }}>
        {['전체','좋았던 날','힘들었던 날'].map((c, i) => (
          <span key={c} style={{ display: 'inline-flex', alignItems: 'center', font: '600 14px/1 var(--font)', padding: '10px 14px', borderRadius: 999, border: `1px solid ${i === 0 ? 'transparent' : 'var(--border)'}`, background: i === 0 ? 'var(--breeze)' : 'var(--surface)', color: i === 0 ? '#fff' : 'var(--text2)', whiteSpace: 'nowrap', cursor: 'pointer' }}>{c}</span>
        ))}
      </div>
      <div style={{ padding: '12px 16px 96px' }}>
        <button onClick={onAdd} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 16, marginBottom: 16, borderRadius: 16, border: '1.5px dashed var(--breeze)', background: 'var(--breeze50)', cursor: 'pointer', textAlign: 'left', boxSizing: 'border-box' }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--breeze)', display: 'grid', placeItems: 'center', flexShrink: 0, color: '#fff', fontSize: 18 }}>✏️</span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '500 14px/22px var(--font)', color: 'var(--breezeDeep)' }}>오늘의 마음을 기록해보세요</div>
            <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', marginTop: 2 }}>떠오르는 대로 적어도 괜찮아요</div>
          </div>
        </button>
        <div style={{ font: '500 14px/22px var(--font)', color: 'var(--text3)', padding: '0 4px 12px' }}>오늘 · 5월 28일</div>
        {entries.map((e, i) => <Entry key={i} {...e} />)}
        <Entry moodK="good" label="좋아요" time="오후 2:14" text="발표를 무사히 끝냈다. 생각보다 떨지 않아서 다행이었어. 끝나고 나니 몸에 힘이 쭉 빠졌다." tags={['성취','안도']} />
        <Entry moodK="ok" label="그저 그래요" time="오전 9:02" text="아침은 그냥 그랬다. 특별히 나쁘지도, 좋지도 않은 하루의 시작." tags={['일상']} />
        <div style={{ font: '500 14px/22px var(--font)', color: 'var(--text3)', padding: '0 4px 12px' }}>어제 · 5월 27일</div>
        <Entry moodK="down" label="조금 힘들어요" time="밤 11:02" text="사람들 사이에서 괜히 작아지는 기분이 들었다. 나루랑 이야기하고 조금 가라앉았다." tags={['불안','관계']} />
      </div>
    </>
  );
}

function AnalysisTab() {
  return (
    <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <span style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em' }}>이번 주 마음 흐름</span>
          <span style={{ font: '400 12px/18px var(--font)', color: 'var(--faint)' }}>5월 22 – 28</span>
        </div>
        <svg viewBox="0 0 320 150" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="fa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#53A1B6" stopOpacity=".34" />
              <stop offset="100%" stopColor="#7BBCC5" stopOpacity=".02" />
            </linearGradient>
          </defs>
          <path d="M14 65 C37 65,37 78,60 78 C83 78,83 86,106 86 C133 86,133 88,160 88 C186 88,186 49,212 49 C231 49,231 36,250 36 C271 36,271 52,292 52 L292 136 L14 136 Z" fill="url(#fa)" />
          <path d="M14 65 C37 65,37 78,60 78 C83 78,83 86,106 86 C133 86,133 88,160 88 C186 88,186 49,212 49 C231 49,231 36,250 36 C271 36,271 52,292 52" fill="none" stroke="#53A1B6" strokeWidth="3" strokeLinecap="round" />
          <g fill="var(--surface)" strokeWidth="3">
            {[[14,65,'#53A1B6'],[60,78,'#7BBCC5'],[106,86,'#E0A07F'],[160,88,'#7BBCC5'],[212,49,'#53A1B6'],[250,36,'#3F8A9E'],[292,52,'#53A1B6']].map(([cx,cy,s],i)=>(
              <circle key={i} cx={cx} cy={cy} r="4.5" stroke={s} />
            ))}
          </g>
          <g fill="#94A3B8" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Pretendard">
            {[['월',14],['화',60],['수',106],['목',160],['금',212],['토',250],['일',292]].map(([d,x])=>(
              <text key={d} x={x} y="148">{d}</text>
            ))}
          </g>
        </svg>
      </div>
      <div style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em', padding: '4px 4px 0' }}>나루가 발견한 흐름</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'var(--breeze100)', color: 'var(--breezeDeep)', fontSize: 20 }}>🌙</span>
        <div>
          <div style={{ font: '600 16px/24px var(--font)', marginBottom: 4 }}>수요일 저녁의 가라앉음</div>
          <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text2)' }}>최근 3주간 수요일 저녁마다 마음이 평소보다 낮아지는 경향이 보여요. 미리 가벼운 산책을 계획해보는 건 어떨까요?</div>
        </div>
      </div>
    </div>
  );
}

export default function Record() {
  const { state, set, addEntry } = useApp();
  const [compose, setCompose] = useState(false);

  function handleSave(moodK, text) {
    const m = getMood(moodK);
    addEntry({ moodK, label: m.label, time: '방금', text: text || '(내용 없이 마음만 남겼어요)', tags: [] });
    setCompose(false);
    set({ recSeg: 'log' });
  }

  return (
    <div style={{ overflowY: state.recSeg === 'log' ? 'auto' : 'auto', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ minHeight: '100%' }}>
        <div style={{ padding: '47px 16px 4px' }}>
          <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', marginBottom: 4 }}>5월 · 2026</div>
          <div style={{ font: '700 24px/32px var(--font)', letterSpacing: '-.02em' }}>마음 기록</div>
        </div>
        <div style={{ padding: '12px 16px 4px' }}>
          <div style={{ display: 'flex', background: 'var(--bgSub)', borderRadius: 12, padding: 4 }}>
            {[['log','기록'],['analysis','분석']].map(([k,l]) => (
              <button key={k} onClick={() => set({ recSeg: k })} style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '9px 0', borderRadius: 8, font: '500 14px/1 var(--font)', fontFamily: 'var(--font)', color: state.recSeg === k ? 'var(--text)' : 'var(--text3)', background: state.recSeg === k ? 'var(--surface)' : 'none', boxShadow: state.recSeg === k ? 'var(--shadowSoft)' : undefined }}>{l}</button>
            ))}
          </div>
        </div>
        {state.recSeg === 'log' ? <LogTab entries={state.entries} onAdd={() => setCompose(true)} /> : <AnalysisTab />}
      </div>

      {state.recSeg === 'log' && (
        <button onClick={() => setCompose(true)} aria-label="새 기록" style={{ position: 'absolute', right: 16, bottom: 16, width: 56, height: 56, borderRadius: 18, border: 'none', background: 'var(--breeze)', boxShadow: '0 12px 28px -8px var(--breeze)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#fff', zIndex: 30, fontSize: 24 }}>＋</button>
      )}

      {compose && <ComposeSheet onClose={() => setCompose(false)} onSave={handleSave} />}
    </div>
  );
}
