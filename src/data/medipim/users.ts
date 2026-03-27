import type { User } from '../types';

export const MEDIPIM_USERS: User[] = [
  {
    id: 'usr-001',
    name: 'Jan De Smedt',
    email: 'jan.desmedt@medipim.be',
    role: 'admin',
    lastLogin: '2026-03-27T09:15:00Z',
  },
  {
    id: 'usr-002',
    name: 'Sophie Willems',
    email: 'sophie.willems@medipim.be',
    role: 'editor',
    lastLogin: '2026-03-26T16:42:00Z',
  },
  {
    id: 'usr-003',
    name: 'Pieter Van den Broeck',
    email: 'pieter.vandenbroeck@medipim.be',
    role: 'editor',
    lastLogin: '2026-03-27T08:30:00Z',
  },
  {
    id: 'usr-004',
    name: 'Leen Jacobs',
    email: 'leen.jacobs@medipim.be',
    role: 'viewer',
    lastLogin: '2026-03-25T11:20:00Z',
  },
  {
    id: 'usr-005',
    name: 'Thomas Peeters',
    email: 'thomas.peeters@medipim.be',
    role: 'viewer',
    lastLogin: '2026-03-24T14:55:00Z',
  },
];
