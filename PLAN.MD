# PLAN.MD - Schutzraum-Portal Development Plan

## Executive Summary

This document outlines the complete module structure, function inventory, and phased development approach for building the "Schutzraum-Portal Deutschland" prototype. The goal is a fully functional demo with mocked backend calls that gives stakeholders a realistic feel of the production system.

---

## Module Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SCHUTZRAUM-PORTAL DEUTSCHLAND                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   AUTH &    │  │    MAP &    │  │  SHELTER    │  │   CRISIS    │       │
│  │   ROLES     │  │   SEARCH    │  │  REGISTRY   │  │    MODE     │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  CITIZEN    │  │  OPERATOR   │  │   ADMIN     │  │  ANALYTICS  │       │
│  │   PORTAL    │  │   PORTAL    │  │   PORTAL    │  │  & REPORTS  │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SHARED COMPONENTS LAYER                           │   │
│  │  Navigation | Forms | Tables | Cards | Map | Modals | Notifications │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      MOCK SERVICE LAYER                              │   │
│  │   API Mocks | Geo Services | Data Store | Delay Simulation | State  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Complete Module & Function Inventory

### MODULE 1: Authentication & Role Management

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| AUTH-001 | Demo Login Screen | Role selection for demo (no real auth) | P0 |
| AUTH-002 | Role Switching | Switch between demo accounts | P1 |
| AUTH-003 | Session Management | Maintain demo session state | P0 |
| AUTH-004 | Permission Guards | Route protection by role | P0 |
| AUTH-005 | Logout Function | Clear session, return to login | P1 |
| AUTH-006 | Public Access | Citizen view without login | P0 |

#### Demo Accounts
```
- buerger@demo.de          → Citizen View (public, no login needed)
- betreiber@demo.de        → Operator View
- kommune@demo.de          → Municipal Admin View
- land@demo.de             → State Admin View
- bbk@demo.de              → Federal Admin View
- krisenstab@demo.de       → Crisis Manager View
```

---

### MODULE 2: Map & Search Module

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| MAP-001 | Interactive Map | Leaflet map with shelter markers | P0 |
| MAP-002 | Geolocation | "My Location" button with position | P0 |
| MAP-003 | Cluster Markers | Group nearby shelters at zoom levels | P1 |
| MAP-004 | Marker Popups | Quick info popup on marker click | P0 |
| MAP-005 | Search by Address | Geocoding search box | P0 |
| MAP-006 | Search by Name | Search shelter by name | P1 |
| MAP-007 | Filter by Type | Filter: bunker, basement, subway, etc. | P1 |
| MAP-008 | Filter by Status | Filter: active, limited, inactive | P1 |
| MAP-009 | Filter by Capacity | Filter by minimum capacity | P2 |
| MAP-010 | Nearest Shelter | Calculate and highlight nearest | P0 |
| MAP-011 | Route Display | Show walking route to shelter | P1 |
| MAP-012 | Map Layers | Toggle population density overlay | P2 |
| MAP-013 | Offline Map Cache | Store map tiles for offline (simulated) | P2 |

---

### MODULE 3: Shelter Registry Module

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| REG-001 | Shelter List View | Sortable/filterable shelter table | P0 |
| REG-002 | Shelter Detail View | Full shelter information display | P0 |
| REG-003 | Shelter Registration | Multi-step registration form | P0 |
| REG-004 | Shelter Edit | Update shelter information | P1 |
| REG-005 | Status Management | Change shelter status | P0 |
| REG-006 | Photo Upload | Upload condition photos (mocked) | P1 |
| REG-007 | Document Upload | Upload documents (mocked) | P2 |
| REG-008 | Equipment Checklist | Checkbox list for equipment | P0 |
| REG-009 | Condition Assessment | Rate structural/technical condition | P1 |
| REG-010 | Inspection Logging | Record inspection visits | P1 |
| REG-011 | Approval Workflow | Submit → Review → Approve/Reject | P0 |
| REG-012 | Bulk Import | Import shelters from CSV (mocked) | P2 |
| REG-013 | Bulk Export | Export shelter data | P2 |
| REG-014 | Audit History | View change history | P1 |
| REG-015 | Duplicate Detection | Warn on potential duplicates | P2 |

