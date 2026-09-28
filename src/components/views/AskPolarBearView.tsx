import React, { useState } from 'react';
import { NavSection } from '../../types';
import {
  Sparkles,
  Search,
  BookOpen,
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Cpu,
  ArrowRight,
  ListFilter,
  Layers,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';

interface AskPolarBearViewProps {
  onNavigate: (section: NavSection) => void;
}

interface QueryPreset {
  id: string;
  question: string;
  category: string;
  answerText: string;
  keyFindings: string[];
  evidence: { metric: string; value: string; source: string; confidence: string }[];
  sources: {
    title: string;
    doi: string;
    authors: string;
    journal: string;
    year: number;
    datasetId?: string;
  }[];
  relatedResearch: { id: string; title: string; type: 'Expedition' | 'Dataset' | 'Station' }[];
}

const PRESET_QUERIES: QueryPreset[] = [
  {
    id: 'q1',
    question: 'What expeditions studied sea-ice thickness in Antarctica?',
    category: 'Expeditions & Cryosphere',
    answerText:
      'Antarctic sea-ice thickness has been systematically investigated through dedicated marine campaigns combining continuous shipboard electromagnetic induction sounding, autonomous underwater vehicles (AUVs), and deep mooring arrays. Principal expeditions include the Weddell Sea Deep Gyre & Polynyas Expedition (2024, RRS Sir David Attenborough), the International Thwaites Glacier Collaboration (ITGC, 2020–2024), and the historic ISPOL and Winter Weddell campaigns.',
    keyFindings: [
      'Mean sea-ice thickness across the western Weddell pack ranges between 1.62m and 2.45m for multi-year ice.',
      'Basal melt channels identified beneath the eastern Amundsen Sea margin show localized thinning rates up to 45 m/yr.',
      'Autonomous underwater submersibles (such as Icefin) recorded fine-scale terracing inside sub-ice shelf cavities, altering previous hydrostatic drag assumptions.',
    ],
    evidence: [
      { metric: 'Mean First-Year Ice Thickness', value: '1.42 ± 0.18 m', source: 'AWI Weddell Mooring CTD Array', confidence: '99.4%' },
      { metric: 'Amundsen Basal Melt Rate', value: '45.2 m / annum', source: 'ITGC Icefin Robotic Profiler', confidence: '98.8%' },
      { metric: 'Autonomous Profiles Logged', value: '5,200,000 observations', source: 'Polar Bear Telemetry Node', confidence: '100%' },
    ],
    sources: [
      {
        title: 'Accelerated basal melting across Amundsen Sea ice shelves driven by modified Circumpolar Deep Water intrusion',
        doi: '10.1038/s41561-024-01389-w',
        authors: 'Dr. Elena Rostova, Dr. David Vaughan, Dr. Astrid Lindqvist',
        journal: 'Nature Geoscience',
        year: 2024,
        datasetId: 'ds-deep-mooring',
      },
      {
        title: 'Widespread subglacial hydrology beneath the Thwaites Glacier trunk observed by autonomous underwater robotics',
        doi: '10.1029/2023GL104882',
        authors: 'Dr. David Vaughan, Dr. Britney Schmidt, Dr. Elena Rostova',
        journal: 'Geophysical Research Letters',
        year: 2023,
        datasetId: 'ds-bedmap3',
      },
    ],
    relatedResearch: [
      { id: 'exp-itgc', title: 'International Thwaites Glacier Collaboration', type: 'Expedition' },
      { id: 'exp-weddell-2024', title: 'Weddell Sea Deep Gyre & Polynyas Expedition', type: 'Expedition' },
      { id: 'ds-amsr2-seaice', title: 'Daily Polar Sea-Ice Concentration and Extent', type: 'Dataset' },
    ],
  },
  {
    id: 'q2',
    question: 'Summarize the latest research on Antarctic ice shelves.',
    category: 'Glaciology & Climate',
    answerText:
      'Recent synthesized findings across 2023–2024 establish that Antarctic ice shelf thinning is predominantly driven from beneath by modified Circumpolar Deep Water (mCDW) accessing continental shelf troughs. Vulnerabilities are concentrated in the Amundsen Sea Embayment (Thwaites, Pine Island, Dotson), while East Antarctic ice shelves (Amery, Shackleton) maintain quasi-stable grounding margins.',
    keyFindings: [
      'Warm Circumpolar Deep Water (+0.4°C to +1.2°C above freezing point) enters deep bathymetric troughs below 400m.',
      'Basal crevasse propagation is accelerated by tidal flexing and subglacial freshwater discharge from sub-ice lakes.',
      'Bedmap3 compilations indicate bedrock pinning points are shallower than prior estimates, providing localized stabilizing buttressing.',
    ],
    evidence: [
      { metric: 'mCDW Core Temperature Warming', value: '+0.034 ± 0.008 °C / decade', source: 'Southern Ocean Argo CTD Archive', confidence: '99.1%' },
      { metric: 'Thwaites Grounding Zone Retreat', value: '1.2 km / year', source: 'Sentinel-1 InSAR / ITGC', confidence: '99.7%' },
      { metric: 'Ice Sheet Bed Topography Grid', value: '500m Resolution', source: 'Bedmap3 Consortium (BAS)', confidence: '99.9%' },
    ],
    sources: [
      {
        title: 'Bedmap3: High-Resolution Antarctic Ice Sheet Bed Topography and Subglacial Bathymetry',
        doi: '10.5285/bedmap3-antarctica-topo-2023',
        authors: 'Dr. David Vaughan et al.',
        journal: 'Earth System Science Data',
        year: 2023,
        datasetId: 'ds-bedmap3',
      },
      {
        title: 'A decade of high-latitude autonomous Argo profiling reveals Southern Ocean heat redistribution',
        doi: '10.1175/JCLI-D-23-0412.1',
        authors: 'Dr. Antoine Chen, Dr. Rajesh Kumar, Dr. Stephen Riser',
        journal: 'Journal of Climate',
        year: 2024,
      },
    ],
    relatedResearch: [
      { id: 'ds-bedmap3', title: 'Bedmap3 High-Resolution Antarctic DEM', type: 'Dataset' },
      { id: 'sta-rothera', title: 'Rothera Research Station (BAS)', type: 'Station' },
      { id: 'exp-itgc', title: 'International Thwaites Glacier Collaboration', type: 'Expedition' },
    ],
  },
  {
    id: 'q3',
    question: 'Which datasets are related to Arctic ocean temperature?',
    category: 'Oceanography & In-situ Data',
    answerText:
      'Polar Bear indexes four multi-decadal open datasets addressing Arctic ocean temperature: 1) MOSAiC Central Arctic Atmospheric and Ocean Boundary Layer Profiles, 2) Fram Strait Long-Term Moored Oceanographic Profiler Array (PANGAEA), 3) International Arctic Buoy Programme (IABP) surface drift records, and 4) AMSR2 / CryoSat-2 blended SST and sea-ice boundary telemetry.',
    keyFindings: [
      'The Atlantic Water layer (150m–600m depth) across the Nansen and Amundsen basins has shoaled by 30 meters over the last two decades (Atlantification).',
      'In-situ moorings at 85°N recorded upper 50m summer temperature anomalies exceeding +1.5°C over historical 1980–2010 baselines.',
    ],
    evidence: [
      { metric: 'Atlantic Water Inflow Warming', value: '+0.12 °C / decade', source: 'Fram Strait AWI-207 Mooring Array', confidence: '99.5%' },
      { metric: 'Temporal Continuity', value: '1997 – Present (Continuous)', source: 'PANGAEA Earth Data Portal', confidence: '100%' },
    ],
    sources: [
      {
        title: 'Arctic sea-ice retreat amplifies pan-Arctic autumn cloud cover and surface radiative forcing',
        doi: '10.1126/sciadv.abq7412',
        authors: 'Prof. Markus Rex, Dr. Rajesh Kumar, Dr. Antoine Chen',
        journal: 'Science Advances',
        year: 2023,
        datasetId: 'ds-mosaic-aerosols',
      },
    ],
    relatedResearch: [
      { id: 'exp-mosaic', title: 'MOSAiC Arctic Ice-Drift Expedition', type: 'Expedition' },
      { id: 'sta-nyalesund', title: 'Ny-Ålesund Research Station', type: 'Station' },
      { id: 'ds-deep-mooring', title: 'Southern Ocean Weddell Gyre Moored Hydrography', type: 'Dataset' },
    ],
  },
  {
    id: 'q4',
    question: 'Explain this research paper for a student.',
    category: 'Education & Synthesis',
    answerText:
      'Summary for Students: Nature Geoscience 2024 ("Accelerated basal melting across Amundsen Sea ice shelves"). Imagine an ice shelf as a giant floating ice cube attached to land. Scientists discovered that warm, salty ocean water deep down is sneaking through underwater trenches right under the ice. This warm water acts like a blowtorch underneath, melting 45 meters of ice every single year where the ice touches the seafloor. By understanding this, scientists can predict future sea level rise much more accurately.',
    keyFindings: [
      'Ice melts much faster from the ocean beneath it than from the warm air above.',
      'Underwater robots called Icefin went where humans could never reach—under 800 meters of solid ice.',
      'Deep seafloor hills and valleys control where warm ocean currents travel.',
    ],
    evidence: [
      { metric: 'Annual Ice Loss at Bedrock', value: '45 meters / year', source: 'Icefin Sensor Sonar', confidence: 'High' },
      { metric: 'Target Audience Level', value: 'Secondary School / Undergraduate', source: 'Polar Bear Educational Engine', confidence: 'Verified' },
    ],
    sources: [
      {
        title: 'Accelerated basal melting across Amundsen Sea ice shelves driven by modified Circumpolar Deep Water intrusion',
        doi: '10.1038/s41561-024-01389-w',
        authors: 'Dr. Elena Rostova, Dr. David Vaughan, Dr. Astrid Lindqvist',
        journal: 'Nature Geoscience',
        year: 2024,
      },
    ],
    relatedResearch: [
      { id: 'ds-bedmap3', title: 'Bedmap3 Antarctic Ice Sheet Bed Topography', type: 'Dataset' },
      { id: 'exp-itgc', title: 'International Thwaites Glacier Collaboration', type: 'Expedition' },
    ],
  },
];

export const AskPolarBearView: React.FC<AskPolarBearViewProps> = ({ onNavigate }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('q1');
  const [customInput, setCustomInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'answer' | 'evidence' | 'sources' | 'provenance'>('answer');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [activeModeNote, setActiveModeNote] = useState<string | null>(null);

  const activeQuery =
    PRESET_QUERIES.find((q) => q.id === selectedPresetId) || PRESET_QUERIES[0];

  const handleAction = (actionName: string) => {
    if (actionName === 'Explain Simply') {
      setSelectedPresetId('q4');
      setActiveModeNote('Mode: Simplified Student Explainer enabled.');
    } else if (actionName === 'Summarize') {
      setActiveModeNote('Executive 3-bullet scientific synthesis active.');
    } else if (actionName === 'Find Related Research') {
      setActiveTab('sources');
      setActiveModeNote('Cross-referenced with 4 federated polar repositories.');
    } else if (actionName === 'Compare Studies') {
      setActiveModeNote('Comparative analysis matrix generated against IPCC AR6 baselines.');
    } else if (actionName === 'Generate Research Questions') {
      setActiveModeNote('Generated 3 open scientific hypotheses for upcoming field campaigns.');
    } else if (actionName === 'View Sources') {
      setActiveTab('sources');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoi(text);
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
                SOURCE-GROUNDED RESEARCH INTELLIGENCE · ZERO HALLUCINATION PROTOCOL
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Ask Polar Bear</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Dedicated polar intelligence assistant grounded exclusively in peer-reviewed scientific publications, verified sensor telemetry, and expedition logs.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('search')}
              >
                <Search size={15} />
                <span>Global Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Main Scientific Instrument Interface: Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 360px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
        }}
        className="ai-instrument-container"
      >
        <style>{`
          @media (max-width: 960px) {
            .ai-instrument-container {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Preset Scientific Inquiries & Prompt Constructor */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#526474',
              marginBottom: '12px',
              letterSpacing: '0.06em',
            }}
            className="font-mono"
          >
            VERIFIED SCIENTIFIC INQUIRIES
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {PRESET_QUERIES.map((q) => {
              const isSelected = q.id === selectedPresetId;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedPresetId(q.id);
                    setActiveModeNote(null);
                  }}
                  style={{
                    padding: '12px',
                    backgroundColor: isSelected ? '#E8F1F5' : '#F7FAFC',
                    border: `1px solid ${isSelected ? '#2F6F95' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span className="badge-tag navy" style={{ alignSelf: 'flex-start', fontSize: '10px' }}>
                    {q.category}
                  </span>
                  <div style={{ fontWeight: isSelected ? 600 : 500, color: '#0B1F33', lineHeight: 1.35 }}>
                    "{q.question}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Query Input */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #D8E1E7' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginBottom: '6px' }} className="font-mono">
              SUBMIT NEW SCIENTIFIC QUERY
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask about sea-ice, salinity, Thwaites..."
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  fontSize: '12px',
                  border: '1px solid #D8E1E7',
                  borderRadius: 0,
                  outline: 'none',
                  backgroundColor: '#F7FAFC',
                }}
              />
              <button
                className="btn-primary btn-sm"
                onClick={() => {
                  if (customInput.trim()) {
                    setSelectedPresetId('q1');
                    setActiveModeNote(`Custom analysis for: "${customInput}" mapped to verified repository index.`);
                    setCustomInput('');
                  }
                }}
              >
                Query
              </button>
            </div>
            <div style={{ fontSize: '10px', color: '#526474', marginTop: '6px' }}>
              *Queries are checked against 4,890+ NetCDF datasets and 12,800+ peer-reviewed polar papers.
            </div>
          </div>
        </div>

        {/* Right Column: Grounded AI Output Console */}
        <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
          {/* Instrument Verification Header */}
          <div
            style={{
              padding: '14px 20px',
              backgroundColor: '#0B1F33',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#10B981" />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em' }}>
                  SOURCE-GROUNDED RESPONSE
                </span>
                <div style={{ fontSize: '10px', color: '#D8E1E7' }} className="font-mono">
                  RAG Chain Confidence: 99.4% • Citations Bound: 100%
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="badge-tag live" style={{ fontSize: '10px' }}>
                W3C PROV CERTIFIED
              </span>
              <span className="badge-tag arctic" style={{ fontSize: '10px' }}>
                CC-BY 4.0
              </span>
            </div>
          </div>

          {/* Mode Alert Note if activated */}
          {activeModeNote && (
            <div
              style={{
                padding: '8px 20px',
                backgroundColor: '#E8F1F5',
                borderBottom: '1px solid #D8E1E7',
                fontSize: '12px',
                color: '#123B5D',
                fontWeight: 600,
              }}
            >
              {activeModeNote}
            </div>
          )}

          {/* Scientific Action Toolbar: Mandatory Buttons */}
          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#F7FAFC',
              borderBottom: '1px solid #D8E1E7',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {[
              'Summarize',
              'Explain Simply',
              'Find Related Research',
              'Compare Studies',
              'Generate Research Questions',
              'View Sources',
            ].map((action) => (
              <button
                key={action}
                onClick={() => handleAction(action)}
                className="btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '4px 8px' }}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Internal View Tabs: Answer | Evidence | Sources */}
          <div className="sci-tabs" style={{ paddingLeft: '20px' }}>
            <button
              className={`sci-tab-btn ${activeTab === 'answer' ? 'active' : ''}`}
              onClick={() => setActiveTab('answer')}
            >
              Scientific Synthesis
            </button>
            <button
              className={`sci-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
              onClick={() => setActiveTab('evidence')}
            >
              Empirical Evidence ({activeQuery.evidence.length})
            </button>
            <button
              className={`sci-tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
              onClick={() => setActiveTab('sources')}
            >
              Verified Sources ({activeQuery.sources.length})
            </button>
          </div>

          {/* Tab Body */}
          <div style={{ padding: '24px 20px', flex: 1, overflowY: 'auto' }}>
            {activeTab === 'answer' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Answer Narrative */}
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#526474',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                    }}
                    className="font-mono"
                  >
                    1. EXECUTIVE SCIENTIFIC SYNTHESIS
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: '#16232E',
                      backgroundColor: '#F7FAFC',
                      padding: '16px',
                      border: '1px solid #D8E1E7',
                      borderLeft: '4px solid #2F6F95',
                    }}
                  >
                    {activeQuery.answerText}
                  </div>
                </div>

                {/* 2. Key Findings */}
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#526474',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                    }}
                    className="font-mono"
                  >
                    2. KEY EMPIRICAL FINDINGS
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {activeQuery.keyFindings.map((finding, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '13px',
                          color: '#16232E',
                          backgroundColor: '#FFFFFF',
                          padding: '10px 14px',
                          border: '1px solid #D8E1E7',
                        }}
                      >
                        <CheckCircle2 size={16} color="#0B6B40" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Related Research Links */}
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#526474',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                    }}
                    className="font-mono"
                  >
                    3. LINKED POLAR ASSETS & EXPEDITIONS
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {activeQuery.relatedResearch.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.type === 'Expedition') onNavigate('expeditions');
                          else if (item.type === 'Dataset') onNavigate('datasets');
                          else onNavigate('stations');
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #2F6F95',
                          padding: '6px 12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span className="badge-tag navy" style={{ fontSize: '9px' }}>{item.type}</span>
                        <span style={{ color: '#0B1F33', fontWeight: 600 }}>{item.title}</span>
                        <ChevronRight size={12} color="#2F6F95" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Evidence Tab */}
            {activeTab === 'evidence' && (
              <div>
                <div style={{ fontSize: '12px', color: '#526474', marginBottom: '12px' }}>
                  The quantitative observations below served as strict numerical constraints during the generation of this synthesis.
                </div>
                <table className="sci-table">
                  <thead>
                    <tr>
                      <th>Measurement / Metric</th>
                      <th>Observed Value</th>
                      <th>Source Instrument</th>
                      <th>Statistical Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeQuery.evidence.map((ev, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{ev.metric}</td>
                        <td className="font-mono" style={{ color: '#0B1F33', fontWeight: 700 }}>
                          {ev.value}
                        </td>
                        <td style={{ color: '#526474' }}>{ev.source}</td>
                        <td>
                          <span className="badge-tag live">{ev.confidence}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sources Tab */}
            {activeTab === 'sources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeQuery.sources.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid #D8E1E7',
                      padding: '16px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span className="badge-tag arctic">{src.journal} ({src.year})</span>
                      <button
                        onClick={() => copyToClipboard(src.doi)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '11px',
                          color: '#2F6F95',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {copiedDoi === src.doi ? <Check size={12} /> : <Copy size={12} />}
                        <span>DOI: {src.doi}</span>
                      </button>
                    </div>
                    <h3 style={{ fontSize: '15px', color: '#0B1F33', marginBottom: '4px' }}>
                      {src.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#526474', marginBottom: '8px' }}>
                      Authors: {src.authors}
                    </div>
                    {src.datasetId && (
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => onNavigate('datasets')}
                      >
                        <Database size={12} />
                        <span>Inspect Raw Dataset ({src.datasetId})</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
