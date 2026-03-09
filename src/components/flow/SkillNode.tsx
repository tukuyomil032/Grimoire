import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export interface SkillNodeData {
  label: string;
  trigger: string;
  mechanicCount: number;
  conditionCount: number;
  isActive?: boolean;
}

export const SkillNode = memo(function SkillNode({ data }: NodeProps) {
  const nodeData = data as unknown as SkillNodeData;
  return (
    <div
      className={`rounded-lg border bg-surface-2 px-4 py-3 shadow-lg transition-all ${
        nodeData.isActive
          ? 'border-accent-primary ring-2 ring-accent-primary/30'
          : 'border-border hover:border-foreground/20'
      }`}
      style={{ minWidth: 180 }}
    >
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent-primary" />
        <span className="text-sm font-semibold text-foreground">
          {nodeData.label || 'Untitled Skill'}
        </span>
      </div>

      {/* Trigger */}
      <div className="mb-1.5 flex items-center gap-1.5 text-xs text-foreground/50">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: '#E53E3E' }}
        />
        {nodeData.trigger || 'No trigger'}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-foreground/40">
        <span>{nodeData.mechanicCount || 0} mechanics</span>
        <span>{nodeData.conditionCount || 0} conditions</span>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-surface-2 !bg-accent-secondary"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-surface-2 !bg-accent-primary"
      />
    </div>
  );
});

export const nodeTypes = {
  skillNode: SkillNode,
};
