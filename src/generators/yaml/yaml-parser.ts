import yaml from 'js-yaml';
import type { Skill, SkillAction, ConditionEntry, Targeter, VariableValue } from '@/models/skill';
import type { MobConfig, EquipmentSlot, MobSkillEntry, DropEntry } from '@/models/mob';
import type { ItemConfig, EnchantmentEntry, AttributeEntry, ItemSkillEntry } from '@/models/item';

/**
 * Parse a MythicMobs skill YAML string into Skill model(s).
 */
export function parseSkillYaml(yamlStr: string): Skill[] {
  const doc = yaml.load(yamlStr) as Record<string, unknown> | null;
  if (!doc || typeof doc !== 'object') return [];

  const skills: Skill[] = [];
  for (const [name, def] of Object.entries(doc)) {
    if (typeof def !== 'object' || def === null) continue;
    const data = def as Record<string, unknown>;
    const skill: Skill = {
      id: crypto.randomUUID(),
      name,
      internalName: name,
      triggers: [],
      cooldown: typeof data['Cooldown'] === 'number' ? data['Cooldown'] : undefined,
      cancelIfNoTargets: data['CancelIfNoTargets'] === true ? true : undefined,
      onCooldownSkill:
        typeof data['OnCooldownSkill'] === 'string' ? data['OnCooldownSkill'] : undefined,
      failedConditionsSkill:
        typeof data['FailedConditionsSkill'] === 'string'
          ? data['FailedConditionsSkill']
          : undefined,
      conditions: parseConditionList(data['Conditions']),
      targetConditions: parseConditionList(data['TargetConditions']),
      triggerConditions: parseConditionList(data['TriggerConditions']),
      actions: parseActionList(data['Skills']),
      variables: parseVariables(data['Variables']),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    skills.push(skill);
  }
  return skills;
}

/**
 * Parse a MythicMobs mob YAML string into MobConfig(s).
 */
export function parseMobYaml(yamlStr: string): MobConfig[] {
  const doc = yaml.load(yamlStr) as Record<string, unknown> | null;
  if (!doc || typeof doc !== 'object') return [];

  const mobs: MobConfig[] = [];
  for (const [name, def] of Object.entries(doc)) {
    if (typeof def !== 'object' || def === null) continue;
    const data = def as Record<string, unknown>;

    const mob: MobConfig = {
      id: crypto.randomUUID(),
      internalName: name,
      displayName: typeof data['Display'] === 'string' ? data['Display'].replace(/^'|'$/g, '') : '',
      type: typeof data['Type'] === 'string' ? data['Type'] : 'ZOMBIE',
      health: typeof data['Health'] === 'number' ? data['Health'] : 20,
      damage: typeof data['Damage'] === 'number' ? data['Damage'] : 5,
      armor: typeof data['Armor'] === 'number' ? data['Armor'] : 0,
      faction: typeof data['Faction'] === 'string' ? data['Faction'] : undefined,
      mount: typeof data['Mount'] === 'string' ? data['Mount'] : undefined,
      disguise: typeof data['Disguise'] === 'string' ? data['Disguise'] : undefined,
      nameVisible:
        data['Options'] && typeof data['Options'] === 'object'
          ? (data['Options'] as Record<string, unknown>)['NameVisible'] !== false
          : true,
      equipment: parseEquipment(data['Equipment']),
      options: parseMobOptions(data['Options']),
      skills: parseMobSkills(data['Skills']),
      drops: parseMobDrops(data['Drops']),
      droptables: Array.isArray(data['Droptables']) ? data['Droptables'].map(String) : [],
      aiGoalSelectors: [],
      aiTargetSelectors: [],
      description: { en: '', ja: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mobs.push(mob);
  }
  return mobs;
}

/**
 * Parse a MythicMobs item YAML string into ItemConfig(s).
 */
export function parseItemYaml(yamlStr: string): ItemConfig[] {
  const doc = yaml.load(yamlStr) as Record<string, unknown> | null;
  if (!doc || typeof doc !== 'object') return [];

  const items: ItemConfig[] = [];
  for (const [name, def] of Object.entries(doc)) {
    if (typeof def !== 'object' || def === null) continue;
    const data = def as Record<string, unknown>;

    const item: ItemConfig = {
      id: crypto.randomUUID(),
      internalName: name,
      displayName: typeof data['Display'] === 'string' ? data['Display'].replace(/^'|'$/g, '') : '',
      material: typeof data['Id'] === 'string' ? data['Id'] : 'DIAMOND_SWORD',
      amount: typeof data['Amount'] === 'number' ? data['Amount'] : 1,
      lore: Array.isArray(data['Lore']) ? data['Lore'].map(String) : [],
      enchantments: parseEnchantments(data['Enchantments']),
      attributes: parseAttributes(data['Attributes']),
      customModelData:
        typeof data['CustomModelData'] === 'number' ? data['CustomModelData'] : undefined,
      unbreakable: data['Unbreakable'] === true,
      hideFlags: Array.isArray(data['HideFlags'])
        ? (data['HideFlags'] as ItemConfig['hideFlags'])
        : [],
      nbt:
        typeof data['NBT'] === 'object' && data['NBT'] !== null
          ? (data['NBT'] as Record<string, unknown>)
          : undefined,
      skills: parseItemSkills(data['Skills']),
      options: parseItemOptions(data['Options']),
      description: { en: '', ja: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(item);
  }
  return items;
}

// ── Helper functions ──

function parseConditionList(raw: unknown): ConditionEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((line) => parseConditionLine(String(line)));
}

function parseConditionLine(line: string): ConditionEntry {
  // Format: "- conditionType{param1=val;param2=val} action"
  const cleaned = line.replace(/^-\s*/, '').trim();
  const match = cleaned.match(/^(\w+)(?:\{([^}]*)\})?\s*(.*)$/);

  if (!match) {
    return {
      id: crypto.randomUUID(),
      type: cleaned,
      condition: cleaned,
      parameters: {},
      action: 'true',
    };
  }

  const [, type, paramStr, actionStr] = match;
  const parameters: Record<string, unknown> = {};
  if (paramStr) {
    for (const pair of paramStr.split(';')) {
      const [k, ...vParts] = pair.split('=');
      if (k) parameters[k.trim()] = vParts.join('=').trim();
    }
  }

  return {
    id: crypto.randomUUID(),
    type,
    condition: type,
    parameters,
    action: (actionStr?.trim() || 'true') as ConditionEntry['action'],
  };
}

function parseActionList(raw: unknown): SkillAction[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((line) => parseActionLine(String(line)));
}

function parseActionLine(line: string): SkillAction {
  // Format: "- mechanic{params} @targeter ?condition"
  const cleaned = line.replace(/^-\s*/, '').trim();

  // Extract mechanic name and params
  const mechMatch = cleaned.match(/^(\w+)(?:\{([^}]*)\})?/);
  if (!mechMatch) {
    return {
      id: crypto.randomUUID(),
      type: 'mechanic',
      mechanic: cleaned,
      parameters: {},
    };
  }

  const [fullMech, mechName, paramStr] = mechMatch;
  const parameters: Record<string, unknown> = {};
  if (paramStr) {
    for (const pair of paramStr.split(';')) {
      const [k, ...vParts] = pair.split('=');
      if (k) parameters[k.trim()] = vParts.join('=').trim();
    }
  }

  const rest = cleaned.slice(fullMech.length).trim();

  // Extract targeter
  let targeter: Targeter | undefined;
  const targeterMatch = rest.match(/@(\w+)(?:\{([^}]*)\})?/);
  if (targeterMatch) {
    const [, tType, tParams] = targeterMatch;
    const tParameters: Record<string, unknown> = {};
    if (tParams) {
      for (const pair of tParams.split(';')) {
        const [k, ...vParts] = pair.split('=');
        if (k) tParameters[k.trim()] = vParts.join('=').trim();
      }
    }
    targeter = {
      id: crypto.randomUUID(),
      type: `@${tType}`,
      parameters: tParameters,
    };
  }

  // Extract inline conditions
  const inlineConditions: ConditionEntry[] = [];
  const condMatches = rest.matchAll(/\?(\w+)(?:\{([^}]*)\})?/g);
  for (const cm of condMatches) {
    const [, cType, cParams] = cm;
    const cParameters: Record<string, unknown> = {};
    if (cParams) {
      for (const pair of cParams.split(';')) {
        const [k, ...vParts] = pair.split('=');
        if (k) cParameters[k.trim()] = vParts.join('=').trim();
      }
    }
    inlineConditions.push({
      id: crypto.randomUUID(),
      type: cType,
      condition: cType,
      parameters: cParameters,
      action: 'true',
    });
  }

  return {
    id: crypto.randomUUID(),
    type: 'mechanic',
    mechanic: mechName,
    parameters,
    targeter,
    conditions: inlineConditions.length > 0 ? inlineConditions : undefined,
  };
}

