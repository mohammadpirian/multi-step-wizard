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

export type Step1Data = z.infer<typeof step1Schema>;
