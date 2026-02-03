# CLAUDE.MD - Schutzraum-Portal Deutschland

## Project Overview

**Project Name:** Schutzraum-Portal Deutschland (Working Title: "Mein Schutzraum")  
**Type:** Web-based Prototype Portal (Demo/Showcase)  
**Purpose:** Demonstrate a unified platform for shelter localization, management, and citizen information for Germany's civil protection system  
**Client Context:** BBK (Bundesamt für Bevölkerungsschutz und Katastrophenhilfe)  
**Backend:** All API calls are mocked - no real business logic  
**Target:** Demo presentation to stakeholders

---

## Vision Statement

"Schutzraum-Portal Deutschland" is a central digital platform that consolidates all shelter-related information and processes - from shelter registration and inventory management through citizen information to crisis communication - in a unified, accessible, and automated system. The platform serves both administrative users (authorities, operators) and citizens in normal times and crisis situations.

---

## Business Context

### The Challenge
- Most former public shelters have been out of operation for years
- Many facilities are technically and structurally outdated (ventilation, sealing, power)
- No unified overview of quantity, condition, and ownership
- Potentially suitable spaces (parking garages, subway stations) not systematically captured
- Population doesn't know where shelters are located in emergencies
- No nationwide digital solution for shelter findability
- Missing integration with existing warning systems (NINA)
- Low awareness for shelters after decades of non-communication
- No unified federal communication strategy

### The Solution Approach
- Central platform for shelter registration, management, and citizen information
- Web App for authorities + Public App for citizens
- Integration with NINA warning app
- Offline functionality for crisis situations
- Data sovereignty remains with German authorities
- Operation on sovereign infrastructure

### Key Reference Projects
1. **BayIMCO** (Bavaria) - COVID vaccination management portal with 3+ million users
2. **Auslandsservice-App** (Austrian Foreign Ministry) - Crisis information app with push notifications for 190+ countries

---

## User Roles (Stakeholders)

| Role | German | Description |
|------|--------|-------------|
| Citizens | Bürger:innen | General public seeking shelter information |
| Shelter Operators | Schutzraumbetreiber | Owners/managers of shelter facilities |
| Municipal Admins | Kommunale Sachbearbeiter | Local authority personnel managing shelter data |
| State Admins | Landesbehörden | State-level civil protection authorities |
| Federal Admins | BBK-Mitarbeiter | Federal agency personnel (BBK) |
| Crisis Managers | Krisenstabsmitglieder | Emergency operations center personnel |

---

## Core Problem Domains

### 1. Bestandsprüfung (Inventory Assessment)
- Assess structural condition, technology, equipment, and operational readiness
- Evaluate potential of existing infrastructure (parking garages, subways)
- Standardized assessment procedures
- Prioritization of renovation measures

### 2. Finanzierung (Funding & Grants)
- Standardization of grant applications for shelter projects
- Clarification of funding eligibility for measures
- Coordination between applicants and funding bodies
- Transparency on application status and fund allocation

### 3. Register (Shelter Registry)
- Central, consolidated nationwide shelter register
- Standardized data capture (location, capacity, protection level, condition)
- Systematic linkage with population and risk data
- Identification of regional supply gaps

### 4. Digitale Auffindbarkeit (Digital Findability)
- Citizens can find shelters in emergencies
- Nationwide digital solution for shelter localization
- Connection between shelter registry and citizen information
- Offline functionality for power/network outages
- Integration with warning and information systems

### 5. Kommunikation (Communication)
- Raise awareness for shelters and self-protection
- Transparent information about available protection options
- Clear guidance on what to do in emergencies
- Continuous (not just event-driven) communication

---

## Functional Requirements (FR)

