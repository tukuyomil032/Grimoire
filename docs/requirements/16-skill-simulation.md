# 16 — Skill Simulation

## Overview

The Skill Simulation feature provides a 2D top-down preview of how a MythicMobs skill would behave in Minecraft. This is a **nice-to-have** feature planned for Phase 5.

## Concept

A Canvas/WebGL-based simulation space that visualizes:

- **Entity positions**: Caster (mob) and target (player) represented as circles/sprites
- **Movement mechanics**: Teleport, Leap, Lunge, Pull, Throw trajectories
- **Projectile paths**: Projectile, Missile, Orbital flight paths and hit detection
- **Particle effects**: Simplified 2D particles matching MythicMobs particle types
- **Area of effect**: Radius visualization for AoE mechanics
- **Timeline**: Delay, repeat, repeatInterval shown on a time scrubber

## Simulation Space

```
┌─────────────────────────────────────┐
│  Simulation (16x16 block view)      │
│                                     │
│            ◉ Target                 │
│           /                         │
│          /  ← projectile path       │
│         /                           │
│    ◉ Caster                        │
│                                     │
│  [▶ Play] [⏸] [⏹] [⟲ Reset]       │
│  ──────────●────────────── 0.0s     │
└─────────────────────────────────────┘
```

## Simulated Mechanics

### Movement
| Mechanic | Visualization |
|----------|--------------|
| `teleport` | Instant position change with fade effect |
| `velocity` | Arrow showing direction and magnitude |
| `leap` | Arc trajectory |
| `lunge` | Forward dash line |
| `pull` | Line from target to caster |
| `throw` | Parabolic trajectory |

### Projectile
| Mechanic | Visualization |
|----------|--------------|
| `projectile` | Moving dot with trail |
| `missile` | Homing dot with curved trail |
| `orbital` | Circular orbit around caster |

### Area Effects
| Mechanic | Visualization |
|----------|--------------|
| `damage` (with radius targeter) | Colored circle showing radius |
| `particle` | Animated dots in pattern |
| `particleRing` | Ring of particles |
| `particleSphere` | Circle of particles |

### Damage/Healing
| Mechanic | Visualization |
|----------|--------------|
| `damage` | Red number popup on target, health bar decrease |
| `heal` | Green number popup, health bar increase |

## Timeline Controls

- **Play**: Step through skill actions in real-time (20 ticks = 1 second)
- **Pause**: Freeze at current tick
- **Stop**: Reset to initial state
- **Scrub**: Drag timeline to any point
- **Speed**: 0.5x, 1x, 2x, 4x playback speed

## Technical Implementation

### Canvas Rendering
- HTML5 Canvas 2D for lightweight rendering
- `requestAnimationFrame` loop at 60fps
- Grid lines representing Minecraft blocks (1 block = 16px)

### State Machine
```typescript
interface SimulationState {
  tick: number;
  entities: SimEntity[];
  particles: SimParticle[];
  projectiles: SimProjectile[];
  effects: SimEffect[];
}

interface SimEntity {
  id: string;
  type: 'caster' | 'target' | 'summon';
  position: { x: number; z: number };  // 2D top-down
  health: number;
  maxHealth: number;
}
```

### Skill Action Interpreter
Reads the internal JSON skill model and translates each `SkillAction` into simulation events:

```typescript
function interpretAction(action: SkillAction, state: SimulationState): SimEvent[] {
  switch (action.mechanic) {
    case 'damage':
      return [{ type: 'damage', target: resolveTarget(action.targeter, state), amount: action.parameters.amount }];
    case 'projectile':
      return [{ type: 'spawn-projectile', from: state.caster.position, to: resolveTarget(action.targeter, state).position, speed: action.parameters.velocity }];
    // ... etc
  }
}
```

## Limitations

- 2D top-down only (no Y-axis / height)
- Simplified entity models (no actual Minecraft rendering)
- Approximate timing (may not match exact server tick behavior)
- No world interaction (blocks, terrain, gravity approximation only)
- Not a replacement for in-game testing — a visual sanity check

## Phase

Phase 5 — After all core features are complete. This is a stretch goal that significantly enhances the product but is not required for the core workflow.
