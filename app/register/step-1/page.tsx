"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUserDataStore } from "@/store";
import { step1Schema } from "@/schemas/register.schema";
import FormInput from "@/components/FormInput/FormInput";
import Button from "@/components/Button/Button";
import _STRINGS from "@/utils/LocalStrings";
import StepProgressBar from "@/components/ProgressBar/StepProgressBar";

type FormErrors = {
  [key: string]: string[];
};

export default function StepOne() {
  const router = useRouter();

  const {
    firstName: storedFirstName,
    lastName: storedLastName,
    email: storedEmail,
    setStep1Data,
  } = useUserDataStore();

  const [formData, setFormData] = useState({
    firstName: storedFirstName ?? "",
    lastName: storedLastName ?? "",
    email: storedEmail ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const result = step1Schema.safeParse(formData);

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
    setStep1Data(result.data);
    router.push("/register/step-2");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <StepProgressBar currentStep={0} totalSteps={3} />

          <p className="text-2xl font-semibold mt-4 text-gray-900">
            {_STRINGS.INITIAL_DATA}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {_STRINGS.PLEASE_ENTER_DATA}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={formData.firstName}
              onChangeText={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  firstName: value,
                }));

                if (errors.firstName) {
                  setErrors((prev) => ({
                    ...prev,
                    firstName: [],
                  }));
                }
              }}
              errorKey="firstName"
              errors={errors}
              item={{
                title: _STRINGS.NAME,
                placeholder: _STRINGS.ENTER_NAME,
              }}
            />

            {errors.firstName?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName[0]}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={formData.lastName}
              onChangeText={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  lastName: value,
                }));

                if (errors.lastName) {
                  setErrors((prev) => ({
                    ...prev,
                    lastName: [],
                  }));
                }
              }}
              errorKey="lastName"
              errors={errors}
              item={{
                title: _STRINGS.LAST_NAME,
                placeholder: _STRINGS.ENTER_LAST_NAME,
              }}
            />

            {errors.lastName?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName[0]}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormInput
              value={formData.email}
              onChangeText={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  email: value,
                }));

                if (errors.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: [],
                  }));
                }
              }}
              errorKey="email"
              errors={errors}
              item={{
                title: _STRINGS.EMAIL,
                placeholder: _STRINGS.ENTER_EMAIL,
                keyboard: "email",
              }}
            />

            {errors.email?.[0] && (
              <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>
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
