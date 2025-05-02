"use server";

import { z } from "zod";

// ✅ Schema used only for type inference
const formSchema = z.object({
  membershipType: z.enum(["lifetime", "ordinary"]),
  name: z.string().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().optional().nullable(),
  age: z.string().optional().nullable(),
  sonDaughterOf: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  employeeNumber: z.string().optional().nullable(),
  residentialAddress: z.string().optional().nullable(),
  contactPhone: z.string().optional().nullable(),
  mobileNumber: z.string().min(1, { message: "Mobile number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  fax: z.string().optional().nullable(),
  otherDetails: z.string().optional().nullable(),
  membershipNumber: z.string().optional().nullable(),
  dateOfApplication: z.string().optional().nullable(),
  introducedBy: z.string().optional().nullable(),
  introducer: z.string().optional().nullable(),
  language: z.enum(["en", "hi"]).optional(),
});

// ✅ Export type only (used by frontend form)
export type FormData = z.infer<typeof formSchema>;
