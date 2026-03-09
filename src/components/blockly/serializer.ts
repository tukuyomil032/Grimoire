/**
 * Blockly → Skill Model Serializer
 *
 * Walks the Blockly workspace block tree and produces
 * SkillAction[] / ConditionEntry[] arrays that map into the Skill model.
 */
import Blockly from 'blockly';
import type { SkillAction, ConditionEntry, Targeter } from '@/models/skill';

// ─── Public API ─────────────────────────────────────

export interface SerializedSkillData {
  triggers: string[];
  actions: SkillAction[];
  conditions: ConditionEntry[];
}

/**
 * Serialize the entire Blockly workspace into Skill model fragments.
 */
export function serializeWorkspace(workspace: Blockly.WorkspaceSvg): SerializedSkillData {
  const triggers: string[] = [];
  const actions: SkillAction[] = [];
  const conditions: ConditionEntry[] = [];

  // Find all top-level trigger blocks
  const topBlocks = workspace.getTopBlocks(true);

  for (const block of topBlocks) {
    if (block.type === 'mythic_trigger') {
      const triggerType = block.getFieldValue('TRIGGER_TYPE') as string;
      if (triggerType) {
        triggers.push(triggerType);
      }

      // Walk the ACTIONS statement
      const actionsInput = block.getInputTargetBlock('ACTIONS');
      if (actionsInput) {
        const parsed = walkMechanicChain(actionsInput);
        actions.push(...parsed);
      }
    }
  }

  return { triggers, actions, conditions };
}

// ─── Internal helpers ───────────────────────────────

function walkMechanicChain(block: Blockly.Block): SkillAction[] {
  const actions: SkillAction[] = [];
  let current: Blockly.Block | null = block;

  while (current) {
    const action = blockToAction(current);
    if (action) {
      actions.push(action);
    }
    current = current.getNextBlock();
  }

  return actions;
}

function blockToAction(block: Blockly.Block): SkillAction | null {
  const type = block.type;

  // ─── Mechanic blocks ─────
  if (type.startsWith('mythic_mechanic_')) {
    const mechanicName = type.replace('mythic_mechanic_', '').replace(/_/g, ' ');
    // Try to recover original casing from block title
    const titleField = block.inputList[0]?.fieldRow[0];
    const displayName = titleField?.getText() || mechanicName;

    const parameters: Record<string, unknown> = {};
    const targeterValue = block.getFieldValue('TARGETER') as string | null;

    // Collect all parameter fields
    for (const input of block.inputList) {
      for (const field of input.fieldRow) {
        const name = field.name;
        if (!name || name === 'TARGETER') continue;
        // Skip label fields (those without a name that matches a param)
        const value = block.getFieldValue(name);
        if (value !== undefined && value !== null) {
          parameters[name.toLowerCase()] = normalizeFieldValue(value);
        }
      }
    }

    const targeter: Targeter | undefined = targeterValue
      ? {
          id: crypto.randomUUID(),
          type: targeterValue,
          parameters: {},
        }
      : undefined;

    return {
      id: block.id,
      type: 'mechanic',
      mechanic: displayName,
      parameters,
      targeter,
    };
  }

  // ─── Delay block ─────
  if (type === 'mythic_delay') {
    const ticks = block.getFieldValue('TICKS') as number;
    return {
      id: block.id,
      type: 'delay',
      parameters: {},
      delay: ticks,
    };
  }

  // ─── Repeat block ─────
  if (type === 'mythic_repeat') {
    const amount = block.getFieldValue('AMOUNT') as number;
    const interval = block.getFieldValue('INTERVAL') as number;
    const doBlock = block.getInputTargetBlock('DO');
    const childActions = doBlock ? walkMechanicChain(doBlock) : [];

    return {
      id: block.id,
      type: 'mechanic',
      mechanic: 'repeat',
      parameters: {},
      repeat: amount,
      repeatInterval: interval,
      // Store child actions in parameters for now
      ...(childActions.length > 0 && { parameters: { children: childActions } }),
    };
  }

  // ─── Skill reference block ─────
  if (type === 'mythic_skill_ref') {
    const skillName = block.getFieldValue('SKILL_NAME') as string;
    return {
      id: block.id,
      type: 'skill-ref',
      mechanic: skillName,
      parameters: {},
    };
  }

  // ─── Inline condition wrapper ─────
  if (type === 'mythic_inline_condition') {
    const condBlock = block.getInputTargetBlock('CONDITION');
    const thenBlock = block.getInputTargetBlock('THEN');

    const condition = condBlock ? blockToCondition(condBlock) : null;
    const thenActions = thenBlock ? walkMechanicChain(thenBlock) : [];

    // Model inline conditions as a mechanic with embedded conditions
    return {
      id: block.id,
      type: 'mechanic',
      mechanic: 'conditional',
      parameters: {},
      conditions: condition ? [condition] : [],
      // Nest then-actions in parameters
      ...(thenActions.length > 0 && {
        parameters: { thenActions },
      }),
    };
  }

  return null;
}

function blockToCondition(block: Blockly.Block): ConditionEntry {
  const type = block.type;
  const conditionName = type.startsWith('mythic_condition_')
    ? type.replace('mythic_condition_', '').replace(/_/g, ' ')
    : type;

  // Get display name from first field
  const titleField = block.inputList[0]?.fieldRow[0];
  const displayName = titleField?.getText() || conditionName;

  const parameters: Record<string, unknown> = {};

  for (const input of block.inputList) {
    for (const field of input.fieldRow) {
      const name = field.name;
      if (!name) continue;
      const value = block.getFieldValue(name);
      if (value !== undefined && value !== null) {
        parameters[name.toLowerCase()] = normalizeFieldValue(value);
      }
    }
  }

  return {
    id: block.id,
    type: displayName,
    condition: displayName,
    parameters,
    action: 'true',
  };
}

function normalizeFieldValue(value: unknown): unknown {
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;
  if (typeof value === 'string') {
    const num = Number(value);
    if (!isNaN(num) && value.trim() !== '') return num;
  }
  return value;
}
