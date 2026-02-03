import { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  Building2,
  UserCheck,
  UserX,
  Key,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { users } from '@/data';
import type { User, UserRole } from '@/types';

const roleLabels: Record<UserRole, string> = {
  citizen: 'Bürger:in',
  operator: 'Betreiber',
  municipal_admin: 'Kommunale Verwaltung',
  state_admin: 'Landesverwaltung',
  federal_admin: 'BBK (Bundesebene)',
  crisis_manager: 'Krisenstab',
};

const roleColors: Record<UserRole, string> = {
  citizen: 'bg-slate-100 text-slate-700',
  operator: 'bg-green-100 text-green-700',
  municipal_admin: 'bg-amber-100 text-amber-700',
  state_admin: 'bg-purple-100 text-purple-700',
  federal_admin: 'bg-red-100 text-red-700',
  crisis_manager: 'bg-orange-100 text-orange-700',
};

// Extended mock users
const allUsers: (User & { status: 'active' | 'inactive'; lastLogin: string })[] = [
  ...users.map((u) => ({ ...u, status: 'active' as const, lastLogin: '2024-01-15T10:00:00Z' })),
  {
    id: 'user-7',
    email: 'test.operator@example.com',
    name: 'Test Betreiber',
    role: 'operator',
    status: 'inactive',
    lastLogin: '2023-12-01T10:00:00Z',
  },
  {
    id: 'user-8',
    email: 'backup.admin@bbk.de',
    name: 'Backup Administrator',
    role: 'federal_admin',
    status: 'active',
    lastLogin: '2024-01-14T15:30:00Z',
  },
];

export function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeUsers = allUsers.filter((u) => u.status === 'active').length;
  const operatorCount = allUsers.filter((u) => u.role === 'operator').length;
  const adminCount = allUsers.filter((u) =>
    ['municipal_admin', 'state_admin', 'federal_admin'].includes(u.role)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
          <p className="text-slate-600">Verwalten Sie Benutzerkonten und Berechtigungen</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Benutzer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Benutzer anlegen</DialogTitle>
              <DialogDescription>
                Erstellen Sie ein neues Benutzerkonto mit Zugriffsrechten.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Vor- und Nachname" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rolle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rolle auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([role, label]) => (
                      <SelectItem key={role} value={role}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality">Gemeinde/Region (optional)</Label>
                <Input id="municipality" placeholder="z.B. Berlin" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Benutzer anlegen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-slate-500">Registrierte Benutzer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiv</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-slate-500">Aktive Konten</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Betreiber</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{operatorCount}</div>
            <p className="text-xs text-slate-500">Schutzraum-Betreiber</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administratoren</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{adminCount}</div>
            <p className="text-xs text-slate-500">Verwaltung</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Suchen nach Name oder E-Mail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Rolle filtern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Rollen</SelectItem>
            {Object.entries(roleLabels).map(([role, label]) => (
              <SelectItem key={role} value={role}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Benutzer</TableHead>
              <TableHead>Rolle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Letzter Login</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                </TableCell>
                <TableCell>
                  {user.status === 'active' ? (
                    <Badge variant="outline" className="text-green-600">
                      <UserCheck className="h-3 w-3 mr-1" />
                      Aktiv
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-500">
                      <UserX className="h-3 w-3 mr-1" />
                      Inaktiv
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(user.lastLogin).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Bearbeiten
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Key className="h-4 w-4 mr-2" />
                        Passwort zurücksetzen
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Rolle ändern
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === 'active' ? (
                        <DropdownMenuItem className="text-amber-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Deaktivieren
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Aktivieren
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Löschen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Role Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rollenübersicht</CardTitle>
          <CardDescription>Berechtigungen der verschiedenen Rollen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(roleLabels).map(([role, label]) => (
              <div key={role} className="p-3 border rounded-lg">
                <Badge className={roleColors[role as UserRole]}>{label}</Badge>
                <p className="text-sm text-slate-600 mt-2">
                  {role === 'citizen' && 'Öffentlicher Zugang zur Karte und Informationen'}
                  {role === 'operator' && 'Verwaltung eigener Schutzräume'}
                  {role === 'municipal_admin' && 'Genehmigung und Verwaltung auf Gemeindeebene'}
                  {role === 'state_admin' && 'Landesweite Übersicht und Förderungen'}
                  {role === 'federal_admin' && 'Bundesweite Administration und Analysen'}
                  {role === 'crisis_manager' && 'Krisenmodus und Broadcast-Nachrichten'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
