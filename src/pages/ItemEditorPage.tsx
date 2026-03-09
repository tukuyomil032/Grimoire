import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useEditorStore } from '@/store';
import { createEmptyItem } from '@/models/item';
import type { ItemConfig, EnchantmentEntry, AttributeEntry, ItemSkillEntry } from '@/models/item';
import { MaterialPicker } from '@/components/common/MaterialPicker';
import { EnchantmentPicker } from '@/components/common/EnchantmentPicker';

export function ItemEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const openTab = useEditorStore((s) => s.openTab);

  const [item, setItem] = useState<ItemConfig>(() => {
    const it = createEmptyItem();
    if (id) it.id = id;
    it.internalName = t('editor.untitled');
    return it;
  });

  const [sections, setSections] = useState({
    basic: true,
    enchantments: false,
    attributes: false,
    lore: false,
    skills: false,
    options: false,
  });

  useEffect(() => {
    if (!id) {
      const it = createEmptyItem();
      it.internalName = t('editor.untitled');
      setItem(it);
      openTab({ id: it.id, type: 'item', title: it.internalName, entityId: it.id, dirty: false });
      navigate(`/item/${it.id}`, { replace: true });
    }
  }, [id, navigate, openTab, t]);

  const toggleSection = (key: keyof typeof sections) =>
    setSections((s) => ({ ...s, [key]: !s[key] }));

  const updateItem = (updates: Partial<ItemConfig>) => {
    setItem((it) => ({ ...it, ...updates, updatedAt: new Date().toISOString() }));
  };

  // Enchantment helpers
  const addEnchantment = () => {
    updateItem({ enchantments: [...item.enchantments, { enchantment: '', level: 1 }] });
  };
  const removeEnchantment = (i: number) => {
    updateItem({ enchantments: item.enchantments.filter((_, idx) => idx !== i) });
  };
  const updateEnchantment = (i: number, field: keyof EnchantmentEntry, value: string | number) => {
    const list = [...item.enchantments];
    list[i] = { ...list[i], [field]: value } as EnchantmentEntry;
    updateItem({ enchantments: list });
  };

  // Attribute helpers
  const addAttribute = () => {
    updateItem({
      attributes: [...item.attributes, { attribute: '', amount: 0, operation: 'ADD' }],
    });
  };
  const removeAttribute = (i: number) => {
    updateItem({ attributes: item.attributes.filter((_, idx) => idx !== i) });
  };
  const updateAttribute = (i: number, field: keyof AttributeEntry, value: string | number) => {
    const list = [...item.attributes];
    list[i] = { ...list[i], [field]: value } as AttributeEntry;
    updateItem({ attributes: list });
  };

  // Lore helpers
  const addLoreLine = () => updateItem({ lore: [...item.lore, ''] });
  const removeLoreLine = (i: number) => {
    updateItem({ lore: item.lore.filter((_, idx) => idx !== i) });
  };
  const updateLoreLine = (i: number, value: string) => {
    const list = [...item.lore];
    list[i] = value;
    updateItem({ lore: list });
  };

  // Skill helpers
  const addSkill = () => {
    updateItem({ skills: [...item.skills, { skillName: '', trigger: '~onUse' }] });
  };
  const removeSkill = (i: number) => {
    updateItem({ skills: item.skills.filter((_, idx) => idx !== i) });
  };
  const updateItemSkill = (i: number, field: keyof ItemSkillEntry, value: string) => {
    const list = [...item.skills];
    list[i] = { ...list[i], [field]: value };
    updateItem({ skills: list });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">{t('editor.newItem')}</h1>
        <p className="text-xs text-foreground/40">MythicMobs Item Configuration</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-2 p-6">
          {/* Basic */}
          <CollapsibleSection
            label="Basic Properties"
            open={sections.basic}
            onToggle={() => toggleSection('basic')}
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Internal Name">
                <input
                  className="input-field"
                  value={item.internalName}
                  onChange={(e) => updateItem({ internalName: e.target.value })}
                  placeholder="MyItem"
                />
              </Field>
              <Field label="Display Name">
                <input
                  className="input-field"
                  value={item.displayName}
                  onChange={(e) => updateItem({ displayName: e.target.value })}
                  placeholder="&6&lLegendary Sword"
                />
              </Field>
              <Field label="Material">
                <MaterialPicker
                  value={item.material}
                  onChange={(value) => updateItem({ material: value })}
                />
              </Field>
              <Field label="Amount">
                <input
                  type="number"
                  className="input-field"
                  value={item.amount}
                  min={1}
                  max={64}
                  onChange={(e) => updateItem({ amount: Number(e.target.value) })}
                />
              </Field>
              <Field label="Custom Model Data">
                <input
                  type="number"
                  className="input-field"
                  value={item.customModelData || ''}
                  onChange={(e) =>
                    updateItem({
                      customModelData: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
              </Field>
              <Field label="Unbreakable">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.unbreakable}
                    onChange={(e) => updateItem({ unbreakable: e.target.checked })}
                    className="accent-accent-primary"
                  />
                  <span className="text-xs text-foreground/60">Unbreakable</span>
                </label>
              </Field>
            </div>
          </CollapsibleSection>

          {/* Lore */}
          <CollapsibleSection
            label="Lore"
            open={sections.lore}
            onToggle={() => toggleSection('lore')}
          >
            {item.lore.map((line, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  className="input-field flex-1"
                  value={line}
                  onChange={(e) => updateLoreLine(i, e.target.value)}
                  placeholder="&7Lore line..."
                />
                <button
                  onClick={() => removeLoreLine(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addLoreLine}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Line
            </button>
          </CollapsibleSection>

          {/* Enchantments */}
          <CollapsibleSection
            label="Enchantments"
            open={sections.enchantments}
            onToggle={() => toggleSection('enchantments')}
          >
            {item.enchantments.map((enc, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <EnchantmentPicker
                  value={enc.enchantment}
                  onChange={(value) => updateEnchantment(i, 'enchantment', value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  className="input-field w-20"
                  value={enc.level}
                  min={1}
                  onChange={(e) => updateEnchantment(i, 'level', Number(e.target.value))}
                />
                <button
                  onClick={() => removeEnchantment(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addEnchantment}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Enchantment
            </button>
          </CollapsibleSection>

          {/* Attributes */}
          <CollapsibleSection
            label="Attributes"
            open={sections.attributes}
            onToggle={() => toggleSection('attributes')}
          >
            {item.attributes.map((attr, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  className="input-field flex-1"
                  value={attr.attribute}
                  onChange={(e) => updateAttribute(i, 'attribute', e.target.value)}
                  placeholder="generic.attack_damage"
                />
                <input
                  type="number"
                  className="input-field w-20"
                  value={attr.amount}
                  step={0.1}
                  onChange={(e) => updateAttribute(i, 'amount', Number(e.target.value))}
                />
                <select
                  className="input-field w-36"
                  value={attr.operation}
                  onChange={(e) => updateAttribute(i, 'operation', e.target.value)}
                >
                  <option value="ADD">ADD</option>
                  <option value="MULTIPLY_BASE">MULTIPLY_BASE</option>
                  <option value="MULTIPLY">MULTIPLY</option>
                </select>
                <button
                  onClick={() => removeAttribute(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addAttribute}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Attribute
            </button>
          </CollapsibleSection>

          {/* Skills */}
          <CollapsibleSection
            label="Skills"
            open={sections.skills}
            onToggle={() => toggleSection('skills')}
          >
            {item.skills.map((sk, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  className="input-field flex-1"
                  value={sk.skillName}
                  onChange={(e) => updateItemSkill(i, 'skillName', e.target.value)}
                  placeholder="SkillName"
                />
                <input
                  className="input-field w-40"
                  value={sk.trigger}
                  onChange={(e) => updateItemSkill(i, 'trigger', e.target.value)}
                  placeholder="~onUse"
                />
                <button
                  onClick={() => removeSkill(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Skill
            </button>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-1">
      <button
        className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-surface-2"
        onClick={onToggle}
      >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {label}
      </button>
      {open && <div className="border-t border-border px-4 py-3">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-foreground/50">{label}</label>
      {children}
    </div>
  );
}
