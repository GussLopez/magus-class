import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  setUser: (user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
  }) => void;
  setAvatar: (avatar: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  name: null,
  avatar_url: null,

  setUser: (user) => {
    set({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    });
  },
  setAvatar: (avatar) => {
    set({ avatar_url: avatar });
  },
  clearUser: () => {
    set({
      id: null,
      name: null,
      email: null,
      avatar_url: null,
    });
  },
}));
