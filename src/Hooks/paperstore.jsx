// src/store/usePaperStore.js
import { create } from 'zustand';

const usePaperStore = create((set, get) => ({
  data: null,
  loading: true,
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  getData: () => get().data,
  getLoading: () => get().loading,
}));

export default usePaperStore;
