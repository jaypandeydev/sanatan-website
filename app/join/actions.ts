"use server"

import { z } from "zod"
import {prisma} from "@/lib/prisma"

// Define validation schema
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
})

export type FormData = z.infer<typeof formSchema>

export async function submitMembershipForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Convert dateOfBirth and dateOfApplication to Date objects if they exist
    const dateOfBirth = validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null
    const dateOfApplication = validatedData.dateOfApplication ? new Date(validatedData.dateOfApplication) : new Date()

    // Save to database
    const newUser = await prisma.sanataniUserDetails.create({
      data: {
        membershipType: validatedData.membershipType,
        fullName: validatedData.name,
        dateOfBirth: dateOfBirth,
        age: validatedData.age,
        sonDaughterOf: validatedData.sonDaughterOf,
        profession: validatedData.profession,
        designation: validatedData.designation,
        employeeNumber: validatedData.employeeNumber,
        residentialAddress: validatedData.residentialAddress,
        contactPhone: validatedData.contactPhone,
        mobileNumber: validatedData.mobileNumber,
        email: validatedData.email,
        fax: validatedData.fax,
        otherDetails: validatedData.otherDetails,
        membershipNumber: validatedData.membershipNumber,
        dateOfApplication: dateOfApplication,
        introducedBy: validatedData.introducedBy,
        introducer: validatedData.introducer,
      },
    })

    return { success: true, data: newUser }
  } catch (error) {
    console.error("Error submitting form:", error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        fieldErrors: error.errors.reduce(
          (acc, curr) => {
            const field = curr.path[0] as string
            acc[field] = curr.message
            return acc
          },
          {} as Record<string, string>,
        ),
      }
    }
    return { success: false, error: "Failed to submit form. Please try again." }
  }
}
