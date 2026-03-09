import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes, type SkillNodeData } from './SkillNode';
import { useEditorStore } from '@/store';

interface FlowWorkspaceProps {
  skillId: string;
}

export function FlowWorkspace({ skillId }: FlowWorkspaceProps) {
  const skills = useEditorStore((s) => s.skills);
  const setSelectedNode = useEditorStore((s) => s.setSelectedNode);

  // Build nodes from the Skill model
  const { generatedNodes, generatedEdges } = useMemo(() => {
    const skill = skills[skillId];
    if (!skill) return { generatedNodes: [], generatedEdges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const y = 50;

    // Skill root node
    const skillNodeId = `skill_${skill.id}`;
    nodes.push({
      id: skillNodeId,
      type: 'skillNode',
      position: { x: 50, y },
      data: {
        label: skill.internalName,
        trigger: skill.triggers?.[0] || '',
        mechanicCount: skill.actions?.length || 0,
        conditionCount: skill.conditions?.length || 0,
        isActive: true,
      } satisfies SkillNodeData,
    });

    // Create a node for each action (mechanic)
    const actionX = 300;
    let actionY = 50;
    for (const action of skill.actions) {
      const mechNodeId = `action_${action.id}`;
      nodes.push({
        id: mechNodeId,
        type: 'skillNode',
        position: { x: actionX, y: actionY },
        data: {
          label: action.mechanic || action.type,
          trigger: action.targeter?.type || '',
          mechanicCount: 0,
          conditionCount: action.conditions?.length || 0,
          isActive: false,
        } satisfies SkillNodeData,
      });

      edges.push({
        id: `e_${skillNodeId}_${mechNodeId}`,
        source: skillNodeId,
        target: mechNodeId,
        animated: true,
        style: { stroke: '#8B5CF6', strokeWidth: 2 },
      });

      actionY += 100;
    }

    // Create a conditions summary node if conditions exist
    if (skill.conditions.length > 0) {
      const condNodeId = `conditions_${skill.id}`;
      nodes.push({
        id: condNodeId,
        type: 'skillNode',
        position: { x: 300, y: actionY },
        data: {
          label: 'Conditions',
          trigger: '',
          mechanicCount: 0,
          conditionCount: skill.conditions.length,
          isActive: false,
        } satisfies SkillNodeData,
      });

      edges.push({
        id: `e_${skillNodeId}_${condNodeId}`,
        source: skillNodeId,
        target: condNodeId,
        animated: true,
        style: { stroke: '#F6AD55', strokeWidth: 2 },
      });
    }

    return { generatedNodes: nodes, generatedEdges: edges };
  }, [skillId, skills]);

  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  // Sync nodes when the skill model updates
  useEffect(() => {
    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [generatedNodes, generatedEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Controls className="!border-border !bg-surface-1 [&_button]:!border-border [&_button]:!bg-surface-2 [&_button]:!text-foreground/60 [&_button:hover]:!bg-surface-3" />
        <MiniMap
          className="!border-border !bg-surface-1"
          nodeColor="#8B5CF6"
          maskColor="rgba(10, 10, 15, 0.8)"
        />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1A1A2E" />
      </ReactFlow>
    </div>
  );
}
