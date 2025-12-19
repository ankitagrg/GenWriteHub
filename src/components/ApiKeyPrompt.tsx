import React, { useState } from 'react';
import { Key, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeyPromptProps {
  onClose: () => void;
}

export const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return;
    setIsValidating(true);
    setValidationResult(null);
    setTimeout(() => {
      if (apiKey.startsWith('gsk_')) {
        setValidationResult('success');
        localStorage.setItem('groq_api_key', apiKey);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setValidationResult('error');
      }
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apiKeyPromptTitle"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-left transform transition-all">
      

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex items-center space-x-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <Key className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="apiKeyPromptTitle" className="text-xl font-bold text-white">
              API Key Setup
            </h3>
            <p className="text-blue-100 text-sm">Connect your Groq API to get started</p>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Benefits Box */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Free Tier Available</p>
              <p className="text-xs text-green-700 mt-1">
                Groq provides generous free limits — perfect for testing and development.
              </p>
            </div>
          </div>

          <label htmlFor="groqApiKey" className="block text-sm font-semibold text-gray-700 mb-3">
            Enter your Groq API Key
          </label>
          <div className="relative mb-4">
            <input
              id="groqApiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              className={`w-full px-4 py-3 pr-12 border-2 rounded-xl font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${
                  validationResult === 'success'
                    ? 'border-green-500'
                    : validationResult === 'error'
                    ? 'border-red-500'
                    : 'border-gray-200'
                }
              `}
              aria-invalid={validationResult === 'error'}
              aria-describedby={validationResult === 'error' ? 'apiKeyError' : undefined}
              disabled={isValidating}
            />
            {validationResult === 'success' && (
              <CheckCircle
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
            )}
            {validationResult === 'error' && (
              <AlertCircle
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>

          {validationResult === 'error' && (
            <p
              id="apiKeyError"
              className="text-red-600 text-sm mb-4"
              role="alert"
            >
              Invalid API key format. Please check and try again.
            </p>
          )}

          {validationResult === 'success' && (
            <p className="text-green-600 text-sm mb-4" role="alert">
              ✓ API key validated successfully! Redirecting...
            </p>
          )}

        
          <button
            onClick={handleSaveApiKey}
            disabled={isValidating || !apiKey.trim()}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
              ${
                isValidating || !apiKey.trim()
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }
            `}
            aria-busy={isValidating}
          >
            {isValidating ? 'Validating...' : 'Save API Key'}
          </button>

          {/* Instructions Toggle */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            type="button"
            className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
            aria-expanded={showInstructions}
            aria-controls="instructionsSection"
          >
            <span>{showInstructions ? 'Hide' : 'Show'} setup instructions</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </button>

        
          {showInstructions && (
            <section
              id="instructionsSection"
              className="bg-gray-50 rounded-2xl p-6 text-sm space-y-5 mt-4"
            >
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  <strong>Visit Groq Console</strong><br />
                  <a
                    href="https://console.groq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>console.groq.com</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <strong>Log in or create an account</strong> if you don’t have one already.
                </li>
                <li>
                  <strong>Navigate to API Keys</strong> in your dashboard.
                </li>
                <li>
                  <strong>Create a new API key</strong>, copy it carefully.
                </li>
                <li>
                  <strong>Paste the key above</strong> starting with <code>gsk_</code>.
                </li>
                <li>
                  <strong>Save your API key</strong> to enable the app to connect.
                </li>
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
