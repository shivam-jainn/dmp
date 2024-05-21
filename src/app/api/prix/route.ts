import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    console.log(req)
    const { sqlQuery } = await req.json();
    const result = await prisma.$queryRawUnsafe(sqlQuery);
    return NextResponse.json({"result":result});
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
