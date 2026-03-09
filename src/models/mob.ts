export interface MobConfig {
  id: string;
  internalName: string;
  displayName: string;
  type: string;
  health: number;
  damage: number;
  armor: number;
  bossBar?: BossBarConfig;
  faction?: string;
  mount?: string;
  equipment: EquipmentSlot[];
  options: MobOption[];
  skills: MobSkillEntry[];
  drops: DropEntry[];
  droptables: string[];
  aiGoalSelectors: AISelector[];
  aiTargetSelectors: AISelector[];
  disguise?: string;
  nameVisible: boolean;
  description: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface BossBarConfig {
  enabled: boolean;
  title: string;
  range: number;
  color: 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'PURPLE' | 'WHITE' | 'PINK';
  style: 'SOLID' | 'SEGMENTED_6' | 'SEGMENTED_10' | 'SEGMENTED_12' | 'SEGMENTED_20';
}

export interface EquipmentSlot {
  slot: 'HELMET' | 'CHESTPLATE' | 'LEGGINGS' | 'BOOTS' | 'MAINHAND' | 'OFFHAND';
  item: string;
}

export interface MobOption {
  key: string;
  value: string | number | boolean;
}

export interface MobSkillEntry {
  skillName: string;
  trigger: string;
  triggerConditions?: string;
  healthModifier?: string;
}

export interface DropEntry {
  item: string;
  amount: number | string;
  chance: number;
  conditions?: string[];
}

export interface AISelector {
  type: string;
  priority: number;
  params: Record<string, string | number | boolean>;
}

export function createEmptyMob(): MobConfig {
  return {
    id: crypto.randomUUID(),
    internalName: '',
    displayName: '',
    type: 'ZOMBIE',
    health: 20,
    damage: 5,
    armor: 0,
    equipment: [],
    options: [],
    skills: [],
    drops: [],
    droptables: [],
    aiGoalSelectors: [],
    aiTargetSelectors: [],
    nameVisible: true,
    description: { en: '', ja: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const MOB_TYPES = [
  'ZOMBIE',
  'SKELETON',
  'SPIDER',
  'CREEPER',
  'ENDERMAN',
  'BLAZE',
  'WITHER_SKELETON',
  'GHAST',
  'WITCH',
  'SLIME',
  'PHANTOM',
  'DROWNED',
  'PIGLIN',
  'HOGLIN',
  'ZOGLIN',
  'VINDICATOR',
  'EVOKER',
  'PILLAGER',
  'RAVAGER',
  'VEX',
  'GUARDIAN',
  'ELDER_GUARDIAN',
  'SHULKER',
  'ENDERMITE',
  'SILVERFISH',
  'CAVE_SPIDER',
  'ZOMBIE_VILLAGER',
  'HUSK',
  'STRAY',
  'MAGMA_CUBE',
  'IRON_GOLEM',
  'VILLAGER',
  'WOLF',
  'COW',
  'PIG',
  'SHEEP',
  'CHICKEN',
  'HORSE',
  'LLAMA',
  'PARROT',
  'BAT',
  'CAT',
  'FOX',
  'BEE',
  'PANDA',
  'TURTLE',
  'DOLPHIN',
  'SQUID',
  'GLOW_SQUID',
  'AXOLOTL',
  'GOAT',
  'FROG',
  'TADPOLE',
  'ALLAY',
  'WARDEN',
  'CAMEL',
  'SNIFFER',
  'BREEZE',
  'ARMADILLO',
  'BOGGED',
] as const;

export type MobType = (typeof MOB_TYPES)[number];
