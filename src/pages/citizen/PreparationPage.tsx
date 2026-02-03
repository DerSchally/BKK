import { CheckCircle2, Package, Droplets, Pill, Radio, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const checklistItems = [
  {
    category: 'Lebensmittel',
    icon: <Package className="h-6 w-6" />,
    items: [
      'Wasser (2 Liter pro Person/Tag für 10 Tage)',
      'Haltbare Lebensmittel (Konserven, Nudeln, Reis)',
      'Energieriegel und Trockenfrüchte',
      'Babynahrung (falls nötig)',
    ],
  },
  {
    category: 'Hygiene',
    icon: <Droplets className="h-6 w-6" />,
    items: [
      'Seife und Desinfektionsmittel',
      'Toilettenpapier',
      'Müllbeutel',
      'Feuchttücher',
    ],
  },
  {
    category: 'Medizin',
    icon: <Pill className="h-6 w-6" />,
    items: [
      'Persönliche Medikamente',
      'Erste-Hilfe-Set',
      'Schmerzmittel',
      'Fieberthermometer',
    ],
  },
  {
    category: 'Kommunikation',
    icon: <Radio className="h-6 w-6" />,
    items: [
      'Batteriebetriebenes Radio',
      'Taschenlampe mit Ersatzbatterien',
      'Powerbank für Handy',
      'Wichtige Telefonnummern (auf Papier)',
    ],
  },
  {
    category: 'Dokumente',
    icon: <FileText className="h-6 w-6" />,
    items: [
      'Personalausweis/Reisepass (Kopien)',
      'Versicherungsunterlagen',
      'Bargeld',
      'Impfpass',
    ],
  },
];

export function PreparationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vorbereitung für den Notfall</h1>
        <p className="text-slate-600">
          Eine gute Vorbereitung kann im Ernstfall Leben retten. Hier finden Sie
          wichtige Checklisten und Tipps.
        </p>
      </div>

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Badge className="bg-amber-500">Tipp</Badge>
            </div>
            <div>
              <p className="text-sm">
                Bereiten Sie einen <strong>Notfallrucksack</strong> vor, den Sie im
                Ernstfall schnell greifen können. Überprüfen Sie regelmäßig das
                Verfallsdatum von Lebensmitteln und Medikamenten.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Notfall-Checkliste</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {checklistItems.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Was tun bei Warnung?</CardTitle>
          <CardDescription>Schritt-für-Schritt-Anleitung</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <p className="font-medium">Ruhe bewahren</p>
                <p className="text-sm text-slate-600">
                  Panik hilft niemandem. Atmen Sie durch und handeln Sie besonnen.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <p className="font-medium">Informieren Sie sich</p>
                <p className="text-sm text-slate-600">
                  Schalten Sie das Radio ein oder öffnen Sie die NINA-App für aktuelle Informationen.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <p className="font-medium">Nächsten Schutzraum aufsuchen</p>
                <p className="text-sm text-slate-600">
                  Nutzen Sie dieses Portal oder die NINA-App, um den nächsten Schutzraum zu finden.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                4
              </span>
              <div>
                <p className="font-medium">Notfallgepäck mitnehmen</p>
                <p className="text-sm text-slate-600">
                  Nehmen Sie Ihren vorbereiteten Notfallrucksack und wichtige Dokumente mit.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                5
              </span>
              <div>
                <p className="font-medium">Anweisungen folgen</p>
                <p className="text-sm text-slate-600">
                  Folgen Sie den Anweisungen der Einsatzkräfte und bleiben Sie im Schutzraum,
                  bis Entwarnung gegeben wird.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
