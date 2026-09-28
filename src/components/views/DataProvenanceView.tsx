import React, { useState } from 'react';
import { NavSection, ProvenanceStage } from '../../types';
import { PROVENANCE_STAGES } from '../../data/mockData';
import {
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Radio,
  Sliders,
  Cpu,
  BookOpen,
  Copy,
  Check,
  Lock,
  Database,
} from 'lucide-react';

interface DataProvenanceViewProps {
  onNavigate: (section: NavSection) => void;
}

export const DataProvenanceView: React.FC<DataProvenanceViewProps> = ({ onNavigate }) => {
  const [stages] = useState<ProvenanceStage[]>(PROVENANCE_STAGES);
  const [activeStageId, setActiveStageId] = useState<string>('prov-1');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showProvJson, setShowProvJson] = useState<boolean>(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState<boolean>(false);
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getStageIcon = (order: number) => {
    switch (order) {
      case 1:
        return Radio;
      case 2:
        return Database;
      case 3:
        return Sliders;
      case 4:
        return FileCode;
      case 5:
        return Cpu;
      case 6:
        return BookOpen;
      default:
        return GitBranch;
    }
  };

  // Explicit 6-step labels per Section 21: Observation -> Raw Dataset -> Quality Check -> Processed Dataset -> Analysis -> Publication
  const stageLabels = [
    'Observation',
    'Raw Dataset',
    'Quality Check',
    'Processed Dataset',
    'Analysis',
    'Publication',
  ];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                DATA LINEAGE & INTEGRITY · W3C PROV-O
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Data Provenance</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Trace the verifiable lifecycle of polar data from physical sensor measurement to peer-reviewed publication.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-secondary"
                onClick={() => setShowProvJson(!showProvJson)}
              >
                <FileCode size={14} />
                <span>{showProvJson ? 'Hide PROV-JSON' : 'Export W3C PROV-JSON'}</span>
              </button>
              <button
                className="btn-primary"
                onClick={() => setShowBlockchainModal(true)}
              >
                <Lock size={14} />
                <span>Verify on Blockchain Ledger</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* PROV-JSON Preview if active */}
        {showProvJson && (
          <div
            style={{
              backgroundColor: '#071524',
              border: '1px solid #123B5D',
              padding: '16px',
              marginBottom: '24px',
              color: '#D8E1E7',
              fontSize: '12px',
            }}
            className="font-mono"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#2F6F95', fontWeight: 600 }}>W3C PROV-O JSON-LD SERIALIZATION</span>
              <button
                onClick={() => copyHash(JSON.stringify(activeStage, null, 2))}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                Copy
              </button>
            </div>
            <pre style={{ overflowX: 'auto', maxHeight: '180px' }}>
              {JSON.stringify(activeStage, null, 2)}
            </pre>
          </div>
        )}

        {/* 6-Stage Stepper Pipeline (Visual and easy to understand per Section 21) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
            marginBottom: '24px',
          }}
          className="prov-stepper"
        >
          <style>{`
            @media (max-width: 768px) {
              .prov-stepper { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          {stages.map((st, idx) => {
            const Icon = getStageIcon(st.order);
            const isSelected = st.id === activeStageId;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStageId(st.id)}
                style={{
                  backgroundColor: isSelected ? '#123B5D' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#16232E',
                  padding: '16px 14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  borderBottom: isSelected ? '3px solid #2F6F95' : '3px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="font-mono text-metadata" style={{ fontWeight: 700, color: isSelected ? '#E8F1F5' : '#2F6F95' }}>
                    0{st.order}
                  </span>
                  <Icon size={14} color={isSelected ? '#FFFFFF' : '#526474'} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
                  {stageLabels[idx]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Specification Split Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(400px, 1.4fr) minmax(300px, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
          }}
          className="prov-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .prov-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left: Input, Transformation, Output */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-tag navy">Stage 0{activeStage.order}</span>
                <span className="badge-tag live">{activeStage.w3cProvType}</span>
              </div>
              <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>
                {activeStage.stageName}
              </h2>
              <p className="text-secondary">
                {activeStage.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px' }}>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '4px' }}>
                  INPUT ENTITY (prov:used)
                </div>
                <div style={{ fontSize: '13px', color: '#16232E' }}>
                  {activeStage.input}
                </div>
              </div>

              <div style={{ textAlign: 'center', color: '#2F6F95', fontSize: '12px', fontWeight: 600 }} className="font-mono">
                ↓ [{activeStage.toolOrMethod}] ↓
              </div>

              <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px' }}>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '4px' }}>
                  GENERATED OUTPUT (prov:wasGeneratedBy)
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F33' }}>
                  {activeStage.output}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#526474', borderTop: '1px solid #D8E1E7', paddingTop: '16px' }}>
              <div>Agent: <strong>{activeStage.agent}</strong></div>
              <div className="font-mono">{activeStage.timestamp}</div>
            </div>
          </div>

          {/* Right: Checksum & Audit Logs */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#071524', border: '1px solid #123B5D', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span className="font-mono text-metadata" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    SHA-256 INTEGRITY HASH
                  </span>
                </div>
                <button
                  onClick={() => copyHash(activeStage.sha256)}
                  style={{ background: 'none', border: 'none', color: '#2F6F95', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedHash === activeStage.sha256 ? <Check size={11} /> : <Copy size={11} />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="font-mono text-metadata" style={{ color: '#E8F1F5', wordBreak: 'break-all', backgroundColor: '#0B1F33', padding: '8px', border: '1px solid #123B5D' }}>
                {activeStage.sha256}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                AUDIT LOGS
              </div>
              <table className="sci-table">
                <tbody>
                  {Object.entries(activeStage.auditMetrics).map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ color: '#526474', width: '45%' }}>{k}</td>
                      <td className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                className="btn-secondary btn-sm"
                disabled={activeStage.order <= 1}
                onClick={() => {
                  const prev = stages.find((s) => s.order === activeStage.order - 1);
                  if (prev) setActiveStageId(prev.id);
                }}
                style={{ flex: 1 }}
              >
                ← Prev Stage
              </button>
              <button
                className="btn-primary btn-sm"
                disabled={activeStage.order >= 6}
                onClick={() => {
                  const next = stages.find((s) => s.order === activeStage.order + 1);
                  if (next) setActiveStageId(next.id);
                }}
                style={{ flex: 1 }}
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Modal */}
      {showBlockchainModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 31, 51, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '20px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', maxWidth: '520px', width: '100%', border: '1px solid #123B5D' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={15} color="#10B981" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>BLOCKCHAIN INTEGRITY RECEIPT</span>
              </div>
              <button
                onClick={() => {
                  setShowBlockchainModal(false);
                  setVerifyStatus(null);
                }}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <p className="text-secondary" style={{ marginBottom: '14px' }}>
                All Level-3 dataset hashes and publication manifests are permanently anchored to an immutable distributed ledger.
              </p>

              <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px', marginBottom: '16px' }}>
                <div className="text-metadata" style={{ color: '#526474', marginBottom: '4px' }}>
                  MERKLE ROOT HASH:
                </div>
                <div className="font-mono text-metadata" style={{ color: '#0B1F33', wordBreak: 'break-all' }}>
                  {activeStage.sha256}
                </div>
              </div>

              {verifyStatus ? (
                <div style={{ padding: '10px 14px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <CheckCircle2 size={16} color="#0B6B40" />
                  <span>{verifyStatus}</span>
                </div>
              ) : (
                <button
                  className="btn-primary"
                  style={{ width: '100%', marginBottom: '12px' }}
                  onClick={() => {
                    setVerifyStatus('RECEIPT VERIFIED: Hash matches immutable block #19,842,109 with 0 state divergence.');
                  }}
                >
                  Verify Cryptographic Receipt
                </button>
              )}

              <button
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setShowBlockchainModal(false);
                  setVerifyStatus(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
