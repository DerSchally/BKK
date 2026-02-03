import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { MapPin, Shield, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect authenticated users to their role-specific dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'operator':
          navigate('/operator');
          break;
        case 'municipal_admin':
        case 'state_admin':
        case 'federal_admin':
          navigate('/admin');
          break;
        case 'crisis_manager':
          navigate('/crisis');
          break;
        default:
          // Citizens stay on home page
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">
          Schutzraum-Portal Deutschland
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Finden Sie Schutzräume in Ihrer Nähe. Informieren Sie sich über Standorte,
          Kapazitäten und Ausstattung öffentlicher Schutzeinrichtungen.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/map">
              <MapPin className="mr-2 h-5 w-5" />
              Schutzräume finden
            </Link>
          </Button>
          {!isAuthenticated && (
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Anmelden</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-blue-600">53</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Registrierte Schutzräume</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-green-600">142.500</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Gesamtkapazität</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-amber-600">16</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Bundesländer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold text-slate-600">24/7</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Verfügbarkeit</p>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <MapPin className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle>Standortsuche</CardTitle>
            <CardDescription>
              Finden Sie Schutzräume in Ihrer Nähe mit unserer interaktiven Karte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/map">Karte öffnen</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-10 h-10 text-green-600 mb-2" />
            <CardTitle>Kapazitäten</CardTitle>
            <CardDescription>
              Prüfen Sie verfügbare Plätze und Ausstattungsmerkmale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/info">Mehr erfahren</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Building2 className="w-10 h-10 text-amber-600 mb-2" />
            <CardTitle>Vorbereitung</CardTitle>
            <CardDescription>
              Informationen zur Vorbereitung auf den Ernstfall
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/preparation">Checkliste ansehen</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Offizielles Portal des Bundesamts für Bevölkerungsschutz
              </h3>
              <p className="text-blue-700 text-sm">
                Dieses Portal wird vom BBK (Bundesamt für Bevölkerungsschutz und Katastrophenhilfe)
                betrieben und enthält verifizierte Informationen zu Schutzräumen in Deutschland.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
