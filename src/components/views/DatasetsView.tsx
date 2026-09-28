import React, { useState } from 'react';
import { NavSection, Dataset } from '../../types';
import { DATASETS } from '../../data/mockData';
import {
  Download,
  Table,
  LineChart,
  GitBranch,
  Copy,
  Check,
  FileText,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface DatasetsViewProps {
  onNavigate: (section: NavSection) => void;
}

type DatasetTab = 'overview' | 'data' | 'visualization' | 'provenance';

export const DatasetsView: React.FC<DatasetsViewProps> = ({ onNavigate }) => {
  const [datasets] = useState<Dataset[]>(DATASETS);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('ds-bedmap3');
  const [activeTab, setActiveTab] = useState<DatasetTab>('overview');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [downloadModal, setDownloadModal] = useState<boolean>(false);

  const selectedDataset =
    datasets.find((d) => d.id === selectedDatasetId) || datasets[0];

  const copyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                POLAR SCIENCE DATA REPOSITORY · CF-1.8 COMPLIANT
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Scientific Datasets</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Open-access gridded observations, moorings, and ice-core time series indexed with digital object identifiers.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => setDownloadModal(true)}
              >
                <Download size={15} />
                <span>Download NetCDF ({selectedDataset.sizeBytes})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 320px) minmax(500px, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
          }}
          className="dataset-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .dataset-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Dataset Selector */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
            <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
              INDEXED DATASETS ({datasets.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {datasets.map((ds) => {
                const isSelected = ds.id === selectedDatasetId;
                return (
                  <div
                    key={ds.id}
                    onClick={() => setSelectedDatasetId(ds.id)}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                      color: isSelected ? '#FFFFFF' : '#16232E',
                      border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="badge-tag arctic" style={{ fontSize: '9px' }}>
                        {ds.domain}
                      </span>
                      <span className="font-mono text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                        {ds.sizeBytes}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '2px' }}>
                      {ds.title}
                    </div>
                    <div className="text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {ds.sourceRepo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dataset Inspector with Tabs: Overview | Data | Visualization | Provenance */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            {/* Dataset Identity Bar */}
            <div style={{ padding: '20px 24px', backgroundColor: '#0B1F33', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag arctic">{selectedDataset.domain}</span>
                <span className="badge-tag live">{selectedDataset.qualityFlag}</span>
                <span className="badge-tag navy">{selectedDataset.region}</span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '22px', marginBottom: '8px' }}>
                {selectedDataset.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => copyDoi(selectedDataset.doi)}
                  style={{
                    background: '#123B5D',
                    border: '1px solid #2F6F95',
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="font-mono"
                >
                  {copiedDoi === selectedDataset.doi ? <Check size={11} /> : <Copy size={11} />}
                  <span>DOI: {selectedDataset.doi}</span>
                </button>
                <span className="text-metadata" style={{ color: '#D8E1E7' }}>
                  License: {selectedDataset.license}
                </span>
              </div>
            </div>

            {/* Exactly Required Tabs per Section 18: Overview | Data | Visualization | Provenance */}
            <div className="sci-tabs" style={{ paddingLeft: '24px' }}>
              {[
                { id: 'overview' as const, label: 'Overview', icon: FileText },
                { id: 'data' as const, label: 'Data', icon: Table },
                { id: 'visualization' as const, label: 'Visualization', icon: LineChart },
                { id: 'provenance' as const, label: 'Provenance', icon: GitBranch },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`sci-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                      DATASET METADATA SPECIFICATION
                    </div>
                    <table className="sci-table">
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: 600, width: '25%' }}>Geographic Coverage</td>
                          <td className="font-mono">{selectedDataset.spatialCoverage}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Date Range</td>
                          <td className="font-mono">{selectedDataset.timeRange}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Spatial Resolution</td>
                          <td className="font-mono">{selectedDataset.resolution}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Data Source / Repository</td>
                          <td>{selectedDataset.sourceRepo}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 600 }}>Variables</td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {selectedDataset.variables.map((v, i) => (
                                <span key={i} className="badge-tag navy" style={{ fontSize: '10px' }}>
                                  {v}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => setDownloadModal(true)}
                    >
                      <Download size={13} />
                      <span>Download Dataset ({selectedDataset.sizeBytes})</span>
                    </button>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => onNavigate('map')}
                    >
                      Show Bounding Polygon on Map →
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Data (Preview Table) */}
              {activeTab === 'data' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="text-metadata" style={{ fontWeight: 700, color: '#526474' }}>
                      FIRST 5 OBSERVATIONS (CF-1.8 PARSED TABLE)
                    </span>
                    <span className="text-metadata">FORMAT: NETCDF-4</span>
                  </div>
                  <table className="sci-table">
                    <thead>
                      <tr>
                        <th>Timestamp (UTC)</th>
                        <th>Depth (m)</th>
                        <th>Temperature (°C)</th>
                        <th>Thickness / Salinity</th>
                        <th>Quality Flag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDataset.sampleData.map((row, i) => (
                        <tr key={i}>
                          <td className="font-mono text-metadata">{row.timestamp}</td>
                          <td className="font-mono">{row.depthM !== undefined ? `${row.depthM} m` : 'Surface'}</td>
                          <td className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>
                            {row.tempC.toFixed(2)} °C
                          </td>
                          <td className="font-mono">
                            {row.iceThicknessM !== undefined
                              ? `${row.iceThicknessM.toFixed(1)} m`
                              : row.salinityPsu !== undefined
                              ? `${row.salinityPsu.toFixed(2)} PSU`
                              : 'N/A'}
                          </td>
                          <td>
                            <span className="badge-tag live">{row.quality}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Visualization */}
              {activeTab === 'visualization' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PARAMETER PROFILE PLOT
                  </div>
                  <div style={{ backgroundColor: '#071524', border: '1px solid #123B5D', padding: '20px' }}>
                    <svg width="100%" height="220" viewBox="0 0 500 220">
                      <line x1="40" y1="20" x2="480" y2="20" stroke="#123B5D" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="40" y1="100" x2="480" y2="100" stroke="#123B5D" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="40" y1="180" x2="480" y2="180" stroke="#2F6F95" strokeWidth="1" />

                      <text x="5" y="24" fill="#526474" fontSize="9" fontFamily="monospace">MAX</text>
                      <text x="5" y="104" fill="#526474" fontSize="9" fontFamily="monospace">MEAN</text>
                      <text x="5" y="184" fill="#526474" fontSize="9" fontFamily="monospace">MIN</text>

                      <polyline
                        points="60,140 140,135 220,120 300,105 380,85 460,70"
                        fill="none"
                        stroke="#2F6F95"
                        strokeWidth="2.5"
                      />

                      {[60, 140, 220, 300, 380, 460].map((x, i) => (
                        <circle key={i} cx={x} cy={140 - i * 14} r="4" fill="#FFFFFF" stroke="#2F6F95" strokeWidth="2" />
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              {/* Tab 4: Provenance */}
              {activeTab === 'provenance' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    DATA PROVENANCE & W3C LINEAGE RECORD
                  </div>
                  <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '16px', marginBottom: '16px' }}>
                    <div className="text-metadata" style={{ color: '#526474', marginBottom: '4px' }}>
                      SOURCE SENSOR TO PUBLISHED ARTIFACT
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0B1F33', marginBottom: '8px' }}>
                      Observation → Raw Data → Quality Check → Processed Dataset
                    </div>
                    <div className="font-mono text-metadata" style={{ color: '#16232E' }}>
                      Checksum SHA-256: ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d
                    </div>
                  </div>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => onNavigate('provenance')}
                  >
                    View Interactive Lineage Pipeline →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {downloadModal && (
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
              <span style={{ fontSize: '13px', fontWeight: 600 }}>DOWNLOAD SCIENTIFIC DATASET</span>
              <button
                onClick={() => setDownloadModal(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{selectedDataset.title}</h3>
              <p className="text-secondary" style={{ marginBottom: '16px' }}>
                Format: NetCDF-4 (CF-1.8) · Size: {selectedDataset.sizeBytes} · License: {selectedDataset.license}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    alert('Dataset download started.');
                    setDownloadModal(false);
                  }}
                >
                  Confirm Download
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setDownloadModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
