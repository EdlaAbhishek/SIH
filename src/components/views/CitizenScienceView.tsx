import React, { useState } from 'react';
import { NavSection, CitizenTask } from '../../types';
import { CITIZEN_TASKS } from '../../data/mockData';
import {
  Users,
  CheckCircle2,
  Award,
  ShieldAlert,
  ArrowRight,
  Eye,
  Tag,
  Sparkles,
} from 'lucide-react';

interface CitizenScienceViewProps {
  onNavigate: (section: NavSection) => void;
}

export const CitizenScienceView: React.FC<CitizenScienceViewProps> = ({ onNavigate }) => {
  const [tasks] = useState<CitizenTask[]>(CITIZEN_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-seal-spotting');
  const [userScore, setUserScore] = useState<number>(145);
  const [taskSubmitted, setTaskSubmitted] = useState<boolean>(false);

  const selectedTask =
    tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                PUBLIC PARTICIPATION · QUARANTINED CONSENSUS POOL
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Citizen Science Projects</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Contribute to real polar research missions by classifying wildlife, tagging satellite imagery, and annotating sea-ice structures.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-tag arctic">
                Score: {userScore} PTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Mandatory Separation Banner: Separate Citizen Contributions from Verified Science */}
      <div
        style={{
          backgroundColor: '#E8F1F5',
          border: '1px solid #D8E1E7',
          borderLeft: '4px solid #123B5D',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={20} color="#123B5D" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F33' }}>
              SCIENTIFIC DATA SEPARATION PROTOCOL
            </div>
            <div style={{ fontSize: '12px', color: '#526474' }}>
              Citizen contributions remain in the quarantined staging pool until validated through consensus algorithms and certified by credentialed research teams.
            </div>
          </div>
        </div>
        <div className="font-mono" style={{ fontSize: '12px', color: '#0B1F33' }}>
          YOUR RESEARCH POINTS: <strong>{userScore} PTS</strong>
        </div>
      </div>

      {/* Split Grid: Left Tasks Directory, Right Active Task Console */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 360px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '620px',
        }}
        className="citizen-split-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .citizen-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Tasks List */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#526474',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
            className="font-mono"
          >
            ACTIVE CITIZEN TASKS ({tasks.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map((t) => {
              const isSelected = t.id === selectedTaskId;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTaskId(t.id);
                    setTaskSubmitted(false);
                  }}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                    color: isSelected ? '#FFFFFF' : '#0B1F33',
                    border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span className="badge-tag arctic" style={{ fontSize: '9px' }}>
                      {t.category}
                    </span>
                    <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#E8F1F5' : '#0B6B40', fontWeight: 600 }}>
                      +{t.rewardPoints} PTS
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#D8E1E7' : '#526474' }}>
                    Progress: {t.completedCount.toLocaleString()} / {t.targetCount.toLocaleString()} annotations ({t.progressPercent}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Annotation Workbench */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-tag navy">{selectedTask.category}</span>
              <span className="badge-tag live">Verification Level: Consensus (5x)</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0B1F33', marginBottom: '6px' }}>
              {selectedTask.title}
            </h2>
            <p style={{ fontSize: '13px', color: '#526474', lineHeight: 1.5 }}>
              {selectedTask.description}
            </p>
          </div>

          {/* Interactive Annotation Canvas Mock */}
          <div
            style={{
              backgroundColor: '#071524',
              border: '1px solid #123B5D',
              padding: '20px',
              textAlign: 'center',
              color: '#FFFFFF',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#526474', marginBottom: '10px' }} className="font-mono">
              HIGH-RESOLUTION 30CM WORLDVIEW-3 SATELLITE TILE [QUAD 77.8°S, 166.7°E]
            </div>

            {/* SVG Interactive Tagging Viewport */}
            <svg width="100%" height="200" viewBox="0 0 400 200">
              <rect width="400" height="200" fill="#123B5D" />
              {/* Ice fractures */}
              <line x1="20" y1="40" x2="380" y2="180" stroke="#071524" strokeWidth="8" />
              <line x1="180" y1="105" x2="300" y2="30" stroke="#071524" strokeWidth="5" />

              {/* Sample Wildlife / Ice Tag Points */}
              <circle cx="160" cy="90" r="5" fill="#0B1F33" />
              <rect x="150" y="80" width="20" height="20" fill="none" stroke="#EF4444" strokeWidth="1.5" />
              <text x="175" y="85" fill="#EF4444" fontSize="9" fontFamily="monospace">Weddell Seal #1</text>

              <circle cx="240" cy="140" r="6" fill="#0B1F33" />
              <rect x="230" y="130" width="20" height="20" fill="none" stroke="#10B981" strokeWidth="1.5" />
              <text x="255" y="135" fill="#10B981" fontSize="9" fontFamily="monospace">Mother-Pup Pair</text>
            </svg>

            <div style={{ marginTop: '10px', fontSize: '11px', color: '#D8E1E7' }}>
              Click directly on the tile above to tag seal basking clusters beside the lead.
            </div>
          </div>

          {/* Guidelines */}
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
              ANNOTATION INSTRUCTIONS & CRITERIA
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedTask.instructions.map((ins, i) => (
                <li
                  key={i}
                  style={{
                    backgroundColor: '#F7FAFC',
                    border: '1px solid #D8E1E7',
                    padding: '8px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle2 size={14} color="#2F6F95" />
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Action */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #D8E1E7' }}>
            {taskSubmitted ? (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  padding: '12px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={18} color="#0B6B40" />
                <span>
                  Annotations submitted successfully! +{selectedTask.rewardPoints} points credited to your researcher profile.
                </span>
              </div>
            ) : (
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setUserScore((s) => s + selectedTask.rewardPoints);
                  setTaskSubmitted(true);
                }}
              >
                <span>Submit Verified Annotation Batch (+{selectedTask.rewardPoints} Pts)</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
