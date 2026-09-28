import React, { useState, useEffect } from 'react';
import { NavSection, SensorTelemetry, AnomalyAlert } from '../../types';
import { LIVE_TELEMETRY, ANOMALY_ALERTS } from '../../data/mockData';
import {
  Activity,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Sliders,
  Filter,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface LivePolarDataViewProps {
  onNavigate: (section: NavSection) => void;
}

export const LivePolarDataView: React.FC<LivePolarDataViewProps> = ({ onNavigate }) => {
  const [telemetryList, setTelemetryList] = useState<SensorTelemetry[]>(LIVE_TELEMETRY);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(ANOMALY_ALERTS);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [showCleaned, setShowCleaned] = useState<boolean>(true);
  const [selectedSensorId, setSelectedSensorId] = useState<string>('AWS-CONCORDIA-04');
  const [activeAlert, setActiveAlert] = useState<AnomalyAlert | null>(ANOMALY_ALERTS[0]);

  // Real-time streaming simulation: small jitter every 2.5s when active
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setTelemetryList((prev) =>
        prev.map((item) => {
          const jitter = (Math.random() - 0.5) * 0.4;
          const newRaw = parseFloat((item.rawValue + jitter).toFixed(2));
          const newClean = item.isAnomaly
            ? item.cleanedValue
            : parseFloat((item.cleanedValue + jitter).toFixed(2));
          return {
            ...item,
            rawValue: newRaw,
            cleanedValue: newClean,
            timestamp: new Date().toISOString(),
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const selectedTelemetry =
    telemetryList.find((t) => t.sensorId === selectedSensorId) || telemetryList[0];

  // Simulated 12-point time series for active sensor
  const timeSeriesPoints = [
    { time: '18:00', val: selectedTelemetry.cleanedValue - 1.2 },
    { time: '18:10', val: selectedTelemetry.cleanedValue - 0.8 },
    { time: '18:20', val: selectedTelemetry.cleanedValue - 0.4 },
    { time: '18:30', val: selectedTelemetry.cleanedValue + 0.2 },
    { time: '18:40', val: selectedTelemetry.isAnomaly && !showCleaned ? selectedTelemetry.rawValue : selectedTelemetry.cleanedValue },
    { time: '18:50', val: selectedTelemetry.cleanedValue + (showCleaned ? 0.1 : 8.2) },
    { time: 'NOW', val: showCleaned ? selectedTelemetry.cleanedValue : selectedTelemetry.rawValue },
  ];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                REAL-TIME TELEMETRY STREAM · DEMO / SIMULATED DATA
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Live Polar Data</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Real-time environmental telemetry across Antarctic automated weather stations, Arctic drifting buoys, and sub-surface CTD ocean profilers.
              </p>
            </div>

            {/* Controls: Play/Pause and Raw/Cleaned toggle */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D8E1E7',
                  padding: '2px',
                }}
              >
                <button
                  onClick={() => setShowCleaned(true)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: showCleaned ? '#123B5D' : 'transparent',
                    color: showCleaned ? '#FFFFFF' : '#526474',
                    fontWeight: showCleaned ? 600 : 400,
                  }}
                >
                  Cleaned (QA/QC)
                </button>
                <button
                  onClick={() => setShowCleaned(false)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: !showCleaned ? '#123B5D' : 'transparent',
                    color: !showCleaned ? '#FFFFFF' : '#526474',
                    fontWeight: !showCleaned ? 600 : 400,
                  }}
                >
                  Raw Telemetry
                </button>
              </div>

              <button
                className="btn-primary"
                onClick={() => setIsStreaming(!isStreaming)}
              >
                {isStreaming ? <Pause size={14} /> : <Play size={14} />}
                <span>{isStreaming ? 'Pause Stream' : 'Resume Ingest'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">
        {/* Top Banner: Mandatory Label per prompt */}
        <div
          style={{
            backgroundColor: '#E8F1F5',
            border: '1px solid #D8E1E7',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-tag navy" style={{ fontWeight: 700 }}>
              DEMO / SIMULATED DATA
            </span>
            <span style={{ fontSize: '12px', color: '#123B5D' }}>
              Simulated high-latitude telemetry streaming through Polar Bear REST / MQTT Ingestion Engine.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-indicator" />
            <span className="font-mono" style={{ fontSize: '11px', color: '#0B6B40', fontWeight: 600 }}>
              STREAM BUFFER: HEALTHY
            </span>
          </div>
        </div>

      {/* ANOMALY DETECTION ENGINE ALERT: Mandatory Prompt Feature */}
      {activeAlert && (
        <div
          style={{
            backgroundColor: '#FDF2F2',
            border: '1px solid #F8B4B4',
            borderLeft: '4px solid #A82020',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#16232E',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertTriangle size={22} color="#A82020" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#A82020' }}>
                    Polar Bear detected an unusual observation
                  </span>
                  <span className="badge-tag alert">{activeAlert.severity}</span>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#A82020' }}>
                    Deviation: +{activeAlert.deviationSigma}σ
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#526474', lineHeight: 1.4, marginBottom: '6px' }}>
                  {activeAlert.description}
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#16232E' }} className="font-mono">
                  <span>Sensor: <strong>{activeAlert.sensorId}</strong></span>
                  <span>Detected Value: <strong style={{ color: '#A82020' }}>{activeAlert.detectedValue}</strong></span>
                  <span>Baseline Climatology: <strong>{activeAlert.baselineRange}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary btn-sm"
                onClick={() => {
                  setSelectedSensorId(activeAlert.sensorId);
                }}
              >
                Inspect Telemetry Feed
              </button>
              <button
                className="btn-secondary btn-sm"
                onClick={() => onNavigate('ask-ai')}
              >
                Ask AI to Explain Anomaly →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sensor Stream Selector Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {telemetryList.map((tel) => {
          const isSelected = tel.sensorId === selectedSensorId;
          const displayVal = showCleaned ? tel.cleanedValue : tel.rawValue;
          return (
            <div
              key={tel.id}
              onClick={() => setSelectedSensorId(tel.sensorId)}
              style={{
                backgroundColor: isSelected ? '#123B5D' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#0B1F33',
                border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#E8F1F5' : '#526474' }}>
                  {tel.sensorId}
                </span>
                {tel.isAnomaly ? (
                  <span className="badge-tag alert" style={{ fontSize: '9px' }}>ANOMALY</span>
                ) : (
                  <span className="badge-tag live" style={{ fontSize: '9px' }}>NORMAL</span>
                )}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                {tel.stationName}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '11px', color: isSelected ? '#D8E1E7' : '#526474' }}>
                  {tel.variable}
                </span>
                <span className="font-mono" style={{ fontSize: '16px', fontWeight: 700 }}>
                  {displayVal.toFixed(1)} {tel.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Chart & Data Table Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(420px, 1.4fr) minmax(320px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
        }}
        className="live-data-split"
      >
        <style>{`
          @media (max-width: 960px) {
            .live-data-split {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left: Scientific Live Time-Series Chart Canvas */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase' }} className="font-mono">
                LIVE OBSERVATION PLOT (LAST 60 MINUTES)
              </div>
              <h3 style={{ fontSize: '18px', color: '#0B1F33' }}>
                {selectedTelemetry.stationName} — {selectedTelemetry.variable}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: '#0B1F33' }}>
                {(showCleaned ? selectedTelemetry.cleanedValue : selectedTelemetry.rawValue).toFixed(2)}{' '}
                {selectedTelemetry.unit}
              </div>
              <div style={{ fontSize: '11px', color: '#526474' }}>
                Mode: {showCleaned ? 'Quality Controlled' : 'Unfiltered Raw Sensor'}
              </div>
            </div>
          </div>

          {/* SVG Scientific Line Chart (Solid colors, no gradients) */}
          <div style={{ backgroundColor: '#071524', border: '1px solid #123B5D', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#526474', marginBottom: '8px' }} className="font-mono">
              <span>UNITS: {selectedTelemetry.unit}</span>
              <span>SAMPLING RATE: 1 HZ TELEMETRY</span>
            </div>
            <svg width="100%" height="220" viewBox="0 0 500 220">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="#123B5D" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="40" y1="200" x2="480" y2="200" stroke="#2F6F95" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="5" y="24" fill="#526474" fontSize="9" fontFamily="monospace">MAX</text>
              <text x="5" y="114" fill="#526474" fontSize="9" fontFamily="monospace">MEAN</text>
              <text x="5" y="200" fill="#526474" fontSize="9" fontFamily="monospace">MIN</text>

              {/* Baseline Corridor envelope */}
              <rect x="40" y="80" width="440" height="60" fill="#123B5D" opacity="0.3" />

              {/* Polyline of points */}
              <polyline
                points={timeSeriesPoints
                  .map((p, idx) => {
                    const px = 50 + idx * 70;
                    // normalize y
                    const py = 110 - (p.val - selectedTelemetry.cleanedValue) * 10;
                    return `${px},${Math.max(30, Math.min(190, py))}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={selectedTelemetry.isAnomaly && !showCleaned ? '#EF4444' : '#2F6F95'}
                strokeWidth="2.5"
              />

              {/* Data Point Dots */}
              {timeSeriesPoints.map((p, idx) => {
                const px = 50 + idx * 70;
                const py = 110 - (p.val - selectedTelemetry.cleanedValue) * 10;
                const clampedPy = Math.max(30, Math.min(190, py));
                return (
                  <g key={idx}>
                    <circle
                      cx={px}
                      cy={clampedPy}
                      r="4"
                      fill="#FFFFFF"
                      stroke={selectedTelemetry.isAnomaly && !showCleaned ? '#EF4444' : '#2F6F95'}
                      strokeWidth="2"
                    />
                    <text
                      x={px}
                      y="215"
                      fill="#D8E1E7"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {p.time}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#526474' }}>
            <div>
              Shaded band: <strong>Historical 3-Sigma Climatological Baseline</strong>
            </div>
            <div>
              Status: <span style={{ color: '#0B6B40', fontWeight: 600 }}>Zero Packet Loss</span>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Ingest Table */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '12px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase' }} className="font-mono">
              TELEMETRY STREAM INGESTION LOG
            </div>
            <h3 style={{ fontSize: '16px', color: '#0B1F33' }}>Latest Verified Packets</h3>
          </div>

          <table className="sci-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th>Station</th>
                <th>Variable</th>
                <th>Reading</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {telemetryList.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelectedSensorId(t.sensorId)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: t.sensorId === selectedSensorId ? '#E8F1F5' : 'transparent',
                  }}
                >
                  <td style={{ fontWeight: 600 }}>{t.stationName.split(' ')[0]}</td>
                  <td style={{ color: '#526474' }}>{t.variable}</td>
                  <td className="font-mono" style={{ fontWeight: 700, color: '#0B1F33' }}>
                    {(showCleaned ? t.cleanedValue : t.rawValue).toFixed(1)} {t.unit}
                  </td>
                  <td>
                    <span
                      className={`badge-tag ${
                        t.qualityFlag === 'ANOMALOUS' ? 'alert' : 'live'
                      }`}
                      style={{ fontSize: '10px' }}
                    >
                      {t.qualityFlag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #D8E1E7' }}>
            <div style={{ fontSize: '11px', color: '#526474', marginBottom: '10px' }}>
              Connected via WMO Global Telecommunication System (GTS) and Iridium SBD Gateway.
            </div>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onNavigate('map')}
            >
              <MapPin size={14} color="#2F6F95" />
              <span>Locate All Live Sensors on Polar Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