### Citizen Portal (FR-001 to FR-010)
| ID | Requirement |
|----|-------------|
| FR-001 | Interactive map showing nearby shelters with walking distance/time |
| FR-002 | Search by address, current location, or landmark |
| FR-003 | Shelter detail view: capacity, accessibility, equipment, directions |
| FR-004 | Push notifications for emergencies with nearest shelter info |
| FR-005 | Offline mode: cached shelter data for crisis situations |
| FR-006 | Educational content: what to do, what to bring, how to prepare |
| FR-007 | FAQ and general civil protection information |
| FR-008 | Integration with NINA app warnings |
| FR-009 | Accessibility features (screen reader, high contrast, large text) |
| FR-010 | Multi-language support (German, English, Ukrainian, Arabic, Turkish) |

### Operator Portal (FR-011 to FR-020)
| ID | Requirement |
|----|-------------|
| FR-011 | Shelter registration and data entry form |
| FR-012 | Inventory checklist: structural, technical, equipment assessment |
| FR-013 | Photo/document upload for condition documentation |
| FR-014 | Capacity declaration and accessibility information |
| FR-015 | Maintenance schedule and inspection logging |
| FR-016 | Status updates (available, limited, unavailable) |
| FR-017 | Contact management for emergencies |
| FR-018 | Funding application initiation and tracking |
| FR-019 | Integration requests with local authorities |
| FR-020 | Dashboard: shelter statistics and compliance status |

### Administrative Portal (FR-021 to FR-035)
| ID | Requirement |
|----|-------------|
| FR-021 | Shelter registry management (CRUD operations) |
| FR-022 | Approval workflow for new shelter registrations |
| FR-023 | Quality assurance: data validation and verification |
| FR-024 | Population coverage analysis by region |
| FR-025 | Risk overlay: shelter coverage vs. risk areas |
| FR-026 | Gap analysis: identify underserved areas |
| FR-027 | Funding application processing and tracking |
| FR-028 | Inspection scheduling and assignment |
| FR-029 | Reporting: statistics, trends, compliance rates |
| FR-030 | User management for operators and authorities |
| FR-031 | Bulk data import/export (CSV, GeoJSON) |
| FR-032 | Audit trail for all data changes |
| FR-033 | Crisis mode activation (simplified citizen view) |
| FR-034 | Communication management: announcements, alerts |
| FR-035 | Integration with external systems (NINA, geodata, population registers) |

### Crisis Mode Features (FR-036 to FR-040)
| ID | Requirement |
|----|-------------|
| FR-036 | Simplified high-contrast citizen interface |
| FR-037 | Real-time shelter capacity updates |
| FR-038 | Crowd management: distribute citizens across shelters |
| FR-039 | Emergency broadcast to all registered users |
| FR-040 | Status dashboard for crisis managers |

---

## Non-Functional Requirements (NFR)

### Architecture & Technology
| ID | Requirement |
|----|-------------|
| NFR-001 | Modern web application with responsive design |
| NFR-002 | Progressive Web App (PWA) for offline capability |
| NFR-003 | Map-based interface using OpenStreetMap/Mapbox |
| NFR-004 | Geolocation services for "nearest shelter" function |
| NFR-005 | Real-time updates via WebSocket for crisis mode |

### Operations & Security
| ID | Requirement |
|----|-------------|
| NFR-006 | Operation on sovereign infrastructure (pCloudBw capable) |
| NFR-007 | Role-based access control with audit trails |
| NFR-008 | GDPR compliance for citizen data |
| NFR-009 | High availability (99.9%) especially in crisis |
| NFR-010 | Data encryption at rest and in transit |

### UX & Accessibility
| ID | Requirement |
|----|-------------|
| NFR-011 | WCAG 2.1 AA compliance |
| NFR-012 | Mobile-first citizen experience |
| NFR-013 | Desktop-optimized admin experience |
| NFR-014 | Maximum 3 clicks to nearest shelter info |
| NFR-015 | Loading time < 3 seconds on 3G networks |

