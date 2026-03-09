import yaml from 'js-yaml';
import type { ItemConfig } from '@/models/item';

/**
 * Generates MythicMobs item YAML from an ItemConfig model.
 */
export function generateItemYaml(item: ItemConfig): string {
  const doc: Record<string, unknown> = {};
  const itemName = item.internalName || 'UntitledItem';
  const def: Record<string, unknown> = {};

  def['Id'] = item.material;

  if (item.displayName) {
    def['Display'] = `'${item.displayName}'`;
  }

  if (item.amount > 1) {
    def['Amount'] = item.amount;
  }

  // Lore
  if (item.lore.length > 0) {
    def['Lore'] = item.lore;
  }

  // Enchantments
  if (item.enchantments.length > 0) {
    const enc: Record<string, number> = {};
    for (const e of item.enchantments) {
      if (e.enchantment) enc[e.enchantment] = e.level;
    }
    def['Enchantments'] = enc;
  }

  // Attributes
  if (item.attributes.length > 0) {
    const attrs: Record<string, unknown> = {};
    for (let i = 0; i < item.attributes.length; i++) {
      const a = item.attributes[i];
      attrs[`attr${i + 1}`] = {
        Attribute: a.attribute,
        Amount: a.amount,
        Operation: a.operation,
        ...(a.slot ? { Slot: a.slot } : {}),
      };
    }
    def['Attributes'] = attrs;
  }

  // CustomModelData
  if (item.customModelData !== undefined) {
    def['CustomModelData'] = item.customModelData;
  }

  // Unbreakable
  if (item.unbreakable) {
    def['Unbreakable'] = true;
  }

  // Hide flags
  if (item.hideFlags.length > 0) {
    def['HideFlags'] = item.hideFlags;
  }

  // Skills
  if (item.skills.length > 0) {
    def['Skills'] = item.skills.map((s) => {
      let line = `- ${s.skillName}`;
      if (s.trigger) line += ` ${s.trigger}`;
      return line;
    });
  }

  // Options
  if (item.options.length > 0) {
    const opts: Record<string, unknown> = {};
    for (const opt of item.options) {
      opts[opt.key] = opt.value;
    }
    def['Options'] = opts;
  }

  // NBT
  if (item.nbt && Object.keys(item.nbt).length > 0) {
    def['NBT'] = item.nbt;
  }

  doc[itemName] = def;

  return yaml.dump(doc, {
    indent: 2,
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
    sortKeys: false,
  });
}
