import { NextRequest, NextResponse } from "next/server";
import { getDbAsync, usersTable } from "@/db";

type UserInput = {
  name: string;
  age: number;
  email: string;
};

export async function POST(request: NextRequest) {
  const db = await getDbAsync();
  const { name, age, email }: UserInput = await request.json();
  
  try {
    const newUser = await db
      .insert(usersTable)
      .values({ name, age, email })
      .returning();
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const db = await getDbAsync();
  
  try {
    const users = await db.select().from(usersTable);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
