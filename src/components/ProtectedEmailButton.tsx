import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

interface ProtectedEmailButtonProps {
  variant?: 'footer' | 'card' | 'inline';
  className?: string;
}

function openProtectedEmailDesk(e: React.MouseEvent) {
  e.preventDefault();
  const userCodes = [103, 104, 97, 122, 105, 119, 97, 122, 105, 114, 110, 100, 109];
  const domainCodes = [103, 109, 97, 105, 108, 46, 99, 111, 109];
  const decodedUser = String.fromCharCode(...userCodes);
  const decodedDomain = String.fromCharCode(...domainCodes);
  window.location.href = ['mai', 'lto:', decodedUser, String.fromCharCode(64), decodedDomain].join('');
}

export function ProtectedEmailButton({ variant = 'footer', className = '' }: ProtectedEmailButtonProps) {
  if (variant === 'card') {
    return (
      <div className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border border-[#2a2a38] bg-[#101018] ${className}`}>
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <div>
            <span className="font-bold text-[#f5f1e8] text-sm block">Executive Email Desk</span>
            <span className="text-[#a8a7b3] block">Protected against scraper bots</span>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button
                type="button"
                onClick={openProtectedEmailDesk}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8c872] text-[#16120a] font-bold text-[11px] hover:bg-[#d4b35e] transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Launch Mail Client</span>
              </button>
              <Link
                to="/contact"
                className="text-[11px] text-[#38bdf8] hover:underline font-medium"
              >
                Use Secure Form &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={openProtectedEmailDesk}
        className={`inline-flex items-center gap-1.5 text-[#e8c872] hover:underline font-medium min-h-[32px] ${className}`}
      >
        <Lock className="w-3.5 h-3.5" />
        <span>Protected Executive Desk</span>
      </button>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={openProtectedEmailDesk}
        className="flex items-center gap-2 text-sm text-[#f5f1e8] hover:text-[#e8c872] transition-colors min-h-[36px]"
      >
        <Mail className="w-4 h-4 text-[#e8c872]" />
        <span>Executive Email Desk (Protected)</span>
      </button>
    </div>
  );
}
