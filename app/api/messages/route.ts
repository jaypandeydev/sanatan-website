import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    // Save to DB
    const saved = await prisma.message.create({
      data: { name, email, phone, message },
    });
    // Send email
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP not configured');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@sanatanmahaparishad.org',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nMessage: ${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Message API error:', err);
    return NextResponse.json({ error: err?.message || 'Server error.', details: err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = verifyAdminToken(req);
  if (!token) return unauthorizedResponse();

  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error('Message API error:', err);
    return NextResponse.json({ error: err?.message || 'Server error.', details: err }, { status: 500 });
  }
} 