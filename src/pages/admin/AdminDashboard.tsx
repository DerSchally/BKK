import {
  Building2,
  FileCheck,
  Users,
  AlertTriangle,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store';

export function AdminDashboard() {
  const { user } = useAuthStore();

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'municipal_admin':
        return 'Kommunale Verwaltung';
      case 'state_admin':
        return 'Landesverwaltung';
      case 'federal_admin':
        return 'BBK (Bundesebene)';
      default:
        return 'Administration';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin-Dashboard</h1>
        <p className="text-slate-600">{getRoleLabel()} - Übersicht</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schutzräume gesamt</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53</div>
            <p className="text-xs text-slate-500">
              <span className="text-green-500">+3</span> seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausstehende Genehmigungen</CardTitle>
            <FileCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-slate-500">Sofortige Aufmerksamkeit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtkapazität</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.500</div>
            <p className="text-xs text-slate-500">Personen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspektionen fällig</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-slate-500">In den nächsten 30 Tagen</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Pending */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ausstehende Genehmigungen</CardTitle>
            <CardDescription>Schutzräume zur Überprüfung</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Neuer Schutzraum Friedrichshain</p>
                <p className="text-sm text-slate-500">Berlin • Eingereicht vor 3 Tagen</p>
              </div>
              <Link to="/admin/approvals">
                <Button size="sm">Prüfen</Button>
              </Link>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Neubau Schutzraum Giesing</p>
                <p className="text-sm text-slate-500">München • Eingereicht vor 5 Tagen</p>
              </div>
              <Link to="/admin/approvals">
                <Button size="sm">Prüfen</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schnellzugriff</CardTitle>
            <CardDescription>Häufige Aktionen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/approvals" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FileCheck className="mr-2 h-4 w-4" />
                Genehmigungen bearbeiten
              </Button>
            </Link>
            <Link to="/admin/shelters" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Schutzräume verwalten
              </Button>
            </Link>
            <Link to="/admin/analytics" className="block">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analysen anzeigen
              </Button>
            </Link>
            <Link to="/map" className="block">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Zur Karte
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Status-Übersicht</CardTitle>
          <CardDescription>Verteilung nach Status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-green-700">38</p>
                <p className="text-sm text-green-600">Aktiv</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <div className="h-3 w-3 bg-amber-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-amber-700">8</p>
                <p className="text-sm text-amber-600">Eingeschränkt</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <div className="h-3 w-3 bg-red-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-red-700">5</p>
                <p className="text-sm text-red-600">Inaktiv</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="h-3 w-3 bg-blue-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold text-blue-700">2</p>
                <p className="text-sm text-blue-600">Geplant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
