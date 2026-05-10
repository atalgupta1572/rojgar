import { z } from 'zod';

export const sendOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  })
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
    otp: z.string().length(4, "OTP must be 4 digits"),
    role: z.enum(['WORKER', 'CONTRACTOR'])
  })
});