### Scalability
| ID | Requirement |
|----|-------------|
| NFR-016 | Handle 10 million concurrent users in crisis |
| NFR-017 | Support 500,000+ shelter records |
| NFR-018 | CDN for static assets and map tiles |

---

## Data Model (Simplified)

### Shelter (Schutzraum)
```
{
  id: string
  name: string
  type: "bunker" | "basement" | "subway" | "parking" | "other"
  status: "active" | "limited" | "inactive" | "planned"
  address: {
    street: string
    city: string
    postalCode: string
    state: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  capacity: number
  protectionLevel: "basic" | "enhanced" | "full"
  accessibility: {
    wheelchair: boolean
    elevator: boolean
    groundLevel: boolean
  }
  equipment: {
    ventilation: boolean
    power: boolean
    water: boolean
    sanitation: boolean
    communication: boolean
  }
  condition: {
    structural: "good" | "fair" | "poor" | "unknown"
    technical: "good" | "fair" | "poor" | "unknown"
    lastInspection: date
    nextInspection: date
  }
  operator: {
    type: "public" | "private" | "federal"
    name: string
    contact: string
  }
  documents: [...]
  createdAt: date
  updatedAt: date
}
```

### User Roles & Permissions
```
citizen: view shelters, receive alerts
operator: manage own shelters, submit data
municipal_admin: approve shelters in municipality, run reports
state_admin: oversee state data, manage funding
federal_admin: full system access, crisis management
crisis_manager: crisis mode controls, broadcasts
```

---

## External Integrations (Mocked for Prototype)

| System | Purpose |
|--------|--------|
| NINA App | Warning system integration |
| BKG Geodata | Official geographic data |
| Zensus Database | Population data for coverage analysis |
| pCloudBw | Sovereign cloud infrastructure |
| Funding Systems | Grant application processing |

---

## KPIs for Success Measurement

- Time to find nearest shelter (< 10 seconds)
- Shelter data completeness rate (> 95%)
- Population coverage percentage
- User satisfaction (NPS > 50)
- Offline availability uptime
- Crisis mode activation time (< 30 seconds)
- Number of shelters registered
- Inspection compliance rate

---

## Prototype Scope Notes

### What IS included:
- Full UI/UX for all user roles
- Interactive map with shelter markers
- Search and filter functionality
- Shelter detail views with all information
- Admin dashboard with statistics
- Registration and approval workflows
- Notification system UI
- Responsive design (mobile + desktop)
- Offline mode simulation
- Crisis mode toggle

### What is NOT included (mocked):
- Real authentication (use demo accounts)
- Real database persistence (local state only)
- Real map tile server (use public tiles)
- Real geolocation (use simulated positions)
- Real push notifications
- Real NINA integration
- Real population data analysis

---

## Design System Guidelines

