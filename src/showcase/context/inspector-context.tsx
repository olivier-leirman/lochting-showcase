import { createContext, useContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import { useBrand } from '../../theme/brand-context';
import { buildTokenMap, type TokenMap } from '../../theme/token-resolver';
import type { InspectedGroup, InspectedProperty } from '../utils/style-extraction';

export type { InspectedGroup, InspectedProperty };

interface InspectorContextValue {
  inspectorEnabled: boolean;
  toggleInspector: () => void;
  hoveredElement: HTMLElement | null;
  setHovered: (el: HTMLElement | null) => void;
  selectedElement: HTMLElement | null;
  selectedLabel: string | null;
  selectedGroups: InspectedGroup[];
  selectElement: (el: HTMLElement | null, label: string | null, groups: InspectedGroup[]) => void;
  clearSelection: () => void;
  tokenMap: TokenMap;
}

const InspectorContext = createContext<InspectorContextValue | null>(null);

export function InspectorProvider({ children }: { children: ReactNode }) {
  const { brand, effects } = useBrand();
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [hoveredElement, setHovered] = useState<HTMLElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<InspectedGroup[]>([]);

  const tokenMap = useMemo(() => buildTokenMap(brand, effects), [brand, effects]);

  const toggleInspector = useCallback(() => {
    setInspectorEnabled(prev => {
      if (prev) {
        // Turning off — clear everything
        setHovered(null);
        setSelectedElement(null);
        setSelectedLabel(null);
        setSelectedGroups([]);
      }
      return !prev;
    });
  }, []);

  const selectElement = useCallback((el: HTMLElement | null, label: string | null, groups: InspectedGroup[]) => {
    setSelectedElement(el);
    setSelectedLabel(label);
    setSelectedGroups(groups);
    setHovered(null);
    // Auto-enable inspector when selecting
    if (el) setInspectorEnabled(true);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElement(null);
    setSelectedLabel(null);
    setSelectedGroups([]);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'i' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toggleInspector();
      }
      if (e.key === 'Escape' && selectedElement) {
        clearSelection();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggleInspector, clearSelection, selectedElement]);

  const value = useMemo(() => ({
    inspectorEnabled,
    toggleInspector,
    hoveredElement,
    setHovered,
    selectedElement,
    selectedLabel,
    selectedGroups,
    selectElement,
    clearSelection,
    tokenMap,
  }), [inspectorEnabled, toggleInspector, hoveredElement, selectedElement, selectedLabel, selectedGroups, selectElement, clearSelection, tokenMap]);

  return <InspectorContext.Provider value={value}>{children}</InspectorContext.Provider>;
}

export function useInspector(): InspectorContextValue {
  const ctx = useContext(InspectorContext);
  if (!ctx) throw new Error('useInspector must be used within InspectorProvider');
  return ctx;
}
