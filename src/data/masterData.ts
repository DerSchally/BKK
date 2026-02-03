import type {
  ShelterTypeInfo,
  ShelterStatusInfo,
  GermanStateInfo,
  EquipmentItem,
} from '@/types';

export const shelterTypes: ShelterTypeInfo[] = [
  {
    type: 'bunker',
    labelDe: 'Bunker',
    labelEn: 'Bunker',
    icon: '🏰',
    description: 'Ehemaliger öffentlicher Schutzraum oder militärischer Bunker',
  },
  {
    type: 'basement',
    labelDe: 'Keller',
    labelEn: 'Basement',
    icon: '🏠',
    description: 'Gebäudekeller mit Schutzwert',
  },
  {
    type: 'subway',
    labelDe: 'U-Bahn',
    labelEn: 'Subway',
    icon: '🚇',
    description: 'U-Bahn-Station',
  },
  {
    type: 'parking',
    labelDe: 'Tiefgarage',
    labelEn: 'Parking Garage',
    icon: '🅿️',
    description: 'Unterirdische Parkstruktur',
  },
  {
    type: 'tunnel',
    labelDe: 'Tunnel',
    labelEn: 'Tunnel',
    icon: '🚇',
    description: 'Straßen- oder Bahntunnel',
  },
  {
    type: 'other',
    labelDe: 'Sonstige',
    labelEn: 'Other',
    icon: '🏢',
    description: 'Anderer geschützter Raum',
  },
];

export const shelterStatuses: ShelterStatusInfo[] = [
  {
    status: 'active',
    labelDe: 'Aktiv',
    labelEn: 'Active',
    color: '#22C55E',
    description: 'Bereit zur sofortigen Nutzung',
  },
  {
    status: 'limited',
    labelDe: 'Eingeschränkt',
    labelEn: 'Limited',
    color: '#EAB308',
    description: 'Nutzbar mit Einschränkungen',
  },
  {
    status: 'inactive',
    labelDe: 'Inaktiv',
    labelEn: 'Inactive',
    color: '#EF4444',
    description: 'Derzeit nicht nutzbar',
  },
  {
    status: 'planned',
    labelDe: 'Geplant',
    labelEn: 'Planned',
    color: '#3B82F6',
    description: 'Im Bau oder in Renovierung',
  },
];

export const germanStates: GermanStateInfo[] = [
  { code: 'BW', name: 'Baden-Württemberg', capital: 'Stuttgart' },
  { code: 'BY', name: 'Bayern', capital: 'München' },
  { code: 'BE', name: 'Berlin', capital: 'Berlin' },
  { code: 'BB', name: 'Brandenburg', capital: 'Potsdam' },
  { code: 'HB', name: 'Bremen', capital: 'Bremen' },
  { code: 'HH', name: 'Hamburg', capital: 'Hamburg' },
  { code: 'HE', name: 'Hessen', capital: 'Wiesbaden' },
  { code: 'MV', name: 'Mecklenburg-Vorpommern', capital: 'Schwerin' },
  { code: 'NI', name: 'Niedersachsen', capital: 'Hannover' },
  { code: 'NW', name: 'Nordrhein-Westfalen', capital: 'Düsseldorf' },
  { code: 'RP', name: 'Rheinland-Pfalz', capital: 'Mainz' },
  { code: 'SL', name: 'Saarland', capital: 'Saarbrücken' },
  { code: 'SN', name: 'Sachsen', capital: 'Dresden' },
  { code: 'ST', name: 'Sachsen-Anhalt', capital: 'Magdeburg' },
  { code: 'SH', name: 'Schleswig-Holstein', capital: 'Kiel' },
  { code: 'TH', name: 'Thüringen', capital: 'Erfurt' },
];

export const equipmentItems: EquipmentItem[] = [
  {
    key: 'ventilation',
    labelDe: 'Belüftung',
    labelEn: 'Ventilation',
    icon: 'Wind',
    required: true,
  },
  {
    key: 'power',
    labelDe: 'Stromversorgung',
    labelEn: 'Power Supply',
    icon: 'Zap',
    required: true,
  },
  {
    key: 'water',
    labelDe: 'Wasserversorgung',
    labelEn: 'Water Supply',
    icon: 'Droplets',
    required: true,
  },
  {
    key: 'sanitation',
    labelDe: 'Sanitäranlagen',
    labelEn: 'Sanitation',
    icon: 'Bath',
    required: true,
  },
  {
    key: 'communication',
    labelDe: 'Kommunikation',
    labelEn: 'Communication',
    icon: 'Radio',
    required: false,
  },
];

export const protectionLevels = [
  {
    level: 'basic',
    labelDe: 'Basis',
    labelEn: 'Basic',
    description: 'Grundlegender Schutz vor Witterung und leichten Trümmern',
  },
  {
    level: 'enhanced',
    labelDe: 'Erweitert',
    labelEn: 'Enhanced',
    description: 'Verstärkter Schutz mit zusätzlicher Verstärkung',
  },
  {
    level: 'full',
    labelDe: 'Vollständig',
    labelEn: 'Full',
    description: 'Vollständiger Schutz nach aktuellem Standard',
  },
];

export const conditionRatings = [
  { rating: 'good', labelDe: 'Gut', labelEn: 'Good', color: '#22C55E' },
  { rating: 'fair', labelDe: 'Befriedigend', labelEn: 'Fair', color: '#EAB308' },
  { rating: 'poor', labelDe: 'Mangelhaft', labelEn: 'Poor', color: '#EF4444' },
  { rating: 'unknown', labelDe: 'Unbekannt', labelEn: 'Unknown', color: '#6B7280' },
];

// Helper functions
export const getShelterTypeLabel = (type: string, lang: 'de' | 'en' = 'de'): string => {
  const info = shelterTypes.find((t) => t.type === type);
  return lang === 'de' ? info?.labelDe || type : info?.labelEn || type;
};

export const getShelterStatusLabel = (status: string, lang: 'de' | 'en' = 'de'): string => {
  const info = shelterStatuses.find((s) => s.status === status);
  return lang === 'de' ? info?.labelDe || status : info?.labelEn || status;
};

export const getShelterStatusColor = (status: string): string => {
  const info = shelterStatuses.find((s) => s.status === status);
  return info?.color || '#6B7280';
};

export const getStateName = (code: string): string => {
  const state = germanStates.find((s) => s.code === code);
  return state?.name || code;
};
