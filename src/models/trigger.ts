export interface TriggerSchema {
  name: string;
  aliases: string[];
  description: Record<string, string>;
  hasParameter?: boolean;
  parameterDescription?: Record<string, string>;
}

export const TRIGGER_LIST: TriggerSchema[] = [
  {
    name: 'onCombat',
    aliases: [],
    description: {
      en: 'Default combat trigger (attack/damaged/spawn/death)',
      ja: 'デフォルト戦闘トリガー（攻撃/被ダメ/スポーン/死亡）',
    },
  },
  {
    name: 'onAttack',
    aliases: [],
    description: { en: 'When the mob attacks', ja: 'モブが攻撃した時' },
  },
  {
    name: 'onDamaged',
    aliases: [],
    description: { en: 'When the mob takes damage', ja: 'モブがダメージを受けた時' },
  },
  {
    name: 'onSpawn',
    aliases: [],
    description: { en: 'When the mob spawns', ja: 'モブがスポーンした時' },
  },
  {
    name: 'onDespawn',
    aliases: [],
    description: { en: 'When the mob despawns', ja: 'モブがデスポーンした時' },
  },
  {
    name: 'onReady',
    aliases: [],
    description: { en: 'When first spawned from a spawner', ja: 'スポナーから初回スポーン時' },
  },
  {
    name: 'onLoad',
    aliases: [],
    description: { en: 'When loaded after server restart', ja: 'サーバー再起動後にロードされた時' },
  },
  {
    name: 'onSpawnOrLoad',
    aliases: [],
    description: { en: 'On spawn or load', ja: 'スポーンまたはロード時' },
  },
  {
    name: 'onDeath',
    aliases: [],
    description: { en: 'When the mob dies', ja: 'モブが死亡した時' },
  },
  {
    name: 'onTimer',
    aliases: [],
    description: { en: 'Every N ticks', ja: 'Nティックごと' },
    hasParameter: true,
    parameterDescription: { en: 'Interval in ticks', ja: 'ティック単位の間隔' },
  },
  {
    name: 'onInteract',
    aliases: [],
    description: { en: 'When right-clicked', ja: '右クリックされた時' },
  },
  {
    name: 'onPlayerKill',
    aliases: [],
    description: { en: 'When the mob kills a player', ja: 'モブがプレイヤーを倒した時' },
  },
  {
    name: 'onEnterCombat',
    aliases: [],
    description: {
      en: 'When entering combat (requires ThreatTable)',
      ja: '戦闘開始時（ThreatTable必要）',
    },
  },
  {
    name: 'onDropCombat',
    aliases: [],
    description: { en: 'When leaving combat', ja: '戦闘終了時' },
  },
  {
    name: 'onChangeTarget',
    aliases: [],
    description: { en: 'When changing target', ja: 'ターゲット変更時' },
  },
  {
    name: 'onExplode',
    aliases: [],
    description: { en: 'When a creeper explodes', ja: 'クリーパーが爆発した時' },
  },
  {
    name: 'onPrime',
    aliases: [],
    description: { en: 'When a creeper starts to prime', ja: 'クリーパーが起爆開始した時' },
  },
  {
    name: 'onCreeperCharge',
    aliases: [],
    description: { en: 'When a creeper becomes charged', ja: 'クリーパーが帯電した時' },
  },
  {
    name: 'onTeleport',
    aliases: [],
    description: { en: 'When teleporting (enderman etc.)', ja: 'テレポート時（エンダーマン等）' },
  },
  {
    name: 'onSignal',
    aliases: [],
    description: { en: 'When receiving a signal', ja: 'シグナル受信時' },
  },
  { name: 'onShoot', aliases: [], description: { en: 'When shooting a projectile', ja: '射撃時' } },
  { name: 'onBowHit', aliases: [], description: { en: 'When a bow shot hits', ja: '弓の命中時' } },
  { name: 'onTame', aliases: [], description: { en: 'When tamed', ja: 'テイムされた時' } },
  { name: 'onBreed', aliases: [], description: { en: 'When bred', ja: '繁殖時' } },
  { name: 'onTrade', aliases: [], description: { en: 'When traded with', ja: '取引時' } },
  {
    name: 'onChangeWorld',
    aliases: [],
    description: { en: 'When changing worlds', ja: 'ワールド変更時' },
  },
  {
    name: 'onBucket',
    aliases: [],
    description: { en: 'When bucketed', ja: 'バケツに入れられた時' },
  },
  {
    name: 'onSkillDamage',
    aliases: [],
    description: { en: 'When damaged by a skill', ja: 'スキルによりダメージを受けた時' },
  },
  {
    name: 'onHear',
    aliases: [],
    description: { en: 'When hearing a sound/signal', ja: 'サウンド/シグナルを聞いた時' },
  },
  {
    name: 'onProjectileHit',
    aliases: [],
    description: {
      en: 'When a projectile hits a target',
      ja: 'プロジェクタイルがターゲットに命中時',
    },
  },
  {
    name: 'onProjectileLand',
    aliases: [],
    description: { en: 'When a projectile lands on ground', ja: 'プロジェクタイルが地面に着弾時' },
  },
  { name: 'onDismounted', aliases: [], description: { en: 'When dismounted', ja: '降車時' } },
];
