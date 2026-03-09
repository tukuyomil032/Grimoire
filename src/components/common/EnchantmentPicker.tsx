import { useMemo } from 'react';
import { SearchablePicker, type PickerOption } from './SearchablePicker';

/**
 * All Minecraft enchantments (1.21+).
 */
const ENCHANTMENTS: { value: string; category: string; maxLevel: number }[] = [
  // Weapon enchantments
  { value: 'SHARPNESS', category: 'Weapon', maxLevel: 5 },
  { value: 'SMITE', category: 'Weapon', maxLevel: 5 },
  { value: 'BANE_OF_ARTHROPODS', category: 'Weapon', maxLevel: 5 },
  { value: 'KNOCKBACK', category: 'Weapon', maxLevel: 2 },
  { value: 'FIRE_ASPECT', category: 'Weapon', maxLevel: 2 },
  { value: 'LOOTING', category: 'Weapon', maxLevel: 3 },
  { value: 'SWEEPING_EDGE', category: 'Weapon', maxLevel: 3 },
  { value: 'BREACH', category: 'Weapon', maxLevel: 4 },
  { value: 'DENSITY', category: 'Weapon', maxLevel: 5 },
  { value: 'WIND_BURST', category: 'Weapon', maxLevel: 3 },

  // Bow enchantments
  { value: 'POWER', category: 'Bow', maxLevel: 5 },
  { value: 'PUNCH', category: 'Bow', maxLevel: 2 },
  { value: 'FLAME', category: 'Bow', maxLevel: 1 },
  { value: 'INFINITY', category: 'Bow', maxLevel: 1 },

  // Crossbow enchantments
  { value: 'MULTISHOT', category: 'Crossbow', maxLevel: 1 },
  { value: 'PIERCING', category: 'Crossbow', maxLevel: 4 },
  { value: 'QUICK_CHARGE', category: 'Crossbow', maxLevel: 3 },

  // Trident enchantments
  { value: 'LOYALTY', category: 'Trident', maxLevel: 3 },
  { value: 'RIPTIDE', category: 'Trident', maxLevel: 3 },
  { value: 'CHANNELING', category: 'Trident', maxLevel: 1 },
  { value: 'IMPALING', category: 'Trident', maxLevel: 5 },

  // Armor enchantments
  { value: 'PROTECTION', category: 'Armor', maxLevel: 4 },
  { value: 'FIRE_PROTECTION', category: 'Armor', maxLevel: 4 },
  { value: 'BLAST_PROTECTION', category: 'Armor', maxLevel: 4 },
  { value: 'PROJECTILE_PROTECTION', category: 'Armor', maxLevel: 4 },
  { value: 'THORNS', category: 'Armor', maxLevel: 3 },

  // Helmet
  { value: 'RESPIRATION', category: 'Helmet', maxLevel: 3 },
  { value: 'AQUA_AFFINITY', category: 'Helmet', maxLevel: 1 },

  // Boots
  { value: 'FEATHER_FALLING', category: 'Boots', maxLevel: 4 },
  { value: 'DEPTH_STRIDER', category: 'Boots', maxLevel: 3 },
  { value: 'FROST_WALKER', category: 'Boots', maxLevel: 2 },
  { value: 'SOUL_SPEED', category: 'Boots', maxLevel: 3 },
  { value: 'SWIFT_SNEAK', category: 'Boots', maxLevel: 3 },

  // Tool enchantments
  { value: 'EFFICIENCY', category: 'Tool', maxLevel: 5 },
  { value: 'SILK_TOUCH', category: 'Tool', maxLevel: 1 },
  { value: 'FORTUNE', category: 'Tool', maxLevel: 3 },

  // Universal enchantments
  { value: 'UNBREAKING', category: 'Universal', maxLevel: 3 },
  { value: 'MENDING', category: 'Universal', maxLevel: 1 },
  { value: 'VANISHING_CURSE', category: 'Curse', maxLevel: 1 },
  { value: 'BINDING_CURSE', category: 'Curse', maxLevel: 1 },

  // Fishing rod
  { value: 'LUCK_OF_THE_SEA', category: 'Fishing', maxLevel: 3 },
  { value: 'LURE', category: 'Fishing', maxLevel: 3 },
];

interface EnchantmentPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function EnchantmentPicker({ value, onChange, className, label }: EnchantmentPickerProps) {
  const options: PickerOption[] = useMemo(
    () =>
      ENCHANTMENTS.map((e) => ({
        value: e.value,
        label: e.value,
        category: e.category,
        description: `Max: ${e.maxLevel}`,
      })),
    []
  );

  return (
    <SearchablePicker
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select Enchantment..."
      label={label}
      className={className}
    />
  );
}
