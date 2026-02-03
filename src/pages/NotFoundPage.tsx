import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 p-8">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <MapPin className="w-10 h-10 text-blue-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Seite nicht gefunden</h1>
          <p className="text-slate-600 max-w-md">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
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
