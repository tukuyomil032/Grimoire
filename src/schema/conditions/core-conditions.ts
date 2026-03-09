import type { ConditionSchema } from '@/models/condition';

/**
 * Core MythicMobs conditions schema registry.
 */

export const CONDITION_REGISTRY: ConditionSchema[] = [
  {
    name: 'distance',
    aliases: [],
    description: { en: 'Checks distance to target', ja: 'ターゲットとの距離を判定' },
    category: 'position',
    parameters: [
      {
        name: 'distance',
        type: 'number',
        description: { en: 'Max distance', ja: '最大距離' },
        required: true,
      },
    ],
  },
  {
    name: 'health',
    aliases: ['hp'],
    description: { en: 'Checks mob health percentage', ja: 'モブのHP割合を判定' },
    category: 'entity',
    parameters: [
      {
        name: 'health',
        type: 'number',
        description: { en: 'Health percentage (0-1)', ja: 'HP割合（0-1）' },
        required: true,
      },
    ],
  },
  {
    name: 'mobsInRadius',
    aliases: [],
    description: { en: 'Checks number of mobs in radius', ja: '半径内のモブ数を判定' },
    category: 'entity',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Number of mobs', ja: 'モブ数' },
        required: true,
      },
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
    ],
  },
  {
    name: 'playersInRadius',
    aliases: [],
    description: { en: 'Checks number of players in radius', ja: '半径内のプレイヤー数を判定' },
    category: 'entity',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Number of players', ja: 'プレイヤー数' },
        required: true,
      },
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
    ],
  },
  {
    name: 'inCombat',
    aliases: [],
    description: { en: 'Checks if mob is in combat', ja: 'モブが戦闘中かを判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isBurning',
    aliases: ['onFire'],
    description: { en: 'Checks if the target is on fire', ja: 'ターゲットが燃えているかを判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isPlayer',
    aliases: [],
    description: { en: 'Checks if target is a player', ja: 'ターゲットがプレイヤーかを判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isMythicMob',
    aliases: [],
    description: { en: 'Checks if target is a MythicMob', ja: 'ターゲットがMythicMobかを判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasAura',
    aliases: [],
    description: {
      en: 'Checks if target has a specific aura',
      ja: 'ターゲットが特定のオーラを持っているかを判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'aura',
        type: 'string',
        description: { en: 'Aura name', ja: 'オーラ名' },
        required: true,
      },
    ],
  },
  {
    name: 'variableEquals',
    aliases: ['varEquals'],
    description: { en: 'Checks if a variable equals a value', ja: '変数が値と等しいかを判定' },
    category: 'variable',
    parameters: [
      {
        name: 'variable',
        type: 'string',
        description: { en: 'Variable name', ja: '変数名' },
        required: true,
      },
      {
        name: 'value',
        type: 'string',
        description: { en: 'Value to check', ja: '判定する値' },
        required: true,
      },
    ],
  },
  {
    name: 'variableInRange',
    aliases: ['varInRange'],
    description: { en: 'Checks if a variable is within a range', ja: '変数が範囲内かを判定' },
    category: 'variable',
    parameters: [
      {
        name: 'variable',
        type: 'string',
        description: { en: 'Variable name', ja: '変数名' },
        required: true,
      },
      { name: 'min', type: 'number', description: { en: 'Minimum', ja: '最小値' }, required: true },
      { name: 'max', type: 'number', description: { en: 'Maximum', ja: '最大値' }, required: true },
    ],
  },
  {
    name: 'biome',
    aliases: [],
    description: { en: 'Checks if at a specific biome', ja: '特定のバイオームかを判定' },
    category: 'world',
    parameters: [
      {
        name: 'biome',
        type: 'string',
        description: { en: 'Biome name', ja: 'バイオーム名' },
        required: true,
      },
    ],
  },
  {
    name: 'world',
    aliases: [],
    description: { en: 'Checks if in a specific world', ja: '特定のワールドかを判定' },
    category: 'world',
    parameters: [
      {
        name: 'world',
        type: 'string',
        description: { en: 'World name', ja: 'ワールド名' },
        required: true,
      },
    ],
  },
  {
    name: 'sunny',
    aliases: [],
    description: { en: 'Checks if the weather is clear', ja: '天気が晴れかを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'night',
    aliases: [],
    description: { en: 'Checks if it is nighttime', ja: '夜間かを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'day',
    aliases: [],
    description: { en: 'Checks if it is daytime', ja: '日中かを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'blockType',
    aliases: [],
    description: {
      en: 'Checks block type at target location',
      ja: 'ターゲット位置のブロックタイプを判定',
    },
    category: 'position',
    parameters: [
      {
        name: 'material',
        type: 'string',
        description: { en: 'Block material', ja: 'ブロック素材' },
        required: true,
      },
    ],
  },
  {
    name: 'heightAbove',
    aliases: [],
    description: {
      en: 'Checks if target is above a height',
      ja: 'ターゲットが特定の高さ以上かを判定',
    },
    category: 'position',
    parameters: [
      {
        name: 'height',
        type: 'number',
        description: { en: 'Y coordinate', ja: 'Y座標' },
        required: true,
      },
    ],
  },
  {
    name: 'heightBelow',
    aliases: [],
    description: {
      en: 'Checks if target is below a height',
      ja: 'ターゲットが特定の高さ以下かを判定',
    },
    category: 'position',
    parameters: [
      {
        name: 'height',
        type: 'number',
        description: { en: 'Y coordinate', ja: 'Y座標' },
        required: true,
      },
    ],
  },
  {
    name: 'targetWithin',
    aliases: [],
    description: { en: 'Checks if target is within a distance', ja: 'ターゲットが距離内かを判定' },
    category: 'position',
    parameters: [
      {
        name: 'distance',
        type: 'number',
        description: { en: 'Distance', ja: '距離' },
        required: true,
      },
    ],
  },
  {
    name: 'chance',
    aliases: [],
    description: { en: 'Random chance to succeed (0-1)', ja: '成功の確率（0-1）' },
    category: 'other',
    parameters: [
      {
        name: 'chance',
        type: 'number',
        description: { en: 'Chance (0-1)', ja: '確率（0-1）' },
        required: true,
        defaultValue: 0.5,
      },
    ],
  },
  {
    name: 'score',
    aliases: [],
    description: { en: 'Checks a scoreboard score', ja: 'スコアボードのスコアを判定' },
    category: 'variable',
    parameters: [
      {
        name: 'objective',
        type: 'string',
        description: { en: 'Objective', ja: 'オブジェクティブ' },
        required: true,
      },
      {
        name: 'value',
        type: 'number',
        description: { en: 'Score value', ja: 'スコア値' },
        required: true,
      },
    ],
  },
  {
    name: 'level',
    aliases: [],
    description: { en: 'Checks mob level', ja: 'モブレベルを判定' },
    category: 'entity',
    parameters: [
      { name: 'level', type: 'number', description: { en: 'Level', ja: 'レベル' }, required: true },
    ],
  },
];

export function findCondition(nameOrAlias: string): ConditionSchema | undefined {
  const lower = nameOrAlias.toLowerCase();
  return CONDITION_REGISTRY.find(
    (c) => c.name.toLowerCase() === lower || c.aliases.some((a) => a.toLowerCase() === lower)
  );
}

export function getConditionsByCategory(): Record<string, ConditionSchema[]> {
  const grouped: Record<string, ConditionSchema[]> = {};
  for (const cond of CONDITION_REGISTRY) {
    if (!grouped[cond.category]) {
      grouped[cond.category] = [];
    }
    grouped[cond.category].push(cond);
  }
  return grouped;
}
