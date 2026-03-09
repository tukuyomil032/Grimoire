import type { Skill } from '@/models/skill';

export interface SkillTemplate {
  id: string;
  nameKey: string;
  descKey: string;
  icon: string;
  category: 'damage' | 'support' | 'utility' | 'summon';
  create: () => Skill;
}

function makeSkill(overrides: Partial<Skill> & { internalName: string }): Skill {
  return {
    id: crypto.randomUUID(),
    name: overrides.internalName,
    internalName: overrides.internalName,
    triggers: overrides.triggers || [],
    cooldown: overrides.cooldown,
    cancelIfNoTargets: overrides.cancelIfNoTargets,
    conditions: overrides.conditions || [],
    targetConditions: overrides.targetConditions || [],
    triggerConditions: overrides.triggerConditions || [],
    actions: overrides.actions || [],
    variables: overrides.variables,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const SKILL_TEMPLATES: SkillTemplate[] = [
  {
    id: 'basic-damage',
    nameKey: 'template.basicDamage',
    descKey: 'template.basicDamageDesc',
    icon: '⚔️',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'BasicDamageSkill',
        cooldown: 3,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'damage',
            parameters: { amount: 10 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
        ],
      }),
  },
  {
    id: 'heal-aura',
    nameKey: 'template.healAura',
    descKey: 'template.healAuraDesc',
    icon: '💚',
    category: 'support',
    create: () =>
      makeSkill({
        internalName: 'HealAura',
        cooldown: 10,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'heal',
            parameters: { amount: 8 },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 5 } },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'particles',
            parameters: { particle: 'heart', amount: 10 },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 5 } },
          },
        ],
      }),
  },
  {
    id: 'fire-storm',
    nameKey: 'template.fireStorm',
    descKey: 'template.fireStormDesc',
    icon: '🔥',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'FireStorm',
        cooldown: 15,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'damage',
            parameters: { amount: 12 },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 6 } },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'ignite',
            parameters: { ticks: 60 },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 6 } },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'particles',
            parameters: { particle: 'flame', amount: 30 },
            targeter: { id: crypto.randomUUID(), type: '@SelfLocation', parameters: {} },
          },
        ],
      }),
  },
  {
    id: 'ice-blast',
    nameKey: 'template.iceBlast',
    descKey: 'template.iceBlastDesc',
    icon: '❄️',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'IceBlast',
        cooldown: 8,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'projectile',
            parameters: { onTick: 'IceBlast_Tick', onHit: 'IceBlast_Hit', velocity: 2 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
        ],
      }),
  },
  {
    id: 'summon-minions',
    nameKey: 'template.summonMinions',
    descKey: 'template.summonMinionsDesc',
    icon: '👥',
    category: 'summon',
    create: () =>
      makeSkill({
        internalName: 'SummonMinions',
        cooldown: 30,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'summon',
            parameters: { type: 'MinionSkeleton', amount: 3 },
            targeter: { id: crypto.randomUUID(), type: '@SelfLocation', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'message',
            parameters: { msg: '&cMinions arise!' },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 20 } },
          },
        ],
      }),
  },
  {
    id: 'teleport-strike',
    nameKey: 'template.teleportStrike',
    descKey: 'template.teleportStrikeDesc',
    icon: '⚡',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'TeleportStrike',
        cooldown: 12,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'teleport',
            parameters: {},
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'damage',
            parameters: { amount: 15 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'sound',
            parameters: { sound: 'entity.enderman.teleport' },
            targeter: { id: crypto.randomUUID(), type: '@self', parameters: {} },
          },
        ],
      }),
  },
  {
    id: 'shield-bash',
    nameKey: 'template.shieldBash',
    descKey: 'template.shieldBashDesc',
    icon: '🛡️',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'ShieldBash',
        cooldown: 6,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'damage',
            parameters: { amount: 6 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'throw',
            parameters: { velocity: 2, velocityY: 0.5 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'stun',
            parameters: { duration: 40 },
            targeter: { id: crypto.randomUUID(), type: '@target', parameters: {} },
          },
        ],
      }),
  },
  {
    id: 'lightning-strike',
    nameKey: 'template.lightningStrike',
    descKey: 'template.lightningStrikeDesc',
    icon: '⛈️',
    category: 'damage',
    create: () =>
      makeSkill({
        internalName: 'LightningStrike',
        cooldown: 20,
        actions: [
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'lightning',
            parameters: { damage: 8 },
            targeter: { id: crypto.randomUUID(), type: '@TargetLocation', parameters: {} },
          },
          {
            id: crypto.randomUUID(),
            type: 'mechanic',
            mechanic: 'damage',
            parameters: { amount: 20 },
            targeter: { id: crypto.randomUUID(), type: '@PIR', parameters: { r: 3 } },
          },
        ],
      }),
  },
];
