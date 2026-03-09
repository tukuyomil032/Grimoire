import type { MechanicSchema, ParameterSchema } from '@/models/mechanic';

/**
 * Core MythicMobs mechanics schema registry.
 * Phase 1 MVP: ~50 most commonly used mechanics.
 */

function param(
  name: string,
  type: ParameterSchema['type'],
  desc: Record<string, string>,
  opts?: Partial<ParameterSchema>
): ParameterSchema {
  return { name, type, description: desc, required: false, ...opts };
}

// --- Damage mechanics ---
const damageMechanics: MechanicSchema[] = [
  {
    name: 'damage',
    aliases: ['d'],
    description: { en: 'Deals damage to the target', ja: 'ターゲットにダメージを与える' },
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
      param(
        'preventKnockback',
        'boolean',
        { en: 'No knockback', ja: 'ノックバック無効' },
        { defaultValue: false }
      ),
      param(
        'preventImmunity',
        'boolean',
        { en: 'Bypass invulnerability frames', ja: '無敵フレーム無視' },
        { defaultValue: false }
      ),
      param('element', 'string', { en: 'Damage element type', ja: 'ダメージ属性タイプ' }),
    ],
  },
  {
    name: 'damagePercent',
    aliases: [],
    description: { en: 'Deals percent of max health as damage', ja: '最大HPの割合ダメージ' },
    category: 'damage',
    parameters: [
      param(
        'percent',
        'number',
        { en: 'Percentage of max health', ja: '最大HPの割合' },
        { defaultValue: 10, required: true }
      ),
    ],
  },
  {
    name: 'heal',
    aliases: ['h'],
    description: { en: 'Heals the target', ja: 'ターゲットを回復する' },
    category: 'damage',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Heal amount', ja: '回復量' },
        { defaultValue: 1, required: true }
      ),
      param(
        'overheal',
        'boolean',
        { en: 'Allow healing above max health', ja: '最大HP超過許可' },
        { defaultValue: false }
      ),
    ],
  },
];

