import React, { useState } from 'react';
import { ResearchStation, Expedition, Dataset, NavSection } from '../../types';
import {
  Layers,
  MapPin,
  Ship,
  Database,
  Building2,
  Activity,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Info,
  Radio,
  ExternalLink,
  ChevronRight,
  Filter,
  Compass,
} from 'lucide-react';

interface PolarMapViewProps {
  stations: ResearchStation[];
  expeditions: Expedition[];
  datasets: Dataset[];
  onNavigate: (section: NavSection) => void;
}

type ProjectionMode = 'antarctic' | 'arctic' | 'global';

export const PolarMapView: React.FC<PolarMapViewProps> = ({
  stations,
  expeditions,
  datasets,
  onNavigate,
}) => {
  const [projection, setProjection] = useState<ProjectionMode>('antarctic');
  const [selectedStation, setSelectedStation] = useState<ResearchStation | null>(stations[0]);
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [cursorCoords, setCursorCoords] = useState<{ lat: string; lon: string }>({
    lat: '-77°50\'45" S',
    lon: '166°40\'04" E',
  });

  // Layer Toggles
  const [layers, setLayers] = useState({
    stations: true,
    expeditions: true,
    datasets: true,
    seaIce: true,
    temperature: true,
    oceanObs: true,
    liveSensors: true,
    activityHeat: false,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev [layerKey] }));
  };

  // Filter stations based on current projection
  const visibleStations = stations.filter((st) => {
    if (projection === 'antarctic') return st.region === 'Antarctic';
    if (projection === 'arctic') return st.region === 'Arctic';
    return true;
  });

  // Filter expeditions based on current projection
  const visibleExpeditions = expeditions.filter((exp) => {
    if (projection === 'antarctic') return exp.region === 'Antarctic' || exp.region === 'Both';
    if (projection === 'arctic') return exp.region === 'Arctic' || exp.region === 'Both';
    return true;
  });

  // Handle map cursor coordinate simulation
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.min(Math.sqrt(x * x + y * y), 200);
    const angle = (Math.atan2(y, x) * 180) / Math.PI;

    if (projection === 'antarctic') {
      const latVal = (90 - (dist / 200) * 30).toFixed(2);
      setCursorCoords({
        lat: `-${latVal}° S`,
        lon: `${Math.abs(angle).toFixed(1)}° ${angle >= 0 ? 'E' : 'W'}`,
      });
    } else if (projection === 'arctic') {
      const latVal = (90 - (dist / 200) * 30).toFixed(2);
      setCursorCoords({
        lat: `+${latVal}° N`,
        lon: `${Math.abs(angle).toFixed(1)}° ${angle >= 0 ? 'E' : 'W'}`,
      });
    } else {
      setCursorCoords({
        lat: `${(-y / 3).toFixed(1)}°`,
        lon: `${(x / 2).toFixed(1)}°`,
      });
    }
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                PRIMARY GEOSPATIAL INSTRUMENT · WGS 84 / NSIDC POLAR STEREOGRAPHIC
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Intelligence Map</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Explore expeditions, research stations, datasets and observations across the polar regions.
              </p>
            </div>

            {/* Projection Mode Switcher */}
            <div style={{ display: 'flex', gap: '2px', backgroundColor: '#E8F1F5', padding: '3px', border: '1px solid #D8E1E7' }}>
              <button
                onClick={() => setProjection('antarctic')}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: projection === 'antarctic' ? 600 : 400,
                  backgroundColor: projection === 'antarctic' ? '#0B1F33' : 'transparent',
                  color: projection === 'antarctic' ? '#FFFFFF' : '#123B5D',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Antarctic (90°S)
              </button>
              <button
                onClick={() => setProjection('arctic')}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: projection === 'arctic' ? 600 : 400,
                  backgroundColor: projection === 'arctic' ? '#0B1F33' : 'transparent',
                  color: projection === 'arctic' ? '#FFFFFF' : '#123B5D',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Arctic (90°N)
              </button>
              <button
                onClick={() => setProjection('global')}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: projection === 'global' ? 600 : 400,
                  backgroundColor: projection === 'global' ? '#0B1F33' : 'transparent',
                  color: projection === 'global' ? '#FFFFFF' : '#123B5D',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Global Corridor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Main Map Interface: Split Panel Architecture */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 300px) minmax(480px, 1fr) minmax(320px, 380px)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '680px',
        }}
        className="map-grid-container"
      >
        <style>{`
          @media (max-width: 1080px) {
            .map-grid-container {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Panel 1: Layer Controls & Scientific Overlays */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#526474',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="font-mono"
          >
            <Layers size={14} color="#2F6F95" />
            <span>Map Layers & Telemetry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {[
              { key: 'stations' as const, label: 'Research Stations', count: visibleStations.length, color: '#2F6F95' },
              { key: 'expeditions' as const, label: 'Active Expeditions & Routes', count: visibleExpeditions.length, color: '#123B5D' },
              { key: 'datasets' as const, label: 'Spatial Datasets', count: datasets.length, color: '#0E7490' },
              { key: 'seaIce' as const, label: 'Sea-Ice Concentration Contour', count: 'Daily AMSR2', color: '#526474' },
              { key: 'temperature' as const, label: 'Isothermal Temperature Field', count: '-65°C to 0°C', color: '#16232E' },
              { key: 'oceanObs' as const, label: 'Argo Floats & CTD Moorings', count: 18, color: '#0B6B40' },
              { key: 'liveSensors' as const, label: 'Live Weather AWS Sensors', count: '14 Synced', color: '#10B981' },
              { key: 'activityHeat' as const, label: 'Research Activity Density', count: 'High Resolution', color: '#9C5700' },
            ].map((layer) => {
              const active = layers[layer.key];
              return (
                <div
                  key={layer.key}
                  onClick={() => toggleLayer(layer.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    backgroundColor: active ? '#E8F1F5' : '#F7FAFC',
                    border: `1px solid ${active ? '#2F6F95' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: active ? layer.color : '#D8E1E7',
                        border: '1px solid #123B5D',
                      }}
                    />
                    <span style={{ fontWeight: active ? 600 : 400, color: '#0B1F33' }}>{layer.label}</span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#526474' }}>
                    {layer.count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Station Selector List */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #D8E1E7' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginBottom: '8px' }} className="font-mono">
              DIRECT STATION INSPECT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto' }}>
              {visibleStations.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStation(st);
                    setSelectedExpedition(null);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '6px 8px',
                    fontSize: '12px',
                    backgroundColor: selectedStation?.id === st.id ? '#123B5D' : 'transparent',
                    color: selectedStation?.id === st.id ? '#FFFFFF' : '#0B1F33',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{st.name}</span>
                  <span className="font-mono" style={{ fontSize: '10px' }}>
                    {st.currentTemp.toFixed(1)}°C
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Interactive Polar Projection Map Canvas */}
        <div
          style={{
            backgroundColor: '#0B1F33',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Map Status Bar */}
          <div
            style={{
              padding: '8px 14px',
              backgroundColor: '#071524',
              borderBottom: '1px solid #123B5D',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#D8E1E7',
            }}
            className="font-mono"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#2F6F95', fontWeight: 700 }}>
                {projection.toUpperCase()} STEREOGRAPHIC POLAR PROJECTION
              </span>
              <span>•</span>
              <span>CURSOR: {cursorCoords.lat}, {cursorCoords.lon}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.2))}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 6px', cursor: 'pointer' }}
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 6px', cursor: 'pointer' }}
                title="Zoom Out"
              >
                -
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                style={{ background: '#123B5D', border: '1px solid #2F6F95', color: '#FFFFFF', padding: '2px 6px', cursor: 'pointer', fontSize: '10px' }}
                title="Reset Zoom"
              >
                100%
              </button>
            </div>
          </div>

          {/* SVG Map Canvas (Strictly solid colors, scientific lines, no gradients) */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <svg
              width="100%"
              height="580"
              viewBox="0 0 600 580"
              onMouseMove={handleMouseMove}
              style={{
                cursor: 'crosshair',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {projection === 'antarctic' && (
                <g transform="translate(300, 290)">
                  {/* Graticule Latitude Rings (60°S, 70°S, 80°S) */}
                  <circle r="260" stroke="#123B5D" strokeWidth="1" fill="#071524" />
                  <circle r="200" stroke="#123B5D" strokeWidth="1" strokeDasharray="4,4" fill="none" />
                  <circle r="130" stroke="#2F6F95" strokeWidth="1" fill="none" />
                  <circle r="60" stroke="#123B5D" strokeWidth="1" strokeDasharray="3,3" fill="none" />

                  {/* Meridian Crosshairs */}
                  <line x1="-260" y1="0" x2="260" y2="0" stroke="#123B5D" strokeWidth="1" />
                  <line x1="0" y1="-260" x2="0" y2="260" stroke="#123B5D" strokeWidth="1" />
                  <line x1="-184" y1="-184" x2="184" y2="184" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="-184" y1="184" x2="184" y2="-184" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />

                  {/* Graticule Degree Text */}
                  <text x="5" y="-245" fill="#526474" fontSize="10" fontFamily="monospace">60°S (0° Prime Meridian)</text>
                  <text x="5" y="-185" fill="#526474" fontSize="10" fontFamily="monospace">70°S</text>
                  <text x="5" y="-115" fill="#526474" fontSize="10" fontFamily="monospace">80°S</text>
                  <text x="245" y="-5" fill="#526474" fontSize="10" fontFamily="monospace">90°E</text>
                  <text x="-255" y="-5" fill="#526474" fontSize="10" fontFamily="monospace">90°W</text>
                  <text x="5" y="255" fill="#526474" fontSize="10" fontFamily="monospace">180°</text>

                  {/* Sea Ice Concentration Layer (Contour Polygon) */}
                  {layers.seaIce && (
                    <polygon
                      points="
                        0,-220 70,-200 150,-170 210,-100 230,-20 220,70 170,160 110,210 20,230
                        -70,220 -150,170 -200,90 -220,0 -200,-90 -130,-170 -60,-210
                      "
                      fill="#123B5D"
                      stroke="#2F6F95"
                      strokeWidth="1.5"
                      strokeDasharray="4,2"
                    />
                  )}

                  {/* Antarctic Landmass Geometry (Solid Navy / Pale Ice Border) */}
                  <polygon
                    points="
                      0,-160 40,-150 90,-130 130,-70 150,-10 140,50 110,110 70,140 10,150
                      -40,140 -90,110 -130,50 -150,-20 -130,-80 -90,-120 -40,-150
                    "
                    fill="#0B1F33"
                    stroke="#D8E1E7"
                    strokeWidth="2"
                  />

                  {/* Antarctic Peninsula extension */}
                  <polygon
                    points="-90,-120 -120,-170 -135,-200 -125,-205 -110,-175 -80,-130"
                    fill="#0B1F33"
                    stroke="#D8E1E7"
                    strokeWidth="1.5"
                  />

                  {/* Ross Ice Shelf Cavity */}
                  <polygon
                    points="-10,120 40,110 50,140 -10,150"
                    fill="#123B5D"
                    stroke="#2F6F95"
                    strokeWidth="1"
                  />

                  {/* Filchner-Ronne Ice Shelf */}
                  <polygon
                    points="-40,-110 -70,-90 -60,-130"
                    fill="#123B5D"
                    stroke="#2F6F95"
                    strokeWidth="1"
                  />

                  {/* Expedition Routes Layer */}
                  {layers.expeditions && (
                    <g>
                      {/* ITGC Route Track */}
                      <polyline
                        points="-135,-200 -140,-150 -130,-50 -110,40"
                        stroke="#2F6F95"
                        strokeWidth="2"
                        strokeDasharray="5,3"
                        fill="none"
                      />
                      {/* Weddell Sea 2024 Track */}
                      <polyline
                        points="-125,-205 -80,-160 -30,-150 10,-120"
                        stroke="#0E7490"
                        strokeWidth="2"
                        strokeDasharray="6,2"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* Ocean CTD Moorings */}
                  {layers.oceanObs && (
                    <g>
                      <circle cx="10" cy="-140" r="5" fill="#0B6B40" stroke="#FFFFFF" strokeWidth="1" />
                      <text x="18" y="-136" fill="#A7F3D0" fontSize="9" fontFamily="monospace">AWI-207 CTD</text>

                      <circle cx="-140" cy="-60" r="5" fill="#0B6B40" stroke="#FFFFFF" strokeWidth="1" />
                      <text x="-135" y="-55" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Amundsen Argo #690</text>
                    </g>
                  )}

                  {/* Research Stations Markers */}
                  {layers.stations && (
                    <g>
                      {/* South Pole */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-southpole') || null)}
                      >
                        <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#0B1F33" strokeWidth="2" />
                        <text x="8" y="4" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="monospace">
                          Amundsen–Scott (90°S)
                        </text>
                      </g>

                      {/* McMurdo */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-mcmurdo') || null)}
                      >
                        <circle cx="30" cy="130" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="40" y="134" fill="#E8F1F5" fontSize="10" fontWeight="600" fontFamily="monospace">
                          McMurdo (-77.8°)
                        </text>
                      </g>

                      {/* Concordia Dome C */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-concordia') || null)}
                      >
                        <circle cx="90" cy="40" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="90" cy="40" r="12" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                        <text x="100" y="44" fill="#E8F1F5" fontSize="10" fontWeight="600" fontFamily="monospace">
                          Concordia (-75.1°) [ANOMALY]
                        </text>
                      </g>

                      {/* Neumayer III */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-neumayer') || null)}
                      >
                        <circle cx="-15" cy="-145" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="-120" y="-142" fill="#E8F1F5" fontSize="10" fontWeight="600" fontFamily="monospace">
                          Neumayer III (-70.6°)
                        </text>
                      </g>

                      {/* Bharati */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-bharati') || null)}
                      >
                        <circle cx="120" cy="-50" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="130" y="-47" fill="#E8F1F5" fontSize="10" fontWeight="600" fontFamily="monospace">
                          Bharati (India, -69.4°)
                        </text>
                      </g>

                      {/* Rothera */}
                      <g
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-rothera') || null)}
                      >
                        <circle cx="-130" cy="-185" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="-215" y="-182" fill="#E8F1F5" fontSize="10" fontWeight="600" fontFamily="monospace">
                          Rothera (UK, -67.6°)
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* Arctic Projection (North Pole 90°N) */}
              {projection === 'arctic' && (
                <g transform="translate(300, 290)">
                  <circle r="260" stroke="#123B5D" strokeWidth="1" fill="#071524" />
                  <circle r="180" stroke="#123B5D" strokeWidth="1" strokeDasharray="4,4" fill="none" />
                  <circle r="100" stroke="#2F6F95" strokeWidth="1" fill="none" />

                  <line x1="-260" y1="0" x2="260" y2="0" stroke="#123B5D" strokeWidth="1" />
                  <line x1="0" y1="-260" x2="0" y2="260" stroke="#123B5D" strokeWidth="1" />

                  {/* Greenland Mass */}
                  <polygon
                    points="-70,40 -20,60 -10,160 -50,190 -90,150 -100,70"
                    fill="#0B1F33"
                    stroke="#D8E1E7"
                    strokeWidth="1.5"
                  />

                  {/* Svalbard Archipelago */}
                  <polygon
                    points="30,80 50,75 55,95 35,100"
                    fill="#0B1F33"
                    stroke="#D8E1E7"
                    strokeWidth="1.5"
                  />

                  {/* MOSAiC Drift Polyline */}
                  <polyline
                    points="80,110 50,40 10,-40 -20,-70 -35,-10"
                    stroke="#2F6F95"
                    strokeWidth="2.5"
                    strokeDasharray="4,2"
                    fill="none"
                  />
                  <text x="60" y="30" fill="#E8F1F5" fontSize="9" fontFamily="monospace">
                    MOSAiC Polarstern 1-Year Drift
                  </text>

                  {/* Ny-Ålesund Station */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-nyalesund') || null)}
                  >
                    <circle cx="45" cy="85" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="55" y="89" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="monospace">
                      Ny-Ålesund (78.9°N)
                    </text>
                  </g>

                  {/* Summit Station */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedStation(stations.find((s) => s.id === 'sta-summit') || null)}
                  >
                    <circle cx="-50" cy="110" r="6" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="-140" y="113" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="monospace">
                      Summit Greenland (72.6°N)
                    </text>
                  </g>

                  {/* Geographic North Pole */}
                  <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                  <text x="8" y="4" fill="#FFFFFF" fontSize="9" fontFamily="monospace">
                    North Pole 90°N
                  </text>
                </g>
              )}

              {/* Global Corridor Projection */}
              {projection === 'global' && (
                <g transform="translate(300, 290)">
                  <rect x="-280" y="-180" width="560" height="360" fill="#071524" stroke="#123B5D" strokeWidth="1" />
                  <line x1="-280" y1="0" x2="280" y2="0" stroke="#123B5D" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="-280" y1="-120" x2="280" y2="-120" stroke="#2F6F95" strokeWidth="1" />
                  <line x1="-280" y1="120" x2="280" y2="120" stroke="#2F6F95" strokeWidth="1" />

                  <text x="-270" y="-125" fill="#2F6F95" fontSize="10" fontFamily="monospace">66.5°N Arctic Circle</text>
                  <text x="-270" y="115" fill="#2F6F95" fontSize="10" fontFamily="monospace">66.5°S Antarctic Circle</text>
                  <text x="-270" y="5" fill="#526474" fontSize="10" fontFamily="monospace">0° Equator</text>

                  {/* Stations plotted on global coordinates */}
                  {stations.map((st, i) => {
                    const gx = (st.lon / 180) * 260;
                    const gy = (-st.lat / 90) * 160;
                    return (
                      <g
                        key={st.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedStation(st)}
                      >
                        <circle cx={gx} cy={gy} r="5" fill="#2F6F95" stroke="#FFFFFF" strokeWidth="1" />
                        <text x={gx + 8} y={gy + 3} fill="#E8F1F5" fontSize="8" fontFamily="monospace">
                          {st.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Panel 3: Structured Station / Feature Inspector (Per User Spec: McMurdo Station example) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {selectedStation ? (
            <div>
              {/* Header */}
              <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className={`badge-tag ${selectedStation.region === 'Arctic' ? 'arctic' : 'navy'}`}>
                    {selectedStation.region} Station
                  </span>
                  <span className="badge-tag live">{selectedStation.status}</span>
                </div>
                <h2 style={{ fontSize: '20px', color: '#0B1F33', marginBottom: '4px' }}>
                  {selectedStation.name}
                </h2>
                <div style={{ fontSize: '12px', color: '#526474' }}>
                  Managing Authority: <strong>{selectedStation.country}</strong>
                </div>
              </div>

              {/* Structured Metadata List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                {/* 1. Location */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    1. Geographic Location
                  </div>
                  <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '8px 12px' }} className="font-mono">
                    <div>Coordinates: {selectedStation.lat.toFixed(3)}°, {selectedStation.lon.toFixed(3)}°</div>
                    <div>Elevation: {selectedStation.elevationM} m above sea level</div>
                    <div>Established: {selectedStation.establishedYear} (Pop: {selectedStation.winterPop}w / {selectedStation.summerPop}s)</div>
                  </div>
                </div>

                {/* 2. Active Expeditions */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    2. Active Expeditions & Programs
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedStation.activeProjects.map((proj, idx) => (
                      <li
                        key={idx}
                        style={{
                          backgroundColor: '#E8F1F5',
                          padding: '6px 10px',
                          border: '1px solid #D8E1E7',
                          color: '#123B5D',
                          fontSize: '12px',
                        }}
                      >
                        • {proj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Researchers */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    3. On-Site & Connected Researchers
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedStation.activeResearchers.map((resId) => (
                      <button
                        key={resId}
                        onClick={() => onNavigate('researchers')}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #2F6F95',
                          color: '#2F6F95',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {resId === 'res-rostova'
                          ? 'Dr. Elena Rostova'
                          : resId === 'res-vaughan'
                          ? 'Dr. David Vaughan'
                          : resId === 'res-kumar'
                          ? 'Dr. Rajesh Kumar'
                          : resId === 'res-lindqvist'
                          ? 'Dr. Astrid Lindqvist'
                          : 'Dr. Antoine Chen'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Datasets & Publications */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    4. Connected Scientific Outputs
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0B1F33' }}>{selectedStation.datasetsCount}</div>
                      <div style={{ fontSize: '11px', color: '#526474' }}>Ingested Datasets</div>
                    </div>
                    <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0B1F33' }}>{selectedStation.publicationsCount}</div>
                      <div style={{ fontSize: '11px', color: '#526474' }}>Linked Publications</div>
                    </div>
                  </div>
                </div>

                {/* 5. Recent Observations */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    5. Recent Observations & Telemetry
                  </div>
                  <table className="sci-table" style={{ fontSize: '11px' }}>
                    <tbody>
                      {selectedStation.recentObservations.map((obs, i) => (
                        <tr key={i}>
                          <td style={{ color: '#526474', width: '80px' }} className="font-mono">
                            {obs.time}
                          </td>
                          <td style={{ fontWeight: 500 }}>{obs.parameter}</td>
                          <td className="font-mono" style={{ fontWeight: 600, color: '#0B1F33' }}>
                            {obs.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    className="btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onNavigate('live-data')}
                  >
                    <Activity size={14} />
                    <span>Live Telemetry</span>
                  </button>
                  <button
                    className="btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onNavigate('datasets')}
                  >
                    <Database size={14} />
                    <span>View Datasets</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#526474' }}>
              <Info size={32} color="#526474" style={{ marginBottom: '12px' }} />
              <p>Click any research station, expedition route, or sensor buoy on the map to inspect structured intelligence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
