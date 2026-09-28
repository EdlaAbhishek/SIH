import React, { useState } from 'react';
import { NavSection } from '../../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Tag,
  Share2,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface CommunityViewProps {
  onNavigate: (section: NavSection) => void;
}

interface ForumThread {
  id: string;
  title: string;
  author: string;
  institution: string;
  category: string;
  createdAt: string;
  upvotes: number;
  repliesCount: number;
  tags: string[];
  content: string;
  resolved: boolean;
}

const FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'Mooring conductivity cell calibration drift in high-salinity brine leads: What compensation algorithms are recommended?',
    author: 'Dr. Elena Rostova',
    institution: 'Alfred Wegener Institute',
    category: 'Methods & Instrumentation',
    createdAt: '2 days ago',
    upvotes: 28,
    repliesCount: 6,
    tags: ['MicroCAT', 'TEOS-10', 'Salinity', 'Brine'],
    content:
      'We noticed during the Weddell Sea cruise that inductive conductivity sensors experienced intermittent biofilm and micro-frazil ice adhesion at 150m. We are comparing the McDougall & Barker (2011) TEOS-10 density check against the standard SBE-37 linear drift polynomial. Has anyone benchmarked these under supercooled water conditions?',
    resolved: true,
  },
  {
    id: 'thread-2',
    title: 'Replication code for Bedmap3 500m digital elevation model interpolation in Python xarray / Dask',
    author: 'Dr. David Vaughan',
    institution: 'British Antarctic Survey',
    category: 'Data Analysis & Reproducibility',
    createdAt: '5 days ago',
    upvotes: 42,
    repliesCount: 11,
    tags: ['Bedmap3', 'xarray', 'Dask', 'DEM'],
    content:
      'We have open-sourced a reproducible Jupyter notebook demonstrating optimal kriging with anisotropic variograms for the Amundsen Sea sector. The notebook is connected to the Polar Bear cloud workspace.',
    resolved: false,
  },
  {
    id: 'thread-3',
    title: 'Fieldwork equipment recommendations for autonomous drone surveys in -40°C Arctic winter conditions',
    author: 'Dr. Astrid Lindqvist',
    institution: 'Norwegian Polar Institute',
    category: 'Field Operations & Logistics',
    createdAt: '1 week ago',
    upvotes: 35,
    repliesCount: 9,
    tags: ['UAV', 'Drone', 'Svalbard', 'Batteries'],
    content:
      'Seeking feedback on heated LiPo battery pouches and solid-state IMUs for Svalbard drone flights during polar night. Standard consumer drones experience gimbal grease freezing at -25°C.',
    resolved: true,
  },
];

export const CommunityView: React.FC<CommunityViewProps> = ({ onNavigate }) => {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('thread-1');
  const [newComment, setNewComment] = useState<string>('');

  const selectedThread =
    threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                SCIENTIFIC EXCHANGE · PEER-TO-PEER DISCUSSIONS
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Research Community Forum</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Structured scientific discussions on polar field methods, dataset anomalies, instrument calibration, and collaborative fieldwork.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => alert('Start a new discussion thread modal.')}
            >
              <MessageSquare size={15} />
              <span>Start New Discussion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* Split Grid: Left Thread List, Right Discussion Thread */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 420px) minmax(500px, 1fr)',
          gap: '1px',
          backgroundColor: '#D8E1E7',
          border: '1px solid #D8E1E7',
          minHeight: '660px',
        }}
        className="community-split-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .community-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Column: Forum Threads */}
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
            ACTIVE DISCUSSIONS ({threads.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {threads.map((th) => {
              const isSelected = th.id === selectedThreadId;
              return (
                <div
                  key={th.id}
                  onClick={() => setSelectedThreadId(th.id)}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                    color: isSelected ? '#FFFFFF' : '#0B1F33',
                    border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="badge-tag arctic" style={{ fontSize: '9px' }}>
                      {th.category}
                    </span>
                    <button
                      onClick={(e) => handleUpvote(th.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isSelected ? '#E8F1F5' : '#2F6F95',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    >
                      <ThumbsUp size={12} />
                      <span>{th.upvotes}</span>
                    </button>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '4px' }}>
                    {th.title}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#D8E1E7' : '#526474', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{th.author}</span>
                    <span>{th.repliesCount} replies</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Thread & Replies */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
              <span className="badge-tag navy">{selectedThread.category}</span>
              {selectedThread.resolved && (
                <span className="badge-tag live">Method Verified</span>
              )}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0B1F33', marginBottom: '8px' }}>
              {selectedThread.title}
            </h2>
            <div style={{ fontSize: '12px', color: '#526474', display: 'flex', gap: '12px' }}>
              <span>Started by: <strong>{selectedThread.author}</strong> ({selectedThread.institution})</span>
              <span>•</span>
              <span>{selectedThread.createdAt}</span>
            </div>
          </div>

          {/* Thread Body Content */}
          <div
            style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: '#16232E',
              backgroundColor: '#F7FAFC',
              padding: '16px',
              border: '1px solid #D8E1E7',
              marginBottom: '20px',
            }}
          >
            {selectedThread.content}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
            {selectedThread.tags.map((tg, idx) => (
              <span key={idx} className="badge-tag navy" style={{ fontSize: '10px' }}>
                #{tg}
              </span>
            ))}
          </div>

          {/* Thread Replies List */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '10px' }} className="font-mono">
              PEER SCIENTIFIC RESPONSES ({selectedThread.repliesCount})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ border: '1px solid #D8E1E7', padding: '14px', backgroundColor: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#0B1F33' }}>Dr. Antoine Chen (IPEV)</span>
                  <span className="font-mono" style={{ color: '#526474' }}>1 day ago</span>
                </div>
                <p style={{ fontSize: '13px', color: '#526474', lineHeight: 1.5 }}>
                  We encountered identical frazil ice adhesion during the Tara Polar Station drift. We implemented a 5-point median sliding filter prior to TEOS-10 inversion. You can review our implementation in the Polar Bear Jupyter workspace.
                </p>
              </div>
            </div>
          </div>

          {/* Add Reply Input */}
          <div style={{ borderTop: '1px solid #D8E1E7', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginBottom: '6px' }} className="font-mono">
              CONTRIBUTE TO DISCUSSION (SCIENTIFIC CREDENTIALED)
            </div>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Provide scientific observations, code references, or citations..."
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '13px',
                border: '1px solid #D8E1E7',
                outline: 'none',
                backgroundColor: '#F7FAFC',
                marginBottom: '8px',
                fontFamily: 'inherit',
              }}
            />
            <button
              className="btn-primary btn-sm"
              onClick={() => {
                if (newComment.trim()) {
                  alert('Reply posted to peer discussion thread.');
                  setNewComment('');
                }
              }}
            >
              Post Scientific Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