### Visual Identity
- Professional, trustworthy, government-appropriate
- Primary Color: Deep Blue (#1E3A5F) - trust, security
- Accent Color: Safety Orange (#FF6B00) - attention, emergency
- Success: Green (#2D5016)
- Background: Light gray (#F5F5F5) to white
- Typography: Clear, accessible, sans-serif (Inter or system-ui)

### UI Components
- Map as primary interface for citizens
- Cards for shelter information
- Progress indicators for registration workflows
- Status badges (active, limited, inactive)
- Timeline views for inspection history
- Data tables for admin lists
- Modal dialogs for confirmations
- Toast notifications for feedback
- High-contrast mode for crisis

### Crisis Mode Design
- Simplified, high-contrast interface
- Large touch targets
- Essential information only
- Prominent "nearest shelter" button
- Clear directional guidance

---

## Technology Stack (Recommended for Prototype)

- **Frontend:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Routing:** React Router v6
- **Maps:** react-leaflet with OpenStreetMap
- **Icons:** Lucide React
- **Charts:** Recharts
- **Mock Data:** JSON files with simulated API delay

---

## File Structure (Suggested)

```
schutzraum-portal/
├── src/
│   ├── components/
│   │   ├── common/           # Shared UI components
│   │   ├── layout/           # Header, Sidebar, Footer
│   │   ├── map/              # Map components
│   │   ├── shelter/          # Shelter cards, details
│   │   ├── dashboard/        # Dashboard widgets
│   │   ├── forms/            # Form components
│   │   └── crisis/           # Crisis mode components
│   ├── pages/
│   │   ├── auth/             # Login, demo account selection
│   │   ├── citizen/          # Public citizen pages
│   │   ├── operator/         # Shelter operator pages
│   │   ├── admin/            # Authority admin pages
│   │   └── crisis/           # Crisis mode pages
│   ├── hooks/                # Custom React hooks
│   ├── services/             # Mock API services
│   ├── data/                 # Mock data JSON files
│   ├── types/                # TypeScript interfaces
│   ├── utils/                # Helper functions
│   ├── context/              # React context providers
│   └── store/                # Zustand stores
├── public/
│   └── assets/               # Images, icons, map markers
└── package.json
```

---

## Mock Data Requirements

### Users (Demo Accounts)
```json
[
  { "email": "buerger@demo.de", "name": "Maria Schmidt", "role": "citizen" },
  { "email": "betreiber@demo.de", "name": "Thomas Müller", "role": "operator" },
  { "email": "kommune@demo.de", "name": "Sandra Weber", "role": "municipal_admin" },
  { "email": "land@demo.de", "name": "Michael Bauer", "role": "state_admin" },
  { "email": "bbk@demo.de", "name": "Dr. Anna Richter", "role": "federal_admin" },
  { "email": "krisenstab@demo.de", "name": "Klaus Hoffmann", "role": "crisis_manager" }
]
```

### Shelters (Sample - Mix of types and statuses)
- 50+ shelters across Germany
- Various types: bunkers, basements, subway stations, parking garages
- Mix of statuses: active, limited, inactive, planned
- Different cities: Berlin, Munich, Hamburg, Frankfurt, Cologne, etc.
- Various protection levels and equipment states

### Master Data
- German states (Bundesländer) list
- Shelter type catalog
- Equipment checklist items
- Protection level definitions
- Status definitions with colors

---

## Glossary

| German Term | English | Description |
|-------------|---------|-------------|
| Schutzraum | Shelter | Protected space for civilians |
| Bunker | Bunker | Hardened underground shelter |
| Zivilschutz | Civil Protection | Civil defense/protection |
| BBK | Federal Office | Bundesamt für Bevölkerungsschutz und Katastrophenhilfe |
| Katastrophenfall | Emergency | Disaster/emergency situation |
| Warnung | Warning | Official warning/alert |
| Selbstschutz | Self-Protection | Individual preparedness |
| Bestandsprüfung | Inventory Check | Assessment of existing shelters |
| Fördermittel | Funding | Grant money for projects |
| Schutzgrad | Protection Level | Level of protection offered |

---

## Demo Scenarios

### Scenario 1: Citizen Finding Shelter (30 sec)
1. Open app as citizen
2. Allow location access
3. See nearest shelters on map
4. Tap nearest shelter
5. View details and directions

### Scenario 2: Crisis Mode Activation (1 min)
1. Login as crisis manager
2. Activate crisis mode for Berlin
3. Switch to citizen view
4. See simplified crisis interface
5. Get directed to nearest available shelter

### Scenario 3: Operator Registering Shelter (2 min)
1. Login as operator
2. Start new shelter registration
3. Fill multi-step form
4. Upload condition photos
5. Submit for approval

### Scenario 4: Admin Processing Registration (1 min)
1. Login as municipal admin
2. See pending registrations
3. Review submitted shelter
4. Verify data, approve registration
5. Shelter appears on public map

### Scenario 5: Gap Analysis (1 min)
1. Login as state admin
2. Open coverage analysis
3. View map with population overlay
4. Identify underserved areas
5. Generate report
