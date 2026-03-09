// ─── Variable ───
export type VariableValue =
  | { type: 'string'; value: string }
  | { type: 'int'; value: number }
  | { type: 'float'; value: number };

// ─── Targeter ───
export interface TargeterFilter {
  type: string;
  parameters: Record<string, unknown>;
}

export interface Targeter {
  id: string;
  type: string;
  parameters: Record<string, unknown>;
  filters?: TargeterFilter[];
  limit?: number;
  sort?: 'NEAREST' | 'FURTHEST' | 'RANDOM' | 'HIGHEST_HEALTH' | 'LOWEST_HEALTH';
}

// ─── Condition ───
export type ConditionAction =
  | 'true'
  | 'false'
  | { type: 'boolean'; value: boolean }
  | { type: 'power'; multiplier: number }
  | { type: 'cast'; skill: string }
  | { type: 'castinstead'; skill: string }
  | { type: 'orElseCast'; skill: string };

export interface ConditionEntry {
  id: string;
  type: string;
  condition: string;
  parameters: Record<string, unknown>;
  action: ConditionAction;
  logic?: 'and' | 'or';
  children?: ConditionEntry[];
}

// ─── Skill Action ───
export interface SkillAction {
  id: string;
  type: 'mechanic' | 'delay' | 'skill-ref';
  mechanic?: string;
  parameters: Record<string, unknown>;
  targeter?: Targeter;
  conditions?: ConditionEntry[];
  trigger?: string;
  healthRange?: string;
  chance?: number;
  delay?: number;
  repeat?: number;
  repeatInterval?: number;
  cooldown?: number;
  power?: number;
  forceSync?: boolean;
  fromOrigin?: boolean;
  targetIsOrigin?: boolean;
  origin?: string;
}

// ─── Skill ───
export interface Skill {
  id: string;
  name: string;
  internalName: string;
  triggers: string[];
  cooldown?: number;
  cancelIfNoTargets?: boolean;
  onCooldownSkill?: string;
  failedConditionsSkill?: string;
  conditions: ConditionEntry[];
  targetConditions: ConditionEntry[];
  triggerConditions: ConditionEntry[];
  actions: SkillAction[];
  variables?: Record<string, VariableValue>;
  createdAt: string;
  updatedAt: string;
}

export function createEmptySkill(name: string = 'NewSkill'): Skill {
  return {
    id: crypto.randomUUID(),
    name,
    internalName: name,
    triggers: [],
    conditions: [],
    targetConditions: [],
    triggerConditions: [],
    actions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
