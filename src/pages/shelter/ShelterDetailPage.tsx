import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  Shield,
  Building2,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Accessibility,
  Wind,
  Zap,
  Droplets,
  Radio,
  ArrowLeft,
  Edit,
  Navigation,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { shelters } from '@/data';
import { shelterTypes, shelterStatuses } from '@/data/masterData';
import { useAuthStore } from '@/store';

const conditionLabels = {
  good: { label: 'Gut', color: 'bg-green-100 text-green-700' },
  fair: { label: 'Befriedigend', color: 'bg-yellow-100 text-yellow-700' },
  poor: { label: 'Mangelhaft', color: 'bg-red-100 text-red-700' },
  unknown: { label: 'Unbekannt', color: 'bg-gray-100 text-gray-700' },
};

const protectionLabels = {
  basic: 'Basis-Schutz',
  enhanced: 'Erweiterter Schutz',
  full: 'Vollschutz',
};

const operatorTypeLabels = {
  public: 'Öffentlich',
  private: 'Privat',
  federal: 'Bundeseigentum',
};

export function ShelterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const shelter = shelters.find((s) => s.id === id);

  if (!shelter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertTriangle className="h-16 w-16 text-amber-500" />
        <h1 className="text-2xl font-bold">Schutzraum nicht gefunden</h1>
        <p className="text-slate-600">Der angeforderte Schutzraum existiert nicht.</p>
        <Button onClick={() => navigate('/map')}>Zur Karte</Button>
      </div>
    );
  }

  const typeInfo = shelterTypes.find((t) => t.type === shelter.type);
  const statusInfo = shelterStatuses.find((s) => s.status === shelter.status);

  const canEdit =
    user?.role === 'operator' ||
    user?.role === 'municipal_admin' ||
    user?.role === 'state_admin' ||
    user?.role === 'federal_admin';

  const handleDirections = () => {
    const { lat, lng } = shelter.coordinates;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Zurück
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{typeInfo?.icon}</span>
            <h1 className="text-3xl font-bold">{shelter.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="h-4 w-4" />
            <span>
              {shelter.address.street}, {shelter.address.postalCode} {shelter.address.city}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              style={{ backgroundColor: statusInfo?.color, color: 'white' }}
            >
              {statusInfo?.labelDe}
            </Badge>
            <Badge variant="outline">{typeInfo?.labelDe}</Badge>
            <Badge variant="outline">{protectionLabels[shelter.protectionLevel]}</Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDirections}>
            <Navigation className="h-4 w-4 mr-2" />
            Route
          </Button>
          {canEdit && (
            <Button asChild>
              <Link to={`/shelter/${shelter.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Kapazität & Schutz */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Kapazität & Schutz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Kapazität</span>
              <span className="text-2xl font-bold">{shelter.capacity.toLocaleString()} Personen</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Schutzstufe</span>
              <Badge variant="secondary">{protectionLabels[shelter.protectionLevel]}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Typ</span>
              <span className="flex items-center gap-2">
                <span>{typeInfo?.icon}</span>
                {typeInfo?.labelDe}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Barrierefreiheit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Barrierefreiheit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <AccessibilityItem
              label="Rollstuhlgerecht"
              available={shelter.accessibility.wheelchair}
            />
            <AccessibilityItem
              label="Aufzug vorhanden"
              available={shelter.accessibility.elevator}
            />
            <AccessibilityItem
              label="Ebenerdiger Zugang"
              available={shelter.accessibility.groundLevel}
            />
          </CardContent>
        </Card>

        {/* Ausstattung */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Ausstattung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <EquipmentItem
              icon={<Wind className="h-4 w-4" />}
              label="Belüftung"
              available={shelter.equipment.ventilation}
            />
            <EquipmentItem
              icon={<Zap className="h-4 w-4" />}
              label="Stromversorgung"
              available={shelter.equipment.power}
            />
            <EquipmentItem
              icon={<Droplets className="h-4 w-4" />}
              label="Wasserversorgung"
              available={shelter.equipment.water}
            />
            <EquipmentItem
              icon={<Building2 className="h-4 w-4" />}
              label="Sanitäranlagen"
              available={shelter.equipment.sanitation}
            />
            <EquipmentItem
              icon={<Radio className="h-4 w-4" />}
              label="Kommunikation"
              available={shelter.equipment.communication}
            />
          </CardContent>
        </Card>

        {/* Zustand */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Zustand & Inspektion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Baulicher Zustand</span>
              <Badge className={conditionLabels[shelter.condition.structural].color}>
                {conditionLabels[shelter.condition.structural].label}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Technischer Zustand</span>
              <Badge className={conditionLabels[shelter.condition.technical].color}>
                {conditionLabels[shelter.condition.technical].label}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Letzte Inspektion</span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                {new Date(shelter.condition.lastInspection).toLocaleDateString('de-DE')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Nächste Inspektion</span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                {new Date(shelter.condition.nextInspection).toLocaleDateString('de-DE')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Betreiber */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Betreiber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium">{shelter.operator.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Typ</p>
                <p className="font-medium">{operatorTypeLabels[shelter.operator.type]}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Kontakt</p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {shelter.operator.contact}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Standort
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Koordinaten: {shelter.coordinates.lat.toFixed(4)}, {shelter.coordinates.lng.toFixed(4)}</p>
              <Button variant="link" onClick={handleDirections} className="mt-2">
                In Google Maps öffnen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccessibilityItem({ label, available }: { label: string; available: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      {available ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-slate-300" />
      )}
    </div>
  );
}

function EquipmentItem({
  icon,
  label,
  available,
}: {
  icon: React.ReactNode;
  label: string;
  available: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-slate-600">
        {icon}
        {label}
      </span>
      {available ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-slate-300" />
      )}
    </div>
  );
}
