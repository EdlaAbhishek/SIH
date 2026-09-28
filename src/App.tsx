import React, { useState } from 'react';
import { NavSection } from './types';
import {
  RESEARCH_STATIONS,
  EXPEDITIONS,
  DATASETS,
  PUBLICATIONS,
  RESEARCHERS,
  ANOMALY_ALERTS,
  REVIEW_SUBMISSIONS,
} from './data/mockData';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { PolarMapView } from './components/views/PolarMapView';
import { AskPolarBearView } from './components/views/AskPolarBearView';
import { KnowledgeGraphView } from './components/views/KnowledgeGraphView';
import { DataProvenanceView } from './components/views/DataProvenanceView';
import { LivePolarDataView } from './components/views/LivePolarDataView';
import { ExpeditionsView } from './components/views/ExpeditionsView';
import { DatasetsView } from './components/views/DatasetsView';
import { StationsView } from './components/views/StationsView';
import { ResearchPapersView } from './components/views/ResearchPapersView';
import { ResearchersView } from './components/views/ResearchersView';
import { GlobalSearchView } from './components/views/GlobalSearchView';
import { MultimodalView } from './components/views/MultimodalView';
import { CitizenScienceView } from './components/views/CitizenScienceView';
import { EducationView } from './components/views/EducationView';
import { CommunityView } from './components/views/CommunityView';
import { ReviewWorkflowView } from './components/views/ReviewWorkflowView';
import { AnalysisWorkspaceView } from './components/views/AnalysisWorkspaceView';
import { AdminDashboardView } from './components/views/AdminDashboardView';

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');

  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F7FAFC' }}>
      {/* Fixed Header */}
      <Header
        currentSection={currentSection}
        onNavigate={handleNavigate}
        activeAlertCount={ANOMALY_ALERTS.length}
      />

      {/* Main Scientific Content Area */}
      <main style={{ flex: 1 }}>
        {currentSection === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            stations={RESEARCH_STATIONS}
            expeditions={EXPEDITIONS}
            datasets={DATASETS}
          />
        )}

        {currentSection === 'map' && (
          <PolarMapView
            stations={RESEARCH_STATIONS}
            expeditions={EXPEDITIONS}
            datasets={DATASETS}
            onNavigate={handleNavigate}
          />
        )}

        {currentSection === 'ask-ai' && (
          <AskPolarBearView onNavigate={handleNavigate} />
        )}

        {currentSection === 'knowledge-graph' && (
          <KnowledgeGraphView onNavigate={handleNavigate} />
        )}

        {currentSection === 'provenance' && (
          <DataProvenanceView onNavigate={handleNavigate} />
        )}

        {currentSection === 'live-data' && (
          <LivePolarDataView onNavigate={handleNavigate} />
        )}

        {currentSection === 'expeditions' && (
          <ExpeditionsView onNavigate={handleNavigate} />
        )}

        {currentSection === 'datasets' && (
          <DatasetsView onNavigate={handleNavigate} />
        )}

        {currentSection === 'stations' && (
          <StationsView onNavigate={handleNavigate} />
        )}

        {currentSection === 'papers' && (
          <ResearchPapersView onNavigate={handleNavigate} />
        )}

        {currentSection === 'researchers' && (
          <ResearchersView onNavigate={handleNavigate} />
        )}

        {currentSection === 'search' && (
          <GlobalSearchView
            onNavigate={handleNavigate}
            stations={RESEARCH_STATIONS}
            expeditions={EXPEDITIONS}
            datasets={DATASETS}
            publications={PUBLICATIONS}
            researchers={RESEARCHERS}
          />
        )}

        {currentSection === 'multimodal' && (
          <MultimodalView onNavigate={handleNavigate} />
        )}

        {currentSection === 'citizen-science' && (
          <CitizenScienceView onNavigate={handleNavigate} />
        )}

        {currentSection === 'education' && (
          <EducationView onNavigate={handleNavigate} />
        )}

        {currentSection === 'community' && (
          <CommunityView onNavigate={handleNavigate} />
        )}

        {currentSection === 'review' && (
          <ReviewWorkflowView onNavigate={handleNavigate} />
        )}

        {currentSection === 'workspace' && (
          <AnalysisWorkspaceView onNavigate={handleNavigate} />
        )}

        {currentSection === 'admin' && (
          <AdminDashboardView
            onNavigate={handleNavigate}
            stations={RESEARCH_STATIONS}
            expeditions={EXPEDITIONS}
            datasets={DATASETS}
            publications={PUBLICATIONS}
            reviews={REVIEW_SUBMISSIONS}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
