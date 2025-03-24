import { create } from "zustand";

interface SweepstakesState {
  step: number;
  data: {
    startDate: string;
    endDate: string;
    drawDate: string;
    ticketPrice: number;
    mainPrize: number;
    secondaryPrize: number;
    protocolFee: number;
  };
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (values: Partial<SweepstakesState["data"]>) => void;
}

export const useSweepstakesStore = create<SweepstakesState>((set) => ({
  step: 1,
  data: {
    startDate: "",
    endDate: "",
    drawDate: "",
    ticketPrice: 0,
    mainPrize: 0,
    secondaryPrize: 0,
    protocolFee: 0,
  },
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, step: 1 }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
}));