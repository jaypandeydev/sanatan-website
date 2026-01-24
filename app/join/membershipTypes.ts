// formSchema.ts
"use server";

import { z } from "zod";

export const baseSchema = z.object({
  membershipType: z.enum(["lifetime", "ordinary"]),
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  age: z.string().optional().nullable(),
  sonDaughterOf: z.string().min(1),
  profession: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  employeeNumber: z.string().optional().nullable(),
  residentialAddress: z.string().min(1),
  contactPhone: z.string().optional().nullable(),
  mobileNumber: z.string().min(1),
  email: z.string().min(1).email(),
  fax: z.string().optional().nullable(),
  otherDetails: z.string().optional().nullable(),
  membershipNumber: z.string().optional().nullable(),
  dateOfApplication: z.string().optional().nullable(),
  introducedBy: z.string().optional().nullable(),
  introducer: z.string().optional().nullable(),
  language: z.enum(["en", "hi"]).optional(),
}).strict();

export type FormData = z.infer<typeof baseSchema>;
