import { useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl, Circle } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { shelters } from '@/data';
import type { Shelter, ShelterFilters, Coordinates } from '@/types';
import { ShelterMarker } from './ShelterMarker';
import { FilterPanel } from './FilterPanel';
import { SearchBox } from './SearchBox';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

// Germany center coordinates
const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const GERMANY_ZOOM = 6;

// Component to handle map view changes
function MapController({
  selectedShelter,
}: {
  center?: Coordinates;
  zoom?: number;
  selectedShelter?: Shelter;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedShelter) {
      map.flyTo(
        [selectedShelter.coordinates.lat, selectedShelter.coordinates.lng],
        14,
        { duration: 1 }
      );
    }
  }, [selectedShelter, map]);

  return null;
}

// Apply filters to shelters
function filterShelters(shelterList: Shelter[], filters: ShelterFilters): Shelter[] {
  return shelterList.filter((shelter) => {
    // Type filter
    if (filters.type?.length && !filters.type.includes(shelter.type)) {
      return false;
    }

    // Status filter
    if (filters.status?.length && !filters.status.includes(shelter.status)) {
      return false;
    }

    // Minimum capacity filter
    if (filters.minCapacity && shelter.capacity < filters.minCapacity) {
      return false;
    }

    // Accessibility filter
    if (filters.accessibility?.wheelchair && !shelter.accessibility.wheelchair) {
      return false;
    }

    return true;
  });
}

export function ShelterMap() {
  const { crisisMode } = useUIStore();
  const [filters, setFilters] = useState<ShelterFilters>({});
  const [selectedShelter, setSelectedShelter] = useState<Shelter | undefined>();
  const [userLocation, setUserLocation] = useState<Coordinates | undefined>();
  const mapRef = useRef<LeafletMap | null>(null);

  // Filter shelters based on current filters
  const filteredShelters = useMemo(
    () => filterShelters(shelters, filters),
    [filters]
  );

  // Handle shelter selection from search or marker click
  const handleSelectShelter = (shelter: Shelter) => {
    setSelectedShelter(shelter);
  };

  // Handle location search (user's geolocation)
  const handleLocationSearch = (location: string) => {
    const [lat, lng] = location.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      setUserLocation({ lat, lng });
      // Fly to user location
      mapRef.current?.flyTo([lat, lng], 12, { duration: 1 });
    }
  };

  // Map tile URL - using OpenStreetMap
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <MapContainer
        center={GERMANY_CENTER}
        zoom={GERMANY_ZOOM}
        zoomControl={false}
        className={cn('h-full w-full', crisisMode && 'crisis-map')}
        ref={mapRef}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        <ZoomControl position="bottomright" />

        {/* Map Controller for programmatic navigation */}
        <MapController selectedShelter={selectedShelter} />

        {/* User Location Marker */}
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={500}
            pathOptions={{
              color: '#3B82F6',
              fillColor: '#3B82F6',
              fillOpacity: 0.2,
            }}
          />
        )}

        {/* Shelter Markers */}
        {filteredShelters.map((shelter) => (
          <ShelterMarker
            key={shelter.id}
            shelter={shelter}
            isSelected={selectedShelter?.id === shelter.id}
            onClick={handleSelectShelter}
          />
        ))}
      </MapContainer>

      {/* Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-4 pointer-events-none">
        {/* Search Box */}
        <div className="pointer-events-auto">
          <SearchBox
            shelters={shelters}
            onSelectShelter={handleSelectShelter}
            onLocationSearch={handleLocationSearch}
          />
        </div>

        {/* Filter Panel */}
        <div className="pointer-events-auto max-w-sm">
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            totalResults={filteredShelters.length}
          />
        </div>
      </div>

      {/* Crisis Mode Banner */}
      {crisisMode && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 animate-pulse">
            <span className="text-lg">⚠️</span>
            <span className="font-bold">KRISENMODUS AKTIV</span>
            <span className="text-lg">⚠️</span>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <p className="text-xs font-medium text-slate-600 mb-2">Legende</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span>Aktiv</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
            <span>Eingeschränkt</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span>Inaktiv</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
            <span>Geplant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
