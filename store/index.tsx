import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserDataInterface } from "./store.interface";

export const useUserDataStore = create<UserDataInterface>()(
  persist(
    (set, get) => ({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      occupation: "",
      country: "",
      city: "",
      address: "",
    }),
    {
      name: "profile-storage",
    },
  ),
);
