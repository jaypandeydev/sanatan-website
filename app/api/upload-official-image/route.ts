import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { verifyAdminToken, unauthorizedResponse } from '@/lib/auth'
import { isCloudinaryConfigured, uploadOfficialImage } from '@/lib/cloudinary'

const maxSize = 1024 * 1024 // 1MB

export async function POST(req: NextRequest) {
  const token = verifyAdminToken(req);
  if (!token) return unauthorizedResponse();

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'Image storage is not configured' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // ✅ Allow ONLY specific MIME types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // ✅ File size limit
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ✅ Generate safe public id (DO NOT use user filename)
    const url = await uploadOfficialImage(buffer, randomUUID())

    return NextResponse.json({ url })
  } catch (err: any) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
