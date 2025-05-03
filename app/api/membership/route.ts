import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getEmailContent } from "@/lib/emailTemplate";
import { getLocalizedErrors } from "@/lib/localizeErrors";

// 🔐 Ensure critical .env variables exist
if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  throw new Error("❌ Missing SMTP credentials in environment variables.");
}

// ✅ Zod schema
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

// ✅ Email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const dateOfBirth = validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null;
    const dateOfApplication = validatedData.dateOfApplication
      ? new Date(validatedData.dateOfApplication)
      : new Date();

    // 🔍 Check if email already registered
    const existingUser = await prisma.sanataniUserDetails.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "This email is already registered.",
      });
    }

    // ✅ Save to DB
    const newUser = await prisma.sanataniUserDetails.create({
      data: {
        membershipType: validatedData.membershipType,
        fullName: validatedData.name,
        dateOfBirth,
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
        dateOfApplication,
        introducedBy: validatedData.introducedBy,
        introducer: validatedData.introducer,
      },
    });

    // ✅ Send Email
    const info = await transporter.sendMail({
      from: `"Sanatan Mahaparishad Bharat" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject:
        validatedData.language === "en"
          ? "Welcome to Sanatan Mahaparishad Bharat"
          : "सनातन महापरिषद भारत में आपका स्वागत है",
      html: getEmailContent(validatedData.language ?? "hi", validatedData.name),
    });

    console.log(`✅ Email sent to ${validatedData.email} with ID: ${info.messageId}`);

    if (!info.messageId) {
      console.warn("⚠️ Email may not have been delivered");
    }

    //return NextResponse.json({ success: true, data: newUser });
    return NextResponse.json({
      success: true,
      message: "Registration successful. Welcome email sent.",
      data: newUser,
    });

  } catch (error: any) {
    console.error("❌ Error:", error);

    if (error instanceof z.ZodError) {
      const language = (await req.json())?.language ?? "en";
      const fieldErrors = getLocalizedErrors(error.format(), language);
    
      return NextResponse.json(
        {
          success: false,
          error: language === "hi" ? "कृपया सभी आवश्यक फ़ील्ड भरें।" : "Please fill all required fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    // Optional: verify SMTP config once
    transporter.verify((err) => {
      if (err) console.error("SMTP Config Error:", err);
    });

    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }  
}
