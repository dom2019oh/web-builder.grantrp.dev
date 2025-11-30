import { useState, useCallback, useRef } from 'react';

interface Component {
  id: string;
  component_type: string;
  props: any;
  position_x?: number;
  position_y?: number;
  width?: number;
  height?: number;
  z_index?: number;
}

interface HistoryState {
  components: Component[];
  timestamp: number;
}

export const useEditorHistory = (initialState: Component[]) => {
  const [history, setHistory] = useState<HistoryState[]>([{ components: initialState, timestamp: Date.now() }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPerformingAction = useRef(false);

  const addToHistory = useCallback((components: Component[]) => {
    if (isPerformingAction.current) return;

    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push({ components: JSON.parse(JSON.stringify(components)), timestamp: Date.now() });
      
      // Limit history to last 50 states
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    setCurrentIndex((prev) => Math.min(prev + 1, 49));
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isPerformingAction.current = true;
      setCurrentIndex((prev) => prev - 1);
      const previousState = history[currentIndex - 1];
      setTimeout(() => {
        isPerformingAction.current = false;
      }, 100);
      return previousState.components;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isPerformingAction.current = true;
      setCurrentIndex((prev) => prev + 1);
      const nextState = history[currentIndex + 1];
      setTimeout(() => {
        isPerformingAction.current = false;
      }, 100);
      return nextState.components;
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { addToHistory, undo, redo, canUndo, canRedo };
};
