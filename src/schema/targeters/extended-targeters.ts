import type { TargeterSchema } from '@/models/targeter';

/**
 * Extended targeters registry — supplements CORE_TARGETERS.
 */
export const EXTENDED_TARGETERS: TargeterSchema[] = [
  {
    name: '@Owner',
    aliases: [],
    description: { en: 'Targets the mob owner', ja: 'モブのオーナーをターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Parent',
    aliases: [],
    description: { en: 'Targets the mob parent (summoner)', ja: 'モブの親（召喚者）をターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Children',
    aliases: [],
    description: { en: 'Targets all child mobs', ja: '全ての子モブをターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@SpawnLocation',
    aliases: ['@Spawn'],
    description: { en: 'Targets the mob spawn location', ja: 'モブのスポーン位置をターゲット' },
    parameters: [],
    category: 'location',
  },
  {
    name: '@NearestEntity',
    aliases: ['@NE'],
    description: { en: 'Targets the nearest entity', ja: '最寄りのエンティティをターゲット' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Search radius', ja: '検索半径' },
        defaultValue: 16,
      },
    ],
    category: 'entity',
  },
  {
    name: '@PlayersNearOrigin',
    aliases: ['@PNO'],
    description: {
      en: 'Targets players near skill origin',
      ja: 'スキルオリジン付近のプレイヤーをターゲット',
    },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
    ],
    category: 'entity',
  },
  {
    name: '@MobsNearOrigin',
    aliases: ['@MNO'],
    description: {
      en: 'Targets mobs near skill origin',
      ja: 'スキルオリジン付近のモブをターゲット',
    },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
    ],
    category: 'entity',
  },
  {
    name: '@LivingNearOrigin',
    aliases: ['@LNO'],
    description: {
      en: 'Targets living entities near origin',
      ja: 'オリジン付近の生物をターゲット',
    },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
    ],
    category: 'entity',
  },
  {
    name: '@WolfOwner',
    aliases: [],
    description: { en: 'Targets the wolf owner', ja: 'オオカミのオーナーをターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Mount',
    aliases: [],
    description: {
      en: 'Targets the entity the mob is riding',
      ja: 'モブが騎乗しているエンティティをターゲット',
    },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Passenger',
    aliases: [],
    description: {
      en: 'Targets entities riding the mob',
      ja: 'モブに騎乗しているエンティティをターゲット',
    },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Dad',
    aliases: [],
    description: {
      en: 'Targets the mobs father (from breeding)',
      ja: 'モブの父親（繁殖由来）をターゲット',
    },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Mom',
    aliases: [],
    description: {
      en: 'Targets the mobs mother (from breeding)',
      ja: 'モブの母親（繁殖由来）をターゲット',
    },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@Sphere',
    aliases: [],
    description: { en: 'Targets locations in a sphere', ja: '球体内の位置をターゲット' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Sphere radius', ja: '球体半径' },
        defaultValue: 5,
      },
      {
        name: 'points',
        type: 'number',
        description: { en: 'Number of points', ja: 'ポイント数' },
        defaultValue: 32,
      },
    ],
    category: 'location',
  },
  {
    name: '@Rectangle',
    aliases: ['@Cuboid'],
    description: { en: 'Targets locations in a rectangle', ja: '長方形内の位置をターゲット' },
    parameters: [
      {
        name: 'xRadius',
        type: 'number',
        description: { en: 'X radius', ja: 'X半径' },
        defaultValue: 3,
      },
      {
        name: 'yRadius',
        type: 'number',
        description: { en: 'Y radius', ja: 'Y半径' },
        defaultValue: 3,
      },
      {
        name: 'zRadius',
        type: 'number',
        description: { en: 'Z radius', ja: 'Z半径' },
        defaultValue: 3,
      },
    ],
    category: 'location',
  },
  {
    name: '@EyeDirection',
    aliases: [],
    description: {
      en: 'Targets a location in the casters eye direction',
      ja: 'キャスターの視線方向の位置をターゲット',
    },
    parameters: [
      {
        name: 'distance',
        type: 'number',
        description: { en: 'Distance', ja: '距離' },
        defaultValue: 5,
      },
    ],
    category: 'location',
  },
  {
    name: '@ProjectileForward',
    aliases: [],
    description: {
      en: 'Targets forward from a projectile',
      ja: 'プロジェクタイルの前方をターゲット',
    },
    parameters: [
      {
        name: 'distance',
        type: 'number',
        description: { en: 'Distance', ja: '距離' },
        defaultValue: 1,
      },
    ],
    category: 'location',
  },
  {
    name: '@BlocksInRadius',
    aliases: ['@BIR'],
    description: { en: 'Targets all blocks in radius', ja: '半径内の全ブロックをターゲット' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 3,
      },
      {
        name: 'material',
        type: 'string',
        description: { en: 'Filter by material', ja: '素材でフィルタ' },
      },
    ],
    category: 'location',
  },
  {
    name: '@BlocksInChunk',
    aliases: [],
    description: {
      en: 'Targets all blocks in the chunk',
      ja: 'チャンク内の全ブロックをターゲット',
    },
    parameters: [
      {
        name: 'material',
        type: 'string',
        description: { en: 'Material filter', ja: '素材フィルタ' },
      },
    ],
    category: 'location',
  },
  {
    name: '@Floorline',
    aliases: [],
    description: {
      en: 'Line from origin projected onto ground',
      ja: 'オリジンから地面に投影されたライン',
    },
    parameters: [
      {
        name: 'length',
        type: 'number',
        description: { en: 'Line length', ja: 'ライン長さ' },
        defaultValue: 10,
      },
      {
        name: 'distanceBetween',
        type: 'number',
        description: { en: 'Point spacing', ja: 'ポイント間隔' },
        defaultValue: 1,
      },
    ],
    category: 'location',
  },
  {
    name: '@PlayerLocationsInRadius',
    aliases: ['@PLIR'],
    description: { en: 'Locations of all players in radius', ja: '半径内の全プレイヤーの位置' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 10,
      },
    ],
    category: 'location',
  },
  {
    name: '@TrackedLocation',
    aliases: [],
    description: { en: 'A previously tracked location', ja: '以前追跡された位置' },
    parameters: [],
    category: 'special',
  },
  {
    name: '@Marker',
    aliases: [],
    description: {
      en: 'Targets entities with a specific marker',
      ja: '特定のマーカーを持つエンティティをターゲット',
    },
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: { en: 'Marker name', ja: 'マーカー名' },
        required: true,
      },
    ],
    category: 'special',
  },
  {
    name: '@UniqueUUID',
    aliases: ['@UUID'],
    description: { en: 'Targets entity by UUID', ja: 'UUIDでエンティティをターゲット' },
    parameters: [
      {
        name: 'uuid',
        type: 'string',
        description: { en: 'Entity UUID', ja: 'エンティティUUID' },
        required: true,
      },
    ],
    category: 'special',
  },
];