// --- Movement mechanics ---
const movementMechanics: MechanicSchema[] = [
  {
    name: 'leap',
    aliases: [],
    description: {
      en: 'Causes the caster to leap towards the target',
      ja: 'キャスターがターゲットに向かって跳躍',
    },
    category: 'movement',
    parameters: [
      param(
        'velocity',
        'number',
        { en: 'Velocity of the leap', ja: '跳躍速度' },
        { defaultValue: 1 }
      ),
      param(
        'noise',
        'number',
        { en: 'Random noise applied to direction', ja: '方向のランダムノイズ' },
        { defaultValue: 0 }
      ),
    ],
  },
  {
    name: 'teleport',
    aliases: ['tp'],
    description: {
      en: 'Teleports the caster to the target location',
      ja: 'キャスターをターゲット位置にテレポート',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'velocity',
    aliases: ['v'],
    description: { en: 'Sets the velocity of the target', ja: 'ターゲットの速度を設定' },
    category: 'movement',
    parameters: [
      param('x', 'number', { en: 'X velocity', ja: 'X速度' }, { defaultValue: 0 }),
      param('y', 'number', { en: 'Y velocity', ja: 'Y速度' }, { defaultValue: 0 }),
      param('z', 'number', { en: 'Z velocity', ja: 'Z速度' }, { defaultValue: 0 }),
      param(
        'relative',
        'boolean',
        { en: 'Relative to current velocity', ja: '現在の速度に相対的' },
        { defaultValue: false }
      ),
    ],
  },
  {
    name: 'pull',
    aliases: [],
    description: {
      en: 'Pulls the target toward the caster',
      ja: 'ターゲットをキャスターに引き寄せる',
    },
    category: 'movement',
    parameters: [
      param('speed', 'number', { en: 'Pull speed', ja: '引き寄せ速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'throw',
    aliases: [],
    description: {
      en: 'Throws the target away from the caster',
      ja: 'ターゲットをキャスターから投げ飛ばす',
    },
    category: 'movement',
    parameters: [
      param('speed', 'number', { en: 'Throw speed', ja: '投げ飛ばし速度' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'lunge',
    aliases: [],
    description: {
      en: 'Lunges forward in the direction the mob is facing',
      ja: 'モブの向いている方向に突進',
    },
    category: 'movement',
    parameters: [
      param('velocity', 'number', { en: 'Lunge velocity', ja: '突進速度' }, { defaultValue: 1 }),
      param(
        'yVelocity',
        'number',
        { en: 'Vertical velocity', ja: '垂直速度' },
        { defaultValue: 0.2 }
      ),
    ],
  },
];

// --- Effect mechanics ---
const effectMechanics: MechanicSchema[] = [
  {
    name: 'effect:particles',
    aliases: ['e:p', 'particles'],
    description: { en: 'Plays particle effects at target', ja: 'ターゲットにパーティクルを再生' },
    category: 'effect',
    parameters: [
      param(
        'particle',
        'string',
        { en: 'Particle type', ja: 'パーティクルタイプ' },
        { required: true, defaultValue: 'FLAME' }
      ),
      param(
        'amount',
        'number',
        { en: 'Number of particles', ja: 'パーティクル数' },
        { defaultValue: 10 }
      ),
      param(
        'hSpread',
        'number',
        { en: 'Horizontal spread', ja: '水平拡散' },
        { defaultValue: 0.25 }
      ),
      param('vSpread', 'number', { en: 'Vertical spread', ja: '垂直拡散' }, { defaultValue: 0.25 }),
      param(
        'speed',
        'number',
        { en: 'Particle speed', ja: 'パーティクル速度' },
        { defaultValue: 0 }
      ),
      param('yOffset', 'number', { en: 'Y offset', ja: 'Yオフセット' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'effect:sound',
    aliases: ['e:s', 'sound'],
    description: { en: 'Plays a sound at target location', ja: 'ターゲット位置でサウンドを再生' },
    category: 'effect',
    parameters: [
      param('sound', 'string', { en: 'Sound name', ja: 'サウンド名' }, { required: true }),
      param('volume', 'number', { en: 'Volume', ja: '音量' }, { defaultValue: 1 }),
      param('pitch', 'number', { en: 'Pitch', ja: 'ピッチ' }, { defaultValue: 1 }),
    ],
  },
  {
    name: 'effect:explosion',
    aliases: ['e:explosion'],
    description: { en: 'Creates an explosion effect', ja: '爆発エフェクトを生成' },
    category: 'effect',
    parameters: [],
  },
  {
    name: 'effect:lightning',
    aliases: ['e:lightning'],
    description: { en: 'Strikes lightning at target', ja: 'ターゲットに雷撃' },
    category: 'effect',
    parameters: [],
  },
];

// --- Potion mechanics ---
const potionMechanics: MechanicSchema[] = [
  {
    name: 'potion',
    aliases: [],
    description: {
      en: 'Applies a potion effect to the target',
      ja: 'ターゲットにポーション効果を付与',
    },
    category: 'potion',
    parameters: [
      param(
        'type',
        'string',
        { en: 'Potion effect type', ja: 'ポーション効果タイプ' },
        { required: true, defaultValue: 'SLOW' }
      ),
      param(
        'duration',
        'number',
        { en: 'Duration in ticks', ja: '持続時間（ティック）' },
        { defaultValue: 100 }
      ),
      param(
        'level',
        'number',
        { en: 'Potion level (0-based)', ja: 'ポーションレベル（0起算）' },
        { defaultValue: 0 }
      ),
      param(
        'hasParticles',
        'boolean',
        { en: 'Show particles', ja: 'パーティクル表示' },
        { defaultValue: true }
      ),
    ],
  },
  {
    name: 'removePotion',
    aliases: [],
    description: {
      en: 'Removes a potion effect from the target',
      ja: 'ターゲットからポーション効果を除去',
    },
    category: 'potion',
    parameters: [
      param(
        'type',
        'string',
        { en: 'Potion effect type to remove', ja: '除去するポーション効果タイプ' },
        { required: true }
      ),
    ],
  },
];

// --- Projectile mechanics ---
const projectileMechanics: MechanicSchema[] = [
  {
    name: 'projectile',
    aliases: [],
    description: { en: 'Creates a meta-projectile', ja: 'メタプロジェクタイルを生成' },
    category: 'projectile',
    parameters: [
      param('onTick', 'skill', { en: 'Skill to run each tick', ja: 'ティック毎に実行するスキル' }),
      param('onHit', 'skill', { en: 'Skill to run on hit', ja: '命中時に実行するスキル' }),
      param('onEnd', 'skill', {
        en: 'Skill to run when projectile ends',
        ja: 'プロジェクタイル終了時スキル',
      }),
      param(
        'velocity',
        'number',
        { en: 'Projectile velocity', ja: 'プロジェクタイル速度' },
        { defaultValue: 5 }
      ),
      param(
        'maxDuration',
        'number',
        { en: 'Max duration in ticks', ja: '最大持続時間（ティック）' },
        { defaultValue: 100 }
      ),
      param(
        'accuracy',
        'number',
        { en: 'Projectile accuracy (0-1)', ja: '精度（0-1）' },
        { defaultValue: 1 }
      ),
      param('interval', 'number', { en: 'Tick interval', ja: 'ティック間隔' }, { defaultValue: 1 }),
      param(
        'hitRadius',
        'number',
        { en: 'Hit detection radius', ja: '命中検知半径' },
        { defaultValue: 1 }
      ),
      param(
        'verticalHitRadius',
        'number',
        { en: 'Vertical hit detection radius', ja: '垂直命中検知半径' },
        { defaultValue: 1 }
      ),
      param(
        'stopAtEntity',
        'boolean',
        { en: 'Stop at entity', ja: 'エンティティで停止' },
        { defaultValue: true }
      ),
      param(
        'stopAtBlock',
        'boolean',
        { en: 'Stop at block', ja: 'ブロックで停止' },
        { defaultValue: true }
      ),
      param(
        'hugSurface',
        'boolean',
        { en: 'Hug surface (ground level)', ja: '地面に沿う' },
        { defaultValue: false }
      ),
    ],
  },
  {
    name: 'missile',
    aliases: [],
    description: { en: 'Creates a homing missile', ja: '追尾ミサイルを生成' },
    category: 'projectile',
    parameters: [
      param('onTick', 'skill', { en: 'Skill to run each tick', ja: 'ティック毎に実行するスキル' }),
      param('onHit', 'skill', { en: 'Skill to run on hit', ja: '命中時に実行するスキル' }),
      param('onEnd', 'skill', { en: 'Skill when missile ends', ja: 'ミサイル終了時スキル' }),
      param(
        'velocity',
        'number',
        { en: 'Missile velocity', ja: 'ミサイル速度' },
        { defaultValue: 5 }
      ),
      param(
        'maxDuration',
        'number',
        { en: 'Max duration in ticks', ja: '最大持続時間（ティック）' },
        { defaultValue: 100 }
      ),
      param('inertia', 'number', { en: 'Inertia (0-1)', ja: '慣性（0-1）' }, { defaultValue: 0.5 }),
    ],
  },
  {
    name: 'shoot',
    aliases: [],
    description: { en: 'Shoots a vanilla Minecraft projectile', ja: 'バニラMinecraftの射撃' },
    category: 'projectile',
    parameters: [
      param(
        'type',
        'string',
        { en: 'Projectile type (arrow, fireball, etc.)', ja: '射撃タイプ（arrow, fireball等）' },
        { required: true, defaultValue: 'arrow' }
      ),
      param('velocity', 'number', { en: 'Velocity', ja: '速度' }, { defaultValue: 1 }),
      param('spread', 'number', { en: 'Spread amount', ja: '拡散量' }, { defaultValue: 0 }),
    ],
  },
];

// --- Meta / flow control ---
const metaMechanics: MechanicSchema[] = [
  {
    name: 'skill',
    aliases: ['metaskill', 'runSkill'],
    description: { en: 'Runs another skill', ja: '別のスキルを実行' },
    category: 'meta',
    parameters: [
      param('skill', 'skill', { en: 'Skill to execute', ja: '実行するスキル' }, { required: true }),
    ],
  },
  {
    name: 'delay',
    aliases: [],
    description: { en: 'Delays the next mechanic in the skill', ja: '次のメカニクスを遅延' },
    category: 'meta',
    parameters: [
      param(
        'ticks',
        'number',
        { en: 'Delay in ticks', ja: '遅延ティック数' },
        { defaultValue: 1, required: true }
      ),
    ],
  },
  {
    name: 'repeat',
    aliases: [],
    description: { en: 'Repeats a skill n times', ja: 'スキルをn回繰り返す' },
    category: 'meta',
    parameters: [
      param('skill', 'skill', { en: 'Skill to repeat', ja: '繰り返すスキル' }, { required: true }),
      param(
        'amount',
        'number',
        { en: 'Number of repetitions', ja: '繰り返し回数' },
        { defaultValue: 3 }
      ),
      param(
        'interval',
        'number',
        { en: 'Interval between repeats (ticks)', ja: '繰り返し間隔（ティック）' },
        { defaultValue: 0 }
      ),
    ],
  },
  {
    name: 'message',
    aliases: ['msg'],
    description: { en: 'Sends a message to the target', ja: 'ターゲットにメッセージ送信' },
    category: 'utility',
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
    name: 'command',
    aliases: ['cmd'],
    description: { en: 'Runs a command as the target', ja: 'ターゲットとしてコマンド実行' },
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
    name: 'sudoSkill',
    aliases: [],
    description: { en: 'Makes the target cast a skill', ja: 'ターゲットにスキルを発動させる' },
    category: 'meta',
    parameters: [
      param('skill', 'skill', { en: 'Skill to cast', ja: '発動するスキル' }, { required: true }),
    ],
  },
];

// --- Aggro / Threat mechanics ---
const aggroMechanics: MechanicSchema[] = [
  {
    name: 'threat',
    aliases: [],
    description: { en: 'Modifies threat on a target', ja: 'ターゲットの脅威値を変更' },
    category: 'aggro',
    parameters: [
      param(
        'amount',
        'number',
        { en: 'Threat amount', ja: '脅威値' },
        { defaultValue: 1, required: true }
      ),
    ],
  },
  {
    name: 'taunt',
    aliases: [],
    description: { en: 'Forces mob to target the trigger', ja: 'モブにトリガーをターゲットさせる' },
    category: 'aggro',
    parameters: [],
  },
];

// --- Spawn mechanics ---
const spawnMechanics: MechanicSchema[] = [
  {
    name: 'summon',
    aliases: [],
    description: {
      en: 'Summons a MythicMobs mob at target location',
      ja: 'ターゲット位置にMythicMobsモブを召喚',
    },
    category: 'spawn',
    parameters: [
      param(
        'type',
        'string',
        { en: 'MythicMobs mob type', ja: 'MythicMobsモブタイプ' },
        { required: true }
      ),
      param('amount', 'number', { en: 'Number to summon', ja: '召喚数' }, { defaultValue: 1 }),
      param('radius', 'number', { en: 'Spawn radius', ja: 'スポーン半径' }, { defaultValue: 0 }),
    ],
  },
  {
    name: 'remove',
    aliases: [],
    description: { en: 'Removes the target mob', ja: 'ターゲットモブを除去' },
    category: 'spawn',
    parameters: [],
  },
];

// --- Misc / Utility mechanics ---
const utilityMechanics: MechanicSchema[] = [
  {
    name: 'setVariable',
    aliases: ['setVar'],
    description: {
      en: 'Sets a variable on the caster/target',
      ja: 'キャスター/ターゲットに変数を設定',
    },
    category: 'variable',
    parameters: [
      param(
        'variable',
        'string',
        { en: 'Variable name (scope.name)', ja: '変数名（scope.name）' },
        { required: true }
      ),
      param('value', 'string', { en: 'Value to set', ja: '設定する値' }, { required: true }),
    ],
  },
  {
    name: 'signal',
    aliases: [],
    description: { en: 'Sends a signal to a mob', ja: 'モブにシグナルを送信' },
    category: 'utility',
    parameters: [
      param('signal', 'string', { en: 'Signal name', ja: 'シグナル名' }, { required: true }),
    ],
  },
  {
    name: 'modifyScore',
    aliases: [],
    description: { en: 'Modifies a scoreboard value', ja: 'スコアボード値を変更' },
    category: 'utility',
    parameters: [
      param(
        'objective',
        'string',
        { en: 'Objective name', ja: 'オブジェクティブ名' },
        { required: true }
      ),
      param('value', 'number', { en: 'Value to add', ja: '追加する値' }, { defaultValue: 1 }),
      param(
        'action',
        'string',
        { en: 'SET, ADD, or SUBTRACT', ja: 'SET, ADD, SUBTRACT' },
        { defaultValue: 'ADD' }
      ),
    ],
  },
  {
    name: 'setLevel',
    aliases: [],
    description: { en: 'Sets the mob level', ja: 'モブレベルを設定' },
    category: 'utility',
    parameters: [param('level', 'number', { en: 'Level', ja: 'レベル' }, { required: true })],
  },
  {
    name: 'modifyGlobalScore',
    aliases: [],
    description: { en: 'Modifies a global scoreboard value', ja: 'グローバルスコアボード値を変更' },
    category: 'utility',
    parameters: [
      param(
        'objective',
        'string',
        { en: 'Objective name', ja: 'オブジェクティブ名' },
        { required: true }
      ),
      param('value', 'number', { en: 'Value', ja: '値' }, { defaultValue: 1 }),
      param(
        'action',
        'string',
        { en: 'SET, ADD, or SUBTRACT', ja: 'SET, ADD, SUBTRACT' },
        { defaultValue: 'ADD' }
      ),
    ],
  },
  {
    name: 'disguise',
    aliases: [],
    description: { en: 'Disguises the mob', ja: 'モブを変装させる' },
    category: 'display',
    parameters: [
      param('disguise', 'string', { en: 'Disguise string', ja: '変装文字列' }, { required: true }),
    ],
  },
  {
    name: 'setName',
    aliases: [],
    description: { en: 'Sets the mob display name', ja: 'モブの表示名を設定' },
    category: 'display',
    parameters: [param('name', 'string', { en: 'Display name', ja: '表示名' }, { required: true })],
  },
  {
    name: 'ignite',
    aliases: [],
    description: { en: 'Sets the target on fire', ja: 'ターゲットに着火' },
    category: 'damage',
    parameters: [
      param(
        'ticks',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック数' },
        { defaultValue: 60 }
      ),
    ],
  },
  {
    name: 'freeze',
    aliases: [],
    description: {
      en: 'Freezes the target (powder snow effect)',
      ja: 'ターゲットを凍結（粉雪エフェクト）',
    },
    category: 'damage',
    parameters: [
      param(
        'ticks',
        'number',
        { en: 'Duration in ticks', ja: '持続ティック数' },
        { defaultValue: 100 }
      ),
    ],
  },
  {
    name: 'setAI',
    aliases: [],
    description: { en: 'Enables or disables mob AI', ja: 'モブAIの有効/無効' },
    category: 'utility',
    parameters: [
      param('ai', 'boolean', { en: 'AI enabled', ja: 'AI有効' }, { defaultValue: true }),
    ],
  },
  {
    name: 'mount',
    aliases: [],
    description: {
      en: 'Mounts the caster on the target',
      ja: 'キャスターをターゲットに騎乗させる',
    },
    category: 'movement',
    parameters: [],
  },
  {
    name: 'dismount',
    aliases: [],
    description: { en: 'Dismounts the caster', ja: 'キャスターを降車させる' },
    category: 'movement',
    parameters: [],
  },
];

/**
 * Complete registry of all core mechanics.
 */
export const MECHANIC_REGISTRY: MechanicSchema[] = [
  ...damageMechanics,
  ...movementMechanics,
  ...effectMechanics,
  ...potionMechanics,
  ...projectileMechanics,
  ...metaMechanics,
  ...aggroMechanics,
  ...spawnMechanics,
  ...utilityMechanics,
];

/**
 * Lookup mechanic by name or alias.
 */
export function findMechanic(nameOrAlias: string): MechanicSchema | undefined {
  const lower = nameOrAlias.toLowerCase();
  return MECHANIC_REGISTRY.find(
    (m) => m.name.toLowerCase() === lower || m.aliases.some((a) => a.toLowerCase() === lower)
  );
}

/**
 * Get mechanics grouped by category.
 */
export function getMechanicsByCategory(): Record<string, MechanicSchema[]> {
  const grouped: Record<string, MechanicSchema[]> = {};
  for (const mech of MECHANIC_REGISTRY) {
    if (!grouped[mech.category]) {
      grouped[mech.category] = [];
    }
    grouped[mech.category].push(mech);
  }
  return grouped;
}
