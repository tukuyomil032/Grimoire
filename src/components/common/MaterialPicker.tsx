import { useMemo } from 'react';
import { SearchablePicker, type PickerOption } from './SearchablePicker';

/**
 * Comprehensive Minecraft materials list categorized for MythicMobs items.
 * Covers weapons, armor, tools, blocks, and common crafting materials.
 */
const MATERIALS: { value: string; category: string }[] = [
  // Swords
  { value: 'WOODEN_SWORD', category: 'Weapons' },
  { value: 'STONE_SWORD', category: 'Weapons' },
  { value: 'IRON_SWORD', category: 'Weapons' },
  { value: 'GOLDEN_SWORD', category: 'Weapons' },
  { value: 'DIAMOND_SWORD', category: 'Weapons' },
  { value: 'NETHERITE_SWORD', category: 'Weapons' },
  { value: 'BOW', category: 'Weapons' },
  { value: 'CROSSBOW', category: 'Weapons' },
  { value: 'TRIDENT', category: 'Weapons' },
  { value: 'MACE', category: 'Weapons' },

  // Axes
  { value: 'WOODEN_AXE', category: 'Tools' },
  { value: 'STONE_AXE', category: 'Tools' },
  { value: 'IRON_AXE', category: 'Tools' },
  { value: 'GOLDEN_AXE', category: 'Tools' },
  { value: 'DIAMOND_AXE', category: 'Tools' },
  { value: 'NETHERITE_AXE', category: 'Tools' },

  // Pickaxes
  { value: 'WOODEN_PICKAXE', category: 'Tools' },
  { value: 'STONE_PICKAXE', category: 'Tools' },
  { value: 'IRON_PICKAXE', category: 'Tools' },
  { value: 'GOLDEN_PICKAXE', category: 'Tools' },
  { value: 'DIAMOND_PICKAXE', category: 'Tools' },
  { value: 'NETHERITE_PICKAXE', category: 'Tools' },

  // Shovels
  { value: 'WOODEN_SHOVEL', category: 'Tools' },
  { value: 'STONE_SHOVEL', category: 'Tools' },
  { value: 'IRON_SHOVEL', category: 'Tools' },
  { value: 'GOLDEN_SHOVEL', category: 'Tools' },
  { value: 'DIAMOND_SHOVEL', category: 'Tools' },
  { value: 'NETHERITE_SHOVEL', category: 'Tools' },

  // Hoes
  { value: 'WOODEN_HOE', category: 'Tools' },
  { value: 'STONE_HOE', category: 'Tools' },
  { value: 'IRON_HOE', category: 'Tools' },
  { value: 'GOLDEN_HOE', category: 'Tools' },
  { value: 'DIAMOND_HOE', category: 'Tools' },
  { value: 'NETHERITE_HOE', category: 'Tools' },

  // Other tools
  { value: 'SHEARS', category: 'Tools' },
  { value: 'FLINT_AND_STEEL', category: 'Tools' },
  { value: 'FISHING_ROD', category: 'Tools' },
  { value: 'LEAD', category: 'Tools' },
  { value: 'COMPASS', category: 'Tools' },
  { value: 'CLOCK', category: 'Tools' },
  { value: 'SPYGLASS', category: 'Tools' },
  { value: 'BRUSH', category: 'Tools' },

  // Leather Armor
  { value: 'LEATHER_HELMET', category: 'Armor' },
  { value: 'LEATHER_CHESTPLATE', category: 'Armor' },
  { value: 'LEATHER_LEGGINGS', category: 'Armor' },
  { value: 'LEATHER_BOOTS', category: 'Armor' },

  // Chainmail Armor
  { value: 'CHAINMAIL_HELMET', category: 'Armor' },
  { value: 'CHAINMAIL_CHESTPLATE', category: 'Armor' },
  { value: 'CHAINMAIL_LEGGINGS', category: 'Armor' },
  { value: 'CHAINMAIL_BOOTS', category: 'Armor' },

  // Iron Armor
  { value: 'IRON_HELMET', category: 'Armor' },
  { value: 'IRON_CHESTPLATE', category: 'Armor' },
  { value: 'IRON_LEGGINGS', category: 'Armor' },
  { value: 'IRON_BOOTS', category: 'Armor' },

  // Golden Armor
  { value: 'GOLDEN_HELMET', category: 'Armor' },
  { value: 'GOLDEN_CHESTPLATE', category: 'Armor' },
  { value: 'GOLDEN_LEGGINGS', category: 'Armor' },
  { value: 'GOLDEN_BOOTS', category: 'Armor' },

  // Diamond Armor
  { value: 'DIAMOND_HELMET', category: 'Armor' },
  { value: 'DIAMOND_CHESTPLATE', category: 'Armor' },
  { value: 'DIAMOND_LEGGINGS', category: 'Armor' },
  { value: 'DIAMOND_BOOTS', category: 'Armor' },

  // Netherite Armor
  { value: 'NETHERITE_HELMET', category: 'Armor' },
  { value: 'NETHERITE_CHESTPLATE', category: 'Armor' },
  { value: 'NETHERITE_LEGGINGS', category: 'Armor' },
  { value: 'NETHERITE_BOOTS', category: 'Armor' },

  // Turtle / Elytra / Shield
  { value: 'TURTLE_HELMET', category: 'Armor' },
  { value: 'ELYTRA', category: 'Armor' },
  { value: 'SHIELD', category: 'Armor' },
  { value: 'WOLF_ARMOR', category: 'Armor' },

  // Potions
  { value: 'POTION', category: 'Potions' },
  { value: 'SPLASH_POTION', category: 'Potions' },
  { value: 'LINGERING_POTION', category: 'Potions' },
  { value: 'TIPPED_ARROW', category: 'Potions' },

  // Food
  { value: 'APPLE', category: 'Food' },
  { value: 'GOLDEN_APPLE', category: 'Food' },
  { value: 'ENCHANTED_GOLDEN_APPLE', category: 'Food' },
  { value: 'COOKED_BEEF', category: 'Food' },
  { value: 'COOKED_PORKCHOP', category: 'Food' },
  { value: 'COOKED_CHICKEN', category: 'Food' },
  { value: 'COOKED_MUTTON', category: 'Food' },
  { value: 'COOKED_SALMON', category: 'Food' },
  { value: 'COOKED_COD', category: 'Food' },
  { value: 'BREAD', category: 'Food' },
  { value: 'CAKE', category: 'Food' },
  { value: 'COOKIE', category: 'Food' },
  { value: 'PUMPKIN_PIE', category: 'Food' },
  { value: 'BEETROOT_SOUP', category: 'Food' },
  { value: 'MUSHROOM_STEW', category: 'Food' },
  { value: 'SUSPICIOUS_STEW', category: 'Food' },
  { value: 'MELON_SLICE', category: 'Food' },
  { value: 'SWEET_BERRIES', category: 'Food' },
  { value: 'GLOW_BERRIES', category: 'Food' },
  { value: 'CHORUS_FRUIT', category: 'Food' },
  { value: 'HONEY_BOTTLE', category: 'Food' },

  // Valuable Items / Materials
  { value: 'DIAMOND', category: 'Materials' },
  { value: 'EMERALD', category: 'Materials' },
  { value: 'GOLD_INGOT', category: 'Materials' },
  { value: 'IRON_INGOT', category: 'Materials' },
  { value: 'COPPER_INGOT', category: 'Materials' },
  { value: 'NETHERITE_INGOT', category: 'Materials' },
  { value: 'NETHERITE_SCRAP', category: 'Materials' },
  { value: 'LAPIS_LAZULI', category: 'Materials' },
  { value: 'REDSTONE', category: 'Materials' },
  { value: 'COAL', category: 'Materials' },
  { value: 'QUARTZ', category: 'Materials' },
  { value: 'AMETHYST_SHARD', category: 'Materials' },
  { value: 'PRISMARINE_SHARD', category: 'Materials' },
  { value: 'PRISMARINE_CRYSTALS', category: 'Materials' },

  // Special Items
  { value: 'NETHER_STAR', category: 'Special' },
  { value: 'ENDER_PEARL', category: 'Special' },
  { value: 'ENDER_EYE', category: 'Special' },
  { value: 'BLAZE_ROD', category: 'Special' },
  { value: 'BLAZE_POWDER', category: 'Special' },
  { value: 'GHAST_TEAR', category: 'Special' },
  { value: 'TOTEM_OF_UNDYING', category: 'Special' },
  { value: 'HEART_OF_THE_SEA', category: 'Special' },
  { value: 'DRAGON_BREATH', category: 'Special' },
  { value: 'DRAGON_EGG', category: 'Special' },
  { value: 'EXPERIENCE_BOTTLE', category: 'Special' },
  { value: 'ENCHANTED_BOOK', category: 'Special' },
  { value: 'NAME_TAG', category: 'Special' },
  { value: 'SADDLE', category: 'Special' },
  { value: 'ARROW', category: 'Special' },
  { value: 'SPECTRAL_ARROW', category: 'Special' },
  { value: 'FIREWORK_ROCKET', category: 'Special' },
  { value: 'FIRE_CHARGE', category: 'Special' },
  { value: 'WIND_CHARGE', category: 'Special' },
  { value: 'BREEZE_ROD', category: 'Special' },

  // Common craft items
  { value: 'STICK', category: 'Common' },
  { value: 'PAPER', category: 'Common' },
  { value: 'BOOK', category: 'Common' },
  { value: 'BONE', category: 'Common' },
  { value: 'FEATHER', category: 'Common' },
  { value: 'STRING', category: 'Common' },
  { value: 'LEATHER', category: 'Common' },
  { value: 'INK_SAC', category: 'Common' },
  { value: 'GLOW_INK_SAC', category: 'Common' },
  { value: 'SLIME_BALL', category: 'Common' },
  { value: 'GUNPOWDER', category: 'Common' },
  { value: 'FLINT', category: 'Common' },
  { value: 'BUCKET', category: 'Common' },
  { value: 'WATER_BUCKET', category: 'Common' },
  { value: 'LAVA_BUCKET', category: 'Common' },
  { value: 'MILK_BUCKET', category: 'Common' },

  // Skulls / Heads
  { value: 'PLAYER_HEAD', category: 'Heads' },
  { value: 'ZOMBIE_HEAD', category: 'Heads' },
  { value: 'SKELETON_SKULL', category: 'Heads' },
  { value: 'WITHER_SKELETON_SKULL', category: 'Heads' },
  { value: 'CREEPER_HEAD', category: 'Heads' },
  { value: 'DRAGON_HEAD', category: 'Heads' },
  { value: 'PIGLIN_HEAD', category: 'Heads' },

  // Dyes
  { value: 'WHITE_DYE', category: 'Dyes' },
  { value: 'ORANGE_DYE', category: 'Dyes' },
  { value: 'MAGENTA_DYE', category: 'Dyes' },
  { value: 'LIGHT_BLUE_DYE', category: 'Dyes' },
  { value: 'YELLOW_DYE', category: 'Dyes' },
  { value: 'LIME_DYE', category: 'Dyes' },
  { value: 'PINK_DYE', category: 'Dyes' },
  { value: 'GRAY_DYE', category: 'Dyes' },
  { value: 'LIGHT_GRAY_DYE', category: 'Dyes' },
  { value: 'CYAN_DYE', category: 'Dyes' },
  { value: 'PURPLE_DYE', category: 'Dyes' },
  { value: 'BLUE_DYE', category: 'Dyes' },
  { value: 'BROWN_DYE', category: 'Dyes' },
  { value: 'GREEN_DYE', category: 'Dyes' },
  { value: 'RED_DYE', category: 'Dyes' },
  { value: 'BLACK_DYE', category: 'Dyes' },

  // Music Discs
  { value: 'MUSIC_DISC_13', category: 'Music Discs' },
  { value: 'MUSIC_DISC_CAT', category: 'Music Discs' },
  { value: 'MUSIC_DISC_BLOCKS', category: 'Music Discs' },
  { value: 'MUSIC_DISC_CHIRP', category: 'Music Discs' },
  { value: 'MUSIC_DISC_CREATOR', category: 'Music Discs' },
  { value: 'MUSIC_DISC_FAR', category: 'Music Discs' },
  { value: 'MUSIC_DISC_MALL', category: 'Music Discs' },
  { value: 'MUSIC_DISC_MELLOHI', category: 'Music Discs' },
  { value: 'MUSIC_DISC_PIGSTEP', category: 'Music Discs' },
  { value: 'MUSIC_DISC_RELIC', category: 'Music Discs' },
  { value: 'MUSIC_DISC_STAL', category: 'Music Discs' },
  { value: 'MUSIC_DISC_STRAD', category: 'Music Discs' },
  { value: 'MUSIC_DISC_WAIT', category: 'Music Discs' },
  { value: 'MUSIC_DISC_WARD', category: 'Music Discs' },
  { value: 'MUSIC_DISC_OTHERSIDE', category: 'Music Discs' },
  { value: 'MUSIC_DISC_5', category: 'Music Discs' },
  { value: 'MUSIC_DISC_PRECIPICE', category: 'Music Discs' },

  // Common Blocks (useful for MythicMobs Items/Drops)
  { value: 'STONE', category: 'Blocks' },
  { value: 'COBBLESTONE', category: 'Blocks' },
  { value: 'OAK_LOG', category: 'Blocks' },
  { value: 'OAK_PLANKS', category: 'Blocks' },
  { value: 'DIRT', category: 'Blocks' },
  { value: 'GRASS_BLOCK', category: 'Blocks' },
  { value: 'SAND', category: 'Blocks' },
  { value: 'GRAVEL', category: 'Blocks' },
  { value: 'GLASS', category: 'Blocks' },
  { value: 'OBSIDIAN', category: 'Blocks' },
  { value: 'CRYING_OBSIDIAN', category: 'Blocks' },
  { value: 'TNT', category: 'Blocks' },
  { value: 'SPAWNER', category: 'Blocks' },
  { value: 'CHEST', category: 'Blocks' },
  { value: 'ENDER_CHEST', category: 'Blocks' },
  { value: 'BARREL', category: 'Blocks' },
  { value: 'BEACON', category: 'Blocks' },
  { value: 'CONDUIT', category: 'Blocks' },
  { value: 'ENCHANTING_TABLE', category: 'Blocks' },
  { value: 'ANVIL', category: 'Blocks' },
  { value: 'BREWING_STAND', category: 'Blocks' },
];

interface MaterialPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function MaterialPicker({ value, onChange, className, label }: MaterialPickerProps) {
  const options: PickerOption[] = useMemo(
    () =>
      MATERIALS.map((m) => ({
        value: m.value,
        label: m.value,
        category: m.category,
      })),
    []
  );

  return (
    <SearchablePicker
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select Material..."
      label={label}
      className={className}
      maxVisible={10}
    />
  );
}
