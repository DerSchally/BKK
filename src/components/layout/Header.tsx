import { Link } from 'react-router-dom';
import {
  Shield,
  Menu,
  Bell,
  Search,
  AlertTriangle,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, useUIStore } from '@/store';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { crisisMode, toggleCrisisMode, toggleSidebar } = useUIStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        crisisMode && 'bg-orange-600 border-orange-700'
      )}
    >
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Shield
            className={cn(
              'h-8 w-8',
              crisisMode ? 'text-white' : 'text-orange-500'
            )}
          />
          <div className="hidden sm:block">
            <span
              className={cn(
                'font-bold text-lg',
                crisisMode && 'text-white'
              )}
            >
              Schutzraum-Portal
            </span>
          </div>
        </Link>

        {/* Crisis Mode Indicator */}
        {crisisMode && (
          <Badge variant="destructive" className="bg-red-600 animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            KRISENMODUS AKTIV
          </Badge>
        )}

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Schutzraum suchen..."
              className={cn(
                'pl-9',
                crisisMode && 'bg-orange-700 border-orange-500 text-white placeholder:text-orange-200'
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Crisis Mode Toggle (for admins) */}
          {user && ['federal_admin', 'crisis_manager'].includes(user.role) && (
            <Button
              variant={crisisMode ? 'destructive' : 'outline'}
              size="sm"
              onClick={toggleCrisisMode}
              className="hidden sm:flex"
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              {crisisMode ? 'Krisenmodus beenden' : 'Krisenmodus'}
            </Button>
          )}

          {/* Notifications */}
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className={cn('h-5 w-5', crisisMode && 'text-white')} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
          )}

          {/* User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={cn(
                      'bg-slate-200',
                      crisisMode && 'bg-orange-700 text-white'
                    )}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Einstellungen
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Anmelden
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
