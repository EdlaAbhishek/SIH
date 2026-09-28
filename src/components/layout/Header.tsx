import React, { useState } from 'react';
import { NavSection } from '../../types';
import {
  Compass,
  MapPin,
  Ship,
  Database,
  BookOpen,
  Building2,
  GraduationCap,
  ChevronDown,
  Search,
  Bell,
  Menu,
  X,
  Share2,
  GitBranch,
  Activity,
  Users,
  Code2,
  ShieldCheck,
  User,
} from 'lucide-react';

interface HeaderProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  activeAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  activeAlertCount,
}) => {
  const [showMoreNav, setShowMoreNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Exact required 7 center links + More
  const centerLinks: { id: NavSection; label: string; icon: any }[] = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'map', label: 'Polar Map', icon: MapPin },
    { id: 'papers', label: 'Research', icon: BookOpen },
    { id: 'datasets', label: 'Data', icon: Database },
    { id: 'expeditions', label: 'Expeditions', icon: Ship },
    { id: 'stations', label: 'Stations', icon: Building2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  // Secondary items cleanly placed under "More"
  const moreLinks: { id: NavSection; label: string; icon: any }[] = [
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Share2 },
    { id: 'provenance', label: 'Data Provenance', icon: GitBranch },
    { id: 'live-data', label: 'Live Polar Data', icon: Activity },
    { id: 'community', label: 'Research Community', icon: Users },
    { id: 'citizen-science', label: 'Citizen Science', icon: Users },
    { id: 'workspace', label: 'Jupyter Workspace', icon: Code2 },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  const isMoreActive = moreLinks.some((l) => l.id === currentSection);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#0B1F33',
        borderBottom: '1px solid #123B5D',
        color: '#FFFFFF',
      }}
    >
      <div
        className="page-container"
        style={{
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT: Branding (Max Width ~180-220px, compact) */}
        <div
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            maxWidth: '220px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {/* Geometric Polar Bear Logo Mark */}
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#123B5D',
              border: '1px solid #2F6F95',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L3 21H21L12 3Z" stroke="#2F6F95" strokeWidth="2" fill="#0B1F33" />
              <path d="M12 9L7 19H17L12 9Z" fill="#FFFFFF" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                lineHeight: 1.15,
              }}
            >
              POLAR BEAR
            </div>
            <div
              style={{
                fontSize: '8.5px',
                fontWeight: 600,
                color: '#2F6F95',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              POLAR SCIENCE INTELLIGENCE PLATFORM
            </div>
          </div>
        </div>

        {/* CENTER: Fixed Desktop Navigation Bar */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            height: '100%',
          }}
          className="desktop-nav"
        >
          <style>{`
            @media (min-width: 1040px) {
              .desktop-nav { display: flex !important; }
            }
          `}</style>
          {centerLinks.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background: isActive ? '#123B5D' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #2F6F95' : '2px solid transparent',
                  color: isActive ? '#FFFFFF' : '#D8E1E7',
                  padding: '0 12px',
                  height: '68px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* "More" Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMoreNav(!showMoreNav)}
              style={{
                background: isMoreActive ? '#123B5D' : 'transparent',
                border: 'none',
                borderBottom: isMoreActive ? '2px solid #2F6F95' : '2px solid transparent',
                color: isMoreActive ? '#FFFFFF' : '#D8E1E7',
                padding: '0 12px',
                height: '68px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: isMoreActive ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span>More</span>
              <ChevronDown size={14} color="#D8E1E7" />
            </button>

            {showMoreNav && (
              <div
                style={{
                  position: 'absolute',
                  top: '68px',
                  left: 0,
                  width: '230px',
                  backgroundColor: '#0B1F33',
                  border: '1px solid #123B5D',
                  zIndex: 2000,
                }}
              >
                {moreLinks.map((sub) => {
                  const Icon = sub.icon;
                  const isActive = currentSection === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onNavigate(sub.id);
                        setShowMoreNav(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: isActive ? '#123B5D' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #123B5D',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Icon size={15} color="#2F6F95" />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT: Search, Notifications, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Button */}
          <button
            onClick={() => onNavigate('search')}
            style={{
              backgroundColor: '#123B5D',
              border: '1px solid #2F6F95',
              color: '#FFFFFF',
              height: '36px',
              padding: '0 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Search size={14} color="#E8F1F5" />
            <span>Search</span>
          </button>

          {/* Notifications Flyout */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                backgroundColor: activeAlertCount > 0 ? '#123B5D' : 'transparent',
                border: '1px solid #123B5D',
                color: '#FFFFFF',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              title="System Alerts"
            >
              <Bell size={16} color={activeAlertCount > 0 ? '#EF4444' : '#D8E1E7'} />
              {activeAlertCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#EF4444',
                    borderRadius: '50%',
                  }}
                />
              )}
            </button>

            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '300px',
                  backgroundColor: '#FFFFFF',
                  color: '#16232E',
                  border: '1px solid #D8E1E7',
                  zIndex: 2000,
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#0B1F33',
                    color: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }} className="font-mono">
                    ACTIVE TELEMETRY ALERTS
                  </span>
                  <span className="badge-tag alert" style={{ fontSize: '9px' }}>
                    {activeAlertCount} CRITICAL
                  </span>
                </div>
                <div style={{ padding: '14px', fontSize: '13px' }}>
                  <div style={{ fontWeight: 600, color: '#A82020', marginBottom: '4px' }}>
                    Concordia AWS Surge (+14.2°C)
                  </div>
                  <p style={{ fontSize: '12px', color: '#526474', lineHeight: 1.4, marginBottom: '8px' }}>
                    Surface temperature anomaly (+4.8σ) recorded by station sensor AWS-CONCORDIA-04.
                  </p>
                  <button
                    className="btn-tertiary"
                    style={{ fontSize: '12px' }}
                    onClick={() => {
                      onNavigate('live-data');
                      setShowNotifications(false);
                    }}
                  >
                    Inspect in Live Polar Data →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge */}
          <button
            onClick={() => onNavigate('researchers')}
            style={{
              backgroundColor: '#123B5D',
              border: '1px solid #123B5D',
              height: '36px',
              padding: '0 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}
          >
            <User size={15} color="#2F6F95" />
            <span style={{ fontSize: '13px', fontWeight: 500 }}>Dr. E. Rostova</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              background: 'none',
              border: '1px solid #123B5D',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            className="mobile-btn"
          >
            <style>{`
              @media (max-width: 1039px) {
                .mobile-btn { display: flex !important; }
              }
            `}</style>
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <div
          style={{
            backgroundColor: '#071524',
            borderTop: '1px solid #123B5D',
            padding: '16px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[...centerLinks, ...moreLinks].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setShowMobileMenu(false);
                }}
                style={{
                  backgroundColor: currentSection === item.id ? '#123B5D' : '#0B1F33',
                  border: '1px solid #123B5D',
                  color: '#FFFFFF',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
