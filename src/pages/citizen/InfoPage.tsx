import { Shield, AlertTriangle, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Informationen zum Zivilschutz</h1>
        <p className="text-slate-600">
          Alles Wichtige über Schutzräume und Bevölkerungsschutz in Deutschland.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 text-orange-500 mb-2" />
            <CardTitle>Was sind Schutzräume?</CardTitle>
            <CardDescription>Grundlegende Informationen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Schutzräume sind bauliche Anlagen, die Menschen bei verschiedenen
              Gefahrenlagen Schutz bieten können - etwa bei Unwettern, industriellen
              Unfällen oder im Verteidigungsfall.
            </p>
            <p className="text-sm text-slate-600">
              In Deutschland gibt es verschiedene Arten von Schutzräumen: von ehemaligen
              Bunkern über U-Bahn-Stationen bis hin zu modernen Tiefgaragen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
            <CardTitle>Wann sollte ich einen Schutzraum aufsuchen?</CardTitle>
            <CardDescription>Warnstufen und Verhaltensregeln</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Das Aufsuchen eines Schutzraums wird über offizielle Warnkanäle
              angeordnet. Achten Sie auf Sirenen, Warn-Apps (NINA) und Durchsagen.
            </p>
            <p className="text-sm text-slate-600">
              Bei einem Warnsignal: Ruhe bewahren, Anweisungen folgen und den
              nächstgelegenen Schutzraum aufsuchen.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wichtige Kontakte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Phone className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Notruf</p>
                <p className="text-2xl font-bold">112</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Polizei</p>
                <p className="text-2xl font-bold">110</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">BBK-Hotline</p>
                <p className="text-lg font-bold">0228 99550-0</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weiterführende Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="link" className="h-auto p-0 text-blue-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              BBK - Bundesamt für Bevölkerungsschutz und Katastrophenhilfe
            </Button>
            <br />
            <Button variant="link" className="h-auto p-0 text-blue-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              NINA Warn-App herunterladen
            </Button>
            <br />
            <Button variant="link" className="h-auto p-0 text-blue-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ratgeber für Notfallvorsorge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
