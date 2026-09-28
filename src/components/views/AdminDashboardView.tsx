import React, { useState } from 'react';
import { NavSection, ResearchStation, Expedition, Dataset, Publication, ReviewSubmission } from '../../types';
import {
  ShieldCheck,
  Activity,
  Users,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  ArrowRight,
  HardDrive,
} from 'lucide-react';

interface AdminDashboardViewProps {
  onNavigate: (section: NavSection) => void;
  stations: ResearchStation[];
  expeditions: Expedition[];
  datasets: Dataset[];
  publications: Publication[];
  reviews: ReviewSubmission[];
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigate,
  stations,
  expeditions,
  datasets,
  publications,
  reviews,
}) => {
  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                PLATFORM GOVERNANCE · ALL CLUSTER NODES HEALTHY · ADMIN ACCESS
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Platform Administration</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Operations overview covering dataset ingestion pipelines, pending peer reviews, storage capacity, and AI RAG token metrics.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('review')}
              >
                <ShieldCheck size={15} />
                <span>Review Submissions ({reviews.filter((r) => r.status === 'Under Review').length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* KPI Status Strip (Structured metrics layout, zero random card soup) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          marginBottom: '24px',
        }}
      >
        {[
          { label: 'Active Researchers', val: '1,420', sub: '+18 this month', badge: 'VERIFIED' },
          { label: 'Ingested Datasets', val: '4,890', sub: '284.5 GB Total Storage', badge: 'NETCDF-4' },
          { label: 'Pending Reviews', val: `${reviews.filter((r) => r.status === 'Under Review').length}`, sub: 'Action Required', badge: 'QUEUE' },
          { label: 'Sensor Ingest Rate', val: '124 pkt/sec', sub: '0.00% Packet Loss', badge: 'LIVE' },
          { label: 'AI RAG Daily Queries', val: '8,410', sub: 'Avg Latency 142ms', badge: 'HEALTHY' },
        ].map((kpi, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#526474', fontWeight: 700 }} className="font-mono">
                {kpi.label}
              </span>
              <span className="badge-tag live" style={{ fontSize: '9px' }}>
                {kpi.badge}
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: '#0B1F33' }}>
              {kpi.val}
            </div>
            <div style={{ fontSize: '11px', color: '#526474', marginTop: '4px' }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* System Infrastructure & Pending Review Queue Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1.3fr) minmax(320px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          marginBottom: '24px',
        }}
        className="admin-split-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .admin-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left: Pending Review Queue */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', color: '#0B1F33' }}>Pending Scientific Review Submissions</h3>
            <button
              className="btn-secondary btn-sm"
              onClick={() => onNavigate('review')}
            >
              Open Full Workflow →
            </button>
          </div>

          <table className="sci-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>FAIR Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td style={{ fontWeight: 600 }}>{rev.title}</td>
                  <td>
                    <span className="badge-tag navy" style={{ fontSize: '9px' }}>{rev.category}</span>
                  </td>
                  <td>
                    <span className="badge-tag live" style={{ fontSize: '9px' }}>{rev.status}</span>
                  </td>
                  <td className="font-mono" style={{ fontWeight: 700, color: '#0B1F33' }}>
                    {rev.fairScore}/100
                  </td>
                  <td>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => onNavigate('review')}
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Storage & Cluster Node Activity */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', color: '#0B1F33' }}>Cluster Infrastructure Telemetry</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>Object Storage (S3 Academic Cache)</span>
                <span className="font-mono">284.5 GB / 1 TB (28%)</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#D8E1E7', width: '100%' }}>
                <div style={{ height: '100%', width: '28%', backgroundColor: '#2F6F95' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>HPC Compute Nodes (Slurm Cluster)</span>
                <span className="font-mono">8 / 16 Nodes In Use (50%)</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#D8E1E7', width: '100%' }}>
                <div style={{ height: '100%', width: '50%', backgroundColor: '#123B5D' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>Iridium Gateway Receiver Health</span>
                <span className="font-mono" style={{ color: '#0B6B40' }}>99.99% Uptime</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#D8E1E7', width: '100%' }}>
                <div style={{ height: '100%', width: '99.9%', backgroundColor: '#10B981' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
