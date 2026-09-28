import React, { useState } from 'react';
import { NavSection, KnowledgeNode, KnowledgeEdge } from '../../types';
import {
  KNOWLEDGE_NODES,
  KNOWLEDGE_EDGES,
} from '../../data/mockData';
import {
  Share2,
  Filter,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Database,
  Building2,
  Ship,
  BookOpen,
  User,
  Radio,
} from 'lucide-react';

interface KnowledgeGraphViewProps {
  onNavigate: (section: NavSection) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ onNavigate }) => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>(KNOWLEDGE_NODES);
  const [edges, setEdges] = useState<KnowledgeEdge[]>(KNOWLEDGE_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-exp-itgc');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Find connected edges and neighbors
  const connectedEdges = edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const connectedNeighborIds = new Set<string>();
  connectedNeighborIds.add(selectedNodeId);
  connectedEdges.forEach((e) => {
    connectedNeighborIds.add(e.source);
    connectedNeighborIds.add(e.target);
  });

  const getNodeColor = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'Researcher':
        return '#0B1F33'; // Deep Navy
      case 'Expedition':
        return '#123B5D'; // Dark Blue
      case 'Location':
        return '#2F6F95'; // Arctic Blue
      case 'Dataset':
        return '#0E7490'; // Live Cyan
      case 'Publication':
        return '#0B6B40'; // Solid Green
      case 'Sensor':
        return '#526474'; // Slate
      default:
        return '#16232E';
    }
  };

  const getNodeIcon = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'Researcher':
        return User;
      case 'Expedition':
        return Ship;
      case 'Location':
        return Building2;
      case 'Dataset':
        return Database;
      case 'Publication':
        return BookOpen;
      case 'Sensor':
        return Radio;
    }
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                KNOWLEDGE ARCHITECTURE · MULTI-ENTITY GRAPH EXPLORER
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Science Knowledge Graph</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Visual relationship explorer: Researcher → Expedition → Location → Dataset → Publication.
              </p>
            </div>

            {/* Filter by Entity Type */}
            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#E8F1F5', padding: '3px', border: '1px solid #D8E1E7', flexWrap: 'wrap' }}>
              {['ALL', 'Researcher', 'Expedition', 'Location', 'Dataset', 'Publication'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: filterType === f ? '#0B1F33' : 'transparent',
                    color: filterType === f ? '#FFFFFF' : '#123B5D',
                    fontWeight: filterType === f ? 600 : 400,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Main Graph Grid (Technical Split View) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(500px, 1fr) minmax(320px, 380px)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '640px',
        }}
        className="graph-grid-container"
      >
        <style>{`
          @media (max-width: 980px) {
            .graph-grid-container {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left: SVG Network Canvas */}
        <div
          style={{
            backgroundColor: '#071524',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Canvas Toolbar */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#0B1F33',
              borderBottom: '1px solid #123B5D',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#D8E1E7',
            }}
            className="font-mono"
          >
            <div>
              <span>TOPOLOGY: DIRECTED CYCLIC GRAPH</span>
              <span style={{ margin: '0 8px', color: '#526474' }}>|</span>
              <span style={{ color: '#2F6F95' }}>NODES: {nodes.length} • EDGES: {edges.length}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.8))}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 8px', cursor: 'pointer' }}
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 8px', cursor: 'pointer' }}
              >
                -
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 8px', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* SVG Graph Visualization */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <svg
              width="100%"
              height="580"
              viewBox="100 50 1100 440"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.15s ease',
              }}
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2F6F95" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFFFFF" />
                </marker>
              </defs>

              {/* Render Edges */}
              {edges.map((e) => {
                const src = nodes.find((n) => n.id === e.source);
                const tgt = nodes.find((n) => n.id === e.target);
                if (!src || !tgt) return null;

                const isConnected = e.source === selectedNodeId || e.target === selectedNodeId;
                const edgeColor = isConnected ? '#FFFFFF' : '#123B5D';
                const strokeWidth = isConnected ? 2 : 1;

                const midX = ((src.x || 0) + (tgt.x || 0)) / 2;
                const midY = ((src.y || 0) + (tgt.y || 0)) / 2;

                return (
                  <g key={e.id}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={edgeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isConnected ? 'none' : '3,3'}
                      markerEnd={isConnected ? 'url(#arrow-active)' : 'url(#arrow)'}
                    />
                    {isConnected && (
                      <text
                        x={midX}
                        y={midY - 6}
                        fill="#E8F1F5"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                        style={{ backgroundColor: '#0B1F33' }}
                      >
                        {e.relation}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {nodes.map((n) => {
                if (filterType !== 'ALL' && n.type !== filterType) return null;

                const isSelected = n.id === selectedNodeId;
                const isNeighbor = connectedNeighborIds.has(n.id);
                const color = getNodeColor(n.type);

                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x}, ${n.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNodeId(n.id)}
                  >
                    {/* Node circle */}
                    <circle
                      r={isSelected ? 26 : 20}
                      fill={color}
                      stroke={isSelected ? '#FFFFFF' : isNeighbor ? '#2F6F95' : '#123B5D'}
                      strokeWidth={isSelected ? 3 : 1.5}
                    />

                    {/* Node Label Text */}
                    <text
                      y={isSelected ? 42 : 36}
                      fill={isSelected ? '#FFFFFF' : '#D8E1E7'}
                      fontSize={isSelected ? '12' : '11'}
                      fontWeight={isSelected ? '700' : '500'}
                      textAnchor="middle"
                    >
                      {n.label}
                    </text>

                    {/* Subtext */}
                    <text
                      y={isSelected ? 54 : 48}
                      fill="#526474"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {n.type}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Graph Legend */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#071524',
              borderTop: '1px solid #123B5D',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              fontSize: '11px',
            }}
          >
            {[
              { type: 'Researcher', color: '#0B1F33' },
              { type: 'Expedition', color: '#123B5D' },
              { type: 'Location', color: '#2F6F95' },
              { type: 'Dataset', color: '#0E7490' },
              { type: 'Publication', color: '#0B6B40' },
              { type: 'Sensor', color: '#526474' },
            ].map((lg) => (
              <div key={lg.type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: lg.color,
                    border: '1px solid #FFFFFF',
                    display: 'inline-block',
                  }}
                />
                <span style={{ color: '#D8E1E7' }}>{lg.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Inspector Panel (Structured, zero card soup) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '14px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span className="badge-tag navy">{selectedNode.type}</span>
              <span className="badge-tag arctic">{selectedNode.cluster}</span>
            </div>
            <h2 style={{ fontSize: '20px', color: '#0B1F33', marginBottom: '4px' }}>
              {selectedNode.label}
            </h2>
            <div style={{ fontSize: '13px', color: '#526474' }}>{selectedNode.subtext}</div>
          </div>

          {/* Node Metadata Key-Values */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#526474',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
              className="font-mono"
            >
              ENTITY METADATA
            </div>
            <table className="sci-table" style={{ fontSize: '12px' }}>
              <tbody>
                {Object.entries(selectedNode.meta).map(([key, val]) => (
                  <tr key={key}>
                    <td style={{ color: '#526474', textTransform: 'capitalize', width: '40%' }}>
                      {key}
                    </td>
                    <td className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>
                      {String(val)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Immediate Graph Relationships */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#526474',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
              className="font-mono"
            >
              CONNECTED EDGES ({connectedEdges.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {connectedEdges.map((e) => {
                const isOutgoing = e.source === selectedNodeId;
                const otherNodeId = isOutgoing ? e.target : e.source;
                const otherNode = nodes.find((n) => n.id === otherNodeId);
                if (!otherNode) return null;

                return (
                  <div
                    key={e.id}
                    onClick={() => setSelectedNodeId(otherNode.id)}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: '#F7FAFC',
                      border: '1px solid #D8E1E7',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                    }}
                  >
                    <div>
                      <span className="font-mono" style={{ fontSize: '10px', color: '#2F6F95', fontWeight: 600 }}>
                        {isOutgoing ? '───[' + e.relation + ']───>' : '<───[' + e.relation + ']───'}
                      </span>
                      <div style={{ fontWeight: 600, color: '#0B1F33', marginTop: '2px' }}>
                        {otherNode.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#526474' }}>{otherNode.type}</div>
                    </div>
                    <ChevronRight size={14} color="#526474" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Context Jump Button */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #D8E1E7' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                if (selectedNode.type === 'Expedition') onNavigate('expeditions');
                else if (selectedNode.type === 'Dataset') onNavigate('datasets');
                else if (selectedNode.type === 'Location') onNavigate('stations');
                else if (selectedNode.type === 'Researcher') onNavigate('researchers');
                else if (selectedNode.type === 'Publication') onNavigate('papers');
                else onNavigate('live-data');
              }}
            >
              <span>Inspect Full {selectedNode.type} Record</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
