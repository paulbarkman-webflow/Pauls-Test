import { NextRequest, NextResponse } from "next/server";
import { getDbAsync, usersTable } from "@/db";
import { eq } from "drizzle-orm";

// GET /api/users - Get all users
export async function GET() {
  try {
    const db = await getDbAsync();
    const users = await db.select().from(usersTable);
    
    return NextResponse.json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch users" 
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, email } = body;

    // Basic validation
    if (!name || !age || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Name, age, and email are required" 
        },
        { status: 400 }
      );
    }

    if (typeof age !== "number" || age < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Age must be a positive number" 
        },
        { status: 400 }
      );
    }

    const db = await getDbAsync();
    
    // Insert new user
    const result = await db.insert(usersTable).values({
      name,
      age,
      email,
    }).returning();

    return NextResponse.json({ 
      success: true, 
      data: result[0] 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating user:", error);
    
    // Handle unique constraint error (email already exists)
    if (error.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Email already exists" 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create user" 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users - Delete all users (be careful!)
export async function DELETE() {
  try {
    const db = await getDbAsync();
    await db.delete(usersTable);
    
    return NextResponse.json({ 
      success: true, 
      message: "All users deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to delete users" 
      },
      { status: 500 }
    );
  }
}
