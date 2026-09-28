import React, { useState } from 'react';
import { NavSection, ReviewSubmission } from '../../types';
import { REVIEW_SUBMISSIONS } from '../../data/mockData';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface ReviewWorkflowViewProps {
  onNavigate: (section: NavSection) => void;
}

export const ReviewWorkflowView: React.FC<ReviewWorkflowViewProps> = ({ onNavigate }) => {
  const [submissions] = useState<ReviewSubmission[]>(REVIEW_SUBMISSIONS);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('rev-01');

  const selectedItem =
    submissions.find((s) => s.id === selectedSubmissionId) || submissions[0];

  const workflowSteps = ['Submitted', 'Under Review', 'Verified', 'Published'] as const;

  const getStepIndex = (status: ReviewSubmission['status']) => {
    return workflowSteps.indexOf(status);
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                SCIENTIFIC GOVERNANCE · FAIR COMPLIANCE AUDIT
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Review & Verification Workflow</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Four-stage peer review and quality certification lifecycle: Submitted → Under Review → Verified → Published.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onNavigate('provenance')}
            >
              <ShieldCheck size={15} />
              <span>Inspect Data Provenance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Main Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '660px',
        }}
        className="review-split-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .review-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Review Queue List */}
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
            PENDING & CERTIFIED SUBMISSIONS ({submissions.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {submissions.map((sub) => {
              const isSelected = sub.id === selectedSubmissionId;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmissionId(sub.id)}
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
                      {sub.category}
                    </span>
                    <span
                      className="badge-tag live"
                      style={{
                        fontSize: '9px',
                        backgroundColor: sub.status === 'Published' ? '#ECFDF5' : '#E8F1F5',
                        color: sub.status === 'Published' ? '#065F46' : '#123B5D',
                      }}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '4px' }}>
                    {sub.title}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#D8E1E7' : '#526474' }}>
                    Author: {sub.author} ({sub.institution})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Workflow Inspector */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-tag navy">{selectedItem.category}</span>
              <span className="badge-tag live">FAIR Score: {selectedItem.fairScore}/100</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0B1F33', marginBottom: '4px' }}>
              {selectedItem.title}
            </h2>
            <div style={{ fontSize: '12px', color: '#526474' }}>
              Submitted by <strong>{selectedItem.author}</strong> ({selectedItem.institution}) on {selectedItem.submitDate}
            </div>
          </div>

          {/* Workflow Stepper: Submitted → Under Review → Verified → Published */}
          <div style={{ marginBottom: '24px' }}>
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
              CERTIFICATION STAGES
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: '#D8E1E7', border: '1px solid #D8E1E7' }}>
              {workflowSteps.map((step, idx) => {
                const currentIdx = getStepIndex(selectedItem.status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    key={step}
                    style={{
                      backgroundColor: isCurrent ? '#123B5D' : isPassed ? '#E8F1F5' : '#FFFFFF',
                      color: isCurrent ? '#FFFFFF' : isPassed ? '#0B1F33' : '#526474',
                      padding: '12px 10px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="font-mono" style={{ fontSize: '10px', marginBottom: '2px', fontWeight: 700 }}>
                      0{idx + 1}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: isPassed ? 700 : 400 }}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Verification Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <table className="sci-table" style={{ fontSize: '12px' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, width: '25%' }}>Assigned Reviewer</td>
                  <td>{selectedItem.reviewer}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Data Quality Status</td>
                  <td>
                    <span className="badge-tag live">CF-1.8 Compliant • Zero Checksum Variance</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Reviewer Remarks</td>
                  <td style={{ color: '#16232E', lineHeight: 1.5 }}>{selectedItem.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
            <button
              className="btn-primary"
              onClick={() => {
                alert('Verification confirmed: Digital signature appended to immutable log.');
              }}
            >
              <CheckCircle2 size={14} />
              <span>Approve & Advance Status</span>
            </button>
            <button
              className="btn-secondary"
              onClick={() => onNavigate('provenance')}
            >
              <span>Inspect W3C Lineage Graph →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
