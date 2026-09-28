import React, { useState } from 'react';
import { NavSection, WorkspaceNotebook } from '../../types';
import { WORKSPACE_NOTEBOOKS } from '../../data/mockData';
import {
  Code2,
  Play,
  FileCode,
  Terminal,
  Folder,
  RefreshCw,
  CheckCircle2,
  Layers,
  Database,
} from 'lucide-react';

interface AnalysisWorkspaceViewProps {
  onNavigate: (section: NavSection) => void;
}

export const AnalysisWorkspaceView: React.FC<AnalysisWorkspaceViewProps> = ({ onNavigate }) => {
  const [notebooks] = useState<WorkspaceNotebook[]>(WORKSPACE_NOTEBOOKS);
  const [activeNotebookId, setActiveNotebookId] = useState<string>('nb-polar-xarray');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cellOutput, setCellOutput] = useState<string | null>(
    WORKSPACE_NOTEBOOKS[0].cells[1].output || null
  );

  const activeNotebook =
    notebooks.find((n) => n.id === activeNotebookId) || notebooks[0];

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setCellOutput(
        `Connecting to Polar Bear API (v2.4.1)...\nDataset Verified Hash: ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d\nCalculated mCDW warming rate: +0.418 °C\n[PROV-CHAIN VALIDATED: IOC/IODE standards compliant]\nExecution time: 0.84s (Cloud HPC Container)`
      );
    }, 800);
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                REPRODUCIBLE RESEARCH ENVIRONMENT · JUPYTER HPC CONTAINER ACTIVE
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Computational Workspace</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Cloud-hosted computational notebooks with pre-loaded polar scientific libraries (<code>xarray</code>, <code>cartopy</code>, <code>gsw</code>, <code>matplotlib</code>). Code lives with data.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? <RefreshCw size={14} className="spin" /> : <Play size={14} />}
                <span>{isRunning ? 'Executing...' : 'Run All Cells (HPC)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Main Grid: Left File Tree, Right Notebook Execution Canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 280px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '660px',
        }}
        className="workspace-split-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .workspace-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Workspace File Browser */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#526474',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="font-mono"
          >
            <Folder size={14} color="#2F6F95" />
            <span>FILES & NOTEBOOKS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {notebooks.map((nb) => {
              const isSelected = nb.id === activeNotebookId;
              return (
                <div
                  key={nb.id}
                  onClick={() => setActiveNotebookId(nb.id)}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                    color: isSelected ? '#FFFFFF' : '#0B1F33',
                    border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <FileCode size={14} color={isSelected ? '#FFFFFF' : '#2F6F95'} />
                  <span className="font-mono" style={{ fontWeight: 600 }}>
                    {nb.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #D8E1E7', fontSize: '11px', color: '#526474' }}>
            <div>Environment: Python 3.11.8</div>
            <div>HPC Slurm Node: <strong>node-arctic-c04</strong></div>
            <div>RAM Allocated: 16 GB / 64 GB</div>
          </div>
        </div>

        {/* Right Column: Notebook Cells */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1F33', marginBottom: '2px' }} className="font-mono">
                {activeNotebook.title}
              </h2>
              <div style={{ fontSize: '11px', color: '#526474' }}>
                Kernel: {activeNotebook.language} • Author: {activeNotebook.author}
              </div>
            </div>
            <span className="badge-tag live">KERNEL IDLE</span>
          </div>

          {/* Cell 1: Markdown Cell */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#526474', marginBottom: '4px' }} className="font-mono">
              [Markdown Cell]
            </div>
            <div
              style={{
                backgroundColor: '#F7FAFC',
                border: '1px solid #D8E1E7',
                borderLeft: '4px solid #123B5D',
                padding: '14px',
                fontSize: '13px',
                color: '#16232E',
                lineHeight: 1.5,
              }}
            >
              <strong>Weddell Gyre Moored Hydrographic Profiling: Modified Circumpolar Deep Water (mCDW) Inflow</strong>
              <p style={{ marginTop: '6px', color: '#526474' }}>
                This reproducible analysis loads Level-3 NetCDF data from the <strong>Polar Bear Data API</strong> and computes potential temperature anomalies across the core layer.
              </p>
            </div>
          </div>

          {/* Cell 2: Executable Code Cell */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', color: '#526474' }} className="font-mono">
                In [1]:
              </span>
              <button
                className="btn-secondary btn-sm"
                onClick={handleRunCode}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                <Play size={10} />
                <span>Execute Cell</span>
              </button>
            </div>

            <pre
              style={{
                backgroundColor: '#071524',
                color: '#E8F1F5',
                padding: '16px',
                fontSize: '12px',
                fontFamily: 'monospace',
                border: '1px solid #123B5D',
                overflowX: 'auto',
                lineHeight: 1.5,
              }}
            >
              {activeNotebook.cells[1].content}
            </pre>
          </div>

          {/* Cell 3: Standard Output Console */}
          {cellOutput && (
            <div>
              <div style={{ fontSize: '10px', color: '#526474', marginBottom: '4px' }} className="font-mono">
                Out [1]:
              </div>
              <pre
                style={{
                  backgroundColor: '#0B1F33',
                  color: '#10B981',
                  padding: '14px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid #123B5D',
                  lineHeight: 1.6,
                }}
              >
                {cellOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
