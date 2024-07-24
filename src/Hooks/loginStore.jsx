import create from "zustand";

const useLoginStore = create((set) => ({
  loginResult: null,
  setLoginResult: (result) => set({ loginResult: result }),
}));

export default useLoginStore;
