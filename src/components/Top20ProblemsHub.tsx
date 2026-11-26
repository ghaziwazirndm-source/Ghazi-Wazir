import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { TOP_20_PROBLEMS, type ProblemCategory } from '../data/top20Problems';

const CATEGORIES: ProblemCategory[] = [
  'All',
  'Bahrain CR Setup',
  'Visas & LMRA',
  'Tax, Banking & US LLC',
  'GEO, SEO & AI Growth',
];

export function Top20ProblemsHub() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProblemCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>('p01-foreign-ownership');

  const filteredProblems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOP_20_PROBLEMS.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.problemSummary.toLowerCase().includes(q) ||
        item.solution.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  return (
    <section
      id="top-20-problems"
      aria-labelledby="top-20-heading"
      className="py-16 sm:py-20 bg-[#0b0b10] border-t border-[#262633]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (H2) */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="tag inline-block">Executive Advisory Dossier</div>
          <h2
            id="top-20-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-[#f7f4ec]"
          >
            Top 20 Bahrain Setup, Visa, Tax &amp; AI Growth Problems Solved
          </h2>
          <p className="text-sm text-[#a39f96] leading-relaxed">
            Search verified executive answers to the 20 most frequent commercial registration, residency, banking, SEO/GEO, and automation roadblocks—linked directly to official portals and action blueprints.
          </p>
        </div>

        {/* Search & Segmented Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <label htmlFor="top20-search" className="sr-only">
              Search top 20 business setup, visa, tax, and GEO problems
            </label>
            <Search className="w-4 h-4 text-[#a39f96] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="top20-search"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search any problem (e.g. 100% ownership, Sijilat CR, Golden Visa, 0% tax, GEO, ChatGPT, banking)..."
              className="w-full min-h-[48px] pl-11 pr-4 py-3 rounded-xl bg-[#14141b] border border-[#262633] text-sm text-[#f7f4ec] placeholder-[#a39f96] focus:outline-none focus:border-[#e8c872] transition-colors"
            />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Filter problems by category"
          >
            {CATEGORIES.map(category => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#e8c872] text-[#0b0905] border-[#e8c872] shadow-md'
                      : 'bg-[#14141b] text-[#d6d1c7] border-[#262633] hover:border-[#e8c872]/50 hover:text-[#f7f4ec]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Problems Grid with Clean Unboxed Editorial Metadata & Strict H3 -> H4 Hierarchy */}
        {filteredProblems.length === 0 ? (
          <div className="max-w-xl mx-auto text-center p-8 rounded-2xl bg-[#14141b] border border-[#262633] space-y-3">
            <p className="text-sm text-[#f7f4ec] font-semibold">
              No matching problem found for &ldquo;{query}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
              }}
              className="btn-gold min-h-[44px] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProblems.map(item => {
              const isOpen = expandedId === item.id || query.trim().length > 0;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="card-luxury p-6 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#e8c872] tabular-nums">
                        <span className="font-mono font-bold">{item.number}.</span>
                        <span aria-hidden="true" className="text-[#525264]">&middot;</span>
                        <span className="text-[#a39f96]">{item.category}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-body`}
                        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-[#a39f96] hover:text-[#f7f4ec] hover:bg-[#1b1b24] transition-colors"
                        title={isOpen ? 'Collapse details' : 'Expand details'}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* H3: Problem Question */}
                    <h3 className="font-heading font-bold text-xl text-[#f7f4ec] leading-snug">
                      {item.question}
                    </h3>

                    <p className="text-xs text-[#a39f96] leading-relaxed">
                      <strong className="text-[#e6e0d3]">Challenge:</strong> {item.problemSummary}
                    </p>

                    {/* H4: Verified Solution Block */}
                    <div
                      id={`${item.id}-body`}
                      className={`pt-3 border-t border-[#262633] space-y-1.5 ${
                        isOpen ? 'block' : 'hidden sm:block'
                      }`}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
                        Executive Solution
                      </h4>
                      <p className="text-xs sm:text-sm text-[#e6e0d3] leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Internal + Authoritative External Links */}
                  <div className="pt-3 border-t border-[#262633]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <Link
                      to={item.internalLink.to}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#e8c872] hover:underline min-h-[36px]"
                    >
                      <span>{item.internalLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {item.externalSource && (
                      <a
                        href={item.externalSource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#a39f96] hover:text-[#f7f4ec] transition-colors min-h-[36px]"
                      >
                        <span>{item.externalSource.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
