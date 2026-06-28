import { useApp } from '../context/AppContext';

const EXPERTS = [
  { name: '이서연', role: '임상심리전문가', years: 8, approach: '조급해하지 않아도 괜찮아요. 마음의 속도를 함께 맞춰가요.', rating: '4.9', reviews: 128, now: true, format: '화상·채팅' },
  { name: '정현우', role: '상담심리사 1급', years: 11, approach: '판단하지 않고, 있는 그대로 들어드릴게요.', rating: '4.8', reviews: 94, now: true, format: '화상', coral: true },
  { name: '김도윤', role: '정신건강임상심리사', years: 6, approach: '작은 변화부터, 일상의 리듬을 함께 회복해요.', rating: '4.9', reviews: 61, now: false, soon: '오늘 오후 4시', format: '채팅' },
];

function AvailTag({ expert }) {
  if (expert.now) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: '600 12px/1 var(--font)', padding: '6px 10px', borderRadius: 999, background: 'var(--mist100)', color: 'var(--breezeDeep)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2E8F6B' }} />
        지금 가능
      </span>
    );
  }
  return <span style={{ display: 'inline-flex', font: '600 12px/1 var(--font)', padding: '6px 10px', borderRadius: 999, background: 'var(--bgSub)', color: 'var(--text2)' }}>{expert.soon}</span>;
}

function CounselorRow({ expert, onClick }) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: 14, display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', cursor: 'pointer', boxSizing: 'border-box' }}>
      <span style={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', font: '700 18px/1 var(--font)', flexShrink: 0, background: expert.coral ? 'linear-gradient(140deg,#F4A07A,#DB7962)' : 'linear-gradient(140deg,#85C5D3,#3F8A9E)' }}>{expert.name[0]}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ font: '600 16px/24px var(--font)' }}>{expert.name}</span>
          <AvailTag expert={expert} />
        </div>
        <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)' }}>{expert.role} · {expert.years}년 · {expert.format}</div>
      </div>
      <span style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0, alignSelf: 'center' }}>⭐{expert.rating}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
    </button>
  );
}

export default function Counsel() {
  const { state, set } = useApp();
  const filter = state.cnsSeg;
  const rec = EXPERTS[0];
  const others = EXPERTS.slice(1).filter(c => filter === 'all' || c.now);

  return (
    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bgSoft)' }}>
      <div style={{ padding: '47px 16px 4px' }}>
        <div style={{ font: '500 12px/18px var(--font)', color: 'var(--text3)', marginBottom: 4 }}>전문가 상담</div>
        <div style={{ font: '700 24px/32px var(--font)', letterSpacing: '-.02em' }}>마음에 맞는 상담사</div>
      </div>

      <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Context share */}
        <button style={{ width: '100%', padding: 14, display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', cursor: 'pointer', boxSizing: 'border-box' }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--breeze50)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--breezeDeep)', fontSize: 20 }}>💬</span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '500 14px/22px var(--font)' }}>나루가 기억한 마음, 전문가에게 전하기</div>
            <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', marginTop: 2 }}>처음부터 다시 설명하지 않아도 괜찮아요</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Recommended */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, boxShadow: 'var(--shadowSoft)', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: '600 12px/1 var(--font)', padding: '6px 10px', borderRadius: 999, background: 'var(--breeze100)', color: 'var(--breezeDeep)' }}>✨ 나루 추천</span>
            <span style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)' }}>⭐{rec.rating} · 후기 {rec.reviews}</span>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', font: '700 18px/1 var(--font)', flexShrink: 0, background: 'linear-gradient(140deg,#85C5D3,#3F8A9E)' }}>{rec.name[0]}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '600 16px/24px var(--font)' }}>{rec.name}</span>
                <AvailTag expert={rec} />
              </div>
              <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text3)', marginTop: 3 }}>{rec.role} · {rec.years}년</div>
            </div>
          </div>
          <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text2)', marginTop: 14 }}>{rec.approach}</div>
          <button style={{ width: '100%', height: 44, marginTop: 16, borderRadius: 10, border: 'none', background: 'var(--breeze)', color: '#fff', font: '600 15px/1 var(--font)', cursor: 'pointer', fontFamily: 'var(--font)' }}>연결하기</button>
        </div>

        {/* Others */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 0' }}>
          <span style={{ font: '600 18px/26px var(--font)', letterSpacing: '-.01em' }}>다른 상담사</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['all','전체'],['now','지금 가능']].map(([k,l]) => (
              <button key={k} onClick={() => set({ cnsSeg: k })} style={{ display: 'inline-flex', alignItems: 'center', font: '600 13px/1 var(--font)', padding: '7px 12px', borderRadius: 999, border: `1px solid ${filter === k ? 'transparent' : 'var(--border)'}`, background: filter === k ? 'var(--breeze)' : 'var(--surface)', color: filter === k ? '#fff' : 'var(--text2)', cursor: 'pointer', fontFamily: 'var(--font)' }}>{l}</button>
            ))}
          </div>
        </div>

        {others.length ? others.map(c => <CounselorRow key={c.name} expert={c} />) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--borderSoft)', borderRadius: 16, padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ font: '400 14px/22px var(--font)', color: 'var(--text3)' }}>지금 바로 가능한 다른 상담사가 없어요.<br />예약으로 편안하게 만나보실 수 있어요.</div>
          </div>
        )}

        {/* Crisis */}
        <div style={{ background: 'var(--coralSoft)', border: '1px solid transparent', borderRadius: 16, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--coralDeep)', fontSize: 20 }}>🛟</span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '500 14px/22px var(--font)' }}>지금 많이 힘들다면</div>
            <div style={{ font: '400 12px/18px var(--font)', color: 'var(--text2)', marginTop: 2 }}>24시간 위기상담 1393 · 즉시 연결</div>
          </div>
          <span style={{ color: 'var(--coralDeep)', fontSize: 20 }}>📞</span>
        </div>

        <div style={{ font: '400 12px/18px var(--font)', textAlign: 'center', color: 'var(--faint)', padding: '0 12px' }}>
          나루의 상담은 의료 행위를 대체하지 않으며, 마음을 정리하고 전문가로 잇는 과정을 돕습니다.
        </div>
      </div>
    </div>
  );
}
