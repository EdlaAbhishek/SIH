import React, { useState } from 'react';
import { NavSection, MultimodalItem } from '../../types';
import { MULTIMODAL_ITEMS } from '../../data/mockData';
import {
  Video,
  Image,
  Radio,
  Search,
  Clock,
  Play,
  Share2,
  Tag,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface MultimodalViewProps {
  onNavigate: (section: NavSection) => void;
}

export const MultimodalView: React.FC<MultimodalViewProps> = ({ onNavigate }) => {
  const [items] = useState<MultimodalItem[]>(MULTIMODAL_ITEMS);
  const [transcriptSearch, setTranscriptSearch] = useState<string>('ice thickness');
  const [selectedItemId, setSelectedItemId] = useState<string>('mm-vid-thwaites-icefin');
  const [activeTimestampSec, setActiveTimestampSec] = useState<number>(48);

  const selectedItem =
    items.find((i) => i.id === selectedItemId) || items[0];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                SENSORY & IMAGERY REPOSITORY · SPEECH-TO-TEXT INDEXED
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Multimodal Research Archive</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Explore underwater robotics video, marine hydrophone audio, and SAR satellite imagery with time-stamped transcript indexing.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('search')}
              >
                <Search size={15} />
                <span>Search All Media</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Transcript Search Bar (Mandatory Prompt Feature: "ice thickness" example) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D8E1E7',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Search size={18} color="#2F6F95" />
        <input
          type="text"
          value={transcriptSearch}
          onChange={(e) => setTranscriptSearch(e.target.value)}
          placeholder="Search spoken speech inside video transcripts (e.g. ice thickness, salinity, grounding)..."
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #D8E1E7',
            outline: 'none',
            backgroundColor: '#F7FAFC',
          }}
        />
        <button
          className="btn-primary btn-sm"
          style={{ padding: '8px 16px' }}
          onClick={() => {}}
        >
          Search Video Audio Transcripts
        </button>
      </div>

      {/* Split Grid: Media Archive & Video Player with Highlighted Transcripts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 360px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '660px',
        }}
        className="multimodal-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .multimodal-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Media File Catalog */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#526474',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
            className="font-mono"
          >
            INDEXED MULTIMODAL MEDIA ({items.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item) => {
              const isSelected = item.id === selectedItemId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                    color: isSelected ? '#FFFFFF' : '#0B1F33',
                    border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span
                      className={`badge-tag ${
                        item.mediaType === 'video'
                          ? 'arctic'
                          : item.mediaType === 'audio'
                          ? 'live'
                          : 'navy'
                      }`}
                      style={{ fontSize: '9px' }}
                    >
                      {item.mediaType.toUpperCase()}
                    </span>
                    <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#D8E1E7' : '#526474' }}>
                      {item.timestamp}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#D8E1E7' : '#526474' }}>
                    {item.stationOrExpedition}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Player & Time-Stamped Transcript Inspector */}
        <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
          {/* Media Header */}
          <div
            style={{
              padding: '18px 24px',
              backgroundColor: '#0B1F33',
              color: '#FFFFFF',
              borderBottom: '1px solid #123B5D',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-tag arctic">{selectedItem.mediaType}</span>
              <span className="badge-tag live">Whisper AI Transcribed</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
              {selectedItem.title}
            </h2>
            <div style={{ fontSize: '12px', color: '#D8E1E7' }}>
              Campaign: <strong>{selectedItem.stationOrExpedition}</strong>
            </div>
          </div>

          {/* Video Player Mock Canvas (Solid colors, no gradients) */}
          <div
            style={{
              backgroundColor: '#071524',
              borderBottom: '1px solid #123B5D',
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              color: '#FFFFFF',
            }}
          >
            {/* Play Button & Time readout */}
            <div
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#123B5D',
                border: '2px solid #2F6F95',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              <Play size={22} color="#FFFFFF" />
            </div>
            <div className="font-mono" style={{ fontSize: '12px', color: '#E8F1F5' }}>
              CURRENT TIMECODE: {Math.floor(activeTimestampSec / 60)}:
              {(activeTimestampSec % 60).toString().padStart(2, '0')} (SEEKED)
            </div>
            <div style={{ fontSize: '11px', color: '#526474', marginTop: '4px' }}>
              High-Definition Scientific Footage Feed
            </div>
          </div>

          {/* Transcript Search Timeline Highlight (Mandatory Prompt Feature) */}
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#526474',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              className="font-mono"
            >
              <span>TIME-CODED TRANSCRIPT & TOPIC HIGHLIGHTS</span>
              <span style={{ color: '#2F6F95' }}>FILTER: "{transcriptSearch}"</span>
            </div>

            {selectedItem.transcripts ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedItem.transcripts.map((t, idx) => {
                  const hasMatch =
                    transcriptSearch.trim() !== '' &&
                    t.text.toLowerCase().includes(transcriptSearch.toLowerCase());
                  const isActive = activeTimestampSec === t.startSec;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveTimestampSec(t.startSec)}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: isActive
                          ? '#123B5D'
                          : hasMatch
                          ? '#E8F1F5'
                          : '#F7FAFC',
                        color: isActive ? '#FFFFFF' : '#0B1F33',
                        border: `1px solid ${
                          isActive ? '#123B5D' : hasMatch ? '#2F6F95' : '#D8E1E7'
                        }`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: isActive ? '#0B1F33' : '#FFFFFF',
                          padding: '2px 6px',
                          border: '1px solid #D8E1E7',
                          color: isActive ? '#E8F1F5' : '#2F6F95',
                        }}
                      >
                        {t.timestampText}
                      </span>
                      <div style={{ fontSize: '13px', lineHeight: 1.5, flex: 1 }}>
                        {t.text}
                      </div>
                      {hasMatch && (
                        <span className="badge-tag alert" style={{ fontSize: '9px' }}>
                          TOPIC MATCH
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#526474' }}>
                Audio/imagery modality has no speech track. Acoustic spectrogram available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
