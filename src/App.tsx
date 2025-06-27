import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/auth/AuthForm';
import MainLayout from './components/layout/MainLayout';
import TenderFeed from './pages/TenderFeed';
import TenderDetails from './pages/TenderDetails';
import CompanyProfile from './pages/CompanyProfile';
import ProposalEditor from './pages/ProposalEditor';
import ReputationPage from './pages/ReputationPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import ErrorBoundary from './components/common/ErrorBoundary';

function AppContent() {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login form
  if (!user) {
    return <AuthForm />;
  }

  // If user is authenticated, show the main application
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;