export interface TargeterSchema {
  name: string;
  aliases: string[];
  description: Record<string, string>;
  parameters: TargeterParameter[];
  category: TargeterCategory;
}

export interface TargeterParameter {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'material';
  description: Record<string, string>;
  defaultValue?: string | number | boolean;
  required?: boolean;
}

/** Alias for TargeterParameter */
export type TargeterParameterSchema = TargeterParameter;

export type TargeterCategory = 'entity' | 'location' | 'special';

export const CORE_TARGETERS: TargeterSchema[] = [
  {
    name: '@self',
    aliases: ['@caster'],
    description: { en: 'Targets the mob itself', ja: 'モブ自身をターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@target',
    aliases: ['@t'],
    description: { en: 'Targets the mobs current target', ja: 'モブの現在のターゲット' },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@trigger',
    aliases: [],
    description: {
      en: 'Targets the entity that triggered the skill',
      ja: 'スキルをトリガーしたエンティティ',
    },
    parameters: [],
    category: 'entity',
  },
  {
    name: '@NearestPlayer',
    aliases: ['@NP'],
    description: { en: 'Targets the nearest player', ja: '最寄りのプレイヤー' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Search radius', ja: '検索半径' },
        defaultValue: 25,
      },
    ],
    category: 'entity',
  },
  {
    name: '@PlayersInRadius',
    aliases: ['@PIR'],
    description: { en: 'Targets all players within radius', ja: '半径内の全プレイヤー' },
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
    name: '@MobsInRadius',
    aliases: ['@MIR'],
    description: { en: 'Targets all mobs within radius', ja: '半径内の全モブ' },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Radius', ja: '半径' },
        defaultValue: 5,
      },
      {
        name: 'type',
        type: 'string',
        description: { en: 'Mob type filter', ja: 'モブタイプフィルター' },
      },
    ],
    category: 'entity',
  },
  {
    name: '@EntitiesInRadius',
    aliases: ['@EIR'],
    description: { en: 'Targets all entities within radius', ja: '半径内の全エンティティ' },
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
    name: '@LivingInRadius',
    aliases: ['@LIR'],
    description: { en: 'Targets all living entities in radius', ja: '半径内の全生物' },
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
    name: '@SelfLocation',
    aliases: ['@SL'],
    description: { en: 'Targets the location of the mob', ja: 'モブの位置をターゲット' },
    parameters: [],
    category: 'location',
  },
  {
    name: '@TargetLocation',
    aliases: ['@TL'],
    description: { en: 'Targets the location of the mobs target', ja: 'ターゲットの位置' },
    parameters: [],
    category: 'location',
  },
  {
    name: '@TriggerLocation',
    aliases: [],
    description: {
      en: 'Targets the location of the trigger entity',
      ja: 'トリガーエンティティの位置',
    },
    parameters: [],
    category: 'location',
  },
  {
    name: '@Forward',
    aliases: [],
    description: { en: 'Targets a location forward from the caster', ja: 'キャスターの前方の位置' },
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Forward distance', ja: '前方距離' },
        defaultValue: 3,
      },
    ],
    category: 'location',
  },
  {
    name: '@Origin',
    aliases: [],
    description: { en: 'Targets the skill origin location', ja: 'スキルのオリジン位置' },
    parameters: [],
    category: 'special',
  },
  {
    name: '@Location',
    aliases: [],
    description: { en: 'Targets a specific location', ja: '特定の位置をターゲット' },
    parameters: [
      {
        name: 'coordinates',
        type: 'string',
        description: { en: 'x,y,z coordinates', ja: 'x,y,z座標' },
        required: true,
      },
    ],
    category: 'location',
  },
  {
    name: '@RandomLocationsNearOrigin',
    aliases: ['@RLO'],
    description: { en: 'Random locations near origin', ja: 'オリジン付近のランダム位置' },
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Number of locations', ja: '位置の数' },
        defaultValue: 10,
      },
      {
        name: 'xRadius',
        type: 'number',
        description: { en: 'X radius', ja: 'X半径' },
        defaultValue: 5,
      },
      {
        name: 'yRadius',
        type: 'number',
        description: { en: 'Y radius', ja: 'Y半径' },
        defaultValue: 5,
      },
      {
        name: 'zRadius',
        type: 'number',
        description: { en: 'Z radius', ja: 'Z半径' },
        defaultValue: 5,
      },
    ],
    category: 'location',
  },
  {
    name: '@Line',
    aliases: [],
    description: {
      en: 'Targets locations in a line from origin to target',
      ja: 'オリジンからターゲットへの直線上の位置',
    },
    parameters: [
      {
        name: 'distanceBetween',
        type: 'number',
        description: { en: 'Distance between each point', ja: '各ポイント間の距離' },
        defaultValue: 1,
      },
    ],
    category: 'location',
  },
  {
    name: '@Cone',
    aliases: [],
    description: { en: 'Targets entities in a cone', ja: '円錐内のエンティティ' },
    parameters: [
      {
        name: 'angle',
        type: 'number',
        description: { en: 'Cone angle', ja: '円錐の角度' },
        defaultValue: 90,
      },
      { name: 'range', type: 'number', description: { en: 'Range', ja: '範囲' }, defaultValue: 10 },
      {
        name: 'rotation',
        type: 'number',
        description: { en: 'Rotation offset', ja: '回転オフセット' },
        defaultValue: 0,
      },
    ],
    category: 'entity',
  },
  {
    name: '@Ring',
    aliases: [],
    description: {
      en: 'Targets locations in a ring around origin',
      ja: 'オリジン周囲のリング上の位置',
    },
    parameters: [
      {
        name: 'radius',
        type: 'number',
        description: { en: 'Ring radius', ja: 'リングの半径' },
        defaultValue: 5,
      },
      {
        name: 'points',
        type: 'number',
        description: { en: 'Number of points', ja: 'ポイント数' },
        defaultValue: 12,
      },
    ],
    category: 'location',
  },
  {
    name: '@RLNT',
    aliases: ['@RandomLocationNearTarget'],
    description: { en: 'Random location near target', ja: 'ターゲット付近のランダム位置' },
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: { en: 'Number of locations', ja: '位置の数' },
        defaultValue: 1,
      },
      {
        name: 'minRadius',
        type: 'number',
        description: { en: 'Minimum radius', ja: '最小半径' },
        defaultValue: 0,
      },
      {
        name: 'maxRadius',
        type: 'number',
        description: { en: 'Maximum radius', ja: '最大半径' },
        defaultValue: 5,
      },
    ],
    category: 'location',
  },
  {
    name: '@None',
    aliases: [],
    description: {
      en: 'No target (for mechanics that dont need one)',
      ja: 'ターゲットなし（不要なメカニクス用）',
    },
    parameters: [],
    category: 'special',
  },
];
