export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/User';

const defaultUsers = [
  {
    username: 'alice_teacher',
    email: 'alice@school.com',
    password: 'Pass123!',
    role: 'teacher',
  },
  {
    username: 'bob_student',
    email: 'bob@student.com',
    password: 'Student123!',
    role: 'student',
  },
  {
    username: 'carol_teacher',
    email: 'carol@school.com',
    password: 'Teach456!',
    role: 'teacher',
  },
  {
    username: 'dave_student',
    email: 'dave@student.com',
    password: 'Learn789!',
    role: 'student',
  },
  {
    username: 'test_user',
    email: 'test@test.com',
    password: 'test',
    role: 'student',
  }
];

export async function GET() {
  try {
    await dbConnect();

    // Clean existing users
    await User.deleteMany({});

    // Hash passwords and insert users
    const usersToInsert = await Promise.all(
      defaultUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
        createdAt: new Date(),
      }))
    );

    await User.insertMany(usersToInsert);

    return NextResponse.json({
      success: true,
      message: 'Users seeded successfully',
      count: usersToInsert.length,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to seed users',
      error: err.message,
    }, { status: 500 });
  }
}
