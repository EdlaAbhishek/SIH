import React, { useState } from 'react';
import { NavSection, ResearchStation } from '../../types';
import { RESEARCH_STATIONS } from '../../data/mockData';
import {
  Building2,
  MapPin,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface StationsViewProps {
  onNavigate: (section: NavSection) => void;
}

export const StationsView: React.FC<StationsViewProps> = ({ onNavigate }) => {
  const [stations] = useState<ResearchStation[]>(RESEARCH_STATIONS);
  const [selectedStationId, setSelectedStationId] = useState<string>('sta-mcmurdo');
  const [filterRegion, setFilterRegion] = useState<'ALL' | 'Arctic' | 'Antarctic'>('ALL');

  const filteredStations = stations.filter((st) => {
    if (filterRegion === 'ALL') return true;
    return st.region === filterRegion;
  });

  const selectedStation =
    stations.find((s) => s.id === selectedStationId) || stations[0];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                PERMANENT OBSERVATORIES · ARCTIC & ANTARCTIC
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Research Stations</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Year-round and seasonal scientific stations operating observational networks, meteorological sensors, and deep field camps.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onNavigate('map')}
            >
              <MapPin size={15} />
              <span>Locate Stations on Polar Map</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div className="text-metadata" style={{ fontWeight: 700, color: '#526474' }}>
            REGIONAL FILTER:
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['ALL', 'Antarctic', 'Arctic'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '12px',
                  border: `1px solid ${filterRegion === reg ? '#0B1F33' : '#D8E1E7'}`,
                  cursor: 'pointer',
                  backgroundColor: filterRegion === reg ? '#0B1F33' : '#FFFFFF',
                  color: filterRegion === reg ? '#FFFFFF' : '#16232E',
                  fontWeight: filterRegion === reg ? 600 : 400,
                  borderRadius: '2px',
                }}
              >
                {reg === 'ALL' ? 'All Stations' : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 320px) minmax(500px, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
          }}
          className="station-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .station-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Station Directory */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
            <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
              STATIONS DIRECTORY ({filteredStations.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredStations.map((st) => {
                const isSelected = st.id === selectedStationId;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStationId(st.id)}
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
                        {st.region}
                      </span>
                      <span className="font-mono text-metadata" style={{ fontWeight: 600 }}>
                        {st.currentTemp.toFixed(1)} °C
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                      {st.name}
                    </div>
                    <div className="text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {st.country} · {st.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Station Dossier */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', backgroundColor: '#0B1F33', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-tag arctic">{selectedStation.region}</span>
                    <span className="badge-tag live">{selectedStation.status}</span>
                  </div>
                  <h2 style={{ color: '#FFFFFF', fontSize: '24px', marginBottom: '4px' }}>
                    {selectedStation.name}
                  </h2>
                  <div className="text-metadata" style={{ color: '#D8E1E7' }}>
                    Authority: {selectedStation.country} · Established {selectedStation.establishedYear}
                  </div>
                </div>

                <div style={{ backgroundColor: '#071524', border: '1px solid #123B5D', padding: '10px 16px', textAlign: 'right' }}>
                  <div className="text-metadata" style={{ color: '#526474', fontSize: '10px' }}>
                    SURFACE TEMPERATURE
                  </div>
                  <div className="font-mono" style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF' }}>
                    {selectedStation.currentTemp.toFixed(1)} °C
                  </div>
                  <div className="text-metadata" style={{ color: '#2F6F95' }}>
                    Wind: {selectedStation.currentWind.toFixed(1)} kt
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                  GEOGRAPHIC & LOGISTICS PROFILE
                </div>
                <table className="sci-table">
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600, width: '25%' }}>Coordinates</td>
                      <td className="font-mono">{selectedStation.lat.toFixed(4)}°, {selectedStation.lon.toFixed(4)}°</td>
                      <td style={{ fontWeight: 600, width: '25%' }}>Elevation</td>
                      <td className="font-mono">{selectedStation.elevationM} m ASL</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Personnel</td>
                      <td className="font-mono">{selectedStation.winterPop}w / {selectedStation.summerPop}s</td>
                      <td style={{ fontWeight: 600 }}>Sea-Ice Envelope</td>
                      <td className="font-mono">
                        {selectedStation.seaIceConcentration ? `${selectedStation.seaIceConcentration}%` : 'Inland Ice Sheet'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                  CURRENT ACTIVE RESEARCH
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedStation.activeProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#F7FAFC',
                        border: '1px solid #D8E1E7',
                        fontSize: '13px',
                        color: '#16232E',
                      }}
                    >
                      • {proj}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                  RECENT OBSERVATIONS LOG
                </div>
                <table className="sci-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Parameter</th>
                      <th>Observed Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStation.recentObservations.map((obs, i) => (
                      <tr key={i}>
                        <td className="font-mono text-metadata">{obs.time}</td>
                        <td>{obs.parameter}</td>
                        <td className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>{obs.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <button
                  className="btn-primary btn-sm"
                  onClick={() => onNavigate('map')}
                >
                  <MapPin size={13} />
                  <span>Inspect on Polar Map</span>
                </button>
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => onNavigate('live-data')}
                >
                  <Activity size={13} />
                  <span>View Live Telemetry Feed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
