import { useMemo } from 'react';
import { SearchablePicker, type PickerOption } from './SearchablePicker';

/**
 * Full list of Minecraft entity types (1.21+).
 */
const ENTITY_TYPES = [
  // Hostile
  'BLAZE',
  'BOGGED',
  'BREEZE',
  'CAVE_SPIDER',
  'CREEPER',
  'DROWNED',
  'ELDER_GUARDIAN',
  'ENDER_DRAGON',
  'ENDERMAN',
  'ENDERMITE',
  'EVOKER',
  'GHAST',
  'GUARDIAN',
  'HOGLIN',
  'HUSK',
  'MAGMA_CUBE',
  'PHANTOM',
  'PIGLIN',
  'PIGLIN_BRUTE',
  'PILLAGER',
  'RAVAGER',
  'SHULKER',
  'SILVERFISH',
  'SKELETON',
  'SLIME',
  'SPIDER',
  'STRAY',
  'VEX',
  'VINDICATOR',
  'WARDEN',
  'WITCH',
  'WITHER',
  'WITHER_SKELETON',
  'ZOGLIN',
  'ZOMBIE',
  'ZOMBIE_VILLAGER',
  'ZOMBIFIED_PIGLIN',
  // Neutral
  'BEE',
  'DOLPHIN',
  'ENDERMAN',
  'FOX',
  'GOAT',
  'IRON_GOLEM',
  'LLAMA',
  'PANDA',
  'POLAR_BEAR',
  'SPIDER',
  'TRADER_LLAMA',
  'WOLF',
  // Passive
  'ALLAY',
  'ARMADILLO',
  'AXOLOTL',
  'BAT',
  'CAMEL',
  'CAT',
  'CHICKEN',
  'COD',
  'COW',
  'DONKEY',
  'FROG',
  'GLOW_SQUID',
  'HORSE',
  'MOOSHROOM',
  'MULE',
  'OCELOT',
  'PARROT',
  'PIG',
  'PUFFERFISH',
  'RABBIT',
  'SALMON',
  'SHEEP',
  'SKELETON_HORSE',
  'SNIFFER',
  'SNOW_GOLEM',
  'SQUID',
  'STRIDER',
  'TADPOLE',
  'TROPICAL_FISH',
  'TURTLE',
  'VILLAGER',
  'WANDERING_TRADER',
  'ZOMBIE_HORSE',
  // Utility / Other
  'ARMOR_STAND',
  'AREA_EFFECT_CLOUD',
  'BOAT',
  'CHEST_BOAT',
  'CHEST_MINECART',
  'COMMAND_BLOCK_MINECART',
  'END_CRYSTAL',
  'EVOKER_FANGS',
  'EXPERIENCE_ORB',
  'FALLING_BLOCK',
  'FIREBALL',
  'FIREWORK_ROCKET',
  'FURNACE_MINECART',
  'GIANT',
  'HOPPER_MINECART',
  'ILLUSIONER',
  'INTERACTION',
  'ITEM',
  'ITEM_DISPLAY',
  'BLOCK_DISPLAY',
  'TEXT_DISPLAY',
  'LIGHTNING_BOLT',
  'MARKER',
  'MINECART',
  'PAINTING',
  'PRIMED_TNT',
  'SMALL_FIREBALL',
  'SPAWNER_MINECART',
  'SPECTRAL_ARROW',
  'TNT_MINECART',
  'TRIDENT',
  'WITHER_SKULL',
] as const;

// Deduplicate
const UNIQUE_ENTITY_TYPES = [...new Set(ENTITY_TYPES)].sort();

const ENTITY_CATEGORIES: Record<string, string[]> = {
  Hostile: [
    'BLAZE',
    'BOGGED',
    'BREEZE',
    'CAVE_SPIDER',
    'CREEPER',
    'DROWNED',
    'ELDER_GUARDIAN',
    'ENDER_DRAGON',
    'ENDERMITE',
    'EVOKER',
    'GHAST',
    'GUARDIAN',
    'HOGLIN',
    'HUSK',
    'MAGMA_CUBE',
    'PHANTOM',
    'PIGLIN',
    'PIGLIN_BRUTE',
    'PILLAGER',
    'RAVAGER',
    'SHULKER',
    'SILVERFISH',
    'SKELETON',
    'SLIME',
    'STRAY',
    'VEX',
    'VINDICATOR',
    'WARDEN',
    'WITCH',
    'WITHER',
    'WITHER_SKELETON',
    'ZOGLIN',
    'ZOMBIE',
    'ZOMBIE_VILLAGER',
    'ZOMBIFIED_PIGLIN',
  ],
  Neutral: [
    'BEE',
    'DOLPHIN',
    'ENDERMAN',
    'FOX',
    'GOAT',
    'IRON_GOLEM',
    'LLAMA',
    'PANDA',
    'POLAR_BEAR',
    'SPIDER',
    'TRADER_LLAMA',
    'WOLF',
  ],
  Passive: [
    'ALLAY',
    'ARMADILLO',
    'AXOLOTL',
    'BAT',
    'CAMEL',
    'CAT',
    'CHICKEN',
    'COD',
    'COW',
    'DONKEY',
    'FROG',
    'GLOW_SQUID',
    'HORSE',
    'MOOSHROOM',
    'MULE',
    'OCELOT',
    'PARROT',
    'PIG',
    'PUFFERFISH',
    'RABBIT',
    'SALMON',
    'SHEEP',
    'SKELETON_HORSE',
    'SNIFFER',
    'SNOW_GOLEM',
    'SQUID',
    'STRIDER',
    'TADPOLE',
    'TROPICAL_FISH',
    'TURTLE',
    'VILLAGER',
    'WANDERING_TRADER',
    'ZOMBIE_HORSE',
  ],
};

function getCategory(type: string): string {
  for (const [cat, types] of Object.entries(ENTITY_CATEGORIES)) {
    if (types.includes(type)) return cat;
  }
  return 'Other';
}

interface EntityTypePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function EntityTypePicker({ value, onChange, className, label }: EntityTypePickerProps) {
  const options: PickerOption[] = useMemo(
    () =>
      UNIQUE_ENTITY_TYPES.map((t) => ({
        value: t,
        label: t,
        category: getCategory(t),
      })),
    []
  );

  return (
    <SearchablePicker
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select Entity Type..."
      label={label}
      className={className}
    />
  );
}
