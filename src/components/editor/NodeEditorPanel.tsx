import { ReactFlowProvider } from '@xyflow/react';
import { FlowWorkspace } from '@/components/flow';

interface NodeEditorPanelProps {
  skillId: string;
}

export function NodeEditorPanel({ skillId }: NodeEditorPanelProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <ReactFlowProvider>
        <FlowWorkspace skillId={skillId} />
      </ReactFlowProvider>
    </div>
  );
}
