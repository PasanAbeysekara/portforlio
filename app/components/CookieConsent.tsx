"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    setIsVisible(!consent);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(savedPreferences));
    setIsVisible(false);
    setShowCustomize(false);
  };

  // Don't render anything until we've checked localStorage
  if (isVisible === null) return null;
  
  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay to dim background and prevent interactions */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        style={{ transition: 'none' }}
      />
      
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
        <div 
          className="pointer-events-auto bg-gh-bg-secondary border border-gh-border rounded-lg shadow-2xl max-w-2xl w-full p-6"
          style={{ transition: 'none' }}
        >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-2xl">
            <span>🍪</span>
            <h2 className="text-xl font-bold">Cookie Preferences</h2>
          </div>
          <button 
            onClick={handleRejectNonEssential}
            className="text-gh-text-secondary hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {!showCustomize ? (
          <>
            <p className="text-gh-text-secondary mb-6">
              This website uses cookies to improve your experience. You can accept all or manage preferences.
              Note: The website will remain accessible regardless of your choice.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-gh-green-active hover:bg-gh-green text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 bg-gh-button hover:bg-gh-button-hover border border-gh-border text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="flex-1 bg-gh-button hover:bg-gh-button-hover border border-gh-border text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
              >
                Customize
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between p-3 border border-gh-border rounded-md">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Necessary Cookies</h3>
                  <p className="text-sm text-gh-text-secondary">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 h-5 w-5 rounded border-gh-border bg-gh-button"
                />
              </div>

              <div className="flex items-start justify-between p-3 border border-gh-border rounded-md">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                  <p className="text-sm text-gh-text-secondary">
                    Help us understand how visitors interact with the website.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-gh-border bg-gh-button cursor-pointer"
                />
              </div>

              <div className="flex items-start justify-between p-3 border border-gh-border rounded-md">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Marketing Cookies</h3>
                  <p className="text-sm text-gh-text-secondary">
                    Used to track visitors across websites for marketing purposes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-gh-border bg-gh-button cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-gh-green-active hover:bg-gh-green text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="flex-1 bg-gh-button hover:bg-gh-button-hover border border-gh-border text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
              >
                Back
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}
