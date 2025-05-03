import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/models/User';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get database connection status
    const connection = mongoose.connection;
    const dbStatus = {
      isConnected: connection.readyState === 1,
      dbName: connection.name,
      host: connection.host,
      port: connection.port,
    };

    // Get collection information
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    return NextResponse.json({
      success: true,
      message: 'Database configuration retrieved successfully',
      database: {
        status: dbStatus,
        collections: collectionNames,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve database configuration',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Connect to the database
    await dbConnect();

    // Create indexes for better performance
    await User.createIndexes();

    return NextResponse.json({
      success: true,
      message: 'Database indexes created successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create database indexes',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 