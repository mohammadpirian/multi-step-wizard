export type UserDataInterface = {
  firstName: string;
  lastName: string;
  email: string;

  age: number | undefined;
  gender: number | undefined;
  occupation: string;

  country: string;
  city: string;
  address: string;

  setStep1Data: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;

  setStep2Data: (data: {
    age: number;
    gender: number;
    occupation: string;
  }) => void;

  setStep3Data: (data: {
    country: string;
    city: string;
    address: string;
  }) => void;
};
