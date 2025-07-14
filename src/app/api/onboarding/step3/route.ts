import { prisma } from "@/helpers/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { location } = await req.json();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { location },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to update location" },
            { status: 500 }
        );
    }
}
