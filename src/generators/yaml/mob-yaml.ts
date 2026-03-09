import yaml from 'js-yaml';
import type { MobConfig } from '@/models/mob';

/**
 * Generates MythicMobs mob YAML from a MobConfig model.
 */
export function generateMobYamlFull(mob: MobConfig): string {
  const doc: Record<string, unknown> = {};
  const mobName = mob.internalName || 'UntitledMob';
  const def: Record<string, unknown> = {};

  def['Type'] = mob.type;

  if (mob.displayName) {
    def['Display'] = `'${mob.displayName}'`;
  }

  def['Health'] = mob.health;
  def['Damage'] = mob.damage;

  if (mob.armor > 0) {
    def['Armor'] = mob.armor;
  }

  if (mob.faction) {
    def['Faction'] = mob.faction;
  }

  if (mob.mount) {
    def['Mount'] = mob.mount;
  }

  if (mob.disguise) {
    def['Disguise'] = mob.disguise;
  }

  // Boss bar
  if (mob.bossBar?.enabled) {
    def['BossBar'] = {
      Enabled: true,
      Title: mob.bossBar.title,
      Range: mob.bossBar.range,
      Color: mob.bossBar.color,
      Style: mob.bossBar.style,
    };
  }

  // Options
  if (mob.options.length > 0) {
    const opts: Record<string, unknown> = {};
    for (const opt of mob.options) {
      opts[opt.key] = opt.value;
    }
    def['Options'] = opts;
  }

  // Equipment
  if (mob.equipment.length > 0) {
    const eq: string[] = [];
    for (const slot of mob.equipment) {
      if (slot.item) {
        eq.push(`${slot.item}:${slot.slot}`);
      }
    }
    if (eq.length > 0) def['Equipment'] = eq;
  }

  // Skills
  if (mob.skills.length > 0) {
    def['Skills'] = mob.skills.map((s) => {
      let line = `- skill{s=${s.skillName}}`;
      if (s.trigger) line += ` ${s.trigger}`;
      if (s.healthModifier) line += ` ${s.healthModifier}`;
      return line;
    });
  }

  // Drops
  if (mob.drops.length > 0) {
    def['Drops'] = mob.drops.map((d) => {
      return `${d.item} ${d.amount} ${d.chance}`;
    });
  }

  // Droptables
  if (mob.droptables.length > 0) {
    def['Droptables'] = mob.droptables;
  }

  // AI
  if (mob.aiGoalSelectors.length > 0) {
    const goals: Record<string, unknown> = {};
    for (const g of mob.aiGoalSelectors) {
      goals[String(g.priority)] = { type: g.type, ...g.params };
    }
    def['AIGoalSelectors'] = goals;
  }

  if (mob.aiTargetSelectors.length > 0) {
    const targets: Record<string, unknown> = {};
    for (const t of mob.aiTargetSelectors) {
      targets[String(t.priority)] = { type: t.type, ...t.params };
    }
    def['AITargetSelectors'] = targets;
  }

  doc[mobName] = def;

  return yaml.dump(doc, {
    indent: 2,
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
    sortKeys: false,
  });
}
