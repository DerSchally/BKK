import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-orange-500" />
              <span className="font-bold">Schutzraum-Portal</span>
            </div>
            <p className="text-sm text-slate-600">
              Das zentrale Portal für Schutzräume in Deutschland. Eine Initiative des BBK.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/map" className="text-slate-600 hover:text-slate-900">
                  Schutzraum finden
                </Link>
              </li>
              <li>
                <Link to="/info" className="text-slate-600 hover:text-slate-900">
                  Informationen
                </Link>
              </li>
              <li>
                <Link to="/preparation" className="text-slate-600 hover:text-slate-900">
                  Vorbereitung
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 hover:text-slate-900">
                  Häufige Fragen
                </Link>
              </li>
            </ul>
          </div>

          {/* For Operators */}
          <div>
            <h4 className="font-semibold mb-4">Für Betreiber</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-slate-600 hover:text-slate-900">
                  Anmelden
                </Link>
              </li>
              <li>
                <Link to="/info/registration" className="text-slate-600 hover:text-slate-900">
                  Schutzraum registrieren
                </Link>
              </li>
              <li>
                <Link to="/info/requirements" className="text-slate-600 hover:text-slate-900">
                  Anforderungen
                </Link>
              </li>
              <li>
                <Link to="/info/funding" className="text-slate-600 hover:text-slate-900">
                  Fördermöglichkeiten
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/imprint" className="text-slate-600 hover:text-slate-900">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-slate-600 hover:text-slate-900">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/legal/accessibility" className="text-slate-600 hover:text-slate-900">
                  Barrierefreiheit
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-slate-600 hover:text-slate-900">
                  Nutzungsbedingungen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Bundesamt für Bevölkerungsschutz und Katastrophenhilfe (BBK)
          </p>
          <p className="mt-1 text-xs">
            Dies ist eine Demo-Anwendung zu Präsentationszwecken.
          </p>
        </div>
      </div>
    </footer>
  );
}