#### Shelter Types
```
├── Bunker (Bunker)
│   └── Former public shelters, military bunkers
├── Keller (Basement)
│   └── Building basements with protection value
├── U-Bahn (Subway)
│   └── Underground stations
├── Tiefgarage (Parking Garage)
│   └── Underground parking structures
├── Tunnel (Tunnel)
│   └── Road/rail tunnels
└── Sonstige (Other)
    └── Any other protected space
```

#### Shelter Statuses
```
├── Aktiv (Active)
│   └── Ready for immediate use
├── Eingeschränkt (Limited)
│   └── Usable with limitations
├── Inaktiv (Inactive)
│   └── Not currently usable
└── Geplant (Planned)
    └── Under construction/renovation
```

---

### MODULE 4: Citizen Portal

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| CIT-001 | Public Landing Page | Hero with search and quick actions | P0 |
| CIT-002 | Map View | Full-screen map for shelter search | P0 |
| CIT-003 | Shelter Finder | "Find nearest shelter" prominent button | P0 |
| CIT-004 | Shelter Details | Public shelter information view | P0 |
| CIT-005 | Directions | Walking directions to shelter | P1 |
| CIT-006 | Information Hub | Civil protection info pages | P1 |
| CIT-007 | Preparation Checklist | What to bring/prepare | P1 |
| CIT-008 | FAQ Section | Common questions | P1 |
| CIT-009 | Notification Settings | Alert preferences (mocked) | P2 |
| CIT-010 | Offline Mode | Work without internet (simulated) | P2 |
| CIT-011 | Language Switcher | DE, EN, UK, AR, TR | P2 |
| CIT-012 | Accessibility Mode | High contrast, large text | P1 |

---

### MODULE 5: Operator Portal

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| OPR-001 | Operator Dashboard | Overview of own shelters | P0 |
| OPR-002 | My Shelters List | Shelters managed by operator | P0 |
| OPR-003 | Add New Shelter | Registration wizard | P0 |
| OPR-004 | Edit Shelter | Update shelter data | P0 |
| OPR-005 | Status Update | Change operational status | P0 |
| OPR-006 | Inspection Entry | Log inspection results | P1 |
| OPR-007 | Photo Management | Upload/manage photos | P1 |
| OPR-008 | Maintenance Schedule | View upcoming inspections | P1 |
| OPR-009 | Compliance Status | Show what's missing/overdue | P1 |
| OPR-010 | Contact Management | Emergency contact info | P1 |
| OPR-011 | Funding Application | Start grant application | P2 |
| OPR-012 | Messages | Communication with authorities | P2 |

---

### MODULE 6: Admin Portal (Municipal/State/Federal)

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| ADM-001 | Admin Dashboard | KPIs, pending tasks, alerts | P0 |
| ADM-002 | Pending Approvals | Queue of registrations to review | P0 |
| ADM-003 | Approval Interface | Review and approve/reject | P0 |
| ADM-004 | Shelter Management | Full CRUD for all shelters | P0 |
| ADM-005 | User Management | Manage operators | P1 |
| ADM-006 | Reports Dashboard | Statistics and charts | P1 |
| ADM-007 | Coverage Analysis | Map with population overlay | P1 |
| ADM-008 | Gap Analysis | Identify underserved areas | P1 |
| ADM-009 | Inspection Scheduling | Assign inspections | P2 |
| ADM-010 | Funding Management | Review funding applications | P2 |
| ADM-011 | Bulk Operations | Mass updates | P2 |
| ADM-012 | Audit Logs | View system activity | P2 |
| ADM-013 | Announcements | Post public announcements | P2 |
| ADM-014 | Data Quality | Find incomplete records | P1 |
| ADM-015 | Export Functions | Generate reports/exports | P2 |

