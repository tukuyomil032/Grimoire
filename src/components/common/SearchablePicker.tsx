import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PickerOption {
  value: string;
  label: string;
  category?: string;
  description?: string;
}

interface SearchablePickerProps {
  value: string;
  onChange: (value: string) => void;
  options: PickerOption[];
  placeholder?: string;
  label?: string;
  className?: string;
  /** Max visible dropdown items before scrolling */
  maxVisible?: number;
}

export function SearchablePicker({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  label,
  className,
  maxVisible = 8,
}: SearchablePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        o.value.toLowerCase().includes(q) ||
        o.label.toLowerCase().includes(q) ||
        (o.category?.toLowerCase().includes(q) ?? false) ||
        (o.description?.toLowerCase().includes(q) ?? false)
    );
  }, [options, query]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, PickerOption[]> = {};
    for (const opt of filtered) {
      const cat = opt.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(opt);
    }
    return groups;
  }, [filtered]);

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <label className="mb-1 block text-xs font-medium text-foreground/50">{label}</label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between rounded border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors hover:border-foreground/20 focus:border-accent-primary',
          isOpen && 'border-accent-primary'
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
      >
        <span className={value ? 'text-foreground' : 'text-foreground/30'}>
          {value ? selectedLabel : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <span
              className="rounded p-0.5 text-foreground/30 hover:bg-surface-1 hover:text-foreground/60"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown
            size={12}
            className={cn('text-foreground/30 transition-transform', isOpen && 'rotate-180')}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-surface-1 shadow-xl">
          {/* Search input */}
          <div className="border-b border-border p-1.5">
            <div className="relative">
              <Search
                size={12}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/30"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded border border-border bg-surface-2 py-1 pl-6 pr-2 text-xs text-foreground outline-none placeholder:text-foreground/25 focus:border-accent-primary"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="overflow-y-auto" style={{ maxHeight: `${maxVisible * 28}px` }}>
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-foreground/30">No results</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  {Object.keys(grouped).length > 1 && (
                    <div className="sticky top-0 bg-surface-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/30">
                      {category}
                    </div>
                  )}
                  {items.map((opt) => (
                    <button
                      key={opt.value}
                      className={cn(
                        'flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-accent-primary/10',
                        opt.value === value && 'bg-accent-primary/5 text-accent-primary'
                      )}
                      onClick={() => handleSelect(opt.value)}
                    >
                      <span className="flex-1 text-left">{opt.label}</span>
                      {opt.description && (
                        <span className="text-[10px] text-foreground/25">{opt.description}</span>
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
