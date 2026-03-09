import { ALL_MECHANICS, ALL_CONDITIONS } from '@/components/blockly/blocks';
import type { MechanicSchema } from '@/models/mechanic';
import type { ConditionSchema } from '@/models/condition';

function getMechanicsByCat(): Record<string, MechanicSchema[]> {
  const grouped: Record<string, MechanicSchema[]> = {};
  for (const m of ALL_MECHANICS) {
    (grouped[m.category] ??= []).push(m);
  }
  return grouped;
}

function getConditionsByCat(): Record<string, ConditionSchema[]> {
  const grouped: Record<string, ConditionSchema[]> = {};
  for (const c of ALL_CONDITIONS) {
    (grouped[c.category] ??= []).push(c);
  }
  return grouped;
}

/**
 * Generates the Blockly toolbox XML structure.
 * Categories are auto-generated from the mechanic/condition registries.
 */
export function generateToolboxXml(): string {
  const mechanicsByCategory = getMechanicsByCat();
  const conditionsByCategory = getConditionsByCat();

  let xml = '<xml xmlns="https://developers.google.com/blockly/xml">';

  // === Triggers ===
  xml += `<category name="Triggers" categorystyle="trigger_category">`;
  xml += `<block type="mythic_trigger"></block>`;
  xml += `</category>`;

  // === Mechanics (by category) ===
  xml += `<category name="Mechanics" categorystyle="mechanic_category">`;
  for (const [category, mechanics] of Object.entries(mechanicsByCategory)) {
    xml += `<category name="${capitalize(category)}">`;
    for (const mech of mechanics) {
      const blockType = `mythic_mechanic_${mech.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      xml += `<block type="${blockType}"></block>`;
    }
    xml += `</category>`;
  }
  xml += `</category>`;

  // === Conditions (by category) ===
  xml += `<category name="Conditions" categorystyle="condition_category">`;
  xml += `<block type="mythic_inline_condition"></block>`;
  for (const [category, conditions] of Object.entries(conditionsByCategory)) {
    xml += `<category name="${capitalize(category)}">`;
    for (const cond of conditions) {
      const blockType = `mythic_condition_${cond.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      xml += `<block type="${blockType}"></block>`;
    }
    xml += `</category>`;
  }
  xml += `</category>`;

  // === Targeters ===
  xml += `<category name="Targeters" categorystyle="targeter_category">`;
  xml += `<block type="mythic_targeter_custom"></block>`;
  xml += `</category>`;

  // === Meta / Flow ===
  xml += `<category name="Flow Control" categorystyle="meta_category">`;
  xml += `<block type="mythic_delay"></block>`;
  xml += `<block type="mythic_repeat"></block>`;
  xml += `<block type="mythic_skill_ref"></block>`;
  xml += `<block type="mythic_condition_AND"></block>`;
  xml += `<block type="mythic_condition_OR"></block>`;
  xml += `</category>`;

  xml += '</xml>';
  return xml;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
