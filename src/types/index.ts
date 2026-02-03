// User & Authentication Types
export type UserRole =
  | 'citizen'
  | 'operator'
  | 'municipal_admin'
  | 'state_admin'
  | 'federal_admin'
  | 'crisis_manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  municipality?: string;
  state?: string;
}

// Shelter Types
export type ShelterType =
  | 'bunker'
  | 'basement'
  | 'subway'
  | 'parking'
  | 'tunnel'
  | 'other';

export type ShelterStatus =
  | 'active'
  | 'limited'
  | 'inactive'
  | 'planned';

export type ConditionRating =
  | 'good'
  | 'fair'
  | 'poor'
  | 'unknown';

export type ProtectionLevel =
  | 'basic'
  | 'enhanced'
  | 'full';

export type OperatorType =
  | 'public'
  | 'private'
  | 'federal';

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  state: GermanState;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Accessibility {
  wheelchair: boolean;
  elevator: boolean;
  groundLevel: boolean;
}

export interface Equipment {
  ventilation: boolean;
  power: boolean;
  water: boolean;
  sanitation: boolean;
  communication: boolean;
}

export interface Condition {
  structural: ConditionRating;
  technical: ConditionRating;
  lastInspection: string;
  nextInspection: string;
}

export interface Operator {
  type: OperatorType;
  name: string;
  contact: string;
}

export interface Shelter {
  id: string;
  name: string;
  type: ShelterType;
  status: ShelterStatus;
  address: Address;
  coordinates: Coordinates;
  capacity: number;
  protectionLevel: ProtectionLevel;
  accessibility: Accessibility;
  equipment: Equipment;
  condition: Condition;
  operator: Operator;
  documents?: string[];
  photos?: string[];
  createdAt: string;
  updatedAt: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  assignedOperatorId?: string;
}

// German States
export type GermanState =
  | 'Baden-Württemberg'
  | 'Bayern'
  | 'Berlin'
  | 'Brandenburg'
  | 'Bremen'
  | 'Hamburg'
  | 'Hessen'
  | 'Mecklenburg-Vorpommern'
  | 'Niedersachsen'
  | 'Nordrhein-Westfalen'
  | 'Rheinland-Pfalz'
  | 'Saarland'
  | 'Sachsen'
  | 'Sachsen-Anhalt'
  | 'Schleswig-Holstein'
  | 'Thüringen';

// Notification Types
export type NotificationType =
  | 'info'
  | 'warning'
  | 'alert'
  | 'success'
  | 'approval_request'
  | 'status_change';

export interface Notification {
  id: string;
  visibleToRoles: UserRole[];
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
  shelterId?: string;
}

// Master Data Types
export interface ShelterTypeInfo {
  type: ShelterType;
  labelDe: string;
  labelEn: string;
  icon: string;
  description: string;
}

export interface ShelterStatusInfo {
  status: ShelterStatus;
  labelDe: string;
  labelEn: string;
  color: string;
  description: string;
}

export interface GermanStateInfo {
  code: string;
  name: GermanState;
  capital: string;
}

export interface EquipmentItem {
  key: keyof Equipment;
  labelDe: string;
  labelEn: string;
  icon: string;
  required: boolean;
}

// Dashboard & Analytics Types
export interface DashboardStats {
  totalShelters: number;
  activeShelters: number;
  limitedShelters: number;
  inactiveShelters: number;
  plannedShelters: number;
  totalCapacity: number;
  pendingApprovals: number;
  inspectionsDue: number;
}

export interface RegionalStats {
  state: GermanState;
  shelterCount: number;
  totalCapacity: number;
  population: number;
  coveragePercentage: number;
}

// Crisis Mode Types
export interface CrisisState {
  isActive: boolean;
  activatedAt?: string;
  activatedBy?: string;
  affectedRegions: GermanState[];
  broadcasts: CrisisBroadcast[];
}

export interface CrisisBroadcast {
  id: string;
  message: string;
  sentAt: string;
  sentBy: string;
  regions: GermanState[];
}

// Search & Filter Types
export interface ShelterFilters {
  type?: ShelterType[];
  status?: ShelterStatus[];
  minCapacity?: number;
  state?: GermanState[];
  accessibility?: {
    wheelchair?: boolean;
    elevator?: boolean;
    groundLevel?: boolean;
  };
  equipment?: Partial<Equipment>;
}

export interface SearchResult {
  shelter: Shelter;
  distance?: number; // in meters
  walkingTime?: number; // in minutes
}

// Form Types
export interface ShelterFormData {
  // Step 1: Basic Info
  name: string;
  type: ShelterType;
  address: Address;
  coordinates?: Coordinates;

  // Step 2: Capacity & Accessibility
  capacity: number;
  protectionLevel: ProtectionLevel;
  accessibility: Accessibility;

  // Step 3: Equipment
  equipment: Equipment;

  // Step 4: Condition
  condition: Condition;

  // Step 5: Photos & Documents
  photos?: File[];
  documents?: File[];

  // Step 6: Operator
  operator: Operator;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
