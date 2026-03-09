import type { ConditionSchema } from '@/models/condition';

/**
 * Extended conditions registry — supplements core-conditions.ts.
 */
export const EXTENDED_CONDITION_REGISTRY: ConditionSchema[] = [
  // --- Entity checks ---
  {
    name: 'wearing',
    aliases: [],
    description: {
      en: 'Checks if target wears a specific item',
      ja: 'ターゲットが特定のアイテムを着用しているか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'material',
        type: 'string',
        description: { en: 'Material name', ja: '素材名' },
        required: true,
      },
      {
        name: 'slot',
        type: 'string',
        description: { en: 'Slot (HELMET/CHEST/LEGS/FEET)', ja: 'スロット' },
      },
    ],
  },
  {
    name: 'holding',
    aliases: [],
    description: {
      en: 'Checks if target is holding a specific item',
      ja: 'ターゲットが特定のアイテムを持っているか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'material',
        type: 'string',
        description: { en: 'Material name', ja: '素材名' },
        required: true,
      },
    ],
  },
  {
    name: 'entityType',
    aliases: ['mobtype'],
    description: { en: 'Checks the entity type', ja: 'エンティティタイプを判定' },
    category: 'entity',
    parameters: [
      {
        name: 'type',
        type: 'string',
        description: { en: 'Entity type', ja: 'エンティティタイプ' },
        required: true,
      },
    ],
  },
  {
    name: 'faction',
    aliases: [],
    description: {
      en: 'Checks if entity belongs to faction',
      ja: 'エンティティが陣営に所属しているか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'faction',
        type: 'string',
        description: { en: 'Faction name', ja: '陣営名' },
        required: true,
      },
    ],
  },
  {
    name: 'hasTag',
    aliases: [],
    description: {
      en: 'Checks if entity has a scoreboard tag',
      ja: 'エンティティにスコアボードタグがあるか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'tag',
        type: 'string',
        description: { en: 'Tag name', ja: 'タグ名' },
        required: true,
      },
    ],
  },
  {
    name: 'crouching',
    aliases: ['sneaking'],
    description: { en: 'Checks if target is crouching', ja: 'ターゲットがしゃがんでいるか判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'mounted',
    aliases: [],
    description: { en: 'Checks if target is riding an entity', ja: 'ターゲットが騎乗中か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'moving',
    aliases: [],
    description: { en: 'Checks if target is moving', ja: 'ターゲットが移動中か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'gliding',
    aliases: [],
    description: {
      en: 'Checks if target is gliding with elytra',
      ja: 'ターゲットがエリトラで滑空中か判定',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'swimming',
    aliases: [],
    description: { en: 'Checks if target is swimming', ja: 'ターゲットが泳いでいるか判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'sprinting',
    aliases: [],
    description: { en: 'Checks if target is sprinting', ja: 'ターゲットがダッシュ中か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'flying',
    aliases: [],
    description: { en: 'Checks if target is flying', ja: 'ターゲットが飛行中か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasPermission',
    aliases: [],
    description: {
      en: 'Checks if player has a permission',
      ja: 'プレイヤーが権限を持っているか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'permission',
        type: 'string',
        description: { en: 'Permission node', ja: '権限ノード' },
        required: true,
      },
    ],
  },
  {
    name: 'hasInventorySpace',
    aliases: [],
    description: {
      en: 'Checks if target has inventory space',
      ja: 'ターゲットにインベントリ空きがあるか判定',
    },
    category: 'entity',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Empty slots needed', ja: '必要な空きスロット数' },
        defaultValue: 1,
      },
    ],
  },

  // --- Position / Location checks ---
  {
    name: 'lineOfSight',
    aliases: ['los'],
    description: { en: 'Checks line of sight to target', ja: 'ターゲットへの視線がを判定' },
    category: 'position',
    parameters: [],
  },
  {
    name: 'altitude',
    aliases: [],
    description: { en: 'Checks blocks above ground', ja: '地面からのブロック高度を判定' },
    category: 'position',
    parameters: [
      {
        name: 'height',
        type: 'number',
        description: { en: 'Min altitude', ja: '最小高度' },
        required: true,
      },
    ],
  },
  {
    name: 'onBlock',
    aliases: [],
    description: {
      en: 'Checks if standing on a specific block',
      ja: '特定のブロックの上に立っているか判定',
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
    name: 'lightLevel',
    aliases: [],
    description: { en: 'Checks the light level at target', ja: 'ターゲット位置の明るさを判定' },
    category: 'position',
    parameters: [
      {
        name: 'level',
        type: 'number',
        description: { en: 'Min light level', ja: '最小明るさ' },
        required: true,
      },
    ],
  },
  {
    name: 'inRegion',
    aliases: [],
    description: { en: 'Checks if in a WorldGuard region', ja: 'WorldGuardリージョン内か判定' },
    category: 'position',
    parameters: [
      {
        name: 'region',
        type: 'string',
        description: { en: 'Region name', ja: 'リージョン名' },
        required: true,
      },
    ],
  },
  {
    name: 'nearClaim',
    aliases: [],
    description: { en: 'Checks if near a land claim', ja: '土地クレーム付近か判定' },
    category: 'position',
    parameters: [
      {
        name: 'distance',
        type: 'number',
        description: { en: 'Distance', ja: '距離' },
        defaultValue: 10,
      },
    ],
  },
  {
    name: 'outside',
    aliases: [],
    description: {
      en: 'Checks if target is outdoors (sky visible)',
      ja: 'ターゲットが屋外か（空が見える）判定',
    },
    category: 'position',
    parameters: [],
  },

  // --- Variable / score checks ---
  {
    name: 'stringEquals',
    aliases: [],
    description: {
      en: 'Checks if a string variable equals a value',
      ja: '文字列変数が値と等しいか判定',
    },
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
        description: { en: 'Expected string', ja: '期待する文字列' },
        required: true,
      },
    ],
  },
  {
    name: 'variableIsSet',
    aliases: [],
    description: { en: 'Checks if a variable is defined', ja: '変数が定義されているか判定' },
    category: 'variable',
    parameters: [
      {
        name: 'variable',
        type: 'string',
        description: { en: 'Variable name', ja: '変数名' },
        required: true,
      },
    ],
  },

  // --- World checks ---
  {
    name: 'playersOnline',
    aliases: [],
    description: { en: 'Checks number of players online', ja: 'オンラインプレイヤー数を判定' },
    category: 'world',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Minimum players', ja: '最小プレイヤー数' },
        required: true,
      },
    ],
  },
  {
    name: 'thundering',
    aliases: [],
    description: { en: 'Checks if it is thundering', ja: '雷雨かを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'raining',
    aliases: [],
    description: { en: 'Checks if it is raining', ja: '雨が降っているかを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'dawn',
    aliases: [],
    description: { en: 'Checks if it is dawn', ja: '夜明けかを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'dusk',
    aliases: [],
    description: { en: 'Checks if it is dusk', ja: '夕暮れかを判定' },
    category: 'world',
    parameters: [],
  },
  {
    name: 'lunarPhase',
    aliases: [],
    description: { en: 'Checks the lunar phase (0-7)', ja: '月齢（0-7）を判定' },
    category: 'world',
    parameters: [
      {
        name: 'phase',
        type: 'number',
        description: { en: 'Phase number', ja: '月齢番号' },
        required: true,
      },
    ],
  },
  {
    name: 'worldTime',
    aliases: [],
    description: { en: 'Checks world time in ticks', ja: 'ワールド時間（ティック）を判定' },
    category: 'world',
    parameters: [
      {
        name: 'time',
        type: 'number',
        description: { en: 'Time in ticks', ja: 'ティック時間' },
        required: true,
      },
    ],
  },

  // --- Owner / relationship ---
  {
    name: 'owner',
    aliases: ['isOwner'],
    description: {
      en: 'Checks if target is the mob owner',
      ja: 'ターゲットがモブのオーナーか判定',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'sameFaction',
    aliases: [],
    description: { en: 'Checks if same faction as target', ja: 'ターゲットと同じ陣営か判定' },
    category: 'entity',
    parameters: [],
  },

  // --- Other checks ---
  {
    name: 'hasGravity',
    aliases: [],
    description: { en: 'Checks if entity has gravity', ja: 'エンティティに重力があるか判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isFrozen',
    aliases: [],
    description: { en: 'Checks if entity is frozen', ja: 'エンティティが凍結しているか判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isBaby',
    aliases: [],
    description: { en: 'Checks if entity is a baby', ja: 'エンティティが子供か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'isLiving',
    aliases: [],
    description: { en: 'Checks if entity is a living entity', ja: 'エンティティが生物か判定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'hasPotionEffect',
    aliases: [],
    description: { en: 'Checks if has a potion effect', ja: 'ポーション効果があるか判定' },
    category: 'entity',
    parameters: [
      {
        name: 'type',
        type: 'string',
        description: { en: 'Potion effect type', ja: 'ポーション効果タイプ' },
        required: true,
      },
    ],
  },
];
