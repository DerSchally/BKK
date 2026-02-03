import type { User } from '@/types';

export const users: User[] = [
  {
    id: 'user-1',
    email: 'buerger@demo.de',
    name: 'Maria Schmidt',
    role: 'citizen',
  },
  {
    id: 'user-2',
    email: 'betreiber@demo.de',
    name: 'Thomas Müller',
    role: 'operator',
  },
  {
    id: 'user-3',
    email: 'kommune@demo.de',
    name: 'Sandra Weber',
    role: 'municipal_admin',
    municipality: 'Berlin-Mitte',
    state: 'Berlin',
  },
  {
    id: 'user-4',
    email: 'land@demo.de',
    name: 'Michael Bauer',
    role: 'state_admin',
    state: 'Berlin',
  },
  {
    id: 'user-5',
    email: 'bbk@demo.de',
    name: 'Dr. Anna Richter',
    role: 'federal_admin',
  },
  {
    id: 'user-6',
    email: 'krisenstab@demo.de',
    name: 'Klaus Hoffmann',
    role: 'crisis_manager',
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};
