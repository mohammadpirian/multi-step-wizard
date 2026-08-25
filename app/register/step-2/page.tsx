"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUserDataStore } from "@/store";
import { step2Schema } from "@/schemas/register.schema";
import FormInput from "@/components/FormInput/FormInput";
import Button from "@/components/Button/Button";
import _STRINGS from "@/utils/LocalStrings";
import StepProgressBar from "@/components/ProgressBar/StepProgressBar";
import RadioInput from "@/components/RadioInput";

type FormErrors = {
  [key: string]: string[];
};

export default function StepTwo() {
  const router = useRouter();

  const {
    age: storedAge,
    gender: storedGender,
    occupation: storedOccupation,
    setStep2Data,
  } = useUserDataStore();

  const [formData, setFormData] = useState<{
    age: string | number;
    gender: number;
    occupation: string;
  }>({
    age: storedAge ?? "",
    gender: storedGender ?? 0,
    occupation: storedOccupation ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const result = step2Schema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
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
    setStep2Data({
      ...result.data,
      gender: Number(result.data.gender),
    });
    router.push("/register/step-3");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <StepProgressBar currentStep={1} totalSteps={3} />

          <p className="text-2xl font-semibold mt-4 text-gray-900">
            {_STRINGS.ADDITIONAL_DATA}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {_STRINGS.PLEASE_ENTER_DATA}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={formData.age}
              onChangeText={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  age: Number(value),
                }));

                if (errors.age) {
                  setErrors((prev) => ({
                    ...prev,
                    age: [],
                  }));
                }
              }}
              errorKey="age"
              errors={errors}
              item={{
                keyboard: "number",
                title: _STRINGS.AGE,
                placeholder: _STRINGS.ENTER_AGE,
              }}
            />

            {errors.age?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors.age[0]}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <p className="text-xs text-gray-700">{_STRINGS.GENDER}</p>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex gap-6 items-center">
                <RadioInput
                  label="مرد"
                  selected={formData.gender}
                  setSelected={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      gender: Number(value),
                    }));
                  }}
                  value={1}
                />
                <RadioInput
                  label="زن"
                  selected={formData.gender}
                  setSelected={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      gender: Number(value),
                    }));
                  }}
                  value={0}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={formData.occupation}
              onChangeText={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  occupation: value,
                }));

                if (errors.occupation) {
                  setErrors((prev) => ({
                    ...prev,
                    occupation: [],
                  }));
                }
              }}
              errorKey="occupation"
              errors={errors}
              item={{
                title: _STRINGS.OCCUPATION,
                placeholder: _STRINGS.ENTER_OCCUPATION,
              }}
            />

            {errors.occupation?.[0] && (
              <p className="mt-1 text-xs text-red-500">
                {errors.occupation[0]}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onPress={handleSubmit}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {_STRINGS.NEXT}
          </Button>
        </div>
      </div>
    </main>
  );
}
