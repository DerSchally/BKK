import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 p-8">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <ShieldX className="w-10 h-10 text-red-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Zugriff verweigert</h1>
          <p className="text-slate-600 max-w-md">
            Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
            Bitte wenden Sie sich an Ihren Administrator, wenn Sie glauben,
            dass dies ein Fehler ist.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/">Zur Startseite</Link>
          </Button>
          <Button asChild>
            <Link to="/map">Zur Karte</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
