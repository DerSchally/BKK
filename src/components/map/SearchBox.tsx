import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Shelter } from '@/types';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  shelters: Shelter[];
  onSelectShelter: (shelter: Shelter) => void;
  onLocationSearch?: (query: string) => void;
}

export function SearchBox({ shelters, onSelectShelter, onLocationSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter shelters based on query
  const filteredShelters = query.length >= 2
    ? shelters.filter(
        (shelter) =>
          shelter.name.toLowerCase().includes(query.toLowerCase()) ||
          shelter.address.city.toLowerCase().includes(query.toLowerCase()) ||
          shelter.address.street.toLowerCase().includes(query.toLowerCase()) ||
          shelter.address.postalCode.includes(query)
      ).slice(0, 5)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (shelter: Shelter) => {
    setQuery(shelter.name);
    setIsOpen(false);
    onSelectShelter(shelter);
  };

  const handleLocateMe = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation wird von Ihrem Browser nicht unterstützt.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        // The parent component handles the location
        if (onLocationSearch) {
          onLocationSearch(`${position.coords.latitude},${position.coords.longitude}`);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error('Geolocation error:', error);
        alert('Standort konnte nicht ermittelt werden. Bitte prüfen Sie Ihre Einstellungen.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Schutzraum oder Ort suchen..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(e.target.value.length >= 2);
            }}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            className="pl-9 pr-9 bg-white"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Locate Me Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="shrink-0 bg-white"
          title="Mein Standort"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredShelters.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          {filteredShelters.map((shelter) => (
            <button
              key={shelter.id}
              onClick={() => handleSelect(shelter)}
              className={cn(
                'w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors',
                'flex items-start gap-3 border-b last:border-b-0'
              )}
            >
              <div
                className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                style={{
                  backgroundColor:
                    shelter.status === 'active'
                      ? '#22C55E'
                      : shelter.status === 'limited'
                        ? '#EAB308'
                        : shelter.status === 'inactive'
                          ? '#EF4444'
                          : '#3B82F6',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{shelter.name}</p>
                <p className="text-sm text-slate-500 truncate">
                  {shelter.address.street}, {shelter.address.postalCode} {shelter.address.city}
                </p>
              </div>
              <span className="text-sm text-slate-400 shrink-0">
                {shelter.capacity.toLocaleString()} Plätze
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && filteredShelters.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border p-4 z-50">
          <p className="text-sm text-slate-500 text-center">
            Keine Schutzräume gefunden für "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
