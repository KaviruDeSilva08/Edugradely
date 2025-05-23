import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    // Try to find all users (will be empty at first)
    const users = await User.find({});
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      users: users 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 