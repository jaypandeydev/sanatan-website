import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const maxSize = 1024 * 1024; // 1MB
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const dirPath = path.join(process.cwd(), 'public', 'images', 'officials');
    const uploadPath = path.join(dirPath, filename);
    // Ensure directory exists
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (err) {
      // ignore if already exists
    }
    await fs.writeFile(uploadPath, buffer);
    return NextResponse.json({ filename });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
} 