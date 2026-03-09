import type { MechanicSchema, ParameterSchema } from '@/models/mechanic';

function param(
  name: string,
  type: ParameterSchema['type'],
  desc: Record<string, string>,
  opts?: Partial<ParameterSchema>
): ParameterSchema {
  return { name, type, description: desc, required: false, ...opts };
}

// --- Additional damage mechanics ---
const damageExtended: MechanicSchema[] = [
  {
    name: 'baseDamage',
    aliases: ['bd'],
    description: {
      en: 'Deals base damage (ignores enchants/potions)',
      ja: '基礎ダメージ（エンチャント/ポーション無視）',
    },
    category: 'damage',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Damage amount', ja: 'ダメージ量' },
        { defaultValue: 1, required: true }
      ),
      param(
        'ignoreArmor',
        'boolean',
        { en: 'Ignore armor', ja: '防具無視' },
        { defaultValue: false }
      ),
    ],
  },
  {
    name: 'percentDamage',
    aliases: ['pd'],
    description: { en: 'Deals percent of current health as damage', ja: '現在HPの割合ダメージ' },
    category: 'damage',
    parameters: [
      param(
        'percent',
        'number',
        { en: 'Percentage', ja: '割合' },
        { defaultValue: 10, required: true }
      ),
    ],
  },
  {
    name: 'shield',
    aliases: [],
    description: { en: 'Gives target absorption hearts', ja: 'ターゲットに吸収ハートを付与' },
    category: 'healing',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Shield amount', ja: 'シールド量' },
        { defaultValue: 5, required: true }
      ),
      param(
        'maxShield',
        'number',
        { en: 'Max absorption', ja: '最大吸収量' },
        { defaultValue: 20 }
      ),
    ],
  },
  {
    name: 'healPercent',
    aliases: ['hp'],
    description: { en: 'Heals a percentage of max health', ja: '最大HPの割合で回復' },
    category: 'healing',
    parameters: [
      param(
        'percent',
        'number',
        { en: 'Health percentage to heal', ja: '回復HP割合' },
        { defaultValue: 10, required: true }
      ),
    ],
  },
  {
    name: 'setHealth',
    aliases: [],
    description: { en: 'Sets the target health to a value', ja: 'ターゲットのHPを設定' },
    category: 'healing',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Health value', ja: 'HP値' },
        { defaultValue: 20, required: true }
      ),
    ],
  },
  {
    name: 'setMaxHealth',
    aliases: [],
    description: { en: 'Sets the target max health', ja: 'ターゲットの最大HPを設定' },
    category: 'healing',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Max health', ja: '最大HP' },
        { defaultValue: 20, required: true }
      ),
    ],
  },
];

