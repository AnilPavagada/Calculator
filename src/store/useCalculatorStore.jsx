import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  input: "0", // Current input
  droppedButtons: JSON.parse(localStorage.getItem("droppedButtons")) || [], // Persisted dropped buttons
  history: [], // History stack for undo
  future: [], // Future stack for redo

  addButton: (label) =>
    set((state) => {
      const updatedDroppedButtons = [...state.droppedButtons, label];
      localStorage.setItem("droppedButtons", JSON.stringify(updatedDroppedButtons)); // Persist to localStorage
      return { droppedButtons: updatedDroppedButtons };
    }),

  clearInput: () => set({ input: "0" }),

  calculate: () =>
    set((state) => {
      try {
        const result = eval(state.input).toString(); // Perform calculation
        return { input: result };
      } catch {
        return { input: "Error" };
      }
    }),

  updateInput: (value) =>
    set((state) => {
      const updatedInput = state.input === "0" ? value : state.input + value;
      return { input: updatedInput };
    }),

  // Save current state to history before any state update
  saveState: () =>
    set((state) => {
      // Add current state to history
      const newHistory = [
        ...state.history,
        { input: state.input, droppedButtons: state.droppedButtons },
      ];
      return {
        history: newHistory,
        future: [], // Clear future stack on state change
      };
    }),

  // Undo function: restore the last valid state
  undo: () =>
    set((state) => {
      if (state.history.length > 0) {
        const lastHistory = state.history[state.history.length - 1]; // Get last history state
        return {
          input: lastHistory.input,
          droppedButtons: lastHistory.droppedButtons,
          history: state.history.slice(0, -1), // Remove last history item
          future: [{ input: state.input, droppedButtons: state.droppedButtons }, ...state.future], // Add to future stack
        };
      }
      return {}; // No history to undo
    }),

  // Redo function: restore the last undone state
  redo: () =>
    set((state) => {
      if (state.future.length > 0) {
        const lastFuture = state.future[0]; // Get last future state
        return {
          input: lastFuture.input,
          droppedButtons: lastFuture.droppedButtons,
          history: [...state.history, { input: state.input, droppedButtons: state.droppedButtons }], // Add to history
          future: state.future.slice(1), // Remove from future stack
        };
      }
      return {}; // No future to redo
    }),
}));

export default useCalculatorStore;
