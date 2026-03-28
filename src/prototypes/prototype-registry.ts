// ── Prototype Registry ──
// Central registry for all prototype components, grouped by platform + folder.

import type { ComponentType } from 'react';

export interface PrototypeEntry {
  id: string;
  name: string;
  description: string;
  icon: string;
  platform: 'medipim' | 'lochting';
  /** Optional folder/group name (e.g. "Dashboard", "Product Detail") */
  folder?: string;
  component: ComponentType;
  createdAt: string;
}

export interface PrototypeFolder {
  name: string;
  prototypes: PrototypeEntry[];
}

export interface PlatformGroup {
  platformId: string;
  platformName: string;
  icon: string;
  folders: PrototypeFolder[];
  ungrouped: PrototypeEntry[];
}

// ── Registry ──

import { MedipimSaasShowcase } from '../pages/prototypes/MedipimSaasShowcase';

const REGISTRY: PrototypeEntry[] = [
  {
    id: 'medipim-saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Full SaaS dashboard prototype with buttons, cards, inputs, data display, and navigation elements.',
    icon: 'dashboard',
    platform: 'medipim',
    folder: 'Dashboard',
    component: MedipimSaasShowcase,
    createdAt: '2026-03-20',
  },
];

// ── Helpers ──

const PLATFORM_META: Record<string, { name: string; icon: string }> = {
  medipim: { name: 'Medipim', icon: 'inventory_2' },
  lochting: { name: 'Lochting', icon: 'storefront' },
};

export function getAllPrototypes(): PrototypeEntry[] {
  return REGISTRY;
}

export function getPrototype(id: string): PrototypeEntry | undefined {
  return REGISTRY.find((p) => p.id === id);
}

export function getPrototypesByPlatform(): PlatformGroup[] {
  const platforms = ['medipim', 'lochting'] as const;

  return platforms.map((platformId) => {
    const meta = PLATFORM_META[platformId];
    const entries = REGISTRY.filter((p) => p.platform === platformId);

    // Group by folder
    const folderMap = new Map<string, PrototypeEntry[]>();
    const ungrouped: PrototypeEntry[] = [];

    for (const entry of entries) {
      if (entry.folder) {
        const list = folderMap.get(entry.folder) ?? [];
        list.push(entry);
        folderMap.set(entry.folder, list);
      } else {
        ungrouped.push(entry);
      }
    }

    const folders: PrototypeFolder[] = Array.from(folderMap.entries()).map(
      ([name, prototypes]) => ({ name, prototypes }),
    );

    return {
      platformId,
      platformName: meta.name,
      icon: meta.icon,
      folders,
      ungrouped,
    };
  });
}

export function getPrototypesForPlatform(platformId: string): PrototypeEntry[] {
  return REGISTRY.filter((p) => p.platform === platformId);
}
