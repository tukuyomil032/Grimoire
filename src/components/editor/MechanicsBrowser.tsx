import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { ALL_MECHANICS, ALL_CONDITIONS, ALL_TARGETERS } from '@/components/blockly/blocks';
import type { MechanicSchema } from '@/models/mechanic';
import type { ConditionSchema } from '@/models/condition';
import type { TargeterSchema } from '@/models/targeter';
import { cn } from '@/lib/utils';

type BrowseTab = 'mechanics' | 'conditions' | 'targeters';

const CATEGORY_COLORS: Record<string, string> = {
  damage: 'bg-red-500/20 text-red-400',
  healing: 'bg-green-500/20 text-green-400',
  movement: 'bg-blue-500/20 text-blue-400',
  particle: 'bg-pink-500/20 text-pink-400',
  effect: 'bg-yellow-500/20 text-yellow-400',
  potion: 'bg-purple-500/20 text-purple-400',
  block: 'bg-orange-500/20 text-orange-400',
  entity: 'bg-cyan-500/20 text-cyan-400',
  'player-ui': 'bg-indigo-500/20 text-indigo-400',
  bossbar: 'bg-amber-500/20 text-amber-400',
  display: 'bg-teal-500/20 text-teal-400',
  disguise: 'bg-violet-500/20 text-violet-400',
  item: 'bg-lime-500/20 text-lime-400',
  scoreboard: 'bg-slate-500/20 text-slate-400',
  ai: 'bg-rose-500/20 text-rose-400',
  projectile: 'bg-sky-500/20 text-sky-400',
  meta: 'bg-fuchsia-500/20 text-fuchsia-400',
  utility: 'bg-gray-500/20 text-gray-400',
  spawn: 'bg-emerald-500/20 text-emerald-400',
  aggro: 'bg-red-600/20 text-red-500',
  variable: 'bg-blue-600/20 text-blue-500',
  sound: 'bg-violet-600/20 text-violet-500',
  other: 'bg-neutral-500/20 text-neutral-400',
  // Conditions categories
  compare: 'bg-amber-500/20 text-amber-400',
  position: 'bg-teal-500/20 text-teal-400',
  world: 'bg-emerald-500/20 text-emerald-400',
  // Targeter categories
  location: 'bg-blue-500/20 text-blue-400',
  special: 'bg-purple-500/20 text-purple-400',
};

interface MechanicsBrowserProps {
  /** Called when user wants to add a mechanic to the workspace */
  onAddMechanic?: (mechanic: MechanicSchema) => void;
  onAddCondition?: (condition: ConditionSchema) => void;
  onAddTargeter?: (targeter: TargeterSchema) => void;
}

