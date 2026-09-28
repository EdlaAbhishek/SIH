# POLAR BEAR
### Polar Science Intelligence & Discovery Platform

> **Connecting Polar Research. Discovering the Future.**

Polar Bear is an institutional polar science research and knowledge intelligence platform connecting expeditions, researchers, datasets, peer-reviewed publications, research stations, real-time polar observations, and educational resources in one unified system.

---

## Key Features

1. **Polar Intelligence Map**
   - Interactive high-latitude geospatial views (WGS 84 / NSIDC Polar Stereographic projection).
   - Dynamic layers for expeditions, research stations, datasets, researchers, sea ice, temperature fields, ocean CTD buoys, and live sensors.

2. **Global Research Search & Ask Polar Bear**
   - Unified federated query across polar publications, open-access datasets, expeditions, scientific stations, and researcher directories.
   - Source-grounded AI synthesis strictly tied to verified publications and NetCDF telemetry.

3. **Live Polar Data Center**
   - Real-time environmental telemetry across Antarctic automated weather stations (AWS), Arctic drifting buoys, and sub-surface CTD profilers.
   - Dual-view toggle between raw telemetry and QA/QC cleaned records.
   - Automated anomaly detection flagging sudden thermal surges and deviations.

4. **FAIR Data Provenance & Lineage**
   - 6-stage lifecycle tracking: `Observation → Raw Dataset → Quality Check → Processed Dataset → Analysis → Publication`.
   - SHA-256 cryptographic verification and W3C PROV-O compliance.

5. **Scientific Expeditions & Research Directory**
   - Detailed itineraries, icebreaker routes, multi-year timelines, and linked science deliverables.
   - Institutional researcher profiles with verified ORCID identifiers and citation metrics.

6. **Polar Science Education**
   - **Student Mode**: Jargon-free conceptual explanations of climate dynamics, sea ice, and wildlife adaptations.
   - **Teacher Resources**: High school and university curricula incorporating authentic open datasets.

---

## Tech Stack & Architecture

- **Core**: React 19, TypeScript, Vite
- **Styling**: Clean Vanilla CSS Design System (Inter typography scale, solid colors only, zero gradients)
- **Icons**: Lucide Icons
- **Deployment**: Vercel ready (`npm run build`)

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
