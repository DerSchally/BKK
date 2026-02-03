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
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { shelters } from '@/data';
import { shelterTypes, shelterStatuses } from '@/data/masterData';
import type { ShelterStatus, ShelterType } from '@/types';

export function AdminSheltersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShelterStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ShelterType | 'all'>('all');
  const [selectedShelters, setSelectedShelters] = useState<string[]>([]);

  const filteredShelters = shelters.filter((shelter) => {
    const matchesSearch =
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.street.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shelter.status === statusFilter;
    const matchesType = typeFilter === 'all' || shelter.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const toggleSelectAll = () => {
    if (selectedShelters.length === filteredShelters.length) {
      setSelectedShelters([]);
    } else {
      setSelectedShelters(filteredShelters.map((s) => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedShelters((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Schutzräume verwalten</h1>
          <p className="text-slate-600">Übersicht aller registrierten Schutzräume</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportieren
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importieren
          </Button>
          <Button asChild>
            <Link to="/admin/shelters/new">
              <Plus className="h-4 w-4 mr-2" />
              Neuer Schutzraum
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shelters.length}</div>
          </CardContent>
        </Card>
        {shelterStatuses.map((status) => (
          <Card key={status.status}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{status.labelDe}</CardTitle>
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: status.color }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shelters.filter((s) => s.status === status.status).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Suchen nach Name, Stadt oder Adresse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ShelterStatus | 'all')}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
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
        <Select
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value as ShelterType | 'all')}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Typ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Typen</SelectItem>
            {shelterTypes.map((type) => (
              <SelectItem key={type.type} value={type.type}>
                <span className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  {type.labelDe}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedShelters.length > 0 && (
        <Card className="bg-slate-50">
          <CardContent className="py-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedShelters.length} Schutzräume ausgewählt
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Status ändern
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Löschen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedShelters.length === filteredShelters.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Stadt</TableHead>
              <TableHead>Kapazität</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShelters.map((shelter) => {
              const typeInfo = shelterTypes.find((t) => t.type === shelter.type);
              const statusInfo = shelterStatuses.find((s) => s.status === shelter.status);
              return (
                <TableRow key={shelter.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedShelters.includes(shelter.id)}
                      onCheckedChange={() => toggleSelect(shelter.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{typeInfo?.icon}</span>
                      <Link
                        to={`/shelter/${shelter.id}`}
                        className="font-medium hover:underline"
                      >
                        {shelter.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{typeInfo?.labelDe}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="h-3 w-3" />
                      {shelter.address.city}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-400" />
                      {shelter.capacity.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{ backgroundColor: statusInfo?.color, color: 'white' }}
                    >
                      {statusInfo?.labelDe}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/shelter/${shelter.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ansehen
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/shelter/${shelter.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Bearbeiten
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Zeige {filteredShelters.length} von {shelters.length} Schutzräumen
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Zurück
          </Button>
          <Button variant="outline" size="sm" disabled>
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
}
