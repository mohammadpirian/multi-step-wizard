export type LocationItem = {
  id: number;
  title: string;
};

export type CountryItem = LocationItem & {
  child: LocationItem[];
};

export type UserDataInterface = {
  firstName: string;
  lastName: string;
  email: string;

  age: number | undefined;
  gender: number | undefined;
  occupation: string;

  country: CountryItem | undefined;
  city: LocationItem | undefined;
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
    country: CountryItem | undefined;
    city: LocationItem | undefined;
    address: string;
  }) => void;
};
