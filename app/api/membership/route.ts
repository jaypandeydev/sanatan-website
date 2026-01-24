import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getEmailContent } from "@/lib/emailTemplate";
import { getLocalizedErrors } from "@/lib/localizeErrors";

// ✅ Zod schema
const formSchema = z.object({
  membershipType: z.enum(["lifetime", "ordinary"]),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  sonDaughterOf: z.string().min(1, { message: "This field is required" }),

  profession: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  employeeNumber: z.string().optional().nullable(),

  residentialAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
  contactPhone: z.string().optional().nullable(),
  mobileNumber: z.string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .regex(/^[0-9+\s-]+$/, { message: "Invalid mobile number format" }),
  email: z.string().email({ message: "Invalid email address" }),
  otherDetails: z.string().optional().nullable(),
  membershipNumber: z.string().optional().nullable(),
  dateOfApplication: z.string().optional().nullable(),
  introducedBy: z.string().optional().nullable(),
  introducer: z.string().optional().nullable(),
  language: z.enum(["en", "hi"]).optional(),
}).strict();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    // 🔐 SMTP check MUST be runtime only
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 500 }
      );
    }

    // ✅ Create transporter at runtime
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const dateOfBirth = new Date(validatedData.dateOfBirth);
    const dateOfApplication = validatedData.dateOfApplication
      ? new Date(validatedData.dateOfApplication)
      : new Date();

    // 🔍 Check duplicate email
    const existingUser = await prisma.members.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "This email is already registered.",
      });
    }

    // 💾 Save to DB
    const newUser = await prisma.members.create({
      data: {
        membershipType: validatedData.membershipType,
        fullName: validatedData.name.trim(),
        dateOfBirth,
        sonDaughterOf: validatedData.sonDaughterOf.trim(),
        profession: validatedData.profession || null,
        designation: validatedData.designation || null,
        identityCardNumber: validatedData.employeeNumber || null,
        residentialAddress: validatedData.residentialAddress.trim(),
        contactPhone: validatedData.contactPhone || null,
        mobileNumber: validatedData.mobileNumber.trim(),
        email: validatedData.email.toLowerCase().trim(),
        otherDetails: validatedData.otherDetails || null,
        membershipNumber: validatedData.membershipNumber?.trim() || null,
        dateOfApplication,
        introducedBy: validatedData.introducedBy || null,
        introducer: validatedData.introducer || null,
        membershipStatus: null,
      },
    });

    // 📧 Send email
    const info = await transporter.sendMail({
      from: `"Sanatan Mahaparishad Bharat" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject:
        validatedData.language === "en"
          ? "Welcome to Sanatan Mahaparishad Bharat"
          : "सनातन महापरिषद भारत में आपका स्वागत है",
      html: getEmailContent(validatedData.language ?? "hi", validatedData.name),
    });

    console.log(`✅ Email sent: ${info.messageId}`);

    return NextResponse.json({
      success: true,
      message: "Registration successful. Welcome email sent.",
      data: newUser,
    });

  } catch (error: any) {
    console.error("❌ Membership registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.issues
            ? getLocalizedErrors(error.issues)
            : error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
