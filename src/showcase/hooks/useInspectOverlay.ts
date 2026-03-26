import { useEffect, useCallback, useState, type RefObject } from 'react';
import { useInspector } from '../context/inspector-context';
import { findMuiElement, getElementLabel, extractStyleGroups } from '../utils/style-extraction';

interface OverlayRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface InspectOverlayState {
  hoverRect: OverlayRect | null;
  hoverLabel: string | null;
  selectionRect: OverlayRect | null;
}

function getRelativeRect(el: Element, container: Element): OverlayRect {
  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    top: elRect.top - containerRect.top + container.scrollTop,
    left: elRect.left - containerRect.left + container.scrollLeft,
    width: elRect.width,
    height: elRect.height,
  };
}

export function useInspectOverlay(containerRef: RefObject<HTMLElement | null>): InspectOverlayState {
  const { inspectorEnabled, setHovered, selectElement, selectedElement, tokenMap } = useInspector();
  const [hoverRect, setHoverRect] = useState<OverlayRect | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [selectionRect, setSelectionRect] = useState<OverlayRect | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container || !inspectorEnabled) return;

    const target = e.target as Element;
    const muiEl = findMuiElement(target, container);
    if (muiEl) {
      setHovered(muiEl as HTMLElement);
      setHoverRect(getRelativeRect(muiEl, container));
      setHoverLabel(getElementLabel(muiEl));
    } else {
      setHovered(null);
      setHoverRect(null);
      setHoverLabel(null);
    }
  }, [containerRef, inspectorEnabled, setHovered]);

  const handleClick = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container || !inspectorEnabled) return;

    const target = e.target as Element;
    const muiEl = findMuiElement(target, container);
    if (muiEl) {
      e.stopPropagation();
      e.preventDefault();
      const label = getElementLabel(muiEl);
      const groups = extractStyleGroups(muiEl, tokenMap);
      selectElement(muiEl as HTMLElement, label, groups);
      setSelectionRect(getRelativeRect(muiEl, container));
      setHoverRect(null);
      setHoverLabel(null);
    }
  }, [containerRef, inspectorEnabled, selectElement, tokenMap]);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setHoverRect(null);
    setHoverLabel(null);
  }, [setHovered]);

  // Attach event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !inspectorEnabled) {
      setHoverRect(null);
      setHoverLabel(null);
      return;
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick, { capture: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick, { capture: true });
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, inspectorEnabled, handleMouseMove, handleClick, handleMouseLeave]);

  // Update selection rect when the selected element changes or is cleared
  useEffect(() => {
    const container = containerRef.current;
    if (!selectedElement || !container) {
      setSelectionRect(null);
      return;
    }
    setSelectionRect(getRelativeRect(selectedElement, container));
  }, [selectedElement, containerRef]);

  return { hoverRect, hoverLabel, selectionRect };
}
