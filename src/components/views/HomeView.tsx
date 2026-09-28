import React, { useState } from 'react';
import { NavSection, ResearchStation, Expedition, Dataset, Publication, Researcher } from '../../types';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  Database,
  Ship,
  Building2,
  BookOpen,
  Activity,
  Layers,
  Thermometer,
  Wind,
  ShieldAlert,
  Share2,
  CheckCircle2,
  Sliders,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  PUBLICATIONS,
  RESEARCHERS,
  KNOWLEDGE_NODES,
  KNOWLEDGE_EDGES,
  LIVE_TELEMETRY,
  ANOMALY_ALERTS,
} from '../../data/mockData';

interface HomeViewProps {
  onNavigate: (section: NavSection) => void;
  stations: ResearchStation[];
  expeditions: Expedition[];
  datasets: Dataset[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  stations,
  expeditions,
  datasets,
}) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('What expeditions studied sea-ice thickness in Antarctica?');

  // Map state
  const [mapProjection, setMapProjection] = useState<'antarctic' | 'arctic'>('antarctic');
  const [selectedStation, setSelectedStation] = useState<ResearchStation>(stations[0]);
  const [activeLayers, setActiveLayers] = useState({
    expeditions: true,
    stations: true,
    datasets: true,
    researchers: true,
    seaIce: true,
    temperature: true,
    ocean: true,
    liveSensors: true,
  });

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Live Data state
  const [showCleaned, setShowCleaned] = useState(true);

  // Knowledge Graph state
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState('node-exp-itgc');
  const selectedGraphNode = KNOWLEDGE_NODES.find((n) => n.id === selectedGraphNodeId) || KNOWLEDGE_NODES[0];

  // Search filters list per spec
  const searchFilters = [
    'All',
    'Research',
    'Datasets',
    'Expeditions',
    'Researchers',
    'Stations',
    'Publications',
  ];

  // Structured discovery items (per Section 15 spec)
  const discoveryItems = [
    {
      title: 'Accelerated basal melting across Amundsen Sea ice shelves',
      type: 'Research',
      location: 'Antarctica',
      year: '2024',
      meta: 'Nature Geoscience · DOI: 10.1038/s41561-024-01389-w · 74 citations',
      nav: 'papers' as NavSection,
      actionLabel: 'View Publication',
    },
    {
      title: 'Daily High-Latitude Polar Sea-Ice Concentration and Extent',
      type: 'Dataset',
      location: 'Arctic & Antarctic',
      year: '2023–2026',
      meta: 'AMSR2 / CryoSat-2 multi-sensor blend · 242.1 GB · NetCDF-4 CF-1.8',
      nav: 'datasets' as NavSection,
      actionLabel: 'Access Dataset',
    },
    {
      title: 'MOSAiC Multidisciplinary drifting Observatory',
      type: 'Expedition',
      location: 'Arctic Ocean',
      year: '2019–2020',
      meta: 'RV Polarstern · 1-year drift · 300 international researchers',
      nav: 'expeditions' as NavSection,
      actionLabel: 'View Expedition',
    },
    {
      title: 'Bedmap3: High-Resolution Antarctic Ice Sheet Bed Topography',
      type: 'Dataset',
      location: 'Antarctica',
      year: '2023',
      meta: '500m digital elevation model · British Antarctic Survey consortium',
      nav: 'datasets' as NavSection,
      actionLabel: 'Access Dataset',
    },
    {
      title: 'Arctic sea-ice retreat amplifies pan-Arctic autumn cloud cover',
      type: 'Research',
      location: 'Arctic',
      year: '2023',
      meta: 'Science Advances · DOI: 10.1126/sciadv.abq7412 · 118 citations',
      nav: 'papers' as NavSection,
      actionLabel: 'View Publication',
    },
    {
      title: 'International Thwaites Glacier Collaboration (ITGC)',
      type: 'Expedition',
      location: 'Antarctica',
      year: '2020–2024',
      meta: 'RV Nathaniel B. Palmer · Icefin robotics · Grounding line radar survey',
      nav: 'expeditions' as NavSection,
      actionLabel: 'View Expedition',
    },
  ];

  const filteredDiscovery = discoveryItems.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Research' || activeFilter === 'Publications') return item.type === 'Research';
    if (activeFilter === 'Datasets') return item.type === 'Dataset';
    if (activeFilter === 'Expeditions') return item.type === 'Expedition';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ==================================================
          SECTION 2: HERO (Section 11 in spec)
          ================================================== */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #D8E1E7',
          padding: '64px 0',
        }}
      >
        <div className="page-container">
          <div style={{ maxWidth: '880px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2F6F95',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
              className="font-mono"
            >
              POLAR SCIENCE INTELLIGENCE PLATFORM
            </div>

            <h1 style={{ marginBottom: '20px' }}>
              Understand the Polar Regions Through Research, Data and Discovery.
            </h1>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.6,
                color: '#526474',
                marginBottom: '32px',
                maxWidth: '720px',
              }}
            >
              Connect expeditions, researchers, datasets, publications, stations and observations
              in one intelligent polar research environment.
            </p>

            {/* Buttons per spec */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  const searchEl = document.getElementById('global-search-section');
                  searchEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Polar Research</span>
                <ArrowRight size={15} />
              </button>

              <button
                className="btn-secondary"
                onClick={() => {
                  const mapEl = document.getElementById('polar-map-section');
                  mapEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MapPin size={15} color="#2F6F95" />
                <span>Open Polar Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: GLOBAL SEARCH (Section 12 in spec)
          ================================================== */}
      <section
        id="global-search-section"
        style={{
          backgroundColor: '#F7FAFC',
          borderBottom: '1px solid #D8E1E7',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '6px' }}>Global Research Search</h2>
            <p className="text-secondary">
              Search across polar publications, datasets, expeditions, researchers and research stations.
            </p>
          </div>

          {/* Search Box with Integrated "Ask Polar Bear" AI action */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D8E1E7',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F7FAFC',
                  border: '1px solid #D8E1E7',
                  padding: '0 14px',
                  height: '42px',
                }}
              >
                <Search size={16} color="#526474" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search polar research, datasets, expeditions, researchers..."
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '0 10px',
                    fontSize: '14px',
                    color: '#16232E',
                  }}
                />
              </div>

              {/* Integrated AI Action button */}
              <button
                className="btn-secondary"
                onClick={() => setShowAiModal(!showAiModal)}
                style={{ height: '42px', gap: '6px' }}
              >
                <Sparkles size={15} color="#2F6F95" />
                <span>Ask Polar Bear</span>
              </button>

              <button
                className="btn-primary"
                onClick={() => onNavigate('search')}
                style={{ height: '42px' }}
              >
                Search
              </button>
            </div>

            {/* Filter Pills per specification */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="text-metadata" style={{ fontWeight: 600, color: '#526474', marginRight: '4px' }}>
                FILTERS:
              </span>
              {searchFilters.map((flt) => {
                const isSelected = activeFilter === flt;
                return (
                  <button
                    key={flt}
                    onClick={() => setActiveFilter(flt)}
                    style={{
                      height: '28px',
                      padding: '0 12px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 600 : 400,
                      backgroundColor: isSelected ? '#0B1F33' : '#F7FAFC',
                      color: isSelected ? '#FFFFFF' : '#16232E',
                      border: `1px solid ${isSelected ? '#0B1F33' : '#D8E1E7'}`,
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {flt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Integrated AI Prompt Expansion (if Ask Polar Bear toggled) */}
          {showAiModal && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #123B5D',
                borderLeft: '4px solid #2F6F95',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#2F6F95" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F33' }}>
                    ASK POLAR BEAR (SOURCE-GROUNDED INTELLIGENCE)
                  </span>
                </div>
                <button
                  className="btn-tertiary text-metadata"
                  onClick={() => setShowAiModal(false)}
                >
                  Close
                </button>
              </div>

              <p style={{ fontSize: '13px', color: '#526474', marginBottom: '12px' }}>
                Grounds queries solely in verified polar papers and NetCDF telemetry.
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  style={{
                    flex: 1,
                    border: '1px solid #D8E1E7',
                    padding: '8px 12px',
                    fontSize: '13px',
                    backgroundColor: '#F7FAFC',
                  }}
                />
                <button
                  className="btn-primary btn-sm"
                  onClick={() => onNavigate('ask-ai')}
                >
                  Synthesize Response →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 4: POLAR INTELLIGENCE MAP (Section 13 in spec)
          ================================================== */}
      <section
        id="polar-map-section"
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #D8E1E7',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '6px' }}>Polar Intelligence Map</h2>
              <p className="text-secondary">
                Explore expeditions, research stations, datasets and observations across the polar regions.
              </p>
            </div>

            {/* Projection toggle */}
            <div style={{ display: 'flex', gap: '2px', backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '2px' }}>
              <button
                onClick={() => setMapProjection('antarctic')}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '12px',
                  fontWeight: mapProjection === 'antarctic' ? 600 : 400,
                  backgroundColor: mapProjection === 'antarctic' ? '#0B1F33' : 'transparent',
                  color: mapProjection === 'antarctic' ? '#FFFFFF' : '#16232E',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Antarctic (90°S)
              </button>
              <button
                onClick={() => setMapProjection('arctic')}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '12px',
                  fontWeight: mapProjection === 'arctic' ? 600 : 400,
                  backgroundColor: mapProjection === 'arctic' ? '#0B1F33' : 'transparent',
                  color: mapProjection === 'arctic' ? '#FFFFFF' : '#16232E',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Arctic (90°N)
              </button>
            </div>
          </div>

          {/* Map Controls Row (Per Section 13 in spec: Expeditions, Stations, Datasets, Researchers, Sea Ice, Temperature, Ocean, Live Sensors) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              marginBottom: '16px',
              padding: '10px 14px',
              backgroundColor: '#F7FAFC',
              border: '1px solid #D8E1E7',
            }}
          >
            <span className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginRight: '6px' }}>
              MAP CONTROLS:
            </span>
            {[
              { key: 'expeditions' as const, label: 'Expeditions' },
              { key: 'stations' as const, label: 'Stations' },
              { key: 'datasets' as const, label: 'Datasets' },
              { key: 'researchers' as const, label: 'Researchers' },
              { key: 'seaIce' as const, label: 'Sea Ice' },
              { key: 'temperature' as const, label: 'Temperature' },
              { key: 'ocean' as const, label: 'Ocean' },
              { key: 'liveSensors' as const, label: 'Live Sensors' },
            ].map((ctrl) => {
              const active = activeLayers[ctrl.key];
              return (
                <button
                  key={ctrl.key}
                  onClick={() => toggleLayer(ctrl.key)}
                  style={{
                    height: '26px',
                    padding: '0 10px',
                    fontSize: '11px',
                    fontWeight: active ? 600 : 400,
                    backgroundColor: active ? '#123B5D' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#526474',
                    border: `1px solid ${active ? '#123B5D' : '#D8E1E7'}`,
                    cursor: 'pointer',
                  }}
                >
                  {ctrl.label}
                </button>
              );
            })}
          </div>

          {/* ONE Large Interactive Map Workspace (Strictly no card soup) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(500px, 1.8fr) minmax(280px, 1fr)',
              border: '1px solid #D8E1E7',
              backgroundColor: '#0B1F33',
            }}
            className="home-map-workspace"
          >
            <style>{`
              @media (max-width: 960px) {
                .home-map-workspace { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* SVG Polar Projection Viewport */}
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '440px' }}>
              <svg width="100%" height="400" viewBox="0 0 500 400">
                {/* Graticule rings */}
                <circle cx="250" cy="200" r="170" stroke="#123B5D" strokeWidth="1" fill="#071524" />
                <circle cx="250" cy="200" r="120" stroke="#123B5D" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                <circle cx="250" cy="200" r="70" stroke="#2F6F95" strokeWidth="1" fill="none" />

                {/* Meridian axes */}
                <line x1="250" y1="30" x2="250" y2="370" stroke="#123B5D" strokeWidth="1" />
                <line x1="80" y1="200" x2="420" y2="200" stroke="#123B5D" strokeWidth="1" />

                {mapProjection === 'antarctic' ? (
                  <>
                    {/* Antarctic Continent Silhouette */}
                    <polygon
                      points="250,110 290,130 320,165 330,220 290,270 230,280 180,240 170,180 200,130"
                      fill="#123B5D"
                      stroke="#2F6F95"
                      strokeWidth="1.5"
                    />
                    {/* Sea ice contour */}
                    {activeLayers.seaIce && (
                      <polygon
                        points="250,75 320,105 370,165 375,250 320,320 210,330 130,280 120,160 170,95"
                        fill="none"
                        stroke="#E8F1F5"
                        strokeWidth="1"
                        strokeDasharray="4,2"
                      />
                    )}
                    {/* Stations */}
                    {activeLayers.stations && (
                      <g>
                        <circle
                          cx="250"
                          cy="200"
                          r="5"
                          fill="#FFFFFF"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-southpole') || stations[0])}
                        />
                        <text x="258" y="203" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Amundsen-Scott (90°S)</text>

                        <circle
                          cx="215"
                          cy="245"
                          r="5"
                          fill="#2F6F95"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-mcmurdo') || stations[0])}
                        />
                        <text x="145" y="255" fill="#E8F1F5" fontSize="9" fontFamily="monospace">McMurdo (-77.8°)</text>

                        <circle
                          cx="290"
                          cy="225"
                          r="5"
                          fill="#2F6F95"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-concordia') || stations[0])}
                        />
                        <text x="298" y="228" fill="#E8F1F5" fontSize="9" fontFamily="monospace">Concordia (-75.1°)</text>
                      </g>
                    )}
                  </>
                ) : (
                  <>
                    {/* Greenland & Svalbard Arctic geometry */}
                    <polygon
                      points="200,240 230,250 240,320 210,335 180,300"
                      fill="#123B5D"
                      stroke="#2F6F95"
                      strokeWidth="1.5"
                    />
                    <circle cx="250" cy="200" r="5" fill="#FFFFFF" />
                    <text x="258" y="203" fill="#FFFFFF" fontSize="9" fontFamily="monospace">North Pole (90°N)</text>

                    <circle
                      cx="285"
                      cy="260"
                      r="5"
                      fill="#2F6F95"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-nyalesund') || stations[0])}
                    />
                    <text x="295" y="263" fill="#E8F1F5" fontSize="9" fontFamily="monospace">Ny-Ålesund (78.9°N)</text>
                  </>
                )}
              </svg>
            </div>

            {/* Split Right: Selected Station Intelligence Readout */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderLeft: '1px solid #D8E1E7', display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="badge-tag arctic">{selectedStation.region}</span>
                  <span className="badge-tag live">{selectedStation.status}</span>
                </div>
                <h3 style={{ fontSize: '18px', color: '#0B1F33', marginBottom: '4px' }}>
                  {selectedStation.name}
                </h3>
                <div className="text-secondary" style={{ fontSize: '13px' }}>
                  Authority: {selectedStation.country}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginBottom: '20px' }}>
                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '2px' }}>
                    COORDINATES & ELEVATION
                  </div>
                  <div className="font-mono">
                    {selectedStation.lat.toFixed(3)}°, {selectedStation.lon.toFixed(3)}° ({selectedStation.elevationM}m ASL)
                  </div>
                </div>

                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '2px' }}>
                    ACTIVE EXPEDITIONS
                  </div>
                  <div style={{ color: '#16232E' }}>
                    {selectedStation.activeProjects[0]}
                  </div>
                </div>

                <div>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '2px' }}>
                    RECENT OBSERVATION
                  </div>
                  <div className="font-mono" style={{ color: '#0B1F33', fontWeight: 600 }}>
                    {selectedStation.currentTemp.toFixed(1)}°C (Wind: {selectedStation.currentWind.toFixed(1)} kt)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <button
                  className="btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => onNavigate('map')}
                >
                  Full Map View →
                </button>
                <button
                  className="btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => onNavigate('stations')}
                >
                  Station Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: LIVE POLAR DATA (Section 14 in spec)
          ================================================== */}
      <section
        style={{
          backgroundColor: '#F7FAFC',
          borderBottom: '1px solid #D8E1E7',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ marginBottom: 0 }}>Live Polar Data</h2>
                <span className="badge-tag navy" style={{ fontWeight: 700 }}>
                  DEMO / SIMULATED DATA
                </span>
              </div>
              <p className="text-secondary">
                Real-time telemetry streams from automated weather stations, sea buoys, and mooring CTDs.
              </p>
            </div>

            {/* Raw vs Cleaned Data Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #D8E1E7', padding: '2px' }}>
              <button
                onClick={() => setShowCleaned(true)}
                style={{
                  height: '30px',
                  padding: '0 12px',
                  fontSize: '12px',
                  fontWeight: showCleaned ? 600 : 400,
                  backgroundColor: showCleaned ? '#123B5D' : 'transparent',
                  color: showCleaned ? '#FFFFFF' : '#526474',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cleaned Data (QA/QC)
              </button>
              <button
                onClick={() => setShowCleaned(false)}
                style={{
                  height: '30px',
                  padding: '0 12px',
                  fontSize: '12px',
                  fontWeight: !showCleaned ? 600 : 400,
                  backgroundColor: !showCleaned ? '#123B5D' : 'transparent',
                  color: !showCleaned ? '#FFFFFF' : '#526474',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Raw Telemetry
              </button>
            </div>
          </div>

          {/* Compact Scientific Metrics Row (No giant colorful card soup) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1px',
              backgroundColor: '#D8E1E7',
              border: '1px solid #D8E1E7',
              marginBottom: '20px',
            }}
          >
            {[
              { label: 'Surface Temp (McMurdo)', val: '-24.8 °C', sub: 'Norm: -26.0 °C' },
              { label: 'Plateau Temp (Concordia)', val: showCleaned ? '-62.4 °C' : '-48.2 °C', sub: 'Spike Filtered', alert: !showCleaned },
              { label: 'Wind Velocity (Ny-Ålesund)', val: '14.1 m/s', sub: 'Gust: 22.4 m/s' },
              { label: 'Sea Ice Concentration', val: '74.2%', sub: 'North Pole Buoy #4402' },
              { label: 'Ocean Temp at -300m', val: '+0.44 °C', sub: 'Maud Rise Mooring' },
            ].map((metric, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div className="text-metadata" style={{ color: '#526474', marginBottom: '6px' }}>
                  {metric.label}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: metric.alert ? '#A82020' : '#0B1F33',
                  }}
                >
                  {metric.val}
                </div>
                <div style={{ fontSize: '11px', color: '#526474', marginTop: '4px' }}>
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Anomaly Detection Banner */}
          <div
            style={{
              backgroundColor: '#FDF2F2',
              border: '1px solid #F8B4B4',
              borderLeft: '4px solid #A82020',
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={18} color="#A82020" />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#A82020' }}>
                  Polar Bear detected an unusual observation:
                </span>{' '}
                <span style={{ fontSize: '13px', color: '#16232E' }}>
                  Concordia AWS logged a sudden +14.2°C thermal surge (+4.8σ historical envelope).
                </span>
              </div>
            </div>
            <button
              className="btn-secondary btn-sm"
              onClick={() => onNavigate('live-data')}
            >
              Inspect Telemetry Center →
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: RESEARCH DISCOVERY (Section 15 in spec)
          ================================================== */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #D8E1E7',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '6px' }}>Research Discovery</h2>
              <p className="text-secondary">
                Curated polar papers, datasets and expeditions structured for rapid scientific discovery.
              </p>
            </div>
            <button
              className="btn-secondary btn-sm"
              onClick={() => onNavigate('papers')}
            >
              Browse All Research →
            </button>
          </div>

          {/* Structured Scientific List Layout (Per Section 15 in spec: Title, Type · Location · Year, Short metadata, Action) */}
          <div style={{ border: '1px solid #D8E1E7' }}>
            <table className="sci-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Classification</th>
                  <th>Metadata / Identifiers</th>
                  <th style={{ width: '140px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiscovery.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate(item.nav)}
                  >
                    <td>
                      <div style={{ fontWeight: 600, color: '#0B1F33', marginBottom: '2px' }}>
                        {item.title}
                      </div>
                    </td>
                    <td>
                      <div className="text-metadata" style={{ color: '#526474' }}>
                        <strong>{item.type}</strong> · {item.location} · {item.year}
                      </div>
                    </td>
                    <td className="font-mono text-metadata">
                      {item.meta}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-tertiary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(item.nav);
                        }}
                      >
                        <span>{item.actionLabel}</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: KNOWLEDGE GRAPH (Section 16 in spec)
          ================================================== */}
      <section
        style={{
          backgroundColor: '#F7FAFC',
          borderBottom: '1px solid #D8E1E7',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '6px' }}>Polar Science Knowledge Graph</h2>
              <p className="text-secondary">
                Visual relationship explorer: Researcher → Expedition → Location → Dataset → Publication.
              </p>
            </div>
            <button
              className="btn-secondary btn-sm"
              onClick={() => onNavigate('knowledge-graph')}
            >
              Full Graph Explorer →
            </button>
          </div>

          {/* Interactive Clean Technical Graph Visualization */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(480px, 1.8fr) minmax(280px, 1fr)',
              border: '1px solid #D8E1E7',
              backgroundColor: '#071524',
            }}
            className="home-graph-grid"
          >
            <style>{`
              @media (max-width: 960px) {
                .home-graph-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* SVG Network Viewport */}
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="320" viewBox="150 70 1000 360">
                {/* Edges */}
                {KNOWLEDGE_EDGES.map((e) => {
                  const src = KNOWLEDGE_NODES.find((n) => n.id === e.source);
                  const tgt = KNOWLEDGE_NODES.find((n) => n.id === e.target);
                  if (!src || !tgt) return null;
                  const isConnected = e.source === selectedGraphNodeId || e.target === selectedGraphNodeId;
                  return (
                    <line
                      key={e.id}
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={isConnected ? '#2F6F95' : '#123B5D'}
                      strokeWidth={isConnected ? 2 : 1}
                      strokeDasharray={isConnected ? 'none' : '3,3'}
                    />
                  );
                })}

                {/* Nodes */}
                {KNOWLEDGE_NODES.map((n) => {
                  const isSelected = n.id === selectedGraphNodeId;
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x}, ${n.y})`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedGraphNodeId(n.id)}
                    >
                      <circle
                        r={isSelected ? 22 : 16}
                        fill={isSelected ? '#2F6F95' : '#0B1F33'}
                        stroke={isSelected ? '#FFFFFF' : '#123B5D'}
                        strokeWidth={isSelected ? 2.5 : 1}
                      />
                      <text
                        y={isSelected ? 36 : 30}
                        fill={isSelected ? '#FFFFFF' : '#D8E1E7'}
                        fontSize="11"
                        fontWeight={isSelected ? 700 : 500}
                        textAnchor="middle"
                      >
                        {n.label}
                      </text>
                      <text
                        y={isSelected ? 48 : 42}
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

            {/* Split Right: Compact Entity Inspector */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderLeft: '1px solid #D8E1E7', display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '14px' }}>
                <span className="badge-tag navy" style={{ marginBottom: '4px' }}>
                  {selectedGraphNode.type}
                </span>
                <h3 style={{ fontSize: '18px', color: '#0B1F33', marginBottom: '2px' }}>
                  {selectedGraphNode.label}
                </h3>
                <div className="text-secondary" style={{ fontSize: '12px' }}>
                  {selectedGraphNode.subtext}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {Object.entries(selectedGraphNode.meta).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#526474', textTransform: 'capitalize' }}>{k}:</span>
                    <span className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>
                      {String(v)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  className="btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onNavigate('knowledge-graph')}
                >
                  Explore Complete Graph Network →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: EDUCATION (Section 10, Step 8 in spec)
          ================================================== */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '48px 0',
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '6px' }}>Polar Science Education</h2>
              <p className="text-secondary">
                Foundational concepts for students and curricula for teachers.
              </p>
            </div>
            <button
              className="btn-secondary btn-sm"
              onClick={() => onNavigate('education')}
            >
              Education Portal →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag arctic">Student Mode</span>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
                Accessible Polar Science
              </h3>
              <p style={{ fontSize: '14px', color: '#526474', lineHeight: 1.5, marginBottom: '16px' }}>
                Simple, jargon-free explanations of polar climate, sea ice dynamics, glacier stability, and wildlife adaptations.
              </p>
              <button
                className="btn-secondary btn-sm"
                onClick={() => onNavigate('education')}
              >
                Open Student Explanations →
              </button>
            </div>

            <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag navy">Teacher Resources</span>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
                Classroom Activities & Lesson Plans
              </h3>
              <p style={{ fontSize: '14px', color: '#526474', lineHeight: 1.5, marginBottom: '16px' }}>
                Downloadable high-school and undergraduate lab exercises incorporating authentic datasets from Polar Bear archives.
              </p>
              <button
                className="btn-secondary btn-sm"
                onClick={() => onNavigate('education')}
              >
                Download Lesson Plans →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
