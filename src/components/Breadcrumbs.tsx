import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-xs text-[#a39f96] ${className}`}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#5a5750]" aria-hidden="true" />}
            {isLast || !item.to ? (
              <span className="text-[#e8c872] font-medium truncate max-w-[240px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-[#f7f4ec] transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
