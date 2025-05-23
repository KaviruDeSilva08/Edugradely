export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();

    await dbConnect();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Signup failed', error: err.message },
      { status: 500 }
    );
  }
}
