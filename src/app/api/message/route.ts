import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const data = { message: 'Hello from Next.js 13 API Route with TypeScript!' };

    return NextResponse.json(data, { status: 200 });
}