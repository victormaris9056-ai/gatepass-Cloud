import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { gate_id, person_id, image_url, confidence } = body

    const { data, error } = await supabase
      .from('face_logs')
      .insert([{ gate_id, person_id, image_url, confidence }])
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  const { data } = await supabase.from('face_logs').select('*').order('created_at', { ascending: false }).limit(20)
  return NextResponse.json(data)
}