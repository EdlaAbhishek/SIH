import React from 'react';
import { NavSection } from '../../types';
import { Shield, Database, Award, ExternalLink, Globe2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        backgroundColor: '#0B1F33',
        borderTop: '1px solid #123B5D',
        color: '#D8E1E7',
        marginTop: '60px',
      }}
    >
      {/* Top Banner: Scientific Governance & FAIR Principles */}
      <div
        style={{
          borderBottom: '1px solid #123B5D',
          padding: '16px 0',
          backgroundColor: '#071524',
        }}
      >
        <div
          className="page-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                padding: '6px 12px',
                backgroundColor: '#123B5D',
                border: '1px solid #2F6F95',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#FFFFFF',
              }}
            >
              FAIR DATA PRINCIPLES CERTIFIED
            </div>
            <span style={{ fontSize: '13px', color: '#D8E1E7' }}>
              Findable • Accessible • Interoperable • Reusable
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px' }}>
            <span>W3C PROV-O Lineage Tracking</span>
            <span style={{ color: '#526474' }}>|</span>
            <span>DataCite DOI Resolution</span>
            <span style={{ color: '#526474' }}>|</span>
            <span>ISO 19115 Polar Metadata Standard</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="page-container"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
        }}
      >
        {/* Column 1: Organization & Identity */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#123B5D',
                border: '1px solid #2F6F95',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Globe2 size={14} color="#E8F1F5" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>
              POLAR BEAR
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#D8E1E7', lineHeight: 1.6, marginBottom: '16px' }}>
            Connecting Polar Research. Discovering the Future. An international scientific research portal and geospatial intelligence system for the Arctic and Antarctic regions.
          </p>
          <div style={{ fontSize: '11px', color: '#526474' }} className="font-mono">
            BUILD 2026.4.19-LTS • CRYOSPHERE RUNTIME
          </div>
        </div>

        {/* Column 2: Core Scientific Tools */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#FFFFFF',
              marginBottom: '14px',
            }}
          >
            Core Research Tools
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: 2 }}>
            <li>
              <button
                onClick={() => onNavigate('map')}
                style={{ background: 'none', border: 'none', color: '#D8E1E7', cursor: 'pointer', padding: 0 }}
              >
                Polar Intelligence Map
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('ask-ai')}
                style={{ background: 'none', border: 'none', color: '#D8E1E7', cursor: 'pointer', padding: 0 }}
              >
                Ask Polar Bear (AI Research Assistant)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('knowledge-graph')}
                style={{ background: 'none', border: 'none', color: '#D8E1E7', cursor: 'pointer', padding: 0 }}
              >
                Knowledge Graph Explorer
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('provenance')}
                style={{ background: 'none', border: 'none', color: '#D8E1E7', cursor: 'pointer', padding: 0 }}
              >
                Data Lineage & Provenance
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('live-data')}
                style={{ background: 'none', border: 'none', color: '#D8E1E7', cursor: 'pointer', padding: 0 }}
              >
                Live Polar Telemetry Center
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Federated Repositories */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#FFFFFF',
              marginBottom: '14px',
            }}
          >
            Federated Archives
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: 2, color: '#D8E1E7' }}>
            <li>PANGAEA Earth Science Archive</li>
            <li>NASA Earthdata (CMR Gateway)</li>
            <li>NOAA National Centers for Env. Information</li>
            <li>Zenodo Open Science Repository</li>
            <li>British Antarctic Survey Data Portal</li>
          </ul>
        </div>

        {/* Column 4: Governance & Integrity */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#FFFFFF',
              marginBottom: '14px',
            }}
          >
            Scientific Integrity
          </div>
          <p style={{ fontSize: '12px', color: '#D8E1E7', lineHeight: 1.6, marginBottom: '12px' }}>
            All dataset publications undergo rigorous double-verification with immutable cryptographic hashes and W3C PROV lineage models.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge-tag navy">CC-BY 4.0</span>
            <span className="badge-tag navy">CC0 1.0</span>
            <span className="badge-tag arctic">REST API</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid #123B5D',
          padding: '16px 0',
          fontSize: '12px',
          color: '#526474',
        }}
      >
        <div
          className="page-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div>
            © 2026 Polar Bear Scientific Consortium. All rights reserved. Open-access research framework.
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('education')}
            style={{ background: 'none', border: 'none', color: '#526474', cursor: 'pointer' }}
          >
            Student Mode
          </button>
          <button
            onClick={() => onNavigate('citizen-science')}
            style={{ background: 'none', border: 'none', color: '#526474', cursor: 'pointer' }}
          >
            Citizen Science
          </button>
          <button
            onClick={() => onNavigate('review')}
            style={{ background: 'none', border: 'none', color: '#526474', cursor: 'pointer' }}
          >
            Review Queue
          </button>
          <button
            onClick={() => onNavigate('admin')}
            style={{ background: 'none', border: 'none', color: '#526474', cursor: 'pointer' }}
          >
            System Console
          </button>
        </div>
        </div>
      </div>
    </footer>
  );
};