function parseVariables(raw: unknown): Record<string, VariableValue> | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const result: Record<string, VariableValue> = {};
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof val === 'number') {
      result[key] = Number.isInteger(val)
        ? { type: 'int', value: val }
        : { type: 'float', value: val };
    } else {
      result[key] = { type: 'string', value: String(val) };
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function parseEquipment(raw: unknown): EquipmentSlot[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    const str = String(entry);
    const parts = str.split(':');
    return {
      item: parts[0] || '',
      slot: (parts[1] || 'MAINHAND') as EquipmentSlot['slot'],
    };
  });
}

function parseMobOptions(raw: unknown): { key: string; value: string | number | boolean }[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw as Record<string, unknown>).map(([key, value]) => ({
    key,
    value: value as string | number | boolean,
  }));
}

function parseMobSkills(raw: unknown): MobSkillEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((line) => {
    const str = String(line).replace(/^-\s*/, '');
    // skill{s=SkillName} ~onTrigger =healthMod
    const skillMatch = str.match(/skill\{s=(\w+)\}/);
    const triggerMatch = str.match(/~(\w+)/);
    const healthMatch = str.match(/(=[>\d.%-]+)/);
    return {
      skillName: skillMatch ? skillMatch[1] : str,
      trigger: triggerMatch ? `~${triggerMatch[1]}` : '',
      healthModifier: healthMatch ? healthMatch[1] : undefined,
    };
  });
}

