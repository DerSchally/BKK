import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Building2, Landmark, Building, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store';
import { users } from '@/data';
import type { UserRole } from '@/types';

const roleIcons: Record<UserRole, React.ReactNode> = {
  citizen: <User className="h-6 w-6" />,
  operator: <Building2 className="h-6 w-6" />,
  municipal_admin: <Building className="h-6 w-6" />,
  state_admin: <Landmark className="h-6 w-6" />,
  federal_admin: <Shield className="h-6 w-6" />,
  crisis_manager: <AlertTriangle className="h-6 w-6" />,
};

const roleLabels: Record<UserRole, string> = {
  citizen: 'Bürger:in',
  operator: 'Betreiber',
  municipal_admin: 'Kommunale Verwaltung',
  state_admin: 'Landesverwaltung',
  federal_admin: 'BBK (Bundesebene)',
  crisis_manager: 'Krisenstab',
};

const roleDescriptions: Record<UserRole, string> = {
  citizen: 'Schutzräume finden und Informationen abrufen',
  operator: 'Eigene Schutzräume verwalten und registrieren',
  municipal_admin: 'Schutzräume der Kommune genehmigen und verwalten',
  state_admin: 'Landesweite Übersicht und Förderungen',
  federal_admin: 'Bundesweite Administration und Analysen',
  crisis_manager: 'Krisenmodus aktivieren und Broadcasts senden',
};

const roleColors: Record<UserRole, string> = {
  citizen: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
  operator: 'border-green-200 hover:border-green-400 hover:bg-green-50',
  municipal_admin: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
  state_admin: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
  federal_admin: 'border-red-200 hover:border-red-400 hover:bg-red-50',
  crisis_manager: 'border-orange-200 hover:border-orange-400 hover:bg-orange-50',
};

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleLogin = async (email: string, role: UserRole) => {
    setSelectedRole(role);
    const success = await login(email);
    if (success) {
      // Navigate based on role
      switch (role) {
        case 'citizen':
          navigate('/map');
          break;
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
          navigate('/');
      }
    }
  };

  const handlePublicAccess = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Shield className="h-10 w-10 text-orange-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Schutzraum-Portal</h1>
            <p className="text-slate-400 text-sm">Deutschland</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Demo-Zugang</h2>
            <p className="text-slate-300">
              Wählen Sie eine Rolle, um das Portal zu erkunden
            </p>
          </div>

          {/* Public Access Button */}
          <div className="mb-8 text-center">
            <Button
              size="lg"
              onClick={handlePublicAccess}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              <User className="mr-2 h-5 w-5" />
              Ohne Anmeldung fortfahren
            </Button>
            <p className="text-slate-400 text-sm mt-2">
              Öffentlicher Zugang zur Schutzraum-Karte
            </p>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-4 text-slate-400">
                oder als Demo-Benutzer anmelden
              </span>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card
                key={user.id}
                className={`cursor-pointer transition-all duration-200 ${roleColors[user.role]} ${
                  selectedRole === user.role && isLoading ? 'opacity-50' : ''
                }`}
                onClick={() => handleLogin(user.email, user.role)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      {roleIcons[user.role]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{roleLabels[user.role]}</CardTitle>
                      <CardDescription className="text-xs">{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{roleDescriptions[user.role]}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Demo: {user.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Notice */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Dies ist eine Demo-Umgebung. Alle Daten sind simuliert.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-slate-700">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          © 2024 BBK - Bundesamt für Bevölkerungsschutz und Katastrophenhilfe (Demo)
        </div>
      </footer>
    </div>
  );
}
