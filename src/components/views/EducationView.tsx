import React, { useState } from 'react';
import { NavSection } from '../../types';
import {
  GraduationCap,
  BookOpen,
  Download,
  HelpCircle,
  Thermometer,
  Layers,
  Compass,
  ArrowRight,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface EducationViewProps {
  onNavigate: (section: NavSection) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'student' | 'teacher'>('student');
  const [selectedTopic, setSelectedTopic] = useState<string>('sea-ice');

  const studentTopics = [
    {
      id: 'climate',
      title: 'Polar Climate & Seasons',
      summary:
        'Why are the poles so cold? Polar regions receive sunlight at very low, glancing angles. During winter, each pole experiences polar night, where the sun does not rise above the horizon for up to six months.',
      keyFact: 'The coldest temperature ever recorded on Earth was -89.2°C at Vostok Station, Antarctica, in 1983.',
      interactiveTip: 'Notice how high surface albedo (reflectivity) bounces 85% of solar radiation back into space.',
    },
    {
      id: 'sea-ice',
      title: 'Sea Ice Dynamics',
      summary:
        'Sea ice is frozen ocean water. Unlike icebergs (which break off from glaciers on land), sea ice forms, grows, and melts entirely in the ocean. It acts as a massive thermal blanket between the ocean and cold atmosphere.',
      keyFact: 'Arctic sea ice reaches its minimum extent every September, having declined by over 12% per decade since satellite records began.',
      interactiveTip: 'When ocean water freezes, salt is squeezed out into the water below, forming dense cold salty water called brine.',
    },
    {
      id: 'glaciers',
      title: 'Glaciers & Ice Shelves',
      summary:
        'Glaciers are rivers of compressed ice formed from thousands of years of snowfall. When they flow into the ocean and float, they become floating ice shelves that hold back continental glaciers like corks in a bottle.',
      keyFact: 'If the entire West Antarctic Ice Sheet melted, global sea level would rise by approximately 3.3 meters.',
      interactiveTip: 'Ice shelves melt from beneath when warm deep ocean water enters submarine canyons.',
    },
    {
      id: 'oceans',
      title: 'Polar Ocean Currents',
      summary:
        'The Southern Ocean is circled by the Antarctic Circumpolar Current, the strongest current on Earth. It connects the Atlantic, Pacific, and Indian oceans and pumps heat and nutrients around the globe.',
      keyFact: 'Antarctic Bottom Water generated around Antarctica fills more than 40% of the entire global ocean volume.',
      interactiveTip: 'Dense sinking water at the poles drives the global ocean conveyor belt (thermohaline circulation).',
    },
    {
      id: 'wildlife',
      title: 'Polar Wildlife & Adaptations',
      summary:
        'Polar animals have evolved extraordinary physiological adaptations: antifreeze proteins in Antarctic fish blood, multi-layered insulating fat blubber in Weddell seals, and hollow guard hairs in polar bears.',
      keyFact: 'Emperor penguins breed on open sea ice in the dead of Antarctic winter at temperatures below -50°C.',
      interactiveTip: 'Changes in sea ice directly affect krill populations, which are the cornerstone of the polar food web.',
    },
    {
      id: 'expeditions',
      title: 'Living on Polar Expeditions',
      summary:
        'Modern polar researchers live on icebreakers like the RV Polarstern or inside insulated research stations built on hydraulic stilts to stay above snow drifts. They use robotics, radar, and ice-core drills.',
      keyFact: 'During the year-long MOSAiC expedition, 300 scientists from 20 countries spent a full year drifting locked in Arctic sea ice.',
      interactiveTip: 'Field scientists must consume over 4,500 calories a day to maintain body temperature in extreme sub-zero winds.',
    },
  ];

  const teacherResources = [
    {
      title: 'Curriculum Unit: Antarctic Ice Shelves & Sea Level Rise',
      targetGrade: 'Grades 9–12 (High School)',
      duration: '3 Class Periods',
      description: 'Hands-on lab exploring buoyant ice displacement, grounding lines, and Archimedes principle using real Bedmap3 topography.',
      materials: 'Lab Worksheet, Bedmap3 Student Dataset (CSV), Sliders Simulation Guide',
    },
    {
      title: 'Classroom Exercise: Decoding Real Satellite Sea Ice Trends',
      targetGrade: 'Undergraduate / Advanced Secondary',
      duration: '2 Hours Lab Session',
      description: 'Students analyze real AMSR2 daily sea-ice extent data from Polar Bear API to compute decadal loss rates.',
      materials: 'Python Jupyter Notebook template, NSIDC Sea Ice Index CSV, Discussion Rubric',
    },
    {
      title: 'Lesson Plan: Ocean Conveyor Belt & Thermohaline Sinking',
      targetGrade: 'Grades 6–8 (Middle School)',
      duration: '45 Minutes',
      description: 'Physical tank experiment demonstrating how freezing salty water creates dense sinking plumes like in the Weddell Sea.',
      materials: 'Fresh vs Salt Water Aquarium Guide, Food Coloring, Temperature Sensor Protocol',
    },
  ];

  return (
    <div style={{ paddingBottom: '64px' }}>
      {/* Standardized Internal Page Header */}
      <div className="internal-page-header">
        <div className="page-container">
          <div className="header-inner">
            <div>
              <div className="text-metadata" style={{ color: '#2F6F95', fontWeight: 700, marginBottom: '6px' }}>
                EDUCATIONAL GATEWAY · K-12 & UNIVERSITY CURRICULA
              </div>
              <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Polar Science Education</h1>
              <p className="text-secondary" style={{ maxWidth: '640px' }}>
                Foundational concepts for students and rigorous curricula for teachers incorporating authentic polar research data.
              </p>
            </div>

            {/* Mode Selector */}
            <div style={{ display: 'flex', gap: '2px', backgroundColor: '#E8F1F5', padding: '3px', border: '1px solid #D8E1E7' }}>
              <button
                onClick={() => setMode('student')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: mode === 'student' ? 600 : 400,
                  backgroundColor: mode === 'student' ? '#0B1F33' : 'transparent',
                  color: mode === 'student' ? '#FFFFFF' : '#123B5D',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Student Mode
              </button>
              <button
                onClick={() => setMode('teacher')}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: mode === 'teacher' ? 600 : 400,
                  backgroundColor: mode === 'teacher' ? '#0B1F33' : 'transparent',
                  color: mode === 'teacher' ? '#FFFFFF' : '#123B5D',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Teacher Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="page-container">

      {/* STUDENT MODE EXPERIENCE */}
      {mode === 'student' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 340px) minmax(500px, 1fr)',
            gap: '1px',
            backgroundColor: '#D8E1E7',
            border: '1px solid #D8E1E7',
            minHeight: '600px',
          }}
          className="edu-split-grid"
        >
          <style>{`
            @media (max-width: 960px) {
              .edu-split-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* Left Column: Topics Navigation */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
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
              EXPLORE POLAR TOPICS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {studentTopics.map((top) => {
                const isSelected = top.id === selectedTopic;
                return (
                  <button
                    key={top.id}
                    onClick={() => setSelectedTopic(top.id)}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: isSelected ? '#123B5D' : '#F7FAFC',
                      color: isSelected ? '#FFFFFF' : '#0B1F33',
                      border: `1px solid ${isSelected ? '#123B5D' : '#D8E1E7'}`,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  >
                    {top.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Explainer Dossier */}
          {(() => {
            const topic =
              studentTopics.find((t) => t.id === selectedTopic) || studentTopics[0];
            return (
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ borderBottom: '1px solid #D8E1E7', paddingBottom: '16px' }}>
                  <span className="badge-tag arctic" style={{ marginBottom: '6px' }}>Student Explainer</span>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0B1F33', marginBottom: '6px' }}>
                    {topic.title}
                  </h2>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#16232E' }}>
                    {topic.summary}
                  </p>
                </div>

                {/* Key Scientific Fact Box */}
                <div style={{ backgroundColor: '#E8F1F5', border: '1px solid #D8E1E7', borderLeft: '4px solid #0B1F33', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#123B5D', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    DID YOU KNOW?
                  </div>
                  <div style={{ fontSize: '13px', color: '#16232E', fontWeight: 500 }}>
                    {topic.keyFact}
                  </div>
                </div>

                {/* Interactive Discovery Tip */}
                <div style={{ backgroundColor: '#F7FAFC', border: '1px solid #D8E1E7', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '4px' }} className="font-mono">
                    HOW POLAR SCIENTISTS STUDY THIS:
                  </div>
                  <div style={{ fontSize: '13px', color: '#526474', lineHeight: 1.5 }}>
                    {topic.interactiveTip}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => onNavigate('map')}
                  >
                    <Compass size={14} />
                    <span>See This on Polar Map</span>
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => onNavigate('ask-ai')}
                  >
                    <span>Ask AI a Question about {topic.title} →</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TEACHER RESOURCES EXPERIENCE */}
      {mode === 'teacher' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E1E7', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#526474', textTransform: 'uppercase', marginBottom: '6px' }} className="font-mono">
              CURATED POLAR CURRICULUM PACKAGES
            </div>
            <p style={{ fontSize: '13px', color: '#526474', marginBottom: '16px' }}>
              All lesson plans are aligned with NGSS (Next Generation Science Standards) and incorporate authentic, anonymized data downloads from Polar Bear repositories.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {teacherResources.map((res, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#F7FAFC',
                    border: '1px solid #D8E1E7',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="badge-tag navy">{res.targetGrade}</span>
                      <span className="font-mono" style={{ fontSize: '10px', color: '#526474' }}>{res.duration}</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0B1F33', marginBottom: '6px' }}>
                      {res.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#526474', lineHeight: 1.5, marginBottom: '12px' }}>
                      {res.description}
                    </p>
                    <div style={{ fontSize: '11px', color: '#123B5D', marginBottom: '16px' }}>
                      <strong>Included Materials:</strong> {res.materials}
                    </div>
                  </div>

                  <button
                    className="btn-secondary btn-sm"
                    style={{ justifyContent: 'center' }}
                    onClick={() => alert(`Downloading ${res.title} curriculum package (PDF + CSV).`)}
                  >
                    <Download size={14} />
                    <span>Download Lesson Materials (.ZIP)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};
