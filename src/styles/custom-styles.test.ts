import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadCustomStyles,
  saveCustomStyle,
  deleteCustomStyle,
  getAllStyles,
  getAllStylesById,
} from './custom-styles';
import { ALL_STYLES } from './index';
import type { StyleDefinition } from './types';

const STORAGE_KEY = 'bw-custom-styles';

function makeStyle(id: string, name: string): StyleDefinition {
  return {
    id,
    name,
    description: 'Test style',
    surface: { blur: 0, cardBg: '', cardBorder: '', inputBg: '' },
    borderRadius: { mode: 'absolute', sm: 8, md: 12, lg: 16 },
    shadows: { useInset: false, intensity: 1, brandTinted: false },
    elevation: { none: 'none', low: 'none', medium: 'none', high: 'none' },
    interaction: {
      hoverEffect: 'lift',
      activeEffect: 'scale-down',
      focusRing: 'ring-2px-brand',
      transitionDuration: '0.2s',
      transitionEasing: 'ease',
    },
    buttonPrimary: 'solid',
    buttonSecondary: 'gradient',
    cardTreatment: 'elevated',
    inputTreatment: 'filled-sunken',
  };
}

describe('custom-styles', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadCustomStyles', () => {
    it('returns empty array when nothing stored', () => {
      expect(loadCustomStyles()).toEqual([]);
    });

    it('returns stored styles', () => {
      const styles = [makeStyle('my-style', 'My Style')];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));
      expect(loadCustomStyles()).toHaveLength(1);
      expect(loadCustomStyles()[0].name).toBe('My Style');
    });

    it('handles corrupted JSON gracefully', () => {
      localStorage.setItem(STORAGE_KEY, 'not json');
      expect(loadCustomStyles()).toEqual([]);
    });
  });

  describe('saveCustomStyle', () => {
    it('saves a new style', () => {
      saveCustomStyle(makeStyle('new', 'New'));
      expect(loadCustomStyles()).toHaveLength(1);
    });

    it('updates existing style by id', () => {
      saveCustomStyle(makeStyle('a', 'Original'));
      saveCustomStyle(makeStyle('a', 'Updated'));
      const styles = loadCustomStyles();
      expect(styles).toHaveLength(1);
      expect(styles[0].name).toBe('Updated');
    });
  });

  describe('deleteCustomStyle', () => {
    it('removes a style by id', () => {
      saveCustomStyle(makeStyle('a', 'A'));
      saveCustomStyle(makeStyle('b', 'B'));
      deleteCustomStyle('a');
      expect(loadCustomStyles()).toHaveLength(1);
      expect(loadCustomStyles()[0].id).toBe('b');
    });
  });

  describe('getAllStyles', () => {
    it('merges built-in and custom styles', () => {
      saveCustomStyle(makeStyle('custom-1', 'Custom'));
      const all = getAllStyles();
      expect(all.length).toBe(ALL_STYLES.length + 1);
      expect(all.find(s => s.id === 'custom-1')).toBeTruthy();
    });

    it('includes all built-in styles', () => {
      const all = getAllStyles();
      for (const builtin of ALL_STYLES) {
        expect(all.find(s => s.id === builtin.id)).toBeTruthy();
      }
    });
  });

  describe('getAllStylesById', () => {
    it('returns lookup map', () => {
      saveCustomStyle(makeStyle('custom-1', 'Custom'));
      const map = getAllStylesById();
      expect(map['custom-1']).toBeTruthy();
      expect(map['flat']).toBeTruthy(); // built-in
    });
  });
});
