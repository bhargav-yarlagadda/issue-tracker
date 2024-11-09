import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

const prisma = new PrismaClient(); // Create an instance of PrismaClient

const IssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const data = await prisma.issue.findMany();
  return NextResponse.json({ message: "Successfully retrieved data", data: data }, { status: 200 });
}

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



export async function PUT(request: NextRequest, { params }: { params: { issueId: string } }) {
  const { issueId } = params;
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(issueId) },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });
    return NextResponse.json({ message: "Issue updated successfully", issue: updatedIssue }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Error updating issue", error: error.message }, { status: 500 });
  }
}