import { NavLink, useLocation } from 'react-router-dom';
import {
  Map,
  Building2,
  LayoutDashboard,
  FileCheck,
  Users,
  BarChart3,
  Settings,
  AlertTriangle,
  Info,
  HelpCircle,
  ClipboardList,
  MessageSquare,
  Wallet,
  PlusCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore, useUIStore } from '@/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { UserRole } from '@/types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const citizenNav: NavItem[] = [
  { title: 'Karte', href: '/map', icon: <Map className="h-5 w-5" /> },
  { title: 'Informationen', href: '/info', icon: <Info className="h-5 w-5" /> },
  { title: 'Vorbereitung', href: '/preparation', icon: <ClipboardList className="h-5 w-5" /> },
  { title: 'FAQ', href: '/faq', icon: <HelpCircle className="h-5 w-5" /> },
];

const operatorNav: NavItem[] = [
  { title: 'Übersicht', href: '/operator', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Meine Schutzräume', href: '/operator/shelters', icon: <Building2 className="h-5 w-5" /> },
  { title: 'Neuer Schutzraum', href: '/operator/shelters/new', icon: <PlusCircle className="h-5 w-5" /> },
  { title: 'Wartung', href: '/operator/maintenance', icon: <ClipboardList className="h-5 w-5" /> },
  { title: 'Nachrichten', href: '/operator/messages', icon: <MessageSquare className="h-5 w-5" /> },
];

const adminNav: NavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Genehmigungen', href: '/admin/approvals', icon: <FileCheck className="h-5 w-5" /> },
  { title: 'Schutzräume', href: '/admin/shelters', icon: <Building2 className="h-5 w-5" /> },
  { title: 'Fördermittel', href: '/admin/funding', icon: <Wallet className="h-5 w-5" />, roles: ['state_admin', 'federal_admin'] },
  { title: 'Benutzer', href: '/admin/users', icon: <Users className="h-5 w-5" />, roles: ['federal_admin'] },
  { title: 'Analysen', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  { title: 'Einstellungen', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

const crisisNav: NavItem[] = [
  { title: 'Krisenstab', href: '/crisis', icon: <AlertTriangle className="h-5 w-5" /> },
  { title: 'Live-Status', href: '/crisis/status', icon: <BarChart3 className="h-5 w-5" /> },
  { title: 'Broadcasts', href: '/crisis/broadcasts', icon: <MessageSquare className="h-5 w-5" /> },
  { title: 'Protokoll', href: '/crisis/log', icon: <ClipboardList className="h-5 w-5" /> },
];

function NavItems({ items, collapsed }: { items: NavItem[]; collapsed: boolean }) {
  const { user } = useAuthStore();
  const location = useLocation();

  const filteredItems = items.filter((item) => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  return (
    <nav className="space-y-1 px-2">
      {filteredItems.map((item) => {
        const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              collapsed && 'justify-center px-2'
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        );
      })}
    </nav>
  );
}

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const { user, isAuthenticated } = useAuthStore();
  const { crisisMode } = useUIStore();

  const getNavItems = (): { title: string; items: NavItem[] }[] => {
    if (!isAuthenticated || !user) {
      return [{ title: 'Navigation', items: citizenNav }];
    }

    switch (user.role) {
      case 'citizen':
        return [{ title: 'Navigation', items: citizenNav }];
      case 'operator':
        return [
          { title: 'Betreiber', items: operatorNav },
          { title: 'Öffentlich', items: citizenNav },
        ];
      case 'municipal_admin':
      case 'state_admin':
      case 'federal_admin':
        return [
          { title: 'Administration', items: adminNav },
          { title: 'Öffentlich', items: citizenNav },
        ];
      case 'crisis_manager':
        return [
          { title: 'Krisenmodus', items: crisisNav },
          { title: 'Administration', items: adminNav },
          { title: 'Öffentlich', items: citizenNav },
        ];
      default:
        return [{ title: 'Navigation', items: citizenNav }];
    }
  };

  const navGroups = getNavItems();

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 py-4">
        {navGroups.map((group, index) => (
          <div key={group.title} className={cn(index > 0 && 'mt-6')}>
            {!collapsed && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {group.title}
              </h3>
            )}
            <NavItems items={group.items} collapsed={collapsed} />
          </div>
        ))}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed && (
          <div className="text-xs text-slate-400 text-center">
            {crisisMode ? (
              <span className="text-orange-600 font-medium">Krisenmodus aktiv</span>
            ) : (
              <span>Demo-Version</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r bg-white transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarContent collapsed={sidebarCollapsed} />
    </aside>
  );
}

export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
