// pages/index.js
// This is the landing page of the application
// It shows marketing content for non-logged-in users and redirects logged-in users to the tenders page

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircleIcon, 
  PencilSquareIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If user is logged in, redirect to tenders page
  useEffect(() => {
    if (!loading && user) {
      router.push('/tenders');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is logged in, don't show the landing page (will redirect)
  if (user) {
    return null;
  }

  // Landing page content for non-logged-in users
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Win More Government Tenders with AI
              </h1>
              <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                Tenderly uses artificial intelligence to help SMEs navigate government procurement, 
                draft winning proposals, and build verifiable reputation on the blockchain.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/signup" className="btn btn-primary text-center">
                  Get Started
                </Link>
                <Link href="/tenders" className="btn btn-secondary text-center">
                  Explore Tenders
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="flex justify-center md:justify-end">
              <div className="h-64 w-full max-w-md bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-gray-600 text-lg">Laptop Screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: AI Eligibility Check */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                AI Eligibility Check
              </h3>
              <p className="text-gray-600 mt-2">
                Instantly verify if your company meets tender requirements before investing time.
              </p>
            </div>

            {/* Feature 2: Instant Proposal Drafting */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center">
                  <PencilSquareIcon className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Instant Proposal Drafting
              </h3>
              <p className="text-gray-600 mt-2">
                Generate professional proposal drafts in minutes, not days.
              </p>
            </div>

            {/* Feature 3: Blockchain Reputation Proof */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Blockchain Reputation Proof
              </h3>
              <p className="text-gray-600 mt-2">
                Build immutable proof of your tender participation and track record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tenderly Works Section */}
      <section className="py-16 bg-gray-50">
        {/* Content explaining the problem and solution */}
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        {/* Logos of trusted organizations */}
      </section>

      {/* Call-To-Action Footer */}
      <section className="py-16 bg-primary">
        {/* Email signup and quick links */}
      </section>
    </div>
  );
}