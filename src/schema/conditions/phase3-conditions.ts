/**
 * Phase 3: Full MythicMobs conditions coverage.
 * Additional 105+ conditions covering all MythicMobs categories.
 */
import type { ConditionSchema, ConditionParameterSchema } from '@/models/condition';

function p(
  name: string,
  type: ConditionParameterSchema['type'],
  desc: Record<string, string>,
  opts?: Partial<ConditionParameterSchema>
): ConditionParameterSchema {
  return { name, type, description: desc, required: false, ...opts };
}

// ─── Entity state conditions ──────────────────────

const entityStateConditions: ConditionSchema[] = [
  {
    name: 'isPlayer',
    aliases: [],
    description: { en: 'Checks if target is a player', ja: 'ターゲットがプレイヤーか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isMob',
    aliases: [],
    description: {
      en: 'Checks if target is a MythicMobs mob',
      ja: 'ターゲットがMythicMobsモブか確認',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isMonster',
    aliases: [],
    description: { en: 'Checks if entity is a hostile mob', ja: 'エンティティが敵対モブか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isAnimal',
    aliases: [],
    description: { en: 'Checks if entity is an animal', ja: 'エンティティが動物か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isUndead',
    aliases: [],
    description: { en: 'Checks if entity is undead', ja: 'エンティティがアンデッドか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isBurning',
    aliases: [],
    description: { en: 'Checks if entity is on fire', ja: 'エンティティが燃えているか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isAlive',
    aliases: [],
    description: { en: 'Checks if entity is alive', ja: 'エンティティが生きているか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isDead',
    aliases: [],
    description: { en: 'Checks if entity is dead', ja: 'エンティティが死んでいるか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isClimbing',
    aliases: [],
    description: { en: 'Checks if entity is climbing', ja: 'エンティティが登っているか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isInWater',
    aliases: [],
    description: { en: 'Checks if entity is in water', ja: 'エンティティが水中か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isInLava',
    aliases: [],
    description: { en: 'Checks if entity is in lava', ja: 'エンティティが溶岩中か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isOnGround',
    aliases: [],
    description: { en: 'Checks if entity is on the ground', ja: 'エンティティが地面の上か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isInRain',
    aliases: [],
    description: {
      en: 'Checks if entity is exposed to rain',
      ja: 'エンティティが雨に晒されているか確認',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isInBlock',
    aliases: [],
    description: {
      en: 'Checks if entity is inside a block',
      ja: 'エンティティがブロック内にいるか確認',
    },
    category: 'entity',
    parameters: [p('material', 'material', { en: 'Block material', ja: 'ブロック素材' })],
  },
  {
    name: 'isSneaking',
    aliases: [],
    description: { en: 'Checks if player is sneaking', ja: 'プレイヤーがスニーク中か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isBlocking',
    aliases: [],
    description: {
      en: 'Checks if player is blocking with a shield',
      ja: 'プレイヤーが盾でブロック中か確認',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isSleeping',
    aliases: [],
    description: { en: 'Checks if player is sleeping', ja: 'プレイヤーが寝ているか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isLeashed',
    aliases: [],
    description: { en: 'Checks if entity is leashed', ja: 'エンティティがリードされているか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isInCombat',
    aliases: [],
    description: { en: 'Checks if entity is in combat', ja: 'エンティティが戦闘中か確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasAura',
    aliases: [],
    description: {
      en: 'Checks if entity has a specific aura',
      ja: 'エンティティが特定のオーラを持つか確認',
    },
    category: 'entity',
    parameters: [p('aura', 'string', { en: 'Aura name', ja: 'オーラ名' }, { required: true })],
  },
  {
    name: 'hasAuraStacks',
    aliases: [],
    description: { en: 'Checks aura stack count', ja: 'オーラスタック数を確認' },
    category: 'entity',
    parameters: [
      p('aura', 'string', { en: 'Aura name', ja: 'オーラ名' }, { required: true }),
      p('amount', 'number', { en: 'Minimum stacks', ja: '最小スタック数' }, { required: true }),
    ],
  },
  {
    name: 'hasOwner',
    aliases: [],
    description: { en: 'Checks if mob has an owner', ja: 'モブにオーナーがいるか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasParent',
    aliases: [],
    description: { en: 'Checks if mob has a parent', ja: 'モブに親が いるか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasChildren',
    aliases: [],
    description: { en: 'Checks if mob has children', ja: 'モブに子が いるか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasTarget',
    aliases: [],
    description: { en: 'Checks if mob has a target', ja: 'モブにターゲットがいるか確認' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasThreatTable',
    aliases: [],
    description: { en: 'Checks if mob has a threat table', ja: 'モブに脅威テーブルがあるか確認' },
    category: 'entity',
    parameters: [],
  },
];

// ─── Health / resource conditions ─────────────────

const healthConditions: ConditionSchema[] = [
  {
    name: 'health',
    aliases: [],
    description: { en: 'Checks entity health amount', ja: 'エンティティのHP量を確認' },
    category: 'entity',
    parameters: [
      p('amount', 'number', { en: 'Health amount', ja: 'HP量' }, { required: true }),
      p(
        'comparator',
        'string',
        { en: 'Comparator (>=, <=, =)', ja: '比較子' },
        { defaultValue: '>=' }
      ),
    ],
  },
  {
    name: 'healthPercent',
    aliases: [],
    description: { en: 'Checks entity health percent', ja: 'エンティティのHP割合を確認' },
    category: 'entity',
    parameters: [
      p(
        'amount',
        'number',
        { en: 'Health percent (0-1)', ja: 'HP割合（0-1）' },
        { required: true }
      ),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'foodLevel',
    aliases: [],
    description: { en: 'Checks player food level', ja: 'プレイヤーの食料レベルを確認' },
    category: 'entity',
    parameters: [
      p(
        'amount',
        'number',
        { en: 'Food level (0-20)', ja: '食料レベル（0-20）' },
        { required: true }
      ),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'level',
    aliases: [],
    description: { en: 'Checks mob level', ja: 'モブのレベルを確認' },
    category: 'entity',
    parameters: [
      p('amount', 'number', { en: 'Level', ja: 'レベル' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'xpLevel',
    aliases: [],
    description: { en: 'Checks player XP level', ja: 'プレイヤーの経験値レベルを確認' },
    category: 'entity',
    parameters: [p('amount', 'number', { en: 'XP level', ja: '経験値レベル' }, { required: true })],
  },
  {
    name: 'absorptionHealth',
    aliases: [],
    description: { en: 'Checks absorption health', ja: '吸収HPを確認' },
    category: 'entity',
    parameters: [p('amount', 'number', { en: 'Amount', ja: '量' }, { required: true })],
  },
];

// ─── Location / world conditions ──────────────────

const locationConditions: ConditionSchema[] = [
  {
    name: 'biome',
    aliases: [],
    description: { en: 'Checks current biome', ja: '現在のバイオームを確認' },
    category: 'position',
    parameters: [
      p('biome', 'string', { en: 'Biome name', ja: 'バイオーム名' }, { required: true }),
    ],
  },
  {
    name: 'world',
    aliases: [],
    description: { en: 'Checks current world', ja: '現在のワールドを確認' },
    category: 'world',
    parameters: [p('world', 'string', { en: 'World name', ja: 'ワールド名' }, { required: true })],
  },
  {
    name: 'dimension',
    aliases: [],
    description: { en: 'Checks current dimension', ja: '現在のディメンションを確認' },
    category: 'world',
    parameters: [
      p(
        'dimension',
        'string',
        { en: 'Dimension (OVERWORLD/NETHER/END)', ja: 'ディメンション' },
        { required: true }
      ),
    ],
  },
  {
    name: 'heightBelow',
    aliases: [],
    description: { en: 'Checks if Y is below value', ja: 'Y座標が値未満か確認' },
    category: 'position',
    parameters: [p('height', 'number', { en: 'Max Y level', ja: '最大Y' }, { required: true })],
  },
  {
    name: 'heightAbove',
    aliases: [],
    description: { en: 'Checks if Y is above value', ja: 'Y座標が値以上か確認' },
    category: 'position',
    parameters: [p('height', 'number', { en: 'Min Y level', ja: '最小Y' }, { required: true })],
  },
  {
    name: 'nearBlock',
    aliases: [],
    description: { en: 'Checks if near a block type', ja: '特定ブロックの近くか確認' },
    category: 'position',
    parameters: [
      p('material', 'material', { en: 'Block material', ja: 'ブロック素材' }, { required: true }),
      p('radius', 'number', { en: 'Search radius', ja: '検索半径' }, { defaultValue: 5 }),
    ],
  },
  {
    name: 'blockType',
    aliases: [],
    description: {
      en: 'Checks block type at target location',
      ja: 'ターゲット位置のブロックタイプを確認',
    },
    category: 'position',
    parameters: [
      p('material', 'material', { en: 'Block material', ja: 'ブロック素材' }, { required: true }),
    ],
  },
  {
    name: 'distanceFromSpawn',
    aliases: [],
    description: { en: 'Checks distance from world spawn', ja: 'ワールドスポーンからの距離を確認' },
    category: 'position',
    parameters: [
      p('distance', 'number', { en: 'Distance', ja: '距離' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '<=' }),
    ],
  },
  {
    name: 'distanceFromTrackedLocation',
    aliases: [],
    description: {
      en: 'Checks distance from tracked location',
      ja: 'トラッキング位置からの距離を確認',
    },
    category: 'position',
    parameters: [p('distance', 'number', { en: 'Distance', ja: '距離' }, { required: true })],
  },
  {
    name: 'inCuboid',
    aliases: [],
    description: { en: 'Checks if in a cuboid area', ja: '直方体エリア内か確認' },
    category: 'position',
    parameters: [
      p('x1', 'number', { en: 'Corner 1 X', ja: '角1 X' }, { required: true }),
      p('y1', 'number', { en: 'Corner 1 Y', ja: '角1 Y' }, { required: true }),
      p('z1', 'number', { en: 'Corner 1 Z', ja: '角1 Z' }, { required: true }),
      p('x2', 'number', { en: 'Corner 2 X', ja: '角2 X' }, { required: true }),
      p('y2', 'number', { en: 'Corner 2 Y', ja: '角2 Y' }, { required: true }),
      p('z2', 'number', { en: 'Corner 2 Z', ja: '角2 Z' }, { required: true }),
    ],
  },
  {
    name: 'inSphere',
    aliases: [],
    description: { en: 'Checks if within a sphere', ja: '球体内か確認' },
    category: 'position',
    parameters: [
      p('x', 'number', { en: 'Center X', ja: '中心X' }, { required: true }),
      p('y', 'number', { en: 'Center Y', ja: '中心Y' }, { required: true }),
      p('z', 'number', { en: 'Center Z', ja: '中心Z' }, { required: true }),
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { required: true }),
    ],
  },
  {
    name: 'yaw',
    aliases: [],
    description: { en: 'Checks entity yaw angle', ja: 'エンティティのヨー角を確認' },
    category: 'position',
    parameters: [
      p('min', 'number', { en: 'Min yaw', ja: '最小ヨー' }, { required: true }),
      p('max', 'number', { en: 'Max yaw', ja: '最大ヨー' }, { required: true }),
    ],
  },
  {
    name: 'pitch',
    aliases: [],
    description: { en: 'Checks entity pitch angle', ja: 'エンティティのピッチ角を確認' },
    category: 'position',
    parameters: [
      p('min', 'number', { en: 'Min pitch', ja: '最小ピッチ' }, { required: true }),
      p('max', 'number', { en: 'Max pitch', ja: '最大ピッチ' }, { required: true }),
    ],
  },
  {
    name: 'targetWithin',
    aliases: [],
    description: { en: 'Checks if target is within range', ja: 'ターゲットが範囲内か確認' },
    category: 'position',
    parameters: [
      p('distance', 'number', { en: 'Max distance', ja: '最大距離' }, { required: true }),
    ],
  },
  {
    name: 'targetNotWithin',
    aliases: [],
    description: { en: 'Checks if target is outside range', ja: 'ターゲットが範囲外か確認' },
    category: 'position',
    parameters: [
      p('distance', 'number', { en: 'Min distance', ja: '最小距離' }, { required: true }),
    ],
  },
  {
    name: 'entityInRadius',
    aliases: [],
    description: { en: 'Checks entity count in radius', ja: '半径内のエンティティ数を確認' },
    category: 'position',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { required: true }),
      p('amount', 'number', { en: 'Minimum count', ja: '最小数' }, { defaultValue: 1 }),
      p('type', 'string', { en: 'Entity type filter', ja: 'エンティティタイプフィルタ' }),
    ],
  },
  {
    name: 'mobsInRadius',
    aliases: [],
    description: { en: 'Checks MythicMobs count in radius', ja: '半径内のMythicMobs数を確認' },
    category: 'position',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { required: true }),
      p('amount', 'number', { en: 'Minimum count', ja: '最小数' }, { defaultValue: 1 }),
      p('type', 'string', { en: 'Mob type filter', ja: 'モブタイプフィルタ' }),
    ],
  },
  {
    name: 'playersInRadius',
    aliases: [],
    description: { en: 'Checks player count in radius', ja: '半径内のプレイヤー数を確認' },
    category: 'position',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { required: true }),
      p('amount', 'number', { en: 'Minimum count', ja: '最小数' }, { defaultValue: 1 }),
    ],
  },
];

// ─── Inventory / item conditions ──────────────────

const inventoryConditions: ConditionSchema[] = [
  {
    name: 'hasItem',
    aliases: [],
    description: { en: 'Checks if entity has an item', ja: 'エンティティがアイテムを持つか確認' },
    category: 'entity',
    parameters: [
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
      p('amount', 'number', { en: 'Minimum amount', ja: '最小数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'itemInHand',
    aliases: [],
    description: { en: 'Checks item in main hand', ja: 'メインハンドのアイテムを確認' },
    category: 'entity',
    parameters: [
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
    ],
  },
  {
    name: 'itemInOffHand',
    aliases: [],
    description: { en: 'Checks item in off hand', ja: 'オフハンドのアイテムを確認' },
    category: 'entity',
    parameters: [
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
    ],
  },
  {
    name: 'wearingArmor',
    aliases: [],
    description: { en: 'Checks full armor set', ja: 'フルアーマーセットを確認' },
    category: 'entity',
    parameters: [
      p('material', 'string', { en: 'Armor material (DIAMOND, IRON, etc.)', ja: '防具素材' }),
    ],
  },
  {
    name: 'itemRecharging',
    aliases: [],
    description: {
      en: 'Checks if item in hand is on cooldown',
      ja: '手のアイテムがクールダウン中か確認',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasEmptySlot',
    aliases: [],
    description: {
      en: 'Checks if inventory has empty slot',
      ja: 'インベントリに空きスロットがあるか確認',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'inventoryContains',
    aliases: [],
    description: {
      en: 'Checks if inventory contains item',
      ja: 'インベントリにアイテムがあるか確認',
    },
    category: 'entity',
    parameters: [
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
      p('amount', 'number', { en: 'Minimum amount', ja: '最小数量' }, { defaultValue: 1 }),
    ],
  },
];

// ─── Variable / compare conditions ────────────────

const variableConditions: ConditionSchema[] = [
  {
    name: 'variableEquals',
    aliases: [],
    description: { en: 'Checks if variable equals value', ja: '変数が値と等しいか確認' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('value', 'string', { en: 'Expected value', ja: '期待値' }, { required: true }),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'variableInRange',
    aliases: [],
    description: { en: 'Checks if variable is in range', ja: '変数が範囲内か確認' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('min', 'number', { en: 'Min value', ja: '最小値' }, { required: true }),
      p('max', 'number', { en: 'Max value', ja: '最大値' }, { required: true }),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'globalVariable',
    aliases: [],
    description: { en: 'Checks a global variable', ja: 'グローバル変数を確認' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('value', 'string', { en: 'Expected value', ja: '期待値' }, { required: true }),
    ],
  },
  {
    name: 'worldVariable',
    aliases: [],
    description: { en: 'Checks a world variable', ja: 'ワールド変数を確認' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('value', 'string', { en: 'Expected value', ja: '期待値' }, { required: true }),
    ],
  },
  {
    name: 'score',
    aliases: [],
    description: { en: 'Checks a scoreboard score', ja: 'スコアボードスコアを確認' },
    category: 'variable',
    parameters: [
      p('objective', 'string', { en: 'Objective', ja: 'オブジェクティブ' }, { required: true }),
      p('value', 'number', { en: 'Value', ja: '値' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
];

// ─── Permission / gamemode conditions ─────────────

const permissionConditions: ConditionSchema[] = [
  {
    name: 'permission',
    aliases: [],
    description: { en: 'Checks if player has permission', ja: 'プレイヤーが権限を持つか確認' },
    category: 'entity',
    parameters: [
      p('permission', 'string', { en: 'Permission node', ja: '権限ノード' }, { required: true }),
    ],
  },
  {
    name: 'gameMode',
    aliases: [],
    description: { en: 'Checks player game mode', ja: 'プレイヤーのゲームモードを確認' },
    category: 'entity',
    parameters: [
      p(
        'mode',
        'string',
        { en: 'Game mode (SURVIVAL/CREATIVE/ADVENTURE/SPECTATOR)', ja: 'ゲームモード' },
        { required: true }
      ),
    ],
  },
  {
    name: 'isOp',
    aliases: [],
    description: { en: 'Checks if player is an operator', ja: 'プレイヤーがオペレーターか確認' },
    category: 'entity',
    parameters: [],
  },
];

// ─── Time / weather conditions ────────────────────

const timeConditions: ConditionSchema[] = [
  {
    name: 'time',
    aliases: [],
    description: { en: 'Checks world time range', ja: 'ワールド時間範囲を確認' },
    category: 'world',
    parameters: [
      p(
        'min',
        'number',
        { en: 'Min time (ticks)', ja: '最小時間（ティック）' },
        { required: true }
      ),
      p(
        'max',
        'number',
        { en: 'Max time (ticks)', ja: '最大時間（ティック）' },
        { required: true }
      ),
    ],
  },
  {
    name: 'day',
    aliases: [],
    description: { en: 'Checks if it is daytime', ja: '昼間か確認' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'night',
    aliases: [],
    description: { en: 'Checks if it is night', ja: '夜か確認' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'sunny',
    aliases: [],
    description: { en: 'Checks if weather is clear', ja: '天気が晴れか確認' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'storming',
    aliases: [],
    description: { en: 'Checks if there is a thunderstorm', ja: '雷雨か確認' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'moonPhase',
    aliases: [],
    description: { en: 'Checks the moon phase (0-7)', ja: '月の形を確認（0-7）' },
    category: 'world',
    parameters: [
      p('phase', 'number', { en: 'Moon phase (0-7)', ja: '月相（0-7）' }, { required: true }),
    ],
  },
];

// ─── Relationship / distance conditions ───────────

const relationshipConditions: ConditionSchema[] = [
  {
    name: 'distance',
    aliases: [],
    description: {
      en: 'Checks distance between caster and target',
      ja: 'キャスターとターゲットの距離を確認',
    },
    category: 'relationship',
    parameters: [
      p('distance', 'number', { en: 'Distance', ja: '距離' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '<=' }),
    ],
  },
  {
    name: 'isCaster',
    aliases: [],
    description: { en: 'Checks if target is the caster', ja: 'ターゲットがキャスターか確認' },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'isChild',
    aliases: [],
    description: {
      en: 'Checks if target is a child of caster',
      ja: 'ターゲットがキャスターの子か確認',
    },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'isParent',
    aliases: [],
    description: {
      en: 'Checks if target is parent of caster',
      ja: 'ターゲットがキャスターの親か確認',
    },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'sameWorld',
    aliases: [],
    description: { en: 'Checks if on same world', ja: '同じワールドか確認' },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'targetInLineOfSight',
    aliases: [],
    description: {
      en: 'Checks if caster can see target',
      ja: 'キャスターがターゲットを視認可能か確認',
    },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'behind',
    aliases: [],
    description: {
      en: 'Checks if target is behind caster',
      ja: 'ターゲットがキャスターの後ろか確認',
    },
    category: 'relationship',
    parameters: [],
  },
  {
    name: 'inFront',
    aliases: [],
    description: {
      en: 'Checks if target is in front of caster',
      ja: 'ターゲットがキャスターの前方か確認',
    },
    category: 'relationship',
    parameters: [],
  },
];

// ─── Chance / cooldown / meta conditions ──────────

const metaConditions: ConditionSchema[] = [
  {
    name: 'chance',
    aliases: [],
    description: { en: 'Random chance condition', ja: 'ランダム確率条件' },
    category: 'meta',
    parameters: [
      p('chance', 'number', { en: 'Chance (0-1)', ja: '確率（0-1）' }, { required: true }),
    ],
  },
  {
    name: 'onCooldown',
    aliases: [],
    description: { en: 'Checks if skill is on cooldown', ja: 'スキルがクールダウン中か確認' },
    category: 'meta',
    parameters: [p('skill', 'string', { en: 'Skill name', ja: 'スキル名' })],
  },
  {
    name: 'offCooldown',
    aliases: [],
    description: {
      en: 'Checks if skill cooldown is finished',
      ja: 'スキルクールダウンが終了したか確認',
    },
    category: 'meta',
    parameters: [p('skill', 'string', { en: 'Skill name', ja: 'スキル名' })],
  },
  {
    name: 'stance',
    aliases: [],
    description: { en: 'Checks mob stance', ja: 'モブのスタンスを確認' },
    category: 'meta',
    parameters: [
      p('stance', 'string', { en: 'Stance name', ja: 'スタンス名' }, { required: true }),
    ],
  },
  {
    name: 'mobType',
    aliases: [],
    description: { en: 'Checks MythicMobs mob type', ja: 'MythicMobsモブタイプを確認' },
    category: 'meta',
    parameters: [p('type', 'string', { en: 'Mob type', ja: 'モブタイプ' }, { required: true })],
  },
  {
    name: 'skillLevel',
    aliases: [],
    description: { en: 'Checks skill tree level', ja: 'スキルツリーレベルを確認' },
    category: 'meta',
    parameters: [
      p('skill', 'string', { en: 'Skill name', ja: 'スキル名' }, { required: true }),
      p('level', 'number', { en: 'Min level', ja: '最小レベル' }, { required: true }),
    ],
  },
  {
    name: 'mythicMobLevel',
    aliases: [],
    description: { en: 'Checks mob MythicMobs level', ja: 'MythicMobsレベルを確認' },
    category: 'meta',
    parameters: [
      p('level', 'number', { en: 'Level', ja: 'レベル' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'threatTableContains',
    aliases: [],
    description: {
      en: 'Checks if threat table contains entity',
      ja: '脅威テーブルにエンティティがいるか確認',
    },
    category: 'meta',
    parameters: [],
  },
  {
    name: 'threat',
    aliases: [],
    description: { en: 'Checks targets threat level', ja: 'ターゲットの脅威レベルを確認' },
    category: 'meta',
    parameters: [
      p('amount', 'number', { en: 'Threat amount', ja: '脅威量' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
];

// ─── Plugin integration conditions ────────────────

const pluginConditions: ConditionSchema[] = [
  {
    name: 'worldGuardRegion',
    aliases: ['region'],
    description: { en: 'Checks if in WorldGuard region', ja: 'WorldGuardリージョン内か確認' },
    category: 'plugin',
    parameters: [
      p('region', 'string', { en: 'Region name', ja: 'リージョン名' }, { required: true }),
    ],
  },
  {
    name: 'worldGuardFlag',
    aliases: [],
    description: { en: 'Checks a WorldGuard flag', ja: 'WorldGuardフラグを確認' },
    category: 'plugin',
    parameters: [
      p('flag', 'string', { en: 'Flag name', ja: 'フラグ名' }, { required: true }),
      p('value', 'string', { en: 'Expected value', ja: '期待値' }, { defaultValue: 'ALLOW' }),
    ],
  },
  {
    name: 'factionsPower',
    aliases: [],
    description: { en: 'Checks Factions power', ja: 'Factionsパワーを確認' },
    category: 'plugin',
    parameters: [p('power', 'number', { en: 'Min power', ja: '最小パワー' }, { required: true })],
  },
  {
    name: 'placeholderString',
    aliases: [],
    description: {
      en: 'Checks PlaceholderAPI placeholder string',
      ja: 'PlaceholderAPIプレースホルダ文字列を確認',
    },
    category: 'plugin',
    parameters: [
      p('placeholder', 'string', { en: 'Placeholder', ja: 'プレースホルダ' }, { required: true }),
      p('value', 'string', { en: 'Expected value', ja: '期待値' }, { required: true }),
    ],
  },
  {
    name: 'placeholderNumber',
    aliases: [],
    description: {
      en: 'Checks PlaceholderAPI placeholder number',
      ja: 'PlaceholderAPIプレースホルダ数値を確認',
    },
    category: 'plugin',
    parameters: [
      p('placeholder', 'string', { en: 'Placeholder', ja: 'プレースホルダ' }, { required: true }),
      p('value', 'number', { en: 'Value', ja: '値' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
];

// ─── Damage / combat conditions ───────────────────

const combatConditions: ConditionSchema[] = [
  {
    name: 'damageAmount',
    aliases: [],
    description: {
      en: 'Checks the damage amount of current event',
      ja: '現在のイベントのダメージ量を確認',
    },
    category: 'compare',
    parameters: [
      p('amount', 'number', { en: 'Damage amount', ja: 'ダメージ量' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'damageCause',
    aliases: [],
    description: { en: 'Checks the cause of damage', ja: 'ダメージ原因を確認' },
    category: 'compare',
    parameters: [
      p(
        'cause',
        'string',
        { en: 'Damage cause (ENTITY_ATTACK/PROJECTILE/FALL/FIRE/etc.)', ja: 'ダメージ原因' },
        { required: true }
      ),
    ],
  },
  {
    name: 'lastDamageCause',
    aliases: [],
    description: {
      en: 'Checks the last damage cause on entity',
      ja: 'エンティティの最後のダメージ原因を確認',
    },
    category: 'compare',
    parameters: [
      p('cause', 'string', { en: 'Damage cause', ja: 'ダメージ原因' }, { required: true }),
    ],
  },
  {
    name: 'hasEnchantment',
    aliases: [],
    description: {
      en: 'Checks if held item has enchantment',
      ja: '手持ちアイテムにエンチャントがあるか確認',
    },
    category: 'entity',
    parameters: [
      p(
        'enchantment',
        'string',
        { en: 'Enchantment name', ja: 'エンチャント名' },
        { required: true }
      ),
      p('level', 'number', { en: 'Minimum level', ja: '最小レベル' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'wearing',
    aliases: [],
    description: {
      en: 'Checks what the entity is wearing in a specific slot',
      ja: '特定スロットの装備を確認',
    },
    category: 'entity',
    parameters: [
      p(
        'slot',
        'string',
        { en: 'Equipment slot (HEAD/CHEST/LEGS/FEET)', ja: '装備スロット' },
        { required: true }
      ),
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
    ],
  },
  {
    name: 'holding',
    aliases: [],
    description: {
      en: 'Checks what the entity is holding',
      ja: 'エンティティの手持ちアイテムを確認',
    },
    category: 'entity',
    parameters: [
      p('material', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
    ],
  },
  {
    name: 'potionEffectType',
    aliases: [],
    description: {
      en: 'Checks if entity has specific potion effect',
      ja: 'エンティティに特定のポーション効果があるか確認',
    },
    category: 'entity',
    parameters: [
      p(
        'type',
        'string',
        { en: 'Potion effect type', ja: 'ポーション効果タイプ' },
        { required: true }
      ),
    ],
  },
  {
    name: 'potionEffectDuration',
    aliases: [],
    description: {
      en: 'Checks potion effect remaining duration',
      ja: 'ポーション効果の残り時間を確認',
    },
    category: 'entity',
    parameters: [
      p(
        'type',
        'string',
        { en: 'Potion effect type', ja: 'ポーション効果タイプ' },
        { required: true }
      ),
      p(
        'duration',
        'number',
        { en: 'Min remaining ticks', ja: '最小残りティック' },
        { required: true }
      ),
    ],
  },
  {
    name: 'velocityDirection',
    aliases: [],
    description: { en: 'Checks movement velocity direction', ja: '移動速度の方向を確認' },
    category: 'compare',
    parameters: [
      p(
        'direction',
        'string',
        { en: 'Direction (UP/DOWN/NORTH/SOUTH/EAST/WEST)', ja: '方向' },
        { required: true }
      ),
    ],
  },
  {
    name: 'speed',
    aliases: [],
    description: { en: 'Checks entity movement speed', ja: 'エンティティの移動速度を確認' },
    category: 'compare',
    parameters: [
      p('amount', 'number', { en: 'Speed threshold', ja: '速度閾値' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '>=' }),
    ],
  },
  {
    name: 'entityCount',
    aliases: [],
    description: {
      en: 'Checks total entity count in world',
      ja: 'ワールドの総エンティティ数を確認',
    },
    category: 'world',
    parameters: [
      p('amount', 'number', { en: 'Entity count', ja: 'エンティティ数' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '<=' }),
    ],
  },
  {
    name: 'mobCount',
    aliases: [],
    description: { en: 'Checks active MythicMobs count', ja: 'アクティブなMythicMobs数を確認' },
    category: 'meta',
    parameters: [
      p('type', 'string', { en: 'Mob type filter', ja: 'モブタイプフィルタ' }),
      p('amount', 'number', { en: 'Count', ja: '数' }, { required: true }),
      p('comparator', 'string', { en: 'Comparator', ja: '比較子' }, { defaultValue: '<=' }),
    ],
  },
  {
    name: 'hasPassenger',
    aliases: [],
    description: { en: 'Checks if entity has a passenger', ja: 'エンティティに乗客がいるか確認' },
    category: 'entity',
    parameters: [],
  },
];

export const PHASE3_CONDITION_REGISTRY: ConditionSchema[] = [
  ...entityStateConditions,
  ...healthConditions,
  ...locationConditions,
  ...inventoryConditions,
  ...variableConditions,
  ...permissionConditions,
  ...timeConditions,
  ...relationshipConditions,
  ...metaConditions,
  ...pluginConditions,
  ...combatConditions,
];
