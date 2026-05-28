import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Resume from './pages/Resume';
import VoiceAssistantPage from './pages/VoiceAssistantPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
