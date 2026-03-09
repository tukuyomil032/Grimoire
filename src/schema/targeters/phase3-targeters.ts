/**
 * Phase 3: Full MythicMobs targeters coverage.
 * Additional 45+ targeters covering all MythicMobs targeting categories.
 */
import type { TargeterSchema, TargeterParameterSchema } from '@/models/targeter';

function p(
  name: string,
  type: TargeterParameterSchema['type'],
  desc: Record<string, string>,
  opts?: Partial<TargeterParameterSchema>
): TargeterParameterSchema {
  return { name, type, description: desc, required: false, ...opts };
}

// ─── Entity targeters ─────────────────────────────

const entityTargeters: TargeterSchema[] = [
  {
    name: '@MobsInWorld',
    aliases: ['@MIW'],
    description: {
      en: 'Targets all MythicMobs in the world',
      ja: 'ワールド内の全MythicMobsをターゲット',
    },
    category: 'entity',
    parameters: [p('type', 'string', { en: 'Mob type filter', ja: 'モブタイプフィルタ' })],
  },
  {
    name: '@PlayersInWorld',
    aliases: ['@PIW'],
    description: {
      en: 'Targets all players in the world',
      ja: 'ワールド内の全プレイヤーをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@PlayersOnServer',
    aliases: ['@POS'],
    description: {
      en: 'Targets all players on the server',
      ja: 'サーバー上の全プレイヤーをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@EntitiesInWorld',
    aliases: ['@EIW'],
    description: {
      en: 'Targets all entities in the world',
      ja: 'ワールド内の全エンティティをターゲット',
    },
    category: 'entity',
    parameters: [
      p('type', 'string', { en: 'Entity type filter', ja: 'エンティティタイプフィルタ' }),
    ],
  },
  {
    name: '@LivingEntitiesInCone',
    aliases: ['@LEIC', '@EntitiesInCone'],
    description: {
      en: 'Targets living entities in a cone area',
      ja: 'コーンエリア内の生存エンティティをターゲット',
    },
    category: 'entity',
    parameters: [
      p('angle', 'number', { en: 'Cone angle', ja: 'コーン角度' }, { defaultValue: 90 }),
      p('range', 'number', { en: 'Cone range', ja: 'コーン距離' }, { defaultValue: 10 }),
      p('rotation', 'number', { en: 'Rotation offset', ja: '回転オフセット' }, { defaultValue: 0 }),
    ],
  },
  {
    name: '@LivingEntitiesInRing',
    aliases: ['@LEIR', '@Ring'],
    description: {
      en: 'Targets living entities in a ring area',
      ja: 'リングエリア内の生存エンティティをターゲット',
    },
    category: 'entity',
    parameters: [
      p('innerRadius', 'number', { en: 'Inner radius', ja: '内半径' }, { defaultValue: 3 }),
      p('outerRadius', 'number', { en: 'Outer radius', ja: '外半径' }, { defaultValue: 10 }),
    ],
  },
  {
    name: '@RandomThreatTarget',
    aliases: ['@RTT'],
    description: {
      en: 'Targets a random entity from threat table',
      ja: '脅威テーブルからランダムにターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@ThreatTable',
    aliases: ['@TT'],
    description: {
      en: 'Targets all entities in the threat table',
      ja: '脅威テーブル内の全エンティティをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@ThreatTablePlayers',
    aliases: ['@TTP'],
    description: {
      en: 'Targets all players in threat table',
      ja: '脅威テーブル内の全プレイヤーをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@HighestThreat',
    aliases: ['@HT'],
    description: {
      en: 'Targets entity with highest threat',
      ja: '最高脅威のエンティティをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@LowestThreat',
    aliases: ['@LT'],
    description: {
      en: 'Targets entity with lowest threat',
      ja: '最低脅威のエンティティをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@NearestMythicMob',
    aliases: ['@NMM'],
    description: { en: 'Targets nearest MythicMobs mob', ja: '最も近いMythicMobsモブをターゲット' },
    category: 'entity',
    parameters: [
      p('type', 'string', { en: 'Mob type', ja: 'モブタイプ' }),
      p('radius', 'number', { en: 'Search radius', ja: '検索半径' }, { defaultValue: 40 }),
    ],
  },
  {
    name: '@TargetedEntity',
    aliases: [],
    description: {
      en: 'Targets the mobs current attack target',
      ja: 'モブの現在の攻撃ターゲットをターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@Vehicle',
    aliases: [],
    description: {
      en: 'Targets the vehicle the mob is riding',
      ja: 'モブが乗っている乗り物をターゲット',
    },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@Siblings',
    aliases: [],
    description: { en: 'Targets siblings (same parent)', ja: '兄弟（同じ親）をターゲット' },
    category: 'entity',
    parameters: [],
  },
  {
    name: '@NearestStructure',
    aliases: [],
    description: {
      en: 'Targets location of nearest structure',
      ja: '最も近い構造物の位置をターゲット',
    },
    category: 'location',
    parameters: [
      p('type', 'string', { en: 'Structure type', ja: '構造物タイプ' }),
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 100 }),
    ],
  },
];

// ─── Location targeters ───────────────────────────

const locationTargeters: TargeterSchema[] = [
  {
    name: '@SelfLocation',
    aliases: ['@casterLocation'],
    description: { en: 'Targets caster location', ja: 'キャスターの位置をターゲット' },
    category: 'location',
    parameters: [],
  },
  {
    name: '@TargetLocation',
    aliases: [],
    description: {
      en: 'Targets the targets current location',
      ja: 'ターゲットの現在の位置をターゲット',
    },
    category: 'location',
    parameters: [],
  },
  {
    name: '@TriggerLocation',
    aliases: [],
    description: { en: 'Targets the trigger location', ja: 'トリガーの位置をターゲット' },
    category: 'location',
    parameters: [],
  },
  {
    name: '@Location',
    aliases: [],
    description: { en: 'Targets a specific coordinate', ja: '特定の座標をターゲット' },
    category: 'location',
    parameters: [
      p('x', 'number', { en: 'X coordinate', ja: 'X座標' }, { required: true }),
      p('y', 'number', { en: 'Y coordinate', ja: 'Y座標' }, { required: true }),
      p('z', 'number', { en: 'Z coordinate', ja: 'Z座標' }, { required: true }),
      p('world', 'string', { en: 'World name', ja: 'ワールド名' }),
    ],
  },
  {
    name: '@ForwardWall',
    aliases: [],
    description: {
      en: 'Targets the first wall in front of caster',
      ja: 'キャスター前方の最初の壁をターゲット',
    },
    category: 'location',
    parameters: [
      p('maxDistance', 'number', { en: 'Max distance', ja: '最大距離' }, { defaultValue: 10 }),
    ],
  },
  {
    name: '@Floor',
    aliases: [],
    description: { en: 'Targets the floor below target', ja: 'ターゲット下の床をターゲット' },
    category: 'location',
    parameters: [],
  },
  {
    name: '@Ceiling',
    aliases: [],
    description: { en: 'Targets the ceiling above target', ja: 'ターゲット上の天井をターゲット' },
    category: 'location',
    parameters: [],
  },
  {
    name: '@RandomLocation',
    aliases: ['@RL'],
    description: {
      en: 'Targets a random location near caster',
      ja: 'キャスター近くのランダムな位置をターゲット',
    },
    category: 'location',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
      p('minRadius', 'number', { en: 'Minimum radius', ja: '最小半径' }, { defaultValue: 0 }),
      p('yRadius', 'number', { en: 'Y radius', ja: 'Y半径' }),
    ],
  },
  {
    name: '@RandomLocationOnCircle',
    aliases: ['@RLOC'],
    description: {
      en: 'Targets random location on a circle',
      ja: '円上のランダムな位置をターゲット',
    },
    category: 'location',
    parameters: [
      p('radius', 'number', { en: 'Circle radius', ja: '円半径' }, { defaultValue: 5 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 1 }),
    ],
  },
  {
    name: '@CasterSpawnLocation',
    aliases: ['@CSL'],
    description: {
      en: 'Targets caster spawn location',
      ja: 'キャスターのスポーン位置をターゲット',
    },
    category: 'location',
    parameters: [],
  },
  {
    name: '@ObstructingBlock',
    aliases: [],
    description: {
      en: 'Targets the block obstructing caster line of sight',
      ja: 'キャスターの視線を遮るブロックをターゲット',
    },
    category: 'location',
    parameters: [],
  },
  {
    name: '@Line',
    aliases: [],
    description: {
      en: 'Targets points along a line to target',
      ja: 'ターゲットへのライン上のポイントをターゲット',
    },
    category: 'location',
    parameters: [
      p(
        'distanceBetween',
        'number',
        { en: 'Distance between points', ja: 'ポイント間距離' },
        { defaultValue: 1 }
      ),
      p(
        'maxDistance',
        'number',
        { en: 'Max line distance', ja: '最大ライン距離' },
        { defaultValue: 10 }
      ),
    ],
  },
  {
    name: '@Cone',
    aliases: [],
    description: { en: 'Targets locations in a cone shape', ja: 'コーン形状の位置をターゲット' },
    category: 'location',
    parameters: [
      p('angle', 'number', { en: 'Cone angle', ja: 'コーン角度' }, { defaultValue: 90 }),
      p('range', 'number', { en: 'Cone range', ja: 'コーン距離' }, { defaultValue: 10 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 10 }),
      p('rotation', 'number', { en: 'Rotation offset', ja: '回転オフセット' }, { defaultValue: 0 }),
    ],
  },
  {
    name: '@PointsAroundTarget',
    aliases: ['@PAT'],
    description: {
      en: 'Targets points in a ring around target',
      ja: 'ターゲット周囲のリング上のポイントをターゲット',
    },
    category: 'location',
    parameters: [
      p('radius', 'number', { en: 'Ring radius', ja: 'リング半径' }, { defaultValue: 5 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 8 }),
      p('yOffset', 'number', { en: 'Y offset', ja: 'Yオフセット' }, { defaultValue: 0 }),
    ],
  },
];

// ─── Special / advanced targeters ─────────────────

const specialTargeters: TargeterSchema[] = [
  {
    name: '@Origin',
    aliases: [],
    description: { en: 'Targets the skill origin location', ja: 'スキルの起点位置をターゲット' },
    category: 'special',
    parameters: [],
  },
  {
    name: '@Forward',
    aliases: [],
    description: {
      en: 'Targets a location in front of caster',
      ja: 'キャスター前方の位置をターゲット',
    },
    category: 'special',
    parameters: [
      p('distance', 'number', { en: 'Forward distance', ja: '前方距離' }, { defaultValue: 5 }),
      p('yOffset', 'number', { en: 'Y offset', ja: 'Yオフセット' }, { defaultValue: 0 }),
    ],
  },
  {
    name: '@RingAroundOrigin',
    aliases: ['@RAO'],
    description: {
      en: 'Targets ring of points around origin',
      ja: '起点周囲のリングポイントをターゲット',
    },
    category: 'special',
    parameters: [
      p('radius', 'number', { en: 'Ring radius', ja: 'リング半径' }, { defaultValue: 5 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 12 }),
    ],
  },
  {
    name: '@SpherePoints',
    aliases: [],
    description: { en: 'Targets points on a sphere surface', ja: '球体表面のポイントをターゲット' },
    category: 'special',
    parameters: [
      p('radius', 'number', { en: 'Sphere radius', ja: '球体半径' }, { defaultValue: 5 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 20 }),
    ],
  },
  {
    name: '@ProjectileLocation',
    aliases: ['@PL'],
    description: {
      en: 'Targets the projectile current location',
      ja: 'プロジェクタイルの現在位置をターゲット',
    },
    category: 'special',
    parameters: [],
  },
  {
    name: '@OrbitalLocation',
    aliases: ['@OL'],
    description: {
      en: 'Targets the orbital current location',
      ja: 'オービタルの現在位置をターゲット',
    },
    category: 'special',
    parameters: [],
  },
  {
    name: '@CrosshairLocation',
    aliases: [],
    description: {
      en: 'Targets where the player is looking',
      ja: 'プレイヤーが見ている位置をターゲット',
    },
    category: 'special',
    parameters: [
      p('maxDistance', 'number', { en: 'Max distance', ja: '最大距離' }, { defaultValue: 40 }),
    ],
  },
  {
    name: '@BlocksNearOrigin',
    aliases: ['@BNO'],
    description: { en: 'Targets all blocks near origin', ja: '起点付近の全ブロックをターゲット' },
    category: 'special',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
      p('material', 'material', { en: 'Block material filter', ja: 'ブロック素材フィルタ' }),
    ],
  },
  {
    name: '@VariableLocation',
    aliases: ['@VL'],
    description: {
      en: 'Targets a location stored in a variable',
      ja: '変数に格納された位置をターゲット',
    },
    category: 'special',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: '@NearestSurfacePoint',
    aliases: ['@NSP'],
    description: {
      en: 'Targets the nearest surface point',
      ja: '最も近い地表のポイントをターゲット',
    },
    category: 'location',
    parameters: [
      p(
        'maxSearchDistance',
        'number',
        { en: 'Max search distance', ja: '最大検索距離' },
        { defaultValue: 10 }
      ),
    ],
  },
  {
    name: '@RLNTE',
    aliases: ['@RandomLocationNearTargetEntity'],
    description: {
      en: 'Targets random location near target entity',
      ja: 'ターゲットエンティティ付近のランダム位置をターゲット',
    },
    category: 'location',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
      p('minRadius', 'number', { en: 'Minimum radius', ja: '最小半径' }, { defaultValue: 0 }),
    ],
  },
  {
    name: '@LivingNearTargetLocation',
    aliases: ['@LNTL'],
    description: {
      en: 'Targets living entities near target location',
      ja: 'ターゲット位置付近の生存エンティティをターゲット',
    },
    category: 'entity',
    parameters: [p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 })],
  },
  {
    name: '@EntitiesNearTargetLocation',
    aliases: ['@ENTL'],
    description: {
      en: 'Targets all entities near target location',
      ja: 'ターゲット位置付近の全エンティティをターゲット',
    },
    category: 'entity',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
      p('type', 'string', { en: 'Entity type', ja: 'エンティティタイプ' }),
    ],
  },
  {
    name: '@PlayersNearTargetLocation',
    aliases: ['@PNTL'],
    description: {
      en: 'Targets all players near target location',
      ja: 'ターゲット位置付近の全プレイヤーをターゲット',
    },
    category: 'entity',
    parameters: [p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 })],
  },
  {
    name: '@RLNO',
    aliases: ['@RandomLocationNearOrigin'],
    description: {
      en: 'Targets random location near origin',
      ja: '起点付近のランダム位置をターゲット',
    },
    category: 'location',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
      p('minRadius', 'number', { en: 'Min radius', ja: '最小半径' }, { defaultValue: 0 }),
    ],
  },
  {
    name: '@Spawner',
    aliases: [],
    description: {
      en: 'Targets the mob spawner location',
      ja: 'モブスポナーの位置をターゲット',
    },
    category: 'location',
    parameters: [],
  },
];

export const PHASE3_TARGETER_REGISTRY: TargeterSchema[] = [
  ...entityTargeters,
  ...locationTargeters,
  ...specialTargeters,
];