// --- Additional movement mechanics ---
const movementExtended: MechanicSchema[] = [
  {
    name: 'teleportTo',
    aliases: ['tpTo'],
    description: {
      en: 'Teleports target to a specific location',
      ja: 'ターゲットを指定位置にテレポート',
    },
    category: 'movement',
    parameters: [
      param(
        'location',
        'string',
        { en: 'Target location (world,x,y,z)', ja: '目標位置（world,x,y,z）' },
        { required: true }
      ),
    ],
  },
  {
    name: 'jump',
    aliases: [],
    description: { en: 'Makes the caster jump', ja: 'キャスターをジャンプさせる' },
    category: 'movement',
    parameters: [
      param(
        'velocity',
        'number',
        { en: 'Jump velocity', ja: 'ジャンプ速度' },
        { defaultValue: 0.5 }
      ),
    ],
  },
  {
    name: 'disengage',
    aliases: [],
    description: { en: 'Leaps backward away from target', ja: 'ターゲットから後方に跳躍' },
    category: 'movement',
    parameters: [
      param('velocity', 'number', { en: 'Leap velocity', ja: '跳躍速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'setSpeed',
    aliases: [],
    description: { en: 'Sets the movement speed of the target', ja: 'ターゲットの移動速度を設定' },
    category: 'movement',
    parameters: [
      param(
        'speed',
        'number',
        { en: 'Speed value', ja: '速度値' },
        { defaultValue: 0.2, required: true }
      ),
    ],
  },
  {
    name: 'setGravity',
    aliases: [],
    description: {
      en: 'Enables/disables gravity for the target',
      ja: 'ターゲットの重力を有効/無効',
    },
    category: 'movement',
    parameters: [
      param(
        'gravity',
        'boolean',
        { en: 'Gravity enabled', ja: '重力有効' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'spring',
    aliases: [],
    description: {
      en: 'Pulls the target with a spring-like force',
      ja: 'バネのような力でターゲットを引く',
    },
    category: 'movement',
    parameters: [
      param('velocity', 'number', { en: 'Spring velocity', ja: 'バネ速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'rally',
    aliases: [],
    description: {
      en: 'Causes nearby mobs to move to the caster',
      ja: '付近のモブをキャスターに集合させる',
    },
    category: 'movement',
    parameters: [
      param('radius', 'number', { en: 'Rally radius', ja: '集合半径' }, { defaultValue: 20 }),
      param('vRadius', 'number', { en: 'Vertical radius', ja: '垂直半径' }, { defaultValue: 10 }),
    ],
  },
];

// --- Particle / visual mechanics ---
const particleMechanics: MechanicSchema[] = [
  {
    name: 'particleLine',
    aliases: ['pLine'],
    description: {
      en: 'Creates a line of particles from origin to target',
      ja: 'オリジンからターゲットへのパーティクルライン',
    },
    category: 'particle',
    parameters: [
      param(
        'particle',
        'string',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { defaultValue: 'FLAME' }
      ),
      param(
        'amount',
        'number',
        { en: 'Particles per point', ja: 'ポイント毎のパーティクル数' },
        { defaultValue: 1 }
      ),
      param(
        'distanceBetween',
        'number',
        { en: 'Distance between points', ja: 'ポイント間距離' },
        { defaultValue: 0.25 }
      ),
    ],
  },
  {
    name: 'particleRing',
    aliases: ['pRing'],
    description: { en: 'Creates a ring of particles', ja: 'パーティクルリングを生成' },
    category: 'particle',
    parameters: [
      param(
        'particle',
        'string',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { defaultValue: 'FLAME' }
      ),
      param('radius', 'number', { en: 'Ring radius', ja: 'リング半径' }, { defaultValue: 3 }),
      param(
        'amount',
        'number',
        { en: 'Particles in ring', ja: 'リング内パーティクル数' },
        { defaultValue: 20 }
      ),
      param('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 36 }),
    ],
  },
  {
    name: 'particleSphere',
    aliases: ['pSphere'],
    description: { en: 'Creates a sphere of particles', ja: 'パーティクル球体を生成' },
    category: 'particle',
    parameters: [
      param(
        'particle',
        'string',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { defaultValue: 'FLAME' }
      ),
      param('radius', 'number', { en: 'Sphere radius', ja: '球体半径' }, { defaultValue: 3 }),
      param(
        'amount',
        'number',
        { en: 'Particles per point', ja: 'ポイント毎のパーティクル数' },
        { defaultValue: 1 }
      ),
      param('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 32 }),
    ],
  },
  {
    name: 'particleVortex',
    aliases: ['pVortex'],
    description: { en: 'Creates a vortex of particles', ja: 'パーティクル渦巻きを生成' },
    category: 'particle',
    parameters: [
      param(
        'particle',
        'string',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { defaultValue: 'FLAME' }
      ),
      param('radius', 'number', { en: 'Vortex radius', ja: '渦巻き半径' }, { defaultValue: 2 }),
      param(
        'particles',
        'number',
        { en: 'Particles per ring', ja: 'リング毎のパーティクル数' },
        { defaultValue: 5 }
      ),
    ],
  },
  {
    name: 'totem',
    aliases: [],
    description: { en: 'Plays a totem animation', ja: 'トーテムアニメーションを再生' },
    category: 'particle',
    parameters: [],
  },
];

// --- Player UI mechanics ---
const playerUIMechanics: MechanicSchema[] = [
  {
    name: 'sendTitle',
    aliases: ['title'],
    description: {
      en: 'Sends a title message to the player',
      ja: 'プレイヤーにタイトルメッセージを送信',
    },
    category: 'player-ui',
    parameters: [
      param('title', 'string', { en: 'Title text', ja: 'タイトルテキスト' }, { required: true }),
      param('subtitle', 'string', { en: 'Subtitle text', ja: 'サブタイトルテキスト' }),
      param(
        'fadeIn',
        'number',
        { en: 'Fade in ticks', ja: 'フェードインティック' },
        { defaultValue: 10 }
      ),
      param('stay', 'number', { en: 'Stay ticks', ja: '表示ティック' }, { defaultValue: 70 }),
      param(
        'fadeOut',
        'number',
        { en: 'Fade out ticks', ja: 'フェードアウトティック' },
        { defaultValue: 20 }
      ),
    ],
  },
  {
    name: 'sendActionMessage',
    aliases: ['actionbar'],
    description: { en: 'Sends an action bar message', ja: 'アクションバーメッセージを送信' },
    category: 'player-ui',
    parameters: [
      param(
        'message',
        'string',
        { en: 'Message text', ja: 'メッセージテキスト' },
        { required: true }
      ),
    ],
  },
  {
    name: 'sendToast',
    aliases: ['toast'],
    description: { en: 'Sends a toast advancement notification', ja: 'トースト進捗通知を送信' },
    category: 'player-ui',
    parameters: [
      param('title', 'string', { en: 'Toast title', ja: 'トーストタイトル' }, { required: true }),
      param(
        'icon',
        'string',
        { en: 'Material for icon', ja: 'アイコン素材' },
        { defaultValue: 'DIAMOND' }
      ),
      param(
        'frame',
        'string',
        { en: 'Frame type (TASK/GOAL/CHALLENGE)', ja: 'フレームタイプ' },
        { defaultValue: 'TASK' }
      ),
    ],
  },
  {
    name: 'closeInventory',
    aliases: [],
    description: {
      en: 'Closes the target player inventory',
      ja: 'ターゲットプレイヤーのインベントリを閉じる',
    },
    category: 'player-ui',
    parameters: [],
  },
  {
    name: 'clearChat',
    aliases: [],
    description: {
      en: 'Clear chat for the target player',
      ja: 'ターゲットプレイヤーのチャットをクリア',
    },
    category: 'player-ui',
    parameters: [],
  },
];

// --- Block interaction mechanics ---
const blockMechanics: MechanicSchema[] = [
  {
    name: 'setBlockType',
    aliases: ['setBlock'],
    description: {
      en: 'Sets the block type at the target location',
      ja: 'ターゲット位置のブロックタイプを設定',
    },
    category: 'block',
    parameters: [
      param(
        'material',
        'material',
        { en: 'Block material', ja: 'ブロック素材' },
        { required: true, defaultValue: 'STONE' }
      ),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks (0 = permanent)', ja: '持続ティック（0=永続）' },
        { defaultValue: 0 }
      ),
    ],
  },
  {
    name: 'breakBlock',
    aliases: [],
    description: {
      en: 'Breaks the block at the target location',
      ja: 'ターゲット位置のブロックを破壊',
    },
    category: 'block',
    parameters: [
      param(
        'doDrops',
        'boolean',
        { en: 'Drop block items', ja: 'ブロックアイテムをドロップ' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'blockWave',
    aliases: [],
    description: { en: 'Creates a wave of block changes', ja: 'ブロック変更の波を生成' },
    category: 'block',
    parameters: [
      param(
        'material',
        'material',
        { en: 'Block material', ja: 'ブロック素材' },
        { required: true, defaultValue: 'STONE' }
      ),
      param('radius', 'number', { en: 'Wave radius', ja: '波の半径' }, { defaultValue: 5 }),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 40 }
      ),
      param('velocity', 'number', { en: 'Wave speed', ja: '波の速度' }, { defaultValue: 1 }),
    ],
  },
];

// --- Item mechanics ---
const itemMechanics: MechanicSchema[] = [
  {
    name: 'giveItem',
    aliases: [],
    description: {
      en: 'Gives a MythicMobs item to the target',
      ja: 'MythicMobsアイテムをターゲットに付与',
    },
    category: 'item',
    parameters: [
      param(
        'item',
        'string',
        { en: 'MythicMobs item name', ja: 'MythicMobsアイテム名' },
        { required: true }
      ),
      param('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'takeItem',
    aliases: [],
    description: {
      en: 'Takes items from the target inventory',
      ja: 'ターゲットのインベントリからアイテムを取得',
    },
    category: 'item',
    parameters: [
      param(
        'item',
        'string',
        { en: 'Item name or material', ja: 'アイテム名または素材' },
        { required: true }
      ),
      param('amount', 'number', { en: 'Amount to take', ja: '取得数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'equip',
    aliases: [],
    description: { en: 'Equips an item on the caster', ja: 'キャスターにアイテムを装備' },
    category: 'item',
    parameters: [
      param('item', 'string', { en: 'Item name', ja: 'アイテム名' }, { required: true }),
      param(
        'slot',
        'string',
        { en: 'Equipment slot (HAND/HEAD/CHEST/LEGS/FEET)', ja: '装備スロット' },
        { defaultValue: 'HAND' }
      ),
    ],
  },
];

// --- Misc / advanced mechanics ---
const advancedMechanics: MechanicSchema[] = [
  {
    name: 'explosion',
    aliases: [],
    description: { en: 'Creates a real explosion', ja: '実際の爆発を生成' },
    category: 'damage',
    parameters: [
      param('yield', 'number', { en: 'Explosion power', ja: '爆発力' }, { defaultValue: 2 }),
      param('fire', 'boolean', { en: 'Set fire', ja: '着火' }, { defaultValue: false }),
      param(
        'breakBlocks',
        'boolean',
        { en: 'Break blocks', ja: 'ブロック破壊' },
        { defaultValue: false }
      ),
    ],
  },
  {
    name: 'lightning',
    aliases: [],
    description: { en: 'Strikes lightning at target', ja: 'ターゲットに雷を落とす' },
    category: 'damage',
    parameters: [
      param('damage', 'number', { en: 'Lightning damage', ja: '雷ダメージ' }, { defaultValue: 5 }),
    ],
  },
  {
    name: 'potionClear',
    aliases: [],
    description: {
      en: 'Clears all potion effects from the target',
      ja: 'ターゲットから全ポーション効果を除去',
    },
    category: 'potion',
    parameters: [],
  },
  {
    name: 'randomSkill',
    aliases: [],
    description: { en: 'Runs a random skill from a list', ja: 'リストからランダムにスキルを実行' },
    category: 'meta',
    parameters: [
      param(
        'skills',
        'string',
        { en: 'Comma-separated skill names', ja: 'カンマ区切りのスキル名' },
        { required: true }
      ),
    ],
  },
  {
    name: 'aura',
    aliases: [],
    description: { en: 'Applies an aura to the target', ja: 'ターゲットにオーラを付与' },
    category: 'meta',
    parameters: [
      param('auraName', 'string', { en: 'Aura name', ja: 'オーラ名' }, { required: true }),
      param('onTick', 'skill', { en: 'Skill to run each tick', ja: '毎ティック実行スキル' }),
      param('onStart', 'skill', { en: 'Skill to run when aura starts', ja: 'オーラ開始時スキル' }),
      param('onEnd', 'skill', { en: 'Skill to run when aura ends', ja: 'オーラ終了時スキル' }),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
      param('interval', 'number', { en: 'Tick interval', ja: 'ティック間隔' }, { defaultValue: 1 }),
      param('maxStacks', 'number', { en: 'Max stacks', ja: '最大スタック数' }, { defaultValue: 1 }),
      param(
        'cancelOnDeath',
        'boolean',
        { en: 'Cancel on death', ja: '死亡時キャンセル' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'orbital',
    aliases: [],
    description: {
      en: 'Creates an orbital effect around the caster',
      ja: 'キャスター周囲に軌道エフェクトを生成',
    },
    category: 'meta',
    parameters: [
      param('onTick', 'skill', { en: 'Skill per tick', ja: 'ティック毎スキル' }),
      param('onHit', 'skill', { en: 'Skill on hit', ja: '命中時スキル' }),
      param('radius', 'number', { en: 'Orbital radius', ja: '軌道半径' }, { defaultValue: 4 }),
      param('interval', 'number', { en: 'Tick interval', ja: 'ティック間隔' }, { defaultValue: 1 }),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      param(
        'points',
        'number',
        { en: 'Points in orbit', ja: '軌道上のポイント数' },
        { defaultValue: 20 }
      ),
    ],
  },
  {
    name: 'onAttack',
    aliases: [],
    description: { en: 'Aura that triggers on attack', ja: '攻撃時に発動するオーラ' },
    category: 'meta',
    parameters: [
      param('onHit', 'skill', { en: 'Skill on hit', ja: '命中時スキル' }, { required: true }),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
      param(
        'charges',
        'number',
        { en: 'Number of charges', ja: 'チャージ数' },
        { defaultValue: 0 }
      ),
      param(
        'cancelOnDeath',
        'boolean',
        { en: 'Cancel on death', ja: '死亡時キャンセル' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'onDamaged',
    aliases: [],
    description: { en: 'Aura that triggers when damaged', ja: 'ダメージ受けた時に発動するオーラ' },
    category: 'meta',
    parameters: [
      param('onHit', 'skill', { en: 'Skill when hit', ja: '被弾時スキル' }, { required: true }),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
      param(
        'cancelOnDeath',
        'boolean',
        { en: 'Cancel on death', ja: '死亡時キャンセル' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'variableSkill',
    aliases: [],
    description: { en: 'Runs a skill stored in a variable', ja: '変数に格納されたスキルを実行' },
    category: 'meta',
    parameters: [
      param(
        'variable',
        'string',
        { en: 'Variable containing skill name', ja: 'スキル名を含む変数' },
        { required: true }
      ),
    ],
  },
  {
    name: 'switch',
    aliases: [],
    description: {
      en: 'Runs a different skill based on a condition',
      ja: '条件に基づいて異なるスキルを実行',
    },
    category: 'meta',
    parameters: [
      param(
        'condition',
        'string',
        { en: 'Condition expression', ja: '条件式' },
        { required: true }
      ),
      param('cases', 'string', { en: 'Case mappings', ja: 'ケースマッピング' }, { required: true }),
    ],
  },
  {
    name: 'chain',
    aliases: [],
    description: {
      en: 'Chains a skill from target to nearby entities',
      ja: 'ターゲットから近くのエンティティにスキルをチェーン',
    },
    category: 'meta',
    parameters: [
      param(
        'onBounce',
        'skill',
        { en: 'Skill per bounce', ja: 'バウンス毎スキル' },
        { required: true }
      ),
      param(
        'bounces',
        'number',
        { en: 'Number of bounces', ja: 'バウンス数' },
        { defaultValue: 3 }
      ),
      param('range', 'number', { en: 'Bounce range', ja: 'バウンス範囲' }, { defaultValue: 5 }),
      param(
        'delay',
        'number',
        { en: 'Delay between bounces', ja: 'バウンス間遅延' },
        { defaultValue: 1 }
      ),
    ],
  },
  {
    name: 'setStance',
    aliases: [],
    description: { en: 'Sets mob stance variable', ja: 'モブのスタンス変数を設定' },
    category: 'utility',
    parameters: [
      param('stance', 'string', { en: 'Stance name', ja: 'スタンス名' }, { required: true }),
    ],
  },
  {
    name: 'modifyTargetScore',
    aliases: [],
    description: {
      en: 'Modifies a scoreboard score for the target',
      ja: 'ターゲットのスコアボードスコアを変更',
    },
    category: 'utility',
    parameters: [
      param('objective', 'string', { en: 'Objective', ja: 'オブジェクティブ' }, { required: true }),
      param('value', 'number', { en: 'Value', ja: '値' }, { defaultValue: 1 }),
      param(
        'action',
        'string',
        { en: 'Action (SET/ADD/SUBTRACT)', ja: 'アクション' },
        { defaultValue: 'ADD' }
      ),
    ],
  },
  {
    name: 'setGlowing',
    aliases: [],
    description: { en: 'Makes the target glow', ja: 'ターゲットを発光させる' },
    category: 'display',
    parameters: [
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      param('color', 'string', { en: 'Glow color', ja: '発光色' }),
    ],
  },
  {
    name: 'modifyArmorStand',
    aliases: [],
    description: {
      en: 'Modifies armor stand properties',
      ja: 'アーマースタンドのプロパティを変更',
    },
    category: 'entity',
    parameters: [
      param('arm', 'string', { en: 'Arm pose (right or left)', ja: 'アームポーズ' }),
      param('body', 'string', { en: 'Body pose', ja: 'ボディポーズ' }),
      param('head', 'string', { en: 'Head pose', ja: 'ヘッドポーズ' }),
    ],
  },
  {
    name: 'setRotation',
    aliases: [],
    description: { en: 'Sets the target rotation', ja: 'ターゲットの回転を設定' },
    category: 'movement',
    parameters: [
      param('yaw', 'number', { en: 'Yaw', ja: 'ヨー' }, { defaultValue: 0 }),
      param('pitch', 'number', { en: 'Pitch', ja: 'ピッチ' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'faceTarget',
    aliases: [],
    description: {
      en: 'Makes the caster face the target',
      ja: 'キャスターをターゲットの方に向ける',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'look',
    aliases: [],
    description: {
      en: 'Makes the caster look at the target location',
      ja: 'キャスターをターゲット位置に向ける',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'sendResourcePack',
    aliases: [],
    description: {
      en: 'Sends a resource pack to the player',
      ja: 'リソースパックをプレイヤーに送信',
    },
    category: 'player-ui',
    parameters: [
      param(
        'url',
        'string',
        { en: 'Resource pack URL', ja: 'リソースパックURL' },
        { required: true }
      ),
      param('hash', 'string', { en: 'SHA1 hash', ja: 'SHA1ハッシュ' }),
    ],
  },
  {
    name: 'sudoCommand',
    aliases: [],
    description: { en: 'Makes the target run a command', ja: 'ターゲットにコマンドを実行させる' },
    category: 'utility',
    parameters: [
      param(
        'command',
        'string',
        { en: 'Command string', ja: 'コマンド文字列' },
        { required: true }
      ),
    ],
  },
  {
    name: 'consoleCommand',
    aliases: [],
    description: { en: 'Runs a command from console', ja: 'コンソールからコマンドを実行' },
    category: 'utility',
    parameters: [
      param(
        'command',
        'string',
        { en: 'Console command', ja: 'コンソールコマンド' },
        { required: true }
      ),
    ],
  },
  {
    name: 'undisguise',
    aliases: [],
    description: { en: 'Removes disguise from the target', ja: 'ターゲットの変装を解除' },
    category: 'display',
    parameters: [],
  },
  {
    name: 'barCreate',
    aliases: [],
    description: { en: 'Creates a boss bar', ja: 'ボスバーを作成' },
    category: 'bossbar',
    parameters: [
      param('name', 'string', { en: 'Boss bar name', ja: 'ボスバー名' }, { required: true }),
      param('display', 'string', { en: 'Display text', ja: '表示テキスト' }),
      param('color', 'string', { en: 'Color', ja: '色' }, { defaultValue: 'RED' }),
      param('style', 'string', { en: 'Style', ja: 'スタイル' }, { defaultValue: 'SOLID' }),
    ],
  },
  {
    name: 'barSet',
    aliases: [],
    description: { en: 'Modifies a boss bar', ja: 'ボスバーを変更' },
    category: 'bossbar',
    parameters: [
      param('name', 'string', { en: 'Boss bar name', ja: 'ボスバー名' }, { required: true }),
      param('value', 'number', { en: 'Bar value (0-1)', ja: 'バー値（0-1）' }),
      param('display', 'string', { en: 'Display text', ja: '表示テキスト' }),
    ],
  },
  {
    name: 'barRemove',
    aliases: [],
    description: { en: 'Removes a boss bar', ja: 'ボスバーを削除' },
    category: 'bossbar',
    parameters: [
      param('name', 'string', { en: 'Boss bar name', ja: 'ボスバー名' }, { required: true }),
    ],
  },
  {
    name: 'setNoDamageTicks',
    aliases: [],
    description: { en: 'Sets invulnerability frame ticks', ja: '無敵フレームティックを設定' },
    category: 'entity',
    parameters: [param('ticks', 'number', { en: 'Ticks', ja: 'ティック' }, { defaultValue: 0 })],
  },
  {
    name: 'setMobColor',
    aliases: [],
    description: { en: 'Sets the color of colorable mobs', ja: '色変更可能なモブの色を設定' },
    category: 'entity',
    parameters: [
      param(
        'color',
        'string',
        { en: 'Color name', ja: '色名' },
        { required: true, defaultValue: 'RED' }
      ),
    ],
  },
  {
    name: 'setTarget',
    aliases: [],
    description: {
      en: 'Sets the mob target to specific entity',
      ja: 'モブのターゲットを特定のエンティティに設定',
    },
    category: 'aggro',
    parameters: [],
  },
  {
    name: 'clearThreat',
    aliases: [],
    description: { en: 'Clears the threat table', ja: '脅威テーブルをクリア' },
    category: 'aggro',
    parameters: [],
  },
  {
    name: 'shoot',
    aliases: [],
    description: { en: 'Shoots a vanilla projectile', ja: 'バニラプロジェクタイルを射撃' },
    category: 'projectile',
    parameters: [
      param(
        'type',
        'string',
        { en: 'Projectile type', ja: 'プロジェクタイルタイプ' },
        { required: true, defaultValue: 'arrow' }
      ),
      param('velocity', 'number', { en: 'Velocity', ja: '速度' }, { defaultValue: 1 }),
      param('spread', 'number', { en: 'Spread', ja: '拡散' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'volley',
    aliases: [],
    description: { en: 'Shoots a volley of projectiles', ja: '一斉射撃' },
    category: 'projectile',
    parameters: [
      param(
        'type',
        'string',
        { en: 'Projectile type', ja: 'タイプ' },
        { required: true, defaultValue: 'arrow' }
      ),
      param(
        'amount',
        'number',
        { en: 'Number of projectiles', ja: 'プロジェクタイル数' },
        { defaultValue: 5 }
      ),
      param('spread', 'number', { en: 'Spread', ja: '拡散' }, { defaultValue: 0.2 }),
      param('velocity', 'number', { en: 'Velocity', ja: '速度' }, { defaultValue: 1 }),
    ],
  },
];

export const EXTENDED_MECHANIC_REGISTRY: MechanicSchema[] = [
  ...damageExtended,
  ...movementExtended,
  ...particleMechanics,
  ...playerUIMechanics,
  ...blockMechanics,
  ...itemMechanics,
  ...advancedMechanics,
];
