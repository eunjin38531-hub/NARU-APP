import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Library from './pages/Library';
import Write from './pages/Write';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}
