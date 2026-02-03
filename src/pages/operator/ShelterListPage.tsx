import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  Plus,
  MapPin,
  Users,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { shelters } from '@/data';
import { shelterTypes, shelterStatuses } from '@/data/masterData';
import type { Shelter, ShelterStatus } from '@/types';

// Mock: In real app, filter by current operator
const operatorShelters = shelters.slice(0, 5);

export function ShelterListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShelterStatus | 'all'>('all');

  const filteredShelters = operatorShelters.filter((shelter) => {
    const matchesSearch =
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shelter.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meine Schutzräume</h1>
          <p className="text-slate-600">Verwalten Sie Ihre registrierten Schutzräume</p>
        </div>
        <Button asChild>
          <Link to="/operator/shelters/new">
            <Plus className="h-4 w-4 mr-2" />
            Neuen Schutzraum registrieren
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operatorShelters.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiv</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {operatorShelters.filter((s) => s.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausstehend</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {operatorShelters.filter((s) => s.approvalStatus === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eingeschränkt</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {operatorShelters.filter((s) => s.status === 'limited').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Suchen nach Name oder Stadt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ShelterStatus | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status filtern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            {shelterStatuses.map((status) => (
              <SelectItem key={status.status} value={status.status}>
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  {status.labelDe}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Shelter List */}
      <div className="space-y-4">
        {filteredShelters.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Keine Schutzräume gefunden</p>
            </CardContent>
          </Card>
        ) : (
          filteredShelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))
        )}
      </div>
    </div>
  );
}

function ShelterCard({ shelter }: { shelter: Shelter }) {
  const typeInfo = shelterTypes.find((t) => t.type === shelter.type);
  const statusInfo = shelterStatuses.find((s) => s.status === shelter.status);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeInfo?.icon}</span>
              <div>
                <h3 className="font-semibold text-lg">{shelter.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {shelter.address.street}, {shelter.address.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge style={{ backgroundColor: statusInfo?.color, color: 'white' }}>
                {statusInfo?.labelDe}
              </Badge>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {shelter.capacity.toLocaleString()} Plätze
              </Badge>
              {shelter.approvalStatus === 'pending' && (
                <Badge variant="secondary">Genehmigung ausstehend</Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/shelter/${shelter.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Ansehen
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/shelter/${shelter.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Bearbeiten
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Inspektion planen</DropdownMenuItem>
                <DropdownMenuItem>Bericht erstellen</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Deaktivieren</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
