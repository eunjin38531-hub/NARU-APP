import { useApp } from '../context/AppContext';

const TABS = [
  { k: 'home',    label: '홈',   icon: HomeIcon },
  { k: 'record',  label: '기록', icon: NoteIcon },
  { k: 'chat',    label: '대화', icon: ChatIcon },
  { k: 'counsel', label: '상담', icon: HeartIcon },
  { k: 'profile', label: '마이', icon: UserIcon },
];

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M3 9.8 12 3l9 6.8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/></svg>;
}
function NoteIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M14 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6 8 16l1.4-4z"/></svg>;
}
function ChatIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.5-4.3A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>;
}
function HeartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>;
}
function UserIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></svg>;
}

export default function TabBar() {
  const { state, go } = useApp();
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      padding: '8px 8px 34px',
      borderTop: '1px solid var(--borderSoft)',
      background: 'var(--surface)',
    }}>
      {TABS.map(({ k, label, icon: Icon }) => {
        const on = state.screen === k;
        return (
          <button
            key={k}
            onClick={() => go(k)}
            style={{
              flex: 1,
              maxWidth: 72,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              padding: '6px 0',
              color: on ? 'var(--breeze)' : '#9CA3AF',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              transition: 'color .15s',
            }}
          >
            <Icon />
            <span style={{ font: `${on ? 700 : 500} 11px/1 var(--font)` }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
