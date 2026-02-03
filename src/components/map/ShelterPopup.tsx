import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import {
  Users,
  MapPin,
  Shield,
  Accessibility,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import type { Shelter } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { shelterTypes, shelterStatuses } from '@/data/masterData';

interface ShelterPopupProps {
  shelter: Shelter;
}

export function ShelterPopup({ shelter }: ShelterPopupProps) {
  const typeInfo = shelterTypes.find((t) => t.type === shelter.type);
  const statusInfo = shelterStatuses.find((s) => s.status === shelter.status);

  const getStatusBadgeVariant = () => {
    switch (shelter.status) {
      case 'active':
        return 'default';
      case 'limited':
        return 'secondary';
      case 'inactive':
        return 'destructive';
      case 'planned':
        return 'outline';
      default:
        return 'default';
    }
  };

  const handleDirections = () => {
    const { lat, lng } = shelter.coordinates;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <Popup className="shelter-popup" maxWidth={320} minWidth={280}>
      <div className="p-1 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight text-slate-900">
              {shelter.name}
            </h3>
            <Badge
              variant={getStatusBadgeVariant()}
              className="shrink-0 text-xs"
              style={{
                backgroundColor:
                  shelter.status === 'active'
                    ? '#22C55E'
                    : shelter.status === 'limited'
                      ? '#EAB308'
                      : shelter.status === 'inactive'
                        ? '#EF4444'
                        : '#3B82F6',
                color: 'white',
              }}
            >
              {statusInfo?.labelDe}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <span>{typeInfo?.icon}</span>
            {typeInfo?.labelDe}
          </p>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="text-slate-600">
            <p>{shelter.address.street}</p>
            <p>
              {shelter.address.postalCode} {shelter.address.city}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              <strong>{shelter.capacity.toLocaleString()}</strong> Plätze
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm capitalize">
              {shelter.protectionLevel === 'full'
                ? 'Voll'
                : shelter.protectionLevel === 'enhanced'
                  ? 'Erweitert'
                  : 'Basis'}
            </span>
          </div>
        </div>

        {/* Accessibility */}
        {shelter.accessibility.wheelchair && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Accessibility className="w-4 h-4 text-blue-500" />
            <span>Barrierefrei zugänglich</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={handleDirections}
          >
            <Navigation className="w-4 h-4 mr-1" />
            Route
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to={`/shelter/${shelter.id}`}>
              <ExternalLink className="w-4 h-4 mr-1" />
              Details
            </Link>
          </Button>
        </div>
      </div>
    </Popup>
  );
}
