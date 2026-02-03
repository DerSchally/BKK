import { Marker } from 'react-leaflet';
import L from 'leaflet';
import type { Shelter, ShelterStatus } from '@/types';
import { ShelterPopup } from './ShelterPopup';

// Status colors matching the design spec
const statusColors: Record<ShelterStatus, string> = {
  active: '#22C55E',    // green-500
  limited: '#EAB308',   // yellow-500
  inactive: '#EF4444',  // red-500
  planned: '#3B82F6',   // blue-500
};

// Create custom marker icon with status color
function createMarkerIcon(status: ShelterStatus, isSelected: boolean = false) {
  const color = statusColors[status];
  const size = isSelected ? 40 : 32;
  const borderWidth = isSelected ? 4 : 3;

  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="${borderWidth}" filter="url(#shadow)"/>
      <circle cx="16" cy="16" r="5" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-shelter-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

interface ShelterMarkerProps {
  shelter: Shelter;
  isSelected?: boolean;
  onClick?: (shelter: Shelter) => void;
}

export function ShelterMarker({ shelter, isSelected = false, onClick }: ShelterMarkerProps) {
  const icon = createMarkerIcon(shelter.status, isSelected);

  return (
    <Marker
      position={[shelter.coordinates.lat, shelter.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick?.(shelter),
      }}
    >
      <ShelterPopup shelter={shelter} />
    </Marker>
  );
}
