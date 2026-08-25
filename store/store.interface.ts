export type UserDataInterface = {
  firstName: string;
  lastName: string;
  email: string;

  age: number | undefined;
  gender: string;
  occupation: string;

  country: string;
  city: string;
  address: string;

  setStep1Data: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
};
