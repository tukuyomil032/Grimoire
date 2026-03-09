import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useEditorStore } from '@/store';
import { createEmptyMob } from '@/models/mob';
import type { MobConfig, EquipmentSlot, MobSkillEntry, DropEntry } from '@/models/mob';
import { EntityTypePicker } from '@/components/common/EntityTypePicker';

export function MobEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const openTab = useEditorStore((s) => s.openTab);

  const [mob, setMob] = useState<MobConfig>(() => {
    const m = createEmptyMob();
    if (id) m.id = id;
    m.internalName = t('editor.untitled');
    return m;
  });

  const [sections, setSections] = useState({
    basic: true,
    equipment: false,
    skills: false,
    drops: false,
    ai: false,
    options: false,
  });

  useEffect(() => {
    if (!id) {
      const m = createEmptyMob();
      m.internalName = t('editor.untitled');
      setMob(m);
      openTab({ id: m.id, type: 'mob', title: m.internalName, entityId: m.id, dirty: false });
      navigate(`/mob/${m.id}`, { replace: true });
    }
  }, [id, navigate, openTab, t]);

  const toggleSection = (key: keyof typeof sections) =>
    setSections((s) => ({ ...s, [key]: !s[key] }));

  const updateMob = (updates: Partial<MobConfig>) => {
    setMob((m) => ({ ...m, ...updates, updatedAt: new Date().toISOString() }));
  };

  const addEquipment = () => {
    updateMob({ equipment: [...mob.equipment, { slot: 'MAINHAND', item: '' }] });
  };

  const removeEquipment = (i: number) => {
    updateMob({ equipment: mob.equipment.filter((_, idx) => idx !== i) });
  };

  const updateEquipment = (i: number, field: keyof EquipmentSlot, value: string) => {
    const eq = [...mob.equipment];
    eq[i] = { ...eq[i], [field]: value } as EquipmentSlot;
    updateMob({ equipment: eq });
  };

  const addSkill = () => {
    updateMob({ skills: [...mob.skills, { skillName: '', trigger: '~onAttack' }] });
  };

  const removeSkill = (i: number) => {
    updateMob({ skills: mob.skills.filter((_, idx) => idx !== i) });
  };

  const updateMobSkill = (i: number, field: keyof MobSkillEntry, value: string) => {
    const sk = [...mob.skills];
    sk[i] = { ...sk[i], [field]: value };
    updateMob({ skills: sk });
  };

  const addDrop = () => {
    updateMob({ drops: [...mob.drops, { item: '', amount: 1, chance: 1 }] });
  };

  const removeDrop = (i: number) => {
    updateMob({ drops: mob.drops.filter((_, idx) => idx !== i) });
  };

  const updateDrop = (i: number, field: keyof DropEntry, value: string | number) => {
    const dr = [...mob.drops];
    dr[i] = { ...dr[i], [field]: value } as DropEntry;
    updateMob({ drops: dr });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">{t('editor.newMob')}</h1>
        <p className="text-xs text-foreground/40">MythicMobs Mob Configuration</p>
      </div>

      {/* Content */}
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
                  value={mob.internalName}
                  onChange={(e) => updateMob({ internalName: e.target.value })}
                  placeholder="MyMob"
                />
              </Field>
              <Field label="Display Name">
                <input
                  className="input-field"
                  value={mob.displayName}
                  onChange={(e) => updateMob({ displayName: e.target.value })}
                  placeholder="&c&lCool Mob"
                />
              </Field>
              <Field label="Type">
                <EntityTypePicker
                  value={mob.type}
                  onChange={(value) => updateMob({ type: value })}
                />
              </Field>
              <Field label="Faction">
                <input
                  className="input-field"
                  value={mob.faction || ''}
                  onChange={(e) => updateMob({ faction: e.target.value })}
                  placeholder="undead"
                />
              </Field>
              <Field label="Health">
                <input
                  type="number"
                  className="input-field"
                  value={mob.health}
                  onChange={(e) => updateMob({ health: Number(e.target.value) })}
                />
              </Field>
              <Field label="Damage">
                <input
                  type="number"
                  className="input-field"
                  value={mob.damage}
                  onChange={(e) => updateMob({ damage: Number(e.target.value) })}
                />
              </Field>
              <Field label="Armor">
                <input
                  type="number"
                  className="input-field"
                  value={mob.armor}
                  onChange={(e) => updateMob({ armor: Number(e.target.value) })}
                />
              </Field>
              <Field label="Name Visible">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mob.nameVisible}
                    onChange={(e) => updateMob({ nameVisible: e.target.checked })}
                    className="accent-accent-primary"
                  />
                  <span className="text-xs text-foreground/60">Show name</span>
                </label>
              </Field>
            </div>
          </CollapsibleSection>

          {/* Equipment */}
          <CollapsibleSection
            label="Equipment"
            open={sections.equipment}
            onToggle={() => toggleSection('equipment')}
          >
            {mob.equipment.map((eq, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <select
                  className="input-field w-36"
                  value={eq.slot}
                  onChange={(e) => updateEquipment(i, 'slot', e.target.value)}
                >
                  {['HELMET', 'CHESTPLATE', 'LEGGINGS', 'BOOTS', 'MAINHAND', 'OFFHAND'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  className="input-field flex-1"
                  value={eq.item}
                  onChange={(e) => updateEquipment(i, 'item', e.target.value)}
                  placeholder="item_name"
                />
                <button
                  onClick={() => removeEquipment(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addEquipment}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Slot
            </button>
          </CollapsibleSection>

          {/* Skills */}
          <CollapsibleSection
            label="Skills"
            open={sections.skills}
            onToggle={() => toggleSection('skills')}
          >
            {mob.skills.map((sk, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  className="input-field flex-1"
                  value={sk.skillName}
                  onChange={(e) => updateMobSkill(i, 'skillName', e.target.value)}
                  placeholder="SkillName"
                />
                <input
                  className="input-field w-40"
                  value={sk.trigger}
                  onChange={(e) => updateMobSkill(i, 'trigger', e.target.value)}
                  placeholder="~onAttack"
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

          {/* Drops */}
          <CollapsibleSection
            label="Drops"
            open={sections.drops}
            onToggle={() => toggleSection('drops')}
          >
            {mob.drops.map((dr, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  className="input-field flex-1"
                  value={dr.item}
                  onChange={(e) => updateDrop(i, 'item', e.target.value)}
                  placeholder="item_name"
                />
                <input
                  type="number"
                  className="input-field w-20"
                  value={typeof dr.amount === 'number' ? dr.amount : 1}
                  onChange={(e) => updateDrop(i, 'amount', Number(e.target.value))}
                  placeholder="Amount"
                />
                <input
                  type="number"
                  className="input-field w-20"
                  value={dr.chance}
                  onChange={(e) => updateDrop(i, 'chance', Number(e.target.value))}
                  placeholder="Chance"
                  step={0.01}
                  min={0}
                  max={1}
                />
                <button
                  onClick={() => removeDrop(i)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addDrop}
              className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
            >
              <Plus size={12} /> Add Drop
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
