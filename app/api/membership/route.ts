import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getEmailContent } from "@/lib/emailTemplate";


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

// ✅ Helper: Email HTML
// function getEmailContent(language: string, name: string) {
//   const logoUrl =
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20logo-22Z6C8rDLhWgn5zxYjZhcrU29cavNW.png";

//   if (language === "en") {
//     return `
//       <div style="font-family: Arial, sans-serif;">
//         <img src="${logoUrl}" alt="Sanatan Mahaparishad Logo" style="max-width: 150px;" />
//         <h2>Welcome ${name},</h2>
//         <p>Thank you for joining Sanatan Mahaparishad Bharat.</p>
//       </div>`;
//   } else {
//     return `
//       <div style="font-family: Arial, sans-serif;">
//         <img src="${logoUrl}" alt="सनातन महापरिषद लोगो" style="max-width: 150px;" />
//         <h2>प्रिय ${name},</h2>
//         <p>सनातन महापरिषद भारत में आपका हार्दिक स्वागत है!</p>
//       </div>`;
//   }
// }

// function getEmailContent(language: string, name: string) {
//   // HTML template with organization logo and styling
//   const logoUrl =
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20logo-22Z6C8rDLhWgn5zxYjZhcrU29cavNW.png";

//   if (language === "en") {
//     return `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
//         <div style="text-align: center; margin-bottom: 20px;">
//           <img src="${logoUrl}" alt="Sanatan Mahaparishad Bharat Logo" style="max-width: 150px;">
//           <h2 style="color: #9B0000; margin-top: 10px;">Sanatan Mahaparishad Bharat</h2>
//         </div>
//         <p>Dear ${name},</p>
//         <p>A warm welcome to the Sanatan Mahaparishad Bharat family! We are delighted to have you join us.</p>
//         <p>Moving forward, we will work together to promote the values of Sanatan Dharma and Indian culture. We look forward to your support and active participation.</p>
//         <p>Best regards,</p>
//         <p><strong>Sanatan Mahaparishad Bharat</strong></p>
//         <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
//           <p>Office: Gyan Sarovar Vidyalaya, Near Gandhi Park, Mukhavat Yojana, Lucknow-226029</p>
//           <p>Email: info@sanatanmahaparishad.org</p>
//         </div>
//       </div>
//     `;
//   } else {
//     return `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
//         <div style="text-align: center; margin-bottom: 20px;">
//           <img src="${logoUrl}" alt="सनातन महापरिषद भारत लोगो" style="max-width: 150px;">
//           <h2 style="color: #9B0000; margin-top: 10px;">सनातन महापरिषद भारत</h2>
//         </div>
//         <p>प्रिय ${name},</p>
//         <p>सनातन महापरिषद भारत परिवार में आपका हार्दिक स्वागत है! हमें खुशी है कि आप हमारे साथ जुड़े हैं।</p>
//         <p>आने वाले समय में हम मिलकर सनातन धर्म और भारतीय संस्कृति के मूल्यों को बढ़ावा देने के लिए कार्य करेंगे। आपके समर्थन और सक्रिय भागीदारी की हम अपेक्षा करते हैं।</p>
//         <p>शुभकामनाएं,</p>
//         <p><strong>सनातन महापरिषद भारत</strong></p>
//         <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
//           <p>कार्यालय: ज्ञान सरोवर विद्यालय, निकट गाँधी पार्क, मुखावत योजना, लखनऊ-226029</p>
//           <p>ईमेल: info@sanatanmahaparishad.org</p>
//         </div>
//       </div>
//     `;
//   }
// }

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
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          fieldErrors: error.errors.reduce((acc, curr) => {
            const field = curr.path[0] as string;
            acc[field] = curr.message;
            return acc;
          }, {} as Record<string, string>),
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
