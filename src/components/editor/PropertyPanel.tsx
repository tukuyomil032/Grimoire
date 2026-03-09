import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '@/store';
import { TRIGGER_LIST } from '@/models/trigger';
import { ALL_MECHANICS, ALL_CONDITIONS } from '@/components/blockly/blocks';
import type { MechanicSchema } from '@/models/mechanic';
import type { ConditionSchema } from '@/models/condition';

interface PropertyPanelProps {
  skillId: string;
}

export function PropertyPanel({ skillId }: PropertyPanelProps) {
  const { t } = useTranslation();
  const skills = useEditorStore((s) => s.skills);
  const updateSkill = useEditorStore((s) => s.updateSkill);
  const markTabDirty = useEditorStore((s) => s.markTabDirty);
  const selectedBlockId = useEditorStore((s) => s.selectedBlockId);

  const skill = skills[skillId];

  // Resolve the selected block to a schema
  const selectedSchema = useMemo<{
    mechanic?: MechanicSchema;
    condition?: ConditionSchema;
    blockType?: string;
  }>(() => {
    if (!selectedBlockId) return {};
    // Extract mechanic/condition name from block type
    if (selectedBlockId.startsWith('mythic_mechanic_')) {
      const name = selectedBlockId.replace('mythic_mechanic_', '').replace(/_/g, '');
      const schema = ALL_MECHANICS.find(
        (m) => m.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === name.toLowerCase()
      );
      return { mechanic: schema, blockType: selectedBlockId };
    }
    if (selectedBlockId.startsWith('mythic_condition_')) {
      const name = selectedBlockId.replace('mythic_condition_', '').replace(/_/g, '');
      const schema = ALL_CONDITIONS.find(
        (c) => c.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === name.toLowerCase()
      );
      return { condition: schema, blockType: selectedBlockId };
    }
    return { blockType: selectedBlockId };
  }, [selectedBlockId]);

  if (!skill) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-foreground/30">
        {t('common.noResults')}
      </div>
    );
  }

  const handleNameChange = (name: string) => {
    updateSkill(skillId, (s) => ({ ...s, internalName: name }));
    markTabDirty(skillId, true);
  };

  const handleCooldownChange = (cooldown: number) => {
    updateSkill(skillId, (s) => ({ ...s, cooldown }));
    markTabDirty(skillId, true);
  };

  const handleTriggerChange = (trigger: string) => {
    updateSkill(skillId, (s) => ({
      ...s,
      triggers: [trigger],
    }));
    markTabDirty(skillId, true);
  };

  return (
    <div className="flex h-full flex-col bg-surface-1">
      {/* Header */}
      <div className="border-b border-border px-3 py-2">
        <span className="text-xs font-medium text-foreground/60">{t('panel.properties')}</span>
      </div>

      {/* Properties form */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-4">
          {/* Internal Name */}
          <PropertyField label={t('skill.internalName')}>
            <input
              type="text"
              value={skill.internalName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full rounded border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors focus:border-accent-primary"
              placeholder="MySkill"
            />
          </PropertyField>

          {/* Trigger */}
          <PropertyField label={t('skill.trigger')}>
            <select
              value={skill.triggers?.[0] || ''}
              onChange={(e) => handleTriggerChange(e.target.value)}
              className="w-full rounded border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors focus:border-accent-primary"
            >
              <option value="">-- Select Trigger --</option>
              {TRIGGER_LIST.map((trigger) => (
                <option key={trigger.name} value={trigger.name}>
                  {trigger.name}
                </option>
              ))}
            </select>
          </PropertyField>

          {/* Cooldown */}
          <PropertyField label={t('skill.cooldown')}>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={skill.cooldown || 0}
                onChange={(e) => handleCooldownChange(Number(e.target.value))}
                className="w-24 rounded border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors focus:border-accent-primary"
                min={0}
                step={0.1}
              />
              <span className="text-xs text-foreground/40">seconds</span>
            </div>
          </PropertyField>

          {/* Schema-driven block properties */}
          {selectedSchema.mechanic && (
            <BlockSchemaPanel
              title={selectedSchema.mechanic.name}
              description={selectedSchema.mechanic.description}
              category={selectedSchema.mechanic.category}
              parameters={selectedSchema.mechanic.parameters.map((p) => ({
                name: p.name,
                type: p.type,
                description: p.description,
                defaultValue: p.defaultValue,
                required: p.required,
              }))}
            />
          )}

          {selectedSchema.condition && (
            <BlockSchemaPanel
              title={selectedSchema.condition.name}
              description={selectedSchema.condition.description}
              category={selectedSchema.condition.category}
              parameters={selectedSchema.condition.parameters.map((p) => ({
                name: p.name,
                type: p.type,
                description: p.description,
                defaultValue: p.defaultValue,
                required: p.required,
              }))}
            />
          )}

          {/* Selected block info (non-schema blocks) */}
          {selectedBlockId && !selectedSchema.mechanic && !selectedSchema.condition && (
            <div className="rounded border border-border bg-surface-2 p-3">
              <div className="text-xs font-medium text-foreground/60">Selected Block</div>
              <div className="mt-1 font-mono text-xs text-foreground/40">{selectedBlockId}</div>
            </div>
          )}

          {/* Skill stats */}
          <div className="rounded border border-border bg-surface-2 p-3">
            <div className="text-xs font-medium text-foreground/60">Stats</div>
            <div className="mt-2 flex flex-col gap-1 text-xs text-foreground/40">
              <div className="flex justify-between">
                <span>{t('skill.mechanics')}</span>
                <span>{skill.actions?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('skill.conditions')}</span>
                <span>{skill.conditions?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Triggers</span>
                <span>{skill.triggers?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSchemaPanel({
  title,
  description,
  category,
  parameters,
}: {
  title: string;
  description: Record<string, string>;
  category: string;
  parameters: {
    name: string;
    type: string;
    description: Record<string, string>;
    defaultValue?: unknown;
    required?: boolean;
  }[];
}) {
  return (
    <div className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-foreground">{title}</span>
        <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-foreground/40">
          {category}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-foreground/50">{description.en}</p>

      {parameters.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
            Parameters
          </div>
          {parameters.map((param) => (
            <div key={param.name} className="flex items-center gap-2 text-xs">
              <span
                className={`font-mono ${param.required ? 'text-accent-primary' : 'text-foreground/60'}`}
              >
                {param.name}
                {param.required && <span className="text-red-400">*</span>}
              </span>
              <span className="rounded bg-surface-2 px-1 py-0.5 text-[10px] text-foreground/30">
                {param.type}
              </span>
              {param.defaultValue !== undefined && (
                <span className="text-foreground/30">= {String(param.defaultValue)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-foreground/50">{label}</label>
      {children}
    </div>
  );
}
