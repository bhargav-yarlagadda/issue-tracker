import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

const prisma = new PrismaClient(); // Create an instance of PrismaClient

const IssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Use prisma instance to interact with the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ message: "Issue created successfully" ,issue:newIssue}, { status: 201 });
}
