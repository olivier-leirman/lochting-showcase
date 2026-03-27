import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadExperimentalComponents,
  saveExperimentalComponent,
  deleteExperimentalComponent,
  createExperimentalComponent,
  getExperimentalComponent,
  getExperimentalByStatus,
  updateExperimentalStatus,
  type ExperimentalComponent,
} from './experimental-components';

const STORAGE_KEY = 'bw-experimental-components';

function makeComponent(overrides: Partial<ExperimentalComponent> = {}): ExperimentalComponent {
  return {
    id: 'test-1',
    name: 'Test Component',
    description: 'A test component',
    category: 'actions',
    status: 'draft',
    sourceComponentId: 'button',
    brandId: 'lochting',
    styleDefinitionId: null,
    notes: [],
    tags: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('experimental-components', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadExperimentalComponents', () => {
    it('returns empty array when nothing stored', () => {
      expect(loadExperimentalComponents()).toEqual([]);
    });

    it('returns stored components', () => {
      const comps = [makeComponent()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comps));
      expect(loadExperimentalComponents()).toEqual(comps);
    });

    it('returns empty array on invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, '{invalid}');
      expect(loadExperimentalComponents()).toEqual([]);
    });
  });

  describe('saveExperimentalComponent', () => {
    it('saves a new component', () => {
      const comp = makeComponent();
      saveExperimentalComponent(comp);
      const stored = loadExperimentalComponents();
      expect(stored).toHaveLength(1);
      expect(stored[0].name).toBe('Test Component');
    });

    it('upserts existing component by id', () => {
      saveExperimentalComponent(makeComponent());
      saveExperimentalComponent(makeComponent({ name: 'Updated' }));
      const stored = loadExperimentalComponents();
      expect(stored).toHaveLength(1);
      expect(stored[0].name).toBe('Updated');
    });

    it('updates the updatedAt timestamp', () => {
      const comp = makeComponent({ updatedAt: '2020-01-01T00:00:00.000Z' });
      saveExperimentalComponent(comp);
      const stored = loadExperimentalComponents();
      expect(stored[0].updatedAt).not.toBe('2020-01-01T00:00:00.000Z');
    });
  });

  describe('deleteExperimentalComponent', () => {
    it('removes a component by id', () => {
      saveExperimentalComponent(makeComponent({ id: 'a' }));
      saveExperimentalComponent(makeComponent({ id: 'b' }));
      deleteExperimentalComponent('a');
      const stored = loadExperimentalComponents();
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe('b');
    });

    it('does nothing if id not found', () => {
      saveExperimentalComponent(makeComponent());
      deleteExperimentalComponent('nonexistent');
      expect(loadExperimentalComponents()).toHaveLength(1);
    });
  });

  describe('getExperimentalComponent', () => {
    it('returns component by id', () => {
      saveExperimentalComponent(makeComponent({ id: 'find-me' }));
      expect(getExperimentalComponent('find-me')?.id).toBe('find-me');
    });

    it('returns null if not found', () => {
      expect(getExperimentalComponent('missing')).toBeNull();
    });
  });

  describe('createExperimentalComponent', () => {
    it('generates id and timestamps', () => {
      const comp = createExperimentalComponent({
        name: 'New',
        description: 'desc',
        category: 'inputs',
        status: 'draft',
        sourceComponentId: 'textfield',
        brandId: 'medipim',
        styleDefinitionId: null,
        notes: ['test note'],
        tags: ['tag1'],
      });
      expect(comp.id).toBeTruthy();
      expect(comp.createdAt).toBeTruthy();
      expect(comp.notes).toEqual(['test note']);
      // Should be persisted
      expect(loadExperimentalComponents()).toHaveLength(1);
    });
  });

  describe('getExperimentalByStatus', () => {
    it('filters by status', () => {
      saveExperimentalComponent(makeComponent({ id: 'a', status: 'draft' }));
      saveExperimentalComponent(makeComponent({ id: 'b', status: 'review' }));
      saveExperimentalComponent(makeComponent({ id: 'c', status: 'accepted' }));
      expect(getExperimentalByStatus('draft')).toHaveLength(1);
      expect(getExperimentalByStatus('review')).toHaveLength(1);
      expect(getExperimentalByStatus('accepted')).toHaveLength(1);
    });
  });

  describe('updateExperimentalStatus', () => {
    it('updates status of existing component', () => {
      saveExperimentalComponent(makeComponent({ id: 'x', status: 'draft' }));
      updateExperimentalStatus('x', 'accepted');
      expect(getExperimentalComponent('x')?.status).toBe('accepted');
    });
  });
});
