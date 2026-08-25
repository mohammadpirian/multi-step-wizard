"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUserDataStore } from "@/store";
import {
  finalSchema,
  step2Schema,
  step3Schema,
} from "@/schemas/register.schema";
import FormInput from "@/components/FormInput/FormInput";
import Button from "@/components/Button/Button";
import _STRINGS from "@/utils/LocalStrings";
import StepProgressBar from "@/components/ProgressBar/StepProgressBar";
import FormSelect from "@/components/FormSelect";
import { countries_data } from "@/mock/countriesData";

type FormErrors = {
  [key: string]: string[];
};

export default function StepThree() {
  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    occupation,
    country: storedCountry,
    city: storedCity,
    address: storedAddress,
    setStep3Data,
  } = useUserDataStore();
  const [selectedCountry, setSelectedCountry] = useState<any>(
    storedCountry ?? null,
  );
  const [selectedProvince, setSelectedProvince] = useState<any>(
    storedCity ?? null,
  );
  const [cityList, setCityList] = useState<any[]>([]);
  const [address, setAddress] = useState<string>(storedAddress ?? "");

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    const step3Data = {
      country: selectedCountry,
      province: selectedProvince,
      address,
    };

    const step3Result = step3Schema.safeParse(step3Data);

    if (!step3Result.success) {
      const formattedErrors: FormErrors = {};

      step3Result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;

        if (!formattedErrors[key]) {
          formattedErrors[key] = [];
        }

        formattedErrors[key].push(issue.message);
      });

      setErrors(formattedErrors);

      return;
    }

    setErrors({});

    const finalData = {
      firstName,
      lastName,
      email,
      age,
      gender,
      occupation,
      country: selectedCountry,
      province: selectedProvince,
      address,
    };

    const finalResult = finalSchema.safeParse(finalData);

    if (!finalResult.success) {
      console.log(finalResult.error);
      return;
    }

    setStep3Data({
      country: selectedCountry,
      city: selectedProvince,
      address,
    });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalResult.data),
      });

      if (!response.ok) {
        throw new Error("failed");
      }

      const data = await response.json();
      console.log("Successfully", data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <StepProgressBar currentStep={2} totalSteps={3} />

          <p className="text-2xl font-semibold mt-4 text-gray-900">
            {_STRINGS.ADDRESS_DATA}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {_STRINGS.PLEASE_ENTER_DATA}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <FormSelect
              title={_STRINGS.COUNTRY}
              list={countries_data}
              value={selectedCountry}
              property="title"
              item={{
                placeholder: _STRINGS.SELECT_COUNTRY,
              }}
              onSelect={(value) => {
                setSelectedCountry(value);

                setCityList(value?.child || []);
                if (errors.country) {
                  setErrors((prev) => ({
                    ...prev,
                    country: [],
                  }));
                }
              }}
            />
            {errors?.country?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors?.country[0]}</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <FormSelect
              title={_STRINGS.PROVINCE}
              list={cityList}
              value={selectedProvince}
              property="title"
              item={{
                placeholder: _STRINGS.SELECT_PROVINCE,
              }}
              onSelect={(value) => {
                setSelectedProvince(value);
                if (errors.province) {
                  setErrors((prev) => ({
                    ...prev,
                    province: [],
                  }));
                }
              }}
            />
            {errors?.province?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors?.province[0]}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={address}
              onChangeText={(value) => {
                setAddress(value);

                if (errors.address) {
                  setErrors((prev) => ({
                    ...prev,
                    address: [],
                  }));
                }
              }}
              errorKey="address"
              errors={errors}
              item={{
                title: _STRINGS.ADDRESS,
                placeholder: _STRINGS.ENTER_ADDRESS,
              }}
            />

            {errors.address?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors.address[0]}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onPress={handleSubmit}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {_STRINGS.SEND}
          </Button>
        </div>
      </div>
    </main>
  );
}
