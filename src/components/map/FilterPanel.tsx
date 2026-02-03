import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ShelterFilters, ShelterType, ShelterStatus } from '@/types';
import { shelterTypes, shelterStatuses } from '@/data/masterData';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: ShelterFilters;
  onFiltersChange: (filters: ShelterFilters) => void;
  totalResults: number;
}

export function FilterPanel({ filters, onFiltersChange, totalResults }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const activeFilterCount =
    (filters.type?.length || 0) +
    (filters.status?.length || 0) +
    (filters.minCapacity ? 1 : 0) +
    (filters.accessibility?.wheelchair ? 1 : 0);

  const toggleType = (type: ShelterType) => {
    const currentTypes = filters.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    onFiltersChange({ ...filters, type: newTypes.length > 0 ? newTypes : undefined });
  };

  const toggleStatus = (status: ShelterStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];
    onFiltersChange({ ...filters, status: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const setMinCapacity = (value: string) => {
    const numValue = parseInt(value, 10);
    onFiltersChange({
      ...filters,
      minCapacity: isNaN(numValue) || numValue <= 0 ? undefined : numValue,
    });
  };

  const toggleWheelchair = () => {
    const current = filters.accessibility?.wheelchair;
    onFiltersChange({
      ...filters,
      accessibility: current ? undefined : { wheelchair: true },
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-900">Filter</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{totalResults} Ergebnisse</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Type Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Typ</Label>
            <div className="flex flex-wrap gap-2">
              {shelterTypes.map((type) => (
                <Button
                  key={type.type}
                  variant={filters.type?.includes(type.type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleType(type.type)}
                  className="text-xs"
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.labelDe}
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <div className="flex flex-wrap gap-2">
              {shelterStatuses.map((status) => (
                <Button
                  key={status.status}
                  variant={filters.status?.includes(status.status) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleStatus(status.status)}
                  className={cn(
                    'text-xs',
                    filters.status?.includes(status.status) && 'text-white'
                  )}
                  style={
                    filters.status?.includes(status.status)
                      ? { backgroundColor: status.color }
                      : undefined
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: status.color }}
                  />
                  {status.labelDe}
                </Button>
              ))}
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mindestkapazität</Label>
            <Input
              type="number"
              placeholder="z.B. 500"
              value={filters.minCapacity || ''}
              onChange={(e) => setMinCapacity(e.target.value)}
              className="w-32"
            />
          </div>

          {/* Accessibility Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Barrierefreiheit</Label>
            <Button
              variant={filters.accessibility?.wheelchair ? 'default' : 'outline'}
              size="sm"
              onClick={toggleWheelchair}
              className="text-xs"
            >
              ♿ Rollstuhlgerecht
            </Button>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="w-full text-slate-500"
            >
              <X className="w-4 h-4 mr-1" />
              Filter zurücksetzen
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