#### Role-Based Access
```
Municipal Admin (kommune@demo.de):
  - View/manage shelters in their municipality
  - Approve registrations in their area
  - Basic reports for their region

State Admin (land@demo.de):
  - View/manage shelters in their state
  - Override municipal decisions
  - State-level reports and analysis
  - Funding application management

Federal Admin (bbk@demo.de):
  - Full access to all shelters nationwide
  - System-wide reports and analytics
  - User management
  - Crisis mode controls
```

---

### MODULE 7: Crisis Mode Module

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| CRI-001 | Crisis Activation | Toggle crisis mode for regions | P0 |
| CRI-002 | Crisis Dashboard | Real-time status overview | P0 |
| CRI-003 | Citizen Crisis View | Simplified high-contrast UI | P0 |
| CRI-004 | Capacity Updates | Real-time capacity tracking | P1 |
| CRI-005 | Emergency Broadcast | Send alert to all users | P1 |
| CRI-006 | Shelter Status Live | Quick status updates | P1 |
| CRI-007 | Distribution Helper | Suggest less crowded shelters | P2 |
| CRI-008 | Crisis Log | Log all actions during crisis | P2 |
| CRI-009 | Crisis Deactivation | End crisis mode | P1 |
| CRI-010 | Post-Crisis Report | Summary of crisis response | P2 |

#### Crisis Mode UI Changes
```
Normal Mode:
  - Full feature set
  - Standard colors and layout
  - All information displayed

Crisis Mode:
  - Simplified interface
  - High contrast (dark blue/orange)
  - Large buttons and text
  - "Nearest Shelter" prominently displayed
  - Only essential information
  - Offline-first approach
```

---

### MODULE 8: Analytics & Reports Module

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| ANA-001 | Overview Dashboard | Key metrics at a glance | P1 |
| ANA-002 | Shelter Statistics | Total, by type, by status | P1 |
| ANA-003 | Coverage Map | Population vs. shelter capacity | P1 |
| ANA-004 | Trend Charts | Registrations over time | P2 |
| ANA-005 | Compliance Report | Inspection compliance rates | P2 |
| ANA-006 | Regional Comparison | Compare states/municipalities | P2 |
| ANA-007 | Gap Analysis Map | Visualize underserved areas | P1 |
| ANA-008 | Export to PDF | Generate PDF reports | P2 |
| ANA-009 | Export to Excel | Generate Excel reports | P2 |
| ANA-010 | Custom Date Range | Filter by time period | P2 |

---

### MODULE 9: Notification System

#### Functions
| Function ID | Name | Description | Priority |
|-------------|------|-------------|----------|
| NOT-001 | Notification Center | All notifications view | P0 |
| NOT-002 | Notification Badge | Unread count in header | P0 |
| NOT-003 | Mark as Read | Mark notifications read | P0 |
| NOT-004 | Notification Types | Info, Warning, Alert, Success | P1 |
| NOT-005 | Toast Notifications | In-app feedback toasts | P0 |
| NOT-006 | Push Simulation | Simulated push notifications | P2 |
| NOT-007 | Email Preview | Show mock email content | P2 |

---

### MODULE 10: Shared Components

#### Components
| Component ID | Name | Description | Priority |
|--------------|------|-------------|----------|
| COM-001 | Header | Logo, search, user menu, crisis toggle | P0 |
| COM-002 | Sidebar | Role-based navigation | P0 |
| COM-003 | Footer | Legal links, help, contact | P1 |
| COM-004 | Shelter Card | Compact shelter info display | P0 |
| COM-005 | Shelter Detail Card | Expanded shelter info | P0 |
| COM-006 | Map Marker | Custom marker with status color | P0 |
| COM-007 | Status Badge | Colored status indicator | P0 |
| COM-008 | Data Table | Sortable, filterable table | P0 |
| COM-009 | Form Wizard | Multi-step form component | P0 |
| COM-010 | Search Input | With autocomplete | P1 |
| COM-011 | Filter Panel | Collapsible filter options | P1 |
| COM-012 | Modal Dialog | Confirmation dialogs | P0 |
| COM-013 | Loading Spinner | Consistent loading indicator | P0 |
| COM-014 | Empty State | "No results" displays | P1 |
| COM-015 | Error State | Error displays | P1 |
| COM-016 | Chart Components | Bar, line, pie charts | P1 |
| COM-017 | Timeline | Inspection/change history | P1 |
| COM-018 | Photo Gallery | Image display/upload | P2 |

