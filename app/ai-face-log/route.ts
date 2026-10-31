import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { gate_id, person_id, image_url, confidence } = body

    const { data, error } = await supabase
      .from('face_logs')
      .insert([{ 
        gate_id: gate_id || 'main-gate', 
        person_id: person_id || 'unknown', 
        image_url, 
        confidence 
      }])
      .select()

    if (error) {
      console.error(error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('face_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}