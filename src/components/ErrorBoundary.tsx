import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      let friendlyMessage = this.state.errorMessage;
      try {
        const parsed = JSON.parse(this.state.errorMessage);
        if (parsed?.error && parsed?.operationType) {
          friendlyMessage = `Database ${parsed.operationType} failed (${parsed.path || 'unknown path'}): ${parsed.error}`;
        }
      } catch {
        // Keep original message if not JSON
      }

      return (
        <div className="min-h-screen bg-[#0a0a0f] text-[#f5f1e8] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#131d33] border border-red-500/40 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-lg text-[#f8fafc]">
              Something went wrong
            </h2>
            <p className="text-xs text-[#94a3b8] leading-relaxed break-words">
              {friendlyMessage}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
