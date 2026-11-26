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
        <div className="min-h-screen bg-[#08080b] text-[#f7f4ec] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#14141b] border border-red-500/40 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-xl text-[#f7f4ec]">
              Something went wrong
            </h2>
            <p className="text-xs text-[#a39f96] leading-relaxed break-words">
              {friendlyMessage}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-gold inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[#0b0905] font-bold text-xs uppercase tracking-wider transition-colors"
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
