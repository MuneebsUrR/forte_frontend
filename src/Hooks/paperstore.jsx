// src/store/usePaperStore.js
import { create } from 'zustand';

const usePaperStore = create((set, get) => ({
  data: null,
  loading: true,
  error: null,
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  getData: () => get().data,
  getLoading: () => get().loading,
  getError: () => get().error,
}));

export default usePaperStore;