export function MechanicsBrowser({
  onAddMechanic,
  onAddCondition,
  onAddTargeter,
}: MechanicsBrowserProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ja';

  const [activeTab, setActiveTab] = useState<BrowseTab>('mechanics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Get all unique categories for the active tab
  const categories = useMemo(() => {
    switch (activeTab) {
      case 'mechanics':
        return [...new Set(ALL_MECHANICS.map((m) => m.category))].sort();
      case 'conditions':
        return [...new Set(ALL_CONDITIONS.map((c) => c.category))].sort();
      case 'targeters':
        return [...new Set(ALL_TARGETERS.map((t) => t.category))].sort();
    }
  }, [activeTab]);

  // Filter items by search query and selected categories
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = (
      name: string,
      aliases: string[],
      description: Record<string, string>
    ) => {
      if (!query) return true;
      return (
        name.toLowerCase().includes(query) ||
        aliases.some((a) => a.toLowerCase().includes(query)) ||
        (description.en?.toLowerCase().includes(query) ?? false) ||
        (description.ja?.toLowerCase().includes(query) ?? false)
      );
    };

    const matchesCategory = (category: string) => {
      if (selectedCategories.size === 0) return true;
      return selectedCategories.has(category);
    };

    switch (activeTab) {
      case 'mechanics':
        return ALL_MECHANICS.filter(
          (m) => matchesSearch(m.name, m.aliases, m.description) && matchesCategory(m.category)
        );
      case 'conditions':
        return ALL_CONDITIONS.filter(
          (c) => matchesSearch(c.name, c.aliases, c.description) && matchesCategory(c.category)
        );
      case 'targeters':
        return ALL_TARGETERS.filter(
          (t) => matchesSearch(t.name, t.aliases, t.description) && matchesCategory(t.category)
        );
    }
  }, [activeTab, searchQuery, selectedCategories]);

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, (MechanicSchema | ConditionSchema | TargeterSchema)[]> = {};
    for (const item of filteredItems) {
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return groups;
  }, [filteredItems]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handleAdd = useCallback(
    (item: MechanicSchema | ConditionSchema | TargeterSchema) => {
      if (activeTab === 'mechanics' && onAddMechanic) {
        onAddMechanic(item as MechanicSchema);
      } else if (activeTab === 'conditions' && onAddCondition) {
        onAddCondition(item as ConditionSchema);
      } else if (activeTab === 'targeters' && onAddTargeter) {
        onAddTargeter(item as TargeterSchema);
      }
    },
    [activeTab, onAddMechanic, onAddCondition, onAddTargeter]
  );

  return (
    <div className="flex h-full flex-col bg-surface-1">
      {/* Header */}
      <div className="border-b border-border px-3 py-2">
        <span className="text-xs font-medium text-foreground/60">
          {t('panel.mechanicsBrowser')}
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-border">
        {(['mechanics', 'conditions', 'targeters'] as const).map((tab) => (
          <button
            key={tab}
            className={cn(
              'flex-1 px-2 py-1.5 text-[11px] font-medium transition-colors',
              activeTab === tab
                ? 'border-b-2 border-accent-primary text-foreground'
                : 'text-foreground/40 hover:text-foreground/60'
            )}
            onClick={() => {
              setActiveTab(tab);
              setSearchQuery('');
              setSelectedCategories(new Set());
            }}
          >
            {tab === 'mechanics'
              ? `Mechanics (${ALL_MECHANICS.length})`
              : tab === 'conditions'
                ? `Conditions (${ALL_CONDITIONS.length})`
                : `Targeters (${ALL_TARGETERS.length})`}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="border-b border-border px-2 py-2">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/30"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full rounded border border-border bg-surface-2 py-1.5 pl-7 pr-2 text-xs text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-accent-primary"
          />
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-1 border-b border-border px-2 py-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
              selectedCategories.has(cat)
                ? CATEGORY_COLORS[cat] || 'bg-accent-primary/20 text-accent-primary'
                : 'bg-surface-2 text-foreground/40 hover:text-foreground/60'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-xs text-foreground/30">
            {t('common.noResults')}
          </div>
        ) : (
          <div className="py-1">
            {Object.entries(groupedItems)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, items]) => {
                const isExpanded = expandedCategories.has(category) || searchQuery.length > 0;
                return (
                  <div key={category}>
                    {/* Category header */}
                    <button
                      className="flex w-full items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-foreground/50 hover:bg-surface-2/50"
                      onClick={() => toggleExpanded(category)}
                    >
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.5 text-[10px]',
                          CATEGORY_COLORS[category] || 'bg-surface-2 text-foreground/40'
                        )}
                      >
                        {category}
                      </span>
                      <span className="text-foreground/25">({items.length})</span>
                    </button>

                    {/* Items */}
                    {isExpanded &&
                      items.map((item) => (
                        <div
                          key={item.name}
                          className="group flex items-start gap-2 px-3 py-1.5 hover:bg-surface-2/30"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-foreground">
                                {item.name}
                              </span>
                              {'aliases' in item && item.aliases.length > 0 && (
                                <span className="text-[10px] text-foreground/25">
                                  ({item.aliases.join(', ')})
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] leading-tight text-foreground/40">
                              {item.description[lang] || item.description.en}
                            </p>
                            {'parameters' in item && item.parameters.length > 0 && (
                              <div className="mt-0.5 flex flex-wrap gap-1">
                                {item.parameters.slice(0, 3).map((p) => (
                                  <span
                                    key={p.name}
                                    className="rounded bg-surface-2 px-1 py-0.5 text-[9px] text-foreground/30"
                                  >
                                    {p.name}
                                  </span>
                                ))}
                                {item.parameters.length > 3 && (
                                  <span className="text-[9px] text-foreground/20">
                                    +{item.parameters.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <button
                            className="mt-0.5 rounded p-0.5 text-foreground/20 opacity-0 transition-opacity hover:bg-accent-primary/10 hover:text-accent-primary group-hover:opacity-100"
                            onClick={() => handleAdd(item)}
                            title="Add to workspace"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-3 py-1.5">
        <span className="text-[10px] text-foreground/25">
          {filteredItems.length} /{' '}
          {activeTab === 'mechanics'
            ? ALL_MECHANICS.length
            : activeTab === 'conditions'
              ? ALL_CONDITIONS.length
              : ALL_TARGETERS.length}{' '}
          {activeTab}
        </span>
      </div>
    </div>
  );
}
