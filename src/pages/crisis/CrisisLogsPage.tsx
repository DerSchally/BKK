import { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  MapPin,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

type LogLevel = 'info' | 'warning' | 'error' | 'success';
type LogCategory = 'shelter' | 'broadcast' | 'user' | 'system' | 'crisis';

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  action: string;
  description: string;
  user: string;
  region?: string;
  details?: Record<string, unknown>;
}

const levelConfig: Record<LogLevel, { label: string; color: string; icon: React.ReactNode }> = {
  info: { label: 'Info', color: 'bg-blue-100 text-blue-700', icon: <Info className="h-4 w-4" /> },
  warning: { label: 'Warnung', color: 'bg-amber-100 text-amber-700', icon: <AlertTriangle className="h-4 w-4" /> },
  error: { label: 'Fehler', color: 'bg-red-100 text-red-700', icon: <AlertTriangle className="h-4 w-4" /> },
  success: { label: 'Erfolg', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="h-4 w-4" /> },
};

const categoryConfig: Record<LogCategory, { label: string; icon: React.ReactNode }> = {
  shelter: { label: 'Schutzraum', icon: <Shield className="h-4 w-4" /> },
  broadcast: { label: 'Broadcast', icon: <Activity className="h-4 w-4" /> },
  user: { label: 'Benutzer', icon: <User className="h-4 w-4" /> },
  system: { label: 'System', icon: <FileText className="h-4 w-4" /> },
  crisis: { label: 'Krise', icon: <AlertTriangle className="h-4 w-4" /> },
};

const mockLogs: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2024-01-15T14:32:00Z',
    level: 'success',
    category: 'broadcast',
    action: 'broadcast_sent',
    description: 'Broadcast "Routine-Wartung angekündigt" erfolgreich gesendet',
    user: 'Anna Müller',
    region: 'Berlin',
  },
  {
    id: 'log-2',
    timestamp: '2024-01-15T14:15:00Z',
    level: 'warning',
    category: 'shelter',
    action: 'inspection_overdue',
    description: 'Schutzraum "Bunker Unter den Linden" hat überfällige Inspektion',
    user: 'System',
    region: 'Berlin',
  },
  {
    id: 'log-3',
    timestamp: '2024-01-15T13:45:00Z',
    level: 'info',
    category: 'user',
    action: 'user_login',
    description: 'Benutzer hat sich angemeldet',
    user: 'Max Schmidt',
  },
  {
    id: 'log-4',
    timestamp: '2024-01-15T12:00:00Z',
    level: 'error',
    category: 'system',
    action: 'sync_failed',
    description: 'Synchronisation mit externem System fehlgeschlagen',
    user: 'System',
    details: { errorCode: 'CONN_TIMEOUT', retryCount: 3 },
  },
  {
    id: 'log-5',
    timestamp: '2024-01-15T11:30:00Z',
    level: 'success',
    category: 'shelter',
    action: 'shelter_approved',
    description: 'Neuer Schutzraum "Tiefgarage Alexanderplatz" genehmigt',
    user: 'Maria Weber',
    region: 'Berlin',
  },
  {
    id: 'log-6',
    timestamp: '2024-01-15T10:15:00Z',
    level: 'warning',
    category: 'crisis',
    action: 'capacity_alert',
    description: 'Kapazitätswarnung für Region Bayern - unter 30% verfügbar',
    user: 'System',
    region: 'Bayern',
  },
  {
    id: 'log-7',
    timestamp: '2024-01-15T09:00:00Z',
    level: 'info',
    category: 'shelter',
    action: 'shelter_updated',
    description: 'Schutzraum "U-Bahn Station Hauptbahnhof" Daten aktualisiert',
    user: 'Thomas Klein',
    region: 'München',
  },
  {
    id: 'log-8',
    timestamp: '2024-01-14T18:30:00Z',
    level: 'success',
    category: 'broadcast',
    action: 'emergency_broadcast',
    description: 'Notfall-Broadcast für Unwetterwarnung erfolgreich gesendet',
    user: 'Anna Müller',
    region: 'Bayern',
  },
  {
    id: 'log-9',
    timestamp: '2024-01-14T16:00:00Z',
    level: 'info',
    category: 'user',
    action: 'role_changed',
    description: 'Benutzerrolle geändert: operator → municipal_admin',
    user: 'Admin System',
  },
  {
    id: 'log-10',
    timestamp: '2024-01-14T14:20:00Z',
    level: 'warning',
    category: 'shelter',
    action: 'equipment_issue',
    description: 'Belüftungssystem in "Bunker Friedrichstraße" meldet Störung',
    user: 'System',
    region: 'Berlin',
  },
];

