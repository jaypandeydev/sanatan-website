import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export const maxSize = 1024 * 1024 // 1MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // ✅ Allow ONLY specific MIME types
    const allowedTypes: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    }

    const ext = allowedTypes[file.type]
    if (!ext) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // ✅ File size limit
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ✅ Generate safe filename (DO NOT use user filename)
    const filename = `${randomUUID()}${ext}`

    const dirPath = path.join(process.cwd(), 'public', 'images', 'officials')
    const uploadPath = path.join(dirPath, filename)

    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(uploadPath, buffer)

    return NextResponse.json({ filename })
  } catch (err: any) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
