import { useRef, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const SUGGESTIONS = ['아직 좀 무거워요', '조금 나아졌어요', '그냥 들어주세요'];

const INITIAL_MSGS = (name) => [
  { who: 'naru', text: `안녕하세요, ${name}님. 오늘도 이렇게 마음을 들여다보러 와줘서 고마워요.` },
  { who: 'naru', text: '어제는 사람들 사이에서 작아지는 기분이 들었다고 했었죠. 오늘 그 마음은 좀 어떤가요?', mem: true },
];

export default function Chat() {
  const { state, set, sendMsg } = useApp();
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!state.msgs.length) {
      set({ msgs: INITIAL_MSGS(state.name) });
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.msgs, state.typing]);

  function handleSend(text) {
    const t = text ?? input;
    if (!t.trim()) return;
    sendMsg(t.trim());
    setInput('');
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,var(--breeze50) 0%,var(--bg) 32%)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '47px 16px 12px', display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(160deg,var(--breeze),var(--mist))', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <svg viewBox="0 0 390 80" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -1, width: '100%', height: 40, opacity: .4 }}>
          <path d="M0,50 C90,20 150,70 240,44 C310,24 350,52 390,38 L390,80 L0,80 Z" fill="rgba(255,255,255,.4)" />
        </svg>
        <span style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.9)', display: 'grid', placeItems: 'center', flexShrink: 0, position: 'relative', fontSize: 20 }}>💬</span>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em', color: '#fff' }}>나루</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7BD0A8' }} />
            <span style={{ font: '400 12px/18px var(--font)', color: 'rgba(255,255,255,.85)' }}>곁에서 듣고 있어요</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ font: '400 12px/18px var(--font)', textAlign: 'center', color: 'var(--faint)' }}>오늘 · 오후 9:24</div>
        {state.msgs.map((msg, i) => {
          if (msg.who === 'me') {
            return (
              <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: '12px 16px', borderRadius: '20px 20px 6px 20px', background: 'var(--breeze)', color: '#fff', font: '400 16px/24px var(--font)' }}>
                {msg.text}
              </div>
            );
          }
          return (
            <div key={i} style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', maxWidth: '82%' }}>
              {msg.mem && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start', background: 'var(--breeze100)', color: 'var(--breezeDeep)', padding: '5px 10px', borderRadius: 999, marginBottom: 4, font: '500 12px/18px var(--font)' }}>
                  ✨ 지난 대화를 기억하고 있어요
                </span>
              )}
              <div style={{ padding: '12px 16px', borderRadius: '20px 20px 20px 6px', background: 'var(--surface)', border: '1px solid var(--borderSoft)', boxShadow: 'var(--shadowSoft)', font: '400 16px/24px var(--font)' }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        {state.typing && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 5, padding: '14px 16px', borderRadius: '20px 20px 20px 6px', background: 'var(--surface)', border: '1px solid var(--borderSoft)' }}>
            {[0, .18, .36].map((d, i) => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--faint)', animation: `blink 1.2s ${d}s infinite` }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, paddingBottom: 8 }}>
        <div style={{ display: 'flex', gap: 8, padding: '8px 16px 12px', overflowX: 'auto' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => handleSend(s)} style={{ display: 'inline-flex', alignItems: 'center', font: '500 13px/1 var(--font)', padding: '9px 14px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text2)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font)' }}>{s}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', background: 'var(--bgSub)', borderRadius: 24, padding: '0 18px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="마음에 떠오르는 대로 적어보세요"
              style={{ flex: 1, minWidth: 0, width: '100%', border: 'none', outline: 'none', background: 'transparent', font: '400 16px/1.4 var(--font)', color: 'var(--text)', padding: '14px 0', fontFamily: 'var(--font)' }}
            />
          </div>
          <button onClick={() => handleSend()} style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--breeze)', border: 'none', display: 'grid', placeItems: 'center', color: '#fff', cursor: 'pointer', flexShrink: 0, boxShadow: '0 6px 16px -6px var(--breeze)', fontSize: 20 }}>↑</button>
        </div>
      </div>

      <style>{`@keyframes blink{0%,60%,100%{opacity:.3}30%{opacity:1}}`}</style>
    </div>
  );
}
