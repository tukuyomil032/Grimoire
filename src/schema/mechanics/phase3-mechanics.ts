/**
 * Phase 3: Full MythicMobs mechanics coverage.
 * Additional 140+ mechanics covering all MythicMobs categories.
 */
import type { MechanicSchema, ParameterSchema } from '@/models/mechanic';

function p(
  name: string,
  type: ParameterSchema['type'],
  desc: Record<string, string>,
  opts?: Partial<ParameterSchema>
): ParameterSchema {
  return { name, type, description: desc, required: false, ...opts };
}

// ─── Sound mechanics ───────────────────────────────

const soundMechanics: MechanicSchema[] = [
  {
    name: 'playSound',
    aliases: ['sound'],
    description: { en: 'Plays a sound at the target', ja: 'ターゲットにサウンドを再生' },
    category: 'sound',
    parameters: [
      p('sound', 'sound', { en: 'Sound name', ja: 'サウンド名' }, { required: true }),
      p('volume', 'number', { en: 'Volume', ja: '音量' }, { defaultValue: 1 }),
      p('pitch', 'number', { en: 'Pitch', ja: 'ピッチ' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'stopSound',
    aliases: [],
    description: { en: 'Stops a playing sound', ja: '再生中のサウンドを停止' },
    category: 'sound',
    parameters: [p('sound', 'sound', { en: 'Sound name', ja: 'サウンド名' })],
  },
];

// ─── Variable mechanics ───────────────────────────

const variableMechanics: MechanicSchema[] = [
  {
    name: 'setVariable',
    aliases: ['setVar', 'sv'],
    description: { en: 'Sets a variable on the caster', ja: 'キャスターに変数を設定' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('value', 'string', { en: 'Value', ja: '値' }, { required: true }),
      p(
        'scope',
        'string',
        { en: 'Scope (caster/target/world/global/skill)', ja: 'スコープ' },
        { defaultValue: 'caster' }
      ),
      p(
        'type',
        'string',
        { en: 'Variable type (integer/float/string)', ja: '変数型' },
        { defaultValue: 'integer' }
      ),
    ],
  },
  {
    name: 'variableAdd',
    aliases: ['varAdd'],
    description: { en: 'Adds to a numeric variable', ja: '数値変数に加算' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p(
        'amount',
        'number',
        { en: 'Amount to add', ja: '加算量' },
        { defaultValue: 1, required: true }
      ),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'variableSubtract',
    aliases: ['varSub'],
    description: { en: 'Subtracts from a numeric variable', ja: '数値変数から減算' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p(
        'amount',
        'number',
        { en: 'Amount to subtract', ja: '減算量' },
        { defaultValue: 1, required: true }
      ),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'variableMultiply',
    aliases: ['varMul'],
    description: { en: 'Multiplies a numeric variable', ja: '数値変数を乗算' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p(
        'multiplier',
        'number',
        { en: 'Multiplier', ja: '乗数' },
        { defaultValue: 2, required: true }
      ),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'variableUnset',
    aliases: ['varUnset'],
    description: { en: 'Removes a variable', ja: '変数を削除' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
  {
    name: 'variableMath',
    aliases: ['varMath'],
    description: { en: 'Performs math operations on variables', ja: '変数に数学演算を実行' },
    category: 'variable',
    parameters: [
      p('variable', 'string', { en: 'Variable name', ja: '変数名' }, { required: true }),
      p('equation', 'string', { en: 'Math equation', ja: '数式' }, { required: true }),
      p('scope', 'string', { en: 'Scope', ja: 'スコープ' }, { defaultValue: 'caster' }),
    ],
  },
];

// ─── Scoreboard mechanics ─────────────────────────

const scoreboardMechanics: MechanicSchema[] = [
  {
    name: 'setScore',
    aliases: [],
    description: { en: 'Sets a scoreboard score', ja: 'スコアボードスコアを設定' },
    category: 'scoreboard',
    parameters: [
      p(
        'objective',
        'string',
        { en: 'Objective name', ja: 'オブジェクティブ名' },
        { required: true }
      ),
      p('value', 'number', { en: 'Score value', ja: 'スコア値' }, { required: true }),
      p(
        'action',
        'string',
        { en: 'Action (SET/ADD/REMOVE)', ja: 'アクション' },
        { defaultValue: 'SET' }
      ),
    ],
  },
  {
    name: 'modifyScore',
    aliases: [],
    description: { en: 'Modifies a scoreboard score', ja: 'スコアボードスコアを変更' },
    category: 'scoreboard',
    parameters: [
      p(
        'objective',
        'string',
        { en: 'Objective name', ja: 'オブジェクティブ名' },
        { required: true }
      ),
      p('value', 'number', { en: 'Value to add', ja: '加算値' }, { required: true }),
    ],
  },
];

// ─── AI mechanics ─────────────────────────────────

const aiMechanics: MechanicSchema[] = [
  {
    name: 'setAI',
    aliases: [],
    description: { en: 'Enables or disables AI', ja: 'AIを有効/無効化' },
    category: 'ai',
    parameters: [p('ai', 'boolean', { en: 'Enable AI', ja: 'AI有効' }, { defaultValue: true })],
  },
  {
    name: 'goTo',
    aliases: ['goto'],
    description: { en: 'Makes mob navigate to target', ja: 'モブをターゲットへ移動させる' },
    category: 'ai',
    parameters: [
      p('speed', 'number', { en: 'Movement speed', ja: '移動速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'clearThreatTable',
    aliases: ['clearAggro'],
    description: { en: 'Clears the threat table', ja: '脅威テーブルをクリア' },
    category: 'ai',
    parameters: [],
  },
  {
    name: 'modifyThreatTable',
    aliases: ['modThreat'],
    description: { en: 'Modifies threat for a target', ja: 'ターゲットの脅威値を変更' },
    category: 'ai',
    parameters: [p('amount', 'number', { en: 'Threat amount', ja: '脅威量' }, { required: true })],
  },
  {
    name: 'setMobLevel',
    aliases: ['setLevel'],
    description: { en: 'Sets the mobs level', ja: 'モブのレベルを設定' },
    category: 'ai',
    parameters: [p('level', 'number', { en: 'Level', ja: 'レベル' }, { required: true })],
  },
  {
    name: 'setTarget',
    aliases: [],
    description: { en: 'Sets the mobs attack target', ja: 'モブの攻撃ターゲットを設定' },
    category: 'ai',
    parameters: [],
  },
  {
    name: 'clearTarget',
    aliases: [],
    description: { en: 'Clears the mobs current target', ja: 'モブの現在のターゲットをクリア' },
    category: 'ai',
    parameters: [],
  },
  {
    name: 'setPathfindingMalus',
    aliases: [],
    description: {
      en: 'Sets pathfinding malus for a block type',
      ja: 'ブロックタイプのパスファインディングペナルティを設定',
    },
    category: 'ai',
    parameters: [
      p('type', 'string', { en: 'Path type', ja: 'パスタイプ' }, { required: true }),
      p('malus', 'number', { en: 'Malus value', ja: 'ペナルティ値' }, { required: true }),
    ],
  },
];

// ─── Display mechanics ────────────────────────────

const displayMechanics: MechanicSchema[] = [
  {
    name: 'setName',
    aliases: [],
    description: { en: 'Sets the mob display name', ja: 'モブの表示名を設定' },
    category: 'display',
    parameters: [p('name', 'string', { en: 'Display name', ja: '表示名' }, { required: true })],
  },
  {
    name: 'setNameVisible',
    aliases: [],
    description: { en: 'Toggles name visibility', ja: '名前の表示/非表示を切替' },
    category: 'display',
    parameters: [p('visible', 'boolean', { en: 'Visible', ja: '表示' }, { defaultValue: true })],
  },
  {
    name: 'setGlowing',
    aliases: ['glow'],
    description: { en: 'Toggles glowing effect', ja: '発光エフェクトを切替' },
    category: 'display',
    parameters: [
      p('glow', 'boolean', { en: 'Glowing', ja: '発光' }, { defaultValue: true }),
      p('color', 'color', { en: 'Glow color (team color)', ja: '発光色' }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
    ],
  },
  {
    name: 'setScale',
    aliases: [],
    description: { en: 'Sets entity visual scale', ja: 'エンティティの視覚的スケールを設定' },
    category: 'display',
    parameters: [
      p('scale', 'number', { en: 'Scale factor', ja: 'スケール倍率' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'disguise',
    aliases: [],
    description: { en: 'Disguises the mob as another entity', ja: 'モブを別のエンティティに変装' },
    category: 'disguise',
    parameters: [
      p('type', 'string', { en: 'Disguise type', ja: '変装タイプ' }, { required: true }),
    ],
  },
  {
    name: 'undisguise',
    aliases: [],
    description: { en: 'Removes disguise', ja: '変装を解除' },
    category: 'disguise',
    parameters: [],
  },
  {
    name: 'setGravity',
    aliases: [],
    description: { en: 'Toggles gravity', ja: '重力を切替' },
    category: 'utility',
    parameters: [
      p('gravity', 'boolean', { en: 'Has gravity', ja: '重力あり' }, { defaultValue: true }),
    ],
  },
  {
    name: 'setInvisible',
    aliases: [],
    description: { en: 'Makes the entity invisible', ja: 'エンティティを透明化' },
    category: 'display',
    parameters: [
      p('invisible', 'boolean', { en: 'Invisible', ja: '透明' }, { defaultValue: true }),
    ],
  },
  {
    name: 'setSilent',
    aliases: [],
    description: { en: 'Makes the entity silent', ja: 'エンティティを無音化' },
    category: 'display',
    parameters: [p('silent', 'boolean', { en: 'Silent', ja: '無音' }, { defaultValue: true })],
  },
  {
    name: 'setNoGravity',
    aliases: [],
    description: { en: 'Sets entity to have no gravity', ja: 'エンティティの重力を無効化' },
    category: 'display',
    parameters: [],
  },
];

// ─── Boss bar mechanics ───────────────────────────

const bossBarMechanics: MechanicSchema[] = [
  {
    name: 'bossBar',
    aliases: [],
    description: {
      en: 'Displays a boss bar to nearby players',
      ja: '近くのプレイヤーにボスバーを表示',
    },
    category: 'bossbar',
    parameters: [
      p('title', 'string', { en: 'Bar title', ja: 'バータイトル' }, { required: true }),
      p(
        'color',
        'string',
        { en: 'Bar color (RED/BLUE/GREEN/YELLOW/PURPLE/WHITE/PINK)', ja: 'バー色' },
        { defaultValue: 'RED' }
      ),
      p(
        'style',
        'string',
        { en: 'Bar style (SOLID/SEG_6/SEG_10/SEG_12/SEG_20)', ja: 'バースタイル' },
        { defaultValue: 'SOLID' }
      ),
      p('progress', 'number', { en: 'Progress (0-1)', ja: '進行度（0-1）' }, { defaultValue: 1 }),
      p('range', 'number', { en: 'Range', ja: '範囲' }, { defaultValue: 32 }),
    ],
  },
  {
    name: 'removeBossBar',
    aliases: [],
    description: { en: 'Removes the boss bar', ja: 'ボスバーを削除' },
    category: 'bossbar',
    parameters: [],
  },
];

// ─── Player UI mechanics ──────────────────────────

const additionalPlayerUIMechanics: MechanicSchema[] = [
  {
    name: 'sendTitle',
    aliases: ['title'],
    description: { en: 'Sends a title to the player', ja: 'プレイヤーにタイトルを送信' },
    category: 'player-ui',
    parameters: [
      p('title', 'string', { en: 'Title text', ja: 'タイトルテキスト' }),
      p('subtitle', 'string', { en: 'Subtitle text', ja: 'サブタイトルテキスト' }),
      p(
        'fadeIn',
        'number',
        { en: 'Fade in ticks', ja: 'フェードインティック' },
        { defaultValue: 10 }
      ),
      p('stay', 'number', { en: 'Stay ticks', ja: '表示ティック' }, { defaultValue: 70 }),
      p(
        'fadeOut',
        'number',
        { en: 'Fade out ticks', ja: 'フェードアウトティック' },
        { defaultValue: 20 }
      ),
    ],
  },
  {
    name: 'sendActionBar',
    aliases: ['actionbar'],
    description: { en: 'Sends an action bar message', ja: 'アクションバーメッセージを送信' },
    category: 'player-ui',
    parameters: [p('message', 'string', { en: 'Message', ja: 'メッセージ' }, { required: true })],
  },
  {
    name: 'sendToast',
    aliases: ['toast'],
    description: { en: 'Sends an advancement toast', ja: '進捗トーストを送信' },
    category: 'player-ui',
    parameters: [
      p('title', 'string', { en: 'Toast title', ja: 'トーストタイトル' }, { required: true }),
      p(
        'icon',
        'material',
        { en: 'Item icon', ja: 'アイテムアイコン' },
        { defaultValue: 'NETHER_STAR' }
      ),
      p(
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
    description: { en: 'Closes the targets inventory', ja: 'ターゲットのインベントリを閉じる' },
    category: 'player-ui',
    parameters: [],
  },
  {
    name: 'openInventory',
    aliases: [],
    description: { en: 'Opens an inventory for the target', ja: 'ターゲットにインベントリを開く' },
    category: 'player-ui',
    parameters: [
      p('title', 'string', { en: 'Inventory title', ja: 'インベントリタイトル' }),
      p(
        'size',
        'number',
        { en: 'Inventory size (9/18/27/36/45/54)', ja: 'サイズ' },
        { defaultValue: 27 }
      ),
    ],
  },
];

// ─── Block mechanics ──────────────────────────────

const additionalBlockMechanics: MechanicSchema[] = [
  {
    name: 'setBlockType',
    aliases: ['setBlock'],
    description: { en: 'Changes a block at target location', ja: 'ターゲット位置のブロックを変更' },
    category: 'block',
    parameters: [
      p('material', 'material', { en: 'Block material', ja: 'ブロック素材' }, { required: true }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks (0=permanent)', ja: '持続ティック（0=永続）' },
        { defaultValue: 0 }
      ),
    ],
  },
  {
    name: 'breakBlock',
    aliases: [],
    description: { en: 'Breaks a block at target location', ja: 'ターゲット位置のブロックを破壊' },
    category: 'block',
    parameters: [
      p('doDrops', 'boolean', { en: 'Drop items', ja: 'アイテムドロップ' }, { defaultValue: true }),
    ],
  },
  {
    name: 'blockWave',
    aliases: [],
    description: { en: 'Creates a wave of block changes', ja: 'ブロック変更の波を生成' },
    category: 'block',
    parameters: [
      p('material', 'material', { en: 'Material', ja: '素材' }, { required: true }),
      p('radius', 'number', { en: 'Wave radius', ja: '波の半径' }, { defaultValue: 5 }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('velocity', 'number', { en: 'Wave speed', ja: '波の速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'blockPhysics',
    aliases: [],
    description: {
      en: 'Applies physics to blocks in radius',
      ja: '半径内のブロックに物理演算適用',
    },
    category: 'block',
    parameters: [
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 3 }),
      p('velocity', 'number', { en: 'Launch velocity', ja: '発射速度' }, { defaultValue: 1 }),
    ],
  },
];

// ─── Item mechanics ───────────────────────────────

const additionalItemMechanics: MechanicSchema[] = [
  {
    name: 'giveItem',
    aliases: ['give'],
    description: { en: 'Gives an item to the target', ja: 'ターゲットにアイテムを付与' },
    category: 'item',
    parameters: [
      p('item', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'takeItem',
    aliases: ['removeItem'],
    description: { en: 'Removes an item from target', ja: 'ターゲットからアイテムを除去' },
    category: 'item',
    parameters: [
      p('item', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'dropItem',
    aliases: [],
    description: {
      en: 'Drops an item at target location',
      ja: 'ターゲット位置にアイテムをドロップ',
    },
    category: 'item',
    parameters: [
      p('item', 'material', { en: 'Item material', ja: 'アイテム素材' }, { required: true }),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'setDurability',
    aliases: [],
    description: { en: 'Sets item durability in hand', ja: '手持ちアイテムの耐久値を設定' },
    category: 'item',
    parameters: [
      p('amount', 'number', { en: 'Durability amount', ja: '耐久値' }, { required: true }),
    ],
  },
  {
    name: 'consumeItem',
    aliases: [],
    description: { en: 'Consumes an item from player hand', ja: 'プレイヤーの手のアイテムを消費' },
    category: 'item',
    parameters: [
      p('amount', 'number', { en: 'Amount to consume', ja: '消費量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'setItemNBT',
    aliases: [],
    description: { en: 'Sets NBT on held item', ja: '手持ちアイテムにNBTを設定' },
    category: 'item',
    parameters: [p('nbt', 'string', { en: 'NBT string', ja: 'NBT文字列' }, { required: true })],
  },
];

// ─── Entity mechanics ─────────────────────────────

const entityMechanics: MechanicSchema[] = [
  {
    name: 'modifyMaxHealth',
    aliases: [],
    description: { en: 'Modifies the entity max health', ja: 'エンティティの最大HPを変更' },
    category: 'entity',
    parameters: [
      p('amount', 'number', { en: 'Amount', ja: '量' }, { required: true }),
      p(
        'action',
        'string',
        { en: 'Action (SET/ADD/MULTIPLY)', ja: 'アクション' },
        { defaultValue: 'ADD' }
      ),
    ],
  },
  {
    name: 'modifyDamage',
    aliases: [],
    description: {
      en: 'Modifies the damage of the current attack',
      ja: '現在の攻撃ダメージを変更',
    },
    category: 'entity',
    parameters: [
      p('amount', 'number', { en: 'Amount', ja: '量' }, { required: true }),
      p(
        'action',
        'string',
        { en: 'Action (SET/ADD/MULTIPLY)', ja: 'アクション' },
        { defaultValue: 'MULTIPLY' }
      ),
    ],
  },
  {
    name: 'setSpeed',
    aliases: [],
    description: { en: 'Sets movement speed', ja: '移動速度を設定' },
    category: 'entity',
    parameters: [
      p('speed', 'number', { en: 'Speed', ja: '速度' }, { required: true, defaultValue: 0.25 }),
    ],
  },
  {
    name: 'setFlySpeed',
    aliases: [],
    description: { en: 'Sets fly speed', ja: '飛行速度を設定' },
    category: 'entity',
    parameters: [
      p('speed', 'number', { en: 'Speed', ja: '速度' }, { required: true, defaultValue: 0.1 }),
    ],
  },
  {
    name: 'setRotation',
    aliases: [],
    description: { en: 'Sets entity rotation', ja: 'エンティティの回転を設定' },
    category: 'entity',
    parameters: [
      p('yaw', 'number', { en: 'Yaw', ja: 'ヨー' }),
      p('pitch', 'number', { en: 'Pitch', ja: 'ピッチ' }),
    ],
  },
  {
    name: 'look',
    aliases: [],
    description: { en: 'Makes entity look at target', ja: 'エンティティをターゲットに向ける' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'setOwner',
    aliases: [],
    description: { en: 'Sets the mob owner', ja: 'モブのオーナーを設定' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'setMobColor',
    aliases: ['setColor'],
    description: { en: 'Sets mob color (sheep, wolf collar, etc.)', ja: 'モブの色を設定' },
    category: 'entity',
    parameters: [p('color', 'color', { en: 'Color', ja: '色' }, { required: true })],
  },
  {
    name: 'setBaby',
    aliases: [],
    description: { en: 'Sets entity as baby', ja: 'エンティティを子供に設定' },
    category: 'entity',
    parameters: [p('baby', 'boolean', { en: 'Is baby', ja: '子供か' }, { defaultValue: true })],
  },
  {
    name: 'setNoDamageTicks',
    aliases: [],
    description: { en: 'Sets invulnerability ticks', ja: '無敵ティックを設定' },
    category: 'entity',
    parameters: [p('ticks', 'number', { en: 'Ticks', ja: 'ティック' }, { defaultValue: 20 })],
  },
  {
    name: 'setFire',
    aliases: ['ignite'],
    description: { en: 'Sets entity on fire', ja: 'エンティティに火を付ける' },
    category: 'entity',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 60 }
      ),
    ],
  },
  {
    name: 'extinguish',
    aliases: [],
    description: { en: 'Extinguishes fire on entity', ja: 'エンティティの火を消す' },
    category: 'entity',
    parameters: [],
  },
  {
    name: 'freeze',
    aliases: [],
    description: {
      en: 'Freezes the entity (powdered snow effect)',
      ja: 'エンティティを凍結（粉雪効果）',
    },
    category: 'entity',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
    ],
  },
  {
    name: 'addTag',
    aliases: [],
    description: { en: 'Adds a scoreboard tag', ja: 'スコアボードタグを追加' },
    category: 'entity',
    parameters: [p('tag', 'string', { en: 'Tag name', ja: 'タグ名' }, { required: true })],
  },
  {
    name: 'removeTag',
    aliases: [],
    description: { en: 'Removes a scoreboard tag', ja: 'スコアボードタグを削除' },
    category: 'entity',
    parameters: [p('tag', 'string', { en: 'Tag name', ja: 'タグ名' }, { required: true })],
  },
  {
    name: 'setCollidable',
    aliases: [],
    description: { en: 'Sets entity collidability', ja: 'エンティティの衝突判定を設定' },
    category: 'entity',
    parameters: [
      p('collidable', 'boolean', { en: 'Collidable', ja: '衝突可能' }, { defaultValue: true }),
    ],
  },
];

// ─── Additional utility mechanics ─────────────────

const additionalUtilityMechanics: MechanicSchema[] = [
  {
    name: 'command',
    aliases: ['cmd'],
    description: { en: 'Executes a console command', ja: 'コンソールコマンドを実行' },
    category: 'utility',
    parameters: [
      p('command', 'string', { en: 'Command to execute', ja: '実行コマンド' }, { required: true }),
      p(
        'asTarget',
        'boolean',
        { en: 'Run as target', ja: 'ターゲットとして実行' },
        { defaultValue: false }
      ),
    ],
  },
  {
    name: 'sudoCommand',
    aliases: ['sudoCmd'],
    description: { en: 'Forces target to run a command', ja: 'ターゲットにコマンドを強制実行' },
    category: 'utility',
    parameters: [p('command', 'string', { en: 'Command', ja: 'コマンド' }, { required: true })],
  },
  {
    name: 'signal',
    aliases: [],
    description: { en: 'Sends a signal to targeted mobs', ja: 'ターゲットモブにシグナルを送信' },
    category: 'utility',
    parameters: [
      p('signal', 'string', { en: 'Signal name', ja: 'シグナル名' }, { required: true }),
    ],
  },
  {
    name: 'delay',
    aliases: [],
    description: { en: 'Delays the next mechanic', ja: '次のメカニクスを遅延' },
    category: 'meta',
    parameters: [
      p(
        'ticks',
        'number',
        { en: 'Delay in ticks', ja: '遅延ティック' },
        { defaultValue: 20, required: true }
      ),
    ],
  },
  {
    name: 'cancelEvent',
    aliases: [],
    description: { en: 'Cancels the triggering event', ja: 'トリガーイベントをキャンセル' },
    category: 'utility',
    parameters: [],
  },
  {
    name: 'setStance',
    aliases: [],
    description: { en: 'Sets the mob stance', ja: 'モブのスタンスを設定' },
    category: 'utility',
    parameters: [
      p('stance', 'string', { en: 'Stance name', ja: 'スタンス名' }, { required: true }),
    ],
  },
  {
    name: 'sendResourcePack',
    aliases: [],
    description: { en: 'Sends a resource pack to player', ja: 'リソースパックをプレイヤーに送信' },
    category: 'utility',
    parameters: [
      p('url', 'string', { en: 'Resource pack URL', ja: 'リソースパックURL' }, { required: true }),
      p('hash', 'string', { en: 'SHA-1 hash', ja: 'SHA-1ハッシュ' }),
    ],
  },
  {
    name: 'runSkillAsTarget',
    aliases: [],
    description: { en: 'Runs a skill from target perspective', ja: 'ターゲット視点でスキルを実行' },
    category: 'meta',
    parameters: [p('skill', 'skill', { en: 'Skill name', ja: 'スキル名' }, { required: true })],
  },
  {
    name: 'chain',
    aliases: [],
    description: { en: 'Chains a skill between entities', ja: 'エンティティ間でスキルを連鎖' },
    category: 'meta',
    parameters: [
      p('skill', 'skill', { en: 'Skill name', ja: 'スキル名' }, { required: true }),
      p('bounces', 'number', { en: 'Number of bounces', ja: 'バウンス数' }, { defaultValue: 3 }),
      p('bounceRadius', 'number', { en: 'Bounce radius', ja: 'バウンス半径' }, { defaultValue: 5 }),
    ],
  },
  {
    name: 'randomSkill',
    aliases: [],
    description: { en: 'Runs a random skill from a list', ja: 'リストからランダムにスキルを実行' },
    category: 'meta',
    parameters: [
      p(
        'skills',
        'string',
        { en: 'Comma-separated skill list', ja: 'カンマ区切りスキルリスト' },
        { required: true }
      ),
    ],
  },
  {
    name: 'aura',
    aliases: [],
    description: { en: 'Applies a custom aura', ja: 'カスタムオーラを適用' },
    category: 'meta',
    parameters: [
      p('auraName', 'string', { en: 'Aura name', ja: 'オーラ名' }, { required: true }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
      p('onTick', 'skill', { en: 'Skill on tick', ja: 'ティック毎スキル' }),
      p('onStart', 'skill', { en: 'Skill on start', ja: '開始時スキル' }),
      p('onEnd', 'skill', { en: 'Skill on end', ja: '終了時スキル' }),
      p('interval', 'number', { en: 'Tick interval', ja: 'ティック間隔' }, { defaultValue: 1 }),
      p('maxStacks', 'number', { en: 'Max stacks', ja: '最大スタック' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'removeAura',
    aliases: [],
    description: { en: 'Removes an aura from target', ja: 'ターゲットからオーラを削除' },
    category: 'meta',
    parameters: [p('aura', 'string', { en: 'Aura name', ja: 'オーラ名' }, { required: true })],
  },
  {
    name: 'orbital',
    aliases: [],
    description: {
      en: 'Creates an orbital skill around caster',
      ja: 'キャスター周囲に軌道スキルを生成',
    },
    category: 'meta',
    parameters: [
      p('onTick', 'skill', { en: 'Skill on tick', ja: 'ティック毎スキル' }),
      p('onHit', 'skill', { en: 'Skill on hit', ja: 'ヒット時スキル' }),
      p('radius', 'number', { en: 'Orbit radius', ja: '軌道半径' }, { defaultValue: 4 }),
      p('speed', 'number', { en: 'Orbit speed', ja: '軌道速度' }, { defaultValue: 1 }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('points', 'number', { en: 'Number of orbs', ja: 'オーブ数' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'missile',
    aliases: [],
    description: { en: 'Fires a homing missile', ja: 'ホーミングミサイルを発射' },
    category: 'projectile',
    parameters: [
      p('onTick', 'skill', { en: 'Skill on tick', ja: 'ティック毎スキル' }),
      p('onHit', 'skill', { en: 'Skill on hit', ja: 'ヒット時スキル' }),
      p('onEnd', 'skill', { en: 'Skill on end', ja: '終了時スキル' }),
      p('velocity', 'number', { en: 'Velocity', ja: '速度' }, { defaultValue: 5 }),
      p(
        'maxDuration',
        'number',
        { en: 'Max duration ticks', ja: '最大持続ティック' },
        { defaultValue: 100 }
      ),
      p(
        'homingRange',
        'number',
        { en: 'Homing range', ja: 'ホーミング範囲' },
        { defaultValue: 10 }
      ),
    ],
  },
  {
    name: 'totem',
    aliases: [],
    description: {
      en: 'Creates a stationary totem that repeats a skill',
      ja: '静止トーテムを生成（スキル繰り返し）',
    },
    category: 'meta',
    parameters: [
      p('onTick', 'skill', { en: 'Skill on tick', ja: 'ティック毎スキル' }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
      p('interval', 'number', { en: 'Tick interval', ja: 'ティック間隔' }, { defaultValue: 5 }),
    ],
  },
  {
    name: 'fillChest',
    aliases: [],
    description: { en: 'Fills a chest at target location', ja: 'ターゲット位置のチェストを満たす' },
    category: 'block',
    parameters: [
      p(
        'items',
        'string',
        { en: 'Item list (comma-separated)', ja: 'アイテムリスト' },
        { required: true }
      ),
    ],
  },
  {
    name: 'explosion',
    aliases: [],
    description: { en: 'Creates an explosion at target', ja: 'ターゲット位置に爆発を生成' },
    category: 'damage',
    parameters: [
      p('yield', 'number', { en: 'Explosion power', ja: '爆発力' }, { defaultValue: 4 }),
      p('fire', 'boolean', { en: 'Causes fire', ja: '火災発生' }, { defaultValue: false }),
      p(
        'breakBlocks',
        'boolean',
        { en: 'Breaks blocks', ja: 'ブロック破壊' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'lightning',
    aliases: [],
    description: { en: 'Strikes lightning at target', ja: 'ターゲットに落雷' },
    category: 'damage',
    parameters: [p('damage', 'number', { en: 'Damage', ja: 'ダメージ' }, { defaultValue: 5 })],
  },
  {
    name: 'weather',
    aliases: [],
    description: { en: 'Changes the weather', ja: '天気を変更' },
    category: 'utility',
    parameters: [
      p(
        'type',
        'string',
        { en: 'Weather type (CLEAR/RAIN/THUNDER)', ja: '天気タイプ' },
        { required: true }
      ),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 6000 }
      ),
    ],
  },
  {
    name: 'setTime',
    aliases: [],
    description: { en: 'Sets the world time', ja: 'ワールド時間を設定' },
    category: 'utility',
    parameters: [
      p('time', 'number', { en: 'Time in ticks', ja: 'ティック時間' }, { required: true }),
    ],
  },
  {
    name: 'setGameMode',
    aliases: [],
    description: { en: 'Sets the targets game mode', ja: 'ターゲットのゲームモードを設定' },
    category: 'utility',
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
    name: 'modifyXP',
    aliases: [],
    description: { en: 'Modifies player experience points', ja: 'プレイヤー経験値を変更' },
    category: 'utility',
    parameters: [
      p('amount', 'number', { en: 'XP amount', ja: '経験値量' }, { required: true }),
      p(
        'action',
        'string',
        { en: 'Action (GIVE/TAKE/SET)', ja: 'アクション' },
        { defaultValue: 'GIVE' }
      ),
    ],
  },
  {
    name: 'setFoodLevel',
    aliases: [],
    description: { en: 'Sets player food level', ja: 'プレイヤーの食料レベルを設定' },
    category: 'utility',
    parameters: [
      p(
        'amount',
        'number',
        { en: 'Food level (0-20)', ja: '食料レベル（0-20）' },
        { required: true }
      ),
    ],
  },
  {
    name: 'setSaturation',
    aliases: [],
    description: { en: 'Sets player saturation', ja: 'プレイヤーの満腹度を設定' },
    category: 'utility',
    parameters: [p('amount', 'number', { en: 'Saturation', ja: '満腹度' }, { required: true })],
  },
];

// ─── More particle mechanics ──────────────────────

const additionalParticleMechanics: MechanicSchema[] = [
  {
    name: 'particleLine',
    aliases: ['pline'],
    description: {
      en: 'Draws a particle line to target',
      ja: 'ターゲットへのパーティクルラインを描画',
    },
    category: 'particle',
    parameters: [
      p(
        'particle',
        'particle',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true }
      ),
      p(
        'distanceBetween',
        'number',
        { en: 'Space between particles', ja: 'パーティクル間隔' },
        { defaultValue: 0.25 }
      ),
    ],
  },
  {
    name: 'particleRing',
    aliases: ['pring'],
    description: { en: 'Creates a ring of particles', ja: 'パーティクルリングを生成' },
    category: 'particle',
    parameters: [
      p(
        'particle',
        'particle',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true }
      ),
      p('radius', 'number', { en: 'Ring radius', ja: 'リング半径' }, { defaultValue: 3 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 32 }),
    ],
  },
  {
    name: 'particleSphere',
    aliases: ['psphere'],
    description: { en: 'Creates a sphere of particles', ja: 'パーティクル球体を生成' },
    category: 'particle',
    parameters: [
      p(
        'particle',
        'particle',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true }
      ),
      p('radius', 'number', { en: 'Sphere radius', ja: '球体半径' }, { defaultValue: 3 }),
      p('points', 'number', { en: 'Number of points', ja: 'ポイント数' }, { defaultValue: 50 }),
    ],
  },
  {
    name: 'particleVortex',
    aliases: ['pvortex'],
    description: {
      en: 'Creates a vortex particle effect',
      ja: '渦巻きパーティクルエフェクトを生成',
    },
    category: 'particle',
    parameters: [
      p(
        'particle',
        'particle',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true }
      ),
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 2 }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 40 }
      ),
    ],
  },
  {
    name: 'particleAtom',
    aliases: ['patom'],
    description: {
      en: 'Creates atom-like orbiting particles',
      ja: '原子軌道のようなパーティクルを生成',
    },
    category: 'particle',
    parameters: [
      p('particle', 'particle', { en: 'Nucleus particle', ja: '核パーティクル' }),
      p('orbitalParticle', 'particle', { en: 'Orbital particle', ja: '軌道パーティクル' }),
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 3 }),
      p('orbitals', 'number', { en: 'Number of orbitals', ja: '軌道数' }, { defaultValue: 3 }),
    ],
  },
];

// ─── More movement mechanics ──────────────────────

const additionalMovementMechanics: MechanicSchema[] = [
  {
    name: 'lunge',
    aliases: [],
    description: { en: 'Short forward lunge', ja: '短い前方突進' },
    category: 'movement',
    parameters: [
      p('velocity', 'number', { en: 'Velocity', ja: '速度' }, { defaultValue: 1 }),
      p('yVelocity', 'number', { en: 'Y velocity', ja: 'Y速度' }, { defaultValue: 0.2 }),
    ],
  },
  {
    name: 'dash',
    aliases: [],
    description: { en: 'Quick dash to target', ja: 'ターゲットへのクイックダッシュ' },
    category: 'movement',
    parameters: [
      p('speed', 'number', { en: 'Dash speed', ja: 'ダッシュ速度' }, { defaultValue: 1.5 }),
      p('yOffset', 'number', { en: 'Y offset', ja: 'Yオフセット' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'pathfindTo',
    aliases: [],
    description: { en: 'Pathfinds to target location', ja: 'ターゲット位置へパスファインド' },
    category: 'movement',
    parameters: [p('speed', 'number', { en: 'Speed', ja: '速度' }, { defaultValue: 1 })],
  },
  {
    name: 'setVelocity',
    aliases: [],
    description: { en: 'Sets exact velocity', ja: '正確な速度を設定' },
    category: 'movement',
    parameters: [
      p('x', 'number', { en: 'X velocity', ja: 'X速度' }, { defaultValue: 0 }),
      p('y', 'number', { en: 'Y velocity', ja: 'Y速度' }, { defaultValue: 0 }),
      p('z', 'number', { en: 'Z velocity', ja: 'Z速度' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'bounce',
    aliases: [],
    description: { en: 'Makes entity bounce', ja: 'エンティティをバウンドさせる' },
    category: 'movement',
    parameters: [
      p('height', 'number', { en: 'Bounce height', ja: 'バウンド高度' }, { defaultValue: 0.5 }),
    ],
  },
];

// ─── Potion mechanics (additional) ────────────────

const additionalPotionMechanics: MechanicSchema[] = [
  {
    name: 'removePotionEffect',
    aliases: ['removePotion'],
    description: { en: 'Removes a potion effect', ja: 'ポーション効果を削除' },
    category: 'potion',
    parameters: [
      p('type', 'potion-effect', { en: 'Effect type', ja: '効果タイプ' }, { required: true }),
    ],
  },
  {
    name: 'clearPotionEffects',
    aliases: ['clearPotions'],
    description: { en: 'Clears all potion effects', ja: '全ポーション効果をクリア' },
    category: 'potion',
    parameters: [],
  },
  {
    name: 'hunger',
    aliases: [],
    description: { en: 'Applies hunger potion effect', ja: '空腹ポーション効果を付与' },
    category: 'potion',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('amplifier', 'number', { en: 'Amplifier', ja: '増幅値' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'nausea',
    aliases: [],
    description: { en: 'Applies nausea effect', ja: '吐き気効果を付与' },
    category: 'potion',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
    ],
  },
  {
    name: 'wither',
    aliases: [],
    description: { en: 'Applies wither effect', ja: 'ウィザー効果を付与' },
    category: 'potion',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('amplifier', 'number', { en: 'Amplifier', ja: '増幅値' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'levitate',
    aliases: [],
    description: { en: 'Applies levitation effect', ja: '浮遊効果を付与' },
    category: 'potion',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('amplifier', 'number', { en: 'Amplifier', ja: '増幅値' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'darkness',
    aliases: [],
    description: { en: 'Applies darkness effect', ja: '暗闇効果を付与' },
    category: 'potion',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
    ],
  },
];

// ─── Spawn mechanics ──────────────────────────────

const spawnMechanics: MechanicSchema[] = [
  {
    name: 'summon',
    aliases: ['spawnMob'],
    description: { en: 'Summons a MythicMobs mob', ja: 'MythicMobsモブを召喚' },
    category: 'spawn',
    parameters: [
      p('type', 'string', { en: 'Mob type', ja: 'モブタイプ' }, { required: true }),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
      p('level', 'number', { en: 'Level', ja: 'レベル' }),
      p('radius', 'number', { en: 'Spread radius', ja: '拡散半径' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'spawnEntity',
    aliases: [],
    description: {
      en: 'Spawns a vanilla entity',
      ja: 'バニラエンティティをスポーン',
    },
    category: 'spawn',
    parameters: [
      p('type', 'entity-type', { en: 'Entity type', ja: 'エンティティタイプ' }, { required: true }),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'spawnParticle',
    aliases: [],
    description: { en: 'Spawns particles at target', ja: 'ターゲットにパーティクルをスポーン' },
    category: 'particle',
    parameters: [
      p(
        'particle',
        'particle',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true }
      ),
      p('amount', 'number', { en: 'Amount', ja: '数量' }, { defaultValue: 10 }),
      p('speed', 'number', { en: 'Speed', ja: '速度' }, { defaultValue: 0 }),
      p('xOffset', 'number', { en: 'X spread', ja: 'X拡散' }, { defaultValue: 0 }),
      p('yOffset', 'number', { en: 'Y spread', ja: 'Y拡散' }, { defaultValue: 0 }),
      p('zOffset', 'number', { en: 'Z spread', ja: 'Z拡散' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'spawnFirework',
    aliases: [],
    description: { en: 'Spawns a firework at target', ja: 'ターゲットに花火をスポーン' },
    category: 'spawn',
    parameters: [
      p(
        'type',
        'string',
        { en: 'Firework type (BALL/BALL_LARGE/STAR/BURST/CREEPER)', ja: '花火タイプ' },
        { defaultValue: 'BALL' }
      ),
      p('colors', 'string', { en: 'Colors (comma-separated)', ja: '色（カンマ区切り）' }),
      p('fadeColors', 'string', { en: 'Fade colors', ja: 'フェード色' }),
      p('power', 'number', { en: 'Firework power', ja: '花火パワー' }, { defaultValue: 1 }),
      p('flicker', 'boolean', { en: 'Has flicker', ja: '点滅あり' }, { defaultValue: false }),
      p('trail', 'boolean', { en: 'Has trail', ja: 'トレイルあり' }, { defaultValue: false }),
    ],
  },
];

// ─── Aggro mechanics ──────────────────────────────

const aggroMechanics: MechanicSchema[] = [
  {
    name: 'taunt',
    aliases: [],
    description: { en: 'Taunts the target to attack caster', ja: 'ターゲットをキャスターに挑発' },
    category: 'aggro',
    parameters: [],
  },
  {
    name: 'threatModify',
    aliases: [],
    description: { en: 'Modifies threat value on target', ja: 'ターゲットの脅威値を変更' },
    category: 'aggro',
    parameters: [p('amount', 'number', { en: 'Threat amount', ja: '脅威量' }, { required: true })],
  },
  {
    name: 'atkSpeed',
    aliases: [],
    description: { en: 'Modifies attack speed attribute', ja: '攻撃速度属性を変更' },
    category: 'entity',
    parameters: [
      p('amount', 'number', { en: 'Speed modifier', ja: '速度修正値' }, { required: true }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
    ],
  },
];

// ─── Healing / damage extra mechanics ─────────────

const healingDamageMechanics: MechanicSchema[] = [
  {
    name: 'healPercent',
    aliases: [],
    description: { en: 'Heals a percentage of max health', ja: '最大HPの割合を回復' },
    category: 'healing',
    parameters: [
      p(
        'amount',
        'number',
        { en: 'Percent (0-1)', ja: '割合（0-1）' },
        { required: true, defaultValue: 0.1 }
      ),
    ],
  },
  {
    name: 'damagePercent',
    aliases: [],
    description: { en: 'Deals damage as percentage of max health', ja: '最大HPの割合ダメージ' },
    category: 'damage',
    parameters: [
      p(
        'amount',
        'number',
        { en: 'Percent (0-1)', ja: '割合（0-1）' },
        { required: true, defaultValue: 0.1 }
      ),
    ],
  },
  {
    name: 'trueDamage',
    aliases: [],
    description: { en: 'Deals unblockable true damage', ja: 'ブロック不可のトゥルーダメージ' },
    category: 'damage',
    parameters: [
      p('amount', 'number', { en: 'Damage amount', ja: 'ダメージ量' }, { required: true }),
    ],
  },
  {
    name: 'drainHealth',
    aliases: ['vampirism'],
    description: { en: 'Drains health from target and heals caster', ja: 'ターゲットからHPを吸収' },
    category: 'damage',
    parameters: [
      p('amount', 'number', { en: 'Damage amount', ja: 'ダメージ量' }, { required: true }),
      p('healPercent', 'number', { en: 'Heal percentage', ja: '回復割合' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'setAbsorption',
    aliases: [],
    description: { en: 'Sets absorption hearts', ja: '吸収HPを設定' },
    category: 'healing',
    parameters: [
      p('amount', 'number', { en: 'Absorption hearts', ja: '吸収HP' }, { required: true }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 200 }
      ),
    ],
  },
  {
    name: 'setMaxHealth',
    aliases: [],
    description: { en: 'Sets max health of entity', ja: 'エンティティの最大HPを設定' },
    category: 'healing',
    parameters: [p('amount', 'number', { en: 'Max health', ja: '最大HP' }, { required: true })],
  },
  {
    name: 'heal',
    aliases: [],
    description: { en: 'Heals a flat amount of health', ja: '固定量のHPを回復' },
    category: 'healing',
    parameters: [p('amount', 'number', { en: 'Heal amount', ja: '回復量' }, { required: true })],
  },
];

// ─── More effect mechanics ────────────────────────

const moreEffectMechanics: MechanicSchema[] = [
  {
    name: 'playAnimation',
    aliases: [],
    description: { en: 'Plays an entity animation', ja: 'エンティティアニメーションを再生' },
    category: 'effect',
    parameters: [
      p(
        'animation',
        'string',
        { en: 'Animation name', ja: 'アニメーション名' },
        { required: true }
      ),
    ],
  },
  {
    name: 'cameraShake',
    aliases: [],
    description: { en: 'Shakes the players camera', ja: 'プレイヤーのカメラを揺らす' },
    category: 'effect',
    parameters: [
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 20 }
      ),
      p('amplitude', 'number', { en: 'Shake amplitude', ja: '揺れ振幅' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'smoke',
    aliases: [],
    description: { en: 'Creates smoke particles', ja: '煙パーティクルを生成' },
    category: 'effect',
    parameters: [
      p('amount', 'number', { en: 'Particle count', ja: 'パーティクル数' }, { defaultValue: 20 }),
    ],
  },
  {
    name: 'flames',
    aliases: [],
    description: { en: 'Creates flame particles', ja: '炎パーティクルを生成' },
    category: 'effect',
    parameters: [
      p('amount', 'number', { en: 'Particle count', ja: 'パーティクル数' }, { defaultValue: 20 }),
    ],
  },
  {
    name: 'ender',
    aliases: [],
    description: {
      en: 'Creates ender teleport particles',
      ja: 'エンダーテレポートパーティクルを生成',
    },
    category: 'effect',
    parameters: [
      p('amount', 'number', { en: 'Particle count', ja: 'パーティクル数' }, { defaultValue: 20 }),
    ],
  },
  {
    name: 'bloodSplash',
    aliases: [],
    description: { en: 'Creates blood splash effect', ja: '血飛沫エフェクトを生成' },
    category: 'effect',
    parameters: [],
  },
  {
    name: 'blockMask',
    aliases: [],
    description: {
      en: 'Masks a block as another material temporarily',
      ja: 'ブロックを一時的に別の素材に偽装',
    },
    category: 'block',
    parameters: [
      p('material', 'material', { en: 'Mask material', ja: '偽装素材' }, { required: true }),
      p(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック' },
        { defaultValue: 100 }
      ),
      p('radius', 'number', { en: 'Radius', ja: '半径' }, { defaultValue: 5 }),
    ],
  },
  {
    name: 'setArmorStandPose',
    aliases: [],
    description: { en: 'Sets armor stand pose angles', ja: 'アーマースタンドのポーズ角度を設定' },
    category: 'entity',
    parameters: [
      p(
        'part',
        'string',
        { en: 'Body part (HEAD/BODY/LEFT_ARM/RIGHT_ARM/LEFT_LEG/RIGHT_LEG)', ja: 'ボディパーツ' },
        { required: true }
      ),
      p('x', 'number', { en: 'X angle', ja: 'X角度' }, { defaultValue: 0 }),
      p('y', 'number', { en: 'Y angle', ja: 'Y角度' }, { defaultValue: 0 }),
      p('z', 'number', { en: 'Z angle', ja: 'Z角度' }, { defaultValue: 0 }),
    ],
  },
];

// ─── Teleport / mount mechanics ───────────────────

const teleportMountMechanics: MechanicSchema[] = [
  {
    name: 'teleportTo',
    aliases: ['tp'],
    description: { en: 'Teleports caster to target', ja: 'キャスターをターゲットにテレポート' },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'teleportHere',
    aliases: [],
    description: { en: 'Teleports target to caster', ja: 'ターゲットをキャスターにテレポート' },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'swap',
    aliases: [],
    description: {
      en: 'Swaps positions of caster and target',
      ja: 'キャスターとターゲットの位置を入れ替え',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'mount',
    aliases: [],
    description: {
      en: 'Makes the target mount the caster',
      ja: 'ターゲットをキャスターに騎乗させる',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'dismount',
    aliases: [],
    description: { en: 'Dismounts entity from vehicle', ja: 'エンティティを乗り物から降ろす' },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'eject',
    aliases: [],
    description: { en: 'Ejects passengers', ja: '乗客を排出' },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'leap',
    aliases: [],
    description: {
      en: 'Leaps toward target with velocity',
      ja: '速度を持ってターゲットに飛びかかる',
    },
    category: 'movement',
    parameters: [
      p('velocity', 'number', { en: 'Leap velocity', ja: '跳躍速度' }, { defaultValue: 1 }),
      p('yVelocity', 'number', { en: 'Vertical velocity', ja: '垂直速度' }, { defaultValue: 0.5 }),
    ],
  },
  {
    name: 'spring',
    aliases: [],
    description: { en: 'Launches entity into the air', ja: 'エンティティを空中に発射' },
    category: 'movement',
    parameters: [
      p('velocity', 'number', { en: 'Launch velocity', ja: '発射速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'pull',
    aliases: [],
    description: { en: 'Pulls target toward caster', ja: 'ターゲットをキャスターに引き寄せる' },
    category: 'movement',
    parameters: [
      p('velocity', 'number', { en: 'Pull velocity', ja: '引き寄せ速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'push',
    aliases: ['throw'],
    description: { en: 'Pushes target away from caster', ja: 'ターゲットをキャスターから押し出す' },
    category: 'movement',
    parameters: [
      p('velocity', 'number', { en: 'Push velocity', ja: '押し出し速度' }, { defaultValue: 1 }),
      p('yVelocity', 'number', { en: 'Vertical velocity', ja: '垂直速度' }, { defaultValue: 0.2 }),
    ],
  },
  {
    name: 'rally',
    aliases: [],
    description: {
      en: 'Rallies all nearby MythicMobs to target',
      ja: '近くのMythicMobs全てをターゲットに集合',
    },
    category: 'ai',
    parameters: [
      p('radius', 'number', { en: 'Rally radius', ja: '集合半径' }, { defaultValue: 20 }),
    ],
  },
  {
    name: 'runSkillSequence',
    aliases: [],
    description: { en: 'Runs skills in sequential order', ja: 'スキルを順番に実行' },
    category: 'meta',
    parameters: [
      p(
        'skills',
        'string',
        { en: 'Skill list (comma-separated)', ja: 'スキルリスト（カンマ区切り）' },
        { required: true }
      ),
      p(
        'interval',
        'number',
        { en: 'Interval between skills (ticks)', ja: 'スキル間隔（ティック）' },
        { defaultValue: 0 }
      ),
    ],
  },
];

export const PHASE3_MECHANIC_REGISTRY: MechanicSchema[] = [
  ...soundMechanics,
  ...variableMechanics,
  ...scoreboardMechanics,
  ...aiMechanics,
  ...displayMechanics,
  ...bossBarMechanics,
  ...additionalPlayerUIMechanics,
  ...additionalBlockMechanics,
  ...additionalItemMechanics,
  ...entityMechanics,
  ...additionalUtilityMechanics,
  ...additionalParticleMechanics,
  ...additionalMovementMechanics,
  ...additionalPotionMechanics,
  ...spawnMechanics,
  ...aggroMechanics,
  ...healingDamageMechanics,
  ...moreEffectMechanics,
  ...teleportMountMechanics,
];
