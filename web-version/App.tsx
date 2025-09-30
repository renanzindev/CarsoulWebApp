import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Conquistas } from './pages/Conquistas';
import { OS } from './pages/OS';
import { PCP } from './pages/PCP';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader />
        
        {/* Conteúdo principal com margem superior para compensar o header fixo */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/conquistas" element={<Conquistas />} />
            <Route path="/os" element={<OS />} />
            <Route path="/pcp" element={<PCP />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;