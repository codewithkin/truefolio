import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
    step: 0,
    setStep: (step: number) => set(() => ({
        step
    }))
}))