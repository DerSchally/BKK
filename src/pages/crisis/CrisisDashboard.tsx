import {
  AlertTriangle,
  Radio,
  Users,
  Activity,
  Power,
  PowerOff,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store';

export function CrisisDashboard() {
  const { crisisMode, toggleCrisisMode } = useUIStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Krisenstab-Dashboard</h1>
          <p className="text-slate-600">Zentrale für Krisenmanagement</p>
        </div>
        <Button
          size="lg"
          variant={crisisMode ? 'destructive' : 'default'}
          onClick={toggleCrisisMode}
          className={crisisMode ? 'animate-pulse' : ''}
        >
          {crisisMode ? (
            <>
              <PowerOff className="mr-2 h-5 w-5" />
              Krisenmodus DEAKTIVIEREN
            </>
          ) : (
            <>
              <Power className="mr-2 h-5 w-5" />
              Krisenmodus AKTIVIEREN
            </>
          )}
        </Button>
      </div>

      {/* Crisis Status Banner */}
      {crisisMode && (
        <Card className="bg-red-600 text-white border-red-700">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 animate-pulse" />
                <div>
                  <p className="text-xl font-bold">KRISENMODUS AKTIV</p>
                  <p className="text-red-100">
                    Aktiviert um {new Date().toLocaleTimeString('de-DE')}
                  </p>
                </div>
              </div>
              <Badge className="bg-white text-red-600">Bundesweit</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Schutzräume</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">38</div>
            <p className="text-xs text-slate-500">Von 53 registrierten</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verfügbare Kapazität</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128.500</div>
            <p className="text-xs text-slate-500">Plätze sofort verfügbar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesendete Warnungen</CardTitle>
            <Radio className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crisisMode ? '3' : '0'}</div>
            <p className="text-xs text-slate-500">In dieser Sitzung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Betroffene Region</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crisisMode ? 'Berlin' : '-'}</div>
            <p className="text-xs text-slate-500">{crisisMode ? '3,5 Mio. Einwohner' : 'Kein aktiver Krisenfall'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Broadcast senden</CardTitle>
            <CardDescription>Nachricht an alle Bürger senden</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button className="w-full" variant="destructive" disabled={!crisisMode}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Sofortige Schutzraumaufsuche
              </Button>
              <Button className="w-full" variant="outline" disabled={!crisisMode}>
                <Radio className="mr-2 h-4 w-4" />
                Allgemeine Warnung
              </Button>
              <Button className="w-full" variant="outline" disabled={!crisisMode}>
                Entwarnung senden
              </Button>
            </div>
            {!crisisMode && (
              <p className="text-sm text-amber-600">
                Aktivieren Sie den Krisenmodus, um Broadcasts zu senden.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Krisenprotokoll</CardTitle>
            <CardDescription>Letzte Aktionen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crisisMode ? (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant="destructive">Kritisch</Badge>
                    <span>Krisenmodus aktiviert</span>
                    <span className="ml-auto text-slate-400">Gerade eben</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant="outline">System</Badge>
                    <span>Alle Schutzräume benachrichtigt</span>
                    <span className="ml-auto text-slate-400">Automatisch</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  Keine aktiven Krisenaktionen.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Regionale Übersicht</CardTitle>
          <CardDescription>Schutzraumverfügbarkeit nach Bundesland</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            {[
              { state: 'Berlin', shelters: 10, capacity: 26500 },
              { state: 'Bayern', shelters: 8, capacity: 32000 },
              { state: 'Hamburg', shelters: 7, capacity: 19400 },
              { state: 'Hessen', shelters: 6, capacity: 16350 },
              { state: 'NRW', shelters: 9, capacity: 26300 },
              { state: 'Baden-Württemberg', shelters: 4, capacity: 10800 },
              { state: 'Sachsen', shelters: 6, capacity: 12000 },
              { state: 'Niedersachsen', shelters: 3, capacity: 9100 },
            ].map((region) => (
              <div
                key={region.state}
                className="p-3 bg-slate-50 rounded-lg"
              >
                <p className="font-medium">{region.state}</p>
                <p className="text-sm text-slate-500">
                  {region.shelters} Schutzräume • {region.capacity.toLocaleString()} Plätze
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
