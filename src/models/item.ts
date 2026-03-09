export interface ItemConfig {
  id: string;
  internalName: string;
  displayName: string;
  material: string;
  amount: number;
  lore: string[];
  enchantments: EnchantmentEntry[];
  attributes: AttributeEntry[];
  customModelData?: number;
  unbreakable: boolean;
  hideFlags: ItemHideFlag[];
  nbt?: Record<string, unknown>;
  skills: ItemSkillEntry[];
  options: ItemOption[];
  description: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface EnchantmentEntry {
  enchantment: string;
  level: number;
}

export interface AttributeEntry {
  attribute: string;
  amount: number;
  operation: 'ADD' | 'MULTIPLY_BASE' | 'MULTIPLY';
  slot?: string;
}

export type ItemHideFlag =
  | 'HIDE_ENCHANTS'
  | 'HIDE_ATTRIBUTES'
  | 'HIDE_UNBREAKABLE'
  | 'HIDE_DESTROYS'
  | 'HIDE_PLACED_ON'
  | 'HIDE_POTION_EFFECTS'
  | 'HIDE_DYE';

export interface ItemSkillEntry {
  skillName: string;
  trigger: string;
}

export interface ItemOption {
  key: string;
  value: string | number | boolean;
}

export function createEmptyItem(): ItemConfig {
  return {
    id: crypto.randomUUID(),
    internalName: '',
    displayName: '',
    material: 'DIAMOND_SWORD',
    amount: 1,
    lore: [],
    enchantments: [],
    attributes: [],
    unbreakable: false,
    hideFlags: [],
    skills: [],
    options: [],
    description: { en: '', ja: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const COMMON_MATERIALS = [
  'DIAMOND_SWORD',
  'IRON_SWORD',
  'NETHERITE_SWORD',
  'GOLDEN_SWORD',
  'STONE_SWORD',
  'WOODEN_SWORD',
  'BOW',
  'CROSSBOW',
  'TRIDENT',
  'MACE',
  'DIAMOND_HELMET',
  'DIAMOND_CHESTPLATE',
  'DIAMOND_LEGGINGS',
  'DIAMOND_BOOTS',
  'IRON_HELMET',
  'IRON_CHESTPLATE',
  'IRON_LEGGINGS',
  'IRON_BOOTS',
  'NETHERITE_HELMET',
  'NETHERITE_CHESTPLATE',
  'NETHERITE_LEGGINGS',
  'NETHERITE_BOOTS',
  'SHIELD',
  'TOTEM_OF_UNDYING',
  'DIAMOND_PICKAXE',
  'IRON_PICKAXE',
  'NETHERITE_PICKAXE',
  'DIAMOND_AXE',
  'IRON_AXE',
  'NETHERITE_AXE',
  'PAPER',
  'BOOK',
  'STICK',
  'BLAZE_ROD',
  'BONE',
  'FEATHER',
  'NETHER_STAR',
  'ENDER_PEARL',
  'ENDER_EYE',
  'GHAST_TEAR',
  'POTION',
  'SPLASH_POTION',
  'LINGERING_POTION',
  'GOLDEN_APPLE',
  'ENCHANTED_GOLDEN_APPLE',
] as const;
