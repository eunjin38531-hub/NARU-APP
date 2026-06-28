import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const MOODS = [
  { k: 'great', label: '아주 좋아요',   tone: '#3F8A9E', soft: '#D8ECF1', mouth: 'M16,33 Q24,42 32,33' },
  { k: 'good',  label: '좋아요',        tone: '#53A1B6', soft: '#DFEFF1', mouth: 'M17,33 Q24,39 31,33' },
  { k: 'ok',    label: '그저 그래요',   tone: '#7BBCC5', soft: '#EDF6F7', mouth: 'M17,34 L31,34' },
  { k: 'down',  label: '조금 힘들어요', tone: '#E0A07F', soft: '#FBEDE4', mouth: 'M17,37 Q24,32 31,37' },
  { k: 'bad',   label: '많이 지쳐요',   tone: '#FF8E73', soft: '#FFE7E0', mouth: 'M16,38 Q24,31 32,38' },
];

export function getMood(k) {
  return MOODS.find(m => m.k === k) || MOODS[2];
}

const REPLIES = [
  '그랬군요. 그 마음, 충분히 그럴 수 있어요. 조금 더 들려주실래요?',
  '이야기해줘서 고마워요. 그 순간 가장 크게 느껴진 감정은 무엇이었나요?',
  '혼자 안고 있기엔 무거웠을 것 같아요. 지금은 어떤 마음이 남아 있나요?',
  '그 감정을 흘려보내도 괜찮아요. 잠시 같이 숨을 골라볼까요?',
];

export function AppProvider({ children }) {
  const [state, setState] = useState({
    onboarded: false,
    screen: 'home',
    name: '',
    mood: null,
    slide: 0,
    dark: false,
    msgs: [],
    typing: false,
    entries: [],
    checked: false,
    recSeg: 'log',
    cnsSeg: 'all',
    replyI: 0,
  });

  function set(patch) {
    setState(s => ({ ...s, ...patch }));
  }

  function sendMsg(text) {
    if (!text.trim() || state.typing) return;
    const replyI = state.replyI;
    set({ msgs: [...state.msgs, { who: 'me', text }], typing: true });
    setTimeout(() => {
      setState(s => ({
        ...s,
        typing: false,
        replyI: s.replyI + 1,
        msgs: [...s.msgs, { who: 'naru', text: REPLIES[replyI % REPLIES.length] }],
      }));
    }, 1400);
  }

  function addEntry(entry) {
    set({ entries: [entry, ...state.entries] });
  }

  function go(screen) {
    set({ screen });
    window.scrollTo?.(0, 0);
  }

  return (
    <AppContext.Provider value={{ state, set, go, sendMsg, addEntry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
