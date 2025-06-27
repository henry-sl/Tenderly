import { useState, useCallback, useRef } from 'react';
import { EditorHistory, EditorHistoryState } from '../types';

interface UseEditorHistoryProps {
  maxStates?: number;
  debounceMs?: number;
}

/**
 * Custom hook for managing editor history with undo/redo functionality
 */
export const useEditorHistory = ({ 
  maxStates = 50, 
  debounceMs = 1000 
}: UseEditorHistoryProps = {}) => {
  const [history, setHistory] = useState<EditorHistory>({
    states: [],
    currentIndex: -1,
    maxStates
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedStateRef = useRef<string>('');

  const addState = useCallback((content: string, title: string) => {
    // Create a unique key for this state to avoid duplicate saves
    const stateKey = `${title}:${content}`;
    
    // Don't save if it's the same as the last saved state
    if (stateKey === lastSavedStateRef.current) {
      return;
    }

    // Clear existing debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the state addition
    debounceTimeoutRef.current = setTimeout(() => {
      setHistory(prev => {
        const newState: EditorHistoryState = {
          content,
          title,
          timestamp: new Date()
        };

        // Remove any states after current index (when undoing and then making new changes)
        const newStates = prev.states.slice(0, prev.currentIndex + 1);
        
        // Add the new state
        newStates.push(newState);
        
        // Limit the number of states
        if (newStates.length > maxStates) {
          newStates.shift();
        }

        lastSavedStateRef.current = stateKey;

        return {
          ...prev,
          states: newStates,
          currentIndex: newStates.length - 1
        };
      });
    }, debounceMs);
  }, [maxStates, debounceMs]);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.currentIndex > 0) {
        return {
          ...prev,
          currentIndex: prev.currentIndex - 1
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.currentIndex < prev.states.length - 1) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1
        };
      }
      return prev;
    });
  }, []);

  const getCurrentState = useCallback(() => {
    if (history.currentIndex >= 0 && history.currentIndex < history.states.length) {
      return history.states[history.currentIndex];
    }
    return null;
  }, [history]);

  const canUndo = history.currentIndex > 0;
  const canRedo = history.currentIndex < history.states.length - 1;

  const clearHistory = useCallback(() => {
    setHistory({
      states: [],
      currentIndex: -1,
      maxStates
    });
    lastSavedStateRef.current = '';
  }, [maxStates]);

  // Initialize with first state
  const initializeHistory = useCallback((content: string, title: string) => {
    const initialState: EditorHistoryState = {
      content,
      title,
      timestamp: new Date()
    };

    setHistory({
      states: [initialState],
      currentIndex: 0,
      maxStates
    });

    lastSavedStateRef.current = `${title}:${content}`;
  }, [maxStates]);

  return {
    addState,
    undo,
    redo,
    getCurrentState,
    canUndo,
    canRedo,
    clearHistory,
    initializeHistory,
    history
  };
};