import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const faqItems = [
  {
    question: 'Was ist ein Schutzraum?',
    answer:
      'Ein Schutzraum ist eine bauliche Anlage, die Menschen bei verschiedenen Gefahrenlagen Schutz bieten kann. Dies umfasst ehemalige Bunker, verstärkte Keller, U-Bahn-Stationen und andere unterirdische Strukturen, die bestimmte Schutzkriterien erfüllen.',
  },
  {
    question: 'Wie finde ich den nächsten Schutzraum?',
    answer:
      'Nutzen Sie die Karten-Funktion dieses Portals. Erlauben Sie den Standortzugriff, um automatisch die nächstgelegenen Schutzräume angezeigt zu bekommen. Sie können auch nach einer bestimmten Adresse suchen.',
  },
  {
    question: 'Sind alle Schutzräume jederzeit zugänglich?',
    answer:
      'Nein, nicht alle Schutzräume sind jederzeit zugänglich. Der Status wird im Portal angezeigt: "Aktiv" bedeutet sofort nutzbar, "Eingeschränkt" bedeutet nutzbar mit Limitierungen, und "Inaktiv" bedeutet derzeit nicht nutzbar. Im Krisenfall werden Schutzräume durch Behörden freigegeben.',
  },
  {
    question: 'Was sollte ich in einen Schutzraum mitnehmen?',
    answer:
      'Nehmen Sie Ihren Notfallrucksack mit: Wasser, haltbare Lebensmittel, wichtige Medikamente, Taschenlampe, batteriebetriebenes Radio, Powerbank, wichtige Dokumente (Kopien) und Bargeld. Eine detaillierte Checkliste finden Sie unter "Vorbereitung".',
  },
  {
    question: 'Wie lange muss ich in einem Schutzraum bleiben?',
    answer:
      'Die Aufenthaltsdauer hängt von der Art der Gefährdung ab. Folgen Sie immer den Anweisungen der Behörden. Verlassen Sie den Schutzraum erst, wenn eine offizielle Entwarnung gegeben wurde.',
  },
  {
    question: 'Sind Schutzräume barrierefrei?',
    answer:
      'Nicht alle Schutzräume sind barrierefrei. In der Detailansicht jedes Schutzraums sehen Sie Informationen zur Barrierefreiheit, z.B. ob ein Aufzug vorhanden ist oder ob er ebenerdig zugänglich ist.',
  },
  {
    question: 'Was passiert mit meinem Haustier?',
    answer:
      'Die Regelungen für Haustiere variieren je nach Schutzraum. Grundsätzlich sollten Sie sich auf den Notfall vorbereiten und auch für Ihr Tier Vorsorge treffen. Informieren Sie sich bei Ihrer Gemeinde über spezielle Regelungen.',
  },
  {
    question: 'Wie werde ich im Notfall gewarnt?',
    answer:
      'Die Warnung erfolgt über verschiedene Kanäle: Sirenen, die Warn-App NINA, Radio und Fernsehen, sowie Lautsprecherdurchsagen. Installieren Sie die NINA-App, um ortsbasierte Warnungen zu erhalten.',
  },
  {
    question: 'Kann ich selbst einen Schutzraum registrieren?',
    answer:
      'Wenn Sie Eigentümer oder Betreiber einer geeigneten Einrichtung sind, können Sie sich als Betreiber anmelden und Ihren Schutzraum zur Prüfung einreichen. Die Registrierung wird von den zuständigen Behörden geprüft und freigegeben.',
  },
  {
    question: 'Was unterscheidet verschiedene Schutztypen?',
    answer:
      'Es gibt verschiedene Schutztypen: Bunker bieten den höchsten Schutz, U-Bahn-Stationen und Tunnel erweiterten Schutz, während Tiefgaragen und Keller grundlegenden Schutz vor Umweltgefahren bieten. Die Details finden Sie in der Schutzraum-Detailansicht.',
  },
];

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Häufige Fragen (FAQ)</h1>
        <p className="text-slate-600">
          Hier finden Sie Antworten auf die am häufigsten gestellten Fragen.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Fragen durchsuchen..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fragen & Antworten</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFAQ.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              Keine Fragen gefunden. Versuchen Sie einen anderen Suchbegriff.
            </p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <p className="text-center text-slate-600">
            Ihre Frage wurde nicht beantwortet?{' '}
            <a href="mailto:info@bbk.bund.de" className="text-blue-600 hover:underline">
              Kontaktieren Sie uns
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
