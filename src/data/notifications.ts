import type { Notification } from '@/types';

export const notifications: Notification[] = [
  // Approval requests for admins
  {
    id: 'notif-001',
    visibleToRoles: ['municipal_admin', 'state_admin', 'federal_admin'],
    type: 'approval_request',
    title: 'Neuer Schutzraum zur Genehmigung',
    message: 'Ein neuer Schutzraum "Neuer Schutzraum Friedrichshain" wurde zur Genehmigung eingereicht.',
    createdAt: '2024-10-01T10:30:00Z',
    read: false,
    link: '/admin/approvals/shelter-berlin-009',
    shelterId: 'shelter-berlin-009',
  },
  {
    id: 'notif-002',
    visibleToRoles: ['municipal_admin', 'state_admin', 'federal_admin'],
    type: 'approval_request',
    title: 'Neuer Schutzraum zur Genehmigung',
    message: 'Ein neuer Schutzraum "Neubau Schutzraum Giesing" wurde zur Genehmigung eingereicht.',
    createdAt: '2024-09-28T14:15:00Z',
    read: false,
    link: '/admin/approvals/shelter-munich-008',
    shelterId: 'shelter-munich-008',
  },

  // Status change notifications
  {
    id: 'notif-003',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'status_change',
    title: 'Schutzraum-Status geändert',
    message: 'Der Status von "Bunker Anhalter Bahnhof" wurde auf "Inaktiv" geändert.',
    createdAt: '2024-09-25T09:00:00Z',
    read: true,
    shelterId: 'shelter-berlin-005',
  },
  {
    id: 'notif-004',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'status_change',
    title: 'Schutzraum-Status geändert',
    message: 'Der Status von "Keller Rathaus Charlottenburg" wurde auf "Eingeschränkt" geändert.',
    createdAt: '2024-09-20T11:30:00Z',
    read: true,
    shelterId: 'shelter-berlin-004',
  },

  // Warning notifications
  {
    id: 'notif-005',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'warning',
    title: 'Inspektion überfällig',
    message: 'Die Inspektion für "Bunker Wilhelmsburg" ist seit 30 Tagen überfällig.',
    createdAt: '2024-10-02T08:00:00Z',
    read: false,
    shelterId: 'shelter-hamburg-007',
  },
  {
    id: 'notif-006',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'warning',
    title: 'Inspektion in Kürze fällig',
    message: 'Die Inspektion für "Bunker Sachsenhausen" ist in 14 Tagen fällig.',
    createdAt: '2024-10-01T10:00:00Z',
    read: false,
    shelterId: 'shelter-frankfurt-006',
  },

  // Info notifications
  {
    id: 'notif-007',
    visibleToRoles: ['citizen', 'operator', 'municipal_admin', 'state_admin', 'federal_admin', 'crisis_manager'],
    type: 'info',
    title: 'Neue Schutzräume verfügbar',
    message: '5 neue Schutzräume wurden im Raum Berlin genehmigt und sind nun auf der Karte sichtbar.',
    createdAt: '2024-09-15T16:00:00Z',
    read: true,
  },
  {
    id: 'notif-008',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'info',
    title: 'Systemwartung geplant',
    message: 'Am 15.10.2024 zwischen 02:00 und 04:00 Uhr findet eine geplante Systemwartung statt.',
    createdAt: '2024-10-01T12:00:00Z',
    read: false,
  },

  // Success notifications
  {
    id: 'notif-009',
    visibleToRoles: ['operator'],
    type: 'success',
    title: 'Schutzraum genehmigt',
    message: 'Ihr Schutzraum "U-Bahnhof Alexanderplatz" wurde erfolgreich genehmigt.',
    createdAt: '2024-09-10T14:30:00Z',
    read: true,
    shelterId: 'shelter-berlin-002',
  },
  {
    id: 'notif-010',
    visibleToRoles: ['operator'],
    type: 'success',
    title: 'Inspektion erfolgreich',
    message: 'Die Inspektion für "Bunker Gesundbrunnen" wurde erfolgreich abgeschlossen.',
    createdAt: '2024-09-05T11:00:00Z',
    read: true,
    shelterId: 'shelter-berlin-001',
  },

  // Alert notifications (for crisis mode)
  {
    id: 'notif-011',
    visibleToRoles: ['crisis_manager', 'federal_admin'],
    type: 'alert',
    title: 'Krisenmodus-Test erfolgreich',
    message: 'Der letzte Krisenmodus-Test wurde erfolgreich durchgeführt. Alle Systeme funktionieren einwandfrei.',
    createdAt: '2024-09-01T09:00:00Z',
    read: true,
  },
  {
    id: 'notif-012',
    visibleToRoles: ['municipal_admin', 'state_admin', 'federal_admin'],
    type: 'warning',
    title: 'Kapazitätswarnung',
    message: 'Die Schutzraumkapazität im Bezirk Berlin-Mitte liegt unter 70% der empfohlenen Abdeckung.',
    createdAt: '2024-09-28T15:00:00Z',
    read: false,
  },

  // More approval requests
  {
    id: 'notif-013',
    visibleToRoles: ['municipal_admin', 'state_admin', 'federal_admin'],
    type: 'approval_request',
    title: 'Statusänderung zur Genehmigung',
    message: 'Der Betreiber von "Bunker Humboldthain" hat eine Statusänderung zu "Aktiv" beantragt.',
    createdAt: '2024-10-02T11:00:00Z',
    read: false,
    shelterId: 'shelter-berlin-008',
  },

  // Info for operators
  {
    id: 'notif-014',
    visibleToRoles: ['operator'],
    type: 'info',
    title: 'Neue Förderrichtlinien',
    message: 'Die neuen Förderrichtlinien für Schutzraumsanierung sind ab sofort verfügbar.',
    createdAt: '2024-09-20T10:00:00Z',
    read: true,
  },

  // Warning for specific shelter
  {
    id: 'notif-015',
    visibleToRoles: ['operator', 'municipal_admin', 'state_admin', 'federal_admin'],
    type: 'warning',
    title: 'Daten unvollständig',
    message: 'Die Daten für "Bunker Neustadt" sind unvollständig. Bitte ergänzen Sie die fehlenden Informationen.',
    createdAt: '2024-10-01T08:30:00Z',
    read: false,
    shelterId: 'shelter-dresden-003',
  },
];

// Helper functions
export const getNotificationsByRole = (role: string): Notification[] => {
  return notifications.filter((n) =>
    n.visibleToRoles.includes(role as any)
  );
};

export const getUnreadNotifications = (role: string): Notification[] => {
  return getNotificationsByRole(role).filter((n) => !n.read);
};

export const getUnreadCount = (role: string): number => {
  return getUnreadNotifications(role).length;
};

export const markAsRead = (notificationId: string): void => {
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
};

export const markAllAsRead = (role: string): void => {
  getNotificationsByRole(role).forEach((n) => {
    n.read = true;
  });
};