---

## Development Phases

### PHASE 0: Project Setup (1 day)
**Goal:** Development environment ready

#### Tasks
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Install react-leaflet and map dependencies
- [x] Install Zustand for state management
- [x] Install React Router v6
- [x] Set up folder structure per CLAUDE.MD
- [x] Configure ESLint and Prettier
- [x] Create base TypeScript types

#### Deliverables
- Clean project scaffold
- All dependencies installed
- Ready to start development

---

### PHASE 1: Mock Data & Service Layer (1-2 days)
**Goal:** Complete mock backend ready

#### Tasks
- [x] Create `/src/services/mockApi.ts` with delay simulation
- [x] Create `/src/data/users.ts` with 6 demo accounts
- [x] Create `/src/data/shelters.ts` with 50+ shelters
- [x] Create `/src/data/notifications.ts` with sample notifications
- [x] Create `/src/data/masterData.ts` (types, statuses, states)
- [ ] Create geolocation mock utilities
- [ ] Create shelter CRUD operations
- [ ] Create search/filter utilities
- [ ] Create Zustand stores (auth, shelters, ui)

#### Mock Data Specifications
```
Shelters: 53 entries
- Distributed across 10 German cities
- Mix of types (bunker, basement, subway, parking, tunnel)
- Mix of statuses (active, limited, inactive, planned)
- Various capacities (300 to 6000)
- Different equipment configurations
- Some with pending approvals

Users: 6 demo accounts
- One per role type

Notifications: 15 entries
- Mix of types (approval requests, alerts, info, warnings)
```

#### Deliverables
- Complete mock data set
- Working mock API with realistic delays
- State management configured

---

### PHASE 2: Authentication & Layout Shell (2 days)
**Goal:** App shell with routing and navigation

#### Tasks
- [ ] Create `/src/pages/auth/LoginPage.tsx`
- [ ] Implement demo account selection UI
- [ ] Create auth store with Zustand
- [ ] Create `/src/components/layout/MainLayout.tsx`
- [ ] Create Header component with search and user menu
- [ ] Create Sidebar with role-based navigation
- [ ] Create Footer component
- [ ] Configure React Router with all routes
- [ ] Implement route guards for role protection
- [ ] Create placeholder pages for all sections
- [ ] Implement public route (citizen view without login)

#### Navigation Structure by Role
```
Citizen (Public):
- Karte (Map)
- Informationen (Info)
- Vorbereitung (Preparation)
- FAQ

Operator:
- Übersicht (Dashboard)
- Meine Schutzräume (My Shelters)
- Neuer Schutzraum (Add New)
- Wartung (Maintenance)
- Nachrichten (Messages)

Municipal Admin:
- Dashboard
- Genehmigungen (Approvals)
- Schutzräume (Shelters)
- Berichte (Reports)
- Einstellungen (Settings)

State Admin:
- Dashboard
- Genehmigungen (Approvals)
- Schutzräume (Shelters)
- Fördermittel (Funding)
- Analysen (Analytics)
- Berichte (Reports)

Federal Admin:
- Dashboard
- Alle Schutzräume (All Shelters)
- Nutzerverwaltung (User Management)
- Analysen (Analytics)
- Krisenmodus (Crisis Mode)
- Systemeinstellungen (System Settings)

Crisis Manager:
- Krisenstab Dashboard
- Aktivierung (Activation)
- Live-Status
- Broadcasts
- Protokoll (Log)
```

