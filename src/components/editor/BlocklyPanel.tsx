import { BlocklyWorkspace } from '@/components/blockly';

interface BlocklyPanelProps {
  skillId: string;
}

export function BlocklyPanel({ skillId }: BlocklyPanelProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <BlocklyWorkspace skillId={skillId} />
    </div>
  );
}
