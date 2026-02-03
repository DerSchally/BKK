import { useState } from 'react';
import {
  Radio,
  Send,
  AlertTriangle,
  Bell,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  History,
  Volume2,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { germanStates } from '@/data/masterData';

type BroadcastPriority = 'info' | 'warning' | 'critical';
type BroadcastStatus = 'draft' | 'sent' | 'scheduled';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  priority: BroadcastPriority;
  targetRegion: string;
  status: BroadcastStatus;
  sentAt?: string;
  scheduledFor?: string;
  recipientCount: number;
}

const priorityConfig: Record<BroadcastPriority, { label: string; color: string; icon: React.ReactNode }> = {
  info: { label: 'Information', color: 'bg-blue-100 text-blue-700', icon: <Bell className="h-4 w-4" /> },
  warning: { label: 'Warnung', color: 'bg-amber-100 text-amber-700', icon: <AlertTriangle className="h-4 w-4" /> },
  critical: { label: 'Kritisch', color: 'bg-red-100 text-red-700', icon: <Volume2 className="h-4 w-4" /> },
};

const mockBroadcasts: Broadcast[] = [
  {
    id: 'bc-1',
    title: 'Routine-Wartung angekündigt',
    message: 'Am kommenden Wochenende finden planmäßige Wartungsarbeiten an mehreren Schutzräumen in Berlin statt.',
    priority: 'info',
    targetRegion: 'Berlin',
    status: 'sent',
    sentAt: '2024-01-15T10:00:00Z',
    recipientCount: 45000,
  },
  {
    id: 'bc-2',
    title: 'Unwetterwarnung - Schutzräume aktiviert',
    message: 'Aufgrund der Unwetterwarnung für Bayern wurden alle Schutzräume in Bereitschaft versetzt. Bürger werden gebeten, die Warnmeldungen zu beachten.',
    priority: 'warning',
    targetRegion: 'Bayern',
    status: 'sent',
    sentAt: '2024-01-14T18:30:00Z',
    recipientCount: 125000,
  },
  {
    id: 'bc-3',
    title: 'Geplante Übung - Nordrhein-Westfalen',
    message: 'Am 20. Januar findet eine landesweite Katastrophenschutzübung statt. Schutzräume werden temporär aktiviert.',
    priority: 'info',
    targetRegion: 'Nordrhein-Westfalen',
    status: 'scheduled',
    scheduledFor: '2024-01-20T08:00:00Z',
    recipientCount: 180000,
  },
];

export function BroadcastPage() {
  const [broadcasts] = useState<Broadcast[]>(mockBroadcasts);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    message: '',
    priority: 'info' as BroadcastPriority,
    targetRegion: 'all',
  });

  const sentToday = broadcasts.filter((b) => {
    if (!b.sentAt) return false;
    const sent = new Date(b.sentAt);
    const today = new Date();
    return sent.toDateString() === today.toDateString();
  }).length;

  const scheduled = broadcasts.filter((b) => b.status === 'scheduled').length;
  const totalRecipients = broadcasts.reduce((sum, b) => sum + b.recipientCount, 0);

  const handleSendBroadcast = () => {
    setIsConfirmOpen(false);
    setIsComposeOpen(false);
    setNewBroadcast({ title: '', message: '', priority: 'info', targetRegion: 'all' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Radio className="h-8 w-8 text-red-500" />
            Broadcast-System
          </h1>
          <p className="text-slate-600">Senden Sie Nachrichten an Bürger und Betreiber</p>
        </div>
        <Button onClick={() => setIsComposeOpen(true)} className="bg-red-600 hover:bg-red-700">
          <Send className="h-4 w-4 mr-2" />
          Neue Nachricht
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heute gesendet</CardTitle>
            <Send className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentToday}</div>
            <p className="text-xs text-slate-500">Nachrichten</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geplant</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{scheduled}</div>
            <p className="text-xs text-slate-500">Ausstehend</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt erreicht</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalRecipients.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Empfänger</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kritische Meldungen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {broadcasts.filter((b) => b.priority === 'critical').length}
            </div>
            <p className="text-xs text-slate-500">Diese Woche</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Schnellwarnung
            </CardTitle>
            <CardDescription>Sofortige Warnmeldung an alle Regionen</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-100">
              Warnung senden
            </Button>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-red-600" />
              Notfall-Broadcast
            </CardTitle>
            <CardDescription>Kritische Meldung an alle Systeme</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100">
              Notfall auslösen
            </Button>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Test-Meldung
            </CardTitle>
            <CardDescription>System-Test ohne öffentliche Warnung</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
              Test senden
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Broadcast History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Nachrichten-Verlauf
          </CardTitle>
          <CardDescription>Letzte gesendete und geplante Broadcasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className={`p-2 rounded-full ${priorityConfig[broadcast.priority].color}`}>
                  {priorityConfig[broadcast.priority].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{broadcast.title}</h3>
                    <Badge className={priorityConfig[broadcast.priority].color}>
                      {priorityConfig[broadcast.priority].label}
                    </Badge>
                    {broadcast.status === 'scheduled' && (
                      <Badge variant="outline" className="text-blue-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Geplant
                      </Badge>
                    )}
                    {broadcast.status === 'sent' && (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Gesendet
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{broadcast.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {broadcast.targetRegion}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {broadcast.recipientCount.toLocaleString()} Empfänger
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {broadcast.sentAt
                        ? new Date(broadcast.sentAt).toLocaleString('de-DE')
                        : broadcast.scheduledFor
                        ? `Geplant: ${new Date(broadcast.scheduledFor).toLocaleString('de-DE')}`
                        : '-'}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compose Dialog */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Neue Broadcast-Nachricht</DialogTitle>
            <DialogDescription>
              Erstellen Sie eine neue Nachricht für Bürger oder Betreiber.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                placeholder="Kurzer, prägnanter Titel"
                value={newBroadcast.title}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Nachricht</Label>
              <textarea
                id="message"
                className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ihre Nachricht an die Empfänger..."
                value={newBroadcast.message}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Priorität</Label>
                <Select
                  value={newBroadcast.priority}
                  onValueChange={(value) =>
                    setNewBroadcast({ ...newBroadcast, priority: value as BroadcastPriority })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityConfig).map(([key, config]) => (
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
              <div className="space-y-2">
                <Label>Zielregion</Label>
                <Select
                  value={newBroadcast.targetRegion}
                  onValueChange={(value) => setNewBroadcast({ ...newBroadcast, targetRegion: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Regionen</SelectItem>
                    {germanStates.map((state) => (
                      <SelectItem key={state.code} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="outline">Als Entwurf speichern</Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setIsConfirmOpen(true)}
              disabled={!newBroadcast.title || !newBroadcast.message}
            >
              <Send className="h-4 w-4 mr-2" />
              Senden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              Broadcast bestätigen
            </DialogTitle>
            <DialogDescription>
              Sie sind dabei, eine Nachricht an{' '}
              {newBroadcast.targetRegion === 'all' ? 'alle Regionen' : newBroadcast.targetRegion} zu
              senden. Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-slate-50 rounded-lg space-y-2">
            <p className="font-medium">{newBroadcast.title}</p>
            <p className="text-sm text-slate-600">{newBroadcast.message}</p>
            <Badge className={priorityConfig[newBroadcast.priority].color}>
              {priorityConfig[newBroadcast.priority].label}
            </Badge>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Zurück
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleSendBroadcast}>
              <Send className="h-4 w-4 mr-2" />
              Jetzt senden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
