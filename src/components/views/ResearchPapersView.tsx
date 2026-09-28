import React, { useState } from 'react';
import { NavSection, Publication } from '../../types';
import { PUBLICATIONS } from '../../data/mockData';
import {
  BookOpen,
  Languages,
  Database,
  Ship,
  Copy,
  Check,
  Search,
} from 'lucide-react';

interface ResearchPapersViewProps {
  onNavigate: (section: NavSection) => void;
}

export const ResearchPapersView: React.FC<ResearchPapersViewProps> = ({ onNavigate }) => {
  const [publications] = useState<Publication[]>(PUBLICATIONS);
  const [selectedPubId, setSelectedPubId] = useState<string>('pub-amundsen-basal-melt');
  const [activeLang, setActiveLang] = useState<string>('en');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const selectedPub =
    publications.find((p) => p.id === selectedPubId) || publications[0];

  const copyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const getAbstract = () => {
    if (activeLang === 'en' || !selectedPub.translations) return selectedPub.abstract;
    return selectedPub.translations[activeLang] || selectedPub.abstract;
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                PEER-REVIEWED SCIENTIFIC LITERATURE · OPEN ACCESS
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Research Publications</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                High-latitude scientific studies across cryospheric physics, ocean circulation, and climate feedbacks, linked to source data.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onNavigate('search')}
            >
              <Search size={15} />
              <span>Search Research Papers</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Main Content Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 320px) minmax(500px, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
          }}
          className="papers-split"
        >
          <style>{`
            @media (max-width: 900px) {
              .papers-split { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Publication List */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
            <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '12px' }}>
              PUBLICATIONS ARCHIVE ({publications.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {publications.map((p) => {
                const isSelected = p.id === selectedPubId;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPubId(p.id);
                      setActiveLang('en');
                    }}
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
                        {p.journal}
                      </span>
                      <span className="font-mono text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                        {p.year}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '2px' }}>
                      {p.title}
                    </div>
                    <div className="text-metadata" style={{ color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {p.authors[0]} et al. · {p.citations} citations
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Publication Reader */}
          <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', backgroundColor: '#0B1F33', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-tag arctic">{selectedPub.journal}</span>
                <span className="badge-tag live">Peer-Reviewed</span>
                <span className="badge-tag navy">Altmetric {selectedPub.altmetricScore}</span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '22px', marginBottom: '8px', lineHeight: 1.3 }}>
                {selectedPub.title}
              </h2>
              <div style={{ fontSize: '13px', color: '#D8E1E7', marginBottom: '12px' }}>
                {selectedPub.authors.join(' · ')}
              </div>
              <button
                onClick={() => copyDoi(selectedPub.doi)}
                style={{
                  background: '#123B5D',
                  border: '1px solid #2F6F95',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                className="font-mono"
              >
                {copiedDoi === selectedPub.doi ? <Check size={11} /> : <Copy size={11} />}
                <span>DOI: {selectedPub.doi}</span>
              </button>
            </div>

            {/* Translation Bar */}
            <div
              style={{
                padding: '10px 24px',
                backgroundColor: '#F7FAFC',
                borderBottom: '1px solid #D8E1E7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Languages size={14} color="#2F6F95" />
                <span className="text-metadata" style={{ fontWeight: 600, color: '#0B1F33' }}>
                  AI TRANSLATION ENGINE:
                </span>
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                {[
                  { code: 'en', label: 'English (Original)' },
                  { code: 'es', label: 'Español' },
                  { code: 'fr', label: 'Français' },
                  { code: 'de', label: 'Deutsch' },
                  { code: 'no', label: 'Norsk' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    style={{
                      height: '26px',
                      padding: '0 8px',
                      fontSize: '11px',
                      border: `1px solid ${activeLang === lang.code ? '#0B1F33' : '#D8E1E7'}`,
                      cursor: 'pointer',
                      backgroundColor: activeLang === lang.code ? '#0B1F33' : '#FFFFFF',
                      color: activeLang === lang.code ? '#FFFFFF' : '#16232E',
                      fontWeight: activeLang === lang.code ? 600 : 400,
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Abstract Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div>
                <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                  ABSTRACT ({activeLang.toUpperCase()})
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
                  {getAbstract()}
                </div>
              </div>

              {/* Linked Scientific Assets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div style={{ border: '1px solid #D8E1E7', padding: '16px', backgroundColor: '#FFFFFF' }}>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                    UNDERLYING DATASETS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedPub.linkedDatasets.map((dsId) => (
                      <button
                        key={dsId}
                        className="btn-secondary btn-sm"
                        style={{ textAlign: 'left', justifyContent: 'space-between' }}
                        onClick={() => onNavigate('datasets')}
                      >
                        <span>{dsId}</span>
                        <span>Access →</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ border: '1px solid #D8E1E7', padding: '16px', backgroundColor: '#FFFFFF' }}>
                  <div className="text-metadata" style={{ fontWeight: 700, color: '#526474', marginBottom: '8px' }}>
                    LINKED EXPEDITIONS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedPub.linkedExpeditions.map((expId) => (
                      <button
                        key={expId}
                        className="btn-secondary btn-sm"
                        style={{ textAlign: 'left', justifyContent: 'space-between' }}
                        onClick={() => onNavigate('expeditions')}
                      >
                        <span>{expId}</span>
                        <span>View Logs →</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
