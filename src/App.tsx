import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import TenderFeed from './pages/TenderFeed';
import TenderDetails from './pages/TenderDetails';
import CompanyProfile from './pages/CompanyProfile';
import ProposalEditor from './pages/ProposalEditor';
import ReputationPage from './pages/ReputationPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/tenders" replace />} />
              <Route path="/tenders" element={<TenderFeed />} />
              <Route path="/tenders/:id" element={<TenderDetails />} />
              <Route path="/profile" element={<CompanyProfile />} />
              <Route path="/proposals/edit/:id" element={<ProposalEditor />} />
              <Route path="/reputation" element={<ReputationPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;