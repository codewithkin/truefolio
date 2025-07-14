import { prisma } from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, plan } = await request.json();

        if (!userId || !plan) {
            return NextResponse.json(
                { error: "Missing userId or plan in request body" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { plan },
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Failed to update user plan:", error);
        return NextResponse.json(
            { error: "Failed to update user plan" },
            { status: 500 }
        );
    }
}
