import yaml from 'js-yaml';
import type { Skill, SkillAction, ConditionEntry } from '@/models/skill';

/**
 * Generates MythicMobs YAML from a Skill data model.
 */
export function generateSkillYaml(skill: Skill): string {
  const doc = buildSkillDocument(skill);
  return yaml.dump(doc, {
    indent: 2,
    lineWidth: -1, // No line wrapping
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
    sortKeys: false,
  });
}

function buildSkillDocument(skill: Skill): Record<string, unknown> {
  const doc: Record<string, unknown> = {};
  const skillName = skill.internalName || 'UntitledSkill';

  const skillDef: Record<string, unknown> = {};

  // Cooldown
  if (skill.cooldown && skill.cooldown > 0) {
    skillDef['Cooldown'] = skill.cooldown;
  }

  // CancelIfNoTargets
  if (skill.cancelIfNoTargets) {
    skillDef['CancelIfNoTargets'] = true;
  }

  // OnCooldownSkill
  if (skill.onCooldownSkill) {
    skillDef['OnCooldownSkill'] = skill.onCooldownSkill;
  }

  // FailedConditionsSkill
  if (skill.failedConditionsSkill) {
    skillDef['FailedConditionsSkill'] = skill.failedConditionsSkill;
  }

  // Variables
  if (skill.variables && Object.keys(skill.variables).length > 0) {
    const vars: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(skill.variables)) {
      vars[key] = val.value;
    }
    skillDef['Variables'] = vars;
  }

  // Conditions (target conditions)
  if (skill.conditions && skill.conditions.length > 0) {
    skillDef['Conditions'] = skill.conditions.map(formatCondition);
  }

  // TargetConditions (separate from Conditions)
  if (skill.targetConditions && skill.targetConditions.length > 0) {
    skillDef['TargetConditions'] = skill.targetConditions.map(formatCondition);
  }

  // Trigger conditions
  if (skill.triggerConditions && skill.triggerConditions.length > 0) {
    skillDef['TriggerConditions'] = skill.triggerConditions.map(formatCondition);
  }

  // Skills (mechanic lines)
  if (skill.actions && skill.actions.length > 0) {
    skillDef['Skills'] = skill.actions.map(formatAction);
  }

  doc[skillName] = skillDef;
  return doc;
}

/**
 * Format a single mechanic action into the MythicMobs inline format:
 * - mechanic{param=value;param2=value2} @targeter ~onTrigger
 */
function formatAction(action: SkillAction): string {
  let line = `- ${action.mechanic}`;

  // Parameters
  const params = Object.entries(action.parameters || {}).filter(
    ([, v]) => v !== undefined && v !== '' && v !== null
  );
  if (params.length > 0) {
    const paramStr = params.map(([k, v]) => `${k}=${v}`).join(';');
    line += `{${paramStr}}`;
  }

  // Targeter
  if (action.targeter) {
    line += ` ${formatTargeter(action)}`;
  }

  // Inline conditions
  if (action.conditions && action.conditions.length > 0) {
    const condStr = action.conditions.map((c) => formatInlineCondition(c)).join(' ');
    line += ` ${condStr}`;
  }

  return line;
}

function formatTargeter(action: SkillAction): string {
  if (!action.targeter) return '';

  let str = action.targeter.type;

  // Targeter parameters
  const params = Object.entries(action.targeter.parameters || {}).filter(
    ([, v]) => v !== undefined && v !== '' && v !== null
  );
  if (params.length > 0) {
    const paramStr = params.map(([k, v]) => `${k}=${v}`).join(';');
    str += `{${paramStr}}`;
  }

  // Targeter filters
  if (action.targeter.filters && action.targeter.filters.length > 0) {
    for (const filter of action.targeter.filters) {
      const filterParams = Object.entries(filter.parameters || {})
        .map(([k, v]) => `${k}=${v}`)
        .join(';');
      str += ` ${filter.type}${filterParams ? `{${filterParams}}` : ''}`;
    }
  }

  return str;
}

function formatCondition(cond: ConditionEntry): string {
  let str = `- ${cond.type}`;

  const params = Object.entries(cond.parameters || {}).filter(
    ([, v]) => v !== undefined && v !== '' && v !== null
  );
  if (params.length > 0) {
    const paramStr = params.map(([k, v]) => `${k}=${v}`).join(';');
    str += `{${paramStr}}`;
  }

  // Action
  if (cond.action && cond.action !== 'true') {
    str += ` ${cond.action}`;
  }

  return str;
}

function formatInlineCondition(cond: ConditionEntry): string {
  let str = `?${cond.type}`;

  const params = Object.entries(cond.parameters || {}).filter(
    ([, v]) => v !== undefined && v !== '' && v !== null
  );
  if (params.length > 0) {
    const paramStr = params.map(([k, v]) => `${k}=${v}`).join(';');
    str += `{${paramStr}}`;
  }

  return str;
}
