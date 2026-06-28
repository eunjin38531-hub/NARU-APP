import { useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import TabBar from './components/TabBar';
import Splash from './pages/Splash';
import { SlidesPage, NamePage, MoodPickPage } from './pages/Onboarding';
import Home from './pages/Home';
import Record from './pages/Record';
import Chat from './pages/Chat';
import Counsel from './pages/Counsel';
import Profile from './pages/Profile';

const PHONE_W = 390;
const PHONE_H = 844;

function Phone() {
  const { state } = useApp();
  const stageRef = useRef(null);

  useEffect(() => {
    function fit() {
      if (!stageRef.current) return;
      const pad = 20;
      let s = Math.min((window.innerHeight - pad) / PHONE_H, (window.innerWidth - pad) / PHONE_W);
      if (s > 1.18) s = 1.18;
      stageRef.current.style.transform = `scale(${s})`;
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* dark mode class on phone wrapper */
  const mainBg = state.dark ? '#0E1626' : '#FFFFFF';

  const showTabs = state.onboarded;

  function renderScreen() {
    switch (state.screen) {
      case 'slides':  return <SlidesPage />;
      case 'name':    return <NamePage />;
      case 'moodpick': return <MoodPickPage />;
      case 'home':    return <Home />;
      case 'record':  return <Record />;
      case 'chat':    return <Chat />;
      case 'counsel': return <Counsel />;
      case 'profile': return <Profile />;
      default:        return <Splash />;
    }
  }

  return (
    <div ref={stageRef} style={{ transformOrigin: 'center center', flexShrink: 0 }}>
      <div className={state.dark ? 'dark' : ''} style={{
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: 46,
        backgroundColor: mainBg,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 30px 70px -18px rgba(30,41,59,.32),0 0 0 1px rgba(15,23,42,.06)',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--text)',
      }}>
        <div style={{ flex: 1, overflowY: 'hidden', overflowX: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {renderScreen()}
        </div>
        {showTabs && <TabBar />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Phone />
    </AppProvider>
  );
}
