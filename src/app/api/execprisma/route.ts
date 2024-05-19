import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    // Extract SQL query from request body
    const { sqlQuery } = await req.json();
    
    // Execute SQL query using Prisma Client
    const result = await prisma.$queryRawUnsafe(sqlQuery);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
