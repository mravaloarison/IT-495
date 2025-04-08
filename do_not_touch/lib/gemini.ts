export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeminiResponse {
  text: string;
}

export class GeminiService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gemini-pro') {
    this.apiKey = apiKey;
    this.model = model;
  }
    
  async generateResponse(messages: GeminiMessage[]): Promise<GeminiResponse> {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + this.model + ':generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          })),
        }),
      });
        
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      return { text: responseText };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}
  
export async function createGeminiAPIRoute() {
  return `
    import { NextRequest, NextResponse } from 'next/server';
    import { GeminiService, GeminiMessage } from '@/lib/gemini';
    
    // Keep your API key in environment variables
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    export async function POST(request: NextRequest) {
      if (!GEMINI_API_KEY) {
        return NextResponse.json(
          { error: 'Gemini API key is missing' },
          { status: 500 }
        );
      }
    
      try {
        const { messages } = await request.json();
        
        const gemini = new GeminiService(GEMINI_API_KEY);
        const response = await gemini.generateResponse(messages);
        
        return NextResponse.json(response);
      } catch (error) {
        console.error('Error in Gemini API route:', error);
        return NextResponse.json(
          { error: 'Failed to get response from Gemini' },
          { status: 500 }
        );
      }
    }
  `;
}