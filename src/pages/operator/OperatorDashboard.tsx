import { Building2, ClipboardCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function OperatorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Betreiber-Dashboard</h1>
        <p className="text-slate-600">Verwalten Sie Ihre Schutzräume</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meine Schutzräume</CardTitle>
            <Building2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-500">2 aktiv, 1 ausstehend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspektionen</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-slate-500">Fällig in 14 Tagen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Aufgaben</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-slate-500">Daten vervollständigen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genehmigt</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-slate-500">Alle Anforderungen erfüllt</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellzugriff</CardTitle>
          <CardDescription>Häufige Aktionen</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link to="/operator/shelters/new">
            <Button>
              <Building2 className="mr-2 h-4 w-4" />
              Neuen Schutzraum registrieren
            </Button>
          </Link>
          <Link to="/operator/shelters">
            <Button variant="outline">Meine Schutzräume verwalten</Button>
          </Link>
          <Link to="/operator/maintenance">
            <Button variant="outline">Inspektion planen</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600">Genehmigt</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Bunker Musterstraße</p>
                <p className="text-xs text-slate-500">Genehmigung erhalten</p>
              </div>
              <span className="text-xs text-slate-400">Vor 2 Tagen</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-amber-600">Ausstehend</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Tiefgarage Hauptplatz</p>
                <p className="text-xs text-slate-500">Wartet auf Genehmigung</p>
              </div>
              <span className="text-xs text-slate-400">Vor 5 Tagen</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-blue-600">Aktualisiert</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">U-Bahnhof Zentrum</p>
                <p className="text-xs text-slate-500">Kapazität aktualisiert</p>
              </div>
              <span className="text-xs text-slate-400">Vor 1 Woche</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
