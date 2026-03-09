import Blockly from 'blockly';
import { MECHANIC_REGISTRY } from '@/schema/mechanics/core-mechanics';
import { EXTENDED_MECHANIC_REGISTRY } from '@/schema/mechanics/extended-mechanics';
import { PHASE3_MECHANIC_REGISTRY } from '@/schema/mechanics/phase3-mechanics';
import { CONDITION_REGISTRY } from '@/schema/conditions/core-conditions';
import { EXTENDED_CONDITION_REGISTRY } from '@/schema/conditions/extended-conditions';
import { PHASE3_CONDITION_REGISTRY } from '@/schema/conditions/phase3-conditions';
import { TRIGGER_LIST } from '@/models/trigger';
import { CORE_TARGETERS } from '@/models/targeter';
import { EXTENDED_TARGETERS } from '@/schema/targeters/extended-targeters';
import { PHASE3_TARGETER_REGISTRY } from '@/schema/targeters/phase3-targeters';
import type { MechanicSchema } from '@/models/mechanic';
import type { ConditionSchema } from '@/models/condition';

/** All mechanics (core + extended + phase3) */
export const ALL_MECHANICS = [
  ...MECHANIC_REGISTRY,
  ...EXTENDED_MECHANIC_REGISTRY,
  ...PHASE3_MECHANIC_REGISTRY,
];
/** All conditions (core + extended + phase3) */
export const ALL_CONDITIONS = [
  ...CONDITION_REGISTRY,
  ...EXTENDED_CONDITION_REGISTRY,
  ...PHASE3_CONDITION_REGISTRY,
];
/** All targeters (core + extended + phase3) */
export const ALL_TARGETERS = [
  ...CORE_TARGETERS,
  ...EXTENDED_TARGETERS,
  ...PHASE3_TARGETER_REGISTRY,
];

/**
 * Register all MythicMobs blocks with Blockly.
 * Call this once during app initialization.
 */
export function registerAllBlocks() {
  registerTriggerBlocks();
  registerMechanicBlocks();
  registerConditionBlocks();
  registerTargeterBlocks();
  registerMetaBlocks();
}

// ─── Trigger blocks ───────────────────────────────

function registerTriggerBlocks() {
  // Generic trigger selector block (hat block)
  Blockly.Blocks['mythic_trigger'] = {
    init(this: Blockly.Block) {
      const triggerOptions: [string, string][] = TRIGGER_LIST.map((t) => [t.name, t.name]);
      this.appendDummyInput()
        .appendField('Trigger')
        .appendField(new Blockly.FieldDropdown(triggerOptions), 'TRIGGER_TYPE');
      this.appendStatementInput('ACTIONS').setCheck('mechanic').appendField('do');
      this.setStyle('trigger_blocks');
      this.setTooltip('Select the trigger event for this skill');
      this.setHelpUrl('');
    },
  };
}

// ─── Mechanic blocks ──────────────────────────────

function registerMechanicBlocks() {
  for (const mech of ALL_MECHANICS) {
    registerSingleMechanicBlock(mech);
  }
}

