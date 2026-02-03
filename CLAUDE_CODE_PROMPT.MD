# CLAUDE_CODE_PROMPT.md

## Initial Prompt for Claude Code

Copy and paste the following prompt to start the Claude Code session:

---

```
I need you to build a web-based prototype portal called "Schutzraum-Portal Deutschland" - a unified shelter localization, management, and citizen information platform for Germany's civil protection system. This is a DEMO prototype with all backend calls mocked - no real business logic needed.

## Project Context

Read the CLAUDE.MD and PLAN.MD files in this repository for full context. Key points:

**What we're building:**
- A map-based shelter finder for citizens (public access)
- Shelter management portal for operators
- Admin dashboards for municipal/state/federal authorities
- Crisis mode with simplified emergency interface
- 6 user roles: Citizen, Operator, Municipal Admin, State Admin, Federal Admin, Crisis Manager
- All API calls are mocked with realistic delays and mock data

**Tech Stack:**
- React 18 + TypeScript
- Vite for build
- Tailwind CSS for styling
- shadcn/ui components
- React Router v6 for navigation
- Zustand for state management
- react-leaflet with OpenStreetMap for maps
- Mock data in JSON files

## Phase 1 Tasks - Start Here

Let's begin with project setup and core infrastructure:

1. **Initialize the project:**
   - Create a new Vite + React + TypeScript project
   - Configure Tailwind CSS
   - Install and configure shadcn/ui
   - Install react-leaflet and leaflet dependencies
   - Install zustand
   - Set up the folder structure as defined in CLAUDE.MD

2. **Create the mock service layer:**
   - Create `/src/services/mockApi.ts` with simulated API delay (300-800ms)
   - Create `/src/data/` folder with mock JSON files for:
     - users.json (6 demo accounts)
     - shelters.json (50+ shelters across Germany)
     - notifications.json
     - masterData.json (types, statuses, states, equipment)

3. **Build the authentication flow:**
   - Create `/src/pages/auth/LoginPage.tsx`
   - Demo account selection with role cards
   - Public access option for citizen view
   - Store selected user in Zustand store
   - Create auth context for role checking

4. **Build the main layout:**
   - Create `/src/components/layout/MainLayout.tsx`
   - Header with logo, search, user menu, crisis mode indicator
   - Sidebar with role-based navigation
   - Main content area
   - Footer with legal links

5. **Set up routing:**
   - Configure React Router with all routes
   - Create route guards for role-based access
   - Allow public access to citizen routes
   - Create placeholder pages for all sections

## Design Guidelines

- **Primary Color:** Deep Blue (#1E3A5F) - trust, security
- **Accent Color:** Safety Orange (#FF6B00) - attention, emergency
- **Success:** Green (#2D5016)
- **Background:** Light gray (#F5F5F5) to white
- **Typography:** Clean sans-serif (Inter or system-ui)
- **Components:** Use shadcn/ui for all UI elements
- **Language:** All UI text in German, code in English
- **Responsive:** Mobile-first for citizen, desktop-optimized for admin

## Demo Accounts to Create

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

## Navigation Structure by Role

**Citizen (Public - no login required):**
- Karte (Map)
- Informationen (Info)
- Vorbereitung (Preparation)
- FAQ

**Operator:**
- Übersicht (Dashboard)
- Meine Schutzräume (My Shelters)
- Neuer Schutzraum (Add New)
- Wartung (Maintenance)
- Nachrichten (Messages)

**Municipal Admin:**
- Dashboard
- Genehmigungen (Approvals)
- Schutzräume (Shelters)
- Berichte (Reports)
- Einstellungen (Settings)

**State Admin:**
- Dashboard
- Genehmigungen (Approvals)
- Schutzräume (Shelters)
- Fördermittel (Funding)
- Analysen (Analytics)
- Berichte (Reports)

**Federal Admin:**
- Dashboard
- Alle Schutzräume (All Shelters)
- Nutzerverwaltung (User Management)
- Analysen (Analytics)
- Krisenmodus (Crisis Mode)
- Systemeinstellungen (System Settings)

**Crisis Manager:**
- Krisenstab Dashboard
- Aktivierung (Activation)
- Live-Status
- Broadcasts
- Protokoll (Log)

## Shelter Mock Data Requirements

Create 50+ shelters with this structure:
```typescript
interface Shelter {
  id: string;
  name: string;
  type: "bunker" | "basement" | "subway" | "parking" | "tunnel" | "other";
  status: "active" | "limited" | "inactive" | "planned";
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity: number;
  protectionLevel: "basic" | "enhanced" | "full";
  accessibility: {
    wheelchair: boolean;
    elevator: boolean;
    groundLevel: boolean;
  };
  equipment: {
    ventilation: boolean;
    power: boolean;
    water: boolean;
    sanitation: boolean;
    communication: boolean;
  };
  condition: {
    structural: "good" | "fair" | "poor" | "unknown";
    technical: "good" | "fair" | "poor" | "unknown";
    lastInspection: string;
    nextInspection: string;
  };
  operator: {
    type: "public" | "private" | "federal";
    name: string;
    contact: string;
  };
}
```

Distribute shelters across: Berlin, Munich, Hamburg, Frankfurt, Cologne, Stuttgart, Düsseldorf, Leipzig, Dresden, Hannover

## Map Marker Colors
```
Active (Aktiv): Green (#22C55E)
Limited (Eingeschränkt): Yellow (#EAB308)
Inactive (Inaktiv): Red (#EF4444)
Planned (Geplant): Blue (#3B82F6)
```

## Start Building

Please start with Phase 1. After each major component, commit and show me the progress. Ask clarifying questions if anything is unclear.

Focus first on:
1. Project setup with all dependencies
2. Mock data files with 50+ shelters
3. Login page with demo account selection (+ public access)
4. Main layout shell with role-based navigation
5. Basic map component showing shelter markers

Let's go!
```
