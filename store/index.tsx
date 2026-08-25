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
      gender: undefined,
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
      setStep2Data: (data) =>
        set({
          age: data.age,
          gender: data.gender,
          occupation: data.occupation,
        }),
      setStep3Data: (data) =>
        set({
          country: data.country,
          city: data.city,
          address: data.address,
        }),
    }),
    {
      name: "register-storage",
    },
  ),
);
