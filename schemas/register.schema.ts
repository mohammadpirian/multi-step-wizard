import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().trim().min(1, "نام الزامی است"),
  lastName: z.string().trim().min(1, "نام خانوادگی الزامی است"),
  email: z
    .string()
    .trim()
    .min(1, "ایمیل الزامی است")
    .email("فرمت ایمیل صحیح نیست"),
});

export const step2Schema = z.object({
  age: z
    .number({
      error: "سن الزامی است",
    })
    .min(1, "سن الزامی است"),
  gender: z.number(),
  occupation: z.string().trim().min(1, "شغل الزامی است"),
});

const locationSchema = z.object(
  {
    id: z.number("فیلد الزامی است"),
    title: z.string("فیلد الزامی است").trim().min(1, "فیلد الزامی است"),
  },
  "فیلد الزامی است",
);

export const step3Schema = z.object({
  country: locationSchema,
  province: locationSchema,
  address: z.string().trim().min(1, "آدرس الزامی است"),
});

export const finalSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FinalData = z.infer<typeof finalSchema>;
