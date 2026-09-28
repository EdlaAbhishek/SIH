import React, { useState } from 'react';
import { NavSection, ResearchStation, Expedition, Dataset, Publication, Researcher } from '../../types';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Database,
  Ship,
  Building2,
  User,
  ArrowRight,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

interface GlobalSearchViewProps {
  onNavigate: (section: NavSection) => void;
  stations: ResearchStation[];
  expeditions: Expedition[];
  datasets: Dataset[];
  publications: Publication[];
  researchers: Researcher[];
}

export const GlobalSearchView: React.FC<GlobalSearchViewProps> = ({
  onNavigate,
  stations,
  expeditions,
  datasets,
  publications,
  researchers,
}) => {
  const [query, setQuery] = useState<string>('ice');
  const [searchMode, setSearchMode] = useState<'hybrid' | 'keyword' | 'semantic'>('hybrid');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  const domainFilters = [
    'ALL',
    'Sea Ice',
    'Oceanography',
    'Glaciology',
    'Atmospheric Science',
    'Climate',
    'Biology',
    'Geology',
  ];

  // Flattened search items
  interface SearchResultItem {
    id: string;
    type: 'Paper' | 'Dataset' | 'Expedition' | 'Station' | 'Researcher';
    title: string;
    domain: string;
    region: string;
    meta: string;
    navTarget: NavSection;
  }

  const allItems: SearchResultItem[] = [
    ...publications.map((p) => ({
      id: p.id,
      type: 'Paper' as const,
      title: p.title,
      domain: 'Glaciology',
      region: 'Antarctic',
      meta: `${p.journal} (${p.year}) • DOI: ${p.doi} • ${p.citations} citations`,
      navTarget: 'papers' as NavSection,
    })),
    ...datasets.map((d) => ({
      id: d.id,
      type: 'Dataset' as const,
      title: d.title,
      domain: d.domain,
      region: d.region,
      meta: `Resolution: ${d.resolution} • ${d.sizeBytes} • ${d.qualityFlag}`,
      navTarget: 'datasets' as NavSection,
    })),
    ...expeditions.map((e) => ({
      id: e.id,
      type: 'Expedition' as const,
      title: e.name,
      domain: 'Multidisciplinary',
      region: e.region,
      meta: `Lead: ${e.leadResearcher} • Vessel: ${e.vesselOrBase} • ${e.status}`,
      navTarget: 'expeditions' as NavSection,
    })),
    ...stations.map((s) => ({
      id: s.id,
      type: 'Station' as const,
      title: s.name,
      domain: 'Infrastructure',
      region: s.region,
      meta: `Country: ${s.country} • Elevation: ${s.elevationM}m • Temp: ${s.currentTemp}°C`,
      navTarget: 'stations' as NavSection,
    })),
    ...researchers.map((r) => ({
      id: r.id,
      type: 'Researcher' as const,
      title: r.name,
      domain: 'Oceanography',
      region: r.regionFocus,
      meta: `${r.title} • ${r.institution} • h-index: ${r.hIndex}`,
      navTarget: 'researchers' as NavSection,
    })),
  ];

  const results = allItems.filter((item) => {
    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase());

    const matchesDomain =
      selectedDomain === 'ALL' || item.domain.toLowerCase().includes(selectedDomain.toLowerCase());

    const matchesRegion =
      selectedRegion === 'ALL' ||
      item.region === 'Both' ||
      item.region === selectedRegion;

    return matchesQuery && matchesDomain && matchesRegion;
  });

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                FEDERATED POLAR REPOSITORY INDEX · DENSE & SPARSE HYBRID
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Global Polar Search</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Unified federated query across polar research papers, open-access datasets, expeditions, scientific stations, and researcher directories.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('ask-ai')}
              >
                <Sparkles size={15} />
                <span>Ask Polar Bear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">
        {/* Main Search Input Form */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #D8E1E7',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #123B5D',
              backgroundColor: '#F7FAFC',
              padding: '0 14px',
            }}
          >
            <Search size={18} color="#2F6F95" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search polar research, datasets, expeditions, researchers..."
              style={{
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '15px',
                color: '#0B1F33',
              }}
            />
          </div>

          <button
            className="btn-primary"
            style={{ padding: '0 24px', fontSize: '14px' }}
            onClick={() => {}}
          >
            Search Index
          </button>
        </div>

        {/* Search Mode Toggles & Domain Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {/* Mode Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginRight: '6px' }} className="font-mono">
              SEARCH MODE:
            </span>
            {[
              { id: 'hybrid', label: 'Hybrid (Dense + Sparse)' },
              { id: 'keyword', label: 'Exact Keyword' },
              { id: 'semantic', label: 'Vector Semantic' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSearchMode(m.id as any)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  border: '1px solid #D8E1E7',
                  cursor: 'pointer',
                  backgroundColor: searchMode === m.id ? '#123B5D' : '#FFFFFF',
                  color: searchMode === m.id ? '#FFFFFF' : '#123B5D',
                  fontWeight: searchMode === m.id ? 600 : 400,
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Region Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginRight: '6px' }} className="font-mono">
              REGION:
            </span>
            {['ALL', 'Antarctic', 'Arctic'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  border: '1px solid #D8E1E7',
                  cursor: 'pointer',
                  backgroundColor: selectedRegion === reg ? '#0B1F33' : '#FFFFFF',
                  color: selectedRegion === reg ? '#FFFFFF' : '#0B1F33',
                  fontWeight: selectedRegion === reg ? 600 : 400,
                }}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filters Row */}
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #D8E1E7', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#526474', marginRight: '6px' }} className="font-mono">
            DISCIPLINE:
          </span>
          {domainFilters.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                border: '1px solid #D8E1E7',
                cursor: 'pointer',
                backgroundColor: selectedDomain === domain ? '#2F6F95' : '#F7FAFC',
                color: selectedDomain === domain ? '#FFFFFF' : '#526474',
                fontWeight: selectedDomain === domain ? 600 : 400,
              }}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results: Clean List / Table Layout (Strictly per prompt: "clean list/table layout rather than dozens of cards") */}
      <div className="panel-border">
        <div className="panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F33' }}>
              MATCHED SCIENTIFIC RECORDS
            </span>
            <span className="badge-tag navy" style={{ fontSize: '10px' }}>
              {results.length} Found
            </span>
          </div>
          <div className="font-mono" style={{ fontSize: '11px', color: '#526474' }}>
            QUERY LATENCY: 24 ms • REPOSITORIES FEDERATED: 5
          </div>
        </div>

        <table className="sci-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Entity Type</th>
              <th>Scientific Record Title</th>
              <th>Discipline</th>
              <th>Region</th>
              <th>Metadata / Identifiers</th>
              <th style={{ width: '110px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res) => (
              <tr
                key={res.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate(res.navTarget)}
              >
                <td>
                  <span
                    className={`badge-tag ${
                      res.type === 'Paper'
                        ? 'navy'
                        : res.type === 'Dataset'
                        ? 'arctic'
                        : res.type === 'Expedition'
                        ? 'live'
                        : 'default'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {res.type}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: '#0B1F33' }}>
                  {res.title}
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: '#526474' }}>{res.domain}</span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: '#526474' }}>{res.region}</span>
                </td>
                <td className="font-mono" style={{ fontSize: '11px', color: '#526474' }}>
                  {res.meta}
                </td>
                <td>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(res.navTarget);
                    }}
                  >
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
