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
  age: z.number().min(1, "سن الزامی است"),
  gender: z.number(),
  occupation: z.string().trim().min(1, "شغل الزامی است"),
});

export type Step1Data = z.infer<typeof step1Schema>;