function parseMobDrops(raw: unknown): DropEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((line) => {
    const parts = String(line).trim().split(/\s+/);
    return {
      item: parts[0] || '',
      amount: parts[1] ? (isNaN(Number(parts[1])) ? parts[1] : Number(parts[1])) : 1,
      chance: parts[2] ? Number(parts[2]) : 1,
    };
  });
}

function parseEnchantments(raw: unknown): EnchantmentEntry[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw as Record<string, unknown>).map(([enchantment, level]) => ({
    enchantment,
    level: typeof level === 'number' ? level : 1,
  }));
}

function parseAttributes(raw: unknown): AttributeEntry[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.values(raw as Record<string, unknown>).map((entry) => {
    const data = entry as Record<string, unknown>;
    return {
      attribute: typeof data['Attribute'] === 'string' ? data['Attribute'] : '',
      amount: typeof data['Amount'] === 'number' ? data['Amount'] : 0,
      operation: (typeof data['Operation'] === 'string'
        ? data['Operation']
        : 'ADD') as AttributeEntry['operation'],
      slot: typeof data['Slot'] === 'string' ? data['Slot'] : undefined,
    };
  });
}

function parseItemSkills(raw: unknown): ItemSkillEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((line) => {
    const str = String(line).replace(/^-\s*/, '');
    const parts = str.split(/\s+/);
    return {
      skillName: parts[0] || '',
      trigger: parts[1] || '',
    };
  });
}

function parseItemOptions(raw: unknown): { key: string; value: string | number | boolean }[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw as Record<string, unknown>).map(([key, value]) => ({
    key,
    value: value as string | number | boolean,
  }));
}
