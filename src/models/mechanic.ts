export type ParameterType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'enum'
  | 'material'
  | 'skill'
  | 'location'
  | 'color'
  | 'particle'
  | 'sound'
  | 'entity-type'
  | 'potion-effect';

export type MechanicCategory =
  | 'damage'
  | 'healing'
  | 'movement'
  | 'particle'
  | 'effect'
  | 'potion'
  | 'block'
  | 'entity'
  | 'player-ui'
  | 'bossbar'
  | 'display'
  | 'disguise'
  | 'item'
  | 'scoreboard'
  | 'ai'
  | 'projectile'
  | 'meta'
  | 'utility'
  | 'spawn'
  | 'aggro'
  | 'variable'
  | 'sound'
  | 'other';

export interface ParameterSchema {
  name: string;
  aliases?: string[];
  type: ParameterType;
  required?: boolean;
  default?: unknown;
  defaultValue?: string | number | boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  description: Record<string, string>;
}

export interface MechanicSchema {
  name: string;
  aliases: string[];
  category: MechanicCategory;
  description: Record<string, string>;
  targetType?: 'entity' | 'location' | 'both' | 'none';
  parameters: ParameterSchema[];
  premium?: boolean;
}