#### Deliverables
- Working login with role selection
- Complete navigation shell
- All routes configured
- Role-based menu rendering

---

### PHASE 3: Map & Search Core (2-3 days)
**Goal:** Interactive map with shelter display

#### Tasks
- [ ] Create `/src/components/map/ShelterMap.tsx`
- [ ] Configure Leaflet with OpenStreetMap tiles
- [ ] Create custom shelter markers with status colors
- [ ] Implement marker clustering for zoom levels
- [ ] Create marker popup component
- [ ] Implement "My Location" geolocation
- [ ] Create address search with geocoding (mocked)
- [ ] Implement "Find Nearest Shelter" function
- [ ] Create filter panel (type, status, capacity)
- [ ] Create search box component
- [ ] Implement route display to shelter (mocked)
- [ ] Add map controls (zoom, layer toggle)

#### Map Marker Colors
```
Active (Aktiv): Green (#22C55E)
Limited (Eingeschränkt): Yellow (#EAB308)
Inactive (Inaktiv): Red (#EF4444)
Planned (Geplant): Blue (#3B82F6)
```

#### Deliverables
- Fully interactive map
- Shelter markers with clustering
- Search and filter functionality
- Nearest shelter calculation
- Responsive map controls

---

### Remaining Phases (4-10)
See original PLAN.MD content for phases 4-10 covering:
- Phase 4: Shelter Detail & Cards
- Phase 5: Citizen Portal
- Phase 6: Operator Portal
- Phase 7: Admin Portal
- Phase 8: Crisis Mode
- Phase 9: Notifications & Polish
- Phase 10: Demo Preparation

---

## Timeline Summary

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 0: Setup | 1 day | Day 1 |
| Phase 1: Mock Data | 1-2 days | Day 3 |
| Phase 2: Auth & Layout | 2 days | Day 5 |
| Phase 3: Map & Search | 2-3 days | Day 8 |
| Phase 4: Shelter Details | 2 days | Day 10 |
| Phase 5: Citizen Portal | 2 days | Day 12 |
| Phase 6: Operator Portal | 2-3 days | Day 15 |
| Phase 7: Admin Portal | 3 days | Day 18 |
| Phase 8: Crisis Mode | 2 days | Day 20 |
| Phase 9: Notifications & Polish | 2 days | Day 22 |
| Phase 10: Demo Prep | 1-2 days | Day 24 |

**Total Estimated Duration: 20-24 working days**

---

## Priority Matrix

### P0 - Must Have (MVP Demo)
- Authentication & role switching
- Interactive map with markers
- Shelter search and display
- Shelter detail view
- Citizen public access
- Operator shelter registration
- Admin approval workflow
- Crisis mode activation
- Basic notifications

### P1 - Should Have (Enhanced Demo)
- Marker clustering
- Route display
- Filter and search
- Equipment checklists
- Condition assessment
- Inspection logging
- Reports dashboard
- Coverage analysis
- Accessibility features

### P2 - Nice to Have (Complete Demo)
- Bulk import/export
- Photo management
- Funding applications
- Offline mode (simulated)
- Multi-language
- Custom date ranges
- PDF/Excel export
- Audit logs

### P3 - Future (Post-Demo)
- Real integrations
- Push notifications
- AI-powered analytics
- Crowd management

---

## Success Criteria for Demo

1. ✅ Public can find nearest shelter without login
2. ✅ Interactive map works smoothly with 50+ markers
3. ✅ All 6 user roles can login and see appropriate views
4. ✅ Operator can complete full registration wizard
5. ✅ Admin can approve registration and shelter appears on map
6. ✅ Crisis mode transforms citizen interface
7. ✅ Crisis manager can broadcast alerts
8. ✅ Coverage analysis map shows population overlay
9. ✅ Responsive on desktop, tablet, and mobile
10. ✅ Professional, trustworthy government appearance
