import React, { useState } from 'react';
import { NavSection, Researcher } from '../../types';
import { RESEARCHERS } from '../../data/mockData';
import {
  User,
  Share2,
  BookOpen,
  Database,
  Ship,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface ResearchersViewProps {
  onNavigate: (section: NavSection) => void;
}

type ResearcherTab = 'overview' | 'research' | 'expeditions' | 'datasets' | 'publications';

export const ResearchersView: React.FC<ResearchersViewProps> = ({ onNavigate }) => {
  const [researchers] = useState<Researcher[]>(RESEARCHERS);
  const [selectedResearcherId, setSelectedResearcherId] = useState<string>('res-rostova');
  const [activeTab, setActiveTab] = useState<ResearcherTab>('overview');

  const selectedResearcher =
    researchers.find((r) => r.id === selectedResearcherId) || researchers[0];

  const tabs: { id: ResearcherTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'expeditions', label: 'Expeditions', icon: Ship },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'publications', label: 'Publications', icon: BookOpen },
  ];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                ACADEMIC DIRECTORY · ORCID VERIFIED
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Researchers</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Curated scientific profiles of principal investigators, physical oceanographers, and glaciologists directing polar field research.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onNavigate('knowledge-graph')}
            >
              <Share2 size={15} />
              <span>Explore in Knowledge Graph</span>
            </button>
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
          className="researcher-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .researcher-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Researchers Directory */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
            <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
              INDEXED RESEARCHERS ({researchers.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {researchers.map((res) => {
                const isSelected = res.id === selectedResearcherId;
                return (
                  <div
                    key={res.id}
                    onClick={() => setSelectedResearcherId(res.id)}
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
                        {res.regionFocus}
                      </span>
                      <span className="font-mono text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                        h-index: {res.hIndex}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                      {res.name}
                    </div>
                    <div className="text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {res.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Scientific Profile with Tabs: Overview | Research | Expeditions | Datasets | Publications */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            {/* Researcher Profile Banner */}
            <div style={{ padding: '24px', backgroundColor: '#0B1F33', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-tag live">{selectedResearcher.regionFocus} Specialist</span>
                    <span className="badge-tag navy">{selectedResearcher.country}</span>
                  </div>
                  <h2 style={{ color: '#FFFFFF', fontSize: '24px', marginBottom: '4px' }}>
                    {selectedResearcher.name}
                  </h2>
                  <div style={{ fontSize: '14px', color: '#E8F1F5', marginBottom: '8px' }}>
                    {selectedResearcher.title} · {selectedResearcher.institution}
                  </div>
                  <div className="font-mono text-metadata" style={{ color: '#2F6F95' }}>
                    ORCID: {selectedResearcher.orcid}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', backgroundColor: '#071524', border: '1px solid #123B5D', padding: '10px 16px', textAlign: 'center' }}>
                  <div>
                    <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>
                      {selectedResearcher.hIndex}
                    </div>
                    <div className="text-metadata" style={{ fontSize: '10px' }}>H-INDEX</div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: '#2F6F95' }}>
                      {selectedResearcher.citations.toLocaleString()}
                    </div>
                    <div className="text-metadata" style={{ fontSize: '10px' }}>CITATIONS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exactly Required Tabs per Section 20: Overview | Research | Expeditions | Datasets | Publications */}
            <div className="sci-tabs" style={{ paddingLeft: '24px' }}>
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    className={`sci-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    <Icon size={14} />
                    <span>{t.label}</span>
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
                      BIOGRAPHICAL SUMMARY
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#16232E' }}>
                      {selectedResearcher.bio}
                    </p>
                  </div>

                  <div>
                    <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                      RESEARCH AREAS & DISCIPLINES
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selectedResearcher.researchInterests.map((area, idx) => (
                        <span key={idx} className="badge-tag navy" style={{ fontSize: '11px' }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Research */}
              {activeTab === 'research' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PRIMARY RESEARCH INVESTIGATIONS
                  </div>
                  <table className="sci-table">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600, width: '30%' }}>Institution</td>
                        <td>{selectedResearcher.institution}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Regional Focus</td>
                        <td>{selectedResearcher.regionFocus} High-Latitude Waters</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Active Grants</td>
                        <td>Sub-ice cavity ocean-ice boundary layer observations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Expeditions */}
              {activeTab === 'expeditions' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    EXPEDITIONS LED & PARTICIPATED ({selectedResearcher.expeditions.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedResearcher.expeditions.map((expId) => (
                      <div
                        key={expId}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #D8E1E7',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: '#0B1F33' }}>{expId}</span>
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => onNavigate('expeditions')}
                        >
                          View Logs →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Datasets */}
              {activeTab === 'datasets' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PUBLISHED DATASETS ({selectedResearcher.datasets.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedResearcher.datasets.map((dsId) => (
                      <div
                        key={dsId}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #D8E1E7',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: '#0B1F33' }}>{dsId}</span>
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => onNavigate('datasets')}
                        >
                          Access NetCDF →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Publications */}
              {activeTab === 'publications' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PEER-REVIEWED SCIENTIFIC PUBLICATIONS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedResearcher.publications.map((pubId) => (
                      <div
                        key={pubId}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #D8E1E7',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: '#0B1F33' }}>{pubId}</span>
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => onNavigate('papers')}
                        >
                          Read Study →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
