import { NextRequest, NextResponse } from 'next/server';
import { GeminiMessage } from '@/lib/gemini';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  console.log('API route called');
  
  if (!GEMINI_API_KEY) {
    console.error('Gemini API key is missing');
    return NextResponse.json(
      { error: 'Gemini API key is missing in environment variables' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid request format', body);
      return NextResponse.json(
        { error: 'Invalid request format. Expected "messages" array.' },
        { status: 400 }
      );
    }
    
    console.log('Processing messages:', JSON.stringify(messages).substring(0, 200) + '...');
    
    const formattedMessages = messages.map((msg: GeminiMessage) => ({
      role: msg.role === 'user' ? 'user' : 'model', 
      parts: [{ text: msg.content }]
    }));
    
    console.log('Gemini API URL:', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent');
    console.log('Request format:', JSON.stringify({
      contents: formattedMessages
    }).substring(0, 200) + '...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: formattedMessages,
      }),
    });
    
    const responseText = await response.text();
    console.log('Gemini API response status:', response.status);
    console.log('Gemini API response:', responseText.substring(0, 500) + '...');
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e);
      return NextResponse.json(
        { error: 'Invalid response from Gemini API' },
        { status: 500 }
      );
    }
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json(
        { error: `Gemini API error: ${data.error?.message || response.status}` },
        { status: 500 }
      );
    }
    
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      console.error('No text response in Gemini API result:', data);
      return NextResponse.json(
        { error: 'No text response found in Gemini API result' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ text: textResponse });
  } catch (error) {
    console.error('Unhandled error in API route:', error);
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}