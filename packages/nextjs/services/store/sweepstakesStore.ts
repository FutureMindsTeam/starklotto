import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SweepstakesEntry {
  id: number;
  startDate: string;
  endDate: string;
  drawDate: string;
  ticketPrice: number;
  mainPrize: number;
  secondaryPrize: number;
  protocolFee: number;
  createdAt: number;
  updatedAt: number;
}

interface SweepstakesState {
  sweepstakes: SweepstakesEntry[];
  currentEntry: Partial<SweepstakesEntry>;
  step: number;
  isModalOpen: boolean;
  editingId: number | null;

  // CRUD Operations
  createSweepstakes: () => void;
  updateSweepstakes: (id: number, updates: Partial<SweepstakesEntry>) => void;
  deleteSweepstakes: (id: number) => void;

  // State Management
  setCurrentEntry: (entry: Partial<SweepstakesEntry>) => void;
  resetCurrentEntry: () => void;

  // Modal and Navigation
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;

  startEditing: (id: number) => void;
  cancelEditing: () => void;
  updateAndSaveEditing: (updates: Partial<SweepstakesEntry>) => void;
}

// Initial empty entry template
const INITIAL_ENTRY: Partial<SweepstakesEntry> = {
  startDate: "",
  endDate: "",
  drawDate: "",
  ticketPrice: 0,
  mainPrize: 0,
  secondaryPrize: 0,
  protocolFee: 0,
};

export const useSweepstakesStore = create<SweepstakesState>()(
  persist(
    (set, get) => ({
      sweepstakes: [],
      currentEntry: INITIAL_ENTRY,
      step: 1,
      isModalOpen: false,
      editingId: null,

      // CRUD Operations
      createSweepstakes: () => {
        const { editingId, currentEntry, sweepstakes } = get();

        if (editingId !== null) {
          // Update existing entry
          set({
            sweepstakes: sweepstakes.map((entry) =>
              entry.id === editingId
                ? {
                    ...entry,
                    ...currentEntry,
                    updatedAt: Date.now(),
                  }
                : entry,
            ),
            editingId: null,
            currentEntry: INITIAL_ENTRY,
            isModalOpen: false,
            step: 1,
          });
        } else {
          // Create new entry
          const newEntry: SweepstakesEntry = {
            ...(currentEntry as SweepstakesEntry),
            id: Date.now(), // Keep id as number
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

          set((state) => ({
            sweepstakes: [...state.sweepstakes, newEntry],
            currentEntry: INITIAL_ENTRY,
            step: 1,
            isModalOpen: false,
          }));
        }
      },

      updateSweepstakes: (id, updates) => {
        set((state) => ({
          sweepstakes: state.sweepstakes.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  ...updates,
                  updatedAt: Date.now(),
                }
              : entry,
          ),
        }));
      },

      deleteSweepstakes: (id) => {
        set((state) => ({
          sweepstakes: state.sweepstakes.filter((entry) => entry.id !== id),
        }));
      },

      // State Management
      setCurrentEntry: (entry) => {
        set({ currentEntry: { ...get().currentEntry, ...entry } });
      },

      resetCurrentEntry: () => {
        set({ currentEntry: INITIAL_ENTRY });
      },

      // Modal and Navigation
      openModal: () => set({ isModalOpen: true }),

      closeModal: () =>
        set({
          isModalOpen: false,
          step: 1,
          currentEntry: INITIAL_ENTRY,
        }),

      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () =>
        set((state) => ({ step: state.step > 1 ? state.step - 1 : 1 })),

      // New methods for editing
      startEditing: (id) => {
        const entryToEdit = get().sweepstakes.find((entry) => entry.id === id);

        if (entryToEdit) {
          set({
            editingId: id,
            currentEntry: { ...entryToEdit },
            isModalOpen: true,
            step: 1,
          });
        }
      },

      cancelEditing: () => {
        set({
          editingId: null,
          currentEntry: INITIAL_ENTRY,
          isModalOpen: false,
          step: 1,
        });
      },

      updateAndSaveEditing: (updates) => {
        const { editingId, sweepstakes } = get();

        if (editingId !== null) {
          set({
            sweepstakes: sweepstakes.map((entry) =>
              entry.id === editingId
                ? {
                    ...entry,
                    ...updates,
                    updatedAt: Date.now(),
                  }
                : entry,
            ),
            editingId: null,
            currentEntry: INITIAL_ENTRY,
            isModalOpen: false,
            step: 1,
          });
        }
      },
    }),
    {
      name: "sweepstakes-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          // Optional: Implement storage size limit
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
