/**
 * Skill Model → Blockly Deserializer
 *
 * Recreates Blockly blocks from the Skill model so that
 * previously saved skills can be loaded back into the workspace.
 */
import Blockly from 'blockly';
import type { Skill, SkillAction } from '@/models/skill';
import { MECHANIC_REGISTRY } from '@/schema/mechanics/core-mechanics';

/**
 * Load a Skill model into the Blockly workspace.
 * Clears the workspace first, then builds blocks from the model.
 */
export function deserializeToWorkspace(workspace: Blockly.WorkspaceSvg, skill: Skill): void {
  // Disable events during deserialization to prevent feedback loops
  Blockly.Events.disable();

  try {
    workspace.clear();

    if (skill.triggers.length === 0 && skill.actions.length === 0) {
      // Nothing to load — leave empty
      return;
    }

    // Create a trigger block for the primary trigger
    const triggerType = skill.triggers[0] || 'onCombat';
    const triggerBlock = workspace.newBlock('mythic_trigger');
    triggerBlock.setFieldValue(triggerType, 'TRIGGER_TYPE');
    triggerBlock.initSvg();
    triggerBlock.render();
    triggerBlock.moveBy(50, 50);

    // Build the mechanic chain and attach to trigger
    if (skill.actions.length > 0) {
      const firstMechBlock = buildMechanicChain(workspace, skill.actions);
      if (firstMechBlock) {
        const actionsInput = triggerBlock.getInput('ACTIONS');
        if (actionsInput?.connection && firstMechBlock.previousConnection) {
          actionsInput.connection.connect(firstMechBlock.previousConnection);
        }
      }
    }

    // Create additional trigger blocks if multiple triggers exist
    for (let i = 1; i < skill.triggers.length; i++) {
      const extraTrigger = workspace.newBlock('mythic_trigger');
      extraTrigger.setFieldValue(skill.triggers[i], 'TRIGGER_TYPE');
      extraTrigger.initSvg();
      extraTrigger.render();
      extraTrigger.moveBy(50, 50 + i * 200);
    }
  } finally {
    Blockly.Events.enable();
    // Fire a single change event so the UI knows something happened
    workspace.fireChangeListener(
      new (Blockly.Events.get(Blockly.Events.FINISHED_LOADING))(workspace)
    );
  }
}

// ─── Internal helpers ───────────────────────────────

function buildMechanicChain(
  workspace: Blockly.WorkspaceSvg,
  actions: SkillAction[]
): Blockly.BlockSvg | null {
  let firstBlock: Blockly.BlockSvg | null = null;
  let prevBlock: Blockly.BlockSvg | null = null;

  for (const action of actions) {
    const block = actionToBlock(workspace, action);
    if (!block) continue;

    if (!firstBlock) {
      firstBlock = block;
    }

    if (prevBlock?.nextConnection && block.previousConnection) {
      prevBlock.nextConnection.connect(block.previousConnection);
    }

    prevBlock = block;
  }

  return firstBlock;
}

function actionToBlock(
  workspace: Blockly.WorkspaceSvg,
  action: SkillAction
): Blockly.BlockSvg | null {
  if (action.type === 'delay') {
    const block = workspace.newBlock('mythic_delay') as Blockly.BlockSvg;
    block.setFieldValue(action.delay ?? 20, 'TICKS');
    block.initSvg();
    block.render();
    return block;
  }

  if (action.type === 'skill-ref') {
    const block = workspace.newBlock('mythic_skill_ref') as Blockly.BlockSvg;
    block.setFieldValue(action.mechanic || 'skillName', 'SKILL_NAME');
    block.initSvg();
    block.render();
    return block;
  }

  if (action.type === 'mechanic' && action.mechanic) {
    // Find the matching mechanic in registry to get the block type
    const mechName = action.mechanic;
    const mechSchema = MECHANIC_REGISTRY.find(
      (m) => m.name.toLowerCase() === mechName.toLowerCase()
    );

    if (!mechSchema) {
      // Unknown mechanic — skip
      return null;
    }

    const blockType = `mythic_mechanic_${mechSchema.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

    // Check if this block type is registered
    if (!Blockly.Blocks[blockType]) {
      return null;
    }

    const block = workspace.newBlock(blockType) as Blockly.BlockSvg;

    // Restore parameter values
    for (const param of mechSchema.parameters) {
      const fieldName = param.name.toUpperCase();
      const value = action.parameters[param.name.toLowerCase()];
      if (value !== undefined && block.getField(fieldName)) {
        try {
          block.setFieldValue(String(value), fieldName);
        } catch {
          // Field validation might reject the value — skip
        }
      }
    }

    // Restore targeter
    if (action.targeter && block.getField('TARGETER')) {
      try {
        block.setFieldValue(action.targeter.type, 'TARGETER');
      } catch {
        // Targeter not in dropdown — skip
      }
    }

    block.initSvg();
    block.render();
    return block;
  }

  return null;
}
