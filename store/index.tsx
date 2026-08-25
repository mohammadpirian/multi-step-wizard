import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserDataInterface } from "./store.interface";

export const useUserDataStore = create<UserDataInterface>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      gender: "",
      occupation: "",
      country: "",
      city: "",
      address: "",

      setStep1Data: (data) =>
        set({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        }),
    }),
    {
      name: "register-storage",
    },
  ),
);