export function CrisisLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<LogCategory | 'all'>('all');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const errorCount = mockLogs.filter((l) => l.level === 'error').length;
  const warningCount = mockLogs.filter((l) => l.level === 'warning').length;
  const todayCount = mockLogs.filter((l) => {
    const logDate = new Date(l.timestamp);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="h-8 w-8 text-slate-600" />
            Krisenprotokoll
          </h1>
          <p className="text-slate-600">Systemaktivitäten und Ereignisprotokoll</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heute</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCount}</div>
            <p className="text-xs text-slate-500">Einträge</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fehler</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <p className="text-xs text-slate-500">Letzte 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnungen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{warningCount}</div>
            <p className="text-xs text-slate-500">Letzte 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System-Status</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-slate-500">Alle Dienste aktiv</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Suchen in Protokoll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as LogLevel | 'all')}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Level</SelectItem>
            {Object.entries(levelConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-2">
                  {config.icon}
                  {config.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as LogCategory | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-2">
                  {config.icon}
                  {config.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Zeitstempel</TableHead>
              <TableHead className="w-[100px]">Level</TableHead>
              <TableHead className="w-[120px]">Kategorie</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead className="w-[150px]">Benutzer</TableHead>
              <TableHead className="w-[120px]">Region</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <>
                <TableRow key={log.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {new Date(log.timestamp).toLocaleString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={levelConfig[log.level].color}>
                      {levelConfig[log.level].icon}
                      <span className="ml-1">{levelConfig[log.level].label}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-slate-600">
                      {categoryConfig[log.category].icon}
                      {categoryConfig[log.category].label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{log.description}</p>
                    <p className="text-xs text-slate-500 font-mono">{log.action}</p>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <User className="h-3 w-3 text-slate-400" />
                      {log.user}
                    </span>
                  </TableCell>
                  <TableCell>
                    {log.region ? (
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="h-3 w-3" />
                        {log.region}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {log.details && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                      >
                        {expandedLog === log.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                {expandedLog === log.id && log.details && (
                  <TableRow key={`${log.id}-details`}>
                    <TableCell colSpan={7} className="bg-slate-50">
                      <pre className="text-xs font-mono p-4 bg-slate-100 rounded overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legende</CardTitle>
          <CardDescription>Bedeutung der Log-Level und Kategorien</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Log-Level</h4>
              <div className="space-y-2">
                {Object.entries(levelConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Badge className={config.color}>
                      {config.icon}
                      <span className="ml-1">{config.label}</span>
                    </Badge>
                    <span className="text-sm text-slate-600">
                      {key === 'info' && '- Informative Meldungen'}
                      {key === 'warning' && '- Warnungen, die Aufmerksamkeit erfordern'}
                      {key === 'error' && '- Fehler, die behoben werden müssen'}
                      {key === 'success' && '- Erfolgreich abgeschlossene Aktionen'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Kategorien</h4>
              <div className="space-y-2">
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-slate-600">
                      {config.icon}
                      {config.label}
                    </span>
                    <span className="text-sm text-slate-500">
                      {key === 'shelter' && '- Schutzraum-bezogene Ereignisse'}
                      {key === 'broadcast' && '- Broadcast-Nachrichten'}
                      {key === 'user' && '- Benutzeraktionen'}
                      {key === 'system' && '- Systemereignisse'}
                      {key === 'crisis' && '- Krisenbezogene Meldungen'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