function registerSingleMechanicBlock(mech: MechanicSchema) {
  const blockType = `mythic_mechanic_${mech.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

  Blockly.Blocks[blockType] = {
    init(this: Blockly.Block) {
      // Title row
      this.appendDummyInput().appendField(mech.name);

      // Parameter fields
      for (const param of mech.parameters) {
        const input = this.appendDummyInput();
        input.appendField(`  ${param.name}:`);

        switch (param.type) {
          case 'number':
            input.appendField(
              new Blockly.FieldNumber(
                typeof param.defaultValue === 'number' ? param.defaultValue : 0
              ),
              param.name.toUpperCase()
            );
            break;
          case 'boolean':
            input.appendField(
              new Blockly.FieldCheckbox(param.defaultValue ? 'TRUE' : 'FALSE'),
              param.name.toUpperCase()
            );
            break;
          case 'skill':
            input.appendField(
              new Blockly.FieldTextInput(
                typeof param.defaultValue === 'string' ? param.defaultValue : ''
              ),
              param.name.toUpperCase()
            );
            break;
          default:
            input.appendField(
              new Blockly.FieldTextInput(
                typeof param.defaultValue === 'string' ? param.defaultValue : ''
              ),
              param.name.toUpperCase()
            );
        }
      }

      // Targeter dropdown
      const targeterOptions: [string, string][] = ALL_TARGETERS.map((t) => [t.name, t.name]);
      this.appendDummyInput()
        .appendField('  @')
        .appendField(new Blockly.FieldDropdown(targeterOptions), 'TARGETER');

      // Connections
      this.setPreviousStatement(true, 'mechanic');
      this.setNextStatement(true, 'mechanic');
      this.setStyle('mechanic_blocks');
      this.setTooltip(mech.description.en || '');
      this.setHelpUrl('');
    },
  };
}

// ─── Condition blocks ─────────────────────────────

function registerConditionBlocks() {
  for (const cond of ALL_CONDITIONS) {
    registerSingleConditionBlock(cond);
  }

  // Inline condition wrapper (connects to mechanic)
  Blockly.Blocks['mythic_inline_condition'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField('?').appendField('Condition');
      this.appendValueInput('CONDITION').setCheck('condition');
      this.appendStatementInput('THEN').setCheck('mechanic').appendField('then');
      this.setPreviousStatement(true, 'mechanic');
      this.setNextStatement(true, 'mechanic');
      this.setStyle('condition_blocks');
      this.setTooltip('Conditionally execute mechanics');
    },
  };
}

function registerSingleConditionBlock(cond: ConditionSchema) {
  const blockType = `mythic_condition_${cond.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

  Blockly.Blocks[blockType] = {
    init(this: Blockly.Block) {
      this.appendDummyInput().appendField(cond.name);

      for (const param of cond.parameters) {
        const input = this.appendDummyInput();
        input.appendField(`  ${param.name}:`);

        switch (param.type) {
          case 'number':
            input.appendField(
              new Blockly.FieldNumber(
                typeof param.defaultValue === 'number' ? param.defaultValue : 0
              ),
              param.name.toUpperCase()
            );
            break;
          case 'boolean':
            input.appendField(
              new Blockly.FieldCheckbox(param.defaultValue ? 'TRUE' : 'FALSE'),
              param.name.toUpperCase()
            );
            break;
          default:
            input.appendField(
              new Blockly.FieldTextInput(
                typeof param.defaultValue === 'string' ? param.defaultValue : ''
              ),
              param.name.toUpperCase()
            );
        }
      }

      this.setOutput(true, 'condition');
      this.setStyle('condition_blocks');
      this.setTooltip(cond.description.en || '');
    },
  };
}

// ─── Targeter blocks ──────────────────────────────

function registerTargeterBlocks() {
  // Targeters are embedded as dropdowns in mechanic blocks,
  // but we also provide standalone targeter blocks for complex use
  Blockly.Blocks['mythic_targeter_custom'] = {
    init(this: Blockly.Block) {
      const options: [string, string][] = ALL_TARGETERS.map((t) => [t.name, t.name]);
      this.appendDummyInput()
        .appendField('Target')
        .appendField(new Blockly.FieldDropdown(options), 'TARGETER');
      this.setOutput(true, 'targeter');
      this.setStyle('targeter_blocks');
      this.setTooltip('Select a targeter');
    },
  };
}

// ─── Meta blocks ──────────────────────────────────

function registerMetaBlocks() {
  // Delay block
  Blockly.Blocks['mythic_delay'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('delay')
        .appendField(new Blockly.FieldNumber(20, 1), 'TICKS')
        .appendField('ticks');
      this.setPreviousStatement(true, 'mechanic');
      this.setNextStatement(true, 'mechanic');
      this.setStyle('meta_blocks');
      this.setTooltip('Delay the next mechanic');
    },
  };

  // Repeat block
  Blockly.Blocks['mythic_repeat'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('repeat')
        .appendField(new Blockly.FieldNumber(3, 1), 'AMOUNT')
        .appendField('times, every')
        .appendField(new Blockly.FieldNumber(5, 0), 'INTERVAL')
        .appendField('ticks');
      this.appendStatementInput('DO').setCheck('mechanic');
      this.setPreviousStatement(true, 'mechanic');
      this.setNextStatement(true, 'mechanic');
      this.setStyle('meta_blocks');
      this.setTooltip('Repeat mechanics multiple times');
    },
  };

  // Skill reference block
  Blockly.Blocks['mythic_skill_ref'] = {
    init(this: Blockly.Block) {
      this.appendDummyInput()
        .appendField('run skill')
        .appendField(new Blockly.FieldTextInput('skillName'), 'SKILL_NAME');
      this.setPreviousStatement(true, 'mechanic');
      this.setNextStatement(true, 'mechanic');
      this.setStyle('meta_blocks');
      this.setTooltip('Run another skill');
    },
  };

  // AND compound condition
  Blockly.Blocks['mythic_condition_AND'] = {
    init(this: Blockly.Block) {
      this.appendValueInput('A').setCheck('condition').appendField('AND');
      this.appendValueInput('B').setCheck('condition');
      this.setOutput(true, 'condition');
      this.setStyle('condition_blocks');
      this.setTooltip('Both conditions must be true');
    },
  };

  // OR compound condition
  Blockly.Blocks['mythic_condition_OR'] = {
    init(this: Blockly.Block) {
      this.appendValueInput('A').setCheck('condition').appendField('OR');
      this.appendValueInput('B').setCheck('condition');
      this.setOutput(true, 'condition');
      this.setStyle('condition_blocks');
      this.setTooltip('Either condition must be true');
    },
  };
}

/**
 * Get all block type names for a given category.
 */
export function getMechanicBlockTypes(): string[] {
  return ALL_MECHANICS.map((m) => `mythic_mechanic_${m.name.replace(/[^a-zA-Z0-9]/g, '_')}`);
}

export function getConditionBlockTypes(): string[] {
  return ALL_CONDITIONS.map((c) => `mythic_condition_${c.name.replace(/[^a-zA-Z0-9]/g, '_')}`);
}
