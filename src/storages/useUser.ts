import { create } from 'zustand';

interface IUserStorage {
    userName: string;
    setUserName: (userName: string) => void;
}

const useUserStorage = create<IUserStorage>((set) => ({
   userName: '',
   setUserName: (userName: string) => set({ userName }),
}));

export { useUserStorage };
