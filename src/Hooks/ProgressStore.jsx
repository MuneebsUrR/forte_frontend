import create from 'zustand';

const useProgressStore = create((set) => ({
  candidateId: '',
  sqpId: '',
  qpId: '',

  setCandidateId: (id) => set({ candidateId: id }),
  setSqpId: (id) => set({ sqpId: id }),
  setQpId: (id) => set({ qpId: id }),
 
}));

export default useProgressStore;
