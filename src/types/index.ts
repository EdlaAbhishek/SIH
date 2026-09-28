export type NavSection =
  | 'home'
  | 'map'
  | 'ask-ai'
  | 'knowledge-graph'
  | 'provenance'
  | 'live-data'
  | 'expeditions'
  | 'datasets'
  | 'stations'
  | 'papers'
  | 'researchers'
  | 'search'
  | 'multimodal'
  | 'citizen-science'
  | 'education'
  | 'community'
  | 'review'
  | 'workspace'
  | 'admin';

export type PolarRegion = 'Arctic' | 'Antarctic' | 'Both';

export type ResearchDomain =
  | 'Sea Ice'
  | 'Oceanography'
  | 'Glaciology'
  | 'Atmospheric Science'
  | 'Climate'
  | 'Biology'
  | 'Geology';

export interface ResearchStation {
  id: string;
  name: string;
  country: string;
  region: 'Arctic' | 'Antarctic';
  lat: number;
  lon: number;
  elevationM: number;
  establishedYear: number;
  winterPop: number;
  summerPop: number;
  status: 'Operational' | 'Seasonal' | 'Automated';
  currentTemp: number;
  currentWind: number;
  seaIceConcentration?: number;
  activeProjects: string[];
  activeResearchers: string[];
  datasetsCount: number;
  publicationsCount: number;
  recentObservations: {
    time: string;
    parameter: string;
    value: string;
  }[];
}

export interface RouteWaypoint {
  name: string;
  lat: number;
  lon: number;
  day: string;
}

export interface Expedition {
  id: string;
  name: string;
  vesselOrBase: string;
  region: PolarRegion;
  startDate: string;
  endDate: string;
  leadResearcher: string;
  leadResearcherId: string;
  organization: string;
  route: RouteWaypoint[];
  objectives: string[];
  datasets: string[];
  publications: string[];
  photosCount: number;
  videosCount: number;
  observationsCount: number;
  aiSummary: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  provenanceHash: string;
}

export interface Dataset {
  id: string;
  title: string;
  doi: string;
  domain: ResearchDomain;
  region: PolarRegion;
  spatialCoverage: string;
  timeRange: string;
  variables: string[];
  resolution: string;
  sourceRepo: 'PANGAEA' | 'NASA Earthdata' | 'NOAA NCEI' | 'Zenodo' | 'Dryad' | 'Polar Bear Node';
  license: string;
  fileCount: number;
  sizeBytes: string;
  qualityFlag: 'Verified Level-3' | 'Verified Level-2' | 'Raw Telemetry' | 'Under Review';
  downloadUrl: string;
  lastUpdated: string;
  sampleData: {
    timestamp: string;
    depthM?: number;
    tempC: number;
    salinityPsu?: number;
    iceThicknessM?: number;
    quality: string;
  }[];
  citationsCount: number;
}

export interface Publication {
  id: string;
  title: string;
  doi: string;
  journal: string;
  year: number;
  authors: string[];
  abstract: string;
  translations?: { [lang: string]: string };
  linkedDatasets: string[];
  linkedExpeditions: string[];
  peerReviewed: boolean;
  openAccess: boolean;
  citations: number;
  altmetricScore: number;
}

export interface Researcher {
  id: string;
  name: string;
  title: string;
  institution: string;
  country: string;
  orcid: string;
  regionFocus: PolarRegion;
  hIndex: number;
  citations: number;
  expeditions: string[];
  datasets: string[];
  publications: string[];
  researchInterests: string[];
  bio: string;
}

export interface SensorTelemetry {
  id: string;
  sensorId: string;
  stationName: string;
  timestamp: string;
  lat: number;
  lon: number;
  variable: string;
  rawValue: number;
  cleanedValue: number;
  unit: string;
  qualityFlag: 'GOOD' | 'CORRECTED' | 'ANOMALOUS';
  isAnomaly: boolean;
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  stationName: string;
  sensorId: string;
  variable: string;
  detectedValue: string;
  baselineRange: string;
  deviationSigma: number;
  description: string;
  severity: 'Warning' | 'Critical' | 'Informational';
  status: 'Active' | 'Investigating' | 'Verified Flagged';
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'Researcher' | 'Expedition' | 'Location' | 'Dataset' | 'Publication' | 'Sensor';
  cluster: string;
  subtext: string;
  meta: Record<string, string | number>;
  x?: number;
  y?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
}

export interface ProvenanceStage {
  id: string;
  stageName: string;
  order: number;
  agent: string;
  toolOrMethod: string;
  input: string;
  output: string;
  timestamp: string;
  sha256: string;
  w3cProvType: string;
  description: string;
  auditMetrics: Record<string, string>;
}

export interface MultimodalItem {
  id: string;
  title: string;
  mediaType: 'image' | 'video' | 'audio' | 'satellite';
  stationOrExpedition: string;
  timestamp: string;
  description: string;
  tags: string[];
  transcripts?: {
    startSec: number;
    timestampText: string;
    text: string;
  }[];
}

export interface CitizenTask {
  id: string;
  title: string;
  category: string;
  description: string;
  progressPercent: number;
  completedCount: number;
  targetCount: number;
  rewardPoints: number;
  instructions: string[];
}

export interface WorkspaceNotebook {
  id: string;
  title: string;
  language: string;
  author: string;
  lastExecuted: string;
  cells: {
    id: string;
    cellType: 'code' | 'markdown';
    content: string;
    output?: string;
  }[];
}

export interface ReviewSubmission {
  id: string;
  title: string;
  category: 'Dataset' | 'Publication' | 'Expedition Report';
  author: string;
  institution: string;
  submitDate: string;
  status: 'Submitted' | 'Under Review' | 'Verified' | 'Published';
  reviewer: string;
  fairScore: number; // 0-100
  notes: string;
}
