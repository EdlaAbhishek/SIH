import React, { useState } from 'react';
import { NavSection, Expedition } from '../../types';
import { EXPEDITIONS } from '../../data/mockData';
import {
  Ship,
  MapPin,
  Calendar,
  Users,
  Database,
  BookOpen,
  Image,
  GitBranch,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ExpeditionsViewProps {
  onNavigate: (section: NavSection) => void;
}

type TabType =
  | 'overview'
  | 'route'
  | 'timeline'
  | 'team'
  | 'datasets'
  | 'publications'
  | 'media'
  | 'provenance';

export const ExpeditionsView: React.FC<ExpeditionsViewProps> = ({ onNavigate }) => {
  const [expeditions] = useState<Expedition[]>(EXPEDITIONS);
  const [selectedExpId, setSelectedExpId] = useState<string>('exp-mosaic');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const selectedExp = expeditions.find((e) => e.id === selectedExpId) || expeditions[0];

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Ship },
    { id: 'route', label: 'Route', icon: MapPin },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'provenance', label: 'Provenance', icon: GitBranch },
  ];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                FIELDWORK OPERATIONS · HIGH-LATITUDE RESEARCH
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Expeditions</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Multidisciplinary research campaigns, icebreaker drift stations, and autonomous robotic surveys across the Arctic and Antarctic.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onNavigate('map')}
            >
              <MapPin size={15} />
              <span>Open Expedition in Polar Map</span>
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
          className="expedition-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .expedition-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Expedition Directory */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
            <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
              INDEXED EXPEDITIONS ({expeditions.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {expeditions.map((exp) => {
                const isSelected = exp.id === selectedExpId;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
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
                        {exp.region}
                      </span>
                      <span className="font-mono text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#0B6B40', fontWeight: 600 }}>
                        {exp.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '2px' }}>
                      {exp.name}
                    </div>
                    <div className="text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {exp.vesselOrBase}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Expedition Inspector (Tabs: Overview | Route | Timeline | Team | Datasets | Publications | Media | Provenance) */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            {/* Expedition Header Banner */}
            <div style={{ padding: '20px 24px', backgroundColor: '#0B1F33', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag arctic">{selectedExp.region} Sector</span>
                <span className="badge-tag live">{selectedExp.status}</span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '22px', marginBottom: '6px' }}>
                {selectedExp.name}
              </h2>
              <div className="text-metadata" style={{ color: '#D8E1E7' }}>
                Institution: {selectedExp.organization} · Lead PI: {selectedExp.leadResearcher}
              </div>
            </div>

            {/* Exactly Required Tabs per Section 19 */}
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
                  <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', borderLeft: '4px solid #2F6F95', padding: '16px' }}>
                    <div className="text-metadata" style={{ fontWeight: 700, color: '#123B5D', marginBottom: '6px' }}>
                      EXPEDITION SUMMARY
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#16232E' }}>
                      {selectedExp.aiSummary}
                    </p>
                  </div>

                  <div>
                    <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                      RESEARCH OBJECTIVES
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedExp.objectives.map((obj, i) => (
                        <li
                          key={i}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D8E1E7',
                            padding: '10px 14px',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <CheckCircle2 size={15} color="#0B6B40" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Route */}
              {activeTab === 'route' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    WAYPOINT COORDINATES & SURVEY TRACK
                  </div>
                  <table className="sci-table">
                    <thead>
                      <tr>
                        <th>Waypoint</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Marker</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedExp.route.map((pt, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{pt.name}</td>
                          <td className="font-mono">{pt.lat.toFixed(3)}°</td>
                          <td className="font-mono">{pt.lon.toFixed(3)}°</td>
                          <td>
                            <span className="badge-tag navy">{pt.day}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: '16px' }}>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => onNavigate('map')}
                    >
                      <MapPin size={13} />
                      <span>View Route on Polar Map</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Timeline */}
              {activeTab === 'timeline' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '16px' }}>
                    OPERATIONS TIMELINE ({selectedExp.startDate} → {selectedExp.endDate})
                  </div>
                  <div style={{ borderLeft: '2px solid #2F6F95', paddingLeft: '20px', marginLeft: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {selectedExp.route.map((pt, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <div
                          style={{
                            position: 'absolute',
                            left: '-25px',
                            top: '4px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#0B1F33',
                            border: '1px solid #FFFFFF',
                            borderRadius: '50%',
                          }}
                        />
                        <div className="text-metadata font-mono" style={{ color: '#2F6F95', fontWeight: 600 }}>
                          {pt.day}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0B1F33' }}>
                          {pt.name}
                        </div>
                        <div className="text-secondary" style={{ fontSize: '13px' }}>
                          Coordinates: {pt.lat}°, {pt.lon}°
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Team */}
              {activeTab === 'team' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PRINCIPAL INVESTIGATOR & RESEARCH TEAM
                  </div>
                  <div style={{ border: '1px solid #D8E1E7', padding: '16px', backgroundColor: '#F7FAFC' }}>
                    <span className="badge-tag navy" style={{ marginBottom: '6px' }}>Chief Scientist</span>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{selectedExp.leadResearcher}</h3>
                    <p className="text-secondary" style={{ marginBottom: '12px' }}>
                      {selectedExp.organization}
                    </p>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => onNavigate('researchers')}
                    >
                      View Researcher Profile →
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 5: Datasets */}
              {activeTab === 'datasets' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    INGESTED EXPEDITION DATASETS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedExp.datasets.map((dsId) => (
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
                        <div>
                          <div style={{ fontWeight: 600, color: '#0B1F33' }}>{dsId}</div>
                          <div className="text-metadata">NetCDF-4 format · Quality controlled</div>
                        </div>
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => onNavigate('datasets')}
                        >
                          Access Dataset →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Publications */}
              {activeTab === 'publications' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    PEER-REVIEWED SCIENTIFIC PUBLICATIONS
                  </div>
                  {selectedExp.publications.map((pubId) => (
                    <div
                      key={pubId}
                      style={{
                        padding: '14px 16px',
                        border: '1px solid #D8E1E7',
                        backgroundColor: '#FFFFFF',
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#0B1F33' }}>{pubId}</div>
                        <div className="text-metadata">Indexed in Polar Bear archive</div>
                      </div>
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => onNavigate('papers')}
                      >
                        Read Publication →
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 7: Media */}
              {activeTab === 'media' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    MULTIMODAL ARCHIVE ({selectedExp.photosCount} PHOTOS · {selectedExp.videosCount} VIDEOS)
                  </div>
                  <p className="text-secondary" style={{ marginBottom: '16px' }}>
                    Drone orthophotography, autonomous underwater footage, and acoustic hydrophone logs.
                  </p>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => onNavigate('multimodal')}
                  >
                    Open Multimodal Archive with Transcripts →
                  </button>
                </div>
              )}

              {/* Tab 8: Provenance */}
              {activeTab === 'provenance' && (
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
                    EXPEDITION FIELD DATA INTEGRITY PROVENANCE
                  </div>
                  <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '16px', marginBottom: '16px' }}>
                    <div className="text-metadata" style={{ color: '#526474', marginBottom: '4px' }}>
                      ROOT HASH (SHA-256):
                    </div>
                    <div className="font-mono text-metadata" style={{ color: '#16232E' }}>
                      {selectedExp.provenanceHash}
                    </div>
                  </div>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => onNavigate('provenance')}
                  >
                    Inspect in Provenance Lifecycle Viewer →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
