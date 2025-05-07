import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Gemini error' }, { status: 500 });
  }
}
