import { NextRequest, NextResponse } from 'next/server';
import { simulateTrackingSearch } from '@/lib/tracking-simulator';
import { TrackingRequest } from '@/types/tracking';

export async function POST(request: NextRequest) {
  try {
    const body: TrackingRequest = await request.json();
    
    if (!body.phoneNumber) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Número de telefone é obrigatório',
          processingTime: 0
        },
        { status: 400 }
      );
    }

    // Simulate the tracking process
    const result = await simulateTrackingSearch(body.phoneNumber);
    
    return NextResponse.json(result, { 
      status: result.success ? 200 : 400 
    });
    
  } catch (error) {
    console.error('Error in track API:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente.',
        processingTime: 0
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'WhatsApp Tracker API - Use POST method to track a phone number',
      endpoints: {
        track: {
          method: 'POST',
          url: '/api/track',
          body: {
            phoneNumber: 'string (required)',
            countryCode: 'string (optional, default: +55)'
          }
        }
      },
      disclaimer: 'This is a educational simulator that generates fake data only.'
    },
    { status: 200 }
  );
}