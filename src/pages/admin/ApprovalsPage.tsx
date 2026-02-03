import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Users,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { shelters } from '@/data';
import { shelterTypes } from '@/data/masterData';

// Mock pending approvals
const pendingApprovals = shelters.slice(0, 3).map((s) => ({
  ...s,
  approvalStatus: 'pending' as const,
  submittedAt: '2024-01-15T10:00:00Z',
  submittedBy: 'Max Mustermann',
}));

const recentlyReviewed = shelters.slice(3, 6).map((s, i) => ({
  ...s,
  approvalStatus: i % 2 === 0 ? ('approved' as const) : ('rejected' as const),
  reviewedAt: '2024-01-14T10:00:00Z',
  reviewedBy: 'Anna Schmidt',
  reviewNotes: i % 2 === 0 ? 'Alle Anforderungen erfüllt' : 'Fehlende Dokumentation',
}));

export function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelter, setSelectedShelter] = useState<typeof pendingApprovals[0] | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | null>(null);

  const filteredPending = pendingApprovals.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = () => {
    // Mock approval action
    console.log('Approving:', selectedShelter?.id, 'Notes:', reviewNotes);
    setDialogAction(null);
    setSelectedShelter(null);
    setReviewNotes('');
  };

  const handleReject = () => {
    // Mock rejection action
    console.log('Rejecting:', selectedShelter?.id, 'Notes:', reviewNotes);
    setDialogAction(null);
    setSelectedShelter(null);
    setReviewNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Genehmigungen</h1>
        <p className="text-slate-600">Prüfen und genehmigen Sie eingereichte Schutzräume</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausstehend</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingApprovals.length}</div>
            <p className="text-xs text-slate-500">Warten auf Prüfung</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genehmigt (30 Tage)</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-slate-500">Erfolgreich genehmigt</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abgelehnt (30 Tage)</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-slate-500">Nicht genehmigt</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Ausstehend ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed">Kürzlich geprüft</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Suchen nach Name oder Stadt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Pending List */}
          {filteredPending.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-300 mb-4" />
                <p className="text-slate-500">Keine ausstehenden Genehmigungen</p>
              </CardContent>
            </Card>
          ) : (
            filteredPending.map((shelter) => (
              <ApprovalCard
                key={shelter.id}
                shelter={shelter}
                onApprove={() => {
                  setSelectedShelter(shelter);
                  setDialogAction('approve');
                }}
                onReject={() => {
                  setSelectedShelter(shelter);
                  setDialogAction('reject');
                }}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {recentlyReviewed.map((shelter) => (
            <ReviewedCard key={shelter.id} shelter={shelter} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Approval/Rejection Dialog */}
      <Dialog open={dialogAction !== null} onOpenChange={() => setDialogAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'approve' ? 'Schutzraum genehmigen' : 'Schutzraum ablehnen'}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === 'approve'
                ? 'Bestätigen Sie die Genehmigung dieses Schutzraums.'
                : 'Geben Sie einen Grund für die Ablehnung an.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Schutzraum</Label>
              <p className="font-medium">{selectedShelter?.name}</p>
              <p className="text-sm text-slate-500">
                {selectedShelter?.address.street}, {selectedShelter?.address.city}
              </p>
            </div>
            <div>
              <Label htmlFor="notes">
                {dialogAction === 'approve' ? 'Anmerkungen (optional)' : 'Ablehnungsgrund'}
              </Label>
              <Textarea
                id="notes"
                placeholder={
                  dialogAction === 'approve'
                    ? 'Optionale Anmerkungen zur Genehmigung...'
                    : 'Bitte geben Sie einen Grund für die Ablehnung an...'
                }
                value={reviewNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAction(null)}>
              Abbrechen
            </Button>
            {dialogAction === 'approve' ? (
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Genehmigen
              </Button>
            ) : (
              <Button onClick={handleReject} variant="destructive">
                <XCircle className="h-4 w-4 mr-2" />
                Ablehnen
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ApprovalCard({
  shelter,
  onApprove,
  onReject,
}: {
  shelter: typeof pendingApprovals[0];
  onApprove: () => void;
  onReject: () => void;
}) {
  const typeInfo = shelterTypes.find((t) => t.type === shelter.type);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{typeInfo?.labelDe}</Badge>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {shelter.capacity.toLocaleString()} Plätze
              </Badge>
              <Badge variant="secondary">
                <Calendar className="h-3 w-3 mr-1" />
                Eingereicht: {new Date(shelter.submittedAt).toLocaleDateString('de-DE')}
              </Badge>
            </div>
            <p className="text-sm text-slate-500">
              Eingereicht von: <span className="font-medium">{shelter.submittedBy}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/shelter/${shelter.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={onReject}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Ablehnen
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Genehmigen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewedCard({ shelter }: { shelter: typeof recentlyReviewed[0] }) {
  const typeInfo = shelterTypes.find((t) => t.type === shelter.type);

  return (
    <Card className={shelter.approvalStatus === 'rejected' ? 'border-red-200' : 'border-green-200'}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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
              {shelter.approvalStatus === 'approved' ? (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Genehmigt
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="h-3 w-3 mr-1" />
                  Abgelehnt
                </Badge>
              )}
              <span className="text-sm text-slate-500">
                am {new Date(shelter.reviewedAt).toLocaleDateString('de-DE')} von{' '}
                {shelter.reviewedBy}
              </span>
            </div>
            {shelter.reviewNotes && (
              <p className="text-sm text-slate-600 flex items-start gap-2">
                <MessageSquare className="h-4 w-4 mt-0.5 text-slate-400" />
                {shelter.reviewNotes}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/shelter/${shelter.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
